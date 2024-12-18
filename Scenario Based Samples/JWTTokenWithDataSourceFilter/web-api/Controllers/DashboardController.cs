using boldbi.web.api.Model;
using boldbi.web.api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Security.Claims;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;

namespace boldbi.web.api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly ILogger<AccountController> _logger;
        private readonly EmbedDetails _boldbiIProperties;       
        private readonly ApplicationDbContext _dbContext;

        public DashboardController(ILogger<AccountController> logger, EmbedDetails boldbiProperties, ApplicationDbContext dbContext)
        {
            _logger = logger;
            _boldbiIProperties = boldbiProperties;    
            _dbContext = dbContext;
        }

        [Authorize]
        [HttpGet("getboldbisettings")]
        public EmbedDetails GetBoldBIProperties()
        {
            var removeEmbedsecret = new EmbedDetails()
            {
                DashboardId = _boldbiIProperties.DashboardId,
                ServerUrl = _boldbiIProperties.ServerUrl,
                SiteIdentifier = _boldbiIProperties.SiteIdentifier,
                Environment = _boldbiIProperties.Environment
            };
            return removeEmbedsecret;
        }
        [Authorize]
        [HttpPost("authorize")]
        public async Task<string> AuthorizeDashboard([FromBody] object embedQuerString)
        {
            _logger.LogInformation($"User [{User.Identity?.Name}] logged in the system.");
            var userName = User.Identity?.Name;
            var email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            var role = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
            var embedClass = JsonConvert.DeserializeObject<EmbedClass>(embedQuerString.ToString());
            var embedQuery = embedClass.embedQuerString;
            try
            {
                var user = await _dbContext.staging_usercustomattributes.FirstOrDefaultAsync(u => u.useremail == email);
                if (user == null)
                {
                    throw new Exception($"User {userName} not found in the database.");
                }
                var customAttribute = user.customattribute;
                if (!string.IsNullOrEmpty(role) && role == "Admin")
                {
                    embedQuery += "&embed_user_email=" + _boldbiIProperties.UserEmail + $"&embed_custom_attribute={customAttribute}";
                }
                else
                {
                    embedQuery += "&embed_user_email=" + _boldbiIProperties.UserEmail + $"&embed_custom_attribute={customAttribute}"+ "&embed_datasource_filter=[{&useremail=" + email + "}]";
                }

                //To set embed_server_timestamp to overcome the EmbedCodeValidation failing while different timezone using at client application.
                double timeStamp = (int)DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1)).TotalSeconds;
                embedQuery += "&embed_server_timestamp=" + timeStamp;
                var embedDetailsUrl = "/embed/authorize?" + embedQuery + "&embed_signature=" + GetSignatureUrl(embedQuery);

                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(embedClass.dashboardServerApiUrl);
                    client.DefaultRequestHeaders.Accept.Clear();
                    var result = client.GetAsync(embedClass.dashboardServerApiUrl + embedDetailsUrl).Result;
                    string resultContent = result.Content.ReadAsStringAsync().Result;
                    return resultContent;
                }
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while retrieving the user from the database.", ex);
            }
        }

        public string GetSignatureUrl(string queryString)
        {
            if (queryString != null)
            {
                var encoding = new System.Text.UTF8Encoding();
                var keyBytes = encoding.GetBytes(_boldbiIProperties.EmbedSecret);
                var messageBytes = encoding.GetBytes(queryString);
                using (var hmacsha1 = new HMACSHA256(keyBytes))
                {
                    var hashMessage = hmacsha1.ComputeHash(messageBytes);
                    return Convert.ToBase64String(hashMessage);
                }
            }
            return string.Empty;
        }
    }
}

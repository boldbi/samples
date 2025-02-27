using boldbi.web.api.Model;
using boldbi.web.api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Security.Claims;
using System.Security.Cryptography;

namespace boldbi.web.api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly ILogger<AccountController> _logger;
        private readonly EmbedDetails _boldbiIProperties;       

        public DashboardController(ILogger<AccountController> logger, EmbedDetails boldbiProperties)
        {
            _logger = logger;
            _boldbiIProperties = boldbiProperties;     
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
        public string AuthorizeDashboard([FromBody] object embedQuerString)
        {
            var accessType = HttpContext.Request.Headers["accessType"];
            var customAttribute = HttpContext.Request.Headers["customAttribute"];
            var filterParameter = HttpContext.Request.Headers["filterParameter"];
            var anonymousUserEmail = HttpContext.Request.Headers["AnonymousUserEmail"];
            var anonymousGroupName = HttpContext.Request.Headers["AnonymousGroupName"];
            _logger.LogInformation($"User [{User.Identity?.Name}] logged in the system.");
            var userName = User.Identity?.Name;
            var userEmail = (User.Identity as ClaimsIdentity)?.FindFirst(ClaimTypes.Email)?.Value;
            var embedClass = JsonConvert.DeserializeObject<EmbedClass>(embedQuerString.ToString());
            var embedQuery = embedClass.embedQuerString;
            embedQuery += "&embed_user_email=" + anonymousUserEmail;
            if (accessType.ToString() == "Anonymous")
            {
                embedQuery += "&embed_anonymous_token=true&embed_authorize_group=" + anonymousGroupName;
            }
            
            embedQuery += "&embed_custom_attribute=[{" + customAttribute + "}]" + "&embed_datasource_filter=[{" + filterParameter + "}]";

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

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
            _logger.LogInformation($"User [{User.Identity?.Name}] logged in the system.");
            var userName = User.Identity?.Name;
            var userEmail = (User.Identity as ClaimsIdentity)?.FindFirst(ClaimTypes.Email)?.Value;
            var embedClass = JsonConvert.DeserializeObject<EmbedClass>(embedQuerString.ToString());
            var embedQuery = embedClass.embedQuerString;
            //embedClass.dashboardServerApiUrl = "http://localhost:51778/bi/api/site/site1";

            //embedQuery += "&embed_custom_attribute=[{\"Channel\"=\"IN('Corporate')\"}]";
            embedQuery += "&embed_custom_attribute=[{\"sales_analysis_db\":\"gamma_industries_sales_analysis\"}]";

            // User your user-email as embed_user_email
            //embedQuery += "&embed_user_email=" + _boldbiIProperties.UserEmail;// + "&embed_datasource_filter=[{&UserEmail=" + userEmail + "}]";

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

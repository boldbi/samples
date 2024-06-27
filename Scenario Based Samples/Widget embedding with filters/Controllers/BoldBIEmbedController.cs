using System.Security.Cryptography;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace React_with_ASP.NETCore.Controllers
{
     [ApiController]
     [Route("api/[controller]")]
     public class BoldBIEmbedController : Controller
     {
          [HttpGet]
          [Route("GetData")]
          public IActionResult GetData()
          {
            var jsonData = System.IO.File.ReadAllText("embedConfig.json");
            return Json(new
            {
                DashboardId = GlobalAppSettings.EmbedDetails.DashboardId,
                ServerUrl = GlobalAppSettings.EmbedDetails.ServerUrl,
                EmbedType = GlobalAppSettings.EmbedDetails.EmbedType,
                Environment = GlobalAppSettings.EmbedDetails.Environment,
                SiteIdentifier = GlobalAppSettings.EmbedDetails.SiteIdentifier
            });
          }

          [HttpPost]
          [Route("AuthorizationServer")]
          public string AuthorizationServer([FromBody] object embedQuerString)
          {
             var embedClass = Newtonsoft.Json.JsonConvert.DeserializeObject<EmbedClass>(embedQuerString.ToString());

             var embedQuery = embedClass.embedQuerString;
            // User your user-email as embed_user_email
            embedQuery += "&embed_user_email=" + GlobalAppSettings.EmbedDetails.UserEmail;
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
                 var keyBytes = encoding.GetBytes(GlobalAppSettings.EmbedDetails.EmbedSecret);
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

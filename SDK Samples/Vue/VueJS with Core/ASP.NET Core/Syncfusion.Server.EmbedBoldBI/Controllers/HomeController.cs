using System;
using System.Net.Http;
using Syncfusion.Server.EmbedBoldBI.Model;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace Syncfusion.Server.EmbedBoldBI.Controllers
{
    public class HomeController : ControllerBase
    {
        // GET api/values
        [HttpGet]
        public string Get()
        {
            return "Application Running....";
        }

        [HttpPost]
        [Route("GetDetails")]
        public string GetDetails([FromBody] object embedQuerString)
        {
            var embedClass = Newtonsoft.Json.JsonConvert.DeserializeObject<EmbedClass>(embedQuerString.ToString());

            var embedQuery = embedClass.embedQuerString;
            // User your user-email as embed_user_email
            embedQuery += "&embed_user_email=" + EmbedProperties.UserEmail;
            var embedDetailsUrl = "/embed/authorize?" + embedQuery.ToLower() + "&embed_signature=" + GetSignatureUrl(embedQuery.ToLower());

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
                var keyBytes = encoding.GetBytes(EmbedProperties.EmbedSecret);
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
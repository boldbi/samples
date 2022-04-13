namespace Syncfusion.Server.EmbedBoldBI.Controllers
{
    using System;
    using System.Net.Http;
    using System.Web.Mvc;
    using Syncfusion.Server.EmbedBoldBI.Models;
    using Newtonsoft.Json;
    using System.Collections.Generic;
    using System.Security.Cryptography;


    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("dashboards/get")]
        public string GetDashboards()
        {
            var token = GetToken();

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(EmbedProperties.RootUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Add("Authorization", token.TokenType + " " + token.AccessToken);
                var result = client.GetAsync(EmbedProperties.RootUrl + "/api/" + EmbedProperties.SiteIdentifier + "/v2.0/items?ItemType=2").Result;
                string resultContent = result.Content.ReadAsStringAsync().Result;
                return resultContent;
            }
        }

        public Token GetToken()
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(EmbedProperties.RootUrl);
                client.DefaultRequestHeaders.Accept.Clear();

                var content = new FormUrlEncodedContent(new[]
                {
                    new KeyValuePair<string, string>("grant_type", "password"),
                    new KeyValuePair<string, string>("UserId", EmbedProperties.UserEmail),
                    new KeyValuePair<string, string>("Password", EmbedProperties.UserPassword)
                });
                var result = client.PostAsync(EmbedProperties.RootUrl + "/api/" + EmbedProperties.SiteIdentifier + "/get-user-key", content).Result;
                string resultContent = result.Content.ReadAsStringAsync().Result;
                var response = JsonConvert.DeserializeObject<TokenObject>(resultContent);//Token token = new Token();
                var tokenObj = JsonConvert.DeserializeObject<Token>(response.Token);
                return tokenObj;
            }
        }

        [HttpPost]
        [Route("embeddetail/get")]
        public ActionResult GetEmbedDetails(string embedQuerString, string dashboardServerApiUrl)
        {
            embedQuerString += "&embed_user_email=" + EmbedProperties.UserEmail;
            var embedDetailsUrl = "/embed/authorize?" + embedQuerString.ToLower() + "&embed_signature=" + GetSignatureUrl(embedQuerString.ToLower());

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(dashboardServerApiUrl);
                client.DefaultRequestHeaders.Accept.Clear();

                var result = client.GetAsync(dashboardServerApiUrl + embedDetailsUrl).Result;
                string resultContent = result.Content.ReadAsStringAsync().Result;
                return Json(resultContent);
            }
        }


        public string GetSignatureUrl(string message)
        {
            var encoding = new System.Text.UTF8Encoding();
            var keyBytes = encoding.GetBytes(EmbedProperties.EmbedSecret);
            var messageBytes = encoding.GetBytes(message);
            using (var hmacsha1 = new HMACSHA256(keyBytes))
            {
                var hashMessage = hmacsha1.ComputeHash(messageBytes);
                return Convert.ToBase64String(hashMessage);
            }
        }
    }
}
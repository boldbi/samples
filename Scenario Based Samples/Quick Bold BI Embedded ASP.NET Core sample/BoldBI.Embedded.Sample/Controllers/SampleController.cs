namespace SampleCoreApp.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Net;
    using System.Net.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;
    using Newtonsoft.Json;
    using SampleCoreApp.Models;

    public class SampleController : Controller
    {
        private static IConfiguration configuration;

        public SampleController(IConfiguration iConfig)
        {
            configuration = iConfig;
        }

        public IActionResult DefaultDashboard()
        {
            ViewBag.CurrentPage = "Dashboard";
            ViewBag.CurrentUrl = HttpContext.Request.Path.ToString();
            ViewBag.ServerUrl = configuration.GetSection("AppSettings:ServerURL").Value;
           return View("sample");
        }

        [Route("/dashboard/", Name = "defaultDashJS")]
        public IActionResult Dashboard()
        {
            ViewBag.CurrentPage = "Dashboard";
            ViewBag.CurrentUrl = HttpContext.Request.Path.ToString();
            ViewBag.ServerUrl = configuration.GetSection("AppSettings:ServerURL").Value;
            return View("sample");
        }

        [HttpPost]
        public string GetEmbedDetails([FromBody]object embedQuery)
        {
            var embedClass = Newtonsoft.Json.JsonConvert.DeserializeObject<EmbedDetail>(embedQuery.ToString());
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls12;
            var userEmail = HttpContext.Request.Cookies["userEmailEmbeddedBI"];
            userEmail = string.IsNullOrWhiteSpace(userEmail) ? configuration.GetSection("AppSettings:UserEmail").Value : userEmail;
            embedClass.embedQuerString += "&embed_user_email=" + userEmail;
            var embedDetailsUrl = "/embed/authorize?" + embedClass.embedQuerString.ToLower() + "&embed_signature=" + GetSignatureUrl(embedClass.embedQuerString.ToLower());
            try
            {
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
                return null;
            }
        }

        public Token GetToken()
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://localhost:51778/bi");
                client.DefaultRequestHeaders.Accept.Clear();

                var content = new FormUrlEncodedContent(new[]
                {
                    new KeyValuePair<string, string>("grant_type", "embed_secret"),
                    new KeyValuePair<string, string>("Username", configuration.GetSection("AppSettings:UserEmail").Value),
                    new KeyValuePair<string, string>("Embed_Secret", configuration.GetSection("AppSettings:EmbedSecret").Value)
                });
                var result = client.PostAsync(configuration.GetSection("AppSettings:RootURL").Value + "/api/" + configuration.GetSection("AppSettings:SiteIdentifier").Value + "/token", content).Result;
                string resultContent = result.Content.ReadAsStringAsync().Result;
                var response = JsonConvert.DeserializeObject<Token>(resultContent);//Token token = new Token();
                var tokenObj = response; //JsonConvert.DeserializeObject<Token>(response.Token);
                return tokenObj;
            }
        }


        public string GetSignatureUrl(string message)
        {
            var encoding = new System.Text.UTF8Encoding();
            var keyBytes = encoding.GetBytes(configuration.GetSection("AppSettings:EmbedSecret").Value);  //encoding.GetBytes("zjgRSUERGI6m9zvfEgHTT1bQ4FwDeszr"); //encoding.GetBytes("8ghp9g1yPLyOPycV3V7WlI51LmEFjBj9"); //encoding.GetBytes("pUu8DKaujKIyXdYAPWgvj1jW2OsCXuq");
            var messageBytes = encoding.GetBytes(message);
            using (var hmacsha1 = new System.Security.Cryptography.HMACSHA256(keyBytes))
            {
                var hashMessage = hmacsha1.ComputeHash(messageBytes);
                return Convert.ToBase64String(hashMessage);
            }
        }

        static double DateTimeToUnixTimeStamp(DateTime dateTime)
        {
            DateTime unixStart = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc);
            long unixTimeStampInTicks = (dateTime.ToUniversalTime() - unixStart).Ticks;
            return unixTimeStampInTicks / TimeSpan.TicksPerSecond;
        }
    }
}

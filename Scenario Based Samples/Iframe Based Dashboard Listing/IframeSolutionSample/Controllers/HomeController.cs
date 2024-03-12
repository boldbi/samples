using IframeSolutionSample.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Security.Cryptography;
using System.Text;

namespace IframeSolutionSample.Controllers
{
    public class HomeController : Controller
    {
        /// <summary>
        /// IConfiguration member.
        /// </summary>
        private static IConfiguration configuration;

        // <summary>
        /// Initializes a new instance of the <see cref="HomeController"/> class.
        /// HomeController Constructor.
        /// </summary>
        /// <param name="config">Iconfiguration value.</param>
        public HomeController(IConfiguration config)
        {
            configuration = config;
        }

        [Route("solutions/{CategoryName}/{dashboardName}")]
        [Route("solutions/{CategoryName}")]
        [Route("solutions")]
        [Route("")]
        public IActionResult Index(string dashboardName = "")
        {
            var dashboardlist = GetDashboards();
            DashboardList dashboardData = JsonConvert.DeserializeObject<DashboardList>(dashboardlist);
            List<DashboardItem> dashboardItems = dashboardData.Data;
            var categoryItems = new List<DashboardItem>();
            if (configuration.GetSection("EmbedProperties:CategoryName").Value != string.Empty)
            {
                categoryItems = dashboardItems.Where(item => item.CategoryName == configuration.GetSection("EmbedProperties:CategoryName").Value).ToList();
            }
            else
            {
                categoryItems = dashboardItems;
            }

            if (configuration.GetSection("EmbedProperties:Environment").Value == "cloud")
            {
                foreach (var category in categoryItems)
                {
                    int doubleSlashIndex = category.EmbedUrl.IndexOf("bi//");
                    if (doubleSlashIndex != -1)
                    {
                        category.EmbedUrl = category.EmbedUrl.Remove(doubleSlashIndex + 2, 1);
                    }
                }
            }

            bool hasPrivateDashboardItem = false;
            foreach (var category in categoryItems)
            {
                if (!category.IsPublic)
                {
                    hasPrivateDashboardItem = true;
                    break; // Exit the loop early if a private dashboard is found
                }
            }

            if (hasPrivateDashboardItem)
            {
                var nonce = Guid.NewGuid().ToString(); // To generate random GUID string
                string embedParameters = "embed_nonce=" + nonce + "&embed_user_email=" + configuration.GetSection("EmbedProperties:UserEmail").Value;
                string signature = SignURL(embedParameters, configuration.GetSection("EmbedProperties:EmbedSecret").Value);
                string embedSignature = embedParameters + "&embed_signature=" + signature;

                foreach (var category in categoryItems.Where(c => !c.IsPublic))
                {
                    category.EmbedUrl = category.EmbedUrl.Replace("isembed=True", embedSignature);
                }
            }

            ViewBag.CategoryItems = categoryItems;
            ViewBag.CategoryName = configuration.GetSection("EmbedProperties:CategoryName").Value != "" ? configuration.GetSection("EmbedProperties:CategoryName").Value : "All";
            if (!string.IsNullOrEmpty(dashboardName))
            {
                ViewBag.DashboardName = dashboardName;
            }
            return View();
        }

        static string SignURL(string embedParameters, string embedSecretKey)
        {
            var encoding = new UTF8Encoding();
            var keyBytes = encoding.GetBytes(embedSecretKey);
            var messageBytes = encoding.GetBytes(embedParameters);
            using (var hmacsha1 = new HMACSHA256(keyBytes))
            {
                var hashMessage = hmacsha1.ComputeHash(messageBytes);
                return Convert.ToBase64String(hashMessage);
            }
        }

        public string GetDashboards()
        {
            var token = GetToken();

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(configuration.GetSection("EmbedProperties:RootUrl").Value);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Add("Authorization", token.TokenType + " " + token.AccessToken);
                HttpResponseMessage result;
                if (configuration.GetSection("EmbedProperties:Environment").Value == "cloud")
                {
                    result = client.GetAsync(configuration.GetSection("EmbedProperties:RootUrl").Value + "/api/v4.0/dashboards").Result;
                }
                else
                {
                    result = client.GetAsync(configuration.GetSection("EmbedProperties:RootUrl").Value + "/api/" + configuration.GetSection("EmbedProperties:SiteIdentifier").Value + "/v4.0/dashboards").Result;
                }

                string resultContent = result.Content.ReadAsStringAsync().Result;
                return resultContent;
            }
        }

        public Token GetToken()
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(configuration.GetSection("EmbedProperties:RootUrl").Value);
                client.DefaultRequestHeaders.Accept.Clear();

                var content = new FormUrlEncodedContent(new[]
                {
                    new KeyValuePair<string, string>("grant_type", "embed_secret"),
                    new KeyValuePair<string, string>("Username", configuration.GetSection("EmbedProperties:UserEmail").Value),
                    new KeyValuePair<string, string>("embed_secret", configuration.GetSection("EmbedProperties:EmbedSecret").Value)
                });
                HttpResponseMessage result;
                if (configuration.GetSection("EmbedProperties:Environment").Value == "cloud")
                {
                    result = client.PostAsync(configuration.GetSection("EmbedProperties:RootUrl").Value + "/api/token", content).Result;
                }
                else
                {
                    result = client.PostAsync(configuration.GetSection("EmbedProperties:RootUrl").Value + "/api/" + configuration.GetSection("EmbedProperties:SiteIdentifier").Value + "/token", content).Result;
                }
                string resultContent = result.Content.ReadAsStringAsync().Result;
                var response = JsonConvert.DeserializeObject<Token>(resultContent);
                return response;
            }
        }
    }
}
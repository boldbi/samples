using System;
using System.Net.Http;
using System.Text;
using System.Windows.Forms;
using System.IO;
using System.Security.Cryptography;

namespace BoldBI.Winforms
{
    public partial class Form1 : Form
    {
        public string Url { get; set; }
        public Form1()
        {
            this.Size = Screen.PrimaryScreen.WorkingArea.Size;
            this.WindowState = FormWindowState.Maximized;

            GetEmbedDetails();
            InitializeComponent();
        }

        public void GetEmbedDetails()
        {
            decimal time = (decimal)Math.Round((DateTime.Now.ToUniversalTime() - new DateTime(1970, 1, 1)).TotalMilliseconds / 1000);
            var dashboardServerApiUrl = EmbedProperties.RootUrl + "api/" + EmbedProperties.SiteIdentifier;

            var embedQuerString = "embed_nonce=" + Guid.NewGuid() +
            "&embed_dashboard_id=" + EmbedProperties.DashboardId +
            "&embed_timestamp=" + Math.Round(time) +
            "&embed_expirationtime=100000";


            embedQuerString += "&embed_user_email=" + EmbedProperties.UserEmail;
            var embedDetailsUrl = "/embed/authorize?" + embedQuerString.ToLower() + "&embed_signature=" + GetSignatureUrl(embedQuerString.ToLower());

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(dashboardServerApiUrl);
                client.DefaultRequestHeaders.Accept.Clear();

                var result = client.GetAsync(dashboardServerApiUrl + embedDetailsUrl).Result;
                string resultContent = result.Content.ReadAsStringAsync().Result;
                //webBrowser1.ObjectForScripting = this;
                var htmlString = new StringBuilder();
                htmlString.Append("<!DOCTYPE html><html><head><link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:400,700' /><link rel='stylesheet' href='" + System.AppDomain.CurrentDomain.BaseDirectory.Replace("bin\\x64\\Debug\\", "") + "content\\chromium.css'/><script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/jquery/1.10.2/jquery.min.js'></script><script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js'></script><script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/jsrender/1.0.5/jsrender.min.js'></script><script src='https://cdn.polyfill.io/v2/polyfill.min.js'></script><script type='text/javascript' src='" + System.AppDomain.CurrentDomain.BaseDirectory.Replace("bin\\x64\\Debug\\", "") + "scripts\\EmbedBiWrapper.js'></script></script><script type='text/javascript'>$(document).ready(function() {this.dashboard = BoldBI.create({ serverUrl:'" + EmbedProperties.RootUrl + EmbedProperties.SiteIdentifier + "', dashboardId:'" + EmbedProperties.DashboardId + "',embedContainerId: 'dashboard',embedType:'" + EmbedProperties.EmbedType + "',environment:'" + EmbedProperties.Environment + "',width: window.innerWidth - 20 + 'px',height: window.innerHeight - 20 + 'px',expirationTime: 100000,authorizationServer:{url: '', data:" + resultContent + "},dashboardSettings:{showExport: false,showRefresh: false,showMoreOption: false}});console.log(this.dashboard);this.dashboard.loadDashboard();});</script></head><body style='background-color: white'><div id ='viewer-section' style='background-color: white'><div id ='dashboard'></div></div></body></html>");
                string filePath = AppDomain.CurrentDomain.BaseDirectory + "EmbedWrapper.html";
                if (File.Exists(filePath))
                {
                    File.Delete(filePath);
                }
                using (FileStream fs = new FileStream(filePath, FileMode.Create))
                {
                    using (StreamWriter wr = new StreamWriter(fs, Encoding.UTF8))
                    {
                        wr.Write(htmlString.ToString());
                    }
                }
                Url = filePath;
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

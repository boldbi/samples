using System;
using System.Net.Http;
using System.Security.Cryptography;

namespace Xamarin.Forms.Sample
{
    public interface IBaseUrl { string Get(); }

    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();
            EmbedWebView.Source = new HtmlWebViewSource
            {
                Html = GetHtmlString(),
                BaseUrl = DependencyService.Get<IBaseUrl>().Get()
            };
        }

        public string GetHtmlString()
        {
            var embedAuthorizeDetails = GetEmbedDetails();
            var html = @"<!DOCTYPE html>
                <html style=""height:100%;width:100%"">
                    <head>
                        <meta name=""viewport"" content=""width=device-width, initial-scale=1"">
                        <link rel=""stylesheet"" href=""https://fonts.googleapis.com/css?family=Roboto:400,700"" />
                        <script type=""text/javascript"" src=""https://cdnjs.cloudflare.com/ajax/libs/jquery/1.10.2/jquery.min.js""></script>
                        <script type=""text/javascript"" src=""https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js""></script>
                        <script type=""text/javascript"" src=""https://cdnjs.cloudflare.com/ajax/libs/jsrender/1.0.5/jsrender.min.js""></script>
                        <script type=""text/javascript"" src=""EmbedBiWrapper.js""></script>
                        <script type=""text/javascript"">
                            $(document).ready(function() {
                                this.dashboard = BoldBI.create({ 
                                    serverUrl:""" + EmbedProperties.RootUrl + "/" + EmbedProperties.SiteIdentifier + "\","
                                    + "dashboardId: \"" + EmbedProperties.DashboardId + "\","
                                    + "embedContainerId: \"dashboard\","
                                    + "embedType: \"" + EmbedProperties.EmbedType + "\","
                                    + "environment: \"" + EmbedProperties.Environment + "\","
                                    + "width: \"100%\","
                                    + "height: \"100%\","
                                    + @"expirationTime: 100000,
                                    authorizationServer:
                                    {
                                        url: """","
                                        + "data: " + embedAuthorizeDetails
                                + @"},
                                dashboardSettings:
                                {
                                    showExport: false,
                                    showRefresh: false,
                                    showMoreOption: false
                                }
                            });
                            console.log(this.dashboard);
                            this.dashboard.loadDashboard();
                        });
                        </script>
                    </head>
                    <body style=""background-color: white;height:100%;width:100%"">
                        <div id =""viewer-section"" style=""background-color: white;height:100%;width:100%"">
                            <div id =""dashboard"">
                            </div>
                        </div>
                    </body>
                </html>";
            return html;
        }

        public string GetEmbedDetails()
        {
            var embedAuthorizeDetails = string.Empty;
            decimal time = (decimal)Math.Round((DateTime.Now.ToUniversalTime() - new DateTime(1970, 1, 1)).TotalMilliseconds / 1000);
            var dashboardServerApiUrl = EmbedProperties.RootUrl + "/api/" + EmbedProperties.SiteIdentifier;
            var embedQuerString = "embed_nonce=" + Guid.NewGuid() +
            "&embed_dashboard_id=" + EmbedProperties.DashboardId +
            "&embed_mode=view" +
            "&embed_timestamp=" + Math.Round(time) +
            "&embed_expirationtime=100000";

            embedQuerString += "&embed_user_email=" + EmbedProperties.UserEmail;
            var embedDetailsUrl = "/embed/authorize?" + embedQuerString.ToLower() + "&embed_signature=" + GetSignatureUrl(embedQuerString.ToLower());
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(dashboardServerApiUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                var result = client.GetAsync(dashboardServerApiUrl + embedDetailsUrl).Result;
                embedAuthorizeDetails = result.Content.ReadAsStringAsync().Result;
            }
            return embedAuthorizeDetails;
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
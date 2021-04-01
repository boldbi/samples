using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;


namespace SampleCoreApp.Models
{
    public class UserManagement
    {
        private readonly GlobalAppSettings _globalAppSettings = new GlobalAppSettings();


        public UserManagement()
        {
            var filePath = Startup.BasePath + "\\app_data\\" + "default";
            _globalAppSettings = new TenantModel().GetEmbedDetails(filePath, _globalAppSettings);
        }


        public ServerUser VadidateUser(string user, UserEmbedDetails userEmbeddetails)
        {
            var email = user;
            var adminToken = new DashboardModel().GetToken();
            ServerUser userDetails = IsUserExist(email, adminToken.AccessToken);
            if (email != null && userDetails == null)
            {
                string password = "UserBI&786";
                string userName = "UserBI";
                if (email.Contains('@'))
                {
                    var values = email.Split('@');
                    userName = values[0];
                    password = values[0] + "BI&786";
                }


                AddNewUser(email, userName, password, adminToken.AccessToken);
                userDetails = IsUserExist(email, adminToken.AccessToken);
                var userToken = new DashboardModel().GetToken(email);

                AddCategoryPermission(userDetails.UserId, adminToken.AccessToken);
                var categoryId = AddCategory(userName, userToken.AccessToken);
                AddDashboardPermission(userDetails.UserId, categoryId, adminToken.AccessToken);
                AddDatasourcePermission(userDetails.UserId, adminToken.AccessToken);
                var datasourceResponse = new DashboardModel().AddDatasource(userToken, userDetails.FirstName + "_Datasource", userEmbeddetails, userDetails.UserId);
            }


            return userDetails;
        }


        public ServerUser IsUserExist(string email, string token)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(_globalAppSettings.EmbedDetails.RootUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Add("Authorization", "bearer" + " " + token);
                var result = client.GetAsync(_globalAppSettings.EmbedDetails.RootUrl + "/api/" + _globalAppSettings.EmbedDetails.SiteIdentifier + "/v1.0/users/" + email).Result;
                string resultContent = result.Content.ReadAsStringAsync().Result;


                if (result.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    return null;
                }
                else if (result.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    return JsonConvert.DeserializeObject<ServerUser>(resultContent);
                }
                else
                {
                    return null;
                }
            };
        }


        public ServerUser AddNewUser(string email, string fName, string password, string token)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(_globalAppSettings.EmbedDetails.RootUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                var content = new FormUrlEncodedContent(new[]
               {
                    new KeyValuePair<string, string>("Email", email),
                    new KeyValuePair<string, string>("FirstName", fName),
                    new KeyValuePair<string, string>("Password", password)
                });
                client.DefaultRequestHeaders.Add("Authorization", "bearer" + " " + token);
                var result = client.PostAsync(_globalAppSettings.EmbedDetails.RootUrl + "/api/" + _globalAppSettings.EmbedDetails.SiteIdentifier + "/v1.0/users", content).Result;
                string resultContent = result.Content.ReadAsStringAsync().Result;
                var response = JsonConvert.DeserializeObject<ServerUser>(resultContent);
                return response;
            }
        }


        public void AddCategoryPermission(int userId, string token)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(_globalAppSettings.EmbedDetails.RootUrl);
                client.DefaultRequestHeaders.Accept.Clear();



                var content = new FormUrlEncodedContent(new[]
               {
                    new KeyValuePair<string, string>("PermissionAccess", "Create"),
                    new KeyValuePair<string, string>("UserId", userId.ToString()),
                    new KeyValuePair<string, string>("PermissionEntity", "AllCategories")
                });


                client.DefaultRequestHeaders.Add("Authorization", "bearer" + " " + token);
                var result = client.PostAsync(_globalAppSettings.EmbedDetails.RootUrl + "/api/" + _globalAppSettings.EmbedDetails.SiteIdentifier + "/v2.0/permissions/users", content).Result;
                string resultContent = result.Content.ReadAsStringAsync().Result;
            }
        }


        public string AddCategory(string userName, string userToken)
        {
            var categoryId = string.Empty;
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(_globalAppSettings.EmbedDetails.RootUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                var content = new FormUrlEncodedContent(new[]
                {
                    new KeyValuePair<string, string>("Name", userName)
                });
                client.DefaultRequestHeaders.Add("Authorization", "bearer" + " " + userToken);
                client.DefaultRequestHeaders.Add("ETag", DashboardModel.RandomString());
                var result = client.PostAsync(_globalAppSettings.EmbedDetails.RootUrl + "/api/" + _globalAppSettings.EmbedDetails.SiteIdentifier + "/v2.0/categories", content).Result;
                string resultContent = result.Content.ReadAsStringAsync().Result;
                var response = JsonConvert.DeserializeObject<ApiResponse>(resultContent);
                categoryId = response.Status ? response.Data.ToString() : string.Empty;
            }

            return categoryId;
        }


        public void AddDashboardPermission(int userId, string categoryId, string token)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(_globalAppSettings.EmbedDetails.RootUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                var content = new FormUrlEncodedContent(new[]
               {
                    new KeyValuePair<string, string>("PermissionAccess", "Create"),
                    new KeyValuePair<string, string>("UserId", userId.ToString()),
                    new KeyValuePair<string, string>("PermissionEntity", "DashboardsInCategory"),
                    new KeyValuePair<string, string>("ItemId", categoryId)
                });
                client.DefaultRequestHeaders.Add("Authorization", "bearer" + " " + token);
                var result = client.PostAsync(_globalAppSettings.EmbedDetails.RootUrl + "/api/" + _globalAppSettings.EmbedDetails.SiteIdentifier + "/v2.0/permissions/users", content).Result;
                string resultContent = result.Content.ReadAsStringAsync().Result;
            }
        }


        public void AddDatasourcePermission(int userId, string token)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(_globalAppSettings.EmbedDetails.RootUrl);
                client.DefaultRequestHeaders.Accept.Clear();


                var content = new FormUrlEncodedContent(new[]
               {
                    new KeyValuePair<string, string>("PermissionAccess", "Create"),
                    new KeyValuePair<string, string>("UserId", userId.ToString()),
                    new KeyValuePair<string, string>("PermissionEntity", "AllDataSources")
                });
                client.DefaultRequestHeaders.Add("Authorization", "bearer" + " " + token);
                var result = client.PostAsync(_globalAppSettings.EmbedDetails.RootUrl + "/api/" + _globalAppSettings.EmbedDetails.SiteIdentifier + "/v2.0/permissions/users", content).Result;
                string resultContent = result.Content.ReadAsStringAsync().Result;
            }
        }
    }
}
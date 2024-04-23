// <copyright file="UserManagement.cs" company="Syncfusion Inc">
// Copyright (c) Syncfusion Inc. All rights reserved.
// </copyright>

namespace SampleCoreApp.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Http;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Http;
    using Newtonsoft.Json;

    /// <summary>
    /// UserManagement class.
    /// </summary>
    public class UserManagement
    {
        /// <summary>
        /// GlobalAppSettings member.
        /// </summary>
        private readonly GlobalAppSettings globalAppSettings = new GlobalAppSettings();

        /// <summary>
        /// Initializes a new instance of the <see cref="UserManagement"/> class.
        /// UserManagement constructor.
        /// </summary>
        public UserManagement()
        {
            var filePath = Startup.BasePath + "/App_Data/" + "default";
            this.globalAppSettings = new TenantModel().GetEmbedDetails(filePath, this.globalAppSettings);
        }

        /// <summary>
        /// The method will prompt the user to validate.
        /// </summary>
        /// <param name="user">User.</param>
        /// <param name="userEmbeddetails">EmbedDetails.</param>
        /// <returns>Return the Server user.</returns>
        public ServerUser VadidateUser(string user, UserEmbedDetails userEmbeddetails)
        {
            var email = user;
            var adminToken = new DashboardModel().GetToken();
            ServerUser userDetails = this.IsUserExist(email, adminToken.AccessToken);
            if (email != null && userDetails == null)
            {
                string password = "UserBI&786";
                string userName = "UserBI";
                if (email.Contains('@', StringComparison.Ordinal))
                {
                    var values = email.Split('@');
                    userName = values[0];
                    password = values[0] + "BI&786";
                }

                this.AddNewUser(email, userName, password, adminToken.AccessToken);
                userDetails = this.IsUserExist(email, adminToken.AccessToken);
                var userToken = new DashboardModel().GetToken(email);

                this.AddCategoryPermission(userDetails.UserId, adminToken.AccessToken);
                var categoryId = this.AddCategory(userName, userToken.AccessToken);
                this.AddDashboardPermission(userDetails.UserId, categoryId, adminToken.AccessToken);
                this.AddDatasourcePermission(userDetails.UserId, adminToken.AccessToken);
                var datasourceResponse = new DashboardModel().AddDatasource(userToken, userDetails.FirstName + "_Datasource", userEmbeddetails, userDetails.UserId);
            }

            return userDetails;
        }

        /// <summary>
        /// The method will perform a check to see if the user exists.
        /// </summary>
        /// <param name="email">UserEmail.</param>
        /// <param name="token">Token.</param>
        /// <returns>Return the server user details.</returns>
        public ServerUser IsUserExist(string email, string token)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(this.globalAppSettings.EmbedDetails.RootUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Add("Authorization", "bearer" + " " + token);
                var result = new HttpResponseMessage();
                if (this.globalAppSettings.EmbedDetails.Environment == "cloud")
                {
                    result = client.GetAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/v1.0/users/" + email).Result;
                }
                else
                {
                    result = client.GetAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/" + this.globalAppSettings.EmbedDetails.SiteIdentifier + "/v1.0/users/" + email).Result;
                }

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
            }
        }

        /// <summary>
        /// The method will trigger adding a new user.
        /// </summary>
        /// <param name="email">UserEmail.</param>
        /// <param name="fName">FirstName.</param>
        /// <param name="password">Password.</param>
        /// <param name="token">Token.</param>
        /// <returns>Return the server user details.</returns>
        public ServerUser AddNewUser(string email, string fName, string password, string token)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(this.globalAppSettings.EmbedDetails.RootUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                var content = new FormUrlEncodedContent(new[]
                {
                    new KeyValuePair<string, string>("Email", email),
                    new KeyValuePair<string, string>("FirstName", fName),
                    new KeyValuePair<string, string>("Password", password),
                });
                client.DefaultRequestHeaders.Add("Authorization", "bearer" + " " + token);
                var result = new HttpResponseMessage();
                if (this.globalAppSettings.EmbedDetails.Environment == "cloud")
                {
                    result = client.PostAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/v1.0/users", content).Result;
                }
                else
                {
                    result = client.PostAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/" + this.globalAppSettings.EmbedDetails.SiteIdentifier + "/v1.0/users", content).Result;
                }

                string resultContent = result.Content.ReadAsStringAsync().Result;
                var response = JsonConvert.DeserializeObject<ServerUser>(resultContent);
                return response;
            }
        }

        /// <summary>
        /// The method will trigger adding the category permission.
        /// </summary>
        /// <param name="userId">UserId.</param>
        /// <param name="token">Token.</param>
        public void AddCategoryPermission(int userId, string token)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(this.globalAppSettings.EmbedDetails.RootUrl);
                client.DefaultRequestHeaders.Accept.Clear();

                var content = new FormUrlEncodedContent(new[]
                {
                    new KeyValuePair<string, string>("PermissionAccess", "Create"),
                    new KeyValuePair<string, string>("UserId", FormattableString.Invariant($"{userId}")),
                    new KeyValuePair<string, string>("PermissionEntity", "AllCategories"),
                });

                client.DefaultRequestHeaders.Add("Authorization", "bearer" + " " + token);
                var result = new HttpResponseMessage();
                if (this.globalAppSettings.EmbedDetails.Environment == "cloud")
                {
                    result = client.PostAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/v2.0/permissions/users", content).Result;
                }
                else
                {
                    result = client.PostAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/" + this.globalAppSettings.EmbedDetails.SiteIdentifier + "/v2.0/permissions/users", content).Result;
                }

                string resultContent = result.Content.ReadAsStringAsync().Result;
            }
        }

        /// <summary>
        /// The method will result in the creation of new categories.
        /// </summary>
        /// <param name="userName">Username.</param>
        /// <param name="userToken">UserToken.</param>
        /// <returns>Return the string value of status.</returns>
        public string AddCategory(string userName, string userToken)
        {
            var categoryId = string.Empty;
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(this.globalAppSettings.EmbedDetails.RootUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                var content = new FormUrlEncodedContent(new[] { new KeyValuePair<string, string>("Name", userName) });
                client.DefaultRequestHeaders.Add("Authorization", "bearer" + " " + userToken);
                client.DefaultRequestHeaders.Add("ETag", DashboardModel.RandomString());
                var result = new HttpResponseMessage();
                if (this.globalAppSettings.EmbedDetails.Environment == "cloud")
                {
                    result = client.PostAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/v2.0/categories", content).Result;
                }
                else
                {
                    result = client.PostAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/" + this.globalAppSettings.EmbedDetails.SiteIdentifier + "/v2.0/categories", content).Result;
                }

                string resultContent = result.Content.ReadAsStringAsync().Result;
                var response = JsonConvert.DeserializeObject<SampleApiResponse>(resultContent);
                categoryId = response.Status ? response.Data.ToString() : string.Empty;
            }

            return categoryId;
        }

        /// <summary>
        /// The method will trigger adding dashboard permissions.
        /// </summary>
        /// <param name="userId">UserId.</param>
        /// <param name="categoryId">CategoryId.</param>
        /// <param name="token">Token.</param>
        public void AddDashboardPermission(int userId, string categoryId, string token)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(this.globalAppSettings.EmbedDetails.RootUrl);
                client.DefaultRequestHeaders.Accept.Clear();

                var content = new FormUrlEncodedContent(new[]
                {
                    new KeyValuePair<string, string>("PermissionAccess", "Create"),
                    new KeyValuePair<string, string>("UserId", FormattableString.Invariant($"{userId}")),
                    new KeyValuePair<string, string>("PermissionEntity", "DashboardsInCategory"),
                    new KeyValuePair<string, string>("ItemId", categoryId),
                });
                client.DefaultRequestHeaders.Add("Authorization", "bearer" + " " + token);
                var result = new HttpResponseMessage();
                if (this.globalAppSettings.EmbedDetails.Environment == "cloud")
                {
                    result = client.PostAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/v2.0/permissions/users", content).Result;
                }
                else
                {
                    result = client.PostAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/" + this.globalAppSettings.EmbedDetails.SiteIdentifier + "/v2.0/permissions/users", content).Result;
                }

                string resultContent = result.Content.ReadAsStringAsync().Result;
            }
        }

        /// <summary>
        /// The method will trigger adding data source permission.
        /// </summary>
        /// <param name="userId">UserId.</param>
        /// <param name="token">Token.</param>
        public void AddDatasourcePermission(int userId, string token)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(this.globalAppSettings.EmbedDetails.RootUrl);
                client.DefaultRequestHeaders.Accept.Clear();

                var content = new FormUrlEncodedContent(new[]
                {
                    new KeyValuePair<string, string>("PermissionAccess", "Create"),
                    new KeyValuePair<string, string>("UserId", FormattableString.Invariant($"{userId}")),
                    new KeyValuePair<string, string>("PermissionEntity", "AllDataSources"),
                });
                client.DefaultRequestHeaders.Add("Authorization", "bearer" + " " + token);
                var result = new HttpResponseMessage();
                if (this.globalAppSettings.EmbedDetails.Environment == "cloud")
                {
                    result = client.PostAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/v2.0/permissions/users", content).Result;
                }
                else
                {
                    result = client.PostAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/" + this.globalAppSettings.EmbedDetails.SiteIdentifier + "/v2.0/permissions/users", content).Result;
                }

                string resultContent = result.Content.ReadAsStringAsync().Result;
            }
        }
    }
}
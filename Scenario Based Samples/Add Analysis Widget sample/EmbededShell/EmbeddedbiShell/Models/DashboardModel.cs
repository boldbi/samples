// <copyright file="DashboardModel.cs" company="Syncfusion Inc">
// Copyright (c) Syncfusion Inc. All rights reserved.
// </copyright>

namespace SampleCoreApp.Models
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using System.Net.Http;
    using System.Security.Cryptography;
    using System.Text;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Newtonsoft.Json;

    /// <summary>
    /// DashboardModel Class.
    /// </summary>
    public class DashboardModel
    {
        private readonly GlobalAppSettings globalAppSettings;

        /// <summary>
        /// Initializes a new instance of the <see cref="DashboardModel"/> class.
        /// DashboardModel Constructor.
        /// </summary>
        public DashboardModel()
        {
            this.globalAppSettings = new GlobalAppSettings();
            var filePath = Startup.BasePath + "/App_Data/" + "default";
            this.globalAppSettings = new TenantModel().GetEmbedDetails(filePath, this.globalAppSettings);
        }

        /// <summary>
        /// The method will trigger a random string.
        /// </summary>
        /// <returns>Return the random string.</returns>
        public static string RandomString()
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, 30).Select(s => s[RandomNumberGenerator.GetInt32(s.Length)]).ToArray()).ToString().ToLower(CultureInfo.CurrentCulture);
        }

        /// <summary>
        /// The method will trigger GetDashboards API calls.
        /// </summary>
        /// <param name="email">UserEmail.</param>
        /// <returns>Return the string value of Dashboard details.</returns>
        public string GetDashboards(string email = null)
        {
            var token = this.GetToken(email);
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(this.globalAppSettings.EmbedDetails.RootUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Add("Authorization", token.TokenType + " " + token.AccessToken);
                client.DefaultRequestHeaders.Add("ETag", RandomString());
                var result = new HttpResponseMessage();
                if (this.globalAppSettings.EmbedDetails.Environment == "cloud")
                {
                    result = client.GetAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/v2.0/items?ItemType=2").Result;
                }
                else
                {
                    result = client.GetAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/" + this.globalAppSettings.EmbedDetails.SiteIdentifier + "/v2.0/items?ItemType=2").Result;
                }

                string resultContent = result.Content.ReadAsStringAsync().Result;
                return resultContent;
            }
        }

        /// <summary>
        /// The method will trigger GetDatasources API calls.
        /// </summary>
        /// <param name="email">UserEmail.</param>
        /// <returns>Return the string value of datasource details.</returns>
        public string GetDataSources(string email = null)
        {
            var userEmail = string.IsNullOrEmpty(email) ? this.globalAppSettings.EmbedDetails.UserDetails[0].Email : email;
            var token = this.GetToken(userEmail);
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(this.globalAppSettings.EmbedDetails.RootUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Add("Authorization", token.TokenType + " " + token.AccessToken);
                client.DefaultRequestHeaders.Add("ETag", RandomString());
                var result = new HttpResponseMessage();
                if (this.globalAppSettings.EmbedDetails.Environment == "cloud")
                {
                    result = client.GetAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/v2.0/items?ItemType=datasource").Result;
                }
                else
                {
                    result = client.GetAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/" + this.globalAppSettings.EmbedDetails.SiteIdentifier + "/v2.0/items?ItemType=datasource").Result;
                }

                string resultContent = result.Content.ReadAsStringAsync().Result;
                return resultContent;
            }
        }

        /// <summary>
        /// The method will trigger GetCategories API calls.
        /// </summary>
        /// <param name="email">UserEmail.</param>
        /// <returns>Return the string value of categories details.</returns>
        public List<ApiItems> GetCategories(string email)
        {
            var result = new List<ApiItems>();
            var token = this.GetToken(email);

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(this.globalAppSettings.EmbedDetails.RootUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Add("Authorization", token.TokenType + " " + token.AccessToken);
                var response = new HttpResponseMessage();
                if (this.globalAppSettings.EmbedDetails.Environment == "cloud")
                {
                    response = client.GetAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/v2.0/items?ItemType=Category").Result;
                }
                else
                {
                    response = client.GetAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/" + this.globalAppSettings.EmbedDetails.SiteIdentifier + "/v2.0/items?ItemType=Category").Result;
                }

                string resultContent = response.Content.ReadAsStringAsync().Result;
                result = JsonConvert.DeserializeObject<List<ApiItems>>(resultContent);
            }

            return result;
        }

        /// <summary>
        /// The method will trigger DeleteDashboard API calls.
        /// </summary>
        /// <param name="itemId">DashboardId.</param>
        /// <param name="email">UserEmail.</param>
        /// <returns>Return the HttpResponseMessage.</returns>
        public HttpResponseMessage DeleteDashboard(string itemId, string email)
        {
            var token = this.GetToken(email);

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(this.globalAppSettings.EmbedDetails.RootUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Add("Authorization", token.TokenType + " " + token.AccessToken);
                var response = new HttpResponseMessage();
                if (this.globalAppSettings.EmbedDetails.Environment == "cloud")
                {
                    response = client.DeleteAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/v2.0/items/" + itemId).Result;
                }
                else
                {
                    response = client.DeleteAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/" + this.globalAppSettings.EmbedDetails.SiteIdentifier + "/v2.0/items/" + itemId).Result;
                }

                return response;
            }
        }

        /// <summary>
        /// The method will trigger user permission for dashboard.
        /// </summary>
        /// <param name="value">HavePermission.</param>
        /// <param name="mail">UserEmail.</param>
        /// <returns>Return the HttpResponseMessage.</returns>
        public HttpResponseMessage UserPermissionDashboard(bool value, string mail)
        {
            string permissionId = string.Empty;
            string itemId = string.Empty;
            string permissionEntity = string.Empty;
            string permissionAccess = string.Empty;
            var token = this.GetToken(this.globalAppSettings.EmbedDetails.AdminEmail);
            ServerUser userDetails = new UserManagement().IsUserExist(mail, token.AccessToken);
            var response = new HttpResponseMessage();
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(this.globalAppSettings.EmbedDetails.RootUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Add("Authorization", "bearer" + " " + token.AccessToken);
                if (this.globalAppSettings.EmbedDetails.Environment == "cloud")
                {
                    response = client.GetAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/v2.0/permissions/users/" + userDetails.UserId).Result;
                }
                else
                {
                    response = client.GetAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/" + this.globalAppSettings.EmbedDetails.SiteIdentifier + "/v2.0/permissions/users/" + userDetails.UserId).Result;
                }

                var resultContent = JsonConvert.DeserializeObject<List<object>>(response.Content.ReadAsStringAsync().Result);
                if (value)
                {
                    foreach (var permission in resultContent)
                    {
                        permissionId = Newtonsoft.Json.Linq.JObject.Parse(permission.ToString())["PermissionId"].ToString();

                        // itemId = Newtonsoft.Json.Linq.JObject.Parse(permission.ToString())["ItemId"].ToString();
                        permissionEntity = Newtonsoft.Json.Linq.JObject.Parse(permission.ToString())["PermissionEntity"].ToString();
                        permissionAccess = Newtonsoft.Json.Linq.JObject.Parse(permission.ToString())["PermissionAccess"].ToString();
                        if (permissionEntity.ToLower(CultureInfo.CurrentCulture).Contains("dash", StringComparison.Ordinal))
                        {
                            if (!permissionAccess.ToLower(CultureInfo.CurrentCulture).Contains("create", StringComparison.Ordinal))
                            {
                                if (this.globalAppSettings.EmbedDetails.Environment == "cloud")
                                {
                                    response = client.DeleteAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/v2.0/permissions/users/" + int.Parse(permissionId, CultureInfo.CurrentCulture)).Result;
                                }
                                else
                                {
                                    response = client.DeleteAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/" + this.globalAppSettings.EmbedDetails.SiteIdentifier + "/v2.0/permissions/users/" + int.Parse(permissionId, CultureInfo.CurrentCulture)).Result;
                                }
                            }
                        }
                    }

                    var content = new FormUrlEncodedContent(new[]
                    {
                        new KeyValuePair<string, string>("PermissionAccess", "ReadWriteDelete"),
                        new KeyValuePair<string, string>("UserId", FormattableString.Invariant($"{userDetails.UserId}")),
                        new KeyValuePair<string, string>("PermissionEntity", "AllDashboards"),
                    });
                    if (this.globalAppSettings.EmbedDetails.Environment == "cloud")
                    {
                        response = client.PostAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/v2.0/permissions/users", content).Result;
                    }
                    else
                    {
                        response = client.PostAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/" + this.globalAppSettings.EmbedDetails.SiteIdentifier + "/v2.0/permissions/users", content).Result;
                    }
                }
                else
                {
                    foreach (var permission in resultContent)
                    {
                        permissionId = Newtonsoft.Json.Linq.JObject.Parse(permission.ToString())["PermissionId"].ToString();
                        itemId = (Newtonsoft.Json.Linq.JObject.Parse(permission.ToString())["ItemId"] != null) ? Newtonsoft.Json.Linq.JObject.Parse(permission.ToString())["ItemId"].ToString() : string.Empty;
                        permissionEntity = Newtonsoft.Json.Linq.JObject.Parse(permission.ToString())["PermissionEntity"].ToString();
                        permissionAccess = Newtonsoft.Json.Linq.JObject.Parse(permission.ToString())["PermissionAccess"].ToString();
                        if (permissionEntity.ToLower(CultureInfo.CurrentCulture).Contains("dash", StringComparison.Ordinal))
                        {
                            if (!permissionAccess.ToLower(CultureInfo.CurrentCulture).Contains("create", StringComparison.Ordinal))
                            {
                                if (this.globalAppSettings.EmbedDetails.Environment == "cloud")
                                {
                                    response = client.DeleteAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/v2.0/permissions/users/" + int.Parse(permissionId, CultureInfo.CurrentCulture)).Result;
                                }
                                else
                                {
                                    response = client.DeleteAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/" + this.globalAppSettings.EmbedDetails.SiteIdentifier + "/v2.0/permissions/users/" + int.Parse(permissionId, CultureInfo.CurrentCulture)).Result;
                                }

                                if (!string.IsNullOrEmpty(itemId) && !permissionEntity.Contains("All", StringComparison.Ordinal))
                                {
                                    var content = new FormUrlEncodedContent(new[]
                                    {
                                        new KeyValuePair<string, string>("PermissionAccess", "Read"),
                                        new KeyValuePair<string, string>("UserId", FormattableString.Invariant($"{userDetails.UserId}")),
                                        new KeyValuePair<string, string>("PermissionEntity", permissionEntity),
                                        new KeyValuePair<string, string>("ItemId", itemId),
                                    });
                                    if (this.globalAppSettings.EmbedDetails.Environment == "cloud")
                                    {
                                        response = client.PostAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/v2.0/permissions/users", content).Result;
                                    }
                                    else
                                    {
                                        response = client.PostAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/" + this.globalAppSettings.EmbedDetails.SiteIdentifier + "/v2.0/permissions/users", content).Result;
                                    }
                                }
                                else
                                {
                                    var content = new FormUrlEncodedContent(new[]
                                    {
                                        new KeyValuePair<string, string>("PermissionAccess", "Read"),
                                        new KeyValuePair<string, string>("UserId", FormattableString.Invariant($"{userDetails.UserId}")),
                                        new KeyValuePair<string, string>("PermissionEntity", "AllDashboards"),
                                    });
                                    if (this.globalAppSettings.EmbedDetails.Environment == "cloud")
                                    {
                                        response = client.PostAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/v2.0/permissions/users", content).Result;
                                    }
                                    else
                                    {
                                        response = client.PostAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/" + this.globalAppSettings.EmbedDetails.SiteIdentifier + "/v2.0/permissions/users", content).Result;
                                    }
                                }
                            }
                        }
                    }
                }

                return response;
            }
        }

        /// <summary>
        /// The method triggers user permission for datasource.
        /// </summary>
        /// <param name="value">HavePermission.</param>
        /// <param name="mail">UserEmail.</param>
        /// <returns>Return the HttpResponseMessage.</returns>
        public HttpResponseMessage UserPermissionDataSource(bool value, string mail)
        {
            string permissionId = string.Empty;
            string itemId = string.Empty;
            string permissionEntity = string.Empty;
            string permissionAccess = string.Empty;
            var token = this.GetToken(this.globalAppSettings.EmbedDetails.AdminEmail);
            ServerUser userDetails = new UserManagement().IsUserExist(mail, token.AccessToken);
            var response = new HttpResponseMessage();
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(this.globalAppSettings.EmbedDetails.RootUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Add("Authorization", "bearer" + " " + token.AccessToken);
                if (this.globalAppSettings.EmbedDetails.Environment == "cloud")
                {
                    response = client.GetAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/v2.0/permissions/users/" + userDetails.UserId).Result;
                }
                else
                {
                    response = client.GetAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/" + this.globalAppSettings.EmbedDetails.SiteIdentifier + "/v2.0/permissions/users/" + userDetails.UserId).Result;
                }

                var resultContent = JsonConvert.DeserializeObject<List<object>>(response.Content.ReadAsStringAsync().Result);
                if (value)
                {
                    foreach (var permission in resultContent)
                    {
                        permissionId = Newtonsoft.Json.Linq.JObject.Parse(permission.ToString())["PermissionId"].ToString();
                        permissionEntity = Newtonsoft.Json.Linq.JObject.Parse(permission.ToString())["PermissionEntity"].ToString();
                        permissionAccess = Newtonsoft.Json.Linq.JObject.Parse(permission.ToString())["PermissionAccess"].ToString();
                        if (permissionEntity.ToLower(CultureInfo.CurrentCulture).Contains("data", StringComparison.Ordinal))
                        {
                            if (!permissionAccess.ToLower(CultureInfo.CurrentCulture).Contains("create", StringComparison.Ordinal))
                            {
                                if (this.globalAppSettings.EmbedDetails.Environment == "cloud")
                                {
                                    response = client.DeleteAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/v2.0/permissions/users/" + int.Parse(permissionId, CultureInfo.CurrentCulture)).Result;
                                }
                                else
                                {
                                    response = client.DeleteAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/" + this.globalAppSettings.EmbedDetails.SiteIdentifier + "/v2.0/permissions/users/" + int.Parse(permissionId, CultureInfo.CurrentCulture)).Result;
                                }
                            }
                        }
                    }

                    var content = new FormUrlEncodedContent(new[]
                    {
                        new KeyValuePair<string, string>("PermissionAccess", "ReadWriteDelete"),
                        new KeyValuePair<string, string>("UserId", FormattableString.Invariant($"{userDetails.UserId}")),
                        new KeyValuePair<string, string>("PermissionEntity", "AllDataSources"),
                    });
                    if (this.globalAppSettings.EmbedDetails.Environment == "cloud")
                    {
                        response = client.PostAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/v2.0/permissions/users", content).Result;
                    }
                    else
                    {
                        response = client.PostAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/" + this.globalAppSettings.EmbedDetails.SiteIdentifier + "/v2.0/permissions/users/", content).Result;
                    }
                }
                else
                {
                    foreach (var permission in resultContent)
                    {
                        permissionId = Newtonsoft.Json.Linq.JObject.Parse(permission.ToString())["PermissionId"].ToString();
                        itemId = Newtonsoft.Json.Linq.JObject.Parse(permission.ToString())["ItemId"] != null ? Newtonsoft.Json.Linq.JObject.Parse(permission.ToString())["ItemId"].ToString() : string.Empty;
                        permissionEntity = Newtonsoft.Json.Linq.JObject.Parse(permission.ToString())["PermissionEntity"].ToString();
                        permissionAccess = Newtonsoft.Json.Linq.JObject.Parse(permission.ToString())["PermissionAccess"].ToString();
                        if (permissionEntity.ToLower(CultureInfo.CurrentCulture).Contains("data", StringComparison.Ordinal))
                        {
                            if (!permissionAccess.ToLower(CultureInfo.CurrentCulture).Contains("create", StringComparison.Ordinal))
                            {
                                if (this.globalAppSettings.EmbedDetails.Environment == "cloud")
                                {
                                    response = client.DeleteAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/v2.0/permissions/users/" + int.Parse(permissionId, CultureInfo.CurrentCulture)).Result;
                                }
                                else
                                {
                                    response = client.DeleteAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/" + this.globalAppSettings.EmbedDetails.SiteIdentifier + "/v2.0/permissions/users/" + int.Parse(permissionId, CultureInfo.CurrentCulture)).Result;
                                }

                                if (!string.IsNullOrEmpty(itemId) && !permissionEntity.Contains("All", StringComparison.Ordinal))
                                {
                                    var content = new FormUrlEncodedContent(new[]
                                    {
                                        new KeyValuePair<string, string>("PermissionAccess", "Read"),
                                        new KeyValuePair<string, string>("UserId", FormattableString.Invariant($"{userDetails.UserId}")),
                                        new KeyValuePair<string, string>("PermissionEntity", permissionEntity),
                                        new KeyValuePair<string, string>("ItemId", itemId.ToString()),
                                    });
                                    if (this.globalAppSettings.EmbedDetails.Environment == "cloud")
                                    {
                                        response = client.PostAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/v2.0/permissions/users", content).Result;
                                    }
                                    else
                                    {
                                        response = client.PostAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/" + this.globalAppSettings.EmbedDetails.SiteIdentifier + "/v2.0/permissions/users", content).Result;
                                    }
                                }
                                else
                                {
                                    var content = new FormUrlEncodedContent(new[]
                                    {
                                        new KeyValuePair<string, string>("PermissionAccess", "Read"),
                                        new KeyValuePair<string, string>("UserId", FormattableString.Invariant($"{userDetails.UserId}")),
                                        new KeyValuePair<string, string>("PermissionEntity", "AllDataSources"),
                                    });
                                    if (this.globalAppSettings.EmbedDetails.Environment == "cloud")
                                    {
                                        response = client.PostAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/v2.0/permissions/users", content).Result;
                                    }
                                    else
                                    {
                                        response = client.PostAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/" + this.globalAppSettings.EmbedDetails.SiteIdentifier + "/v2.0/permissions/users", content).Result;
                                    }
                                }
                            }
                        }
                    }
                }

                return response;
            }
        }

        /// <summary>
        /// The method will trigger making the dashboard public.
        /// </summary>
        /// <param name="itemId">DashboardId.</param>
        /// <param name="isPublic">IsPublic.</param>
        /// <param name="userEmail">UserEmail.</param>
        /// <returns>Return the Designer API response.</returns>
        public DesignerApiResponse MakeItemPublic(string itemId, bool isPublic, string userEmail)
        {
            var token = this.GetToken(userEmail);
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(this.globalAppSettings.EmbedDetails.RootUrl);
                client.DefaultRequestHeaders.Accept.Clear();

                var content = new FormUrlEncodedContent(new[]
                {
                    new KeyValuePair<string, string>("ItemType", "Dashboard"),
                    new KeyValuePair<string, string>("ItemId", itemId),
                    new KeyValuePair<string, string>("IsPublic", isPublic.ToString().ToLower(CultureInfo.CurrentCulture)),
                });

                client.DefaultRequestHeaders.Add("Authorization", "bearer" + " " + token.AccessToken);
                var result = new HttpResponseMessage();
                if (this.globalAppSettings.EmbedDetails.Environment == "cloud")
                {
                    result = client.PostAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/public-item/edit", content).Result;
                }
                else
                {
                    result = client.PostAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/" + this.globalAppSettings.EmbedDetails.SiteIdentifier + "/public-item/edit", content).Result;
                }

                string resultContent = result.Content.ReadAsStringAsync().Result;
                return JsonConvert.DeserializeObject<DesignerApiResponse>(resultContent);
            }
        }

        /// <summary>
        /// The method will trigger getting the token's value.
        /// </summary>
        /// <param name="email">UserEmail.</param>
        /// <returns>Return the Authentication Token.</returns>
        public Token GetToken(string email = "")
        {
            var userEmail = string.IsNullOrEmpty(email) ? this.globalAppSettings.EmbedDetails.UserDetails[0].Email : email;
            using (var client = new HttpClient())
            {
                var content = new FormUrlEncodedContent(new[]
                {
                    new KeyValuePair<string, string>("grant_type", "embed_secret"),
                    new KeyValuePair<string, string>("Username", userEmail),
                    new KeyValuePair<string, string>("embed_secret", this.globalAppSettings.EmbedDetails.EmbedSecret),
                });
                var result = new HttpResponseMessage();
                if (this.globalAppSettings.EmbedDetails.Environment == "cloud")
                {
                    result = client.PostAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/token", content).Result;
                }
                else
                {
                    result = client.PostAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/" + this.globalAppSettings.EmbedDetails.SiteIdentifier + "/token", content).Result;
                }

                string resultContent = result.Content.ReadAsStringAsync().Result;
                var tokenObj = JsonConvert.DeserializeObject<Token>(resultContent);
                return tokenObj;
            }
        }

        /// <summary>
        /// The method will trigger a refresh of the dashboard.
        /// </summary>
        /// <param name="itemId">DashboardId.</param>
        /// <returns>Return the Designer API response.</returns>
        public DesignerApiResponse RefreshDashboard(string itemId)
        {
            var token = this.GetToken();

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(this.globalAppSettings.EmbedDetails.RootUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Add("Authorization", token.TokenType + " " + token.AccessToken);
                var response = new HttpResponseMessage();
                if (this.globalAppSettings.EmbedDetails.Environment == "cloud")
                {
                    response = client.GetAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/v4.0/dashboard/" + itemId + "/refresh-data").Result;
                }
                else
                {
                    response = client.GetAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/" + this.globalAppSettings.EmbedDetails.SiteIdentifier + "/v4.0/dashboard/" + itemId + "/refresh-data").Result;
                }

                string resultContent = response.Content.ReadAsStringAsync().Result;
                var result = JsonConvert.DeserializeObject<DesignerApiResponse>(resultContent);
                return result;
            }
        }

        /// <summary>
        /// The method will trigger adding a data source.
        /// </summary>
        /// <param name="token">Token.</param>
        /// <param name="name">DatasourceName.</param>
        /// <param name="embedDetails">EmbedDetails.</param>
        /// <param name="userId">UserID.</param>
        /// <returns>Return the Designer API response.</returns>
        public DesignerApiResponse AddDatasource(Token token, string name, UserEmbedDetails embedDetails, int userId)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(this.globalAppSettings.EmbedDetails.RootUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                if (embedDetails == null)
                {
                    throw new ArgumentNullException(nameof(embedDetails));
                }

                var content = new FormUrlEncodedContent(new[]
                {
                    new KeyValuePair<string, string>("Name", name),
                    new KeyValuePair<string, string>("Type", embedDetails.DatasourceMode),
                    new KeyValuePair<string, string>("Connection", embedDetails.Credentials),
                    new KeyValuePair<string, string>("UserId", FormattableString.Invariant($"{userId}")),
                });

                client.DefaultRequestHeaders.Add("Authorization", "bearer" + " " + token?.AccessToken);
                var result = new HttpResponseMessage();
                if (this.globalAppSettings.EmbedDetails.Environment == "cloud")
                {
                    result = client.PostAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/v4.0/data-source/connection", content).Result;
                }
                else
                {
                    result = client.PostAsync(this.globalAppSettings.EmbedDetails.RootUrl + "/api/" + this.globalAppSettings.EmbedDetails.SiteIdentifier + "/v4.0/data-source/connection", content).Result;
                }

                string resultContent = result.Content.ReadAsStringAsync().Result;
                return JsonConvert.DeserializeObject<DesignerApiResponse>(resultContent);
            }
        }

        /// <summary>
        /// The method will be called to obtain the display name.
        /// </summary>
        /// <param name="email">UserEmail.</param>
        /// <returns>Return the Display name.</returns>
        public string GetDisplayName(string email)
        {
            string displayName = string.Empty;
            foreach (var user in this.globalAppSettings.EmbedDetails.UserDetails)
            {
                if (user.Email.Equals(email, StringComparison.Ordinal))
                {
                    displayName = user.DisplayName;
                }
            }

            return displayName;
        }
    }
}
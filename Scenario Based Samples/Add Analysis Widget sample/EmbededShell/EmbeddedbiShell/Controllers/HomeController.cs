// <copyright file="HomeController.cs" company="Syncfusion Inc">
// Copyright (c) Syncfusion Inc. All rights reserved.
// </copyright>

namespace SampleCoreApp.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.Globalization;
    using System.IO;
    using System.Linq;
    using System.Net.Http;
    using System.Security.Cryptography;
    using System.Text;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Linq;
    using SampleCoreApp.Models;

    /// <summary>
    /// HomeController Inheritance Class.
    /// </summary>
    public class HomeController : Controller
    {
        /// <summary>
        /// GlobalAppSettings member.
        /// </summary>
        private readonly GlobalAppSettings globalAppSettings;

        /// <summary>
        /// TenantModel member.
        /// </summary>
        private readonly TenantModel tenantModel = new TenantModel();

        /// <summary>
        /// HttpContextAccessor member.
        /// </summary>
        private readonly IHttpContextAccessor httpContextAccessor;

        /// <summary>
        /// Initializes a new instance of the <see cref="HomeController"/> class.
        /// HomeController constructor.
        /// </summary>
        /// <param name="contextAccessor">IHttpContextAccessor parameter.</param>
        public HomeController(IHttpContextAccessor contextAccessor)
        {
            this.httpContextAccessor = contextAccessor;
            this.globalAppSettings = this.tenantModel.GetTenantConfig();
        }

        /// <summary>
        /// The method will trigger Index View.
        /// </summary>
        /// <param name="categoryName">CategoryName.</param>
        /// <param name="sampleName">SampleName.</param>
        /// <param name="tabid">TabId.</param>
        /// <param name="email">UserEmail.</param>
        /// <param name="edit">IsEdit.</param>
        /// <param name="id">DashboardId.</param>
        /// <returns>Return the Index View.</returns>
        public IActionResult Index(string categoryName, string sampleName, int tabid = 0, string email = null, bool edit = false, string id = null)
        {
            var noResourceFound = false;
            var updatedSettings = this.globalAppSettings;
            ServerUser userDetails = null;
            SamplesTreeViewModel model = null;
            email = this.Request.Cookies["useremail"];
            this.globalAppSettings.ChangedUserEmail = string.IsNullOrEmpty(email) ? this.globalAppSettings.EmbedDetails.UserDetails[0].Email : email;
            this.ViewBag.UserId = 1;
            if (email != null)
            {
                var adminToken = new DashboardModel().GetToken(this.globalAppSettings.EmbedDetails.AdminEmail);
                userDetails = new UserManagement().IsUserExist(email, adminToken.AccessToken);
                if (userDetails != null)
                {
                    updatedSettings = this.tenantModel.GetUpdateSchema(this.globalAppSettings, userDetails.Email);
                    updatedSettings.UserDetails = userDetails;
                    this.ViewBag.UserDisplayName = new DashboardModel().GetDisplayName(userDetails.Email);
                    this.ViewBag.Token = new DashboardModel().GetToken(email).AccessToken;
                    this.ViewBag.UserId = userDetails.UserId;
                }
                else
                {
                    return this.View("Error");
                }
            }
            else
            {
                updatedSettings = this.tenantModel.GetUpdateSchema(this.globalAppSettings);
                updatedSettings.UserDetails = null;
                var adminToken = new DashboardModel().GetToken();
                userDetails = new UserManagement().IsUserExist(this.globalAppSettings.EmbedDetails.UserDetails[0].Email, adminToken.AccessToken);
                this.ViewBag.UserId = userDetails.UserId;
            }

            if (updatedSettings.SamplesCollection != null && updatedSettings.SamplesCollection.Count > 0)
            {
                if (edit && sampleName != null)
                {
                    var item = updatedSettings.SamplesCollection.FirstOrDefault(i => i.Name.ToLower(CultureInfo.CurrentCulture) == sampleName.ToLower(CultureInfo.CurrentCulture));
                    if (item != null)
                    {
                        item.IsEdit = edit;
                    }

                    if (categoryName != null)
                    {
                        var menuItem = updatedSettings.SamplesSchemaCollection.FirstOrDefault(i => i.Name.ToLower(CultureInfo.CurrentCulture) == categoryName.ToLower(CultureInfo.CurrentCulture));
                        if (menuItem != null && menuItem.Samples != null && menuItem.Samples.Count > 0)
                        {
                            var sample = menuItem.Samples.FirstOrDefault(j => j.Name.ToLower(CultureInfo.CurrentCulture) == sampleName.ToLower(CultureInfo.CurrentCulture));
                            sample.IsEdit = edit;
                        }
                    }
                }

                if (categoryName == null)
                {
                    var sampleModel = updatedSettings.SamplesCollection[0];
                    if (sampleModel.HasChild && !sampleModel.AsTab)
                    {
                        var userID = userDetails == null ? 1 : userDetails.UserId;
                        model = updatedSettings.SamplesCollection.FirstOrDefault(i => (i.ParentId == sampleModel.Id && i.Id != 101 && i.CreatedById == userID));
                        this.ViewBag.ParentName = model != null ? model.ParentName : string.Empty;
                        this.ViewBag.Name = model != null ? model.Name : string.Empty;
                        noResourceFound = model == null;
                    }
                    else
                    {
                        model = sampleModel;
                        this.ViewBag.Name = model.Name;
                        noResourceFound = true;
                    }
                }
                else if (sampleName == null)
                {
                    model = updatedSettings.SamplesCollection.FirstOrDefault(i => i.Name.ToLower(CultureInfo.CurrentCulture) == categoryName.ToLower(CultureInfo.CurrentCulture));
                    if (model != null)
                    {
                        this.ViewBag.Name = model.Name;
                        noResourceFound = !model.HasChild;
                    }
                }
                else
                {
                    sampleName = sampleName.Contains("&", StringComparison.Ordinal) ? sampleName.Substring(0, sampleName.IndexOf("&", StringComparison.Ordinal)) : sampleName;
                    model = updatedSettings.SamplesCollection.FirstOrDefault(i => i.Name.ToLower(CultureInfo.CurrentCulture) == sampleName.ToLower(CultureInfo.CurrentCulture) && i.ParentName != null && i.ParentName.ToLower(CultureInfo.CurrentCulture) == categoryName.ToLower(CultureInfo.CurrentCulture));
                    if (model != null)
                    {
                        this.ViewBag.ParentName = model.ParentName;
                        this.ViewBag.Name = model.Name;
                    }

                    this.ViewBag.IsEdit = edit;
                    if (edit)
                    {
                        var categories = new DashboardModel().GetCategories(email);
                        this.ViewBag.Category = categories.Where(x => x.Name == model.DashboardPath.Split('/')[1]).FirstOrDefault();
                    }
                }
            }

            this.ViewBag.DraftId = string.IsNullOrEmpty(id) ? string.Empty : id;
            this.ViewBag.GlobalAppSettings = updatedSettings;
            this.ViewBag.NoResourceFound = noResourceFound;
            if (model != null)
            {
                return this.View(model);
            }

            return this.View();
        }

        /// <summary>
        /// The method will initiate the process of obtaining embed details.
        /// </summary>
        /// <param name="embedQuerString">EmbedQueryString.</param>
        /// <returns>Embed details string value is returned.</returns>
        [HttpPost]
        [Route("GetDetails")]
        public string GetDetails([FromBody] object embedQuerString)
        {
            var userEmail = this.Request.Cookies["useremail"];
            var embedClass = JsonConvert.DeserializeObject<EmbedClass>(embedQuerString?.ToString());
            userEmail = string.IsNullOrEmpty(userEmail) ? this.globalAppSettings.EmbedDetails.AdminEmail : userEmail;
            var embedQuery = embedClass.EmbedQuerString;
            embedQuery += "&embed_user_email=" + userEmail;

            // To set embed_server_timestamp to overcome the EmbedCodeValidation failing while different timezone using at client application.
            double timeStamp = (int)DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1)).TotalSeconds;
            embedQuery += "&embed_server_timestamp=" + timeStamp;
            var embedDetailsUrl = "/embed/authorize?" + embedQuery.ToLower(CultureInfo.CurrentCulture) + "&embed_signature=" + new EmbedAction(this.globalAppSettings).GetSignatureUrl(embedQuery.ToLower(CultureInfo.CurrentCulture));

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(embedClass.DashboardServerApiUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                var result = client.GetAsync(embedClass.DashboardServerApiUrl + embedDetailsUrl).Result;
                //var result = client.GetAsync(embedClass.DashboardServerApiUrl + "/site/site1" + embedDetailsUrl).Result;
                string resultContent = result.Content.ReadAsStringAsync().Result;
                return resultContent;
            }
        }

        /// <summary>
        /// The method will cause changes to be made to the site index.
        /// </summary>
        /// <param name="email">UserEmail.</param>
        [HttpPost]
        [Route("change-index")]
        public void ChangeSiteIndex(string email)
        {
            this.tenantModel.CurrentUserEmail = email;
        }

        /// <summary>
        /// The method will cause the item to be deleted.
        /// </summary>
        /// <param name="itemId">ItemId.</param>
        /// <param name="userEmail">UserEmail.</param>
        /// <returns>Return the string value of status.</returns>
        [HttpPost]
        [Route("delete-item")]
        public string DeleteItem(string itemId, string userEmail)
        {
            var response = new DashboardModel().DeleteDashboard(itemId, userEmail);
            return response.StatusCode.ToString();
        }

        /// <summary>
        /// The method will activate database permission.
        /// </summary>
        /// <param name="chkValue">IsCheckValue.</param>
        /// <param name="userId">UserID.</param>
        /// <param name="userEmail">UserEmail.</param>
        /// <returns>Return the string value of status.</returns>
        [HttpPost]
        [Route("userdb-permission")]
        public string DBPermission(bool chkValue, string userId, string userEmail)
        {
            var response = new DashboardModel().UserPermissionDashboard(chkValue, userEmail);
            return response.StatusCode.ToString();
        }

        /// <summary>
        /// The method will activate datasource permission.
        /// </summary>
        /// <param name="chkValue">IsCheckValue.</param>
        /// <param name="userId">UserID.</param>
        /// <param name="userEmail">UserEmail.</param>
        /// <returns>Return the string value of status.</returns>
        [HttpPost]
        [Route("userds-permission")]
        public string DSPermission(bool chkValue, string userId, string userEmail)
        {
            var response = new DashboardModel().UserPermissionDataSource(chkValue, userEmail);
            return response.StatusCode.ToString();
        }

        /// <summary>
        /// The method will trigger a refresh of the dashboard.
        /// </summary>
        /// <param name="itemId">DashboardId.</param>
        /// <returns>Return the string value of status.</returns>
        [HttpPost]
        [Route("refresh-item")]
        public string RefreshItem(string itemId)
        {
            DesignerApiResponse response = new DashboardModel().RefreshDashboard(itemId);
            return response.Status.ToString();
        }

        /// <summary>
        /// The method will trigger getting the embed URL.
        /// </summary>
        /// <param name="userEmbeddetails">User embed details.</param>
        /// <returns>Return the embed URL.</returns>
        [HttpPost]
        [Route("api/embed/geturl")]
        [ObsoleteAttribute("This property is obsolete. Use NewProperty instead.", false)]
        public EmbedApiResponse GetUrl(UserEmbedDetails userEmbeddetails)
        {
            var response = new EmbedApiResponse();
            if (userEmbeddetails?.EmbedSecret == this.globalAppSettings.EmbedDetails.EmbedSecret)
            {
                var adminToken = new DashboardModel().GetToken();
                ServerUser userDetails = new UserManagement().VadidateUser(userEmbeddetails.UserEmail, userEmbeddetails);
                var credentials = userEmbeddetails.Credentials;
                string timeStamp = FormattableString.Invariant($"{DateTime.Now}");
                var secretToken = "DatasourceMode=" + userEmbeddetails.DatasourceMode + "&Credentials=" + credentials + "&Timestamp=" + timeStamp;
                var encryptedText = this.DoEncryption(secretToken);
                response.Url = this.globalAppSettings.EmbedDetails.BaseUrl + "?useremail=" + userEmbeddetails.UserEmail + "&token=" + encryptedText;
                response.Message = "Success";
            }
            else
            {
                response.Message = "Embed secret validation failed";
                response.Url = string.Empty;
            }

            return response;
        }

        /// <summary>
        /// The method will triggers for sharing the dashboard.
        /// </summary>
        /// <param name="itemId">DashboardId.</param>
        /// <param name="isPublic">IsPublic.</param>
        /// <param name="itemName">DashboardName.</param>
        /// <param name="userEmail">UserEmail.</param>
        /// <returns>Return the string value of status.</returns>
        [HttpPost]
        [Route("share-item")]
        public string ShareItem(string itemId, bool isPublic, string itemName, string userEmail)
        {
            DesignerApiResponse response = new DashboardModel().MakeItemPublic(itemId, !isPublic, userEmail);
            return response.Status.ToString();
        }

        /// <summary>
        /// The method will cause the dashboard to be encrypted.
        /// </summary>
        /// <param name="encryptedText">EncryptedText.</param>
        /// <returns>Return the string value of status.</returns>
        [ObsoleteAttribute("This property is obsolete. Use NewProperty instead.", false)]
        public string DoEncryption(string encryptedText)
        {
            if (string.IsNullOrWhiteSpace(encryptedText))
            {
                return string.Empty;
            }

            var plainTextBytes = Encoding.UTF8.GetBytes(encryptedText);
            var symmetricKey = new AesCryptoServiceProvider { Mode = CipherMode.CBC };

            var encryptor = symmetricKey.CreateEncryptor(this.GetKey(), this.GetVectorByte());
            var memoryStream = new MemoryStream();
            var cryptoStream = new CryptoStream(memoryStream, encryptor, CryptoStreamMode.Write);

            cryptoStream.Write(plainTextBytes, 0, plainTextBytes.Length);
            cryptoStream.FlushFinalBlock();

            var cipherTextBytes = memoryStream.ToArray();

            memoryStream.Close();
            cryptoStream.Close();
            return Convert.ToBase64String(cipherTextBytes);
        }

        /// <summary>
        /// The method will cause the dashboard to be decryted.
        /// </summary>
        /// <param name="encryptedToken">EncryptedToken.</param>
        /// <returns>Return the string value of status.</returns>
        [ObsoleteAttribute("This property is obsolete. Use NewProperty instead.", false)]
        public string Decrypt(string encryptedToken)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(encryptedToken))
                {
                    return string.Empty;
                }

                var cipherTextBytes = Convert.FromBase64String(encryptedToken);
                var symmetricKey = new AesCryptoServiceProvider { Mode = CipherMode.CBC };
                var decryptor = symmetricKey.CreateDecryptor(this.GetKey(), this.GetVectorByte());
                var memoryStream = new MemoryStream(cipherTextBytes);
                var cryptoStream = new CryptoStream(memoryStream, decryptor, CryptoStreamMode.Read);
                var plainTextBytes = new byte[cipherTextBytes.Length];
                var decryptedByteCount = cryptoStream.Read(plainTextBytes, 0, plainTextBytes.Length);

                memoryStream.Close();
                cryptoStream.Close();

                return Encoding.UTF8.GetString(plainTextBytes, 0, decryptedByteCount);
            }
            catch (Exception)
            {
                return string.Empty;
                throw;
            }
        }

        /// <summary>
        /// The method will triggers for getting KeyValue.
        /// </summary>
        /// <returns>Return the key value.</returns>
        private byte[] GetKey()
        {
            string key = this.globalAppSettings.EmbedDetails.EmbedSecret + "#";
            return ASCIIEncoding.UTF8.GetBytes(key);
        }

        /// <summary>
        /// The method will triggers for getting vector byte.
        /// </summary>
        /// <returns>Return the vector byte.</returns>
        private byte[] GetVectorByte()
        {
            string text = this.globalAppSettings.EmbedDetails.EmbedSecret + "#";
            return ASCIIEncoding.UTF8.GetBytes(text.Substring(0, 16));
        }
    }
}
using System;
using System.Collections.Generic;
using System.Diagnostics;
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

namespace SampleCoreApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly GlobalAppSettings _globalAppSettings;
        private readonly TenantModel _tenantModel = new TenantModel();
        public HomeController(IHttpContextAccessor contextAccessor)
        {
            _globalAppSettings = _tenantModel.GetTenantConfig(contextAccessor.HttpContext.Request.Host.Value);
        }

        public IActionResult Index(string categoryName, string sampleName, int tabid = 0, string email = null, bool edit = false, string id = null)
        {
            var noResourceFound = false;
            var updatedSettings = _globalAppSettings;
            ServerUser userDetails = null;
            SamplesTreeViewModel model = null;
            ViewBag.UserId = 1;
            if (email != null)
            {
                var adminToken = new DashboardModel().GetToken();
                userDetails = new UserManagement().IsUserExist(email, adminToken.AccessToken);
                if (userDetails != null)
                {
                    updatedSettings = _tenantModel.GetUpdateSchema(_globalAppSettings, userDetails.Email);
                    updatedSettings.UserDetails = userDetails;
                    ViewBag.UserDisplayName = userDetails.DisplayName;
                    var encrptedEmail = DoEncryption(email);
                    ViewBag.Token = encrptedEmail;
                    ViewBag.UserId = userDetails.UserId;
                }
                else
                {
                    return View("Error");
                }
            }
            else
            {
                updatedSettings = _tenantModel.GetUpdateSchema(_globalAppSettings);
                updatedSettings.UserDetails = null;
                var adminToken = new DashboardModel().GetToken();
                userDetails = new UserManagement().IsUserExist(_globalAppSettings.EmbedDetails.Email, adminToken.AccessToken);
                ViewBag.UserId = userDetails.UserId;
                var categories = new DashboardModel().GetCategories(email);
                ViewBag.Categories = categories;
                //return View("Error");
            }


            if (updatedSettings.SamplesCollection != null && updatedSettings.SamplesCollection.Count > 0)
            {
                if (edit && sampleName != null)
                {
                    var item = updatedSettings.SamplesCollection.FirstOrDefault(i => i.Name.ToLower() == sampleName.ToLower());
                    if (item != null)
                    item.IsEdit = edit;
                    if (categoryName != null)
                    {
                        var menuItem = updatedSettings.SamplesSchemaCollection.FirstOrDefault(i => i.Name.ToLower() == categoryName.ToLower());
                        if (menuItem != null && menuItem.Samples != null && menuItem.Samples.Count > 0)
                        {
                            var sample = menuItem.Samples.FirstOrDefault(j => j.Name.ToLower() == sampleName.ToLower());
                            sample.IsEdit = edit;
                        }
                    }
                }
                if (categoryName == null)
                {
                    var _model = updatedSettings.SamplesCollection[0];
                    if (_model.HasChild && !_model.AsTab)
                    {
                        var userID = userDetails == null ? 1 : userDetails.UserId;
                        //model = updatedSettings.SamplesCollection.FirstOrDefault(i => (i.ParentId == _model.Id && i.Id != 101 && i.CreatedById == userID));
                        ViewBag.ParentName = model != null ? model.ParentName : "";
                        ViewBag.Name = model != null ? model.Name : "";
                        noResourceFound = model == null;
                    }
                    else
                    {
                        model = _model;
                        ViewBag.Name = model.Name;
                        noResourceFound = true;
                    }
                }
                else if (sampleName == null)
                {
                    model = updatedSettings.SamplesCollection.FirstOrDefault(i => i.Name.ToLower() == categoryName.ToLower());
                    if (model != null)
                    {
                        ViewBag.Name = model.Name;
                        noResourceFound = !model.HasChild;
                    }
                }
                else
                {
                    sampleName = sampleName.Contains("&") ? sampleName.Substring(0, sampleName.IndexOf("&")) : sampleName;
                    model = updatedSettings.SamplesCollection.FirstOrDefault(i => i.Name.ToLower() == sampleName.ToLower() && i.CategoryName.ToLower() == categoryName.ToLower());
                    if (model != null)
                    {
                        ViewBag.ParentName = model.ParentName;
                        ViewBag.Name = model.Name;
                    }
                    ViewBag.IsEdit = edit;
                    if (edit)
                    {
                        var categories = new DashboardModel().GetCategories(email);
                        ViewBag.Category = categories.Where(x => x.Name == model.DashboardPath.Split('/')[1]).FirstOrDefault();
                    }
                }
            }
            ViewBag.DraftId = string.IsNullOrEmpty(id) ? "" : id;
            if (categoryName != null && categoryName != "all")
            {
                List<SamplesSchemaViewModel> sampleCollection = new List<SamplesSchemaViewModel>();
                foreach (var sample in _globalAppSettings.SamplesSchemaCollection[0].Samples)
                {
                    if (sample.CategoryName != null && sample.CategoryName.ToLower() == categoryName)
                    {
                        sampleCollection.Add(sample);
                    }
                    else if (categoryName == "All")
                    {
                        sampleCollection.Add(sample);
                    }
                }
                ViewBag.CategoryName = System.Globalization.CultureInfo.CurrentCulture.TextInfo.ToTitleCase(categoryName.ToLower());
                
                updatedSettings.SamplesSchemaCollection[0].Samples = sampleCollection;
            }
            ViewBag.GlobalAppSettings = updatedSettings;
            ViewBag.NoResourceFound = noResourceFound;
            if (model != null)
            {
                return View(model);
            }
            return View();
        }

        
        [Route("DashboardPage")]
        public IActionResult DashboardPage()
        {
            string categoryName = Request.HttpContext.Request.Query["categoryName"];
            string sampleName = Request.HttpContext.Request.Query["sampleName"];
            var isEdit = Request.HttpContext.Request.Query["edit"];
            var updatedSettings = _globalAppSettings;
            if(isEdit == "true")
            {
                ViewBag.IsEdit = true;
            }
            ViewBag.GlobalAppSettings = _globalAppSettings;
            SamplesTreeViewModel model = null;
            sampleName = sampleName.Contains("&") ? sampleName.Substring(0, sampleName.IndexOf("&")) : sampleName;
            model = updatedSettings.SamplesCollection.FirstOrDefault(i => i.Name.ToLower() == sampleName.ToLower() && i.CategoryName.ToLower() == categoryName.ToLower());
            return View(model);
        }

        [HttpPost]
        [Route("GetDetails")]
        public string GetDetails([FromBody] object embedQuerString)
        {
            var userEmail = Request.Cookies["useremail"];
            var embedClass = JsonConvert.DeserializeObject<EmbedClass>(embedQuerString.ToString());
            if (string.IsNullOrEmpty(userEmail))
                userEmail = _globalAppSettings.EmbedDetails.Email;
            var embedQuery = embedClass.embedQuerString.Replace("25", "");
            embedQuery += "&embed_user_email=" + userEmail;
            var embedDetailsUrl = "/embed/authorize?" + embedQuery.ToLower() + "&embed_signature=" + new EmbedAction(_globalAppSettings).GetSignatureUrl(embedQuery.ToLower());

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(embedClass.dashboardServerApiUrl);
                client.DefaultRequestHeaders.Accept.Clear();

                var result = client.GetAsync(embedClass.dashboardServerApiUrl + embedDetailsUrl).Result;
                string resultContent = result.Content.ReadAsStringAsync().Result;
                return resultContent;
            }
        }

        [HttpPost]
        [Route("delete-item")]
        public string DeleteItem(string itemId, string userEmail)
        {
            var response = new DashboardModel().DeleteDashboard(itemId, userEmail);
            return response.StatusCode.ToString();
        }

        [HttpPost]
        [Route("userdb-permission")]
        public string DBPermission(bool chkValue, string userId, string userEmail)
        {
            var response = new DashboardModel().UserPermissionDashboard(chkValue, userId, userEmail);
            return response.StatusCode.ToString();
        }

        [HttpPost]
        [Route("userds-permission")]
        public string DSPermission(bool chkValue, string userId, string userEmail)
        {
            var response = new DashboardModel().UserPermissionDataSource(chkValue, userId, userEmail);
            return response.StatusCode.ToString();
        }

        [HttpPost]
        [Route("getCategory")]
        public IActionResult GetCategory(string categoryName)
        {
            var response = categoryName;
            List<SamplesSchemaViewModel> sampleCollection = new List<SamplesSchemaViewModel>();
            foreach(var sample in _globalAppSettings.SamplesSchemaCollection[0].Samples)
            {
                if(sample.CategoryName == categoryName)
                {
                    sampleCollection.Add(sample);
                }
                else if(categoryName == "All")
                {
                    sampleCollection.Add(sample);
                }
            }
            ViewBag.Samples = sampleCollection;
            return PartialView("_dashboardPage");
        }

        [HttpPost]
        [Route("refresh-item")]
        public string RefreshItem(string itemId)
        {
            DesignerApiResponse response = new DashboardModel().RefreshDashboard(itemId);
            return response.Status.ToString();
        }


        [HttpPost]
        [Route("api/embed/geturl")]
        public EmbedResponse GetUrl(UserEmbedDetails userEmbeddetails)
        {
            var response = new EmbedResponse();
            if (userEmbeddetails.EmbedSecret == _globalAppSettings.EmbedDetails.EmbedSecret)
            {
                var adminToken = new DashboardModel().GetToken();
                ServerUser userDetails = new UserManagement().VadidateUser(userEmbeddetails.UserEmail, userEmbeddetails);
                var credentials = userEmbeddetails.Credentials;
                string timeStamp = DateTime.Now.ToString();
                var secretToken = "DatasourceMode=" + userEmbeddetails.DatasourceMode + "&Credentials=" + credentials + "&Timestamp=" + timeStamp;
                var encryptedText = DoEncryption(secretToken);
                response.Url = _globalAppSettings.EmbedDetails.BaseUrl + "?useremail=" + userEmbeddetails.UserEmail + "&token=" + encryptedText;
                response.Message = "Success";
            }
            else
            {
                response.Message = "Embed secret validation failed";
                response.Url = string.Empty;
            }
            return response;
        }

        [HttpPost]
        [Route("share-item")]
        public string ShareItem(string itemId, bool IsPublic, string itemName, string userEmail)
        {
            DesignerApiResponse response = new DashboardModel().MakeItemPublic(itemId, "Dashboard", !IsPublic, userEmail);
            return response.Status.ToString();
        }


        public string DoEncryption(string encryptedText)
        {
            if (string.IsNullOrWhiteSpace(encryptedText))
            {
                return string.Empty;
            }

            var plainTextBytes = Encoding.UTF8.GetBytes(encryptedText);
            var symmetricKey = new AesCryptoServiceProvider { Mode = CipherMode.CBC };

            var encryptor = symmetricKey.CreateEncryptor(GetKey(), GetVectorByte());
            var memoryStream = new MemoryStream();
            var cryptoStream = new CryptoStream(memoryStream, encryptor, CryptoStreamMode.Write);

            cryptoStream.Write(plainTextBytes, 0, plainTextBytes.Length);
            cryptoStream.FlushFinalBlock();

            var cipherTextBytes = memoryStream.ToArray();

            memoryStream.Close();
            cryptoStream.Close();
            return Convert.ToBase64String(cipherTextBytes);
        }

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
                var decryptor = symmetricKey.CreateDecryptor(GetKey(), GetVectorByte());
                var memoryStream = new MemoryStream(cipherTextBytes);
                var cryptoStream = new CryptoStream(memoryStream, decryptor, CryptoStreamMode.Read);
                var plainTextBytes = new byte[cipherTextBytes.Length];
                var decryptedByteCount = cryptoStream.Read(plainTextBytes, 0, plainTextBytes.Length);

                memoryStream.Close();
                cryptoStream.Close();

                return Encoding.UTF8.GetString(plainTextBytes, 0, decryptedByteCount);
            }
            catch (Exception ex)
            {
                return "";
            }
        }

        private byte[] GetKey()
        {
            string key = _globalAppSettings.EmbedDetails.EmbedSecret + "#";
            return ASCIIEncoding.UTF8.GetBytes(key);
        }

        private byte[] GetVectorByte()
        {
            string text = _globalAppSettings.EmbedDetails.EmbedSecret + "#";
            return ASCIIEncoding.UTF8.GetBytes(text.Substring(0, 16));
        }
    }
}

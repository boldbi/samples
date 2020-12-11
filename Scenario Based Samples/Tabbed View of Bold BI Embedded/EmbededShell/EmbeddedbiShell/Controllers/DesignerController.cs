using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SampleCoreApp.Models;

namespace SampleCoreApp.Controllers
{
    public class DesignerController : Controller
    {
        private readonly GlobalAppSettings _globalAppSettings;
        private readonly TenantModel _tenantModel = new TenantModel();
        public DesignerController(IHttpContextAccessor contextAccessor)
        {
            _globalAppSettings = _tenantModel.GetTenantConfig(contextAccessor.HttpContext.Request.Host.Value);
        }

        [Route("dashboard-designer")]
        public IActionResult Index(string email = null, string id = null, string name = null)
        {
            var updatedSettings = _globalAppSettings;
            SamplesTreeViewModel model = null;
            ViewBag.UserId = 1;
            ViewBag.DraftId = string.IsNullOrEmpty(id) ? "" : id;
            if (email != null)
            {
                var adminToken = new DashboardModel().GetToken();
                var userDetails = new UserManagement().IsUserExist(email, adminToken.AccessToken);
                if (userDetails != null)
                {
                    updatedSettings = _tenantModel.GetUpdateSchema(_globalAppSettings, userDetails.Email);
                    updatedSettings.UserDetails = userDetails;
                    ViewBag.UserDisplayName = userDetails.DisplayName;
                    ViewBag.UserId = userDetails.UserId;
                    ViewBag.DatasourceName = email.Split('@')[0];// + "_efilecabinet";
                }
                else
                {
                    return View("Error");
                }
            }
            else
            {
                updatedSettings = _tenantModel.GetUpdateSchema(_globalAppSettings);
                ViewBag.DatasourceName = _globalAppSettings.EmbedDetails.Email.Split('@')[0];
                var adminToken = new DashboardModel().GetToken();
                ServerUser userDetails = new UserManagement().IsUserExist(_globalAppSettings.EmbedDetails.Email, adminToken.AccessToken);
                ViewBag.UserId = userDetails.UserId;
            }

            var categories = new DashboardModel().GetCategories(email);
            ViewBag.Category = categories != null && categories.Count > 0 ? categories.FirstOrDefault() : null;
            ViewBag.GlobalAppSettings = updatedSettings;
            if (id != null && name != null)
            {
                ViewBag.DashboardName = name;
            }
            ViewBag.ParentName = "";
            ViewBag.Name = "";
            if (model != null)
            {
                return View(model);
            }

            return View();
        }
    }
}

// <copyright file="DesignerController.cs" company="Syncfusion Inc">
// Copyright (c) Syncfusion Inc. All rights reserved.
// </copyright>

namespace SampleCoreApp.Controllers
{
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

    /// <summary>
    /// DesignerController Inheritance Class.
    /// </summary>
    public class DesignerController : Controller
    {
        /// <summary>
        /// GlobalAppSettings member.
        /// </summary>
        private readonly GlobalAppSettings globalAppSettings;

        /// <summary>
        /// TenantModel Member.
        /// </summary>
        private readonly TenantModel tenantModel = new TenantModel();

        /// <summary>
        /// Initializes a new instance of the <see cref="DesignerController"/> class.
        /// DesignerController Constructor.
        /// </summary>
        public DesignerController()
        {
            this.globalAppSettings = this.tenantModel.GetTenantConfig();
        }

        /// <summary>
        /// TThe method will trigger Index View.
        /// </summary>
        /// <param name="email">UserEmail.</param>
        /// <param name="id">DashboardId.</param>
        /// <param name="name">DashboardName.</param>
        /// <returns>Return the View page.</returns>
        [Route("dashboard-designer")]
        public IActionResult Index(string email = null, string id = null, string name = null)
        {
            var updatedSettings = this.globalAppSettings;
            SamplesTreeViewModel model = null;
            this.ViewBag.UserId = 1;
            this.ViewBag.DraftId = string.IsNullOrEmpty(id) ? string.Empty : id;
            email = this.Request.Cookies["useremail"];
            email = string.IsNullOrEmpty(email) ? this.globalAppSettings.EmbedDetails.UserDetails[0].Email : email;
            if (email != null)
            {
                var adminToken = new DashboardModel().GetToken(this.globalAppSettings.EmbedDetails.AdminEmail);
                var userDetails = new UserManagement().IsUserExist(email, adminToken.AccessToken);
                if (userDetails != null)
                {
                    updatedSettings = this.tenantModel.GetUpdateSchema(this.globalAppSettings, userDetails.Email);
                    updatedSettings.UserDetails = userDetails;
                    this.ViewBag.UserDisplayName = new DashboardModel().GetDisplayName(userDetails.Email);
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
                var adminToken = new DashboardModel().GetToken();
                ServerUser userDetails = new UserManagement().IsUserExist(email, adminToken.AccessToken);
                this.ViewBag.UserId = userDetails.UserId;
            }

            //this.ViewBag.DatasourceName = "Northwind Datasource";
            //this.ViewBag.DatasourceName = "Sales_Data"; //onpremise
            //this.ViewBag.DatasourceName = "Patient Analysis Test data"; //cloud
            this.ViewBag.DatasourceName = this.globalAppSettings.EmbedDetails.DatasourceName;

            var categories = new DashboardModel().GetCategories(email);
            this.ViewBag.Category = categories != null && categories.Count > 0 ? categories.FirstOrDefault() : null;
            this.ViewBag.GlobalAppSettings = updatedSettings;
            if (id != null && name != null)
            {
                this.ViewBag.DashboardName = name;
            }

            this.ViewBag.ParentName = string.Empty;
            this.ViewBag.Name = string.Empty;
            if (model != null)
            {
                return this.View(model);
            }

            return this.View();
        }
    }
}
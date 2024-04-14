// <copyright file="TenantModel.cs" company="Syncfusion Inc">
// Copyright (c) Syncfusion Inc. All rights reserved.
// </copyright>

namespace SampleCoreApp.Models
{
    using System;
    using System.Collections.Concurrent;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Http;
    using Newtonsoft.Json;

    /// <summary>
    /// Tenant Model class.
    /// </summary>
    public class TenantModel
    {
        private string currentUserEmail = string.Empty;

        /// <summary>
        /// Initializes a new instance of the <see cref="TenantModel"/> class.
        /// TenantModel constructor.
        /// </summary>
        public TenantModel()
        {
        }

        /// <summary>
        /// Gets or sets tenantAppSettings member.
        /// </summary>
        public static ConcurrentDictionary<string, GlobalAppSettings> TenantAppSettings
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets currentUserEmail member.
        /// </summary>
        public string CurrentUserEmail
        {
            get { return this.currentUserEmail; }
            set { this.currentUserEmail = value; }
        }

        /// <summary>
        /// The method will be called to retrieve JSON data.
        /// </summary>
        /// <param name="filePath">FilePath.</param>
        /// <param name="globalAppSettings">GlobalAppSettings.</param>
        /// <returns>Return the GlobalAppSettings.</returns>
        public static GlobalAppSettings GetJsonData(string filePath, GlobalAppSettings globalAppSettings)
        {
            Component component = new Component();
            filePath = filePath + "/themes.json";
            using (StreamReader reader = new StreamReader(filePath))
            {
                string json = reader.ReadToEnd();
                component = JsonConvert.DeserializeObject<Component>(json);
                if (globalAppSettings == null)
                {
                    throw new ArgumentNullException(nameof(globalAppSettings));
                }

                if (component != null)
                {
                    if (component.Header != null)
                    {
                        globalAppSettings.Header = component.Header;
                    }

                    if (component.Header != null)
                    {
                        globalAppSettings.Sidebar = component.SideBar;
                    }

                    if (component.Header != null)
                    {
                        globalAppSettings.Footer = component.Footer;
                    }

                    if (component.BrandTitle != null)
                    {
                        globalAppSettings.BrandTitle = component.BrandTitle;
                    }

                    if (component.AppLogo != null)
                    {
                        globalAppSettings.AppLogo = component.AppLogo;
                    }
                }
            }

            return globalAppSettings;
        }

        /// <summary>
        /// The method for obtaining tenant configuration.
        /// </summary>
        /// <returns>Return the Global app settings.</returns>
        public GlobalAppSettings GetTenantConfig()
        {
            var subdomain = "default";

            // var splitedDomainIndex = hostName.IndexOf(".boldbi.com");
            // if (splitedDomainIndex > -1)
            // {
            //    subdomain = hostName.Substring(splitedDomainIndex);
            // }
            GlobalAppSettings globalAppSettings = null;

            if (TenantAppSettings == null)
            {
                TenantAppSettings = new ConcurrentDictionary<string, GlobalAppSettings>();
            }

            // If host is null, will get exception as "Key value cannot be null"
            TenantAppSettings.TryGetValue(subdomain, out globalAppSettings);

            if (globalAppSettings == null)
            {
                return this.SetTenantConfig(subdomain);
            }

            return globalAppSettings;
        }

        /// <summary>
        /// The method triggers when the GetEmbedDetails API calls.
        /// </summary>
        /// <param name="filepath">Filepath.</param>
        /// <param name="globalAppSettings">GlobalAppSettings.</param>
        /// <returns>Return the GlobalAppSettings.</returns>
        public GlobalAppSettings GetEmbedDetails(string filepath, GlobalAppSettings globalAppSettings)
        {
            using (StreamReader reader = new StreamReader(filepath + "/embedDetails.json"))
            {
                string json = reader.ReadToEnd();
                var embedDetails = JsonConvert.DeserializeObject<EmbedDetails>(json);
                if (globalAppSettings == null)
                {
                    throw new ArgumentNullException(nameof(globalAppSettings));
                }

                if (embedDetails != null)
                {
                    globalAppSettings.EmbedDetails = embedDetails;
                }
            }

            return globalAppSettings;
        }

        // public GlobalAppSettings GetUserDetails(string filepath, GlobalAppSettings globalAppSettings)
        // {
        //    var usersPath = filepath + "\\userDetails.json";
        //    if (File.Exists(usersPath))
        //    {
        //        using (StreamReader reader = new StreamReader(usersPath))
        //        {
        //            string json = reader.ReadToEnd();
        //            var userDetail = JsonConvert.DeserializeObject<UserDetail>(json);
        //            if (userDetail != null)
        //            {
        //                globalAppSettings.UserDetails = userDetail;
        //            }
        //        }
        //    }
        //    return globalAppSettings;
        // }

        /// <summary>
        /// The method triggers updating the schema.
        /// </summary>
        /// <param name="globalAppSettings">GlobalAppSettings.</param>
        /// <param name="email">UserEmail.</param>
        /// <returns>Return the GlobalAppSettings.</returns>
        public GlobalAppSettings GetUpdateSchema(GlobalAppSettings globalAppSettings, string email = null)
        {
            SamplesManager samplesCollectionManager = new SamplesManager(Startup.BasePath + "/App_Data/default/Samples.xml", email);
            if (globalAppSettings == null)
            {
                throw new ArgumentNullException(nameof(globalAppSettings));
            }

            globalAppSettings.SamplesCollection = samplesCollectionManager.GetTreeViewModelCollection();
            globalAppSettings.SamplesSchemaCollection = samplesCollectionManager.GetSchemaViewModel();
            globalAppSettings.UserToken = new DashboardModel().GetToken(email);
            globalAppSettings.ChangedUserEmail = email;
            return globalAppSettings;
        }

        private GlobalAppSettings SetTenantConfig(string hostName)
        {
            var isTenantExists = TenantAppSettings.Any(t => t.Key == hostName);

            if (!isTenantExists)
            {
                GlobalAppSettings globalAppSettings = this.InitializeSystemSettings(hostName);
                if (globalAppSettings != null)
                {
                    ////We are checking TenantAppSettings collection again since the key might be already added through an another thread.
                    if (!TenantAppSettings.Any(t => t.Key == hostName))
                    {
                        TenantAppSettings.TryAdd(hostName, globalAppSettings);
                    }
                    else
                    {
                        TenantAppSettings.TryGetValue(hostName, out globalAppSettings);
                    }
                }

                return globalAppSettings;
            }
            else
            {
                GlobalAppSettings globalAppSettings = null;

                TenantAppSettings.TryGetValue(hostName, out globalAppSettings);

                return globalAppSettings;
            }
        }

        private GlobalAppSettings InitializeSystemSettings(string hostName)
        {
            var globalAppSettings = new GlobalAppSettings();
            try
            {
                var filePath = Startup.BasePath + "/App_Data/" + hostName;
                globalAppSettings.Identity = hostName;
                globalAppSettings = GetJsonData(filePath, globalAppSettings);
                globalAppSettings = this.GetEmbedDetails(filePath, globalAppSettings);

                // globalAppSettings = GetUserDetails(filePath, globalAppSettings);
                SamplesManager samplesCollectionManager = new SamplesManager(filePath + "/Samples.xml");
                globalAppSettings.SamplesCollection = samplesCollectionManager.GetTreeViewModelCollection();
                globalAppSettings.SamplesSchemaCollection = samplesCollectionManager.GetSchemaViewModel();
                return globalAppSettings;
            }
            catch (Exception)
            {
                return null;
                throw;
            }
        }
    }
}
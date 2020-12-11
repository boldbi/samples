using Newtonsoft.Json;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SampleCoreApp.Models
{
    public class TenantModel
    {
        public TenantModel()
        {
        }

        public static ConcurrentDictionary<string, GlobalAppSettings> TenantAppSettings
        {
            get;
            set;
        }

        public GlobalAppSettings GetTenantConfig(string hostName)
        {
            var subdomain = "default";

            //var splitedDomainIndex = hostName.IndexOf(".boldbi.com");
            //if (splitedDomainIndex > -1)
            //{
            //    subdomain = hostName.Substring(splitedDomainIndex);
            //}

            GlobalAppSettings globalAppSettings = null;

            if (TenantAppSettings == null)
            {
                TenantAppSettings = new ConcurrentDictionary<string, GlobalAppSettings>();
            }

            //// If host is null, will get exception as "Key value cannot be null"
            TenantAppSettings.TryGetValue(subdomain, out globalAppSettings);

            if (globalAppSettings == null)
            {
                return SetTenantConfig(subdomain);
            }

            return globalAppSettings;
        }

        private GlobalAppSettings SetTenantConfig(string hostName)
        {
            var isTenantExists = TenantAppSettings.Any(t => t.Key == hostName);

            if (!isTenantExists)
            {
                GlobalAppSettings globalAppSettings = InitializeSystemSettings(hostName);
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
                var filePath = Startup.BasePath + "\\app_data\\" + hostName;
                globalAppSettings.Identity = hostName;
                globalAppSettings = GetJsonData(filePath, globalAppSettings);
                globalAppSettings = GetEmbedDetails(filePath, globalAppSettings);
                //globalAppSettings = GetUserDetails(filePath, globalAppSettings);
                SamplesCollectionManager samplesCollectionManager = new SamplesCollectionManager(filePath + "\\samples.xml");
                globalAppSettings.SamplesCollection = samplesCollectionManager.GetTreeViewModelCollection();
                globalAppSettings.SamplesSchemaCollection = samplesCollectionManager.GetSchemaViewModel();
                return globalAppSettings;
            }
            catch(Exception ex)
            {
                return null;
            }
        }

        public GlobalAppSettings GetJsonData(string filePath, GlobalAppSettings globalAppSettings)
        {
            Component component = new Component();
            filePath = filePath + "\\themes.json";
            using (StreamReader reader = new StreamReader(filePath))
            {
                string json = reader.ReadToEnd();
                component = JsonConvert.DeserializeObject<Component>(json);

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

        public GlobalAppSettings GetEmbedDetails(string filepath,GlobalAppSettings globalAppSettings)
        {
            using (StreamReader reader = new StreamReader(filepath + "\\embedDetails.json"))
            {
                string json = reader.ReadToEnd();
                var embedDetails = JsonConvert.DeserializeObject<EmbedDetails>(json);
                if (embedDetails != null)
                {
                    globalAppSettings.EmbedDetails = embedDetails;
                }
            }
            return globalAppSettings;
        }

        //public GlobalAppSettings GetUserDetails(string filepath, GlobalAppSettings globalAppSettings)
        //{
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
        //}

        public GlobalAppSettings GetUpdateSchema(GlobalAppSettings globalAppSettings, string email = null)
        {
            SamplesCollectionManager samplesCollectionManager = new SamplesCollectionManager(Startup.BasePath + "\\app_data\\default\\samples.xml", email);
            globalAppSettings.SamplesCollection = samplesCollectionManager.GetTreeViewModelCollection();
            globalAppSettings.SamplesSchemaCollection = samplesCollectionManager.GetSchemaViewModel();
            globalAppSettings.UserToken = new DashboardModel().GetToken(email);
            return globalAppSettings;
        }
    }
}

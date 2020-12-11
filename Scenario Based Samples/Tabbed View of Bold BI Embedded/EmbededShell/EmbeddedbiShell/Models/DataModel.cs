using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace SampleCoreApp.Models
{
    public class Section
    {
        public bool IsEnabled
        {
            get;
            set;
        }

        public bool IsFixed
        {
            get;
            set;
        }

        public string Theme
        {
            get;
            set;
        }

    }

    public class Component
    {
        public Section Header
        {
            get;
            set;
        }

        public Section SideBar
        {
            get;
            set;
        }

        public Section Footer
        {
            get;
            set;
        }

        public string BrandTitle
        {
            get;
            set;
        }

        public string AppLogo
        {
            get;
            set;
        }
    }

    public class User
    {
        public string DisplayName
        {
            get;
            set;
        }

        public string Email
        {
            get;
            set;
        }
    }

    public class UserDetail
    {
        public List<User> Users
        {
            get;
            set;
        }
    }

    public class EmbedDetails
    {
        public string EmbedSecret
        {
            get;
            set;
        }

        public string Serverurl
        {
            get;
            set;
        }

        public string Email
        {
            get;
            set;
        }

        public string AdminEmail
        {
            get;
            set;
        }

        public string Environment
        {
            get;
            set;
        }

        public string DisplayName
        {
            get;
            set;
        }

        public string BaseUrl
        {
            get;
            set;
        }

        public string RootUrl
        {
            get;set;
        }

        public string SiteIdentifier
        {
            get;set;
        }
    }

    [DataContract]
    public class EmbedClass
    {
        [DataMember]
        public string embedQuerString { get; set; }
        [DataMember]
        public string dashboardServerApiUrl { get; set; }
    }

    public class Token
    {
        [JsonProperty("access_token")]
        public string AccessToken
        {
            get;
            set;
        }

        [JsonProperty("token_type")]
        public string TokenType
        {
            get;
            set;
        }

        [JsonProperty("expires_in")]
        public string ExpiresIn
        {
            get;
            set;
        }

        [JsonProperty("email")]
        public string Email
        {
            get;
            set;
        }


        public string LoginResult
        {
            get;
            set;
        }

        public string LoginStatusInfo
        {
            get;
            set;
        }

        [JsonProperty(".issued")]
        public string Issued { get; set; }

        [JsonProperty(".expires")]
        public string Expires { get; set; }
    }

    [Serializable]
    [DataContract]
    public class ApiItems
    {
        /// <summary>
        /// Specifies the read permission of the item.
        /// </summary>
        [DataMember]
        public bool CanRead { get; set; }

        /// <summary>
        /// Specifies the write permission of the item.
        /// </summary>
        [DataMember]
        public bool CanWrite { get; set; }

        /// <summary>
        /// Specifies the delete permission of the item.
        /// </summary>
        [DataMember]
        public bool CanDelete { get; set; }

        /// <summary>
        /// Specifies the download permission of the item.
        /// </summary>
        [DataMember]
        public bool CanDownload { get; set; }

        /// <summary>
        /// Specifies the schedule permission of the item.
        /// </summary>
        [DataMember]
        public bool CanSchedule { get; set; }

        /// <summary>
        /// Specifies the open permission of the item.
        /// </summary>
        [DataMember]
        public bool CanOpen { get; set; }

        /// <summary>
        /// Specifies the move permission of the item.
        /// </summary>
        [DataMember]
        public bool CanMove { get; set; }

        /// <summary>
        /// Specifies the copy permission of the item.
        /// </summary>
        [DataMember]
        public bool CanCopy { get; set; }

        /// <summary>
        /// Specifies the clone permission of the item.
        /// </summary>
        [DataMember]
        public bool CanClone { get; set; }

        /// <summary>
        /// Specifies the create permission of the item.
        /// </summary>
        [DataMember]
        public bool CanCreateItem { get; set; }

        /// <summary>
        /// Item ID
        /// </summary>
        [DataMember]
        public Guid Id { get; set; }

        /// <summary>
        /// Item type.
        /// </summary>
        [DataMember]
        public string ItemType { get; set; }

        /// <summary>
        /// Item name.
        /// </summary>
        [DataMember]
        public string Name { get; set; }

        /// <summary>
        /// Item description.
        /// </summary>
        [DataMember]
        public string Description { get; set; }

        /// <summary>
        /// Item location.
        /// </summary>
        [DataMember]
        public string ItemLocation
        {
            get;
            set;
        }

        /// <summary>
        /// Specifies the user ID of the item creator.
        /// </summary>
        [DataMember]
        public int CreatedById { get; set; }

        /// <summary>
        /// Specifies the display name of the user who created the item.
        /// </summary>
        [DataMember]
        public string CreatedByDisplayName { get; set; }

        /// <summary>
        /// Specifies the user ID of the item modifier.
        /// </summary>
        [DataMember]
        public int ModifiedById { get; set; }

        /// <summary>
        /// Specifies the full name of the user who modified the item.
        /// </summary>
        [DataMember]
        public string ModifiedByFullName { get; set; }

        /// <summary>
        /// Category ID.
        /// </summary>
        [DataMember]
        public Guid? CategoryId { get; set; }

        /// <summary>
        /// Category name.
        /// </summary>
        [DataMember]
        public string CategoryName { get; set; }

        /// <summary>
        /// Date created of item in string format.
        /// </summary>
        [DataMember]
        public string CreatedDate { get; set; }

        /// <summary>
        /// Date modified of item in string format.
        /// </summary>
        [DataMember]
        public string ModifiedDate { get; set; }

        /// <summary>
        /// Date modified of item in date format.
        /// </summary>
        [DataMember]
        public DateTime ItemModifiedDate { get; set; }

        /// <summary>
        /// Date created of item in date format.
        /// </summary>
        [DataMember]
        public DateTime ItemCreatedDate { get; set; }

        /// <summary>
        /// Returns true if the dashboard is multi-dashboard.
        /// </summary>
        [DataMember]
        public bool IsMultiDashboard { get; set; }

        /// <summary>
        /// Returns true if it is a favorite item.
        /// </summary>
        [DataMember]
        public bool IsFavorite { get; set; }

        /// <summary>
        /// Returns true if the item is public.
        /// </summary>
        [DataMember]
        public bool IsPublic { get; set; }

        /// <summary>
        /// Specifies the details of the tab in a multi-tabbed dashboard.
        /// </summary>
        [DataMember]
        public List<ApiTabDetail> TabDetail { get; set; }

        /// <summary>
        /// Returns WidgetInfo for the specified dashboard.
        /// </summary>
        [DataMember]
        public string WidgetInfo { get; set; }

        ///// <summary>
        ///// Returns link of the file
        ///// </summary>
        //[DataMember]
        //public string FileLink { get; set; }
    }
    [Serializable]
    [DataContract]
    public class ApiTabDetail
    {
        /// <summary>
        /// Specifies the dashboard ID of the multi-tabbed dashboard.
        /// </summary>
        [DataMember]
        public Guid? MultiTabDashboardId { get; set; }

        /// <summary>
        /// Specifies the dashboard ID of the tab.
        /// </summary>
        [DataMember]
        public Guid DashboardId { get; set; }

        /// <summary>
        /// Specifies the name of the tab.
        /// </summary>
        [DataMember]
        public string Name { get; set; }

        /// <summary>
        /// Date created of item in string format
        /// </summary>
        [DataMember]
        public string CreatedDate { get; set; }

        /// <summary>
        /// Date modified of item in string format
        /// </summary>
        [DataMember]
        public string ModifiedDate { get; set; }
    }


    [Serializable]
    [DataContract]
    public class ApiResponse
    {
        /// <summary>
        /// Returns the status of the API.
        /// </summary>
        [DataMember]
        public bool ApiStatus
        {
            get;
            set;
        }

        /// <summary>
        /// Returns data from the API.
        /// </summary>
        [DataMember]
        public object Data
        {
            get;
            set;
        }

        /// <summary>
        /// Returns status of the API request.
        /// </summary>
        [DataMember]
        public bool Status
        {
            get;
            set;
        }

        /// <summary>
        /// Returns the status message from the API.
        /// </summary>
        [DataMember]
        public string StatusMessage
        {
            get;
            set;
        }

        /// <summary>
        /// Returns the message from the API.
        /// </summary>
        [DataMember]
        public string Message
        {
            get;
            set;
        }
    }
}
// <copyright file="APIResponse.cs" company="Syncfusion Inc">
// Copyright (c) Syncfusion Inc. All rights reserved.
// </copyright>

namespace SampleCoreApp.Models
{
    using System;
    using System.Collections.Generic;
    using System.Runtime.Serialization;
    using Newtonsoft.Json;

    /// <summary>
    /// APIResponse Class.
    /// </summary>
    [Serializable]
    [DataContract]
    public class APIResponse
    {
        /// <summary>
        /// Gets or sets id member.
        /// </summary>
        [JsonProperty("Id")]
        public string Id
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets name member.
        /// </summary>
        [JsonProperty("Name")]
        public string Name
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets dashboardPath member.
        /// </summary>
        [JsonProperty("DashboardPath")]
        public string DashboardPath
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets description member.
        /// </summary>
        [JsonProperty("Description")]
        public string Description
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets itemLocation member.
        /// </summary>
        [JsonProperty("ItemLocation")]
        public string ItemLocation
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets categoryName member.
        /// </summary>
        [JsonProperty("CategoryName")]
        public string CategoryName
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets createdById member.
        /// </summary>
        [JsonProperty("CreatedById")]
        public int CreatedById
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets createdByDisplayName.
        /// </summary>
        [JsonProperty("CreatedByDisplayName")]
        public string CreatedByDisplayName
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether isPublic member.
        /// </summary>
        [JsonProperty("IsPublic")]
        public bool IsPublic
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether canWriter member.
        /// </summary>
        [JsonProperty("CanWrite")]
        public bool CanWrite
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether canRead member.
        /// </summary>
        [JsonProperty("CanRead")]
        public bool CanRead
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether canDelete member.
        /// </summary>
        [JsonProperty("CanDelete")]
        public bool CanDelete
        {
            get;
            set;
        }
    }
}
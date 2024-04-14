// <copyright file="EmbedDetails.cs" company="Syncfusion Inc">
// Copyright (c) Syncfusion Inc. All rights reserved.
// </copyright>

namespace SampleCoreApp.Models
{
    using System;
    using System.Collections.Generic;
    using System.Runtime.Serialization;
    using Newtonsoft.Json;

    /// <summary>
    /// EmbedDetails class.
    /// </summary>
    public class EmbedDetails
    {
        /// <summary>
        /// Gets or sets embedSecret member.
        /// </summary>
        public string EmbedSecret
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets serverUrl member.
        /// </summary>
        public string Serverurl
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets email member.
        /// </summary>
        public string Email
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets adminEmail member.
        /// </summary>
        public string AdminEmail
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets environment member.
        /// </summary>
        public string Environment
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets displayName member.
        /// </summary>
        public string DisplayName
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets baseUrl member.
        /// </summary>
        public string BaseUrl
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets rootUrl member.
        /// </summary>
        public string RootUrl
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets siteIdentifier member.
        /// </summary>
        public string SiteIdentifier
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets userDetails member.
        /// </summary>
        public List<User> UserDetails
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets changeUserIndex member.
        /// </summary>
        public int ChangeUserIndex
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets widgetDetails member.
        /// </summary>
        public List<Widget> WidgetDetails
        {
            get;
            set;
        }
    }
}
// <copyright file="TabDetail.cs" company="Syncfusion Inc">
// Copyright (c) Syncfusion Inc. All rights reserved.
// </copyright>

namespace SampleCoreApp.Models
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web;
    using System.Xml.Serialization;

    /// <summary>
    /// TabDetail class.
    /// </summary>
    public class TabDetail
    {
        /// <summary>
        /// Gets or sets multiTabDashboardId member.
        /// </summary>
        public string MultiTabDashboardId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets dashboardId member.
        /// </summary>
        public string DashboardId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets name member.
        /// </summary>
        public string Name
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets createdDate member.
        /// </summary>
        public string CreatedDate
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets modifiedDate member.
        /// </summary>
        public string ModifiedDate
        {
            get;
            set;
        }
    }
}
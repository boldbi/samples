// <copyright file="ApiTabDetail.cs" company="Syncfusion Inc">
// Copyright (c) Syncfusion Inc. All rights reserved.
// </copyright>

namespace SampleCoreApp.Models
{
    using System;
    using System.Collections.Generic;
    using System.Runtime.Serialization;
    using Newtonsoft.Json;

    /// <summary>
    /// ApiTabDetail Class.
    /// </summary>
    [Serializable]
    [DataContract]
    public class ApiTabDetail
    {
        /// <summary>
        /// Gets or sets specifies the dashboard ID of the multi-tabbed dashboard.
        /// </summary>
        [DataMember]
        public Guid? MultiTabDashboardId { get; set; }

        /// <summary>
        /// Gets or sets specifies the dashboard ID of the tab.
        /// </summary>
        [DataMember]
        public Guid DashboardId { get; set; }

        /// <summary>
        /// Gets or sets specifies the name of the tab.
        /// </summary>
        [DataMember]
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets date created of item in string format.
        /// </summary>
        [DataMember]
        public string CreatedDate { get; set; }

        /// <summary>
        /// Gets or sets date modified of item in string format.
        /// </summary>
        [DataMember]
        public string ModifiedDate { get; set; }
    }
}
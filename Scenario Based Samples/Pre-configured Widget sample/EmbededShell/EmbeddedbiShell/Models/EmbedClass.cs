// <copyright file="EmbedClass.cs" company="Syncfusion Inc">
// Copyright (c) Syncfusion Inc. All rights reserved.
// </copyright>

namespace SampleCoreApp.Models
{
    using System;
    using System.Collections.Generic;
    using System.Runtime.Serialization;
    using Newtonsoft.Json;

    /// <summary>
    /// EmbedClass.
    /// </summary>
    [DataContract]
    public class EmbedClass
    {
        /// <summary>
        /// Gets or sets embedquerystring member.
        /// </summary>
        [DataMember]
        public string EmbedQuerString { get; set; }

        /// <summary>
        /// Gets or sets dashboardServerApiUrl member.
        /// </summary>
        [DataMember]
        public string DashboardServerApiUrl { get; set; }
    }
}
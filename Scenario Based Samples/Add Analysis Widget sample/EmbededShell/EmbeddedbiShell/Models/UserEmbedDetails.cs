// <copyright file="UserEmbedDetails.cs" company="Syncfusion Inc">
// Copyright (c) Syncfusion Inc. All rights reserved.
// </copyright>

namespace SampleCoreApp.Models
{
    using System;
    using System.Collections.Generic;
    using System.Runtime.Serialization;
    using Newtonsoft.Json;

    /// <summary>
    /// UserEmbedDetails member.
    /// </summary>
    public class UserEmbedDetails
    {
        /// <summary>
        /// Gets or sets embedSecret member.
        /// </summary>
        public string EmbedSecret { get; set; }

        /// <summary>
        /// Gets or sets datasourceMode member.
        /// </summary>
        public string DatasourceMode { get; set; }

        /// <summary>
        /// Gets or sets userEmail member.
        /// </summary>
        public string UserEmail { get; set; }

        /// <summary>
        /// Gets or sets credentials member.
        /// </summary>
        public string Credentials { get; set; }
    }
}
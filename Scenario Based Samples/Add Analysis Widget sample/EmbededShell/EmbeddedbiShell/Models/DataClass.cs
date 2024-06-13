// <copyright file="DataClass.cs" company="Syncfusion Inc">
// Copyright (c) Syncfusion Inc. All rights reserved.
// </copyright>

namespace SampleCoreApp.Models
{
    using System;
    using System.Collections.Generic;
    using System.Runtime.Serialization;
    using Newtonsoft.Json;

    /// <summary>
    /// Data class.
    /// </summary>
    public class DataClass
    {
        /// <summary>
        /// Gets or sets type member.
        /// </summary>
        public string Type
        {
            get; set;
        }

        /// <summary>
        /// Gets or sets connectionString member.
        /// </summary>
        public string ConnectionString
        {
            get; set;
        }
    }
}
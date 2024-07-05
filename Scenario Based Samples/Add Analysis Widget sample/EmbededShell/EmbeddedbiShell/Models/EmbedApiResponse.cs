// <copyright file="EmbedApiResponse.cs" company="Syncfusion Inc">
// Copyright (c) Syncfusion Inc. All rights reserved.
// </copyright>

namespace SampleCoreApp.Models
{
    using System;
    using System.Collections.Generic;
    using System.Runtime.Serialization;
    using Newtonsoft.Json;

    /// <summary>
    /// EmbedApiResponse Class.
    /// </summary>
    public class EmbedApiResponse
    {
        /// <summary>
        /// Gets or sets url member.
        /// </summary>
        public string Url
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets message member.
        /// </summary>
        public string Message
        {
            get;
            set;
        }
    }
}
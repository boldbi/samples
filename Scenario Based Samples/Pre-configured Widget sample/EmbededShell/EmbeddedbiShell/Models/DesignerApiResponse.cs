// <copyright file="DesignerApiResponse.cs" company="Syncfusion Inc">
// Copyright (c) Syncfusion Inc. All rights reserved.
// </copyright>

namespace SampleCoreApp.Models
{
    using System;
    using System.Collections.Generic;
    using System.Runtime.Serialization;
    using Newtonsoft.Json;

    /// <summary>
    /// DesignerApiResponse class.
    /// </summary>
    public class DesignerApiResponse
    {
        /// <summary>
        /// Gets or sets a value indicating whether returns the status of the API.
        /// </summary>
        [DataMember]
        public bool ApiStatus
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets returns data from the API.
        /// </summary>
        [DataMember]
        public DataClass Data
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether returns status of the API request.
        /// </summary>
        [DataMember]
        public bool Status
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets returns the status message from the API.
        /// </summary>
        [DataMember]
        public string StatusMessage
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets returns the message from the API.
        /// </summary>
        [DataMember]
        public string Message
        {
            get;
            set;
        }
    }
}
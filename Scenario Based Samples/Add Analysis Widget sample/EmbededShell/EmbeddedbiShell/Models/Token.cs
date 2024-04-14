// <copyright file="Token.cs" company="Syncfusion Inc">
// Copyright (c) Syncfusion Inc. All rights reserved.
// </copyright>

namespace SampleCoreApp.Models
{
    using System;
    using System.Collections.Generic;
    using System.Runtime.Serialization;
    using Newtonsoft.Json;

    /// <summary>
    /// Token class.
    /// </summary>
    public class Token
    {
        /// <summary>
        /// Gets or sets accessToken member.
        /// </summary>
        [JsonProperty("access_token")]
        public string AccessToken
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets tokenType member.
        /// </summary>
        [JsonProperty("token_type")]
        public string TokenType
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets expiresIn member.
        /// </summary>
        [JsonProperty("expires_in")]
        public string ExpiresIn
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets email member.
        /// </summary>
        [JsonProperty("email")]
        public string Email
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets loginResult member.
        /// </summary>
        public string LoginResult
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets loginStatusInfo member.
        /// </summary>
        public string LoginStatusInfo
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets issued member.
        /// </summary>
        [JsonProperty(".issued")]
        public string Issued { get; set; }

        /// <summary>
        /// Gets or sets expires member.
        /// </summary>
        [JsonProperty(".expires")]
        public string Expires { get; set; }
    }
}
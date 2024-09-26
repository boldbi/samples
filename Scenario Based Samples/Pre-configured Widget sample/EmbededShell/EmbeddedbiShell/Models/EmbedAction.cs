// <copyright file="EmbedAction.cs" company="Syncfusion Inc">
// Copyright (c) Syncfusion Inc. All rights reserved.
// </copyright>

namespace SampleCoreApp.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Http;
    using System.Security.Cryptography;
    using System.Threading.Tasks;
    using Newtonsoft.Json;
    using SampleCoreApp.Controllers;

    /// <summary>
    /// EmbedAction Class.
    /// </summary>
    public class EmbedAction
    {
        /// <summary>
        /// GlobalAppSettings member.
        /// </summary>
        private readonly GlobalAppSettings globalAppSettings;

        /// <summary>
        /// Initializes a new instance of the <see cref="EmbedAction"/> class.
        /// EmbedAction Constructor.
        /// </summary>
        /// <param name="globalAppSettings">GlobalAppSettings parameter.</param>
        public EmbedAction(GlobalAppSettings globalAppSettings)
        {
            this.globalAppSettings = globalAppSettings;
        }

        /// <summary>
        /// The method will trigger getting the signature URL.
        /// </summary>
        /// <param name="queryString">QueryString.</param>
        /// <returns>Return the string value of signature Url.</returns>
        public string GetSignatureUrl(string queryString)
        {
            if (queryString != null)
            {
                var encoding = new System.Text.UTF8Encoding();
                var keyBytes = encoding.GetBytes(this.globalAppSettings.EmbedDetails.EmbedSecret);
                var messageBytes = encoding.GetBytes(queryString);
                using (var hmacsha1 = new HMACSHA256(keyBytes))
                {
                    var hashMessage = hmacsha1.ComputeHash(messageBytes);
                    return Convert.ToBase64String(hashMessage);
                }
            }

            return string.Empty;
        }
    }
}
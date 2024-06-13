// <copyright file="User.cs" company="Syncfusion Inc">
// Copyright (c) Syncfusion Inc. All rights reserved.
// </copyright>

namespace SampleCoreApp.Models
{
    using System;
    using System.Collections.Generic;
    using System.Runtime.Serialization;
    using Newtonsoft.Json;

    /// <summary>
    /// User class.
    /// </summary>
    public class User
    {
        /// <summary>
        /// Gets or sets email member.
        /// </summary>
        public string Email
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
    }
}
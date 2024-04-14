// <copyright file="ServerUser.cs" company="Syncfusion Inc">
// Copyright (c) Syncfusion Inc. All rights reserved.
// </copyright>

namespace SampleCoreApp.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Xml.Serialization;

    /// <summary>
    /// ServerUser class.
    /// </summary>
    public class ServerUser
    {
        /// <summary>
        /// Gets or sets contactNumber.
        /// </summary>
        public string ContactNumber
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets displayName.
        /// </summary>
        public string DisplayName
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets email member.
        /// </summary>
        public string Email
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets firstName.
        /// </summary>
        public string FirstName
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether isActive member.
        /// </summary>
        public bool IsActive
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether isAzureAdUser member.
        /// </summary>
        public bool IsAzureAdUser
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets lastName member.
        /// </summary>
        public string Lastname
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets userId member.
        /// </summary>
        public int UserId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets userStatus member.
        /// </summary>
        public int UserStatus
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets username member.
        /// </summary>
        public string Username
        {
            get;
            set;
        }
    }
}
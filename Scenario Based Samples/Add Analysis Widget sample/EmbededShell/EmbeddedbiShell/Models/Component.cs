// <copyright file="Component.cs" company="Syncfusion Inc">
// Copyright (c) Syncfusion Inc. All rights reserved.
// </copyright>

namespace SampleCoreApp.Models
{
    using System;
    using System.Collections.Generic;
    using System.Runtime.Serialization;
    using Newtonsoft.Json;

    /// <summary>
    /// Component class.
    /// </summary>
    public class Component
    {
        /// <summary>
        /// Gets or sets header member.
        /// </summary>
        public Section Header
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets sideBar member.
        /// </summary>
        public Section SideBar
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets footer member.
        /// </summary>
        public Section Footer
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets brandTitle member.
        /// </summary>
        public string BrandTitle
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets appLogo member.
        /// </summary>
        public string AppLogo
        {
            get;
            set;
        }
    }
}
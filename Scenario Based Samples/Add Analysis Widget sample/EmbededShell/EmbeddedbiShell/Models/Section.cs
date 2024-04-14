// <copyright file="Section.cs" company="Syncfusion Inc">
// Copyright (c) Syncfusion Inc. All rights reserved.
// </copyright>

namespace SampleCoreApp.Models
{
    using System;
    using System.Collections.Generic;
    using System.Runtime.Serialization;
    using Newtonsoft.Json;

    /// <summary>
    /// SectionClass.
    /// </summary>
    public class Section
    {
        /// <summary>
        /// Gets or sets a value indicating whether isEnabled member.
        /// </summary>
        public bool IsEnabled
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether isFixed member.
        /// </summary>
        public bool IsFixed
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets theme member.
        /// </summary>
        public string Theme
        {
            get;
            set;
        }
    }
}
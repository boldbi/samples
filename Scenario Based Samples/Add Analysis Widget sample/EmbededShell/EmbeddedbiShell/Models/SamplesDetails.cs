// <copyright file="SamplesDetails.cs" company="Syncfusion Inc">
// Copyright (c) Syncfusion Inc. All rights reserved.
// </copyright>

namespace SampleCoreApp.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using System.Xml.Serialization;

    /// <summary>
    /// SamplesDetails class.
    /// </summary>
    [Serializable]
    [XmlRoot("SamplesModel")]
    public class SamplesDetails
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="SamplesDetails"/> class.
        /// SamplesDetails constructor.
        /// </summary>
        public SamplesDetails()
        {
            this.Samples = new List<Sample>();
            this.Categories = new List<Category>();
        }

        /// <summary>
        /// Gets or sets samples member.
        /// </summary>
        public List<Sample> Samples { get; set; }

        /// <summary>
        /// Gets or sets categories member.
        /// </summary>
        public List<Category> Categories { get; set; }
    }
}
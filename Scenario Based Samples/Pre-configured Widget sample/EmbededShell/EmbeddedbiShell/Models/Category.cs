// <copyright file="Category.cs" company="Syncfusion Inc">
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
    /// Category class.
    /// </summary>
    [Serializable]
    public class Category
    {
        /// <summary>
        /// Gets or Sets the Unique ID of the Category.
        /// </summary>
        [XmlElement("Id")]
        public int Id { get; set; }

        /// <summary>
        /// Gets or Sets the Name of the Category.
        /// </summary>
        [XmlElement("Name")]
        public string Name { get; set; }

        /// <summary>
        /// Gets or Sets the Description for the Category.
        /// </summary>
        [XmlElement("Description")]
        public string Description { get; set; }

        /// <summary>
        /// Gets or Sets the Parent Id of the Category.
        /// </summary>
        [XmlElement("ParentId")]
        public int? ParentId { get; set; }

        /// <summary>
        /// Gets or Sets Category sprite class.
        /// </summary>
        [XmlElement("SpiteClass")]
        public string SpiteClass { get; set; }

        /// <summary>
        /// Gets or Sets the File path of the sample.
        /// </summary>
        [XmlElement("Path")]
        public string Path { get; set; }

        /// <summary>
        /// Gets or Sets the File path of the sample.
        /// </summary>
        [XmlElement("DashboardPath")]
        public string DashboardPath { get; set; }

        /// <summary>
        /// Gets or Sets the Name for the sample.
        /// </summary>
        [XmlElement("Title")]
        public string Title { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether show the child element has the tabs.
        /// </summary>
        [XmlElement("AsTab")]
        public bool AsTab { get; set; }
    }
}
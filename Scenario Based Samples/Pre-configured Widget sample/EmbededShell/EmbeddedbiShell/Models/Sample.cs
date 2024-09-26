// <copyright file="Sample.cs" company="Syncfusion Inc">
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
    /// LifeCycle enum.
    /// </summary>
    [Serializable]
    public enum LifeCycle
    {
        /// <summary>
        /// None member.
        /// </summary>
        None = 0,

        /// <summary>
        /// New member.
        /// </summary>
        New = 1,

        /// <summary>
        /// Updated member.
        /// </summary>
        Updated = 2,

        /// <summary>
        /// Deprecated member.
        /// </summary>
        Deprecated = 3,
    }

    /// <summary>
    /// Sample Class.
    /// </summary>
    [Serializable]
    public class Sample
    {
        /// <summary>
        /// Gets or Sets the Unique ID of the sample.
        /// </summary>
        [XmlElement("Id")]
        public int Id { get; set; }

        /// <summary>
        /// Gets or Sets the Name for the sample.
        /// </summary>
        [XmlElement("Name")]
        public string Name { get; set; }

        /// <summary>
        /// Gets or Sets the Name for the sample.
        /// </summary>
        [XmlElement("Title")]
        public string Title { get; set; }

        /// <summary>
        /// Gets or Sets the Description for the sample.
        /// </summary>
        [XmlElement("Description")]
        public string Description { get; set; }

        /// <summary>
        /// Gets or Sets the CategoryId of the sample.
        /// </summary>
        [XmlElement("CategoryId")]
        public int CategoryId { get; set; }

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
        /// Gets or sets createdById member.
        /// </summary>
        public int CreatedById { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether isPublic member.
        /// </summary>
        public bool IsPublic { get; set; }

        /// <summary>
        /// Gets or sets itemID member.
        /// </summary>
        public string ItemID { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether canRead member.
        /// </summary>
        public bool CanRead { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether canWrite member.
        /// </summary>
        public bool CanWrite { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether canDelete member.
        /// </summary>
        public bool CanDelete { get; set; }
    }
}
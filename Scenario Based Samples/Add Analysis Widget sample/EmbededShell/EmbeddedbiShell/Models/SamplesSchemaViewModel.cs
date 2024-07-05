// <copyright file="SamplesSchemaViewModel.cs" company="Syncfusion Inc">
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
    /// SamplesSchemaViewModel class.
    /// </summary>
    public class SamplesSchemaViewModel
    {
        /// <summary>
        /// Gets or Sets the Unique ID of the Category.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Gets or Sets the Name of the Category.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Gets or Sets the Title of the Category.
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// Gets or Sets the File path of the sample.
        /// </summary>
        public string Path { get; set; }

        /// <summary>
        /// Gets or Sets the File path of the sample.
        /// </summary>
        public string DashboardPath { get; set; }

        /// <summary>
        /// Gets or Sets the Url of the sample.
        /// </summary>
        public string Url { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether HasChild member.
        /// </summary>
        public bool HasChild { get; set; }

        /// <summary>
        /// Gets or Sets Category sprite class.
        /// </summary>
        public string SpiteClass { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether asTab member.
        /// </summary>
        public bool AsTab { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether gets or Sets IsCategory prop.
        /// </summary>
        public bool IsCategory { get; set; }

        /// <summary>
        /// Gets or sets createdById member.
        /// </summary>
        public int CreatedById { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether isEdit member.
        /// </summary>
        public bool IsEdit { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether isPublic member.
        /// </summary>
        public bool IsPublic { get; set; }

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

        /// <summary>
        /// Gets or sets itemID member.
        /// </summary>
        public string ItemID { get; set; }

        /// <summary>
        /// Gets or Sets the child collection.
        /// </summary>
        public List<SamplesSchemaViewModel> Samples { get; set; }

        /// <summary>
        /// Gets or sets datasources member.
        /// </summary>
        public List<SamplesSchemaViewModel> DataSources { get; set; }

        /// <summary>
        /// The method will copy the samplesSchemaViewModel to other objects.
        /// </summary>
        /// <returns>Return the SamplesSchemaViewModel object.</returns>
        public SamplesSchemaViewModel Clone()
        {
            SamplesSchemaViewModel obj = new SamplesSchemaViewModel()
            {
                HasChild = this.HasChild,
                Id = this.Id,
                IsCategory = this.IsCategory,
                Name = this.Name,
                Path = this.Path,
                SpiteClass = this.SpiteClass,
                CreatedById = this.CreatedById,
                Url = this.Url,
            };
            if (this.Samples != null)
            {
                obj.Samples = new List<SamplesSchemaViewModel>();
                foreach (var item in this.Samples)
                {
                    obj.Samples.Add(item.Clone());
                }
            }

            return obj;
        }
    }
}
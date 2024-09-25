// <copyright file="SamplesTreeViewModel.cs" company="Syncfusion Inc">
// Copyright (c) Syncfusion Inc. All rights reserved.
// </copyright>

namespace SampleCoreApp.Models
{
    /// <summary>
    /// SamplesTreeViewModel class.
    /// </summary>
    public class SamplesTreeViewModel
    {
        /// <summary>
        /// Gets or sets id member.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets parentId member.
        /// </summary>
        public int? ParentId { get; set; }

        /// <summary>
        /// Gets or sets parentName member.
        /// </summary>
        public string ParentName { get; set; }

        /// <summary>
        /// Gets or sets name member.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets title member.
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// Gets or sets description member.
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Gets or sets url member.
        /// </summary>
        public string Url { get; set; }

        /// <summary>
        /// Gets or sets dashboardPath member.
        /// </summary>
        public string DashboardPath { get; set; }

        /// <summary>
        /// Gets or sets path member.
        /// </summary>
        public string Path { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether hasChild member.
        /// </summary>
        public bool HasChild { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether asTab member.
        /// </summary>
        public bool AsTab { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether isCategory member.
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
        /// Gets or sets itemID member.
        /// </summary>
        public string ItemID { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether canRead member.
        /// </summary>
        public bool CanRead { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether canDelete member.
        /// </summary>
        public bool CanDelete { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether canWrite member.
        /// </summary>
        public bool CanWrite { get; set; }
    }
}
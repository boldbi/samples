// <copyright file="ApiItems.cs" company="Syncfusion Inc">
// Copyright (c) Syncfusion Inc. All rights reserved.
// </copyright>

namespace SampleCoreApp.Models
{
    using System;
    using System.Collections.Generic;
    using System.Runtime.Serialization;
    using Newtonsoft.Json;

    /// <summary>
    /// ApiItems Class.
    /// </summary>
    [Serializable]
    [DataContract]
    public class ApiItems
    {
        /// <summary>
        /// Gets or sets a value indicating whether specifies the read permission of the item.
        /// </summary>
        [DataMember]
        public bool CanRead { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether specifies the write permission of the item.
        /// </summary>
        [DataMember]
        public bool CanWrite { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether specifies the delete permission of the item.
        /// </summary>
        [DataMember]
        public bool CanDelete { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether specifies the download permission of the item.
        /// </summary>
        [DataMember]
        public bool CanDownload { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether specifies the schedule permission of the item.
        /// </summary>
        [DataMember]
        public bool CanSchedule { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether specifies the open permission of the item.
        /// </summary>
        [DataMember]
        public bool CanOpen { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether specifies the move permission of the item.
        /// </summary>
        [DataMember]
        public bool CanMove { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether specifies the copy permission of the item.
        /// </summary>
        [DataMember]
        public bool CanCopy { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether specifies the clone permission of the item.
        /// </summary>
        [DataMember]
        public bool CanClone { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether specifies the create permission of the item.
        /// </summary>
        [DataMember]
        public bool CanCreateItem { get; set; }

        /// <summary>
        /// Gets or sets item ID.
        /// </summary>
        [DataMember]
        public Guid Id { get; set; }

        /// <summary>
        /// Gets or sets item type.
        /// </summary>
        [DataMember]
        public string ItemType { get; set; }

        /// <summary>
        /// Gets or sets item name.
        /// </summary>
        [DataMember]
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets item description.
        /// </summary>
        [DataMember]
        public string Description { get; set; }

        /// <summary>
        /// Gets or sets item location.
        /// </summary>
        [DataMember]
        public string ItemLocation { get; set; }

        /// <summary>
        /// Gets or sets specifies the user ID of the item creator.
        /// </summary>
        [DataMember]
        public int CreatedById { get; set; }

        /// <summary>
        /// Gets or sets specifies the display name of the user who created the item.
        /// </summary>
        [DataMember]
        public string CreatedByDisplayName { get; set; }

        /// <summary>
        /// Gets or sets specifies the user ID of the item modifier.
        /// </summary>
        [DataMember]
        public int ModifiedById { get; set; }

        /// <summary>
        /// Gets or sets specifies the full name of the user who modified the item.
        /// </summary>
        [DataMember]
        public string ModifiedByFullName { get; set; }

        /// <summary>
        /// Gets or sets category ID.
        /// </summary>
        [DataMember]
        public Guid? CategoryId { get; set; }

        /// <summary>
        /// Gets or sets category name.
        /// </summary>
        [DataMember]
        public string CategoryName { get; set; }

        /// <summary>
        /// Gets or sets date created of item in string format.
        /// </summary>
        [DataMember]
        public string CreatedDate { get; set; }

        /// <summary>
        /// Gets or sets date modified of item in string format.
        /// </summary>
        [DataMember]
        public string ModifiedDate { get; set; }

        /// <summary>
        /// Gets or sets date modified of item in date format.
        /// </summary>
        [DataMember]
        public DateTime ItemModifiedDate { get; set; }

        /// <summary>
        /// Gets or sets date created of item in date format.
        /// </summary>
        [DataMember]
        public DateTime ItemCreatedDate { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether returns true if the dashboard is multi-dashboard.
        /// </summary>
        [DataMember]
        public bool IsMultiDashboard { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether returns true if it is a favorite item.
        /// </summary>
        [DataMember]
        public bool IsFavorite { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether returns true if the item is public.
        /// </summary>
        [DataMember]
        public bool IsPublic { get; set; }

        /// <summary>
        /// Gets or sets specifies the details of the tab in a multi-tabbed dashboard.
        /// </summary>
        [DataMember]
        public List<ApiTabDetail> TabDetail { get; set; }

        /// <summary>
        /// Gets or sets returns WidgetInfo for the specified dashboard.
        /// </summary>
        [DataMember]
        public string WidgetInfo { get; set; }

        ///// <summary>
        ///// Returns link of the file
        ///// </summary>
        // [DataMember]
        // public string FileLink { get; set; }
    }
}
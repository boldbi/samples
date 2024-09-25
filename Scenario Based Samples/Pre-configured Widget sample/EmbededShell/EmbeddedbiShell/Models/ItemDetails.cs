// <copyright file="ItemDetails.cs" company="Syncfusion Inc">
// Copyright (c) Syncfusion Inc. All rights reserved.
// </copyright>

namespace SampleCoreApp.Models
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web;
    using System.Xml.Serialization;

    /// <summary>
    /// ItemDetails class.
    /// </summary>
    public class ItemDetails
    {
        /// <summary>
        /// Gets or sets a value indicating whether canRead member.
        /// </summary>
        public bool CanRead
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether canWrite member.
        /// </summary>
        public bool CanWrite
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether canDelete member.
        /// </summary>
        public bool CanDelete
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether canDownload member.
        /// </summary>
        public bool CanDownload
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether canSchedule member.
        /// </summary>
        public bool CanSchedule
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether canOpen member.
        /// </summary>
        public bool CanOpen
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether canMove member.
        /// </summary>
        public bool CanMove
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether canCopy member.
        /// </summary>
        public bool CanCopy
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether canClone member.
        /// </summary>
        public bool CanClone
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether canCreateItem member.
        /// </summary>
        public bool CanCreateItem
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets id member.
        /// </summary>
        public string Id
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets itemType member.
        /// </summary>
        public string ItemType
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets name member.
        /// </summary>
        public string Name
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets description member.
        /// </summary>
        public string Description
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets itemLocation member.
        /// </summary>
        public string ItemLocation
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets createdByDisplayName member.
        /// </summary>
        public string CreatedByDisplayName
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets createdById member.
        /// </summary>
        public int CreatedById
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets modifiedById member.
        /// </summary>
        public int ModifiedById
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

        /// <summary>
        /// Gets or sets modifiedByFullName member.
        /// </summary>
        public string ModifiedByFullName
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets categoryId member.
        /// </summary>
        public string CategoryId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets categoryName member.
        /// </summary>
        public string CategoryName
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets createdDate member.
        /// </summary>
        public string CreatedDate
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets modifiedDate member.
        /// </summary>
        public string ModifiedDate
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets itemModifiedDate member.
        /// </summary>
        public string ItemModifiedDate
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets itemCreatedDate member.
        /// </summary>
        public string ItemCreatedDate
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether isMultiDashboard member.
        /// </summary>
        public bool IsMultiDashboard
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether isFavorite member.
        /// </summary>
        public bool IsFavorite
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether isPublic member.
        /// </summary>
        public bool IsPublic
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets tabDetail member.
        /// </summary>
        public TabDetail TabDetail
        {
            get;
            set;
        }
    }
}
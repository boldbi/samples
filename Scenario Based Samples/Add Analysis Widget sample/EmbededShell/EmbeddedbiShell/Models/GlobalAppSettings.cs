// <copyright file="GlobalAppSettings.cs" company="Syncfusion Inc">
// Copyright (c) Syncfusion Inc. All rights reserved.
// </copyright>

namespace SampleCoreApp.Models
{
    /// <summary>
    /// GlobalAppSettings class.
    /// </summary>
    public class GlobalAppSettings
    {
        /// <summary>
        /// Gets or sets identity member.
        /// </summary>
        public string Identity { get; set; }

        /// <summary>
        /// Gets or sets header member.
        /// </summary>
        public Section Header { get; set; }

        /// <summary>
        /// Gets or sets sidebar member.
        /// </summary>
        public Section Sidebar { get; set; }

        /// <summary>
        /// Gets or sets footer member.
        /// </summary>
        public Section Footer { get; set; }

        /// <summary>
        /// Gets or sets brandTitle member.
        /// </summary>
        public string BrandTitle { get; set; }

        /// <summary>
        /// Gets or sets appLogo member.
        /// </summary>
        public string AppLogo { get; set; }

        /// <summary>
        /// Gets or sets embedDetails member.
        /// </summary>
        public EmbedDetails EmbedDetails { get; set; }

        /// <summary>
        /// Gets or sets userDetails member.
        /// </summary>
        public ServerUser UserDetails { get; set; }

        /// <summary>
        /// Gets or sets samplesSchemaCollection member.
        /// </summary>
        public List<SamplesSchemaViewModel> SamplesSchemaCollection { get; set; }

        /// <summary>
        /// Gets or sets samplesCollection member.
        /// </summary>
        public List<SamplesTreeViewModel> SamplesCollection { get; set; }

        /// <summary>
        /// Gets or sets userToken member.
        /// </summary>
        public Token UserToken { get; set; }

        /// <summary>
        /// Gets or sets changedUserEmail member.
        /// </summary>
        public string ChangedUserEmail { get; set; }
    }
}
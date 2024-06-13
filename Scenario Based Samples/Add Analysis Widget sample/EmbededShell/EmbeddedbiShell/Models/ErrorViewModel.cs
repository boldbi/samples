// <copyright file="ErrorViewModel.cs" company="Syncfusion Inc">
// Copyright (c) Syncfusion Inc. All rights reserved.
// </copyright>

namespace SampleCoreApp.Models
{
    using System;

    /// <summary>
    /// ErrorViewModel Class.
    /// </summary>
    public class ErrorViewModel
    {
        /// <summary>
        /// Gets or sets requestId member.
        /// </summary>
        public string RequestId { get; set; }

        /// <summary>
        /// Gets a value indicating whether showRequestId member.
        /// </summary>
        public bool ShowRequestId => !string.IsNullOrEmpty(this.RequestId);
    }
}
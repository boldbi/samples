using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace SampleCoreApp.Models
{
    public class DesignerApiResponse
    {
        /// <summary>
        /// Returns the status of the API.
        /// </summary>
        [DataMember]
        public bool ApiStatus
        {
            get;
            set;
        }

        /// <summary>
        /// Returns data from the API.
        /// </summary>
        [DataMember]
        public Data Data
        {
            get;
            set;
        }

        /// <summary>
        /// Returns status of the API request.
        /// </summary>
        [DataMember]
        public bool Status
        {
            get;
            set;
        }

        /// <summary>
        /// Returns the status message from the API.
        /// </summary>
        [DataMember]
        public string StatusMessage
        {
            get;
            set;
        }

        /// <summary>
        /// Returns the message from the API.
        /// </summary>
        [DataMember]
        public string Message
        {
            get;
            set;
        }
    }

    public class Data
    {
        public string Type
        {
            get; set;
        }

        public string ConnectionString
        {
            get; set;
        }
    }
}
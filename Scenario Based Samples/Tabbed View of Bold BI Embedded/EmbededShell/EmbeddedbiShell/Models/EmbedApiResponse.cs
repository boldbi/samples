using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace SampleCoreApp.Models
{
    public class UserEmbedDetails
    {
        public string EmbedSecret { get; set; }

        public string DatasourceMode { get; set; }

        public string UserEmail { get; set; }

        public string Credentials { get; set; }

    }

    public class EmbedResponse
    {
        public string Url { get; set; }

        public string Message
        {
            get;
            set;
        }
    }
}
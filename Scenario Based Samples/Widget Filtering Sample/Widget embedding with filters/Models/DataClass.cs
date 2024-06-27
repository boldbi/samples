  using System.Runtime.Serialization;
  using Newtonsoft.Json;
  
  [DataContract]
     public class EmbedClass
     {
        [DataMember]
        public string embedQuerString { get; set; }
        [DataMember]
        public string dashboardServerApiUrl { get; set; }
     }

      public class EmbedDetails
      {
         public string Environment { get; set; }

         public string SiteIdentifier { get; set; }

         public string ServerUrl { get; set; }

         public string EmbedSecret { get; set; }

         public string UserEmail { get; set; }

         public string EmbedType { get; set; }
  
         public string DashboardId { get; set; }
      }
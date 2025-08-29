using System.Runtime.Serialization;

namespace IframeFullServer.Models
{
    public class JwtPostModel
    {
        [DataMember]
        public string Jwt
        {
            get;
            set;
        }

        [DataMember]
        public string Url
        {
            get;
            set;
        }

        [DataMember]
        public string SiteIdentifier
        {
            get;
            set;
        }
        
        [DataMember]
        public string RedirectTo
        {
            get;
            set;
        }
    }
}
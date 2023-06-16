using System.Runtime.Serialization;

namespace IframeFullServer.Models
{
    public class User
    {
        [DataMember]
        public string Email
        {
            get;
            set;
        }
    }
}
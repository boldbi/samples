using System.Runtime.Serialization;

namespace IframeFullServerSample.Models
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

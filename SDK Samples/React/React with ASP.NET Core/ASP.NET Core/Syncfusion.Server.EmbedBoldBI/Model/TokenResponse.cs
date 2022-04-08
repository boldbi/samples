//using Newtonsoft.Json;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;

//namespace Syncfusion.Server.EmbedBoldBI.Model
//{
//    public class TokenResponse
//    {
//        public string Message { get; set; }
//        public bool Status { get; set; }
//        public Token Token { get; set; }
//    }

//    public class Token
//    {
//        public string Access_token
//        {
//            get;
//            set;
//        }

//        public string Token_type
//        {
//            get;
//            set;
//        }

//        public string Expires_in
//        {
//            get;
//            set;
//        }

//        public string Email
//        {
//            get;
//            set;
//        }

//        public string ErrorDescription
//        {
//            get;
//            set;
//        }

//        public string LoginResult
//        {
//            get;
//            set;
//        }

//        public string LoginStatusInfo
//        {
//            get;
//            set;
//        }

//        [JsonProperty(".issued")]
//        public string Issued { get; set; }

//        [JsonProperty(".expires")]
//        public string Expires { get; set; }
//    }
//}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Dynamic_Connection_String.Models
{
    public class ApiResponse
    {
        public object Data
        {
            get;
            set;
        }

        public bool Status
        {
            get;
            set;
        }

        public string Message
        {
            get;
            set;
        }
    }
}
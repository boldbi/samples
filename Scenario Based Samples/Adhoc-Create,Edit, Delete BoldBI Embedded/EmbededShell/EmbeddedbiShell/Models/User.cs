using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Serialization;

namespace SampleCoreApp.Models
{
    public class ServerUser
    {
        public string ContactNumber
        {
            get;
            set;
        }

        public string DisplayName
        {
            get;
            set;
        }

        public string Email
        {
            get;
            set;
        }

        public string FirstName
        {
            get;
            set;
        }


        public bool IsActive
        {
            get;
            set;
        }

        public bool IsAzureAdUser
        {
            get;
            set;
        }

        public string Lastname
        {
            get;
            set;
        }

        public int UserId
        {
            get;
            set;
        }

        public int UserStatus
        {
            get;
            set;
        }

        public string Username
        {
            get;
            set;
        }
    }
}
using Dynamic_Connection_String.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace Dynamic_Connection_String.Controllers
{
    public class ConnectionController : ApiController
    {
        [System.Web.Http.HttpHead]
        [System.Web.Http.HttpPost]
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/get-connection-details")]
        public ApiResponse GetConnectionDetails()
        {
            try
            {
                var dataSourceName = HttpContext.Current.Request.Params["datasourcename"];
                var dataSourceId = HttpContext.Current.Request.Params["datasourceid"];
                var customIdentity = HttpContext.Current.Request.Headers["customIdentity"];
                var identityType = HttpContext.Current.Request.Headers["identityType"];
                var reqparams = HttpContext.Current.Request.Params["requiredParams"];
                if (!string.IsNullOrEmpty(customIdentity))
                {
                    if (identityType.ToString().ToLowerInvariant().Equals("custom") || identityType.ToString().ToLowerInvariant().Equals("email") || identityType.ToString().ToLowerInvariant().Equals("full name"))
                    {
                       if (customIdentity == "1" || customIdentity.ToString().ToLowerInvariant().Equals("test1@test.com") || customIdentity.ToString().ToLowerInvariant().Equals("user1"))
                        {
                            return new ApiResponse
                            {
                                Status = true,
                                Message = "Success",
                                Data = new
                                {
                                    DataSource = "data source name",
                                    InitialCatalog = "DB1",
                                    Username = "user name",
                                    Password = "password",
                                    IntegratedSecurity = "false",
                                    AdvancedSettings = "",
                                    IsEnableSSL="false",
                                    CommandTimeout = "300"
                                }
                            };
                        }
                        else if (customIdentity == "2" || customIdentity.ToString().ToLowerInvariant().Equals("test2@test.com") || customIdentity.ToString().ToLowerInvariant().Equals("user2"))
                        {
                            return new ApiResponse
                            {
                                Status = true,
                                Message = "Success",
                                Data = new
                                {
                                    DataSource = "data source name",
                                    InitialCatalog = "DB2",
                                    Username = "user name",
                                    Password = "password",
                                    IntegratedSecurity = "false",
                                    AdvancedSettings = "",
                                    IsEnableSSL = "false",
                                    CommandTimeout = "300"
                                }
                            };
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return new ApiResponse
                {
                    Status = false,
                    Message = ex.Message
                };
            }
            return new ApiResponse
            {
                Status = false
            };
        }
    }
}
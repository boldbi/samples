using System.Web;
using System.Web.Mvc;

namespace Dynamic_Connection_String
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}

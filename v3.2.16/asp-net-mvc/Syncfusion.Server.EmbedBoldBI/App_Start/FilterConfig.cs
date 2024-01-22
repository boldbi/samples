using System.Web;
using System.Web.Mvc;

namespace Syncfusion.Server.EmbedBoldBI
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}

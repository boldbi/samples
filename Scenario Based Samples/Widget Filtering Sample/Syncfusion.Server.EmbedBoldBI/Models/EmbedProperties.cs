namespace Syncfusion.Server.EmbedBoldBI.Models
{
    public class EmbedProperties
    {
        //Dashboard Server BI URL (ex: http://localhost:5000/bi, http://demo.boldbi.com/bi)
        public static string RootUrl = "";

        //For Bold BI Enterprise edition, it should be like `site/site1`. For Bold BI Cloud, it should be empty string.
        public static string SiteIdentifier = "";

        //Your Bold BI application environment. (If Cloud, you should use `cloud`, if Enterprise, you should use `enterprise`)
        public static string Environment = "";

        //Enter your BoldBI credentials here.
        public static string UserEmail = "";
        public static string UserPassword = "";

        //Enter the dashboard path of the dashboard.
        public static string DashboardPath= "";

        // Get the embedSecret key from Bold BI.
        public static string EmbedSecret = "";
    }
}

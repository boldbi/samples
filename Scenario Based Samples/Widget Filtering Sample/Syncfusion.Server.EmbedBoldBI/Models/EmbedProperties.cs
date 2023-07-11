namespace Syncfusion.Server.EmbedBoldBI.Models
{
    public class EmbedProperties
    {
        //Dashboard Server BI URL (ex: http://localhost:5000/bi, http://demo.boldbi.com/bi)
        public static string RootUrl = "http://localhost:58144/bi";

        //For Bold BI Enterprise edition, it should be like `site/site1`. For Bold BI Cloud, it should be empty string.
        public static string SiteIdentifier = "site/site1";

        //Your Bold BI application environment. (If Cloud, you should use `cloud`, if Enterprise, you should use `enterprise`)
        public static string Environment = "enterprise";

        //Enter your BoldBI credentials here.
        public static string UserEmail = "naveena@boldbi.com";
        public static string UserPassword = "Naveena@123";

        //Enter the dashboard path of the dashboard.
        public static string DashboardPath= "/Support/Agent Activity Dashboard";

        // Get the embedSecret key from Bold BI.
        public static string EmbedSecret = "ZuNj6jVVsSntgBKFLIDtvouTHPDSLpOP";
    }
}

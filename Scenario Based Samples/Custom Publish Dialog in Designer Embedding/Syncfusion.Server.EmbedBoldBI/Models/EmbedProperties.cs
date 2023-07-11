namespace Syncfusion.Server.EmbedBoldBI.Models
{    public class EmbedProperties
    {
        // Dashboard Server BI URL(ex: http://localhost:5000/bi, http://demo.boldbi.com/bi)
        public static string RootUrl = "https://localhost:56784/bi";

        //  For Bold BI Enterprise edition, it should be like `site/site1`. For Bold BI Cloud, it should be empty string.
        public static string SiteIdentifier = "site/site1";

        // Your Bold BI application environment. (If Cloud, you should use `cloud`, if Enterprise, you should use `enterprise`)
        public static string Environment = "enterprise";

        // Enter DashboardId you want to render
        public static string DashboardId = "c725d3bd-b38a-4315-90df-f9a319aa77bd";

        // Enter your BoldBI credentials here.
        public static string UserEmail = "username@boldbi.com";

        //  Get the embedSecret key from Bold BI.Please refer this link(https://help.syncfusion.com/bold-bi/on-premise/site-settings/embed-settings)
        public static string EmbedSecret = "sUupDKaujKIyXlYAPWgvj1jW0OsCXuq";
    }
}

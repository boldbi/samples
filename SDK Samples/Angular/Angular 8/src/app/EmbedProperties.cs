namespace Syncfusion.Server.EmbedBoldBI.Model
{
    public class EmbedProperties
    {
        //Bold BI URL (ex: http://localhost:5000/bi, http://dashboard.syncfusion.com/bi)
        public static string RootUrl = "http://localhost:80/bi";

        //For Bold BI Enterprise edition, it should be like `site/site1`. For Bold BI Cloud, it should be empty string.
        public static string SiteIdentifier = "site/site1";

        //Enter your BoldBI credentials here.
        public static string UserEmail = "User email here";
        public static string UserPassword = "User password here";


        // Get the embedSecret key from Bold BI. Please refer this link(https://help.syncfusion.com/bold-bi/on-premise/site-settings/embed-settings)
        public static string EmbedSecret = "Embed secret here";
    }
}

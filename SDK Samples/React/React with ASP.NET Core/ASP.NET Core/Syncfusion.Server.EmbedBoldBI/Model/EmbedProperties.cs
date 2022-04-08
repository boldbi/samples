namespace Syncfusion.Server.EmbedBoldBI.Model
{
    public class EmbedProperties
    {
        //BoldBI server URL (ex: http://localhost:5000/bi, http://dashboard.syncfusion.com/bi)
        public static string RootUrl = "http://localhost:54321/bi"; //"https://demo-chargebackgurus.boldbi.com/bi";

        //For Bold BI Enterprise edition, it should be like `site/site1`. For Bold BI Cloud, it should be empty string.
        public static string SiteIdentifier = "site/site1";

        //Enter your BoldBI credentials here.
        public static string UserEmail = "alagarsamyd@syncfusion.com"; //"demo@boldbi.com";

        // Get the embedSecret key from Bold BI. Please check this link(https://help.syncfusion.com/bold-bi/on-premise/site-settings/embed-settings)
        public static string EmbedSecret = "tj3pJBwKnsKPJsnEQGK43DsihUlGenda"; //"z2TKemsTTn3JOSEiFkM1G3Jp7LRhS247";
    }
}

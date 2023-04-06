namespace BoldBI.Embedded.Sample.Models
{
    public class EmbedProperties
    {
        //Dashboard Server BI URL (ex: http://localhost:5000/bi, http://demo.boldbi.com/bi)
        public static string RootUrl = "http://localhost:5315/bi";

        //For Bold BI Enterprise edition, it should be like `site/site1`. For Bold BI Cloud, it should be empty string.
        public static string SiteIdentifier = "site/site1";

        //Your Bold BI application environment. (If Cloud, you should use `cloud`, if Enterprise, you should use `enterprise`)
        public static string Environment = "enterprise";

        //Enter your BoldBI credentials here.
        public static string UserEmail = "nithya.gopal@syncfusion.com";
        public static string UserPassword = "Elikutty@531";

        // Get the embedSecret key from Bold BI.Please refer this link(https://help.syncfusion.com/bold-bi/on-premise/site-settings/embed-settings)
        public static string EmbedSecret = "dxV9qdjwQywkRKqYYsbKuFslcxkw8vBQ";
    }
}

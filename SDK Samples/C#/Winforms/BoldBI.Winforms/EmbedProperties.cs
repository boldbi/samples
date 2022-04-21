namespace BoldBI.Winforms
{
    internal class EmbedProperties
    {
        //Dashboard Server BI URL (ex: http://localhost:5000/bi/site/site1, http://demo.boldbi.com/bi/site/site1)
        public static string RootUrl = "http://localhost:64503/bi/";

        //For Bold BI Enterprise edition, it should be like `site/site1`. For Bold BI Cloud, it should be empty string
        public static string SiteIdentifier = "site/site1";

        //Your Bold BI application environment. (If Cloud, you should use `Cloud`, if Enterprise, you should use `OnPremise`)
        public static string Environment = "onpremise";

        //Your Embedding type. If you are embedding as component, you should set 'component', if your are embedding as ifrmae, you should set 'iframe'
        public static string EmbedType = "component";

        //Set the item id of the dashboard to embed from BI server, please refer this link(https://help.syncfusion.com/bold-bi/enterprise-bi/share-dashboards/get-dashboard-link#get-link)
        public static string DashboardId = "enter dashboard id here";

        //Enter your BoldBI credentials here.
        public static string UserEmail = "enter user email here";

        // Get the embedSecret key from Bold BI.
        public static string EmbedSecret = "enter embed secret here";
    }
}
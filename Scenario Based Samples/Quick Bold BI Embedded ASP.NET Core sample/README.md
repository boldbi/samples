Once downloaded the source code, open the solution in the Visual studio. 
Open the appsettings.json file in the below location,
//appsettings.json
 

Please change the below properties as per your Bold BI Server,

| RootUrl        | Dashboard Server BI URL (ex: http://localhost:5000/bi, http://demo.boldbi.com/bi)                                                            |
|----------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| SiteIdentifier | For Bold BI Enterprise edition, it should be like `site/site1`. For Bold BI Cloud, it should be empty string.                                |
| Environment    | Your Bold BI application environment. (If Cloud, you should use `cloud`, if Enterprise, you should use `enterprise`)                         |
| AdminEmail     | UserEmail of the Admin in your Bold BI, which would be used to get the dashboards list                                                       |
| Email          | The email of the user who is present in the Bold BI Server.                                                       |
| DisplayName    | This is the name displayed in the embedded application.                                                      |
| EmbedSecret    | You could get your EmbedSecret key from Embed tab by enabling `Enable embed authentication` in Administration page https://help.boldbi.com/embedded-bi/site-administration/embed-settings/ |
| Serverurl      | Dashboard Server BI URL (ex: http://localhost:5000/bi, http://demo.boldbi.com/bi)                                                            |
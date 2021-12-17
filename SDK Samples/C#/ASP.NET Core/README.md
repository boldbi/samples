# How to run the sample

Once downloaded the source code, open the solution in the Visual studio. 
Copy the downloaded embedConfig.json file, which is generated from the embed settings page and paste into the following location.
/App_Data/embedConfig.json
 
Now, run the sample.

# Properties to be configured in the sample
The following properties are used in embedConfig.json file:

| ServerUrl        | Dashboard Server BI URL (ex: http://localhost:5000/bi, http://demo.boldbi.com/bi)                                                            |
|----------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| SiteIdentifier | For Bold BI On-Premise Edition, it should be like `site/site1`. For Bold BI Cloud, it should be an empty string.                                |
| Environment    | Your Bold BI application environment. (If Cloud, use `cloud`; if On-Premise, use `enterprise`)                         |
| UserEmail          | The email of the user. The dashboard will be rendered on behalf of this user.                                                       |
| EmbedSecret    | You can get your EmbedSecret key from the Embed tab by enabling `Enable embed authentication` in Administration page https://help.boldbi.com/embedded-bi/site-administration/embed-settings/. |
| DashboardId    | Item id of the dashboard to be embedded in your application.|
| EmbedType      | BoldBI.EmbedType.Component.|
| ExpirationTime | Token expiration time.|
                                                           
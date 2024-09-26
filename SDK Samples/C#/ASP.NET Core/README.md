# Run the application with embedded dashboard in three steps

1. Download the sample application and open the solution file in the Visual Studio IDE.
1. Copy the downloaded `embedConfig.json` file, which is generated from the embed settings page of Bold BI server and paste into the `App_Data` folder of sample application.
1. Run the application.

## Properties that are configured in the sample

The following properties are used in `embedConfig.json` file:

| ServerUrl       | Dashboard Server URL (Eg: <http://localhost:5000/bi>, <http://demo.boldbi.com/bi>) |
|-----------------|-----------------------------------------------------------------------------|
| SiteIdentifier  | For Bold BI installed on your server, it should be like `site/site1`. For Bold BI cloud analytics server, it should be an empty string. |
| Environment     | Your Bold BI application environment. (If it is cloud analytics server, use `cloud`; if it is your own server, use `enterprise`) |
| UserEmail       | The email of the user. The dashboard will be rendered on behalf of this user. |
| EmbedSecret     | You can get your EmbedSecret key from the Embed tab by enabling `Enable embed authentication` in Administration page <https://help.boldbi.com/embedded-bi/site-administration/embed-settings?utm_source=github&utm_medium=backlinks>. |
| DashboardId     | Item id of the dashboard to be embedded in your application. |
| EmbedType       | BoldBI.EmbedType.Component. |
| ExpirationTime  | Token expiration time. |

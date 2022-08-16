# Run an application with embedded dashboard in three steps

1. Download the sample application and open the solution file in the Visual Studio IDE.
2. You need to set the following properties in _Host.cshtml and EmbedProperties.cs file as follows.

<meta charset="utf-8"/>
<table>
  <tbody>
    <tr>
        <td align="left">RootUrl</td>
        <td align="left">Dashboard Server URL (E.g., http://localhost:5000/bi, http://demo.boldbi.com/bi)</td>
    </tr>
    <tr>
        <td align="left">SiteIdentifier</td>
        <td align="left">For Bold BI Enterprise Edition, it should be like `site/site1`. For Bold BI Cloud, it should be an empty string.</td>
    </tr>
        <tr>
        <td align="left">DashboardId</td>
        <td align="left">Item id of the dashboard to be embedded in your application.</td>
    </tr>
    <tr>
        <td align="left">UserEmail</td>
        <td align="left">UserEmail of the admin in your Bold BI account, which is used to get the dashboard.</td>
    </tr>
    <tr>
        <td align="left">UserPassword</td>
        <td align="left">Password of the admin in your Bold BI account, which is used to get the dashboard.</td>
    </tr>
    <tr>
        <td align="left">EmbedSecret</td>
        <td align="left">You can get your EmbedSecret key from the Embed tab by enabling `Enable embed authentication` in the Administration page https://help.boldbi.com/embedded-bi/site-administration/embed-settings/.</td>
    </tr>
  </tbody>
</table>
 
 3. Then, run the Blazor forms application.
                                                           

# Run the application with embedded dashboard in three steps

1. Download the sample application and open the solution file in the Visual Studio IDE. 
1. Copy the downloaded `embedConfig.json` file, which is generated from the embed settings page of Bold BI server and paste into the `App_Data` folder of sample application.
1. Run the application.

# Properties that are configured in the sample
The following properties are used in `embedConfig.json` file:

<meta charset="utf-8"/>
<table>
  <tbody>
    <tr>
        <td align="left">ServerUrl</td>
        <td align="left">Dashboard Server URL (Eg: http://localhost:5000/bi, http://demo.boldbi.com/bi)</td>
    </tr>
    <tr>
        <td align="left">SiteIdentifier</td>
        <td align="left">For Bold BI On-Premise Edition, it should be like `site/site1`. For Bold BI Cloud, it should be an empty string.</td>
    </tr>
    <tr>
        <td align="left">Environment</td>
        <td align="left">Your Bold BI application environment. (If Cloud, use `cloud`; if On-Premise, use `enterprise`)</td>
    </tr>
    <tr>
        <td align="left">UserEmail</td>
        <td align="left">The email of the user. The dashboard will be rendered on behalf of this user.</td>
    </tr>
    <tr>
        <td align="left">EmbedSecret</td>
        <td align="left">You can get your EmbedSecret key from the Embed tab by enabling `Enable embed authentication` in Administration page https://help.boldbi.com/embedded-bi/site-administration/embed-settings/.</td>
    </tr>
    <tr>
        <td align="left">DashboardId</td>
        <td align="left">Item id of the dashboard to be embedded in your application.</td>
    </tr>
    <tr>
        <td align="left">EmbedType</td>
        <td align="left">BoldBI.EmbedType.Component.</td>
    </tr>
    <tr>
        <td align="left">ExpirationTime</td>
        <td align="left">Token expiration time.</td>
    </tr>
  </tbody>
</table>
                                                           

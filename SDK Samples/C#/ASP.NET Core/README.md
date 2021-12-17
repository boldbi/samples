# How to run the sample

Once downloaded the source code, open the solution in the Visual studio. 
Copy the downloaded embedConfig.json file, which is generated from the embed settings page and paste into the following location.
/App_Data/embedConfig.json
 
Now, run the sample.

# Properties to be configured in the sample
The following properties are used in embedConfig.json file:

<meta charset="utf-8"/>
<table>
  <tbody>
    <tr>
        <td align="left">ServerUrl</td>
        <td align="left">Dashboard Server BI URL (ex: http://localhost:5000/bi, http://demo.boldbi.com/bi)</td>
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
                                                           
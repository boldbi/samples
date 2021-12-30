# Embed dashboard and run your application in three steps

1. Download the sample application and open the solution file in the Visual Studio IDE. 
1. Open the `appsettings.json file`.
1. Change the below properties with your Bold BI Server details.

<meta charset="utf-8"/>
<table>
  <tbody>
    <tr>
        <td align="left">RootUrl</td>
        <td align="left">Bold BI Server URL (ex: http://localhost:5000/bi, http://demo.boldbi.com/bi)</td>
   </tr>
   <tr>
        <td align="left">SiteIdentifier</td>
        <td align="left">For Bold BI installed on your server, it should be like `site/site1`. For Bold BI cloud analytics server, it should be empty string.</td>
   </tr>
   <tr>
    <td align="left">Environment</td>
    <td align="left">Your Bold BI application environment. (If Cloud, you should use `cloud`, if Enterprise, you should use `enterprise`)</td>
   </tr>
   <tr>
    <td align="left">AdminEmail</td>
    <td align="left">UserEmail of the Admin in your Bold BI, which would be used to get the dashboards list</td>
   </tr>
   <tr>
    <td align="left">Email</td>
    <td align="left">The email of the user who is present in the Bold BI Server.</td>
   </tr>
   <tr>
    <td align="left">DisplayName</td>
    <td align="left">This is the name displayed in the embedded application.</td>
   </tr>
   <tr>
    <td align="left">EmbedSecret</td>
    <td align="left">You could get your EmbedSecret key from Embed tab by enabling `Enable embed authentication` in Administration page https://help.boldbi.com/embedded-bi/site-administration/embed-settings/</td>
   </tr>
   <tr>
    <td align="left">Serverurl</td>
    <td align="left">Bold BI Server URL (ex: http://localhost:5000/bi, http://demo.boldbi.com/bi)</td>
   </tr>
 </tbody>
 </table>|

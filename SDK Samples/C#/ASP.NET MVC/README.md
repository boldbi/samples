# Run the application with embedded dashboard in three steps

1. Download the sample application and open the solution file in the Visual Studio IDE. 
2. You need to set your embed property details in the EmbedProperties.cs and Site.Master as follows.

<meta charset="utf-8"/>
<table>
  <tbody>
    <tr>
        <td align="left">RootUrl</td>
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
        <td align="left">UserPassword</td>
        <td align="left">Password of the Admin in Bold BI, which will be used to get the dashboards list.</td>
    </tr>
    <tr>
        <td align="left">EmbedSecret</td>
        <td align="left">You can get your EmbedSecret key from the Embed tab by enabling `Enable embed authentication` in Administration page https://help.boldbi.com/embedded-bi/site-administration/embed-settings/.</td>
    </tr>
  </tbody>
</table>
 
 3. Then, run your ASP.NET MVC sample.
                                                           
# Run the application with embedded dashboard in three steps

1. Download the VueJS with ASP.NET Core Application and open the solution file in the Visual Studio IDE. 
2. Here, the VueJS application act as a client, and the ASP.NET Core application act as a server since we need to set the following properties in the App.vue file in the VueJS app as follows.
<meta charset="utf-8"/>
<table>
  <tbody>    
    <tr>
        <td align="left">SiteIdentifier</td>
        <td align="left">For Bold BI On-Premise Edition, it should be like `site/site1`. For Bold BI Cloud, it should be an empty string.</td>
    </tr>
    <tr>
        <td align="left">RootUrl</td>
        <td align="left">Dashboard Server URL (Eg: http://localhost:5000/bi, http://demo.boldbi.com/bi)</td>
    </tr>
    <tr>
        <td align="left">authorizationUrl</td>
        <td align="left">Url of the GetDetails action in the Go application(http://localhost:8086/getDetails). Learn more about authorize server in this [link](/embedded-bi/javascript-based/authorize-server/).</td>
    </tr>
    <tr>
        <td align="left">environment</td>
        <td align="left">Your Bold BI application environment. (If Cloud, you should use `cloud`, if Enterprise, you should use `enterprise`).</td>
    </tr>
    <tr>
        <td align="left">DashboardId</td>
        <td align="left">Set the item id of the dashboard to embed from BI server.</td>
    </tr>
  </tbody>
</table>
 
3. In EmbedProperties.cs of the ASP.NET Core application, you need to set the UserEmail and EmbedSecret properties.
<meta charset="utf-8"/>
<table>
  <tbody>
    <tr>
        <td align="left">UserEmail</td>
        <td align="left">UserEmail of the Admin in your Bold BI, which would be used to get the dashboard details from the BI server.</td>
    </tr>
    <tr>
        <td align="left">EmbedSecret</td>
        <td align="left">You can get your EmbedSecret key from the Embed tab by enabling `Enable embed authentication` in Administration page https://help.boldbi.com/embedded-bi/site-administration/embed-settings/.</td>
    </tr>
  </tbody>
</table>

4. Then, run your ASP.NET application and as well as the VueJS App.

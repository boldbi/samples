# Run the application with embedded dashboard in three steps

1. Download the React with Go Application and open the solution file in the Visual Studio IDE. 
2. Here, the React application act as a client and the Go application act as a server since we need to set the following properties in the DashboardListing.js file in the react app as follows.
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
        <td align="left">Url of the GetDetails action in the Go application(http://localhost:8086/getDetails). Learn more about authorize server [here](/embedded-bi/javascript-based/authorize-server/).</td>
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
 
3. In main.go of the Go application, you need to set the UserEmail and EmbedSecret properties.
<meta charset="utf-8"/>
<table>
  <tbody>
    <tr>
        <td align="left">UserEmail</td>
        <td align="left">UserEmail of the Admin in your Bold BI, which would be used to get the dashboards list.</td>
    </tr>
    <tr>
        <td align="left">EmbedSecret</td>
        <td align="left">You can get your EmbedSecret key from the Embed tab by enabling `Enable embed authentication` in Administration page https://help.boldbi.com/embedded-bi/site-administration/embed-settings/.</td>
    </tr>
  </tbody>
</table>

4. Then, run your Go application and as well as the React App.

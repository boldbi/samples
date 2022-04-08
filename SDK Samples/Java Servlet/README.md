# Run the application with embedded dashboard in three steps

1. Download the Java Servlet project. 
2. You need to set your embed property details in the index.jsp and BoldBI.java.
<meta charset="utf-8"/>
<table>
  <tbody>    
    <tr>
        <td align="left">SiteIdentifier</td>
        <td align="left">For Bold BI Enterprise edition, it should be like `site/site1`. For Bold BI Cloud, it should be empty string.</td>
    </tr>
    <tr>
        <td align="left">RootUrl</td>
        <td align="left">Dashboard Server BI URL (ex: http://localhost:5000/bi, http://demo.boldbi.com/bi)</td>
    </tr>
    <tr>
        <td align="left">AuthorizationURL</td>
        <td align="left">Url of the GetDetails action in the Go application(http://localhost:8086/getDetails). Learn more about authorize server [here](/embedded-bi/javascript-based/authorize-server/)</td>
    </tr>
    <tr>
        <td align="left">Environment</td>
        <td align="left">Your Bold BI application environment. (If Cloud, you should use `cloud`, if Enterprise, you should use `onpremise`)</td>
    </tr>
    <tr>
        <td align="left">DashboardId</td>
        <td align="left">Set the item id of the dashboard to embed from BI server.</td>
    </tr>    
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

3. Then, run your Java Servlet project.
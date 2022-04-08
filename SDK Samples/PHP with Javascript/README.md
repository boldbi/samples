# Run the application with embedded dashboard in three steps

1. Download the PHP Core sample. 
2. In Index.php, you must set your server details to EmbedProperties as follows.
3. In AuthorizeServer.php, you must set UserEmail and Embed Secret key, which has been used for creating embed signature to get authorize the server from PHP sample.
4. Set the following properties in both files.
<meta charset="utf-8"/>
<table>
  <tbody>    
    <tr>
        <td align="left">ServerUrl</td>
        <td align="left">Dashboard Server BI URL Enterprise Edition- http://localhost:5000/bi/site/site1 Cloud -http://dashboard.syncfusion.com/bi</td>
    </tr>
    <tr>
        <td align="left">DashboardPath</td>
        <td align="left">Set the dashboard path by category name following by dashboard name. Ex: /Sales/Sales Performance</td>
    </tr>
    <tr>
        <td align="left">AuthorizationServerURL</td>
        <td align="left">URL pointing to AuthorizeServer API file. We have running PHP sample in 8080 port. Ex: http://localhost:8080/rest/authorizeserver.php</td>
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

5. You can render the dashboard by passing the Dashboard path or Dashboard id.
6. Then, run your PHP Core sample.
# Run the application with embedded dashboard in three steps

1. Download BoldBI ColdFusion Embed sample. 
2. You need to set the following properties in BoldBIEmbed.html and embedDetails.cfc file as follows.
<meta charset="utf-8"/>
<table>
  <tbody>    
    <tr>
        <td align="left">ServerUrl</td>
        <td align="left">Dashboard Server BI URL (ex: http://localhost:5000/bi/site/site1, http://dashboard.syncfusion.com/bi/site/site1)</td>
    </tr>
    <tr>
        <td align="left">DashboardID</td>
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
 
3. Then, run your ColdFusion application.
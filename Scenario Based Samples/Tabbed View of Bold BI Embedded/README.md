# How to run this sample with your Bold BI Server

Please change the following properties in AppData/default/embedDetails.json before run the solution.

| RootUrl        | Dashboard Server BI URL (ex: <http://localhost:5000/bi>, <http://demo.boldbi.com/bi>)                                                            |
|----------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| SiteIdentifier | For Bold BI Enterprise edition, it should be like `site/site1`. For Bold BI Cloud, it should be empty string.                                |
| Environment    | Your Bold BI application environment. (If Cloud, you should use `cloud`, if Enterprise, you should use `enterprise`)                         |
| Email          | UserEmail of the Admin in your Bold BI, which would be used to get the dashboards list                                                       |
| EmbedSecret    | You could get your EmbedSecret key from Embed tab by enabling `Enable embed authentication` in Administration page as mentioned in next step |
| Serverurl      | Dashboard Server BI URL (ex: <http://localhost:5000/bi>, <http://demo.boldbi.com/bi>)                                                             |

## Userful links

Take a look at the following to learn more about Bold BI Embedded:

* [Bold BI Server - Getting started](https://help.boldbi.com/embedded-bi/setup/overview/)
* [Embed Bold BI - Getting started](https://help.boldbi.com/embedded-bi/javascript-based/getting-started/)
* [Embed Bold BI - Samples](https://help.boldbi.com/embedded-bi/javascript-based/samples/v3.3.40-or-later/)
* [Embed SDK Sample browser](https://samples.boldbi.com/embed/javascript/default/dashboard)

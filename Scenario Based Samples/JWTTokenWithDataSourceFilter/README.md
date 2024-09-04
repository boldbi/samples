# JWTToken with DataSource Filter

## Dashboard view

   ![Dashboard-View](https://github.com/boldbi/samples/assets/129486688/5ee41d0b-85bf-4be7-943a-4eac835a2d54)

## Requirements/Prerequisites

* [.NET Core 6.0](https://dotnet.microsoft.com/download/dotnet-core)
* [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/)
* [Visual Studio Code](https://code.visualstudio.com/download)

### Supported browsers
  
* Google Chrome, Microsoft Edge and Mozilla Firefox.

## How to run the sample

* Please ensure you have enabled embed authentication on the `embed settings` page. If it is not currently enabled, please refer to the following image or detailed [instructions](https://help.boldbi.com/site-administration/embed-settings/#get-embed-secret-code) to enable it.

    ![EmbedSettingsPage](https://github.com/boldbi/samples/assets/92368448/972a932c-94b1-450a-96db-79dc496751f3)

* To download the `embedConfig.json` file, please follow this [link](https://help.boldbi.com/site-administration/embed-settings/#get-embed-configuration-file) for reference. Additionally, you can refer to the following image for visual guidance.

    ![EmbedSettingsDownload](https://github.com/boldbi/samples/assets/92368448/cc4d65e1-392f-436c-ad27-6e2b636fc6b6)

    ![Embed-Config-JSON](https://github.com/boldbi/samples/assets/92368448/53c1eddb-1d55-47d7-8e12-502ad6d74dd9)

  * Copy the downloaded `embedConfig.json` file and paste it into the designated [location](https://github.com/boldbi/samples/tree/master/Scenario%20Based%20Samples/JWTTokenWithDataSourceFilter/web-api) within the application. Please ensure you have placed it in the application, as shown in the following image.

    ![Embed-Config-JSON-Path](https://github.com/boldbi/samples/assets/129486688/3186f0f9-6a14-409d-8ee0-7e838db51a68)

  * Open the boldbi.web.api.sln in **VS2022**.

  * Please change the below properties in the [appsettings.json](https://github.com/boldbi/samples/tree/master/Scenario%20Based%20Samples/JWTTokenWithDataSourceFilter/web-api/appsettings.json).

    |||
    |---|----|
    | rootURL        | Dashboard Server BI URL (ex: <http://localhost:5000/bi>, <http://demo.boldbi.com/bi>)                                                            |
    | siteidentifier | For Bold BI Enterprise edition, it should be like `site/site1`. For Bold BI Cloud, it should be empty string.                                |
    | environment    | Your Bold BI application environment. (If Cloud, you should use `cloud`, if Enterprise, you should use `enterprise`)                         |
    | useremail      | UserEmail of the Admin in your Bold BI, which would be used to get the dashboards list                                                        |
    | embedsecret    | You could get your EmbedSecret key from Embed tab by enabling `Enable embed authentication` in Administration page <https://help.boldbi.com/embedded-bi/site-administration/embed-settings/> |

  * Run the boldbi.web.api.sln sample

  * Open the [web-client](https://github.com/boldbi/samples/tree/master/Scenario%20Based%20Samples/JWTTokenWithDataSourceFilter/web-client) in the vscode and install all dependent packages, using the following command `npm install`.

  * Run your web-client sample with the command `npm start` in Visual Studio Code.

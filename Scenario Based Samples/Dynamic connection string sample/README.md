# Dynamic Connection String sample in Embedding using ASP.NET MVC Sample

This project was created using ASP.NET MVC 4.8. This application aims to demonstrate how to render the Dynamic Connection String feature to modify the connection string of data sources in dashboard view mode.

> **NOTE:** To know more about Dynamic Connection String, please refer [this](https://help.boldbi.com/embedding-options/iframe-embedding/dynamic-connection-string/).

## Prerequisites

 * [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/)
 * [.NET Framework 4.8](https://dotnet.microsoft.com/en-us/download/dotnet-framework)

#### Supported browsers
  
  * Google Chrome, Microsoft Edge, and Mozilla Firefox.

## Configuration

 1. Create 2 databases in SQL Server with the same table and column names. For example, I have created 2 databases named `DCS_DB1` and `DCS_DB2`, both with a table named `StudentTable`.

 2. Create 2 users in your BoldBI Server. For example, I have created 2 users with the email IDs `testuser1@gmail.com` and `testuser2@gmail.com`.

## Developer IDE

 * [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/)

## Steps to run the Dynamic Connection String sample using Visual Studio 2022 with SQL Server

 1. Open the solution file `Dynamic Connection String.sln` in Visual Studio.

 2. Open the `ConnectionController.cs` file and enter the user1 details by referring to the image below.
    * Enter user1 email id in CustomIdentity1. (Eg: `customIdentity.ToString().ToLowerInvariant().Equals("testuser1@gmail.com")`)
    * Enter SQL Server Id in the DataSource. (Eg: `DataSource = "SYNCLAPN-12345"`)
    * Enter the Database Name in the InitialCatalog. (Eg: `InitialCatalog = "DCS_DB1"`)
    * Enter the SQL Server Username and Password.
    
 3. Enter the user2 details by referring to the image below.
    * Enter user2 email id in CustomIdentity2. (Eg: `customIdentity.ToString().ToLowerInvariant().Equals("testuser2@gmail.com")`)
    * Enter SQL Server Id in the DataSource. (Eg: `DataSource = "SYNCLAPN-12345"`)
    * Enter the Database Name in the InitialCatalog. (Eg: `InitialCatalog = "DCS_DB2"`)
    * Enter the SQL Server Username and Password.

 4. Run your sample in Visual Studio. The sample will render with the localhost URL http://localhost:63139.  Then add `/api/get-connection-details` to the URL. For example,  http://localhost:63139/api/get-connection-details.

 5. In BoldBI Server, create a SQL Server datasource with the first database (Eg: DCS_DB1). Enable Dynamic Connection String and click the `Configure` button. The image attached below for your reference will appear.

 6. Put the localhost URL in the URL, select the `Both` radio button in the Configuration mode, and choose `Email` in the User Identity. Then, connect it.​​​​​​​

 7. Create a dashboard with this data source and publish it.

## Steps to configure the dynamic Connection String dashboard in the JS-based ASP.Net Core Embedding sample

 1. Please refer this [link](https://github.com/boldbi/aspnet-core-sample) to run the ASP.Net Core sample. You will need to render the sample with the created dashboard for Dynamic Connection String.

 2. Enter the dynamicConnection API in the `Index.js` file by referring to the image below.
    ```js
        dynamicConnection: {
            isEnabled: true,
            identity: "1" // or "testuser1@gmail.com"
        }
    ```
    > **NOTE:** Please refer to this [link](https://help.boldbi.com/embedding-options/embedding-sdk/embedding-api-reference/members/#dynamicconnection) to learn more about the dynamicConnection API.
 
 3. The dashboard will render with the user1 details. If you change the `identity` property to "2" or "testuser2@gmail.com", then the same dashboard will render with the user2 details.

 ## Important notes

It is recommended not to store passwords and sensitive information in configuration files for security reasons in a real-world application. Instead, it would be best if you considered using a secure application, such as Key Vault, to safeguard your credentials.

## Online demos

Look at the Bold BI Embedding sample to live demo [here](https://samples.boldbi.com/embed).

## Documentation

A complete Bold BI Embedding documentation can be found on [Bold BI Embedding Help](https://help.boldbi.com/embedded-bi/javascript-based/).
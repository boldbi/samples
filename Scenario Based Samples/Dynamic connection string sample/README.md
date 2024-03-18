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
    ![DCSUser1DBNew](https://github.com/boldbi/samples/assets/129487075/58d8fdfc-e962-45b4-91a1-d53794765ae3)

    ![DCSUser2DBNew](https://github.com/boldbi/samples/assets/129487075/f5ff056f-fbb5-4315-93ca-01c67272fcda)

 3. Create 2 users in your BoldBI Server. For example, I have created 2 users with the email IDs `testuser1@gmail.com` and `testuser2@gmail.com`.

    ![DCSUsers](https://github.com/boldbi/samples/assets/129487075/14723d13-a070-4008-8a62-76ffbe521445)

## Developer IDE

 * [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/)

## Steps to run the Dynamic Connection String sample using Visual Studio 2022 with SQL Server

 1. Open the solution file `Dynamic Connection String.sln` in Visual Studio.

 2. Open the `ConnectionController.cs` file and enter the user1 details by referring to the image below.
    * Enter user1 email Id in CustomIdentity1.
    * Enter SQL Server Id in the DataSource. (Eg: `DataSource = "SYNCLAPN-12345"`)
    * Enter the Database Name in the InitialCatalog. (Eg: `InitialCatalog = "DCS_DB1"`)
    * Enter the SQL Server Username and Password.

    ![DCSUser1details](https://github.com/boldbi/samples/assets/129487075/5bb92c31-82d2-4090-8b47-fb17716ec8e7)

 3. Enter the user2 details by referring to the image below.
    * Enter user2 email Id in CustomIdentity2.
    * Enter SQL Server Id in the DataSource. (Eg: `DataSource = "SYNCLAPN-12345"`)
    * Enter the Database Name in the InitialCatalog. (Eg: `InitialCatalog = "DCS_DB2"`)
    * Enter the SQL Server Username and Password.

    ![DCSUser2Details](https://github.com/boldbi/samples/assets/129487075/c13a4941-9a14-4844-8886-a74884afca0d)

 4. Run your sample in Visual Studio. The sample will render with the localhost URL http://localhost:63139.  Then add `/api/get-connection-details` to the URL. For example,  http://localhost:63139/api/get-connection-details.

    ![DCSsampleAPI](https://github.com/boldbi/samples/assets/129487075/54c6f23c-35cc-4dc4-8630-b2d4e1241e2f)

 5. In BoldBI Server, create a SQL Server datasource with the first database (Eg: DCS_DB1). Enable Dynamic Connection String and click the `Configure` button. The image attached below for your reference will appear.

    ![DCSConfiguration](https://github.com/boldbi/samples/assets/129487075/c3a42be1-6aeb-47df-8701-d7c35c46d75d)

 6. Put the localhost URL in the URL, select the `Both` radio button in the Configuration mode, and choose `Email` in the User Identity. Then, connect it.​​​​​​​

 7. Create a dashboard with this data source and publish it.

## Steps to configure the dynamic Connection String dashboard in the JS-based ASP.Net Core Embedding sample

 1. Please refer this [link](https://github.com/boldbi/aspnet-core-sample) to run the ASP.Net Core sample. You will need to render the sample with the created dashboard for Dynamic Connection String.

 2. Enter the dynamicConnection API in the `Index.js` file by referring to the code below.
    ```js
        dynamicConnection: {
            isEnabled: true,
            identity: "1" // or "testuser1@gmail.com"
        }
    ```
    > **NOTE:** Please refer to this [link](https://help.boldbi.com/embedding-options/embedding-sdk/embedding-api-reference/members/#dynamicconnection) to learn more about the dynamicConnection API.

    ![DCSUser1dashboard](https://github.com/boldbi/samples/assets/129487075/1ada2978-1a0b-4d86-af26-93ac5beb08d4)

 3. The dashboard will render with the user1 details. If you change the `identity` property to "2" or "testuser2@gmail.com", then the same dashboard will render with the user2 details.

    ![DCSUser2Dashboard](https://github.com/boldbi/samples/assets/129487075/6d580486-6707-43a4-9189-6b71fe2caed7)

 ## Important notes

It is recommended not to store passwords and sensitive information in configuration files for security reasons in a real-world application. Instead, it would be best if you considered using a secure application, such as Key Vault, to safeguard your credentials.

## Online demos

Look at the Bold BI Embedding sample to live demo [here](https://samples.boldbi.com/embed).

## Documentation

A complete Bold BI Embedding documentation can be found on [Bold BI Embedding Help](https://help.boldbi.com/embedded-bi/javascript-based/).

# Dynamic Connection String sample in Embedding using ASP.NET MVC Sample

This project was created using ASP.NET MVC 4.8. This application aims to demonstrate how to render the Dynamic Connection String feature to modify the connection string of data sources in dashboard view mode using an External API.

> **NOTE:** To know more about Dynamic Connection String, please refer [this](https://help.boldbi.com/embedding-options/iframe-embedding/dynamic-connection-string/).

## Prerequisites

 * [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/)
 * [.NET Framework 4.8](https://dotnet.microsoft.com/en-us/download/dotnet-framework)

#### Supported browsers
  
  * Google Chrome, Microsoft Edge, and Mozilla Firefox.

## Configuration for both the External API and Custom Attribute

 1. In order to configure the Dynamic Connection String, the datasource should be connected to the same database but with a different schema in order for the dashboard to reflect the changes made to the connection string.

 2. Create 2 databases in SQL Server with the same table and column names. For example, I have created 2 databases named `DCS_DB1` and `DCS_DB2`, both with a table named `StudentTable`.
    ![DCSUser1DBNew](https://github.com/boldbi/samples/assets/129487075/58d8fdfc-e962-45b4-91a1-d53794765ae3)

    ![DCSUser2DBNew](https://github.com/boldbi/samples/assets/129487075/f5ff056f-fbb5-4315-93ca-01c67272fcda)

 3. Create 2 users in your BoldBI Server. For example, I have created 2 users with the email IDs `testuser1@gmail.com` and `testuser2@gmail.com`.

     > **NOTE:** Users are not required at the embedding level. However, for the server level, users are mandatory on your BoldBI Server.

    ![DCSUsers](https://github.com/boldbi/samples/assets/129487075/14723d13-a070-4008-8a62-76ffbe521445)

## Developer IDE

 * [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/)

## How to configure the External API

## Steps to run the Dynamic Connection String sample using Visual Studio 2022 with SQL Server

 1. Open the solution file `Dynamic Connection String.sln` in Visual Studio.

 2. Open the `ConnectionController.cs` file and enter the user1 details by referring to the image below.
    * Enter the identity value, user1 email, and full name in CustomIdentity1.
    * Enter SQL Server Id in the DataSource. (Eg: `DataSource = "SYNCLAPN-12345"`)
    * Enter the Database Name in the InitialCatalog. (Eg: `InitialCatalog = "DCS_DB1"`)
    * Enter the SQL Server Username and Password.

    ![DCS_sample_user1](https://github.com/boldbi/samples/assets/129487075/d00edb1a-f80c-4d05-9338-52248ede7b45)

 3. Enter the user2 details by referring to the image below.
    * Enter the identity value, user2 email and full name in CustomIdentity2.
    * Enter SQL Server Id in the DataSource. (Eg: `DataSource = "SYNCLAPN-12345"`)
    * Enter the Database Name in the InitialCatalog. (Eg: `InitialCatalog = "DCS_DB2"`)
    * Enter the SQL Server Username and Password.

    ![DCS_sample_user2](https://github.com/boldbi/samples/assets/129487075/c1536d19-1c97-48f6-a676-8916c6ae06c0)

 4. Run your sample in Visual Studio. The sample will render with the localhost URL http://localhost:63139.  Then add `/api/get-connection-details` to the URL. For example,  http://localhost:63139/api/get-connection-details.

    ![DCSsampleAPI](https://github.com/boldbi/samples/assets/129487075/54c6f23c-35cc-4dc4-8630-b2d4e1241e2f)

 5. In BoldBI Server, create a SQL Server datasource with the first database (Eg: DCS_DB1). Enable Dynamic Connection String and click the `Configure` button. The image attached below for your reference will appear. Enter the localhost URL in the designated URL field.

    ![dynamic-first](https://github.com/boldbi/samples/assets/129487075/53d12536-765d-49bf-83d9-ee724708eb74)

 6. ​​​​​​​In Configuration mode, if you are examining the dynamic connection string sample at the embedding level, choose `Embedding`. If at the server level, choose `Server`, or if both, choose the `Both` radio button. I have selected the `Both` radio button to test the sample at both server and embedding levels. In the User Identity choose `Email` or `Full Name` and connect it.​​​​​​​

    > **NOTE:** At the embedding level, the identityType always holds the value as `Custom` in the Dynamic Connection String sample, even if you choose `Email` or `Full Name`. At the server level, it is based on the selection made in User Identity.

     ![dynamic-second1](https://github.com/boldbi/samples/assets/129487075/5f3e542d-f5c2-4241-94de-aebe65050797)

 7. Create a dashboard with this same data source and publish it.

## Steps to configure the Dynamic Connection String dashboard in the JS-based ASP.NET Core Embedding sample

 1. Please refer this [link](https://github.com/boldbi/aspnet-core-sample) to run the ASP.NET Core sample. You will need to render the sample with the created dashboard for Dynamic Connection String.

 2. Enable the isEnabled property and set the identity in the dynamicConnection member in the `Index.js` file by referring to the code below.
    ```js
        dynamicConnection: {
            isEnabled: true,
            identity: "1"
        }
    ```
    > **NOTE:** You can set any value to the identity. Please refer to this [link](https://help.boldbi.com/embedding-options/embedding-sdk/embedding-api-reference/members/#dynamicconnection) to learn more about the dynamicConnection member API.

    ![DCSUser1dashboard](https://github.com/boldbi/samples/assets/129487075/1ada2978-1a0b-4d86-af26-93ac5beb08d4)

 3. The dashboard will render with the user1 details. If you change the `identity` property to "2", then the same dashboard will render with the user2 details.

    ![DCSUser2Dashboard](https://github.com/boldbi/samples/assets/129487075/6d580486-6707-43a4-9189-6b71fe2caed7)

## Steps to configure the Dynamic Connection String dashboard at the Server level

 1. Logged into the Bold BI Server with one of the user created. For example, I am logged in as `testuser1`. Now, render the dynamic connection string dashboard.

    ![DCS_Server_user1](https://github.com/boldbi/samples/assets/129487075/6800bbd0-c6d2-4d66-9189-11808aff1ae3)

 2. The dashboard will render with the user1 details.  If you log in with the `testuser2` credentials in Bold BI Server and render the dashboard, then the same dashboard will render with user2 details.

    ![DCS_Server_user2](https://github.com/boldbi/samples/assets/129487075/1632dc52-af92-4944-84fc-80fcdc173da6)

## How this sample works For Embedding
 
 1. Once you render the ASP.NET Core application, the dashboard will start to render. At that time, the `http://localhost:63139/api/get-connection-details` API will be triggered in the Dynamic Connection String sample with the following Arguments:

     * In `customIdentity` parameter holds the `identity` value passed from the `dynamicConnection` member API.

     * In `identityType` parameter holds the `Custom` value.

     * Based on the conditions provided in the Dynamic Connection String sample, it will return the modified connection string details and render the dashboard accordingly.

## How this sample works For Server

 1. Once you render the Dynamic Connection String dashboard in Bold BI Server, the `http://localhost:63139/api/get-connection-details` API will be triggered in the Dynamic Connection String sample with the following Arguments:

     * In `customIdentity` parameter holds the logged-in user’s information, such as their email or full name.
   
     * In `identityType` parameter holds the value of either `Email` or `Full Name` based on what is selected in the User Identity configuration.

     * Based on the conditions provided in the Dynamic Connection String sample, it will return the modified connection string details and render the dashboard accordingly.

### How to configure the Custom Attribute

### Steps to configure the Dynamic Connection String using Custom Attribute at the Server level

1. This attribute can be set by the UMS admin for a site on the site details page.
   
   ![Add Attribute](https://github.com/boldbi/samples/assets/91586758/12b9b7ef-f410-4aec-89f1-e0fb8c372be7)

   ![Attribute Image](https://github.com/boldbi/samples/assets/91586758/fa71a1b4-c333-4bc0-9a29-366952826b85)

   > **NOTE:** Custom attributes can be defined at three levels: User level, Group level, and Site level. The first priority is at the `site level`, the second priority is at the `group level`, and the third priority is at the `user level`. I have explained the `site level`, and the same procedure applies to the `user` and `group` levels. For more about [custom Attribute](https://help.boldbi.com/working-with-data-sources/configuring-custom-attribute/#custom-attribute-hierarchy), please refer it. 

2. In BoldBI Server, create a SQL Server datasource with the first database (Eg: DCS_DB1). Enable Dynamic Connection String and click the `Configure` button. The image attached below for your reference will appear. Enter the attribute name in Custom Attribute field.

    ![DCS Configuration](https://github.com/boldbi/samples/assets/91586758/59d98159-5549-41b5-869d-82c3e331ce28)

3. ​​​​​​​In Configuration mode, if you are examining the dynamic connection string sample at the server level, choose `Server` and connect it.

    ![Configuration Mode](https://github.com/boldbi/samples/assets/91586758/9f3fb07d-840a-48e8-995d-319dffc15d71)

4. Create a dashboard with this same data source and publish it.

5. Custom attribute based dashboard rendering. The dashboard opens in designer mode, then you can click on preview options to see the dashboard rendering based on custom attribute database values.

   ![image](https://github.com/boldbi/samples/assets/91586758/38d066bd-cf3b-4ad9-b07c-cfb2c9ecfadf)
   
   ![image](https://github.com/boldbi/samples/assets/91586758/c7d3421b-d27c-4791-b59b-043347bb3890)


 ## Important notes

It is recommended not to store passwords and sensitive information in configuration files for security reasons in a real-world application. Instead, it would be best if you considered using a secure application, such as Key Vault, to safeguard your credentials.

## Online demos

Look at the Bold BI Embedding sample to live demo [here](https://samples.boldbi.com/embed).

## Documentation

A complete Bold BI Embedding documentation can be found on [Bold BI Embedding Help](https://help.boldbi.com/embedded-bi/javascript-based/).

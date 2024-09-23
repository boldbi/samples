# Bold BI Add Analysis Widget Sample in .NET Core

This project was created using ASP.NET Core 8.0. This application aims to demonstrate the available dashboard embedding actions create, edit, delete and listing the dashboard based on user permissions.

 > **NOTE:** Users must have permission to create, edit, and delete all dashboards, datasources, and categories on your Bold BI Server.

## Dashboard view

![adhoc-dashboard](https://github.com/boldbi/samples/assets/129487075/423eccd9-5500-40d8-96f1-005f820f87e8)

 ## Requirements/Prerequisites

 * [.NET Core 8.0](https://dotnet.microsoft.com/download/dotnet-core)
 
 #### Supported browsers
  
  * Google Chrome, Microsoft Edge, and Mozilla Firefox.

 ## Configuration

  * To configure the specified properties in the `embedDetails.json` file at the designated [location](https://github.com/boldbi/samples/tree/master/Scenario%20Based%20Samples/Add%20Analysis%20Widget%20sample/EmbededShell/EmbeddedbiShell/App_Data/default), please follow to the provided instructions.

    ![adhoc-embeddetails](https://github.com/boldbi/samples/assets/129487075/a93b5ec8-70a2-4c47-8269-d259968e546f)

    <meta charset="utf-8"/>
    <table>
    <tbody>
        <tr>
            <td align="left">Serverurl</td>
            <td align="left">Provide your Bold BI Server Url (ex: http://localhost:12345/bi/site/site1)</td>
        </tr>
        <tr>
            <td align="left">RootUrl</td>
            <td align="left">Provide your Bold BI Root Url (ex: http://localhost:12345/bi).</td>
        </tr>
        <tr>
            <td align="left">SiteIdentifier</td>
            <td align="left">For Bold BI Enterprise edition, it should be like `site/site1`. For Bold BI Cloud, it should be empty string.</td>
        </tr>
        <tr>
            <td align="left">UserDetails</td>
            <td align="left">provide an array of user emails along with your own names, which will be displayed in the user dropdown of the application.</td>
        </tr>
        <tr>
            <td align="left">AdminEmail</td>
            <td align="left">Provide Admin email of your Bold BI, which will be used to get the dashboard.</td>
        </tr>
        <tr>
        <td align="left">EmbedSecret</td>
            <td align="left">Get your EmbedSecret key from embed tab by enabling <code>Enable embed authentication</code> in the <a href='https://help.boldbi.com/embedded-bi/site-administration/embed-settings/'>Administration page</a>. </td>
        </tr>
        <tr>
            <td align="left">Environment</td>
            <td align="left">Provide your Bold BI application environment. (If it is cloud analytics server, use `cloud`; if it is your own server, use `onpremise`).</td>
        </tr> 
        <tr>
            <td align="left">BaseUrl</td>
            <td align="left">provide the localhost Url on which the application is run.</td>
        </tr>
        <tr>
            <td align="left">DatasourceName</td>
            <td align="left">Provide the datasource name where it is configured automatically in draft dashboard on embedded designer while creating a new dashboard in your application.</td>
        </tr>  
        <tr>
            <td align="left">WidgetDetails</td>
            <td align="left">Provide the array of widget lists automatically added in draft dashboard on embedded designer while creating new dashboard.
            </td>
        </tr>  
    </tbody>
    </table>

    > **NOTE:** To learn more about the `WidgetDetails` parameter provided, please refer to [this](https://help.boldbi.com/embedding-options/embedding-sdk/embedding-api-reference/methods/#renderWidgets). To retrieve the widget lists from the server's widget panel, please refer to the `getSupportedWidgets` method [here](https://help.boldbi.com/embedding-options/embedding-sdk/embedding-api-reference/methods/#getSupportedWidgets).

 ## Run a Sample Using Command Line Interface 
    
  1. Open the command line interface and navigate to the specified file [location](https://github.com/boldbi/samples/tree/master/Scenario%20Based%20Samples/Add%20Analysis%20Widget%20sample/EmbededShell/EmbeddedbiShell) where the project is located.

  2. Execute the command `dotnet restore` to restore the necessary packages. Once the packages have been successfully restored, use the `dotnet build` command to build the project.
  
  3. Finally, run the application using the command `dotnet run`. After the application has started, it will display a URL in the `command line interface`, typically something like (e.g., https://localhost:44390). Copy this URL and paste it into your default web browser.

 ## Developer IDE

  * [Visual Studio Code](https://code.visualstudio.com/download)

  ### Run a Sample Using Visual Studio Code
 
  * Open the folder [EmbeddedbiShell](https://github.com/boldbi/samples/tree/master/Scenario%20Based%20Samples/Add%20Analysis%20Widget%20sample/EmbededShell/EmbeddedbiShell) in Visual Studio Code.
   
  * Open the terminal in Visual Studio Code and execute the command `dotnet restore` to restore the required dependencies.
 
  * Build your .NET project by executing the `dotnet build` command in the terminal.
 
  * To run the application, use the command `dotnet run` in the terminal. After the application has started, it will display a URL in the `command line interface`, typically something like (e.g., https://localhost:44390). Copy this URL and paste it into your default web browser.

    ![adhoc-dashboard](https://github.com/boldbi/samples/assets/129487075/0117bcb1-3efe-4e00-aa2f-c629e952d81a)

### About the Sample

1. You can switch the user in the user dropdown at top right of your application.

   ![adhoc-userlist](https://github.com/boldbi/samples/assets/129487075/1e93a36b-cd04-4686-a7b6-ad8e14f9b589)

2. About the Settings list on the left side bar.

   ![adhoc-settings](https://github.com/boldbi/samples/assets/129487075/7b1bbb45-244e-41cc-a6fa-3d366687eda3)

    a. If you check or uncheck the checkbox for `Allow Dashboard Editing`, the dashboard in the dashboard listing will have Read, Write, Delete, or Read permissions, respectively.
    
    b. If you check or uncheck the checkbox for `Allow Datasource Editing`, the datasource in the dashboard will have Read, Write, Delete, or Read permissions, respectively.
    
    c. By default, the `Add Analysis Widget` checkbox will be checked. When creating a new dashboard, the `WidgetDetails` provided in the `embedDetails.json` file, widgets will automatically load in the designer. Additionally, the widget panel will be hidden in both the new and existing dashboard designer. If it is unchecked, both changes will be reverted.

   ![adhoc-newdashboard1](https://github.com/boldbi/samples/assets/129487075/f5a7898b-b0e4-4a1a-abb3-f16e147676b7)
   ![adhoc-newdashboarduncheck](https://github.com/boldbi/samples/assets/129487075/7d49d520-15ad-46bf-85fa-e9429834af0f)
   
## Important notes

It is recommended not to store passwords and sensitive information in configuration files for security reasons in a real-world application. Instead, it would be best if you considered using a secure application, such as Key Vault, to safeguard your credentials.

## Online demos

Look at the Bold BI Embedding sample to live demo [here](https://samples.boldbi.com/embed).

## Documentation

A complete Bold BI Embedding documentation can be found on [Bold BI Embedding Help](https://help.boldbi.com/embedded-bi/javascript-based/).
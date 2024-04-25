# Bold BI embedded-bi-adhoc Sample in .NET Core

This project was created using ASP.NET Core 6.0. This application aims to demonstrate the available dashboard embedding actions create, edit, delete and listing the dashboard based on user permissions.

 > **NOTE:** Users must have permission to create, edit, and delete all dashboards, datasources, and categories on your Bold BI Server.

## Dashboard view

pic

 ## Requirements/Prerequisites

 * [.NET Core 6.0](https://dotnet.microsoft.com/download/dotnet-core)
 
 #### Supported browsers
  
  * Google Chrome, Microsoft Edge, and Mozilla Firefox.

 ## Configuration

  * To configure the specified properties in the `embedDetails.json` file at the designated [location](https://github.com/boldbi/samples/tree/master/Scenario%20Based%20Samples/Add%20Analysis%20Widget%20sample/EmbededShell/EmbeddedbiShell/App_Data/default), please follow to the provided instructions.
    
    pic embedDetails.json

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
            <td align="left">Provide array of user email with your own display name.</td>
        </tr>
        <tr>
            <td align="left">AdminEmail</td>
            <td align="left">Email of the Admin in your Bold BI, which will be used to get the dashboard.</td>
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
            <td align="left">Provide your application localhost Url will run.</td>
        </tr>
        <tr>
            <td align="left">DatasourceName</td>
            <td align="left">Provide the datasource name where it is configured automatically in draft dashboard on embedded designer while creating a new dashboard in your application.</td>
        </tr>  
        <tr>
            <td align="left">WidgetDetails</td>
            <td align="left">Provide the array of widget lists automatically added n draft dashboard on embedded designer while creating new dashboard. To know more, please refer [here](https://help.boldbi.com/embedding-options/embedding-sdk/embedding-api-reference/methods/#renderWidgets). 
            </td>
        </tr>  
    </tbody>
    </table>

    > **NOTE:** To get the widget lists of name or Id, please refer the getSupportedWidgets method [here](https://help.boldbi.com/embedding-options/embedding-sdk/embedding-api-reference/methods/#getSupportedWidgets). 

 ## Run a Sample Using Command Line Interface 
    
  1. Open the command line interface and navigate to the specified file [location](https://github.com/boldbi/samples/tree/master/Scenario%20Based%20Samples/Add%20Analysis%20Widget%20sample/EmbededShell/EmbeddedbiShell) where the project is located.

  2. Execute the command `dotnet restore` to restore the necessary packages. Once the packages have been successfully restored, use the `dotnet build` command to build the project.
  
  3. Finally, run the application using the command `dotnet run`. After the application has started, it will display a URL in the `command line interface`, typically something like (e.g., https://localhost:44390). Copy this URL and paste it into your default web browser.

> **NOTE:** 

 ## Developer IDE

  * [Visual Studio Code](https://code.visualstudio.com/download)

  ### Run a Sample Using Visual Studio Code
 
  * Open the folder [EmbeddedbiShell](https://github.com/boldbi/samples/tree/master/Scenario%20Based%20Samples/Add%20Analysis%20Widget%20sample/EmbededShell/EmbeddedbiShell) in Visual Studio Code.
   
  * Open the terminal in Visual Studio Code and execute the command `dotnet restore` to restore the required dependencies.
 
  * Build your .NET project by executing the `dotnet build` command in the terminal.
 
  * To run the application, use the command `dotnet run` in the terminal. After the application has started, it will display a URL in the `command line interface`, typically something like (e.g., https://localhost:44390). Copy this URL and paste it into your default web browser.

    ![dashboard image](https://github.com/boldbi/aspnet-core-sample/assets/91586758/6c03cba1-beeb-4be2-8a9e-f77f6a3ebf91)

### About the Sample

1. You can switch the user in the user dropdown at top right of your application.

pic 

2. About the Settings list on the left side bar.

   pic

    a. If you check or uncheck the checkbox for `Allow Dashboard Editing`, the dashboard in the dashboard listing will have Read, Write, Delete, or Read permissions, respectively.
    
    b. If you check or uncheck the checkbox for `Allow Datasource Editing`, the datasource in the dashboard will have Read, Write, Delete, or Read permissions, respectively.
    
    c. By default, the `Add Analysis Widget` checkbox will be checked. When creating a new dashboard, the `widgetDetails` provided in the `embedDetails.json` file will automatically load in the designer. Additionally, the widget panel will be hidden in both the new and existing dashboard designer. If it is unchecked, both changes will be reverted.

    pic

## Important notes

It is recommended not to store passwords and sensitive information in configuration files for security reasons in a real-world application. Instead, it would be best if you considered using a secure application, such as Key Vault, to safeguard your credentials.

## Online demos

Look at the Bold BI Embedding sample to live demo [here](https://samples.boldbi.com/embed).

## Documentation

A complete Bold BI Embedding documentation can be found on [Bold BI Embedding Help](https://help.boldbi.com/embedded-bi/javascript-based/).
# Bold BI Embedded Sample in .NET Core

This project was created using ASP.NET Core 6.0. The application aims to demonstrate how to render the dashboard listing using Iframe which is available on your Bold BI server.

## Dashboard view

![Dashboard View](https://github.com/boldbi/aspnet-core-sample/assets/91586758/6c03cba1-beeb-4be2-8a9e-f77f6a3ebf91)

 ## Requirements/Prerequisites

 * [.NET Core 6.0](https://dotnet.microsoft.com/download/dotnet-core)
 
 #### Supported browsers
  
  * Google Chrome, Microsoft Edge, and Mozilla Firefox.

 ## Configuration

  * To set the mandatory properties in the `appsettings.json` file, follow these instructions:
    
    ![EmbedConfig image](https://github.com/boldbi/aspnet-core-sample/assets/91586758/bdb83a3e-02e4-4e99-ad57-717438e5ec5c)

<meta charset="utf-8"/>
    <table>
    <tbody>
        <tr>
            <td align="left">UserEmail</td>
            <td align="left">UserEmail of the Admin in your Bold BI, which will be used to get the dashboard list.</td>
        </tr>
        <tr>
            <td align="left">EmbedSecret</td>
            <td align="left">Get your EmbedSecret key from embed tab by enabling <code>Enable embed authentication</code> in the <a href='https://help.boldbi.com/embedded-bi/site-administration/embed-settings/'>Administration page</a>. </td>
        </tr>  
        <tr>
            <td align="left">RootUrl</td>
            <td align="left">Use your Bold BI root url (http://localhost:[portno]/bi)</td>
        </tr>
        <tr>
            <td align="left">SiteIdentifier</td>
            <td align="left">For Bold BI Enterprise edition, it should be like `site/site1`. For Bold BI Cloud, it should be empty string.</td>
        </tr>
        <tr>
            <td align="left">Environment</td>
            <td align="left">Your Bold BI application environment. (If it is cloud analytics server, use `cloud`; if it is your own server, use `onpremise`).</td>
        </tr>
        <tr>
            <td align="left">CategoryName</td>
            <td align="left">The dashboard listing will be based on the CategoryName provided. If a CategoryName is not provided, the entire dashboard listing will be shown.</td>
        </tr>
    </tbody>
    </table>  

 ## Run a Sample Using Command Line Interface 
    
  1. Open the command line interface and navigate to the specified file [location](https://github.com/boldbi/aspnet-core-sample/tree/master/BoldBI.Embed.Sample) where the project is located.

  2. Execute the command `dotnet restore` to restore the necessary packages. Once the packages have been successfully restored, use the `dotnet build` command to build the project.
  
  3. Finally, run the application using the command `dotnet run`. After the application has started, it will display a URL in the `command line interface`, typically something like (e.g., https://localhost:7168). Copy this URL and paste it into your default web browser.

 ## Developer IDE

  * Visual Studio Code(https://code.visualstudio.com/download)

  ### Run a Sample Using Visual Studio Code
 
  * Open the [sample](https://github.com/boldbi/aspnet-core-sample/tree/master/BoldBI.Embed.Sample) in Visual Studio Code.
   
  * Open the terminal in Visual Studio Code and execute the command `dotnet restore` to restore the required dependencies.
 
  * Build your .NET project by executing the `dotnet build` command in the terminal.
 
  * To run the application, use the command `dotnet run` in the terminal. After the application has started, it will display a URL in the `command line interface`, typically something like (e.g., https://localhost:7168). Copy this URL and paste it into your default web browser.

    ![dashboard image](https://github.com/boldbi/aspnet-core-sample/assets/91586758/6c03cba1-beeb-4be2-8a9e-f77f6a3ebf91)

## Important notes

It is recommended not to store passwords and sensitive information in configuration files for security reasons in a real-world application. Instead, it would be best if you considered using a secure application, such as Key Vault, to safeguard your credentials.

## Online demos

Look at the Bold BI Embedding sample to live demo [here](https://samples.boldbi.com/embed).

## Documentation

A complete Bold BI Embedding documentation can be found on [Bold BI Embedding Help](https://help.boldbi.com/embedding-options/iframe-embedding/).
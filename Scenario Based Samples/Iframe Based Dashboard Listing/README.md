# Bold BI Iframe Embedded Sample in .NET Core

This project was created using ASP.NET Core 6.0. The application aims to demonstrate how to render the dashboard listing using Iframe which is available on your Bold BI server.

## Dashboard view

![iframe-dashboard-listing](https://github.com/boldbi/samples/assets/129487075/631d9c33-cb8d-4faf-94fa-79cf115cad09)

## Requirements/Prerequisites

* [.NET Core 6.0](https://dotnet.microsoft.com/download/dotnet-core)

### Supported browsers
  
* Google Chrome, Microsoft Edge, and Mozilla Firefox.

## Configuration

* To set the mandatory properties in the `appsettings.json` file, follow these instructions:

    ![iframe-appsettings](https://github.com/boldbi/samples/assets/129487075/6506258b-8916-4f2b-9c6f-25e95928c6e1)

| Parameter           | Description                                                                                                                      |
|-----------------|----------------------------------------------------------------------------------------------------------------------------------|
| UserEmail       | UserEmail of the Admin in your Bold BI, which will be used to get the dashboard list.                                           |
| EmbedSecret     | Get your EmbedSecret key from the embed tab by enabling `Enable embed authentication` in the [Administration page](https://help.boldbi.com/embedded-bi/site-administration/embed-settings/). |
| RootURL         | Use your Bold BI root URL (<http://localhost:[portno]/bi>)                                                                           |
| SiteIdentifier  | For Bold BI Enterprise edition, it should be like `site/site1`. For Bold BI Cloud, it should be an empty string.                |
| Environment     | Your Bold BI application environment. (If it is cloud analytics server, use `cloud`; if it is your own server, use `onpremise`). |
| CategoryName    | The dashboard listing will be based on the CategoryName provided. If a CategoryName is not provided, the entire dashboard listing will be shown. |

## Run a Sample Using Command Line Interface

  1. Open the command line interface and navigate to the specified file [location](https://github.com/boldbi/samples/tree/master/Scenario%20Based%20Samples/Iframe%20Based%20Dashboard%20Listing/IframeSolutionSample) where the project is located.

  2. Execute the command `dotnet restore` to restore the necessary packages. Once the packages have been successfully restored, use the `dotnet build` command to build the project.
  
  3. Finally, run the application using the command `dotnet run`. After the application has started, it will display a URL in the `command line interface`, typically something like (e.g., <https://localhost:7168>). Copy this URL and paste it into your default web browser.

## Developer IDE

* Visual Studio Code(<https://code.visualstudio.com/download>)

### Run a Sample Using Visual Studio Code

* Open the [sample](https://github.com/boldbi/samples/tree/master/Scenario%20Based%20Samples/Iframe%20Based%20Dashboard%20Listing/IframeSolutionSample) in Visual Studio Code.

* Open the terminal in Visual Studio Code and execute the command `dotnet restore` to restore the required dependencies.

* Build your .NET project by executing the `dotnet build` command in the terminal.

* To run the application, use the command `dotnet run` in the terminal. After the application has started, it will display a URL in the `command line interface`, typically something like (e.g., <https://localhost:7168>). Copy this URL and paste it into your default web browser.

    ![iframe-dashboard-listing](https://github.com/boldbi/samples/assets/129487075/af1d5fe0-fc17-4cb1-ad6c-d7c37beeb80b)

> **NOTE:**  You can use your own images for your dashboards in the dashboard listing by placing them at the following [path](https://github.com/boldbi/samples/tree/master/Scenario%20Based%20Samples/Iframe%20Based%20Dashboard%20Listing/IframeSolutionSample/wwwroot/images/dashboards) and updating the file name in the imagePaths array in the `site.js` file.

## Important notes

It is recommended not to store passwords and sensitive information in configuration files for security reasons in a real-world application. Instead, it would be best if you considered using a secure application, such as Key Vault, to safeguard your credentials.

## Online demos

Look at the Bold BI Embedding sample to live demo [here](https://samples.boldbi.com/embed).

## Documentation

A complete Bold BI Embedding documentation can be found on [Bold BI Embedding Help](https://help.boldbi.com/embedding-options/iframe-embedding/).

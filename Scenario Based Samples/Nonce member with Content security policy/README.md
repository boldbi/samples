# Bold BI Embedded Sample in Angular with ASP.NET Core

This project was created using ASP.NET Core 6.0. This application aims to demonstrate how to render the dashboard by embedding if you have restricted external scripts in your application.

## Dashboard view

![Dashboard View](https://github.com/boldbi/aspnet-core-sample/assets/91586758/af9a9d3f-3ebc-49dd-9bba-a061932cb9f6)

## Use of nonce attribute

* If you embed a Bold BI dashboard inside a application which restricts all kind of scripts from external source,Bold BI dependencies will not be loaded and hence dashboard can't be rendered.

* In such scenarios we can use an additional member in embed options called `nonce`. This nonce member Api will load only the needed Bold BI dependency script files inside the application.No other external scripts will be permitted.

* Hence dashboard rendering is possible without violating the security protections.

* In this sample we have included a meta tag for Content-Security-Policy and have restricted scripts from external source.

* To know more about `nonce` member kindly refer this [link](https://help.boldbi.com/embedding-options/embedding-sdk/embedding-api-reference/members/#nonce?utm_source=github&utm_medium=backlinks).

### How to configure value for nonce

* In `index.html` file, provide a generic Id value along with nonce attribute inside the meta tag where you have restricted the scripts.

* Inside the `renderDashboard` method in `dashboard-listing.component.ts` file,include nonce member in the embed Options and provide value as the same generic Id which was used inside the meta tag.

* Refer this sample to know how the nonce value has been configured.

## Requirements/Prerequisites

* [.NET Core 6.0](https://dotnet.microsoft.com/en-us/download/dotnet-core)
* [Node.js](https://nodejs.org/en/)

 > **NOTE:** Node.js v14.20 to v18.18 are supported

### Help link

* <https://help.boldbi.com/embedded-bi/faq/where-can-i-find-the-product-version/?utm_source=github&utm_medium=backlinks>

#### Supported browsers
  
* Google Chrome, Microsoft Edge, Mozilla Firefox, and Safari.

## Configuration

* Please ensure you have enabled embed authentication on the `embed settings` page. If it is not currently enabled, please refer to the following image or detailed [instructions](https://help.boldbi.com/site-administration/embed-settings/#get-embed-secret-code?utm_source=github&utm_medium=backlinks) to enable it.
  ![Embed Settings](https://github.com/boldbi/aspnet-core-sample/assets/91586758/b3a81978-9eb4-42b2-92bb-d1e2735ab007)

* To download the `embedConfig.json` file, please follow this [link](https://help.boldbi.com/site-administration/embed-settings/#get-embed-configuration-file?utm_source=github&utm_medium=backlinks) for reference. Additionally, you can refer to the following image for visual guidance.
    ![Embed Settings Download](https://github.com/boldbi/aspnet-core-sample/assets/91586758/d27d4cfc-6a3e-4c34-975e-f5f22dea6172)
    ![EmbedConfig Properties](https://github.com/boldbi/aspnet-core-sample/assets/91586758/d6ce925a-0d4c-45d2-817e-24d6d59e0d63)

* Copy the downloaded `embedConfig.json` file and paste it into the designated [location](https://github.com/boldbi/angular-with-aspnet-core-sample/tree/master/Angular-with-ASP.NETCore) within the application. Please ensure you have placed it in the application, as shown in the following image.

    ![EmbedConfig image](https://github.com/boldbi/aspnet-core-sample/assets/91586758/95e8e272-53e8-449a-8a46-592cf8646d7c)

## Run a Sample Using Command Line Interface

  1. Open the command line interface and navigate to the specified file [location](https://github.com/boldbi/angular-with-aspnet-core-sample/tree/master/Angular-with-ASP.NETCore) where the project is located.

  2. To install all dependent packages using the following command `npm install`.

  3. Execute the command `dotnet restore` to restore the necessary packages. Once the packages have been successfully restored, use the `dotnet build` command to build the project.
  
  4. Finally, run the application using the command `dotnet run`. After executing the command, the application will automatically launch in the default browser. You can access it at the specified port number (e.g., <https://localhost:44459>).

## Developer IDE

* Visual studio code(<https://code.visualstudio.com/download>)

### Run a Sample Using Visual Studio Code

  1. Open the Angular with ASP.NET Core sample in Visual Studio Code.

  2. Open the terminal in Visual Studio Code and install all dependent packages using the following command `npm install`.

  3. Execute the command `dotnet restore` to restore the required dependencies.

  4. Build your .NET project by executing the `dotnet build` command in the terminal.
  
  5. To run the application, use the command `dotnet run` in the terminal. After executing the command, the application will automatically launch in the default browser. You can access it at the specified port number (e.g., <https://localhost:44459>).

     ![dashboard view](https://github.com/boldbi/aspnet-core-sample/assets/91586758/af9a9d3f-3ebc-49dd-9bba-a061932cb9f6)

Please refer to the [help documentation](https://help.boldbi.com/embedding-options/embedding-sdk/samples/angular-with-javascript/#how-to-run-the-sample?utm_source=github&utm_medium=backlinks) to know how to run the sample.

## Important notes

It is recommended not to store passwords and sensitive information in configuration files for security reasons in a real-world application. Instead, it would be best if you considered using a secure application, such as Key Vault, to safeguard your credentials.

## Online demos

Look at the Bold BI Embedding sample to live demo [here](https://samples.boldbi.com/embed?utm_source=github&utm_medium=backlinks).

## Documentation

A complete Bold BI Embedding documentation can be found on [Bold BI Embedding Help](https://help.boldbi.com/embedded-bi/javascript-based/?utm_source=github&utm_medium=backlinks).

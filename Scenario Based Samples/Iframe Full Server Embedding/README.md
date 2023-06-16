# Bold BI Full Server Based Embedding in ASP .NET Core MVC using IFrame

This project was created using ASP.NET Core MVC. The application aims to demonstrate how to render Bold BI server with JWT in Iframe Embedding.

## Bold BI Server Embedding view

![Bold BI Server View](https://github.com/boldbi/samples/assets/129487075/37e0af6a-bd96-478c-ae91-5948840f257d)

## Requirements/Prerequisites

 * [Visual Studio Code](https://code.visualstudio.com/download)
 * [.NET Framework 7.0](https://dotnet.microsoft.com/download/dotnet-core)

#### Supported browsers
  
  * Google Chrome, Microsoft Edge, Mozilla Firefox and Safari.

 ## Configuration
 
 * Please configure the JWT Authentication in you UMS page based on your application Login and Logout URL. If it is not currently enabled, please refer to the following image or detailed [instructions](https://help.boldbi.com/multi-tenancy/site-administration/authentication/json-web-token/#steps-to-configure-jwt-in-bold-bi) to enable it. (ex: http://localhost:50000/ums/administration)
 
    ![JWT Authentication](https://github.com/boldbi/samples/assets/129487075/0dc156e9-4d18-4ebf-b671-a72e045c70a6)

 * As the application based url is localhost, we are setting the `Remote Login URL` and `Remote Logout URL` as below.
 
    ![JWT Authentication](https://github.com/boldbi/samples/assets/129487075/97a6e08b-328a-42fb-a323-1b3784420960)
    
 * Copy the `Signing Key` from the JWT Authentication page and paste it into the `jwt:signingkey` value in the `appsettings.json` file.
 
    ![appsettings.json](https://github.com/boldbi/samples/assets/129487075/0f4b9605-16c2-4308-b3ab-81c98d8d01d7)

 * Open the UMS Site Settings page in `Bold BI Server`. Within `Authentication`, select the `General` tab, enable `Enable Default Authentication`, and `save` the changes.
 
    ![Default Authentication](https://github.com/boldbi/samples/assets/129487075/9de1893d-52f0-40f7-b246-35169e97012a)
    
 * Search for the `config.xml` file in the `Configuration` directory and change the value of the `<EnableSameTabLinkTarget>` tag from `false` to `true` in order to render the URL within the same application."
    
    ![Configuration](https://github.com/boldbi/samples/assets/129487075/d091f037-3be3-42cb-973a-517df6af2497)

 * Open the Administration Site Settings page in `Bold BI Server`. Under `Authentication`, select the `General` tab and enable `Enable Default Authentication`, then `save` the changes. (ex: http://localhost:50000/bi/site/site1/administration)
    
    ![Admin Authentication](https://github.com/boldbi/samples/assets/129487075/b1d52bc4-9ee6-49c6-8ad4-31cdf16c22bd)

 * In the application, change the `jwt:ourserverurl` value in the `appsettings.json` file to the URL of our Bold BI server.
  
    ![appsettings.json](https://github.com/boldbi/samples/assets/129487075/e2ee98be-dd93-4134-b96d-c96adeb7502b)
    
 * In the Application, within the `Embed.cshtml` file located in the `View` folder, update the iframe URL of our Bold BI server.
 
    ![embed.cshtml](https://github.com/boldbi/samples/assets/129487075/26ad7b2b-f21b-46dd-9eca-61d4430f96fb)
    
 ## Run a Sample Using Command Prompt 
    
  1. Open the command prompt and navigate to the specified file [location](https://github.com/boldbi/aspnet-mvc-sample/tree/master) where the project is located.

  2. Execute the command `dotnet restore` to restore the necessary packages. Once the packages have been successfully restored, use the `dotnet build` command to build the project.
  
  3. Finally, run the application using the command `dotnet run`.

 ## Developer IDE

  * [Visual studio code](https://code.visualstudio.com/download)
  
### Run a Sample Using Visual Studio Code
 
  * Open the folder `IframeFullServer` in Visual Studio Code.
  
  * Open the terminal in Visual Studio Code and execute the command `dotnet restore` to restore the required dependencies.
 
  * Build your .NET project by executing the `dotnet build` command in the terminal.
 
  * To run the application, use the command `dotnet run` in the terminal. After executing the command, the application will automatically launch in the default browser. You can access it at the specified port number (e.g., http://localhost:50001/).
    ![Bold BI Server image](https://github.com/boldbi/samples/assets/129487075/37e0af6a-bd96-478c-ae91-5948840f257d)

    > **NOTE:** To mitigate issues related to NuGet packages, run the following command in terminal `dotnet add package Microsoft.IdentityModel.Tokens` and `dotnet add package System.IdentityModel.Tokens.Jwt`

Please refer to the [help documentation](https://help.boldbi.com/embedding-options/embedding-sdk/samples/asp-net-mvc/#how-to-run-the-sample) to know how to run the sample.

## Important notes

It is recommended not to store passwords and sensitive information in configuration files for security reasons in a real-world application. Instead, it would be best if you considered using a secure application, such as Key Vault, to safeguard your credentials.

## Online demos

Look at the Bold BI Embedding sample to live demo [here](https://samples.boldbi.com/embed).

## Documentation

A complete Bold BI Embedding documentation can be found on [Bold BI Embedding Help](https://help.boldbi.com/embedded-bi/javascript-based/).

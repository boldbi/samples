# Bold BI Full Server Based Embedding in ASP .NET Core MVC using IFrame

This project was created using ASP.NET Core MVC. The application aims to demonstrate how to render Bold BI server with JWT in Iframe Embedding.

## Bold BI Server Embedding view

![Bold BI Server View](https://github.com/boldbi/samples/assets/129487075/37e0af6a-bd96-478c-ae91-5948840f257d)

## Requirements/Prerequisites

 * [Visual Studio Code](https://code.visualstudio.com/download)
 * [.NET Core 6.0](https://dotnet.microsoft.com/download/dotnet-core)

#### Supported browsers
  
  * Google Chrome, Microsoft Edge, Mozilla Firefox and Safari.

 ## Configuration
 
 * Please configure the JWT Authentication on your UMS page (ex: http://localhost:50000/ums/administration).  To do this, navigate to the UMS Site Settings page on the Bold BI Server. From there, choose `Authentication` and click on the `JWT` tab.  Enable the `Enable JWT`. If it's not, please refer to the following image or detailed [instructions](https://help.boldbi.com/multi-tenancy/site-administration/authentication/json-web-token/#steps-to-configure-jwt-in-bold-bi) on how to enable it. 
 
    ![JWT Authentication](https://github.com/boldbi/samples/assets/129487075/4e90e36d-2eeb-408b-b215-ca48160f5719)

 * Provide the following details in the `JWT`.  As the application based url is localhost, we are setting the `Remote Login URL` and `Remote Logout URL` as below and `Save` the changes.
 
    ![JWT Authentication](https://github.com/boldbi/samples/assets/129487075/129a52df-d7e9-4b82-8ca5-7300e22ea4e3)
    
 * Copy the `Signing Key` from the JWT Authentication page and paste it into the `jwt:signingkey` value in the `appsettings.json` file.
   
    ![JWT Authentication](https://github.com/boldbi/samples/assets/129487075/c7d429ee-eb6e-4d3f-aa49-0e9d9bddef91)
 
    ![appsettings.json](https://github.com/boldbi/samples/assets/129487075/37f439d6-3f58-43b3-807f-b90aeb3e2fbe)

 * Open the UMS Site Settings page in Bold BI Server.  Under the `Authentication`, select the `General` tab and enable `Enable Default Authentication`.  In the `Default Authentication Provider` dropdown, select `JWT SSO` and `Save` the changes.
 
    ![Default Authentication](https://github.com/boldbi/samples/assets/129487075/a81894ac-c147-41df-8c97-ed9928d16953)
    
 * Click on `Configuration` in UMS Settings, then select the `config.xml` file from the dropdown.  Change the value of the `<EnableSameTabLinkTarget>` tag from `false` to `true` in order to render the URL within the same application and `Save` the changes.
    
    ![Configuration](https://github.com/boldbi/samples/assets/129487075/b3d65c3c-d470-4f53-9983-a35291bb6bfe)

 * Open the Administration Site Settings page in Bold BI Server. Under `Authentication`, select the `General` tab and enable `Enable Default Authentication`, then `Save` the changes. (ex: http://localhost:50000/bi/site/site1/administration)
    
    ![Admin Authentication](https://github.com/boldbi/samples/assets/129487075/763ae9a6-4448-40c3-9897-afb28db745ed)

 * In the application, change the `jwt:boldbiserverurl` value in the `appsettings.json` file to the URL of our Bold BI server.
  
    ![appsettings.json](https://github.com/boldbi/samples/assets/129487075/efb08c80-ffcc-453e-b216-0949b06b9126)

    
 ## Run a Sample Using Command Prompt 
    
  1. Open the command prompt and navigate to the specified file [location](https://github.com/boldbi/samples/tree/master/Scenario%20Based%20Samples/Iframe%20Full%20Server%20Embedding/IframeFullServer) where the project is located.

  2. Execute the command `dotnet restore` to restore the necessary packages. Once the packages have been successfully restored, use the `dotnet build` command to build the project.
  
  3. Finally, run the application using the command `dotnet run`.  It will display a URL typically something like (e.g., http://localhost:40000).  Copy this URL and paste it into your default web browser.

 ## Developer IDE

  * [Visual studio code](https://code.visualstudio.com/download)
  
### Run a Sample Using Visual Studio Code
 
  * Open the folder `IframeFullServer` in Visual Studio Code.
  
  * Open the terminal in Visual Studio Code and execute the command `dotnet restore` to restore the required dependencies.
 
  * Build your .NET project by executing the `dotnet build` command in the terminal.
 
  * To run the application, use the command `dotnet run` in the terminal. After executing the command, the application has started and it will display a URL typically something like (e.g., http://localhost:40000).  Copy this URL and paste it into your default web browser.
    
    ![Bold BI Server image](https://github.com/boldbi/samples/assets/129487075/37e0af6a-bd96-478c-ae91-5948840f257d)

    > **NOTE:** To mitigate issues related to NuGet packages, run the following command in terminal `dotnet add package Microsoft.IdentityModel.Tokens` and `dotnet add package System.IdentityModel.Tokens.Jwt`


## Important notes

It is recommended not to store passwords and sensitive information in configuration files for security reasons in a real-world application. Instead, it would be best if you considered using a secure application, such as Key Vault, to safeguard your credentials.

## Online demos

Look at the Bold BI Embedding sample to live demo [here](https://samples.boldbi.com/embed).

## Documentation

A complete Bold BI Embedding documentation can be found on [Bold BI Embedding Help](https://help.boldbi.com/embedding-options/iframe-embedding/).

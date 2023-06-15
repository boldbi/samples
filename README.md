# Bold BI Embedded Sample in .NET Core MVC

This project was created using ASP.NET Core MVC 6. The application aims to demonstrate how to render Bold BI server with JWT in Iframe Embedding.

## Bold BI Server view

![Bold BI Server View](https://github.com/bold-bi/embedded-bi-samples/assets/129487075/23c26113-126e-4e09-b9b8-5faf8d554b09)

## Requirements/Prerequisites

 * [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/)
 * [.NET Framework 6](https://dotnet.microsoft.com/download/dotnet-core)

#### Supported browsers
  
  * Google Chrome, Microsoft Edge, Mozilla Firefox, Safari and MAC.

 ## Configuration
 
 * Please ensure that you have enabled JWT Authentication on UMS page. If it is not currently enabled, please refer to the following image or detailed [instructions](https://help.boldbi.com/multi-tenancy/site-administration/authentication/json-web-token/#steps-to-configure-jwt-in-bold-bi) to enable it.
 
    ![JWT Authentication](https://github.com/bold-bi/embedded-bi-samples/assets/129487075/99381eeb-5b82-4a84-843f-56417efb782e)

 * Enter `Remote Login URL` and `Remote Logout URL` as they appear in the image.
 
    ![JWT Authentication](https://github.com/bold-bi/embedded-bi-samples/assets/129487075/c070b494-39ce-4aa3-9bd5-482f647f9c82)
    
 * Copy the `Signing Key` from the JWT Authentication page and paste it into the `jwt:signingkey` value in the `appsettings.json` file.
 
    ![appsettings.json](https://github.com/bold-bi/embedded-bi-samples/assets/129487075/b3dfeb8f-77ef-403b-9dd7-f26648b5f81d)

 * Open the UMS Site Settings page in Bold BI Server. Within `Authentication`, select the `General` tab, enable `Enable Default Authentication`, and `save` the changes.
 
    ![Default Authentication](https://github.com/bold-bi/embedded-bi-samples/assets/129487075/e4fd3ec2-f54b-4a0b-a7ac-ea2e70e89b62)
    
 * Search for the `config.xml` file in the `Configuration` directory and change the value of the `<EnableSameTabLinkTarget>` tag from `false` to `true` in order to render the URL within the same application."
    
    ![Configuration](https://github.com/bold-bi/embedded-bi-samples/assets/129487075/cd177ca7-2218-47c4-a05e-2a60a545a1a0)

 * Open the Administration Site Settings page in Bold BI Server. Under `Authentication`, select the `General` tab and enable `Enable Default Authentication`, then `save` the changes.
    
    ![Admin Authentication](https://github.com/bold-bi/embedded-bi-samples/assets/129487075/a4530a87-1708-453e-9a68-e8c3f7f3b998)
    
 * In the application, change the `jwt:ourserverurl` value in the `appsettings.json` file to the URL of our Bold BI server.
  
    ![appsettings.json](https://github.com/bold-bi/embedded-bi-samples/assets/129487075/3412b366-7f5c-4301-832f-481e65638631)
   
 * In the Application, within the `Embed.cshtml` file located in the `View` folder, update the iframe URL of our Bold BI server.
 
    ![embed.cshtml](https://github.com/bold-bi/embedded-bi-samples/assets/129487075/091e0b1d-d8a4-4aa1-afad-ab5290706237)
    
 * In the Application, within the `HomeController.cs` file located in the `Controllers` folder, update to the URL of our Bold BI server.

    ![HomeController.cs](https://github.com/bold-bi/embedded-bi-samples/assets/129487075/a141b35e-4cf4-4ed6-8b10-5ed605c066fe)

 ## Developer IDE

  * Visual studio 2022(https://visualstudio.microsoft.com/downloads/)
  
### Run a Sample Using Visual Studio 2022
 
  * Open the solution file `IframeFullServerSample.sln` in Visual Studio.

  * Run your `ASP.NET Core MVC` sample in Visual Studio.

Please refer to the [help documentation](https://help.boldbi.com/embedding-options/embedding-sdk/samples/asp-net-mvc/#how-to-run-the-sample) to know how to run the sample.

## Important notes

It is recommended not to store passwords and sensitive information in configuration files for security reasons in a real-world application. Instead, it would be best if you considered using a secure application, such as Key Vault, to safeguard your credentials.

## Online demos

Look at the Bold BI Embedding sample to live demo [here](https://samples.boldbi.com/embed).

## Documentation

A complete Bold BI Embedding documentation can be found on [Bold BI Embedding Help](https://help.boldbi.com/embedded-bi/javascript-based/).

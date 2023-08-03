# Applying Dashboard Parameters in Widget Embedding BoldBI in .NET Core

This project was created using ASP.NET Core 6.0. This application aims to demonstrate how to showcase the implementation of dashboard parameters in a BoldBI widget through JavaScript Embedding.

## Dashboard view

![Dashboard View](https://github.com/boldbi/aspnet-core-sample/assets/91586758/6c03cba1-beeb-4be2-8a9e-f77f6a3ebf91)

 ## Requirements/Prerequisites

 * [.NET Core 6.0](https://dotnet.microsoft.com/download/dotnet-core)
 * [Visual Studio Code](https://code.visualstudio.com/download)
 
 #### Supported browsers
  
  * Google Chrome, Microsoft Edge and Mozilla Firefox.

 ## Configuration

  * Please ensure you have enabled embed authentication on the `embed settings` page. If it is not currently enabled, please refer to the following image or detailed [instructions](https://help.boldbi.com/site-administration/embed-settings/#get-embed-secret-code) to enable it.

    ![Embed Settings](https://github.com/boldbi/aspnet-core-sample/assets/91586758/b3a81978-9eb4-42b2-92bb-d1e2735ab007)

  * To download the `embedConfig.json` file, please follow this [link](https://help.boldbi.com/site-administration/embed-settings/#get-embed-configuration-file) for reference. Additionally, you can refer to the following image for visual guidance.

     ![Embed Settings Download](https://github.com/boldbi/aspnet-core-sample/assets/91586758/d27d4cfc-6a3e-4c34-975e-f5f22dea6172)
     ![EmbedConfig Properties](https://github.com/boldbi/aspnet-core-sample/assets/91586758/d6ce925a-0d4c-45d2-817e-24d6d59e0d63)

  * Copy the downloaded `embedConfig.json` file and paste it into the designated [location](https://github.com/boldbi/aspnet-core-sample/tree/master/BoldBI.Embed.Sample) within the application. Please ensure you have placed it in the application, as shown in the following image.
    
    ![EmbedConfig image](https://github.com/boldbi/aspnet-core-sample/assets/91586758/bdb83a3e-02e4-4e99-ad57-717438e5ec5c)

 ## Run a Sample Using Command Line Interface 
    
  1. Open the command line interface and navigate to the specified file [location](https://github.com/boldbi/aspnet-core-sample/tree/master/BoldBI.Embed.Sample) where the project is located.

  2. Execute the command `dotnet restore` to restore the necessary packages. Once the packages have been successfully restored, use the `dotnet build` command to build the project.
  
  3. Finally, run the application using the command `dotnet run`. After the application has started, it will display a URL in the `command line interface`, typically something like (e.g., http://localhost:5000). Copy this URL and paste it into your default web browser.

> **NOTE:** We represent the dashboard embedding by default without the dashboards listing sidebar. You must navigate to the `dashboardlisting` URL (such as http://localhost:5000/dashboardlisting) to enable the dashboards list.

 ## Developer IDE

  * Visual studio code(https://code.visualstudio.com/download)

  ### Run a Sample Using Visual Studio Code
 
  * Open the ASP.NET Core sample in Visual Studio Code.
   
  * Open the terminal in Visual Studio Code and execute the command `dotnet restore` to restore the required dependencies.
 
  * Build your .NET project by executing the `dotnet build` command in the terminal.
 
  * To run the application, use the command `dotnet run` in the terminal. After the application has started, it will display a URL in the `command line interface`, typically something like (e.g., http://localhost:5000). Copy this URL and paste it into your default web browser.

    ![dashboard image](https://github.com/boldbi/aspnet-core-sample/assets/91586758/6c03cba1-beeb-4be2-8a9e-f77f6a3ebf91)

> **NOTE:** We represent the dashboard embedding by default without the dashboards listing sidebar. You must navigate to the `dashboardlisting` URL (such as http://localhost:5000/dashboardlisting) to enable the dashboards list.

Please refer to the [help documentation](https://help.boldbi.com/embedding-options/embedding-sdk/samples/asp-net-core/#how-to-run-the-sample) to know how to run the sample.

## How to apply dashboard parameters for widget in JavaScript Embedding

JavaScript embedding provides support for filtering widgets with dashboard parameters. This section will elaborate on how to effectively utilize dashboard parameters in JavaScript embedding to filter the widgets.

>**NOTE:** Please refer the [link](https://help.boldbi.com/embedding-options/embedding-sdk/embedding-a-widget/) for know more about the widget embedding.

### Steps to follow for applying filters into widgets,
1. In the Bold BI Server, load the `Workforce Performance Dashboard` from Sample Dashboards.

   ![load-dashboard-from-server](https://github.com/boldbi/samples/assets/92368448/a49eeac2-3ac2-494b-b50e-33ba16f45e65)

2. By default, the `Workforce Performance Dashboard` does not have [Dashboard Parameters](https://help.boldbi.com/cloud-bi/working-with-data-source/configuring-dashboard-parameters/#configuring-dashboard-parameters) configured. For demonstration, follow these steps to configure the Dashboard Parameter with `Literal Mode` as shown in the screenshot below:

    * Enter the Parameter Name: `Department`
    * Enter the Parameter Value: `Sales`

    ![enter-parameter-name-value](https://github.com/boldbi/samples/assets/92368448/e7c59bb7-f691-43a3-a21e-9438d6dd10a1)

3. After successfully publishing the dashboard with configured dashboard parameters, download the [embedConfig JSON](https://help.boldbi.com/site-administration/embed-settings/#get-embed-configuration-file) file associated with that specific dashboard. 

    ![select-dashboard-from-embed-json](https://github.com/boldbi/samples/assets/92368448/9f295d67-39b3-49fd-83cd-ca53e44fd513)

4. Once configured the embedConfig.JSON file in the designated [location](https://github.com/boldbi/aspnet-core-sample/tree/master/BoldBI.Embed.Sample), then run your application.

5. Upon initial rendering, the widget will display with the default value of the dashboard parameter, which, in this case, is set to `Sales`. The property panel, by default, will show the name of the dashboard parameter in the text field. 

    ![initial-widget-rendering](https://github.com/boldbi/samples/assets/92368448/a072988b-1b8b-4bd3-9303-121a5da1442f)

6.  To update the widget based on a specific dashboard parameter value, enter the value of the dashboard parameter in the textbox. After entering the value, click `Apply` and update it using [updateFilters()](https://help.boldbi.com/embedding-options/embedding-sdk/embedding-api-reference/methods/#updatefilters) API available in BoldBI. For example, `Department=IT`.

    ![enter-value-click-apply](https://github.com/boldbi/samples/assets/92368448/25fe2f42-a28d-474f-8dc2-222b6a1a81e0)

7. Thus, the widget will be loaded with the applied dashboard parameter value in the viewer section.

    ![updated-widget-with-dp](https://github.com/boldbi/samples/assets/92368448/80ea027d-c18f-4f7c-b0a2-e727b3c4479c)











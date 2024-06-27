# Applying Widget-based filter for Widget Embedding in React with ASP.NET Core

This project was created using ASP.NET Core 6.0. This application aims to demonstrate how to showcase the implementation of widget-based filtering in a BoldBI widget through JavaScript Embedding.

## Widget view

   ![Widget-View](https://github.com/boldbi/samples/assets/92368448/a79b6660-10f9-4f9a-a4ee-e03832db57dd)

## Requirements/Prerequisites

* [.NET Core 6.0](https://dotnet.microsoft.com/download/dotnet-core)
* [Visual Studio Code](https://code.visualstudio.com/download)
 
#### Supported browsers
  
* Google Chrome, Microsoft Edge and Mozilla Firefox.

## Configuration

1. Please [get](https://github.com/boldbi/samples/tree/master/Scenario%20Based%20Samples/Dashboard-Parameter-In-Widget-Embedding) the GitHub sample for applying widget-based filtering for Widget Embedding.

2. In the BoldBI server, load the `Sales Analysis Dashboard` from the Sample Dashboards.

3. In our sample, we are going to utilize `Sales by Channel` widget. By default, the same color is applied for all the columns. For demonstration purposes, we need to apply different colors for different columns by enabling `Advance Setting` to customize the color under the **Formatting** section in the Properties pane. Please check this [link](https://help.boldbi.com/visualizing-data/visualization-widgets/column-chart/#formatting) for more details. 

    a. By doing so, the **Conditional Formatting** dialog will be opened.

    b. Choose the **Individual** mode in the color type and assign a specific color for each record. Then, click the save button to apply the changes.

4. Publish the dashboard and download the `embedConfig.json` file for that dashboard by following the procedures below.

    a. Please ensure you have enabled embed authentication on the `embed settings` page. If it is not currently enabled, please refer to the following image or detailed [instructions](https://help.boldbi.com/site-administration/embed-settings/#get-embed-secret-code) to enable it.

    ![EmbedSettingsPage](https://github.com/boldbi/samples/assets/92368448/972a932c-94b1-450a-96db-79dc496751f3)

    b. To download the `embedConfig.json` file, please follow this [link](https://help.boldbi.com/site-administration/embed-settings/#get-embed-configuration-file) for reference. Additionally, you can refer to the following image for visual guidance.

    ![EmbedSettingsDownload](https://github.com/boldbi/samples/assets/92368448/cc4d65e1-392f-436c-ad27-6e2b636fc6b6)

    ![Embed-Config-JSON](https://github.com/boldbi/samples/assets/92368448/53c1eddb-1d55-47d7-8e12-502ad6d74dd9)

    c. Copy the downloaded `embedConfig.json` file and paste it into the designated [location]() within the application. Please ensure you have placed it in the application, as shown in the following image.
    
    ![Embed-Config-JSON-Path](https://github.com/boldbi/samples/assets/92368448/e7fe5e57-9cdf-4ec3-8dda-91703a061873)

## Steps to configuration and Run a Sample Using Command Line Interface 

1. Open the command line interface and navigate to the specified file [location]() where the project is located.

2. To install all dependent packages, use the following command `npm install`.

3. Execute the command `dotnet restore` to restore the necessary packages. Once the packages have been successfully restored, use the `dotnet build` command to build the project.
  
4. Finally, run the application using the command `dotnet run`. After the application has started, it will display a URL in the `command line interface`, typically something like (e.g., http://localhost:5292). Copy this URL and paste it into your default web browser.

## Developer IDE

* [Visual Studio Code](https://code.visualstudio.com/download)

### Run a Sample Using Visual Studio Code
 
* Open the [Widget Embedding]() sample in Visual Studio Code.
   
* Open the terminal in Visual Studio Code and install all dependent packages using the following command npm install.

* Execute the command `dotnet restore` to restore the required dependencies.
 
* Build your .NET project by executing the `dotnet build` command in the terminal.
 
* To run the application, use the command `dotnet run` in the terminal. After the application has started, it will display a URL in the `command line interface`, typically something like (e.g., http://localhost:5292). Copy this URL and paste it into your default web browser.

    ![Rendered-Dashboard-View](https://github.com/boldbi/samples/assets/92368448/4b98b157-b674-429b-b346-4536cf420cb7)

## How the sample works

1. In the initial rendering, the specified widget will render with all values using the renderWidget() method. Please check this [link](https://help.boldbi.com/embedding-options/embedding-sdk/embedding-a-widget/) for more details about widget embedding.

2. For the on-demand case, you can select options from the multiselect dropdown list and click the `Apply Filters` button. By clicking this button, the widgetFilter() method will be triggered to apply the filters. For example, if you select options such as Corporate and Online, then the selected filter values will apply in the `Sales by Channel` widget.
# Applying Widget-based filter for Widget Embedding in React with ASP.NET Core

This project was created using ASP.NET Core 8.0. This application aims to demonstrate how to showcase the implementation of widget-based filtering in a BoldBI widget through JavaScript Embedding.

## Widget view

   ![Widget-view](https://github.com/boldbi/samples/assets/129487075/857fd291-9498-4155-a9cc-f040c7c9be53)

## Requirements/Prerequisites

* [.NET Core 8.0](https://dotnet.microsoft.com/download/dotnet-core)
* [Visual Studio Code](https://code.visualstudio.com/download)
* [Node.js](https://nodejs.org/en/)

> **NOTE:** Node.js v18.17 to v20.14 are supported

### Supported browsers
  
* Google Chrome, Microsoft Edge and Mozilla Firefox.

## Configuration

1. Please [get](https://github.com/boldbi/samples/tree/master/Scenario%20Based%20Samples/Widget%20embedding%20with%20filters) the GitHub sample for applying widget-based filtering for Widget Embedding.

2. In the BoldBI server, load the `Sales Analysis Dashboard` from the Sample Dashboards.

   ![image](https://github.com/boldbi/samples/assets/129487075/b7b0c2d8-8d51-444d-811a-feccf44659bc)

3. In our sample, we are going to utilize `Sales by Channel` widget. By default, the same color is applied for all the columns. For demonstration purposes, we need to apply different colors for different columns by enabling `Advance Setting` to customize the color under the **Formatting** section in the Properties pane. Please check this [link](https://help.boldbi.com/visualizing-data/visualization-widgets/column-chart/#formatting?utm_source=github&utm_medium=backlinks) for more details.

   ![properties-pane](https://github.com/boldbi/samples/assets/129487075/37f6625e-efa3-42c8-939f-e34d9c8f7c2e)

    a. By doing so, the **Conditional Formatting** dialog will be opened.

    b. Choose the **Individual** mode in the color type and assign a specific color for each record. Then, click the save button to apply the changes.

      ![format-dialog](https://github.com/boldbi/samples/assets/129487075/87f32737-1abf-449d-9bea-f4d6857db9af)

4. Publish the dashboard and download the `embedConfig.json` file for that dashboard by following the procedures below.

    a. Please ensure you have enabled embed authentication on the `embed settings` page. If it is not currently enabled, please refer to the following image or detailed [instructions](https://help.boldbi.com/site-administration/embed-settings/#get-embed-secret-code?utm_source=github&utm_medium=backlinks) to enable it.

    ![EmbedSettingsPage](https://github.com/boldbi/samples/assets/92368448/972a932c-94b1-450a-96db-79dc496751f3)

    b. To download the `embedConfig.json` file, please follow this [link](https://help.boldbi.com/site-administration/embed-settings/#get-embed-configuration-file?utm_source=github&utm_medium=backlinks) for reference. Additionally, you can refer to the following image for visual guidance.

    ![EmbedSettingsDownload](https://github.com/boldbi/samples/assets/92368448/cc4d65e1-392f-436c-ad27-6e2b636fc6b6)

    ![Embed-Config-JSON](https://github.com/boldbi/samples/assets/92368448/53c1eddb-1d55-47d7-8e12-502ad6d74dd9)

    c. Copy the downloaded `embedConfig.json` file and paste it into the designated [location](https://github.com/boldbi/samples/tree/master/Scenario%20Based%20Samples/Widget%20embedding%20with%20filters) within the application. Please ensure you have placed it in the application, as shown in the following image.

    ![Embed-Config-JSON-Path](https://github.com/boldbi/samples/assets/129487075/e3faaef9-801f-47c6-97ab-9c2f39c60e09)

## Run a Sample Using Command Line Interface

1. Open the command line interface and navigate to the specified file [location](https://github.com/boldbi/samples/tree/master/Scenario%20Based%20Samples/Widget%20embedding%20with%20filters) where the project is located.

2. To install all dependent packages, use the following command `npm install`.

3. Execute the command `dotnet restore` to restore the necessary packages. Once the packages have been successfully restored, use the `dotnet build` command to build the project.
  
4. Finally, run the application using the command `dotnet run`. After the application has started, it will display a URL in the `command line interface`, typically something like (e.g., <http://localhost:5292>). Copy this URL and paste it into your default web browser.

## Developer IDE

* [Visual Studio Code](https://code.visualstudio.com/download)

### Run a Sample Using Visual Studio Code

* Open the [Widget embedding with filters](https://github.com/boldbi/samples/tree/master/Scenario%20Based%20Samples/Widget%20embedding%20with%20filters) sample in Visual Studio Code.

* Open the terminal in Visual Studio Code and install all dependent packages using the following command `npm install`.

* Execute the command `dotnet restore` to restore the required dependencies.

* Build your .NET project by executing the `dotnet build` command in the terminal.

* To run the application, use the command `dotnet run` in the terminal. After the application has started, it will display a URL in the `command line interface`, typically something like (e.g., <http://localhost:5292>). Copy this URL and paste it into your default web browser.

  ![Widget-view](https://github.com/boldbi/samples/assets/129487075/857fd291-9498-4155-a9cc-f040c7c9be53)
  
## How the sample works

1. In the initial rendering, the specified widget will render with all values using the **renderWidget()** method. Please check this [link](https://help.boldbi.com/embedding-options/embedding-sdk/embedding-a-widget/?utm_source=github&utm_medium=backlinks) for more details about widget embedding.

   ![renderwidget](https://github.com/boldbi/samples/assets/129487075/c8f5b7ef-e1fe-43d2-ba7f-56d79d68cd57)

2. For the on-demand case, you can select options from the multiselect dropdown list and click the `Apply filters` button. By clicking this button, the **widgetFilter()** method will be triggered to apply the filters. For example, if you select options such as Corporate and Online, then the selected filter values will apply in the `Sales by Channel` widget.

   ![updatefilter](https://github.com/boldbi/samples/assets/129487075/ce04cc33-1f2a-4242-9140-8a78225a8a76)
   ![filter-apply](https://github.com/boldbi/samples/assets/129487075/938a0ab1-49e9-490b-ad77-3e0dd717df1e)
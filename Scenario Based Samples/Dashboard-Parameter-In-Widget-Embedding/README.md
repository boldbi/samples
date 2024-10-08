# Applying Dashboard Parameters for Widget Embedding using .NET Core

This project was created using ASP.NET Core 6.0. This application aims to demonstrate how to showcase the implementation of dashboard parameters in a BoldBI widget through JavaScript Embedding.

## Dashboard view

   ![Dashboard-View](https://github.com/boldbi/samples/assets/92368448/a79b6660-10f9-4f9a-a4ee-e03832db57dd)

## Requirements/Prerequisites

* [.NET Core 6.0](https://dotnet.microsoft.com/download/dotnet-core)
* [Visual Studio Code](https://code.visualstudio.com/download)

### Supported browsers
  
* Google Chrome, Microsoft Edge and Mozilla Firefox.

## Configuration

* Please ensure you have enabled embed authentication on the `embed settings` page. If it is not currently enabled, please refer to the following image or detailed [instructions](https://help.boldbi.com/site-administration/embed-settings/#get-embed-secret-code?utm_source=github&utm_medium=backlinks) to enable it.

    ![EmbedSettingsPage](https://github.com/boldbi/samples/assets/92368448/972a932c-94b1-450a-96db-79dc496751f3)

* To download the `embedConfig.json` file, please follow this [link](https://help.boldbi.com/site-administration/embed-settings/#get-embed-configuration-file?utm_source=github&utm_medium=backlinks) for reference. Additionally, you can refer to the following image for visual guidance.

    ![EmbedSettingsDownload](https://github.com/boldbi/samples/assets/92368448/cc4d65e1-392f-436c-ad27-6e2b636fc6b6)

    ![Embed-Config-JSON](https://github.com/boldbi/samples/assets/92368448/53c1eddb-1d55-47d7-8e12-502ad6d74dd9)

* Copy the downloaded `embedConfig.json` file and paste it into the designated [location](https://github.com/boldbi/samples/tree/master/Scenario%20Based%20Samples/Dashboard-Parameter-In-Widget-Embedding) within the application. Please ensure you have placed it in the application, as shown in the following image.

    ![Embed-Config-JSON-Path](https://github.com/boldbi/samples/assets/92368448/e7fe5e57-9cdf-4ec3-8dda-91703a061873)

## Run a Sample Using Command Line Interface

  1. Please [get](https://github.com/boldbi/samples/tree/master/Scenario%20Based%20Samples/Dashboard-Parameter-In-Widget-Embedding) the GitHub sample for applying Dashboard Parameters for Widget Embedding using .NET Core

  2. Open the command line interface and navigate to the specified file [location](https://github.com/boldbi/samples/tree/master/Scenario%20Based%20Samples/Dashboard-Parameter-In-Widget-Embedding) where the project is located.

  3. Execute the command `dotnet restore` to restore the necessary packages. Once the packages have been successfully restored, use the `dotnet build` command to build the project.
  
  4. Finally, run the application using the command `dotnet run`. After the application has started, it will display a URL in the `command line interface`, typically something like (e.g., <http://localhost:5000>). Copy this URL and paste it into your default web browser.

> **NOTE:** We represent the dashboard embedding by default without the dashboards listing sidebar. You must navigate to the `dashboardlisting` URL (such as <http://localhost:5000/dashboardlisting>) to enable the dashboards list.

## Developer IDE

* Visual studio code(<https://code.visualstudio.com/download>)

### Run a Sample Using Visual Studio Code

* Open the ASP.NET Core sample in Visual Studio Code.

* Open the terminal in Visual Studio Code and execute the command `dotnet restore` to restore the required dependencies.

* Build your .NET project by executing the `dotnet build` command in the terminal.

* To run the application, use the command `dotnet run` in the terminal. After the application has started, it will display a URL in the `command line interface`, typically something like (e.g., <http://localhost:5000>). Copy this URL and paste it into your default web browser.

    ![Rendered-Dashboard-View](https://github.com/boldbi/samples/assets/92368448/4b98b157-b674-429b-b346-4536cf420cb7)

> **NOTE:** We represent the dashboard embedding by default without the dashboards listing sidebar. You must navigate to the `dashboardlisting` URL (such as <http://localhost:5000/dashboardlisting>) to enable the dashboards list.

Please refer to the [help documentation](https://help.boldbi.com/embedding-options/embedding-sdk/samples/asp-net-core/#how-to-run-the-sample?utm_source=github&utm_medium=backlinks) to know how to run the sample.

## How to apply dashboard parameters for widget in JavaScript Embedding

JavaScript embedding provides support for filtering widgets with dashboard parameters. This section will elaborate on how to effectively utilize dashboard parameters in JavaScript embedding to filter the widgets.

### Steps to follow for applying filters into widgets

* In the Bold BI Server, load the `HR Recruitment Dashboard` from Sample Dashboards.

    ![load-dashboard-from-server](https://github.com/boldbi/samples/assets/92368448/fa007d90-4b55-4d42-9562-9cb120876f4d)

* By default, the `HR Recruitment Dashboard` does not have [Dashboard Parameters](https://help.boldbi.com/cloud-bi/working-with-data-source/configuring-dashboard-parameters/#configuring-dashboard-parameters?utm_source=github&utm_medium=backlinks) configured. For demonstration, follow these steps to configure the Dashboard Parameter with `Literal Mode` as shown in the screenshot below:

  * Enter the Parameter Name: `Department`
  * Enter the Parameter Value: `IT`

    ![enter-parameter-name-value](https://github.com/boldbi/samples/assets/92368448/d4041b0a-517a-4c3d-abf7-c05e25615630)

* After successfully publishing the dashboard with configured dashboard parameters, download the [embedConfig JSON](https://help.boldbi.com/site-administration/embed-settings/#get-embed-configuration-file?utm_source=github&utm_medium=backlinks) file associated with that specific dashboard.

* Once configured the embedConfig.JSON file in the designated [location](https://github.com/boldbi/samples/tree/master/Scenario%20Based%20Samples/Dashboard-Parameter-In-Widget-Embedding), then run your application.

* Upon initial rendering, the widget will display with the default value of the dashboard parameter, which, in this case, is set to `IT`. The property panel, by default, will show the name of the dashboard parameter in the text field.

      ![initial-widget-rendering](https://github.com/boldbi/samples/assets/92368448/14b07a07-0f18-42e8-a130-f85a092ffffa)

>**Note:** For more information about the initial rendering of the widget, please refer the [link](https://help.boldbi.com/embedding-options/embedding-sdk/embedding-a-widget/?utm_source=github&utm_medium=backlinks).

* To modify the widget according to a particular dashboard parameter value, choose a different value from the list of `Departments`, then click on `Apply`. For example, select `Accounts` to demonstrate.

    ![select-department-values](https://github.com/boldbi/samples/assets/92368448/6003e0dc-216f-4654-9217-4ff76cac32d0)

>**Note:** For more information about updating the widget with dashboard parameter without re-render the widget, please refer the [link](https://help.boldbi.com/embedding-options/embedding-sdk/embedding-api-reference/methods/#updatefilters?utm_source=github&utm_medium=backlinks).

* Thus, the widget will be loaded with the applied dashboard parameter value in the viewer section.

    ![updated-widget-with-dp](https://github.com/boldbi/samples/assets/92368448/1c9ff397-9b63-465d-9697-ffa2006ed247)

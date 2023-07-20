# Bold BI Dashboard Views Sample in ASP.NET Core

This project was created using ASP.NET Core 6.0. This application aims to demonstrate how to customize BoldBI dashboards with the Dashboard Views API in JavaScript embedding.

## Dashboard views in JavaScript Embedding

![DashboardViews](https://github.com/boldbi/aspnet-core-sample/assets/91586758/4af68f49-ffc0-400a-a323-55a3f3600a1d)

 ## Requirements/Prerequisites

 * [.NET Core 6.0](https://dotnet.microsoft.com/download/dotnet-core)

 #### Supported browsers
  
  * Google Chrome, Microsoft Edge, Mozilla Firefox, and Safari.

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
  
  3. Finally, run the application using the command `dotnet run`. After the application has started, it will display a URL in the `command line interface`, typically something like (e.g., https://localhost:5001). Copy this URL and paste it into your default web browser.

> **NOTE:** We represent the dashboard embedding by default without the dashboards listing sidebar. You must navigate to the `dashboardlisting` URL (such as https://localhost:5001/dashboardlisting) to enable the dashboards list.

 ## Developer IDE

  * Visual studio code(https://code.visualstudio.com/download)

  ### Run a Sample Using Visual Studio Code
 
  * Open the ASP.NET Core sample in Visual Studio Code.
   
  * Open the terminal in Visual Studio Code and execute the command `dotnet restore` to restore the required dependencies.
 
  * Build your .NET project by executing the `dotnet build` command in the terminal.
 
  * To run the application, use the command `dotnet run` in the terminal. After the application has started, it will display a URL in the `command line interface`, typically something like (e.g., https://localhost:5001). Copy this URL and paste it into your default web browser.

    ![dashboard image](https://github.com/boldbi/aspnet-core-sample/assets/91586758/4af68f49-ffc0-400a-a323-55a3f3600a1d)

> **NOTE:** We represent the dashboard embedding by default without the dashboards listing sidebar. You must navigate to the `dashboardlisting` URL (such as https://localhost:5001/dashboardlisting) to enable the dashboards list.

Please refer to the [help documentation](https://help.boldbi.com/embedding-options/embedding-sdk/samples/asp-net-core/#how-to-run-the-sample) to know how to run the sample.

## How to create your own filter view dashboard in Javascript embedding

In Javascript-based embedding, there are methods for saving, modifying, updating, retrieving and deleting filter views actions. With the help of those method, design your dashboard and bind action to your UI. So, this section explains how to create your dashboard with filter views with the necessary steps to use in your dashboard embedding.

## Steps to follow for customizing the dashboard view in JavaScript embedding

1. Once configured the embedConfig.JSON file in the designated location, then run your application.

2. Apply Filters in the dashboard to see the `Save`,`Save As` and `View Saved Filters` options enabled in Filter overview panel. To enable these options in dashboard, we need to set the below APIs as `true` in BoldBI.create().

    * dasboardSettings.filterOverviewSettings.showSaveIcon - Specifies whether to show or hide the Save icon in filter overview.
    * dasboardSettings.filterOverviewSettings.showSaveAsIcon - Specifies whether to show or hide the Save As icon in filter overview.
    * dasboardSettings.filterOverviewSettings.showViewSavedFilterIcon - Specifies whether to show or hide the View Saved Filters icon in filter overview.

    ![save-saveas-viewsavedfilters-API](https://github.com/boldbi/aspnet-core-sample/assets/92368448/1e800aa7-fbf1-41b0-a851-18ff39251db2)

    ![enable-save-saveas-viewsavedfilter-icon](https://github.com/boldbi/aspnet-core-sample/assets/92368448/fdebfae4-fd86-45ce-bab4-52fcc0907f2c)


### Save Filter Views
  1. To open the `Save View` dialog, use the `onSaveFilter` event in BoldBI.create() as follows:

      ![onsavefilter-event](https://github.com/boldbi/aspnet-core-sample/assets/92368448/35cbb4f5-7b2e-4dd1-86a8-74ced5b311b6)

  2. When the `Save` icon is clicked in the filter overview, the `onSaveFilter` event will be triggered, and a dialog box will be created using ej2 controls.

      ![save-view-dialog](https://github.com/boldbi/aspnet-core-sample/assets/92368448/22f53317-822b-45f3-b3cd-b9dbb812e79a)

  3. Retrieve the name of the view from the `Save View` dialog and save it using the `saveFilterView` method available in BoldBI.

      ![save-view-dialog-viewname](https://github.com/boldbi/aspnet-core-sample/assets/92368448/8a10abda-fffc-4ea4-9683-20c842bd067f)

      ![save-view-filter-method](https://github.com/boldbi/aspnet-core-sample/assets/92368448/7994a999-c106-404c-bb23-5333ac91402a)

  4. Filter Overview panel get updated with the saved view once it saved.

      ![updated-filter-overview-savedview](https://github.com/boldbi/aspnet-core-sample/assets/92368448/640f3b10-9364-471b-a289-afa760feac19)


### Save as Filter Views
  1. To open the `Save View` dialog, use the `onSaveAsFilter` event in BoldBI.create() as follows:

      ![onsaveasfilter-event](https://github.com/boldbi/aspnet-core-sample/assets/92368448/13873db1-76d8-4218-8f01-cd97ab213fc9)


  2. When the `Save As` icon is clicked in the filter overview, the `onSaveAsFilter` event will be triggered, and a dialog box will be created using ej2 controls.

  3. Retrieve the name of the view from the `Save As View` dialog and save it using the `saveAsFilterView` method available in BoldBI.

      ![save-as-view-dialog-viewname](https://github.com/boldbi/aspnet-core-sample/assets/92368448/d5eeae13-318b-4a2c-9d43-085e563c708e)

      ![saveas-filter-view-method](https://github.com/boldbi/aspnet-core-sample/assets/92368448/8e8d5df0-1716-45bf-a94a-1a910dd3907d)

  4. Filter Overview panel get updated with the saved view once it saved.

      ![updated-filter-overview-savedasview](https://github.com/boldbi/aspnet-core-sample/assets/92368448/e969b71d-e35b-4501-931b-f9109a452caa)


### Update Filter Views
  1. To update a saved filter view in the dashboard, you must modify the desired filter views.

  2. By clicking the `Save` icon in the filter overview, the `onSaveFilter` event will be triggered, updating the filter view using the `updateFilterView` method available in BoldBI.

### Retrieve Dashboard Views
  1. When the `View Saved Filters` icon is clicked in the filter overview, the `onViewSavedFilters` event will be triggered, displaying the saved filter views of the dashboard in the views panel.

  2. To retrieve the saved filter views from the dashboard, use the `getDashboardViewsByItemId` method as follows.

  3. Clicking on a saved filter view in the panel will display the applied filters in that view as an accordion. 
  
  4. To retrieve the filter values for the specific view, use the `getDashboardViewByViewId` method as follows.

### Delete Filter View
  1. To delete a filter view, select the `Delete` option in the Filter view and remove it using the `deleteFilterView` method in BoldBI.

### Copy Dashboard View URL
  1. To copy the dashboard view URL, choose the `Copy` option in the Filter view and use the provided URL.

### Filter View Dashboard in JavaScript embedding
  1. By clicking the name of a filter view in the view panel, the dashboard will reload with the filtered view dashboard using the following APIs (such as `viewId`, `viewName` and `filterParameters`) in BoldBI.create():

      * dashboardSettings.filterOverviewSettings.viewId - Specifies the unique ID of the filter view.
      * dashboardSettings.filterOverviewSettings.viewName - Specifies the name of the filter view.
      * filterParameters - Specifies the filter query of the specific view.

  2. Thus, we have rendered own dashboard view with multiple actions in JavaScript embedding.
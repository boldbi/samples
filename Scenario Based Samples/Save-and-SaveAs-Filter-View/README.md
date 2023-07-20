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

## How to create own filter view dashboard in Javascript embedding

In Javascript-based embedding, there are methods for saving, modifying, updating, retrieving and deleting filter views actions. With the help of those method, design your dashboard and bind action to your UI. So, this section explains how to create your dashboard with filter views with the necessary steps to use in your dashboard embedding.

>**NOTE**: Please refer the [link](https://help.boldbi.com/managing-resources/manage-dashboards/manage-dashboard-views/) for know more about the Dashboard Views.

## Steps to follow for customizing the dashboard using Views API in JavaScript embedding

1. Once configured the embedConfig.JSON file in the designated location, then run your application.

2. Applying filters in the dashboard to view the `Save`,`Save As` and `View Saved Filters` options enabled in Filter overview panel. To enable these options in dashboard, we need to set the below APIs as `true` in BoldBI.create().

    * [dasboardSettings.filterOverviewSettings.showSaveIcon]() - Specifies whether to show or hide the Save icon in filter overview.
    * [dasboardSettings.filterOverviewSettings.showSaveAsIcon]() - Specifies whether to show or hide the Save As icon in filter overview.
    * [dasboardSettings.filterOverviewSettings.showViewSavedFilterIcon]() - Specifies whether to show or hide the View Saved Filters icon in filter overview.

    ![save-saveas-viewsavedfilters-API](https://github.com/boldbi/samples/assets/92368448/af824a38-6ef2-4e62-82c3-450ccd836b89)

    ![enable-save-saveas-viewsavedfilter-icon](https://github.com/boldbi/samples/assets/92368448/40deb9e1-1a4a-4c93-99d7-4696cb23b4ad)

### Save Filter Views
  1. To open the `Save View` dialog, use the [onSaveFilter]() event in BoldBI.create() as follows:

      ![onsavefilter-event](https://github.com/boldbi/samples/assets/92368448/5609255f-1cbe-4b32-a2c2-a3650515f32e)

  2. When the `Save` icon is clicked in the filter overview, the `onSaveFilter` event will be triggered, and a dialog box will be created using ej2 controls.

      ![save-new-view-icon-click](https://github.com/boldbi/samples/assets/92368448/acb09629-b6b9-4675-a879-91c7a6cd07be)

      ![save-view-dialog](https://github.com/boldbi/samples/assets/92368448/9e5142f9-1ad9-4d7b-bb80-a4312fca7126)

  3. Retrieve the name of the view from the `Save View` dialog and save it using the [saveFilterView]() method available in BoldBI.

      ![save-view-dialog-viewname](https://github.com/boldbi/samples/assets/92368448/c570f75d-a504-44f7-b437-f9748a62a583)

      ![save-view-filter-method](https://github.com/boldbi/samples/assets/92368448/6b07b000-89f1-4953-9352-f21a16193239)

  4. Filter Overview panel get updated with the saved view once it saved.

      ![updated-filter-overview-savedview](https://github.com/boldbi/samples/assets/92368448/b6bea3b0-eea3-4184-9ce0-98dcce0227d5)

>**NOTE**: Please refer the [REST API](https://help.boldbi.com/server-api-reference/v4.0/api-reference/#operation/ItemViews_AddItemView) for know more details to save the filter view in the dashboard.

### Save as Filter Views
  1. To open the `Save View` dialog, use the [onSaveAsFilter]() event in BoldBI.create() as follows:

      ![onsaveasfilter-event](https://github.com/boldbi/samples/assets/92368448/20794174-a954-491a-baf7-d9a1fea9d762)

  2. When the `Save As` icon is clicked in the filter overview, the `onSaveAsFilter` event will be triggered, and a dialog box will be created using ej2 controls.

      ![save-as-icon-click](https://github.com/boldbi/samples/assets/92368448/87deb53f-ff4f-4319-a065-42ad453f562c)

  3. Retrieve the name of the view from the `Save As View` dialog and save it using the [saveAsFilterView]() method available in BoldBI.

      ![save-as-view-dialog-viewname](https://github.com/boldbi/samples/assets/92368448/ec907f6b-3289-4aa7-95f9-d161c3904464)

      ![saveas-filter-view-method](https://github.com/boldbi/samples/assets/92368448/ea6123be-8425-4f03-858a-18b92347eac2)

  4. Filter Overview panel get updated with the saved view once it saved.

      ![updated-filter-overview-savedasview](https://github.com/boldbi/samples/assets/92368448/7ab2009a-6bd9-40bc-9814-30ab4a9906bb)

>**NOTE**: The same method will be used to save the new filter view and save as the filter view from the existing one.

### Update Filter Views
  1. To update a saved filter view in the dashboard, you must `modify` the saved filter views by applying filters in the view.

      ![modify-filter-view](https://github.com/boldbi/samples/assets/92368448/366e9e2b-a41c-4260-aa7e-1a21b8e91e80)

  2. By clicking the `Save` icon in the filter overview, the filter view will be updated using the [updateFilterView]() method available in BoldBI.

      ![save-exist-view-icon-click](https://github.com/boldbi/samples/assets/92368448/5c480b93-f66e-47fb-aa02-ebe672ce1d9a)

>**NOTE**: Please refer the [REST API](https://help.boldbi.com/server-api-reference/v4.0/api-reference/#operation/ItemViews_UpdateItemView) for know more details to update the filter view in the dashboard.

### Retrieve Dashboard Views
  1. To open the `Views` panel with displaying the saved filter views, use the event [onViewSavedFilters]() in BoldBI.create() as follows.

      ![on-view-saved-filters-event](https://github.com/boldbi/samples/assets/92368448/0685b1a2-fa8e-418f-8047-d766817a0579)

  2. When the `View Saved Filters` option is clicked in the filter overview, the `onViewSavedFilters` event will be triggered, and opening the `views` panel with the list of saved filter views.

      ![view-saved-filters-icon-click](https://github.com/boldbi/samples/assets/92368448/b1d6e156-2aa5-4fb8-8c20-91fb1b3b574d)
      
      ![views-panel-opened](https://github.com/boldbi/samples/assets/92368448/36e56692-c1f8-4340-9f8c-8930069c9a58)

  3. To retrieve the saved filter views from the dashboard, use the [getDashboardViewsByDashboardId]() method as follows.

      ![view-saved-filters-method](https://github.com/boldbi/samples/assets/92368448/cc04249b-3309-42a7-81fe-9fc46c03f388)

      >**NOTE**: Please refer the [REST API](https://help.boldbi.com/server-api-reference/v4.0/api-reference/#operation/ItemViews_ItemViewsByItemId) for know more details to retrieve the filter views from the dashboard.

  4. Clicking on a saved filter view in the panel will display the applied filters in that view as an accordion. 

      ![filter-applied-value-in-filter-view](https://github.com/boldbi/samples/assets/92368448/bc366272-28c1-4d4c-a17b-cf063aab3437)
  
  5. To retrieve the filter values for the specific view, use the [getDashboardViewByViewId]() method as follows.

      ![get-view-tem-view-id](https://github.com/boldbi/samples/assets/92368448/5ef39954-f30e-4549-b4b6-8992809d4052)

      >**NOTE**: Please refer the [REST API](https://help.boldbi.com/server-api-reference/v4.0/api-reference/#operation/ItemViews_ItemViewByViewId) for know more details to retrieve the filter view from the specific view.

### Delete Filter View
  1. To delete a filter view, select the `Delete` option in the filter view and remove it using the [deleteFilterView]() method in BoldBI.

      ![delete-option](https://github.com/boldbi/samples/assets/92368448/e4708157-801f-4198-9cf6-28128b0ea440)

      ![delete-filter-view-method](https://github.com/boldbi/samples/assets/92368448/9996b321-7230-4c8a-930b-2c17cd8b79fd)

  >**NOTE**: Please refer the [REST API](https://help.boldbi.com/server-api-reference/v4.0/api-reference/#operation/ItemViews_ItemViewDelete) for know more details to delete the filter view from the dashboard.

### Copy Dashboard View URL
  1. To copy the dashboard view URL, choose the `Copy` option in the Filter view and use the provided URL.

      ![copy-view-url-option](https://github.com/boldbi/samples/assets/92368448/104bf820-0373-4a9b-bca9-aa84a759f936)

### Filter View Dashboard in JavaScript embedding
  1. By clicking the name of a filter view in the view panel, the dashboard will be loaded with the filter view using the below APIs (such as `viewId`, `viewName` and `filterParameters`) in BoldBI.create() as below.

      ![filter-view-select](https://github.com/boldbi/samples/assets/92368448/5adb8502-fcc9-4328-8069-28575035deaf)

      * [dashboardSettings.filterOverviewSettings.viewId]() - Specifies the unique ID of the filter view.
      * [dashboardSettings.filterOverviewSettings.viewName]() - Specifies the name of the filter view.
      * [filterParameters]() - Specifies the filter query of the specific view.

      ![viewid-viewname-boldbi-create](https://github.com/boldbi/samples/assets/92368448/a4239821-0f5c-429b-9daa-954a739d1603)

  2. Thus, we have rendered own dashboard view in JavaScript embedding.

      ![view-dashboard-rendering](https://github.com/boldbi/samples/assets/92368448/7a1308bf-dc2f-4520-8344-99fd7aa42eab)      
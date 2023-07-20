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

2. Enable the `Save`, `Save As`, and `View Saved Filters` options in the Filter Overview panel of the dashboard. To do this, set the following API to `true` in BoldBI create method:

    <table style="width: 60%; float: left;">
    <thead>
    <tr>
    <th style="width: 20%;">API</th>
    <th style="width: 40%;">Description</th>
    </tr>
    </thead>
    <tr>
    <td><a href="">showSaveIcon</a></td>
    <td>Specifies whether to show or hide the Save icon in filter overview.</td>
    </tr>
    <tr>
    <td><a href="">showSaveAsIcon</a></td>
    <td>Specifies whether to show or hide the Save As icon in filter overview.</td>
    </tr>
    <tr>
    <td><a href="">showViewSavedFilterIcon</a></td>
    <td>Specifies whether to show or hide the View Saved Filters icon in filter overview.</td>
    </tr>
    </table>

    ![save-saveas-viewsavedfilters-API](https://github.com/boldbi/samples/assets/92368448/af824a38-6ef2-4e62-82c3-450ccd836b89)

    ![enable-save-saveas-viewsavedfilter-icon](https://github.com/boldbi/samples/assets/92368448/40deb9e1-1a4a-4c93-99d7-4696cb23b4ad)

### Save Filter Views
  1. To open the `Save View` dialog, use the [onSaveFilter]() event in BoldBI create method as follows:

      ![onsavefilter-event](https://github.com/boldbi/samples/assets/92368448/5609255f-1cbe-4b32-a2c2-a3650515f32e)

  2. When the `Save` icon is clicked in the filter overview, the `onSaveFilter` event will be triggered, and a dialog box will be created using ej2 controls.

      ![save-new-view-icon-click](https://github.com/boldbi/samples/assets/92368448/acb09629-b6b9-4675-a879-91c7a6cd07be)

      ![save-view-dialog](https://github.com/boldbi/samples/assets/92368448/9e5142f9-1ad9-4d7b-bb80-a4312fca7126)

  3. Retrieve the name of the view from the `Save View` dialog and save it using the [saveFilterView]() method available in BoldBI.

      ![save-view-dialog-viewname](https://github.com/boldbi/samples/assets/92368448/c570f75d-a504-44f7-b437-f9748a62a583)

      ![save-view-filter-method](https://github.com/boldbi/samples/assets/92368448/6b07b000-89f1-4953-9352-f21a16193239)

  4. The `Filter Overview` panel will get updated with the saved view.

      ![updated-filter-overview-savedview](https://github.com/boldbi/samples/assets/92368448/b6bea3b0-eea3-4184-9ce0-98dcce0227d5)

>**NOTE**: Please refer the [REST API](https://help.boldbi.com/server-api-reference/v4.0/api-reference/#operation/ItemViews_AddItemView) for know more details to save the filter view in the dashboard.

### Save as Filter Views
  1. To open the `Save View` dialog, use the [onSaveAsFilter]() event in BoldBI create method as follows:

      ![onsaveasfilter-event](https://github.com/boldbi/samples/assets/92368448/20794174-a954-491a-baf7-d9a1fea9d762)

  2. When the `Save As` icon is clicked in the filter overview, the `onSaveAsFilter` event will be triggered, and a dialog box will be created using ej2 controls.

      ![save-as-icon-click](https://github.com/boldbi/samples/assets/92368448/87deb53f-ff4f-4319-a065-42ad453f562c)

  3. Retrieve the name of the view from the `Save View` dialog and save it using the [saveAsFilterView]() method available in BoldBI.

      ![save-as-view-dialog-viewname](https://github.com/boldbi/samples/assets/92368448/ec907f6b-3289-4aa7-95f9-d161c3904464)

      ![saveas-filter-view-method](https://github.com/boldbi/samples/assets/92368448/ea6123be-8425-4f03-858a-18b92347eac2)

  4. The `Filter Overview` panel will get updated with the saved view.

      ![updated-filter-overview-savedasview](https://github.com/boldbi/samples/assets/92368448/7ab2009a-6bd9-40bc-9814-30ab4a9906bb)

>**NOTE**: The same method will be used to save a new filter view and save as the filter view from an existing one.

### Update Filter Views
  1. To update a saved filter view in the dashboard, `modify` the saved filter views by applying filters in the view.

      ![modify-filter-view](https://github.com/boldbi/samples/assets/92368448/4b43cc57-201b-426a-b9eb-b0d145bd2ac4)

  2. By clicking the `Save` icon in the filter overview, the filter view will be updated using the [updateFilterView]() method available in BoldBI.

      ![save-exist-view-icon-click](https://github.com/boldbi/samples/assets/92368448/89dc5363-d3ca-4987-acef-473a817d703c)

>**NOTE**: Please refer the [REST API](https://help.boldbi.com/server-api-reference/v4.0/api-reference/#operation/ItemViews_UpdateItemView) for know more details to update the filter view in the dashboard.

### Retrieve Dashboard Views
  1. To open the `Views` panel displaying the saved filter views, use the [onViewSavedFilters]() event in BoldBI create method as follows.

      ![on-view-saved-filters-event](https://github.com/boldbi/samples/assets/92368448/0685b1a2-fa8e-418f-8047-d766817a0579)

  2. When the `View Saved Filters` option is clicked in the filter overview, the `onViewSavedFilters` event will be triggered, opening the `views` panel with the list of saved filter views.

      ![view-saved-filters-icon-click](https://github.com/boldbi/samples/assets/92368448/1c4ad35a-d428-40f7-9ac6-57817811a10d)
      
      ![views-panel-opened](https://github.com/boldbi/samples/assets/92368448/e96b4218-6e65-4ca9-889f-cc8a03c26d1b)

  3. To retrieve the saved filter views from the dashboard, use the [getDashboardViewsByDashboardId]() method as follows.

      ![view-saved-filters-method](https://github.com/boldbi/samples/assets/92368448/cc04249b-3309-42a7-81fe-9fc46c03f388)

      >**NOTE**: Please refer the [REST API](https://help.boldbi.com/server-api-reference/v4.0/api-reference/#operation/ItemViews_ItemViewsByItemId) for know more details to retrieve the filter views from the dashboard.

  4. Clicking on a saved filter view in the panel will display the applied filters in that view as an accordion. 

      ![filter-applied-value-in-filter-view](https://github.com/boldbi/samples/assets/92368448/826605e4-457e-4bad-bec7-ff56054846d6)
  
  5. To retrieve the filter values for the specific view, use the [getDashboardViewByViewId]() method as follows.

      ![get-view-tem-view-id](https://github.com/boldbi/samples/assets/92368448/5ef39954-f30e-4549-b4b6-8992809d4052)

      >**NOTE**: Please refer the [REST API](https://help.boldbi.com/server-api-reference/v4.0/api-reference/#operation/ItemViews_ItemViewByViewId) for know more details to retrieve the filter view from the specific view.

### Delete Filter View
  1. To delete a filter view, select the `Delete` option in the filter view and remove it using the [deleteFilterView]() method in BoldBI.

      ![delete-option](https://github.com/boldbi/samples/assets/92368448/e0246042-9358-40fb-b240-5b6cbfc23a17)

      ![delete-filter-view-method](https://github.com/boldbi/samples/assets/92368448/9996b321-7230-4c8a-930b-2c17cd8b79fd)

  >**NOTE**: Please refer the [REST API](https://help.boldbi.com/server-api-reference/v4.0/api-reference/#operation/ItemViews_ItemViewDelete) for know more details to delete the filter view from the dashboard.

### Copy Dashboard View URL
  1. To copy the dashboard view URL, choose the `Copy` option in the Filter view and use the provided URL.

      ![copy-view-url-option](https://github.com/boldbi/samples/assets/92368448/e64fb0ad-dae8-48dd-886a-bd8703810afc)

### Filter View Dashboard in JavaScript embedding
  1. By clicking the name of a filter view in the view panel, the dashboard will be loaded with the filter view using the below APIs in BoldBI create method as below.

      ![filter-view-select](https://github.com/boldbi/samples/assets/92368448/c64a5650-c30b-46de-8dc6-c45b8aa118a5)

      <table style="width: 60%; float: left;">
        <thead>
        <tr>
        <th style="width: 20%;">API</th>
        <th style="width: 40%;">Description</th>
        </tr>
        </thead>
        <tr>
        <td><a href="">viewId</a></td>
        <td>Specifies the unique ID of the filter view.</td>
        </tr>
        <tr>
        <td><a href="">viewName</a></td>
        <td>Specifies the name of the filter view.</td>
        </tr>
        <tr>
        <td><a href="">filterParameters</a></td>
        <td>Specifies the filter query of the specific view.</td>
        </tr>
        </table>

      ![viewid-viewname-boldbi-create](https://github.com/boldbi/samples/assets/92368448/a4239821-0f5c-429b-9daa-954a739d1603)

  2. Thus, we have created own custom filter view dashboard view using JavaScript embedding.

      ![view-dashboard-rendering](https://github.com/boldbi/samples/assets/92368448/f4c334f9-7fb2-44b7-9636-66a96b0624e0)

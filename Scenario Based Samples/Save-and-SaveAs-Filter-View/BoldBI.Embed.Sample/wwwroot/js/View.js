// Initialize variables
var embedContainerId = 'dashboard';
var dbrdInstance = {};
var itemId = '';
var dashboardContainerId = '';
var dashboardContainer = '';

// Callback method for onViewSavedFilters event triggers
function getDashboardViews() {
    // Getting Dashboard Instance
    dbrdInstance = BoldBI.getInstance(embedContainerId);

    // Getting current Item ID based on multi-tab or single dashboard
    itemId = dbrdInstance.isMultiTab ? dbrdInstance._getActiveChildDashboardId() : dbrdInstance.embedOptions.dashboardId;

    // Getting current embedded dashboard container Id
    dashboardContainerId = (dbrdInstance.isMultiTab ? '#multi_' + itemId.replaceAll('-', '') : '#' + embedContainerId) + '_embeddedbi';

    // Getting current dashboard designer container id
    dashboardContainer = dashboardContainerId + '_designerContainer';

    // Getting Dashboard Views from Embed API
    dbrdInstance.getViewsByDashboardId(itemId, function (viewInfos) {
        // Creating Views Panel in the right side
        const viewListPanel = bbEmbed('<div class="view-list-column"></div>').css('display', 'block');

        if (bbEmbed('.view-list-column').is(':visible')) {
            // If the views panel already exists, we will remove it.
            _removeViewsPanel();
        }
        else {
            // Otherwise, we will remove and create the views panel on the right side.
            bbEmbed(dashboardContainer).addClass('dashboard-resize');
            bbEmbed('.view-list-column').remove();
            dbrdInstance.resizeDashboard();
            bbEmbed(dashboardContainerId).append(viewListPanel);
            _createViewsPanel(viewListPanel, viewInfos);
        }
    });

    // Triggers whenever we navigate to other dashboard in multitab and it will remove the views panel.
    bbEmbed('.e-toolbar-items').on('click', _removeViewsPanel);
}

// Function to create the Views Panel DOM element.
function _createViewsPanel(viewsPanel, views) {
    // Create view-panel-header section
    var viewPanelHeader = bbEmbed('<div id="view-panel-header"></div>');
    var viewPanelHeaderName = bbEmbed('<div id="view-panel-header-name">VIEWS</div>');
    var viewPanelClose = bbEmbed('<div id="view-panel-close"></div>');
    var closeButton = bbEmbed('<span class="su su-close"></span>');

    viewPanelClose.append(closeButton);
    viewPanelHeader.append(viewPanelHeaderName, viewPanelClose);

    // Create no-filter-views section
    var noFilterViews = bbEmbed('<div id="no-filter-views"><label>No views found.</label></div>');

    // Create saved-filter-view-list section
    var savedViewList = bbEmbed('<div id="saved-filter-view-list"></div>');

    viewsPanel.append(viewPanelHeader, noFilterViews, savedViewList);

    if (views) {
        // If the dashboard has saved views, list them in the views panel.
        bbEmbed('#saved-filter-view-list').css('display', 'block');
        bbEmbed('#no-filter-views').css('display', 'none');
        views.reverse().forEach((view) => {
            _listViewsInViewPanel(view);
        });
    }
    else {
        // Otherwise, show 'No views found.'
        bbEmbed('#saved-filter-view-list').css('display', 'none');
        bbEmbed('#no-filter-views').css('display', 'block');
    }

    // Create an event handler for views panel close.
    viewPanelClose.on('click', _removeViewsPanel);
}

// Function to list the saved views in the views panel.
function _listViewsInViewPanel(viewInfo) {
    const savedViewList = bbEmbed('#saved-filter-view-list');

    // Create the view list item
    const listView = bbEmbed('<li class="view-list"></li>').attr('viewid', viewInfo.ViewId).on('click', () => _showSavedViewParameters(listView));
    const viewLabel = bbEmbed('<label class="saved-view-label"></label>').attr({
        viewid: viewInfo.ViewId,
        itemid: viewInfo.ItemId,
        filterquery: viewInfo.QueryString
    });
    const viewLabelLink = bbEmbed('<a class="saved-view-link"></a>').attr('title', viewInfo.ViewName).text(viewInfo.ViewName).on('click', () => _renderViewDashboard(viewLabelLink));

    viewLabel.append(viewLabelLink);
    listView.append(viewLabel);

    // Create the delete view option in the view list
    const viewOptions = bbEmbed('<div class="saved-filter-view-options"></div>');
    const deleteViewOptionDiv = bbEmbed('<div class="delete-view" title="Delete"></div>').append('<span class="su su-delete"></span').on('click', () => _deleteView(deleteViewOptionDiv)).attr({
        viewid: viewInfo.ViewId,
        itemid: viewInfo.ItemId,
        viewname: viewInfo.ViewName
    });

    viewOptions.append(deleteViewOptionDiv);
    listView.append(viewOptions);
    savedViewList.prepend(listView);
}

// Function to remove the views panel
function _removeViewsPanel() {
    bbEmbed(dashboardContainer).removeClass('dashboard-resize');
    bbEmbed('.view-list-column').remove();
    dbrdInstance.resizeDashboard();
}

// Triggers when we click a view in the views panel for displaying the saved view parameters
function _showSavedViewParameters(targetElement) {
    // Extract the viewId from the clicked element's attribute
    const viewId = bbEmbed(targetElement).attr('viewid');

    // Remove the 'active-view-list' class from all view-list elements
    bbEmbed('.view-list').removeClass('active-view-list');

    // Remove any existing applied filters
    bbEmbed('.applied-filters').remove();

    // Add the 'active-view-list' class to the clicked view element
    bbEmbed(targetElement).addClass('active-view-list');

    // Fetch view information by viewId and display its parameters
    dbrdInstance.getViewByViewId(viewId, (viewInfo) => {
        // Extract query parameters from the view's query string
        const queryParameters = dbrdInstance._getParametersFromQueryString(viewInfo.QueryString);

        // Create and display the DOM elements for the saved view parameters
        _createSavedViewParametersDOM(queryParameters);
    });
}

// For creating DOM for saved view parameters.
function _createSavedViewParametersDOM(queryParameters) {
    // Iterate through query parameters and display them below the saved view list
    queryParameters.forEach((parameter) => {
        // Get the active view-list element
        const activeListElement = bbEmbed('.active-view-list').first();

        // Create an element to hold applied filters and append it to the active view
        const appliedFilters = bbEmbed('<div>').addClass('applied-filters').appendTo(activeListElement);

        // Create and append labels for parameter name and values
        bbEmbed('<label>').addClass('applied-column-name').text(parameter.name).appendTo(appliedFilters);
        bbEmbed('<br>').appendTo(appliedFilters);

        // Iterate through parameter values and append them
        for (let x = 0; x < parameter.values.length; x++) {
            bbEmbed('<label>').addClass('applied-column-value').text(parameter.values[`${x}`]).appendTo(appliedFilters);
            bbEmbed('<br>').appendTo(appliedFilters);
        }
    });
}

// Triggers when we click the saved view link in the saved view for rendering the view dashboard
function _renderViewDashboard(targetElement) {
    // Destroy the existing dashboard instance
    dbrdInstance.destroy();

    // Configure the viewid, viewname, and filterparameters embed option
    dbrdInstance.embedOptions.viewId = bbEmbed(targetElement).parent().attr('viewId');
    //dbrdInstance.embedOptions.viewName = bbEmbed(targetElement).text();
    //dbrdInstance.embedOptions.filterParameters = bbEmbed(targetElement).parent().attr('filterquery');

    // Create and load a new BoldBI dashboard
    const dashboard = BoldBI.create(dbrdInstance.embedOptions);
    dashboard.loadView();
}

// Triggers when we click delete option in the saved view for deleting the view
function _deleteView(targetElement) {
    // Extract the viewId from the clicked element's attribute
    const viewId = bbEmbed(targetElement).attr('viewId');

    // Delete the view using the Embed API
    dbrdInstance.deleteFilterView(viewId, () => {
        // Get a list of filter views in the saved-filter-view-list
        const filterViewList = bbEmbed('#saved-filter-view-list li');

        // Remove the respective view from the list in the views panel
        filterViewList.each(function () {
            if (bbEmbed(this).attr('viewid') == viewId) {
                bbEmbed(this).remove();
                return false; // Exit the loop after removing the element
            }
        });

        // If no views remain in the views panel, show 'No views found'
        if (bbEmbed('#saved-filter-view-list li').length === 0) {
            bbEmbed('#saved-filter-view-list').hide();
            bbEmbed('#no-filter-views').show();
        }

        // Reload the dashboard if the deleted view was configured in the dashboard
        const designerInstance = bbEmbed(`${dashboardContainerId}`).data('BoldBIDashboardDesigner');
        if (designerInstance.model.filterOverviewSettings.viewId == viewId) {
            location.reload();
        }
    });
}

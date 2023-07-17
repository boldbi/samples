var isMultiTabDashboard = false;
var activeChild = 0;

// This function is responsible for displaying the dashboard views in view panel by view Informations.
function getDashboardViews(viewInfos, isMultiTab) {
    // Check if the element with the class "view-list-column" is visible
    if ($(".view-list-column").is(":visible")) {
        closeViewPanel(isMultiTab.toString());
    } else {
        // Remove existing view-list-column element
        $(".view-list-column").remove();

        // Create a new view-list-column element
        var viewListPanel = $('<div class="view-list-column"></div>');

        // Set the display property to block
        viewListPanel.css("display", "block");
        var dbrdInstance = BoldBI.getInstance("dashboard");

        // Determine whether it's a multi-tab dashboard or not
        if (dbrdInstance.isMultiTab) {
            isMultiTabDashboard = true;
            $("#multi_" + childDashboardId.replaceAll("-", "") + "_embeddedbi_designerContainer").addClass("dashboard-resize");
            $("#multi_" + childDashboardId.replaceAll("-", "") + "_embeddedbi").append(viewListPanel);
        } else {
            isMultiTabDashboard = false;
            $("#dashboard_embeddedbi_designerContainer").addClass("dashboard-resize");
            $("#dashboard_embeddedbi").append(viewListPanel);
        }

        // Resize the dashboard
        dbrdInstance.resizeDashboard();

        // Create view panel header elements
        var viewPanelHeaderDiv = $('<div id="view-panel-header"></div>');
        $(".view-list-column").append(viewPanelHeaderDiv);
        var viewPanelHeader = $('<div id="view-panel-header-name">VIEWS</div>');
        viewPanelHeaderDiv.append(viewPanelHeader);
        var viewPanelClose = $('<div onclick="closeViewPanel(\'' + isMultiTabDashboard + '\')" id="view-panel-close"><span class="su su-close"></span></div>');
        viewPanelHeaderDiv.append(viewPanelClose);

        // Create elements for no-filter-views and saved-filter-view-list
        var noFilterViews = $('<div id="no-filter-views"><label>No views found.</label></div>');
        $(".view-list-column").append(noFilterViews);
        var savedViewList = $('<div id="saved-filter-view-list"></div>');
        $(".view-list-column").append(savedViewList);

        // Check if viewInfos is defined
        if (viewInfos != undefined) {
            $("#saved-filter-view-list").css("display", "block");
            $("#no-filter-views").css("display", "none");
            for (var x = viewInfos.length - 1; x >= 0; x--) {
                listViewsInViewPanel(viewInfos[x]);
            }
        } else {
            $("#saved-filter-view-list").css("display", "none");
            $("#no-filter-views").css("display", "block");
        }
    }
}

// This function is responsible for adding a view list to the view panel.
function listViewsInViewPanel(viewInfo) {
    // Get the reference to the saved view list element
    var savedViewList = document.getElementById("saved-filter-view-list");

    // Create a list item element
    var listView = document.createElement("li");
    listView.className = "view-list";
    listView.setAttribute("viewid", viewInfo.ViewId);

    // Create the view options container
    var viewOptions = document.createElement("div");
    viewOptions.className = "saved-filter-view-options";

    // Create the delete view option
    var deleteViewOption = createViewOption("su su-delete", "Delete", 'deleteView(\'' + viewInfo.ViewId + '\')', viewInfo);
    viewOptions.append(deleteViewOption);

    // Create the copy view option
    var copyViewOption = createViewOption("su su-link", "Click to copy", 'copyViewURL(\'' + viewInfo.ViewId + '\')', viewInfo);
    viewOptions.append(copyViewOption);

    // Append the view options container to the list item
    listView.append(viewOptions);

    // Create the view label element
    var viewLabel = document.createElement("label");
    viewLabel.className = "saved-view-label";
    viewLabel.setAttribute("viewid", viewInfo.ViewId);
    viewLabel.setAttribute("itemid", viewInfo.ItemId);
    viewLabel.setAttribute("filterquery", viewInfo.QueryString);

    // Create the view label link
    var viewLabelLink = document.createElement("a");
    viewLabelLink.className = "saved-view-link";
    viewLabelLink.innerText = viewInfo.ViewName;
    viewLabelLink.setAttribute("title", viewInfo.ViewName);

    // Append the view label link to the view label
    viewLabel.append(viewLabelLink);

    // Append the view label to the list item
    listView.append(viewLabel);

    // Append the list item to the saved view list
    savedViewList.insertBefore(listView, savedViewList.firstChild);
}

// Helper function to create a view option element.
function createViewOption(className, title, onclick, viewInfo) {
    var viewOption = document.createElement("span");
    viewOption.className = "view-options " + className;
    viewOption.setAttribute("viewid", viewInfo.ViewId);
    viewOption.setAttribute("itemid", viewInfo.ItemId);
    viewOption.setAttribute("viewname", viewInfo.ViewName);
    viewOption.setAttribute("title", title);
    viewOption.setAttribute("onclick", onclick);
    return viewOption;
}


// This function generates a view URL based on the provided viewId and copies it to the clipboard.
function copyViewURL(viewId) {
    // Construct the view URL
    var viewURL = `${rootUrl}/${siteIdentifier}/dashboards/${currentDashboardId}/${currentDashboardPath}?viewid=${viewId}${isMultiTabDashboard ? "&tab=" + childDashboardName : ""}`;

    // Copy the view URL to the clipboard
    navigator.clipboard.writeText(viewURL);

    // Display a success message
    alert("View URL copied successfully");
}


// This function is responsible for closing the view panel by removing the view-list-column element.
function closeViewPanel(isMultitab) {
    // Remove the resize class of dashboard element.
    var dashboardContainerId = isMultitab == "true" ? "#multi_" + childDashboardId.replaceAll("-", "") + "_embeddedbi_designerContainer" : "#dashboard_embeddedbi_designerContainer";
    $(dashboardContainerId).removeClass("dashboard-resize");

    $(".view-list-column").remove();

    // Resize the dashboard
    var instance = BoldBI.getInstance("dashboard");
    instance.resizeDashboard();
}


// This method is responsible for deleting a view with the specified viewId.
function deleteView(viewId) {
    var instance = BoldBI.getInstance("dashboard");
    instance.deleteFilterView(viewId, "removeFilterView");
}

// This method is responsible for removing a filter view with the specified viewId from the View panel.
function removeFilterView(viewId) {
    var filterViewList = $('#saved-filter-view-list li');

    // Iterates through the list items and removes the item that matches the given viewId.
    for (var x = 0; x < filterViewList.length; x++) {
        if (filterViewList[x].getAttribute('viewid') == viewId) {
            filterViewList[x].remove();
            break; // Exit loop after removing the element
        }
    }

    // If there are no more filter views, it hides the list items and shows the "No views found".
    if ($('#saved-filter-view-list li').length === 0) {
        $("#saved-filter-view-list").hide();
        $("#no-filter-views").show();
    }
    var embedInstance = BoldBI.getInstance("dashboard");
    var dashboardInstance = isMultiTabDashboard ? bbEmbed('#multi_' + childDashboardId.replaceAll("-", "") + '_embeddedbi').data('BoldBIDashboardDesigner') : bbEmbed('#' + this.embedOptions.embedContainerId + '_embeddedbi').data('BoldBIDashboardDesigner');
    if (dashboardInstance.model.filterOverviewSettings.viewId == viewId) {
        location.reload();
    }
}


// Updates the dashboard views in view panel based on the provided view information.
function updateDashboardViews(viewInfo) {
    var viewListColumn = $(".view-list-column");

    // If the view list column is visible, performs additional actions.
    if (viewListColumn.is(":visible")) {
        var noFilterViews = $("#no-filter-views");

        // If the "no-filter-views" element is visible, hides it and shows the "saved-filter-view-list" element.
        if (noFilterViews.is(":visible")) {
            $("#saved-filter-view-list").show();
            noFilterViews.hide();
        }
        listViewsInViewPanel(viewInfo);
    }
    var instance = BoldBI.getInstance("dashboard");
    instance.updateFilterOverview(viewInfo);
    alert("View has been added successfully.");
}

// This event handler is triggered when elements with the class "e-toolbar-items" (header tab of multitab dashboard) are clicked.
$(document).on("click", ".e-toolbar-items", function () {
    var toolbarItems = $(".e-toolbar-item");

    //Iterates through elements with the class "e-toolbar-item" to find the active child.
    for (var x = 0; x < toolbarItems.length; x++) {
        if ($(toolbarItems[x]).hasClass("e-active")) {
            activeChild = x;
            break; // Exit loop if active child is found
        }
    }
    var instance = BoldBI.getInstance("dashboard");
    if (instance.isMultiTab && dashboard) {
        childDashboardId = Object.entries(dashboard.dashboardDetails)[activeChild][1].ItemDetail.Id;
        childDashboardName = Object.entries(dashboard.dashboardDetails)[activeChild][1].ItemDetail.Name;
    }
    // If the view panel is visible, closes the view panel.
    if ($(".view-list-column").is(":visible")) {
        closeViewPanel(isMultiTabDashboard.toString());
    }
});

$(document).on("click", ".saved-view-link", function () {
    var viewInfo = {
        "viewId": $(this.parentElement).attr("viewId"),
        "viewName": $(this).text(),
        "queryString": $(this.parentElement).attr("filterquery")
    }
    var instance = BoldBI.getInstance("dashboard");
    instance.destroy();
    renderDashboard(currentDashboardId, viewInfo);
});

$(document).on("click", ".view-list", function () {
    $(".view-list").removeClass("active-view-list");
    $(".applied-filters").remove();
    $(this).addClass("active-view-list");
    var viewId = $(this).attr("viewid");
    var instance = BoldBI.getInstance("dashboard");
    instance.getViewItemByViewId(viewId, "updateViewItem");
});

function updateViewItem(viewInfo) {
    var filterQueryArray = JSON.parse(decodeURIComponent(viewInfo.QueryString).split("filterQuery=")[1]);
    var filterQueryArrayLength = filterQueryArray.length;
    for (var x = 0; x < filterQueryArrayLength; x++) {
        var columnName = filterQueryArray[x].cn;
        if (!filterQueryArray[x].dimfi.c.toLowerCase().includes("include")) {
            columnName = columnName + " (" + filterQueryArray[x].dimfi.c + ")";
        }
        if (filterQueryArray[x].dimfi) {
            var columnValueArray = filterQueryArray[x].dimfi.t;
        } else {
            var columnValueArray = filterQueryArray[x].idf.dfl;
        }
        createAppliedFiltersElement(columnName, columnValueArray);
    }
}

function createAppliedFiltersElement(name, values) {
    var activeListElement = document.getElementsByClassName("active-view-list");
    activeListElement = $(activeListElement)[0];
    // Create the view options container
    var appliedFilters = document.createElement("div");
    appliedFilters.className = "applied-filters";
    activeListElement.append(appliedFilters);

    // Create the view label element
    var appliedFilterName = document.createElement("label");
    appliedFilterName.className = "applied-column-name";
    appliedFilterName.innerText = name;
    appliedFilters.append(appliedFilterName);

    var nameBreak = document.createElement("br");
    appliedFilters.append(nameBreak);

    for (var x = 0; x < values.length; x++) {
        var appliedFilterValues = document.createElement("label");
        appliedFilterValues.className = "applied-column-value";
        appliedFilterValues.innerText = values[x];
        appliedFilters.append(appliedFilterValues);
        var valueBreak = document.createElement("br");
        appliedFilters.append(valueBreak);
    }
}
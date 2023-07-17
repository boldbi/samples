var queryData = {};
var currentDashboardId = "1fcc4fff-2329-46db-9373-6d04bdb0651b";
//var currentDashboardId = "f620e3a7-ef8f-4d8e-b5c5-196f01e0721b"; /*multitab dashboard*/
var currentDashboardPath = "";
var childDashboardId = "";
var childDashboardName = "";

function Init(dashboardId) {
    currentDashboardId = dashboardId;
    renderDashboard(currentDashboardId);
}

function getDashboardPath() {
    var http = new XMLHttpRequest();
    http.open("GET", getDashboardsUrl, true);
    http.responseType = 'json';
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            retrievePathByDashboardList.call(this, typeof http.response == "object" ? http.response : JSON.parse(http.response));
        }
        else if (http.readyState == 4 && http.status == 404) {
            console.log("Server not found");
        }
        else if (http.readyState == 4) {
            console.log(http.statusText);
        }
    };
    http.send();
};

function retrievePathByDashboardList(data) {
    if (typeof (data) != "undefined" && data != null) {
        data.forEach(function (element) {
            if (element.Id == this.currentDashboardId) {
                this.currentDashboardPath = element.CategoryName + "/" + element.Name;
            }
        });
    }
}

function renderDashboard(dashboardId, viewInfo) {
    currentDashboardId = dashboardId;
    getDashboardPath();
    this.dashboard = BoldBI.create({
        serverUrl: rootUrl + "/" + siteIdentifier,
        dashboardId: currentDashboardId,
        embedContainerId: "dashboard",
        mode: BoldBI.Mode.View,
        embedType: BoldBI.EmbedType.Component,
        environment: BoldBI.Environment.Enterprise,
        width: "100%",
        height: "100%",
        expirationTime: 10000,
        authorizationServer: {
            url: authorizationServerUrl
        },
        dashboardSettings: {
            filterOverviewSettings: {
                viewId: viewInfo ? viewInfo.viewId : '',
                viewName: viewInfo ? viewInfo.viewName : null,
                showSaveIcon: true,
                showSaveAsIcon: true,
                showViewSavedFilterIcon: true
            },
            onSaveFilter: function (args) {
                console.log(args);
                queryData = args.data;
                childDashboardId = args.model.itemId,
                    saveViewFilter(args);
            },
            onSaveAsFilter: function (args) {
                console.log(args);
                queryData = args.data;
                saveAsViewFilter(args);
            },
            onViewSavedFilters: function (args) {
                console.log(args);
                openViewPanel(currentDashboardId);
            },
            beforeIconRender: function (args) {
                var icon = $("<div/>", {
                    "class": "server-banner-icon e-dashboard-banner-icon bbi-dbrd-designer-hoverable su su-view e-icon-dbrd-theme",
                    "data-tooltip": "Views",
                    "data-name": "dashboardviews",
                    "data-event": true,
                    "onclick": "openViewPanel(\'" + currentDashboardId + "\')",
                    css: { "font-size": "18px" }
                });
                args.iconsinformation[0].items.push(icon);
            }
        },
        actionBegin: "renderActionBegin",
        filterParameters: viewInfo ? viewInfo.queryString : ""
    });
    console.log(this.dashboard);
    this.dashboard.loadDashboard();
};

function renderActionBegin(args) {
    if (args.eventType == "renderDashboard") {
        $("#dashboard").css("border-right", "1px solid rgb(200, 200, 200)");
    }
}
// This function is responsible for creating save view dialog box.
function saveViewFilter(args) {
    cancelView();
    if (args && args.viewId) {
        // Update the filter view with the provided information
        var instance = BoldBI.getInstance("dashboard");
        if (instance.isMultiTab && this.dashboard) {
            childDashboardId = Object.entries(this.dashboard.dashboardDetails)[activeChild][0];
            childDashboardName = Object.entries(this.dashboard.dashboardDetails)[activeChild][1].ItemDetail.Name;
        }
        var itemId = instance.isMultiTab ? childDashboardId : currentDashboardId;
        var viewInformations = {
            ViewId: args.viewId,
            DashboardId: itemId,
            QueryString: this.queryData.encryptedData,
        };
        var instance = BoldBI.getInstance("dashboard");
        instance.updateFilterView(viewInformations);
    } else {
        createSaveViewDialog();
    }
}

function saveAsViewFilter(args) {
    createSaveViewDialog(args.viewId);
}

// This function is responsible for saving the filter view by BoldBI instance.
function saveView(viewId) {
    var viewName = $("#view-name-textbox-input").val();
    var itemId = currentDashboardId;
    var viewInformations = {
        ViewName: viewName,
        ItemId: itemId,
        QueryString: this.queryData.encryptedData,
        ChildItemId: childDashboardId
    };
    cancelView();
    var instance = BoldBI.getInstance("dashboard");
    if (viewId == "undefined") {
        instance.saveFilterView(viewInformations, "updateDashboardViews");
    } else {
        instance.saveAsFilterView(viewInformations, "updateDashboardViews");
    }
}

// This function is responsible for cancelling the save View dialog box.
function cancelView() {
    $('body').find('#save-view-dialog-div').remove();
}

// This function is responsible for opening the view panel for a specified dashboard.
function openViewPanel(dashboardId) {
    var instance = BoldBI.getInstance("dashboard");
    if (instance.isMultiTab && this.dashboard && activeChild < 1) {
        childDashboardId = Object.entries(this.dashboard.dashboardDetails)[activeChild][1].ItemDetail.Id;
        childDashboardName = Object.entries(this.dashboard.dashboardDetails)[activeChild][1].ItemDetail.Name;
    }
    var itemId = instance.isMultiTab ? childDashboardId : currentDashboardId;
    instance.getViewItemsByDashboardId(itemId, "getDashboardViews");
}

function createSaveViewDialog(viewId) {
    // Create a new dialog box for saving views
    var saveViewDialogDiv = $('<div id="save-view-dialog-div"></div>').appendTo('body');

    var saveViewDialog = $('<div id="save-view-dialog"></div>');
    saveViewDialogDiv.append(saveViewDialog);

    var saveViewHeader = '<div id="save-view-header-div">' +
        '<i class="fa fa-glasses"></i>' +
        '<div id="save-view-label">Save View</div>' +
        '</div>';

    var saveViewContent = '<div id="save-view-content-div">' +
        '<div id="view-name-div" class="view-row">' +
        '<div id="view-name-label" class="label-view">Name*</div>' +
        '<div id="view-name-textbox" class="input-view">' +
        '<input type="text" id="view-name-textbox-input">' +
        '<span id="view-name-error-msg"></span>' +
        '</div>' +
        '</div>' +
        '</div>';

    var saveViewFooterDiv = $('<div id="save-view-footer-div">' +
        '<button id="cancel-view-button" class="footer-button-class" onclick="cancelView()">Cancel</button>' +
        '<button id="save-view-button" class="footer-button-class" onclick="saveView(\'' + viewId + '\')">Save</button>' +
        '</div>');
    saveViewDialog.append(saveViewFooterDiv);

    var saveViewDialogModel = new window.ejs.popups.Dialog({
        header: saveViewHeader,
        width: "600px",
        isModal: true,
        showCloseIcon: true,
        target: saveViewDialogDiv[0],
        content: saveViewContent
    });

    // Append the dialog box to the element with the id "save-view-dialog"
    saveViewDialogModel.appendTo('#save-view-dialog');
}

function DashboardListing() {
    var http = new XMLHttpRequest();
    http.open("GET", getDashboardsUrl, true);
    http.responseType = 'json';
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            getDashboardLists.call(this, typeof http.response == "object" ? http.response : JSON.parse(http.response));
        }
        else if (http.readyState == 4 && http.status == 404) {
            console.log("Server not found");
        }
        else if (http.readyState == 4) {
            console.log(http.statusText);
        }
    };
    http.send();
}

function getDashboardLists(data) {
    if (typeof (data) != "undefined" && data != null) {
        renderDashboard(data[0].Id);
        data.forEach(function (element) {
            var divTag = document.createElement("div");
            divTag.innerHTML = element.Name;
            divTag.className = "dashboard-item";
            divTag.setAttribute("onclick", "renderDashboard('" + element.Id + "')");
            divTag.setAttribute("name", element.Name);
            divTag.setAttribute("itemid", element.Id);
            divTag.setAttribute("version", element.Version);
            divTag.setAttribute("ispublic", element.IsPublic);
            document.getElementById("panel").appendChild(divTag);
        });
    }
}
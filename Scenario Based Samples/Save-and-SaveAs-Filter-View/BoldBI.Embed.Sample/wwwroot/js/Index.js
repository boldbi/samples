var queryData = {};
var currentDashboardId = "";
var currentDashboardPath = "";
var childDashboardId = "";
var childDashboardName = "";
var activeChild = 0;

function Init(dashboardId) {
    currentDashboardId = dashboardId ? dashboardId : currentDashboardId;
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

function renderDashboard(dashboardId) {
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
                showSaveIcon: true,
                showSaveAsIcon: true,
                showViewSavedFilterIcon: true
            },
            onSaveFilter: function (args) {
                console.log(args);
                queryData = args.data;
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
        actionBegin: "renderActionBegin"
    });
    console.log(this.dashboard);
    this.dashboard.loadDashboard();
};

function renderDashboardView(dashboardId, viewInfo) {
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
        filterParameters: viewInfo ? viewInfo.queryString : "",
        dashboardSettings: {
            filterOverviewSettings: {
                viewId: viewInfo ? viewInfo.viewId : '',
                viewName: viewInfo ? viewInfo.viewName : null,
                showSaveIcon: true,
                showSaveAsIcon: true,
                showViewSavedFilterIcon: true
            },
            onSaveFilter: function (args) {
                queryData = args.data;
                saveViewFilter(args);
            },
            onSaveAsFilter: function (args) {
                queryData = args.data;
                saveAsViewFilter(args);
            },
            onViewSavedFilters: function (args) {
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
        actionBegin: "renderActionBegin"
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
    var instance = BoldBI.getInstance("dashboard");
    childDashboardId = getChildDashboardId(instance);
    childDashboardName = getChildDashboardName(instance);
    if (args && args.viewId) {

        // Update the filter view with the provided information
        var itemId = instance.isMultiTab ? childDashboardId : currentDashboardId;
        var viewInformations = {
            ViewId: args.viewId,
            DashboardId: itemId,
            QueryString: this.queryData.encryptedData,
        };
        instance.updateFilterView(viewInformations, "successPopup");
    } else {
        createSaveViewDialog();
    }
}

function saveAsViewFilter(args) {
    var instance = BoldBI.getInstance("dashboard");
    childDashboardId = getChildDashboardId(instance);
    childDashboardName = getChildDashboardName(instance);
    createSaveViewDialog(args.viewId);
}

// This function is responsible for saving the filter view by BoldBI instance.
function saveView(viewId) {
    var instance = BoldBI.getInstance("dashboard");
    var viewInformations = {
        ViewName: $("#view-name-textbox-input").val(),
        ItemId: currentDashboardId,
        QueryString: this.queryData.encryptedData,
        ChildItemId: childDashboardId
    };
    cancelView();
    if (viewId == "undefined") {
        instance.saveFilterView(viewInformations, "updateDashboardViews");
    } else {
        instance.saveAsFilterView(viewInformations, "updateDashboardViews");
    }
}

// This function is responsible for cancelling the save View dialog box.
function cancelView() {
    $('body').find('#save-view-dialog-div').remove();
    $('body').find('#view-save-success-div').remove();    
}

// This function is responsible for opening the view panel for a specified dashboard.
function openViewPanel(dashboardId) {
    var instance = BoldBI.getInstance("dashboard");
    childDashboardId = getChildDashboardId(instance);
    childDashboardName = getChildDashboardName(instance);
    var itemId = instance.isMultiTab ? childDashboardId : currentDashboardId;
    instance.getDashboardViewsByDashboardId(itemId, "getDashboardViews");
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
        '<span id="view-name-error-msg">Please avoid special characters.</span>' +
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
        width: "450px",
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

function getChildDashboardId(instance) {
    var childId = "";
    if (instance.isMultiTab && this.dashboard) {
        childId = Object.entries(this.dashboard.dashboardDetails)[activeChild][1].ItemDetail.Id;
    }
    return childId;
}

function getChildDashboardName(instance) {
    var childName = "";
    if (instance.isMultiTab && this.dashboard) {
        childName = Object.entries(this.dashboard.dashboardDetails)[activeChild][1].ItemDetail.Name;
    }
    return childName;
}

function embedConfigErrorDialog() {
    var targetContainer = $('<div id="custom_dialog"></div>');
    var dlgDiv = $('<div id="sample_dialog" ></div>');
    targetContainer.append(dlgDiv);
    $('body').append(targetContainer);
    var dialog = new window.ejs.popups.Dialog({
        header: 'Error Message',
        width: '500px',
        isModal: true,
        showCloseIcon: true,
        target: document.getElementById('custom_dialog'),
        content: '<div>To compile and run the project, an embed config file needs to be required. Please use the <a href="https://help.boldbi.com/embedded-bi/site-administration/embed-settings/" target="_blank">URL</a> to obtain the JSON file from the Bold BI server.</div>'
    });
    dialog.appendTo('#sample_dialog');
    var dialogFooter = $('<div id="sample_dialog_footer"><button id="custom_ok_button"onclick="Cancel()">OK</button></div>')
    $('#sample_dialog').append(dialogFooter);
    $('.e-dlg-overlay').css('position', 'fixed');
};

function Cancel() {
    $("#custom_dialog").html('');
}

document.addEventListener("input", function () {
    var textBox = document.getElementById("view-name-textbox-input");
    var saveButton = document.getElementById("save-view-button");
    var errorMessage = document.getElementById("view-name-error-msg");
    var specialCharsRegex = /^[a-zA-Z0-9!@$^ ()_=\-}{.`~]*$/;
    var inputValue = textBox.value;
    if (!specialCharsRegex.test(inputValue)) {
        errorMessage.style.display = "block";
        saveButton.style.opacity = "0.4";
        saveButton.style.cursor = "not-allowed";
        $("#view-name-textbox-input").addClass("error-view-input");
    } else {
        errorMessage.style.display = "none";
        saveButton.style.opacity = "1";
        saveButton.style.cursor = "pointer";
        $("#view-name-textbox-input").removeClass("error-view-input");
    }
});

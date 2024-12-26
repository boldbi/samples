var token = "";

getToken();
function Init() {
    var http = new XMLHttpRequest();
    http.open("GET", getDashboardsUrl, true);
    http.responseType = 'json';
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            ListDashboards.call(this, typeof http.response == "object" ? http.response : JSON.parse(http.response));
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

function getToken() {
    var http = new XMLHttpRequest();
    http.open("GET", getTokenUrl, true); // Replace getTokenUrl with your actual token API URL
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            // Store the token in a script variable
            token = http.responseText;
            console.log("Token received:", token);
            // You can now use the token for further requests
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
function ListDashboards(data) {
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

function renderDashboard(dashboardId) {
    this.dashboard = BoldBI.create({
        serverUrl: rootUrl + "/" + siteIdentifier,
        dashboardId: dashboardId,
        embedContainerId: "dashboard",
        mode: BoldBI.Mode.View,
        embedType: embedType,
        environment: environment,
        width: "100%",
        height: "100%",
        expirationTime: 10000,
        authorizationServer: {
            url: authorizationServerUrl 
        }
    });

    this.dashboard.loadDashboard();
};

var isInitialLoad = true;
function renderDbrd(dashboardId) {
    this.dashboard = BoldBI.create({
        serverUrl: rootUrl + "/" + siteIdentifier,
        dashboardId: dashboardId,
        embedContainerId: "dashboard",
        mode: BoldBI.Mode.View,
        embedType: embedType,
        environment: environment,
        width: "100%",
        height: "100%",
        expirationTime: 10000,
        authorizationServer: {
            url: authorizationServerUrl
        },
        dashboardSettings: {
            showHeader: false,
        }
    });
    var param = $("#dashboardParameters").val();
    var instance = BoldBI.getInstance("dashboard");
    console.log("param" + param);
    console.log("instance" + instance);
    if (!isInitialLoad) {
        instance.embedOptions.filterParameters = "CustomerID=" + param;
        instance.loadDashboard();
    }
    isInitialLoad = false;
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
        content: '<div>To compile and run the project, an embed config file needs to be required. Please use the <a href="https://help.boldbi.com/site-administration/embed-settings/" target="_blank">URL</a> to obtain the JSON file from the Bold BI server.</div>'
    });
    dialog.appendTo('#sample_dialog');
    var dialogFooter = $('<div id="sample_dialog_footer"><button id="custom_ok_button"onclick="Cancel()">OK</button></div>')
    $('#sample_dialog').append(dialogFooter);
    $('.e-dlg-overlay').css('position', 'fixed');
};

function Cancel() {
    $("#custom_dialog").html('');
}
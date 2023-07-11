var dimensionWidgetId = "";
var dateWidgetId = "";

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

function ListDashboards(data) {
    if (typeof (data) != "undefined" && data != null) {
        data.forEach(function (element) {
            if (element.Name == 'Agent Activity Dashboard') {
                var http = new XMLHttpRequest();
                http.open("GET", getWidgetsUrl + "?dashboardId=" + element.Id, true);
                http.responseType = 'json';
                http.setRequestHeader("Content-type", "application/json");
                http.onreadystatechange = function () {
                    if (http.readyState == 4 && http.status == 200) {
                        ListWidgets.call(this, typeof http.response == "object" ? http.response : JSON.parse(http.response));
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
        });
    }
};

function ListWidgets(data) {
    if (typeof (data) != "undefined" && data != null) {
        data.forEach(function (element) {
            if (element.WidgetInfo.DisplayName == "Date") {
                dateWidgetId = element.WidgetInfo.Id;
            }
            if (element.WidgetInfo.DisplayName == "Avg. Resolution Time by Agent") {
                dimensionWidgetId = element.WidgetInfo.Id;
            }
        });
    }
    renderDashboard(dimensionWidgetId, dateWidgetId);
}

function renderDashboard(dimensionWidgetId, dateWidgetId) {
    this.dashboard = BoldBI.create({
        serverUrl: rootUrl + "/" + siteIdentifier,
        dashboardPath: dashboardPath, 
        embedContainerId: "dashboard",
        embedType: BoldBI.EmbedType.Component,
        environment: BoldBI.Environment.Enterprise,
        width: "100%",
        height: "100%",
        expirationTime: 100000,
        authorizationServer: {
            url: authorizationServerUrl
        }
    });
    this.dashboard.loadDashboard();

    /*Dimension type widget filter*/
    var dimensionFilterValues = ["Agent_1", "Agent_5", "Agent_7"];//values to be filtered in the dimension type widget.
    this.dashboard.getWidgetInstance(dimensionWidgetId).setFilterParameters(dimensionFilterValues);//filter the values while initial rendering.

    /*Date type widget filter*/
    var dateFilterValues = ["1/1/2022", "6/30/2022"];//values to be filtered in the date type widget.
    this.dashboard.getWidgetInstance(dateWidgetId).setFilterParameters(dateFilterValues);//filter the values while initial rendering.
};

function widgetDimensionFilters() {
    var instance = BoldBI.getInstance("dashboard");// "dashboard" -> embed container id.
    var dimensionValue = ["Agent_4", "Agent_6", "Agent_8"]; // values to be filtered in the widget.
    instance.getWidgetInstance(dimensionWidgetId).setFilterParameters(dimensionValue); 
    this.dashboard.updateWidgetFilters("dashboard"); 
}

function widgetDateFilters() {
    var instance = BoldBI.getInstance("dashboard");// "dashboard" -> embed container id.
    var dateValue = ["7/1/2022", "12/31/2022"];// values to be filtered in the widget.
    instance.getWidgetInstance(dateWidgetId).setFilterParameters(dateValue);
    this.dashboard.updateWidgetFilters("dashboard");
}




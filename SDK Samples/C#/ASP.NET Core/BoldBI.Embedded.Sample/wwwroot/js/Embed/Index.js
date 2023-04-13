function Init() {
    this.dashboard = BoldBI.create({
        serverUrl: rootUrl + "/" + siteIdentifier,
        dashboardId: dashboardId,
        embedContainerId: "dashboard",
        embedType: embedType.toLowerCase() == "component" ? BoldBI.EmbedType.Component : BoldBI.EmbedType.IFrame,
        environment: environment.toLowerCase() == "cloud" ? BoldBI.Environment.Cloud : BoldBI.Environment.Enterprise,
        width: "100%",
        height: "100%",
        expirationTime: 100000,
        authorizationServer: {
            url: authorizationServerUrl
        }
    });
    console.log("content");
    this.dashboard.loadDashboard();
};

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

function renderDashboard() {
    this.dashboard = BoldBI.create({
        serverUrl: rootUrl + "/" + siteIdentifier,
        dashboardId: dashboardId,
        embedContainerId: "dashboard",
        embedType: embedType,
        environment: environment,
        width: "100%",
        height: "100%",
        expirationTime: 100000,
        authorizationServer: {
            url: authorizationServerUrl
        }
    });
    this.dashboard.loadDashboard();
};
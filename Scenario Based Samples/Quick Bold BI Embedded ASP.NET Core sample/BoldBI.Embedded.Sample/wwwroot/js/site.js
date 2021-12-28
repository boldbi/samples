var query = "";
var queryList = [];
window.IsAutoRefreshEnabled = false;
window.IsEventEnabled = true;

$(document).ready(function () {
    var dropdown = document.getElementsByClassName("dropdown-btn");
    var i;

    for (i = 0; i < dropdown.length; i++) {
        dropdown[i].addEventListener("click", function () {
            var dropdownContent = this.nextElementSibling;
            if (dropdownContent.style.display === "block") {
                dropdownContent.style.display = "none";
                $(this.firstChild.nextElementSibling.firstChild).removeClass("fa-chevron-down");
                $(this.firstChild.nextElementSibling.firstChild).addClass("fa-chevron-right");
            } else {
                dropdownContent.style.display = "block";
                $(this.firstChild.nextElementSibling.firstChild).removeClass("fa-chevron-right");
                $(this.firstChild.nextElementSibling.firstChild).addClass("fa-chevron-down");
            }
        });
    }  
        renderDashboard(window.DashboardPath);

});

$(document).on("click", "#tab-properties", function () {
    $("#property-container").addClass("rows");
    $("#dashboard-property").removeClass("display-none");
    
        var dashboardViewerInstance = $("#dashboard-frame-container_embeddedbi").data("ejDashboardDesigner");
        dashboardViewerInstance.resizeDashboard();

});

$(document).on("click", "#property-close", function () {
    $("#property-container").removeClass("rows");
    $("#dashboard-property").addClass("display-none");
        var dashboardViewerInstance = $("#dashboard-frame-container_embeddedbi").data("ejDashboardDesigner");
        dashboardViewerInstance.resizeDashboard();
});

$(document).on("click", ".header .header-left-side .navbar-nav", function () {
    var dashboardViewerInstance = $("#dashboard-frame-container_embeddedbi").data("ejDashboardDesigner");
    dashboardViewerInstance.resizeDashboard();
    if (!$("#body-container #dashboard-property .dashboard-text-field ul").hasClass("show-extend")) {
        $("#body-container #dashboard-property .dashboard-text-field ul").addClass("show-extend");
    } else {
        $("#body-container #dashboard-property .dashboard-text-field ul").removeClass("show-extend");
    }
});


$(document).on("click", "#dashboard-property .load-dashboard-button", function () {

        var path = $("#dashboard-property .dashboard-text-field ul li.active").attr("data-path");
        if (typeof (path) != "undefined") {
            renderDashboard(path);
        }
});


$(document).on("click", "#dashboard-property .dashboard-text-field ul li", function (e) {
    if (!$(this).hasClass("disabled")) {
        $("#dashboard-property .dashboard-text-field ul li").removeClass("active");
        $(this).addClass("active");
            $("#select-dashboard span").html($(this).text());
            $("#dashboard-id").val($(this).attr("data-id"));
            $("#dashboard-path").val($(this).attr("data-path"));

    }
});

function renderDashboard(path) {
    var dashboard = BoldBI.create({
        serverUrl: window.ServiceUrl,
        dashboardPath: path.charAt(0) == "/" ? path : ("/" + path),
        embedContainerId: "dashboard-frame-container",
        embedType: BoldBI.EmbedType.Component,
        environment: BoldBI.Environment.Cloud,
        width: "100%",
        height: "700px",
        expirationTime: 100000,
        authorizationServer: {
            url: window.AuthorizeAPI
        },
        actionBegin: "renderActionBegin"
    });

    dashboard.loadDashboard();
}


function renderActionComplete(arg) {
    if (arg.eventType == "renderWidget" && window.IsAutoRefreshEnabled) {
        addEventLog("Widget is refreshed");
    }
}

function addEventLog(eventLog) {
    var event = $("#eventTraceElement");
    event.append("<p>" + eventLog + "</p>");
    $("#eventTraceElement").animate({ scrollTop: $("#eventTraceElement p").length * 27 }, "fast");
};

function addRenderingEventLog(eventLog) {
    if (window.IsEventEnabled) {
        var event = $("#eventTraceElement");
        event.append("<p>" + eventLog + "</p>");
        $("#eventTraceElement").animate({ scrollTop: $("#eventTraceElement p").length * 27 }, "fast");
    }
};

function renderEventDashboard(path) {
    var dashboard = BoldBI.create({
        serverUrl: window.ServiceUrl,
        dashboardPath: path.charAt(0) == "/" ? path : ("/" + path),
        embedContainerId: "dashboard-frame-container",
        embedType: BoldBI.EmbedType.Component,
        environment: window.Environment.toLowerCase() == "cloud" ? BoldBI.Environment.Cloud : BoldBI.Environment.Enterprise,
        width: "100%",
        height: "700px",
        expirationTime: 100000,
        authorizationServer: {
            url: window.AuthorizeAPI
        },
        actionBegin: "renderActionBegin",
        actionComplete: "renderEventActionComplete",
        dashboardSettings: {
            beforeIconRender: "beforeDashboardIconRender"
        },
        widgetSettings: {
            beforeIconRender: "beforeWidgetIconRender"
        },
        beforeContextMenuRnder: "beforeOtherContextMenuRender",
    });

    dashboard.loadDashboard();
}

function renderActionBegin(arg) {
    if (arg.eventType == "renderLayout") {
        addRenderingEventLog("Dashboard layout rendering begin event");
    }
    else if (arg.eventType == "resizeDashboard") {
        addRenderingEventLog("Layout resize begin event");
    }
    if (arg.eventType == "renderDashboard") {
        $("#dashboard-frame-container").css({ 'border-right': '1px solid rgb(200, 200, 200)' });
    }
}

function renderEventActionComplete(arg) {
    if (arg.eventType == "renderWidget") {
        addRenderingEventLog("Widget rendering complete event");
    }
}
function beforeOtherContextMenuRender(arg) {
    addRenderingEventLog("Other context menu icon is rendering event");
}

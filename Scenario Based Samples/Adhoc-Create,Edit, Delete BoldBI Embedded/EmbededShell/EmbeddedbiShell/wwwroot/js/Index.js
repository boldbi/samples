var dashboardName = "";
var dashboardId = "";

var isEmptyOrWhiteSpace = function (str) {
	return typeof (str) === "undefined" || str === null || str.match(/^ *$/) !== null;
};

var getParams = function (url, paramName) {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}

	return params[paramName];
};

function embedSample() {
    if (catagoryId === "2") {
        var dataValue = "";
        var apiRequest = new Object();
        apiRequest.password = "Nioxus&786";
        apiRequest.userid = "andy@nioxus.com";
        $.ajax({
            type: "POST",
            url: "https://customerdemo.boldreports.com/reporting/api/site/nioxus/get-user-key",
            data: apiRequest,
            success: function (data) {
                dataValue = data.Token;
                var token = JSON.parse(dataValue);

                $("#sample_dashboard").boldReportViewer(
                    {
                        reportServiceUrl: "https://customerdemo.boldreports.com/reporting/reportservice/api/Viewer",
                        serviceAuthorizationToken: token["token_type"] + " " + token["access_token"],
                        reportPath: dashboardPath,
                        reportServerUrl: 'https://customerdemo.boldreports.com/reporting/api/site/nioxus'
                    });
            }
        });
    }
    else {


        var userEmail = getParams(document.location.href, "email");

        if (mode === BoldBI.Mode.View) {
            $("#dashboard-name-text").css("display", "none");
            $("#save-nav-button").css("display", "none");
            $("#cancel-nav-button").css("display", "none");
        }
        else {
            $("#edit-nav-button").css("display", "none");
            $("#create-nav-button").css("display", "none");
        }

        if (noResourceFound) {
            $("#sample_dashboard").html("No resource found");
            $("#sample_dashboard").attr("style", $("#sample_dashboard").attr("style") + "display:flex;justify-content:center;align-items:center;");
        }
        else {
            var boldbiEmbedInstance = BoldBI.create({
                serverUrl: serverUrl,
                dashboardPath: dashboardPath,
                dashboardId: id,
                datasourceName: datasourceName,
                embedContainerId: "sample_dashboard",
                embedType: BoldBI.EmbedType.Component,
                mode: mode,
                environment: environment,
                height: "100%",
                width: "100%",
                enableDarkMode: true,
                expirationTime: "100000",
                dashboardSettings: {
                    showHeader: false
                },
                widgetSettings: {
                    showExport: false,
                    showMaximize: false,
                    showFilter: false,
                    showMoreOption: false
                },
                authorizationServer: {
                    url: authorizeUrl,
                    headers: {
                        "authorizeToken": isEmptyOrWhiteSpace(token) ? "" : token
                    },
                    authorizionComplete: "clientAuthorizionComplete"
                },
                toolbarSettings: {
                    showToolbar: false
                },
                actionBegin: "renderActionBegin",
                beforeNavigateToDashboard: "clientBeforeNavigateToDashboard",
                enableTheme: true,
                theme: "blue"
            });

            if (mode === BoldBI.Mode.View) {
                boldbiEmbedInstance.loadDashboard();
            }
            else {
                boldbiEmbedInstance.loadDesigner();
            }
        }
    }
}

$('.dashboard-section').css('height', 'calc(100% - ' + $('.header-section').height() + 'px');


function renderActionBegin(arg) {
    $('.dashboard-section').css('height', 'calc(100% - ' + $('.header-section').height() + 'px');
    // Handler
}

function clientAuthorizionComplete(arg) {
    dashboardName = arg.ItemDetail.Name;
    dashboardId = arg.ItemDetail.Id;
    $("#dashboard-name-text").val(dashboardName);
}

function EditDashboard(args) {
    dashboardName = args.parentElement.text.trim();
    var userEmail = getParams(document.location.href, "email");
    document.location.href = baseUrl + "/dashboard/" + dashboardName + (isEmptyOrWhiteSpace(userEmail) ? "?edit=true" : "?email=" + userEmail + "&edit=true");
}

$("#save-item").on("click", function () {
    var name = getParams(document.location.href, "name");
    var dbrdInstance = $("#sample_dashboard_embeddedbi").data("ejDashboardDesigner");
    var id = getParams(document.location.href, "id");
    if (name === undefined) {
        name = dbrdInstance.model.dashboardName;
    }
    var info = {
        'category': category.Name,
        'categoryId': category.Id,
        'name': name,
        'description': '',
        'id': dbrdInstance.model.itemId,
        'eventType': DashboardDesignerEvent.Save
    };

    dbrdInstance.saveDashboardToServer(info);
});

$("#ewdit-item").on("click", function (event) {
    event.preventDefault();
    var userEmail = getParams(document.location.href, "email");
    document.location.href = baseUrl + "/dashboard/" + dashboardName + (isEmptyOrWhiteSpace(userEmail) ? "?edit=true" : "?email=" + userEmail + "&edit=true");
});

$("#create-nav").on("click", function () {
    var userEmail = getParams(document.location.href, "email");
    document.location.href = designerUrl + (isEmptyOrWhiteSpace(userEmail) ? "" : "?email=" + userEmail);
});

$("#edit-nav-button").on("click", function () {
    var userEmail = getParams(document.location.href, "email");
    document.location.href = baseUrl + "/dashboard/" + dashboardName + (isEmptyOrWhiteSpace(userEmail) ? "?edit=true" : "?email=" + userEmail + "&edit=true");
});

$("#create-nav-button").on("click", function () {
    var userEmail = getParams(document.location.href, "email");
    document.location.href = designerUrl + (isEmptyOrWhiteSpace(userEmail) ? "" : "?email=" + userEmail);
});

function clientBeforeNavigateToDashboard(arg) {
    dashboardName = arg.PublishName;
    var userEmail = getParams(document.location.href, "email");
    document.location.href = baseUrl + "/dashboard/" + dashboardName + (isEmptyOrWhiteSpace(userEmail) ? "" : "?email=" + userEmail);
}

$("#cancel-nav-button").on("click", function () {
    var userEmail = getParams(document.location.href, "email");
    var userEmailParam = isEmptyOrWhiteSpace(userEmail) ? "" : "?email=" +  userEmail;
    if (document.location.pathname.indexOf(designerUrl) === -1) {
        document.location.href = document.location.pathname.replace("&edit=true", "") + userEmailParam;
    }
    else {
        const Http = new XMLHttpRequest();
        const delUrl = baseUrl + deleteItemUrl + "?itemId=" + dashboardId + (isEmptyOrWhiteSpace(userEmail) ? "" : "&email=" + userEmail);
        Http.open("POST", delUrl);
        Http.send();
        Http.onreadystatechange = (e) => {
            document.location.href = baseUrl + userEmailParam;
        };        
    }
});

$(document).on("click", "#create-dashboard", function () {
    $("#create-new").css("display", "block");
    $("#dbrd-name").css("display", "none");
    $("#loading-item").removeClass("hide");
    $("#loading-item").addClass("show-flex");
    var dbrdName = $("#dashboard-name").val();
    openDesignerForCreate(dbrdName);
});

function openDesignerForCreate(dbrdName) {
    $.ajax({
        type: "POST",
        url: serverApiUrl + "/v4.0/dashboards/draft",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "bearer " + accessToken);
        },
        success: function (data) {
            var userEmail = getParams(document.location.href, "email");
            document.location.href = designerUrl + "?id=" + data.Id + "&name=" + dbrdName + (isEmptyOrWhiteSpace(userEmail) ? "" : "&email=" + userEmail);
        }
    });
}

function ViewDashboard(args) {
    document.location.href = args.dataset.src;
}

function CreateNew() {
    $("#create-new").css("display", "none");
    $("#dbrd-name").css("display", "flex");
}

function CloseItem() {
    $("#create-new").css("display", "block");
    $("#dbrd-name").css("display", "none");
    $("#dashboard-name").val("");
}

function deleteItem(args, dbrdName, itemId) {
    var dlgContent = 'Are you sure you want to delete the Dashboard - ' + dbrdName + '?';

    var dialogObj = new ejdashboard.popups.Dialog({
        header: "Delete Dashboard",
        content: dlgContent,
        width: '420px',
        showCloseIcon: true,
        closeOnEscape: true,
        buttons: [
            {
                'click': () => {
                    dialogObj.hide();
                    DeleteDashboard(args, dbrdName, itemId);
                },
                buttonModel: { content: 'Yes', isPrimary: true }
            },
            {
                'click': () => {
                    dialogObj.hide();
                },
                buttonModel: { content: 'No' }
            }
        ],
        close: function () {
            dialogObj.destroy();
        }
    });
    dialogObj.appendTo('#dialog');
}

function DeleteDashboard(args, dbrdName, itemId) {

    $.ajax({
        type: "POST",
        url: deleteItemUrl,
        data: { itemId: itemId, userEmail: currentUserEmail },
        success: function (response) {

            if (response === "NoContent") {
                var element = document.getElementById(args.id);
                var parent = document.getElementById("sidemenu-item");
                parent.removeChild(element.parentElement.parentElement);
                $("#header-text").html(dbrdName + " deleted successfully");
                $("#card_item").css("display", "block");
                $(".toaster-block").css("display", "block");
                document.location.href = baseUrl;
            }
            else {
                $("#header-text").html("Error in dashboard delete");
                $("#card_item").removeClass("card-success");
                $("#card_item").addClass("card-danger");
                $("#card_item").css("display", "block");
                $(".toaster-block").css("display", "block");
            }
            setTimeout(function () {
                $('.toaster-block').hide();
            }, 15000);
        }
    });
}

function RefreshDashboard(itemId) {
    $.ajax({
        type: "POST",
        url: refreshItemUrl,
        data: { itemId: itemId },
        success: function (status) {
            if (status === "True") {
                $("#header-text").html("Recent data for the dashboard is being pulled");
                $("#card_item").css("display", "block");
                $(".toaster-block").css("display", "block");
            }
            else {
                $("#header-text").html("Error in dashboard refresh");
                $("#card_item").removeClass("card-success");
                $("#card_item").addClass("card-danger");
                $("#card_item").css("display", "block");
                $(".toaster-block").css("display", "block");
            }
            setTimeout(function () {
                $('.toaster-block').hide();
            }, 15000);
        }
    });
}

function ShareDashboard(isPublic, dbrdName, itemId) {
    var dlgContent = "";
    if (isPublic.toLowerCase() === "true") {
        dlgContent = 'Are you sure you want to remove everyone read access for the Dashboard - ' + dbrdName + '?';
    }
    else {
        dlgContent = 'Are you sure you want to share the Dashboard - ' + dbrdName + ' with everyone ? ';
    }

    var dialogObj = new ejdashboard.popups.Dialog({
        header: "Share Dashboard",
        content: dlgContent,
        width: '420px',
        showCloseIcon: true,
        closeOnEscape: true,
        buttons: [
            {
                'click': () => {
                    dialogObj.hide();
                    MakePublicDashboard(isPublic, dbrdName, itemId);
                },
                buttonModel: { content: 'Yes', isPrimary: true }
            },
            {
                'click': () => {
                    dialogObj.hide();
                },
                buttonModel: { content: 'No' }
            }
        ],
        close: function () {
            dialogObj.destroy();
        }
    });
    dialogObj.appendTo('#dialog');
}

function MakePublicDashboard(isPublic, dbrdName, itemId) {
    $.ajax({
        type: "POST",
        url: shareItem,
        data: { itemId: itemId, IsPublic: isPublic, itemName: dbrdName, userEmail: currentUserEmail },
        success: function (status) {
            if (status === "True") {
                if (isPublic.toLowerCase() === "true") {
                    $("#header-text").html("Everyone read access for " + dbrdName + " has been revoked successfully");
                }
                else {
                    $("#header-text").html(dbrdName + " has been shared with everyone successfully.");
                }
                $("#card_item").css("display", "block");
                $(".toaster-block").css("display", "block");
            }
            else {
                $("#header-text").html("Error in sharing dashboard");
                $("#card_item").removeClass("card-success");
                $("#card_item").addClass("card-danger");
                $("#card_item").css("display", "block");
                $(".toaster-block").css("display", "block");
            }
            setTimeout(function () {
                $('.toaster-block').hide();
            }, 15000);
        }
    });
}

function dbrdChkChange(e) {
    $(".overlayload").show();
    $.ajax({
        type: "POST",
        url: permissionDbUrl,
        data: { chkValue: e.checked, userId: currentUserId, userEmail: currentUserEmail },
        success: function (response) {
            $(".overlayload").hide();
            if (response.toLowerCase() === "ok") {
                document.location.href = baseUrl;
            }
        }
    });
}
function dsChkChange(e) {
    $(".overlayload").show();
    $.ajax({
        type: "POST",
        url: permissionDsUrl,
        data: { chkValue: e.checked, userId: currentUserId, userEmail: currentUserEmail },
        success: function (response) {
            $(".overlayload").hide();
            if (response.toLowerCase() === "ok") {
                document.location.href = baseUrl;
            }
        }
    });
}


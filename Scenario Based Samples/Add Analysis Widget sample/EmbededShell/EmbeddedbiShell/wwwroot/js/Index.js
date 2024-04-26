var dashboardName = "";
var dashboardId = "";
var dashboard_ItemId = "";
const savedState = sessionStorage.getItem('checkboxState');

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
    setCookie("useremail", currentUserEmail);
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
                    showHeader: false,
                    widgetsPanel :{
                        hideDefaultWidgets: (savedState == "true" ) ? true : false, 
                        hideExistingWidgets: (savedState == "true" ) ? true : false
                    }
                },
                widgetSettings: {
                    showExport: false,
                    showMaximize: false,
                    showFilter: false,
                    showMoreOption: false
                },
                authorizationServer: {
                    url: authorizeUrl,
                    //headers: {
                    //    "authorizeToken": isEmptyOrWhiteSpace(token) ? "" : token
                    //},
                    authorizionComplete: "clientAuthorizionComplete"
                },
                toolbarSettings: {
                    showToolbar: false
                },
                onError: function (args) {
                    //console.log("error catching", args);
                },
                actionComplete: function (args) {
                    if (args.eventType == 'layoutRendered') {
                        const savedState = sessionStorage.getItem('checkboxState');
                        var hasConditionExecutedForDashboardId = sessionStorage.getItem(`conditionExecuted_${dashboardId}`);
                        if (dashboardPath == "" && dashboardId != "" && savedState == "true" && !hasConditionExecutedForDashboardId ) {
                            var instance = BoldBI.getInstance("sample_dashboard");
                            instance.renderWidgets(widgetDetails);
                            sessionStorage.setItem(`conditionExecuted_${dashboardId}`, "true");
                        }
                    }
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
      dashboard_ItemId = arg.model.itemId;
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
    document.location.href = baseUrl + "/dashboard/" + dashboardName + "?edit=true";
}

$("#save-item").on("click", function () {
    var name = getParams(document.location.href, "name");
    var dbrdInstance = $("#sample_dashboard_embeddedbi").data("BoldBIDashboardDesigner");
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
        // 'eventType': DashboardDesignerEvent.Save /*The eventType member is not necessary for save the dashboard, it is just to show the event name.*/
    };

    dbrdInstance.saveDashboardToServer(info);
});

$("#ewdit-item").on("click", function (event) {
    event.preventDefault();
    var userEmail = getParams(document.location.href, "email");
    document.location.href = baseUrl + "/dashboard/" + dashboardName + "?edit=true";
});

$("#create-nav").on("click", function () {
    var userEmail = getParams(document.location.href, "email");
    document.location.href = designerUrl;
});

$("#edit-nav-button").on("click", function () {
    var userEmail = getParams(document.location.href, "email");
    document.location.href = baseUrl + "/dashboard/" + dashboardName + "?edit=true";
});

$("#create-nav-button").on("click", function () {
    var userEmail = getParams(document.location.href, "email");
    document.location.href = designerUrl;
});

function clientBeforeNavigateToDashboard(arg) {
    dashboardName = arg.PublishName;
    var userEmail = getParams(document.location.href, "email");
    document.location.href = baseUrl + "/dashboard/" + dashboardName;
}

$("#cancel-nav-button").on("click", function () {
    var userEmail = getParams(document.location.href, "email");
    var userEmailParam = isEmptyOrWhiteSpace(userEmail) ? "" : "?email=" +  userEmail;
    if (document.location.pathname.indexOf(designerUrl) === -1) {
        document.location.href = document.location.pathname.replace("&edit=true", "") ;
    }
    else {
        const Http = new XMLHttpRequest();
        const delUrl = baseUrl + deleteItemUrl + "?itemId=" + dashboardId;
        Http.open("POST", delUrl);
        Http.send();
        Http.onreadystatechange = (e) => {
            document.location.href = baseUrl;
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
    if(environment == "cloud")
    {
        var createUrl = serverApiUrl + "/v4.0/dashboards/draft";
    }
    else {
        var createUrl = serverApiUrl + "/" + siteIdentifier + "/v4.0/dashboards/draft";
    }
    $.ajax({
        type: "POST",
        url: createUrl,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "bearer " + accessToken);
        },
        success: function (data) {
            var userEmail = getParams(document.location.href, "email");
            document.location.href = designerUrl + "?id=" + data.Id + "&name=" + dbrdName;
        }
    });
}

function ViewDashboard(args) {
    if (dashboard_ItemId != args.dataset.itemid) {
        document.location.href = args.dataset.src;
    }
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
    $("#dialog").html("");
    document.body.style.pointerEvents = "none";
    document.getElementById("dialog").style.pointerEvents = "auto";
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
                    document.body.style.pointerEvents = "auto";
                    DeleteDashboard(args, dbrdName, itemId);
                },
                buttonModel: { content: 'Yes', isPrimary: true }
            },
            {
                'click': () => {
                    dialogObj.hide();
                    document.body.style.pointerEvents = "auto";
                },
                buttonModel: { content: 'No' }
            }
        ],
        close: function () {
            dialogObj.destroy();
            document.body.style.pointerEvents = "auto";
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
}

$(document).ready(function () {
    $('.dropdown-submenu a.user').on("click", function (e) {
        $(this).next('ul').toggle();
        e.stopPropagation();
        e.preventDefault();
    });
  //  $('a[target="_blank"]').each(function () {
    //    if ($(this).attr('rel') === undefined) {
      //      $(this).attr("rel", "noreferer noopener");
      //  }
    //});
});

//$(document).on("click", '.dropdown-submenu a.user', function () {
//    $(this).next('ul').toggle();
//    e.stopPropagation();
//    e.preventDefault();
//});

function switchUser(changedEmail, args) {
    var userEmail = getParams(document.location.href, "email");
    var cookie = getCookie("useremail");
    if(cookie != changedEmail)
        setCookie("useremail", changedEmail);
    document.location.href = baseUrl;
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
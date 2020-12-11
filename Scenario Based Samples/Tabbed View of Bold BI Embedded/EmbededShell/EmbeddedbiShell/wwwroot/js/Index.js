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

function embedSample(dbrdId) {
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
            $("#sample_dashboard").html("To render the dashboard, Please click the dashboard under the categories list");
            $("#sample_dashboard").attr("style", $("#sample_dashboard").attr("style") + "display:flex;justify-content:center;align-items:center; height:" + (window.innerHeight -60) + "px");
        }
        else {
            var boldbiEmbedInstance = BoldBI.create({
                serverUrl: serverUrl,
                dashboardPath: dashboardPath,
                dashboardId: id,
                //datasourceName: datasourceName,
                embedContainerId: dbrdId,
                embedType: BoldBI.EmbedType.Component,
                mode: mode,
                environment: environment,
                height: window.innerHeight - 95 + 'px',
                width: "100%",
                enableDarkMode: true,
                expirationTime: "100000",
                dashboardSettings: {
                    showHeader: true
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
                    showToolbar: true
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
    var tabObj = document.querySelector('#tab_element.e-tab').ej2_instances[0];
    tabObj.refreshActElePosition();
    //var toolbarItem = document.querySelectorAll('#tab_element .e-tab-header .e-toolbar-item')[tabIndex];
    //toolbarItem.setAttribute('title', arg.ItemDetail.Name);
}

function EditDashboard(args) {
    var userEmail = getParams(document.location.href, "email");
    //document.location.href = baseUrl + "/dashboard/" + dashboardName + (isEmptyOrWhiteSpace(userEmail) ? "?edit=true" : "?email=" + userEmail + "&edit=true");
    var url = getDbrdUrl + '?categoryName=' + $(args).attr('categoryname') + '&sampleName=' + $(args).attr('samplename') + '&' + (isEmptyOrWhiteSpace(userEmail) ? "edit=true" : "email=" + userEmail + "&edit=true");
    //var url = baseUrl + "/dashboard/" + dashboardName + (isEmptyOrWhiteSpace(userEmail) ? "?edit=true" : "?email=" + userEmail + "&edit=true");
    window.open(url, '_blank');
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
    document.location.href = baseUrl; // + "/dashboard/" + dashboardName + (isEmptyOrWhiteSpace(userEmail) ? "" : "?email=" + userEmail);
}

$("#cancel-nav-button").on("click", function () {
    var userEmail = getParams(document.location.href, "email");
    var userEmailParam = isEmptyOrWhiteSpace(userEmail) ? "" : "?email=" + userEmail;
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

function _isNullOrUndefined(value) {
    return value === undefined || value === null;
}

function ViewDashboard(args) {
    var tabObj;
    $(args).parents('#sidemenu-item').find('.categoryActive').removeClass('categoryActive');
    $(args.parentElement).addClass('categoryActive');
    var tabItems = document.querySelectorAll('#tab_element .e-toolbar-item');
    var totalItems = tabItems.length;
    if (totalItems === 0 && this._isNullOrUndefined(document.querySelector('#tab_element.e-control.e-tab'))) {
        //if (ej.isNullOrUndefined(document.querySelector('.e-tab'))) {
        tabObj = new ej.navigations.Tab({
            selected: tabSelected,
            removing: tabRemoving,
            showCloseButton: true,
            cssClass: 'tab-class',
            items: [
                {
                    header: { 'text': $(args).attr('samplename') },
                    content: '#sampleDashboard_render_ele'
                }
            ]
        });
        //Render initialized Tab component
        tabObj.appendTo('#tab_element');
        //} else {
        //    tabObj = document.querySelector('.e-tab').ej2_instances[0];
        //    var title = $(args).attr('samplename');
        //    var tabDivElement = $('<div id="sampleDashboard_render_ele"></div>');
        //    tabDivElement.append('<div id="mobile-dashbrd" style="height:calc(100% - 0px);float:right;width:calc(100% - 0px);border: 1px solid #D9DEDD;background-color: white;overflow:hidden !important;"><div style="height:100%;width:100%;overflow: hidden !important;" id="sample_dashboard"></div></div>');
        //    tabDivElement.appendTo($('#dashboards'));
        //    var content = '#sampleDashboard_render_ele';
        //    var item = { header: { text: title }, content: content };

        //    tabObj.addTab([item]);
        //}
        $("#sample_dashboard").html("");

        if ($(args).attr('dbrdId') === "0df45dcd-8977-44ff-b2a3-862753fd5e61") {
            //var mbleProp = $('#dashboardparent #mobileProperties').clone();
            //var tabDivElement = $('<div id="sampleDashboard_render_ele"></div>');
            //$('#sampleDashboard_render_ele').html(mbleProp);
            //$('#sampleDashboard_render_ele').append('<div id="mobile-dashbrd" style="height:calc(100% - 0px);float:right;width:calc(100% - 0px);border: 1px solid #D9DEDD;background-color: white;overflow:hidden !important;"><div style="height:100%;width:100%;overflow: hidden !important;" id="sample_dashboard"></div></div>');
            //$('#sampleDashboard_render_ele').appendTo($('#dashboards'));
            $('#sampleDashboard_render_ele').prepend($('#mobileProperties'));
            //$('#sampleDashboard_render_ele').find('#mobileProperties').attr('id', 'mobileProperties' + totalItems);
            $('#sampleDashboard_render_ele #mobileProperties').css({ 'display': 'inline-block', 'height': window.innerHeight - 95 + 'px' });
            $('#sampleDashboard_render_ele #mobile-dashbrd').css({ 'width': 'calc(100% - 305px)', 'height': window.innerHeight - 95 + 'px' });
            range.refresh();
        } else {
            $('#mobile-dashbrd').css({ 'width': 'calc(100% - 0px)', 'height': window.innerHeight - 95 + 'px' });
        }
        noResourceFound = false;
        dashboardPath = args.dataset.src.replace(/%20/g, " ").replace('/embed', '');
        $('#sample_dashboard').css({ 'display': '', 'justify-content': '', 'align-items': '' });
        embedSample("sample_dashboard");
    }
    else {
        tabIndex++;
        tabObj = document.querySelector('.e-tab').ej2_instances[0];
        var isExist = false;
        for (var i = 0; i < totalItems; i++) {
            if (tabItems[i].textContent === $(args).attr('samplename')) {
                isExist = true;
                tabObj.selectedItem = i;
                tabObj.refresh();
                break;
            }
        }
        if (!isExist) {
            var title = $(args).attr('samplename');
            var tabDivElement = $('<div id="sampleDashboard_render_ele' + tabIndex + '"></div>');
            tabDivElement.append('<div id="mobile-dashbrd' + tabIndex + '" style="height:calc(100% - 0px);float:right;width:calc(100% - 0px);border: 1px solid #D9DEDD;background-color: white;overflow:hidden !important;"><div style="height:100%;width:100%;overflow: hidden !important;" id="sample_dashboard' + tabIndex + '"></div></div>');
            tabDivElement.appendTo($('#dashboards'));
            var content = '#sampleDashboard_render_ele' + tabIndex;
            var item = { header: { text: title }, content: content };
            tabObj.selectedItem = tabIndex;
            tabObj.addTab([item], tabIndex);
            if ($(args).attr('dbrdId') === "0df45dcd-8977-44ff-b2a3-862753fd5e61") {
                $('#sampleDashboard_render_ele' + tabIndex).prepend($('#mobileProperties'));
                //$('#sampleDashboard_render_ele' + tabIndex).find('#mobileProperties').attr('id', 'mobileProperties' + totalItems);
                $('#mobileProperties').css({ 'display': 'inline-block', 'height': window.innerHeight - 95 + 'px' });
                $('#mobile-dashbrd' + tabIndex).css({ 'width': 'calc(100% - 305px)', 'height': window.innerHeight - 95 + 'px' });
                range.refresh();
            } else {
                $('#mobile-dashbrd' + tabIndex).css({ 'width': 'calc(100% - 0px)', 'height': window.innerHeight - 95 + 'px' });
            }
            noResourceFound = false;
            dashboardPath = args.dataset.src.replace(/%20/g, " ").replace('/embed', '');
            embedSample('sample_dashboard' + tabIndex);
        }
    }
    //document.location.href = args.dataset.src;
    //var url = getDbrdUrl + '?categoryName=' + $(args).attr('categoryname') + '&&sampleName=' + $(args).attr('samplename');
    //window.open(url, '_blank');
    $('#tab_element').find('.e-tab-header .e-tab-text').attr('title', $(args).attr('samplename'));
}

function tabRemoving(args) {
    tabIndex--;
    $(args.removedItem).parents('#tab_element').find('.e-content .e-item').map(function (index, value) {
        if ($(value).attr('aria-labelledby') === $(args.removedItem).attr('id')) {
            $('#dashboardparent').append($(value).find('#mobileProperties').css('display', 'none'));
        }
    });
}

function tabSelected(args) {
    //if (args.selectedIndex === document.querySelectorAll('#tab_element .e-toolbar-item').length - 1) {
    //    document.getElementById('tab-title').value = '';
    //    document.getElementById('tab-content').value = '';
    //}
    $('#sidemenu-item').find('.categoryActive').removeClass('categoryActive');
    $('#sidemenu-item').find('li').map(function (index, value) {
        if ($(value).text().trim().toLowerCase() === args.selectedItem.textContent.toLowerCase()) {
            $(value).find('a').addClass('categoryActive');
        }
    });
}

function CreateNew() {
    //$("#create-new").css("display", "none");
    //$("#dbrd-name").css("display", "flex");
    var dlgContent = $('<div class="createNewDbrd"></div>');
    var category = $('<div>Categories</div>');
    var categoryDD = $('<select id="dlg_DDText" ><options>Education</options><options>Sports</options><options>Health Care</options><options>Telecommunications</options></select>');
    //var categoryOptions;
    //for (var i = 0; i < categoreyList; i++) {
    //    categoryOptions += $('<options>' + categoreyList[i].CategoryName + '</options>');
    //}
    //$(categoryDD).append(categoryOptions);
    var dashboardName = $('<div>Dashboard Name</div>');
    var dbrdTextBox = $('<input type="text" id="dlg_DbrdText" />');
    var table = $('<table>');
    var tr = $('<tr><td><div>Categories</div></td><td><select id="dlg_DDText"><options>Education</options><options>Sports</options><options>Health Care</options><options>Telecommunications</options></select></td></tr>');
    var tr1 = $('<tr><td><div>Dashboard Name</div></td><td><input type="text" id="dlg_DbrdText" /></td></tr>');
    $(table).append(tr).append(tr1);
    $('.createNewDbrd').append($(table));

    $('.createNewDbrd').dialog({
        buttons: {
            "Save": function () {
                //Your submit handler
            },
            "No": function () {

            }
        },
        title: 'Create New Dashboard',
        width: 600,
        height: 300,
    });
}

function CloseItem() {
    $("#create-new").css("display", "block");
    $("#dbrd-name").css("display", "none");
    $("#dashboard-name").val("");
}

function deleteItem(args, dbrdName, itemId) {
    var dlgContent = '<p>Are you sure you want to delete the Dashboard - ' + dbrdName + '?</p>';

    //var dialogObj = new ejdashboard.popups.Dialog({
    //    header: "Delete Dashboard",
    //    content: dlgContent,
    //    width: '420px',
    //    showCloseIcon: true,
    //    closeOnEscape: true,
    //    buttons: [
    //        {
    //            'click': () => {
    //                dialogObj.hide();
    //                DeleteDashboard(args, dbrdName, itemId);
    //            },
    //            buttonModel: { content: 'Yes', isPrimary: true }
    //        },
    //        {
    //            'click': () => {
    //                dialogObj.hide();
    //            },
    //            buttonModel: { content: 'No' }
    //        }
    //    ],
    //    close: function () {
    //        dialogObj.destroy();
    //    }
    //});
    $('#dialog').html('');
    $(dlgContent).appendTo('#dialog');
    $('#dialog').dialog({
        buttons: {
            "Yes": function () {
                $('#dialog').dialog('close');
                DeleteDashboard(args, dbrdName, itemId);
            },
            "No": function () {
                $('#dialog').dialog('close');
            }
        },
        title: 'Delete Dashboard',
        width: 420,
        height: 200,
    });
}

function DeleteDashboard(args, dbrdName, itemId) {

    $.ajax({
        type: "POST",
        url: deleteItemUrl,
        data: { itemId: itemId, userEmail: currentUserEmail },
        success: function (response) {

            if (response === "NoContent") {
                var element = document.getElementById(args.id);
                //var parent = document.getElementById("sidemenu-item");
                //parent.removeChild(element.parentElement.parentElement);
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

function specficCategory(args) {
    document.location.href = args.dataset.src;
}


function rangechanged(args) {
    var start = args.start.getMonth() + 1 + "/" + args.start.getDate() + "/" + args.start.getFullYear() + " " + ("0" + args.start.getHours()).slice(-2) + ":" + ("0" + args.start.getUTCMinutes()).slice(-2) + ":00";// + args.start.getSeconds();
    var end = args.end.getMonth() + 1 + "/" + args.end.getDate() + "/" + args.end.getFullYear() + " " + ("0" + args.end.getHours()).slice(-2) + ":" + ("0" + args.end.getUTCMinutes()).slice(-2) + ":00";// + args.end.getSeconds();
    dateQuery = "messagedate=between(" + start + "," + end + ")";
}
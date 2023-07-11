var categoryName = [];
var categoryId = [];
var length = 0;
var dashboardId = '';
var dashboardName = '';
var description = '';
var dropdown;

function renderDashboard() {
    var dashboard = BoldBI.create({
        serverUrl: rootUrl + "/" + siteIdentifier,
        dashboardId: itemId,
        embedContainerId: "dashboard",
        embedType: BoldBI.EmbedType.Component,
        environment: environment == "enterprise" ? BoldBI.Environment.Enterprise : BoldBI.Environment.Cloud,
        width: "100%",
        height: "100%",
        mode: BoldBI.Mode.Design,
        expirationTime: 100000,
        authorizationServer: {
            url: authorizationServerUrl
        },
        actionBegin: "actionBegin",
    });
    dashboard.loadDesigner();
};

// this method will be triggered at the beginning of every viewer actions like layout, publish button clicking, exporting and more.
function actionBegin(arg) {
    if (arg.eventType == "publishAsAction") {
        arg.cancel = true;
        itemId = arg.model.itemId;
        var dashboardNameTextfield = arg.model.dashboardName;
        var dashboardDescription = arg.model.dashboardDescription;
        var instance = BoldBI.getInstance("dashboard");
        instance.getDashboardCategories(function (arg) {
            if (arg.Status) {
                $('body').find('#popup_target').remove();
                var targetContainer = $('<div id="popup_target"></div>');
                var dlgDiv = $('<div id="sample_dialog"></div>');
                targetContainer.append(dlgDiv);
                $('body').append(targetContainer);
                var dialog = new window.ejs.popups.Dialog({
                    header: 'Publish As Dashboard',
                    width: window.innerWidth - 1000 + 'px',
                    showCloseIcon: true,
                    isModal: true,
                    target: document.getElementById('popup_target'),
                    height: '400px',
                    content: '<div id="urlLinkDbrd"></div> <textarea id="DashboardName" style="padding-left:2px;border-color : rgba(0, 0, 0, 0.22);border-width:1px;margin-top:5px;resize: none;" ></textarea><textarea id="description" style="padding-left:2px;height:90px;border-color : rgba(0, 0, 0, 0.22);border-width:1px;resize: none;"></textarea>'
                });
                dialog.appendTo('#sample_dialog');

                length = arg.CategoryInfo.length;
                for (var i = 0; i < length; i++) {
                    categoryName[i] = arg.CategoryInfo[i].Name;
                    categoryId[i] = arg.CategoryInfo[i].Id;
                }

                dropdown = new ejs.dropdowns.DropDownList({
                    width: '670px',
                    dataSource: categoryName,
                    showDropDownIcon: true,
                    placeholder: 'Select Category',
                    index: 0,
                    fields: { text: 'Value', value: 'Key' },
                    floatLabelType: 'Auto',
                });

                dropdown.appendTo('#urlLinkDbrd');
                var dashboardName = new ejs.inputs.TextBox({
                    placeholder: 'Dashboard name',
                    floatLabelType: 'Auto',
                    value: dashboardNameTextfield
                });
                dashboardName.appendTo('#DashboardName');
                var textBox = new ejs.inputs.TextBox({
                    placeholder: 'Description',
                    floatLabelType: 'Auto',
                    height: '90px',
                    value: dashboardDescription
                });
                textBox.appendTo('#description');
                var buttonElement = $('<div id="buttons" style="background-color : rgba(0, 0, 0,0.05)"></div>')
                var buttons = $('<button id="cancle" style="float:right;width=75px;margin:10px 15px 20px 10px;background:#f9f9f9;"onclick="CancelPublishDialog()">Cancel</button><button id="publish" style="float:right;width=75px;margin-bottom:20px;margin-right:10px;margin-top: 10px;background:#0565ff;color: #fff;"onclick="PublishDashboard()">Publish</button>');
                $('#sample_dialog').append(buttonElement);
                buttons.appendTo('#buttons');
                var addCategory = $('<div id="newCategory" style="/* width: 30px; */"><button id="addNewCategory" style="/*width: 70px;height: 34px;*/"onclick="NewCategory()">+</button></div>');
                $('#sample_dialog_dialog-content div').first().append(addCategory);
                $('#sample_dialog_dialog-content div').css('border-color', 'rgba(0,0,0,.22)');
                $('#publish').css({ 'background': '#0565ff', 'color': '#fff', 'outline': '#fafafa 0 solid', 'border-radius': '4px', 'border': '1px solid', 'min-width': '90px', 'height': '28px' });
                $('#cancle').css({ 'color': '#333;', 'outline': '#fafafa 0 solid', 'border-radius': '4px', 'border': '1px solid', 'min-width': '90px', 'height': '28px', 'border-color': '#b3b3b3' });
                $('#popup_target').find('.e-float-input').css('margin-bottom', '15px', 'padding-left', '10px');
                $('#popup_target').find('.e-float-line').remove();
                $('#sample_dialog_dialog-content div').first().css({ 'border-width': '1px', 'border-color': 'rgba(0, 0, 0, 0.22)', 'padding-left': '10px' });
                $('#addNewCategory').css({ 'color': 'rgb(120, 120, 120)', 'outline': '#fafafa 0 solid', 'border': '1px solid', 'min-width': '40px', 'height': '33px', 'border-color': '#b3b3b3', 'font-size': '25px' });
                $('.e-dlg-header-content').css({ 'background-color': 'rgba(0, 0, 0, 0.05)', 'height': '60px', 'margin-bottom': '10px' });
                $('#sample_dialog_dialog-content').css('overflow', 'hidden');
                $('#popup_target').find('textarea').css({ 'padding-left': '10px' });
                $('.e-float-text.e-label-top').css({ 'font-weight': 'bold' });
                $('#sample_dialog_dialog-content div').first().find('.e-float-text.e-label-top').css('transform', ' translate3d(0,-11px,0) scale(.92)');
                $('#sample_dialog_dialog-content div').last().find('.e-float-text.e-label-top').css('transform', ' translate3d(0,0,0) scale(.92)');
                $('#urlLinkDbrd_popup .e-content.e-dropdownbase').css('width', '630px');
            }
        });
    }   
    
}

// this method will be triggered for publishing the dashboard.
function PublishDashboard() {

    var selecetdCategoryName = $('#urlLinkDbrd_hidden')[0].innerText;

    description = $("#description").val();
    dashboardName = $("#DashboardName").val();
    for (var i = 0; i < length; i++) {
        if (categoryName[i] == selecetdCategoryName) {
            var selectedCategoryId = categoryId[i];
        }
    }
    var publishModel = {
        category: selecetdCategoryName,
        categoryId: selectedCategoryId,
        description: description,
        id: '', //id is not needed for existing dashboard cases.
        isPublic: true,
        name: dashboardName
    }
    var instance = BoldBI.getInstance("dashboard");
    instance.saveDashboard(publishModel);
    CancelPublishDialog();
}

// this method will be triggered for creating 'New Category' dialog.
function NewCategory() {

    $('body').find('#newCategory_popup_target').remove();
    var targetContainer = $('<div id="newCategory_popup_target"></div>');
    var dlgDiv = $('<div id="newCategory_sample_dialog"></div>');
    targetContainer.append(dlgDiv);
    $('body').append(targetContainer);

    var dialog = new window.ejs.popups.Dialog({
        header: 'New Category',
        width: window.innerWidth - 1200 + 'px',
        showCloseIcon: true,
        isModal: true,
        target: document.getElementById('newCategory_popup_target'),
        height: '300px',
        content: ' <textarea id="newCategoryName" style="padding-left:2px;border-color : rgba(0, 0, 0, 0.22);border-width:1px;margin-top:5px;resize: none;" ></textarea><textarea id="newCategoryNameDescription" style="padding-left:2px;height:90px;border-color : rgba(0, 0, 0, 0.22);border-width:1px;resize: none;"></textarea>'
    });
    dialog.appendTo('#newCategory_sample_dialog');
    var categorydName = new ejs.inputs.TextBox({
        placeholder: 'Category Name',
        floatLabelType: 'Auto',
    })
    categorydName.appendTo('#newCategoryName');
    var textBox = new ejs.inputs.TextBox({
        placeholder: 'Description',
        floatLabelType: 'Auto',
        height: '90px',
    })
    textBox.appendTo('#newCategoryNameDescription');
    var buttonElement = $('<div id="Newbuttons" style="background-color:rgba(0, 0, 0, 0.05)"></div>')
    var buttons = $('<button id="NewCancle" style="float:right;width=75px;margin:15px 15px 20px 10px;"onclick="CancelCategoryDialog()">Cancel</button><button id="Save" style="float:right;width=75px;margin-bottom:20px;margin-right:10px;margin-top:15px;background:#0565ff;"onclick="CreateCategory()">Save</button>');
    $('#newCategory_sample_dialog').append(buttonElement);
    buttons.appendTo('#Newbuttons');
    $('#Save').css({ 'background': '#0565ff', 'color': '#fff', 'outline': '#fafafa 0 solid', 'border-radius': '4px', 'border': '1px solid', 'min-width': '90px', 'height': '25px' });
    $('#NewCancle').css({ 'color': '#333;', 'outline': '#fafafa 0 solid', 'border-radius': '4px', 'border': '1px solid', 'min-width': '90px', 'height': '25px', 'border-color': '#b3b3b3', 'background':'#f9f9f9' });
    $('#newCategory_popup_target').find('.e-float-line').remove();
    $('#newCategory_sample_dialog_dialog-header').css({ 'background-color': ' rgba(0, 0, 0, 0.05)', 'height': '55px' });
    $('.e-float-text.e-label-bottom').css({ 'font-weight': 'bold', 'margin-top': '3px','padding-left':'7px' });
    $('#newCategory_sample_dialog_dialog-content').css('overflow', 'hidden');
    $('#newCategory_popup_target').find('textarea').css({ 'padding-left':'7px', 'margin-top':'5px'});
}

// this method will be triggered for saving new category.
function CreateCategory() {
    var instance = BoldBI.getInstance("dashboard");
    var newCategoryName = $('#newCategoryName').val();
    var newCategoryDescription = $('#newCategoryNameDescription').val();
   
    categoryName[length] = newCategoryName;
    
    dropdown.value = newCategoryName;
    dropdown.refresh();
    var addCategory = $('<div id="newCategory" style="/* width: 30px; */"><button id="addNewCategory" style="/*width: 70px;height: 34px;*/"onclick="NewCategory()">+</button></div>');
    $('#sample_dialog_dialog-content div').first().append(addCategory);
    $('#addNewCategory').css({ 'color': 'rgb(120, 120, 120)', 'outline': '#fafafa 0 solid', 'border': '1px solid', 'min-width': '40px', 'height': '33px', 'border-color': '#b3b3b3', 'font-size': '25px' });
    $('#sample_dialog_dialog-content div').first().find('.e-float-text.e-label-top').css({ 'transform': ' translate3d(0,-11px,0) scale(.92)', 'font-weight': 'bold'});
    $('#sample_dialog_dialog-content div').first().css({ 'border-width': '1px', 'border-color': 'rgba(0, 0, 0, 0.22)', 'padding-left': '10px' });

    instance.createDashboardCategory(newCategoryName, newCategoryDescription, function (arg) {
        if (arg.CategoryId) {
            categoryId[length] = arg.CategoryId;
            length = length + 1;
        }

        CancelCategoryDialog();
    });
}

// this method will be triggered for cancel the publish dialog.
function CancelPublishDialog() {
    $('#popup_target').html('');
}

// this method will be trigged for cancel the category dialog.
function CancelCategoryDialog() {
    $('#newCategory_popup_target').html('');
}
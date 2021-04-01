var sample = { localization: [] }; // eslint-disable-line no-undef
var isFristRquest=true;
sample.localization["en-US"] = {    
    Properties: "Properties",
    SelectWidget: "Select Metric",   
    EnableWidgetMode: "Enable Widget Mode",
	Apply: "Apply",
	DashboardID: "Dashboard ID",
	DashboardPath: "Dashboard Path"
};
var dashboardViewerObj, enableWidgetMode = false, dashboard = { id: "", name: "", path: "" };
var locale = null;

function initializeTemplate() { 
    var action_list_ul = document.getElementById('parent-list');
    action_list_ul.addEventListener("click", selectWidget, false);
  isFristRquest=false;
		var dataSources=[];
                dataSources.push({ id: "2c7939af-29a5-42d7-b623-879bb57210e4", text: "Financial Sales", path:"/Sales/Financial Sales"});
                dataSources.push({ id: "ad5d8322-4290-4a61-9054-cb9869e009d3", text: "HR Recruitment Dashboard", path:"/Human Resources/HR Recruitment Dashboard"});
                dataSources.push({ id: "420db458-38ad-4d13-a29f-7f810448f487", text: "Personal Expense Analysis", path:"/Predictive Analytics/Personal Expense Analysis"});
                dataSources.push({ id: "96e3de16-bae2-4a43-8983-435dbde38012", text: "Property Management Dashboard", path:"/Property Management/Property Management Dashboard"});
                dataSources.push({ id: "b499af7a-79e7-4ff3-9614-0cb6f4f9116d", text: "Workforce Performance Dashboard", path:"/Human Resources/Workforce Performance Dashboard"});  
    $("#widgetCollectionDropDown").ejDropDownList({
        dataSource: dataSources,
        fields: { text: "text", value: "id"},
        change: "selectWidget",        
        cssClass: "e-dbrd-canvas",
        width: "100%",		
        watermarkText: "Select Dashboard"		
    });		

	$("#applyBtn").ejButton({
        showRoundedCorner: true,        
		height: "25px",
		click: "onApply",
		enabled:false,
		
    });
    $("#widgetCollectionDropDown_popup_wrapper").addClass("e-dbrd-cntrl-combobox e-dbrd-control");
}

//view
function getPropertiesTemplate() {       
    locale = sample.localization["en-US"];
    var properties = '<div class="e-prop-header"><div class="dbrd-sdk-closeProBtn" onclick="closepro()"></div><p style="font-size: 16px;border-bottom: 1px solid #c3c3c3;">' + locale.SelectWidget + '</p></div>' +
	
                     '<div class="e-prop-div">' +					                       					                    					  					  
					  
        '<ul id="parent-list" class="" style="list-style-type:none;padding-left:10px;">' +
        '<li class="nav-item active"><a href="#">Sales by State</a></li> ' +
        '<li class="nav-item"><a href="#">Sales by Condition</a> </li>'+
        '<li class="nav-item"><a href="#">Sales over Quarter</a></li> '+
        '<li class="nav-item"><a href="#">Prescription Drug\'s Performance</a></li> '+
        '<li class="nav-item"><a href="#">Profit by Channel</a></li> '+
        '</ul> '+
					  
                    '</div>';
                    return properties;
}

//events
function selectWidget(e) {
    var widgetValue = e.target.innerHTML;
    $('#parent-list li').removeClass('active');
    $(e.target.parentElement).addClass("active");
    var fieldNameElement = document.getElementById('widget-header');
    fieldNameElement.innerHTML = e.target.innerHTML;
    renderWidget(widgetValue);
}

function onApply() {
    renderWidget(dashboard.path);
}

function setWidgetModeSettings() {
    var instance = BoldBI.getInstance("sample_dashboard");
    instance.loadDashboardWidget(widgetDetails.name);
}




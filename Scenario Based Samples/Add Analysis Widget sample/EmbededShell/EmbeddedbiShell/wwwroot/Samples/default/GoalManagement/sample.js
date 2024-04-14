ejdashboard.base.enableRipple(true);
/**
*  Tab default sample
*/



var employees = [
    { id: 1, name: 'Steven Buchanan', eimg: '10', job: 'CEO', image: 'https://ej2.syncfusion.com/demos/src/images/employees/9.png', hasChild: true, expanded: true },
    { id: 2, pid: 1, name: 'Alessia', eimg: '2', image: 'https://ej2.syncfusion.com/demos/src/images/employees/2.png', job: 'Product Manager', hasChild: true },
    { id: 3, pid: 2, name: 'Aziza', eimg: '7', image: 'https://ej2.syncfusion.com/demos/src/images/employees/3.png', job: 'Team Lead' },
    { id: 4, pid: 2, name: 'Anne Dodsworth', eimg: '1', image: 'https://ej2.syncfusion.com/demos/src/images/employees/4.png', job: 'Team Lead' },
    { id: 5, pid: 2, name: 'Nancy Davolio', eimg: '4', image: 'https://ej2.syncfusion.com/demos/src/images/employees/5.png', job: 'Team Lead', hasChild: true },
    { id: 6, pid: 5, name: 'Amelie', eimg: '9', image: 'https://ej2.syncfusion.com/demos/src/images/employees/6.png', job: 'Developer' },
    { id: 7, pid: 5, name: 'Robert King', eimg: '8', image: 'https://ej2.syncfusion.com/demos/src/images/employees/7.png', job: 'Developer' },
    { id: 8, pid: 7, name: 'Margaret Peacock', eimg: '6', image: 'https://ej2.syncfusion.com/demos/src/images/employees/8.png', job: 'Developer' },
    { id: 9, name: 'Janet Leverling', eimg: '3', image: 'https://ej2.syncfusion.com/demos/src/images/employees/9.png', job: 'CEO' },
];
var tabObj;
var tree = new ejdashboard.navigations.TreeView();
var treeObj = new ejdashboard.navigations.TreeView({
    fields: { dataSource: employees, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild', imageUrl: 'image' },
    cssClass: 'custom',
    nodeTemplate: '#treeTemplate',
    drawNode: drawNode,
    nodeClicked: function (nodeArgs) {
        var ele = document.querySelector('#dialog.e-dialog');
        if (nodeArgs.node.classList.contains('e-active') && !ele) {
            var dialogObj = new ejdashboard.popups.Dialog({
                content: '<div id="dialogTab" class="e-background"></div>',
                //width: '1000px',
                // height: '600px',
                showCloseIcon: true,
                closeOnEscape: true,
                beforeOpen: function (args) {
                    var container = document.createElement("div");
                    container.id = "dbrdContainer";
                    document.getElementById("dialog").append(container);
                    if (ejdashboard.base.isNullOrUndefined(document.querySelector('#dialogTab.e-tab'))) {
                        tabObj = new ejdashboard.navigations.Tab({
                            
                            selectedItem: 0,
                            items: [
                                {
                                    header: { 'text': 'Main Dashboard', 'iconCss': 'e-profile' },
                                    content: '#dbrdContainer'
                                },
                                {
                                    header: { 'text': 'Report', 'iconCss': 'e-network' },
                                    content: '#dbrdContainer'
                                },
                                {
                                    header: { 'text': 'Organization Goal', 'iconCss': 'e-search' },
                                    content: '<div id="orgGoal"></div>'
                                }
                            ],
                            selecting: tabSelecting,
                            selected: tabSelected,
                            created: function handleSelectEvent() {
                                
                                var dashboard = BoldBI.create({
                                    serverUrl: "https://demo-goalmanagement.boldbi.com/bi/site/site1",
                                    dashboardPath: "/Goal Management/Goal Management - Main Dashboard",
                                    embedContainerId: "dbrdContainer",
                                    embedType: BoldBI.EmbedType.Component,
                                    environment: BoldBI.Environment.Enterprise,
                                    width: "100%",
                                    height: "630px",
                                    expirationTime: 100000,
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
                                        url: "/GetDetails"
                                    },
                                    beforeNavigateUrlLinking: "beforeNavigateUrl"

                                });


                                dashboard.loadDashboard();
                            }
                        });
                        tabObj.appendTo('#dialogTab');
                    }
                },
                close: function () {
                    dialogObj.destroy();
                }
            });
            // Render initialized Dialog
            dialogObj.appendTo('#dialog');
            document.onclick = (args) => {
                if (args.target.id === 'target') {
                    dialogObj.hide();
                }
            };
        }
    }
});
treeObj.appendTo('#tree');

function tabSelected(args) {
    if (args.selectedIndex === 2) {
        $('#orgGoal').load("organizationgoal.html");
    }
}

function tabSelecting(args) {
    if (args.selectingIndex !== 2) {
        var path;
        if (args.selectingIndex === 1) {
            path = "/Goal Management/Goal Management - Reports";
        }
        else {
            path = "/Goal Management/Goal Management - Main Dashboard";
        }

        var dashboard = BoldBI.create({
            serverUrl: "https://demo-goalmanagement.boldbi.com/bi/site/site1",
            dashboardPath: path,
            embedContainerId: "dbrdContainer",
            embedType: BoldBI.EmbedType.Component,
            environment: BoldBI.Environment.Enterprise,
            width: "100%",
            height: "630px",
            expirationTime: 100000,
            filterParameters: "a=b",
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
                url: "/GetDetails"
            }
        });

        dashboard.loadDashboard();
    }
}

function drawNode(args) {
    if (args.nodeData.hasChild == undefined) {
        var text = args.node.querySelector(".e-text-content");
        var element = document.createElement("div");
        element.classList.add("custom1");
        text.insertBefore(element, text.children[0]);
    }
    else if (args.nodeData.hasChild) {
        args.node.classList.add("e-has-child");
    }
}

function beforeNavigateUrl(args) {
    args.cancel = true;
    if (args.linkInfo.parameterDetails.length == 0) {
        tabObj.select(2);
    }
    else {
        tabObj.select(1);
        var urlParam = args.linkInfo.parameterDetails[0];
        setTimeout(redrawDashboard, 100, urlParam);
    }
    
}

function redrawDashboard(urlParam) {
    var dashboard = BoldBI.create({
        serverUrl: "https://demo-goalmanagement.boldbi.com/bi/site/site1",
        dashboardPath: "/Goal Management/Goal Management - Reports",
        embedContainerId: "dbrdContainer",
        embedType: BoldBI.EmbedType.Component,
        environment: BoldBI.Environment.Enterprise,
        width: "100%",
        height: "630px",
        expirationTime: 100000,
        filterParameters: urlParam.parameter + "=" + urlParam.value,
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
            url: "/GetDetails"
        }
    });

    dashboard.loadDashboard();
    ////var tabitem = $("#dialogTab").ejTab("instance");
    
    //var data = $("#dashboard_1_embeddedbi").data("ejDashboardDesigner");
    //data.model.dashboardPath = "84bfa04c-476e-45c3-b110-48abbae72422/2";
    //data.model.filterParameters = "Grade_Name=Grade 1";
    //data.model.dashboardName = "Goal Management - Reports";
    //var tab = $("#dialogTab").ejTab();
    //tab.select();
    //data.redrawDashboard();
}

var tabObj2 = new ejdashboard.navigations.Tab({
    items: [
        {
            header: { 'text': 'All' },
            content: '<div id="Grid"></div>'
        },
        {
            header: { 'text': 'Ups' },
            content: 'This is the content of the Ups tab'
        },
        {
            header: { 'text': 'Downs' },
            content: 'This is the content of the Downs tab'
        },
        {
            header: { 'text': 'Compressed' },
            content: 'This is the content of the Compressed tab'
        }
    ],
    created: function () {
        var grid = new ejdashboard.grids.Grid({
            dataSource: [
                {
                    OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, OrderDate: new Date(8364186e5),
                    ShipName: 'Vins et alcools Chevalier', ShipCity: 'Reims', ShipAddress: '59 rue de l Abbaye',
                    ShipRegion: 'CJ', ShipPostalCode: '51100', ShipCountry: 'France', Freight: 32.38, Verified: !0
                },
                {
                    OrderID: 10249, CustomerID: 'TOMSP', EmployeeID: 6, OrderDate: new Date(836505e6),
                    ShipName: 'Toms Spezialitäten', ShipCity: 'Münster', ShipAddress: 'Luisenstr. 48',
                    ShipRegion: 'CJ', ShipPostalCode: '44087', ShipCountry: 'Germany', Freight: 11.61, Verified: !1
                },
                {
                    OrderID: 10250, CustomerID: 'HANAR', EmployeeID: 4, OrderDate: new Date(8367642e5),
                    ShipName: 'Hanari Carnes', ShipCity: 'Rio de Janeiro', ShipAddress: 'Rua do Paço, 67',
                    ShipRegion: 'RJ', ShipPostalCode: '05454-876', ShipCountry: 'Brazil', Freight: 65.83, Verified: !0
                },
                {
                    OrderID: 10251, CustomerID: 'VICTE', EmployeeID: 3, OrderDate: new Date(8367642e5),
                    ShipName: 'Victuailles en stock', ShipCity: 'Lyon', ShipAddress: '2, rue du Commerce',
                    ShipRegion: 'CJ', ShipPostalCode: '69004', ShipCountry: 'France', Freight: 41.34, Verified: !0
                },
                {
                    OrderID: 10252, CustomerID: 'SUPRD', EmployeeID: 2, OrderDate: new Date(8368506e5),
                    ShipName: 'Suprêmes délices', ShipCity: 'Charleroi', ShipAddress: 'Boulevard Tirou, 255',
                    ShipRegion: 'CJ', ShipPostalCode: 'B-6000', ShipCountry: 'Belgium', Freight: 51.3, Verified: !0
                },
                {
                    OrderID: 10253, CustomerID: 'HANAR', EmployeeID: 7, OrderDate: new Date(836937e6),
                    ShipName: 'Hanari Carnes', ShipCity: 'Rio de Janeiro', ShipAddress: 'Rua do Paço, 67',
                    ShipRegion: 'RJ', ShipPostalCode: '05454-876', ShipCountry: 'Brazil', Freight: 58.17, Verified: !0
                },
                {
                    OrderID: 10254, CustomerID: 'CHOPS', EmployeeID: 5, OrderDate: new Date(8370234e5),
                    ShipName: 'Chop-suey Chinese', ShipCity: 'Bern', ShipAddress: 'Hauptstr. 31',
                    ShipRegion: 'CJ', ShipPostalCode: '3012', ShipCountry: 'Switzerland', Freight: 22.98, Verified: !1
                },
                {
                    OrderID: 10255, CustomerID: 'RICSU', EmployeeID: 9, OrderDate: new Date(8371098e5),
                    ShipName: 'Richter Supermarkt', ShipCity: 'Genève', ShipAddress: 'Starenweg 5',
                    ShipRegion: 'CJ', ShipPostalCode: '1204', ShipCountry: 'Switzerland', Freight: 148.33, Verified: !0
                },
                {
                    OrderID: 10256, CustomerID: 'WELLI', EmployeeID: 3, OrderDate: new Date(837369e6),
                    ShipName: 'Wellington Importadora', ShipCity: 'Resende', ShipAddress: 'Rua do Mercado, 12',
                    ShipRegion: 'SP', ShipPostalCode: '08737-363', ShipCountry: 'Brazil', Freight: 13.97, Verified: !1
                }
            ],
            columns: [
                { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120, type: 'number' },
                { field: 'CustomerID', width: 140, headerText: 'Customer ID', type: 'string' },
                { field: 'Freight', headerText: 'Freight', textAlign: 'Right', width: 120, format: 'C' },
                { field: 'OrderDate', headerText: 'Order Date', width: 140, format: 'yMd' }
            ],
            height: 330
        });
        grid.appendTo('#Grid');
    }
});
tabObj2.appendTo('#element');

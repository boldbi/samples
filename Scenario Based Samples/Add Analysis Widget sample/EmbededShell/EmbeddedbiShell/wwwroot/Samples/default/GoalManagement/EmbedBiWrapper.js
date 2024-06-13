"use strict";
(function() {  
    
    window.BoldBI = {};

    BoldBI.EmbedType = {
        Component: "component",
        IFrame: "iframe"
    };

    BoldBI.Environment = {
        Cloud: "cloud",
        Enterprise: "enterprise"
    };

    BoldBI.Theme = {
        Off:"off",
        Light: "light",
        Dark: "dark"
    };

    BoldBI.Mode = {
        View: "view",
        Design: "design",
        Connection: "connection",
        DataSoruce: "dataSource"
    };

    BoldBI.IsDependencyLoaded = false;

    var rootUrl = "";
    var baseUrl = "";
    var siteIdentifier = "";
    var dashboardServerApiUrl = "";
    var designerRootUrl = "";
    var childContainer = "";
    var cdnLink = "";
    var cloudDataUrl = "";
    var onSaveFilterFn = "saveFilter";
    var onSaveAsFilterFn = "saveAsFilter";
    var onViewSavedFiltersFn = "openViewSection";
    var onBannerIconClickFn = "onBannerIconClick";
    var beforeWidgetIconRenderedFn = "beforeWidgetIconRendered";
    var onWidgetIconClickFn = "onWidgetIconClick";
    var actionBeginFn = "onActionBeginOfNewDashboardViewer";
    var actionCompleteFn = "onActionCompleteOfNewDashboardViewer";
    var beforeBannerIconRenderFn = "beforeBannerIconRender";
    var beforeOtherRenderFn = "beforeOtherOptionContextMenuRender";
    var onFavoriteChangeFn = "updatefavorite";
    var isWidgetMode = false;
    var widgetName = "";
    var isDashboardViewMode = false;
    var dashboardViewName = "";
    var errorImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjExNzgwNzk4MzhBOTExRTQ4MDMxRTZEMkIzQUQzNjdCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjExNzgwNzk5MzhBOTExRTQ4MDMxRTZEMkIzQUQzNjdCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTE3ODA3OTYzOEE5MTFFNDgwMzFFNkQyQjNBRDM2N0IiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTE3ODA3OTczOEE5MTFFNDgwMzFFNkQyQjNBRDM2N0IiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4RB5yjAAABXklEQVR42rRUsU7DQAzNRWxESMydK2XsAhtiQGHo1LmsZYCBMSNDx3wASJQ1zN0rJjZYOlbqDCsSPxCeq5f0anwtSMHSk52L/c4++85VVRW1KXu14ZwLOn2enK1+Hr48B3evE3ONoQhBcgw1AjKgw+V3YAY8gvz1V4QgOoC6B4b0nQML2inQo/0EXIH4K0hIMslAspsCOQKWKvMuVAEMAMkyE9KmF2LUH3AugQoYK5IbgVob07f0eWJ1ZlLmFDveqjM/JRqhj1QxZOxKYs9nRJ0bTdwHEmM9V7EbhNLNuT4zSkLSSGW5ZNMyi7DjddMiTAL/Ft5YrQd7h3z8+aZwaFPLCaX1t3CkjP1Rssxfj3Omb825wFjvctBnFuGEujCyeCC0FCp2TYiy3qBkSAd6sCF9YmOweVtKxv7P1Qs9DnfAxY7HQaq53vo4qEyOoC4Dz9fEL9MkbEviqGX5FmAA1Vq0VgBUvekAAAAASUVORK5CYII="

    var scriptFiles = [
        "ej1.common.all.min.js",
        "ej2.common.all.min.js",
        "ej.dashboarddesigner.min.js",
    ];

    var cssFiles = [
        "ej1.web.all.min.css",
        "ej2.partone.web.all.min.css",
        "ej2.parttwo.web.all.min.css",
        "ej.designerwidgets.all.min.css",
        "ej.dashboarddesigner.min.css",
    ];

    var embedOptions = {
        serverUrl: "",
        dashboardId: "",
        dashboardPath: "",
        embedContainerId: "",
        embedType: "component",
        environment: "enterprise",
        mode: "view",
        dashboardSettings: {
            showHeader: true,
            showExport: true,
            showRefresh: true,
            showMoreOption: true,
            showInfo: false,
            showFavorite: false,
            showMaximize: false,
            showComments: false,
            onFavoriteIconClick: "",
            beforeIconRender: "",
            onIconClick: "",
        },
        widgetSettings: {
            showExport: true,
            showMaximize: true,
            showMoreOption: true,
            showFilter: true,
            showComments: false,
            beforeIconRender: "",
            onIconClick: "",
        },
        enableFilterOverview: true,
        filterParameters: "",
        filterSettings: {
            showSaveIcon: true,
            showSaveAsIcon: true,
            showSavedFilters: true,
            onSaveFilter: "",
            onSaveAsFilter: "",
            onViewSavedFilters: "",
        },
        dynamicConnection: {
            isEnabled: false,
            identity: "",
        },
        exportSettings: {
            showExcel: true,
            showPDF: true,
            showImage: true,
        },
        height: "768px",
        width: "1024px",
        theme: "light",
        authorizationServer: {
            url: "",
            headers: {

            }
        },
        expirationTime: 0,
        autoRefreshSettings: {
            enabled: false,
            hourlySchedule: {
                hours: 0,
                minutes: 0,
                seconds: 0
            }

        },
        scalingFactor: 1,
        localeSettings: {
            culture: "en-US",
        },
        actionBegin: "",
        actionComplete: "",

    };

    // Customer exposed functions
    BoldBI.create = function(options) {
        if (validateOptions(options)) {
            initializeEmbedOptions(options);
            if (embedOptions.embedType == BoldBI.EmbedType.Component) {
                childContainer = document.createElement("div");
                childContainer.id = embedOptions.embedContainerId + "_embeddedbi";
                document.getElementById(embedOptions.embedContainerId).append(childContainer);
                initializeUrls();
                if (!BoldBI.IsDependencyLoaded) {
                    if (embedOptions.environment === BoldBI.Environment.Cloud) {
                        if (isEmptyOrSpaces(cdnLink) || isEmptyOrSpaces(designerRootUrl)) {
                            getCloudLinks();
                        }
                    } else {
                        loadDepedentFiles();
                    }
                }
            }
            var ele = document.getElementById(embedOptions.embedContainerId);
            if (instance.has(ele, "embeddedBoldBI")) {
                instance.remove(ele, "embeddedBoldBI");
            }
            instance.put(ele, "embeddedBoldBI", this);
            return this;
        }
    };

    BoldBI.destroy = function() {
        instance.remove(document.getElementById(embedOptions.childContainer.Id), "embeddedBoldBI");
    };

    BoldBI.getInstance = function(eleID) {
        return instance.get(document.getElementById(eleID), "embeddedBoldBI");
    };

    BoldBI.loadDashboard = function(dashboardId) {
        if(dashboardId!=undefined){
            embedOptions.dashboardId=dashboardId;
        }
        if (embedOptions.embedType == BoldBI.EmbedType.Component) {
            isWidgetMode = false;
            widgetName = "";
            isDashboardViewMode = false;
            dashboardViewName = "";
            showLoader();
            isDependencyLoaded();
        } else if (this.embedOptions.embedType == BoldBI.EmbedType.IFrame) {
            var iframe = document.createElement('iframe');
            iframe.frameBorder = 0;
            iframe.width = embedOptions.width;
            iframe.height = embedOptions.height;
            iframe.id = embedOptions.embedContainerId + "_" + embedOptions.dashboardId;
            iframe.allowfullscreen = embedOptions.dashboardSettings.showFullScreen;
            iframe.setAttribute("src", embedOptions.serverUrl + "/dashboards/" + embedOptions.dashboardId + "?isembed=true");

            document.getElementById(embedOptions.embedContainerId).appendChild(iframe);
        }
    };

    BoldBI.loadDashboardView = function(name) {
        throwError("loadDashboardView not implemented");
    };

    BoldBI.loadDashboardWidget = function(name) {
        if(isEmptyOrSpaces(name)){
            throwError("Widget name should be empty");
        }
        if (embedOptions.embedType == BoldBI.EmbedType.Component) {  
            isWidgetMode = true;
            widgetName = name;          
            isDashboardViewMode = false;
            dashboardViewName = "";
            showLoader();
            isDependencyLoaded();
        } else if (this.embedOptions.embedType == BoldBI.EmbedType.IFrame) {
            var iframe = document.createElement('iframe');
            iframe.frameBorder = 0;
            iframe.width = embedOptions.width;
            iframe.height = embedOptions.height;
            iframe.id = embedOptions.embedContainerId + "_" + embedOptions.dashboardId;
            iframe.allowfullscreen = embedOptions.dashboardSettings.showFullScreen;
            iframe.setAttribute("src", embedOptions.serverUrl + "/dashboards/" + embedOptions.dashboardId + "?isembed=true");

            document.getElementById(embedOptions.embedContainerId).appendChild(iframe);
        }
    };

    BoldBI.updateFilters = function(filterParameters) {
        var existingDashboardInstance = getDashboardInstance();
        if (existingDashboardInstance != undefined) {
            existingDashboardInstance.option("filterParameters", filterParameters);
        }
    };

    BoldBI.refreshDashboard = function() {

        var existingDashboardInstance = getDashboardInstance();
        if (existingDashboardInstance != undefined) {
            existingDashboardInstance.refresh();
        }
    };

    // Internal functions. Will not be accessible outside of this scope.
    var initializeEmbedOptions = function(options) {
        embedOptions = Object.assign(embedOptions, options);
    };

    var initializeUrls = function() {

        if (embedOptions.environment == BoldBI.Environment.Enterprise) {

            rootUrl = embedOptions.serverUrl.substr(0, embedOptions.serverUrl.indexOf("/bi/") + 3);
            baseUrl = embedOptions.serverUrl;
            siteIdentifier = embedOptions.serverUrl.substr(embedOptions.serverUrl.indexOf("/site/") + 1);
            dashboardServerApiUrl = rootUrl + "/api/" + siteIdentifier;
            designerRootUrl = rootUrl + "/designer";
        } else {

            rootUrl = embedOptions.serverUrl;
            baseUrl = embedOptions.serverUrl;
            siteIdentifier = "";
            dashboardServerApiUrl = rootUrl + "/api/";
        }
    };

    var loadCloudDepedentFiles = function(responseInfo) {
        var responseData = responseInfo.Data;
        cdnLink = responseData.CdnUrl;
        designerRootUrl = responseData.DesignerServerUrl;
        loadDepedentFiles();
    };

    var getCloudLinks = function() {
        xhrRequestHelper("Get", dashboardServerApiUrl + "/system-settings/get-url", {}, {}, loadCloudDepedentFiles)
    };

    var loadDepedentFiles = function() {
        scriptFiles.forEach(function(script) {
            var scriptTag = document.createElement("script");
            scriptTag.type = "text/javascript";
            if (embedOptions.environment === BoldBI.Environment.Enterprise)
                scriptTag.src = rootUrl + "/webdesignerservice/scripts/" + script;
            else
                scriptTag.src = cdnLink + "/scripts/designer/" + script;

            document.head.appendChild(scriptTag);
        });

        cssFiles.forEach(function(css) {
            var cssTag = document.createElement("link");
            cssTag.rel = "stylesheet";
            if (embedOptions.environment === BoldBI.Environment.Enterprise)
                cssTag.href = rootUrl + "/webdesignerservice/themes/" + css;
            else
                cssTag.href = cdnLink + "/css/designer/" + css;

            document.head.appendChild(cssTag);
        });
    };

    var renderDashboard = function(responseInfo) {
        var parameter = "";
        if (!responseInfo.Status) {
            throwError(responseInfo.Message);
        } else {
            var embedResponse = responseInfo.Data;
            embedResponse.ItemDetail = JSON.parse(responseInfo.Data.ItemDetail);
            if (typeof(responseInfo.Data.UserDetail) !== "undefined") {
                embedResponse.UserDetail = JSON.parse(responseInfo.Data.UserDetail);
            }

            document.getElementById(embedOptions.embedContainerId).style.height = embedOptions.height;
            document.getElementById(embedOptions.embedContainerId).style.width = embedOptions.width;

            var dashboardOptions = {
                siteUrl: baseUrl,
                //siteUrl: this.baseUrl+"/site/site1",
                serviceUrl: designerRootUrl,
                dataServiceUrl: designerRootUrl,
                serverUrl: dashboardServerApiUrl,
                viewerSettings: {
                    serviceUrl: designerRootUrl + "/v1.0/design",
                },
                mode: embedOptions.mode,
                IsEmbed: true,
                _isPublic: embedResponse.ItemDetail.IsPublic,
                itemId: embedResponse.ItemDetail.Id,
                dashboardPath: embedResponse.ItemDetail.ItemLocation,
                serviceAuthorizationToken: embedResponse.access_token,
                dashboardName: embedResponse.ItemDetail.Name,
                dashboardDescription: embedResponse.ItemDetail.Description,
                theme: embedOptions.theme,
                filterParameters: parameter + (isEmptyOrSpaces(embedOptions.filterParameters) ? "" : "&") + embedOptions.filterParameters,
                actionBegin: function(arg) {
                    onBoldBIDashboardInstaceActionBegin(arg);
                },
                actionComplete: function(arg) {
                    onBoldBIDashboardInstaceActionComplete(arg);
                },
                beforeNavigateUrlLinking: embedOptions.beforeNavigateUrlLinking,
                beforeBannerIconRender: function(arg) {
                    onBoldBIDashboardBeforeBannerIconRender(arg);
                },
                beforeOtherOptionContextMenuRender: function(arg) {
                    onBoldBIDashboardBeforeOtherOptionContextMenuRender(arg);
                },
                _onSaveFilter: function(arg) {
                    onBoldBIDashboardSaveFilter(arg);
                },
                _onSaveAsFilter: function(arg) {
                    onBoldBIDashboardSaveAsFilter(arg);
                },
                _onViewSavedFilters: function(arg) {
                    onBoldBIDashboardOpenViewSection(arg);
                },
                onBannerIconClick: function(arg) {
                    onBoldBIDashboardBannerIconClick(arg);
                },
                beforeWidgetIconRendered: function(arg) {
                    onBoldBIDashboardBeforeWidgetIconRendered(arg);
                },
                onWidgetIconClick: function(arg) {
                    onBoldBIDashboardWidgetIconClick(arg);
                },
                _onFavoriteStateChange: function(arg) {
                    onBoldBIDashboardUpdatefavorite(arg);
                },

            };

            if(isWidgetMode){
                dashboardOptions.isPinWidget= isWidgetMode;
                dashboardOptions.widgetId= embedResponse.WidgetId;
            }
            if(!embedOptions.dashboardSettings.showHeader){
                dashboardOptions.isHideHeader=true;
            }
            if (embedOptions.dynamicConnection.isEnabled) {
                dashboardOptions.customIdentity = embedOptions.dynamicConnection.identity;
            }
            if (embedOptions.environment == BoldBI.Environment.Enterprise) {
                dashboardOptions.cdnPath = rootUrl + "/webdesignerservice/scripts/";
            } else {
                dashboardOptions.cdnPath = cdnLink + "/scripts/designer/";
            }

            if (embedOptions.autoRefreshSettings.enabled) {
                dashboardOptions.autoRefreshSettings = {
                    mode: "Hourly",
                    hourlySchedule: {
                        hours: embedOptions.autoRefreshSettings.hourlySchedule.hours,
                        minutes: embedOptions.autoRefreshSettings.hourlySchedule.minutes,
                        seconds: embedOptions.autoRefreshSettings.hourlySchedule.seconds
                    }
                };
            }

            if (window.jQuery instanceof Function) {
                var embedContainer = window.jQuery.call(this, "#" + childContainer.id);
                if (window.ejDashboardDesigner instanceof Function) {
                    var existingDashboardInstance = getDashboardInstance();
                    if (existingDashboardInstance != undefined) {
                        existingDashboardInstance.model = Object.assign(existingDashboardInstance.model, dashboardOptions);
                        existingDashboardInstance.redrawDashboard();
                    } else {
                        window.ejDashboardDesigner.call(this, embedContainer, dashboardOptions);
                    }
                } else {
                    throwError("ejDashboardDesigner is not defined");
                }
            } else {
                throwError("jQuery is not defined");
            }
        }

    };

    var isDependencyLoaded = function() {
        if (window.jQuery instanceof Function &&
            window.ej instanceof Object &&
            window.ej.dashboardDesigner instanceof Object &&
            window.ejDashboardDesigner instanceof Function) {
            if (!window.BoldBI.IsDependencyLoaded) {
                window.BoldBI.IsDependencyLoaded = true;
            }
            getAuthorizationToken();

        } else {
            setTimeout(isDependencyLoaded, 500);
        }
    };

    var getDashboardInstance = function() {
        var ele = window.jQuery.call(this, "#" + childContainer.id)[0];
        return window.jQuery.data.call(this, ele, "ejDashboardDesigner");
    };

    var onBoldBIDashboardInstaceActionBegin = function(arg) {

        if (typeof(arg) != "undefined") {
            switch (arg.eventType) {
                case "renderLayout":
                    removeElementsClass(embedOptions.embedContainerId, ".preloader-wrap", "viewer-blue-loader");
                    break;
                default:
                    break;
            }
        }

        var serverFnc = window[actionBeginFn];
        if (serverFnc instanceof Function) {
            serverFnc.call(this, arg);
        }

        var clientFnc = window[embedOptions.actionBegin];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
    };

    var onBoldBIDashboardInstaceActionComplete = function(arg) {

        var serverFnc = window[actionCompleteFn];
        if (serverFnc instanceof Function) {
            serverFnc.call(this, arg);
        }

        var clientFnc = window[embedOptions.actionCompleteFn];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
    };

    var onBoldBIDashboardBeforeBannerIconRender = function(arg) {
        if(!embedOptions.dashboardSettings.showMoreOption || (!embedOptions.dashboardSettings.showRefresh && !embedOptions.dashboardSettings.showExport)){        
            arg.iconsinformation= arraySlice(arg.iconsinformation,"groupName","Option");
        }
        var serverFnc = window[beforeBannerIconRenderFn];
        if (serverFnc instanceof Function) {
            serverFnc.call(this, arg);
        }
        var clientFnc = window[embedOptions.dashboardSettings.beforeIconRender];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
    };

    var onBoldBIDashboardBeforeOtherOptionContextMenuRender = function(arg) {

        if(!embedOptions.dashboardSettings.showRefresh){
            arg.iconsinformation= arraySlice(arg.iconsinformation,"groupName","refresh");
        }
        if(!embedOptions.dashboardSettings.showExport){
            arg.iconsinformation= arraySlice(arg.iconsinformation,"groupName","export");
        }
        var serverFnc = window[beforeOtherRenderFn];
        if (serverFnc instanceof Function) {
            serverFnc.call(this, arg);
        }
    };

    var onBoldBIDashboardSaveFilter = function(arg) {
        var serverFnc = window[onSaveFilterFn];
        if (serverFnc instanceof Function) {
            serverFnc.call(this, arg);
        }

        var clientFnc = window[embedOptions.filterSettings.onSaveFilter];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
    };

    var onBoldBIDashboardSaveAsFilter = function(arg) {
        var serverFnc = window[onSaveAsFilterFn];
        if (serverFnc instanceof Function) {
            serverFnc.call(this, arg);
        }

        var clientFnc = window[embedOptions.filterSettings.onSaveAsFilter];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
    };

    var onBoldBIDashboardOpenViewSection = function(arg) {
        var serverFnc = window[onViewSavedFiltersFn];
        if (serverFnc instanceof Function) {
            serverFnc.call(this, arg);
        }

        var clientFnc = window[embedOptions.filterSettings.onViewSavedFilters];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
    };

    var onBoldBIDashboardBannerIconClick = function(arg) {
        var serverFnc = window[onBannerIconClickFn];
        if (serverFnc instanceof Function) {
            serverFnc.call(this, arg);
        }

        var clientFnc = window[embedOptions.dashboardSettings.onIconClick];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }

        if (typeof(arg.name) != "undefined" && arg.name.toLowerCase() == "theming") {
            var dashboardViewerInstance = getDashboardInstance();
            dashboardViewerInstance.applyDashboardTheme(arg.themeValue);

        }

    };

    var onBoldBIDashboardBeforeWidgetIconRendered = function(arg) {
        if(!embedOptions.widgetSettings.showMaximize){
            arg.iconsinformation= arraySlice(arg.iconsinformation,"name","maximize");
        }
        if(!embedOptions.widgetSettings.showFilter){
            arg.iconsinformation= arraySlice(arg.iconsinformation,"name","filter");
        }
        if(!embedOptions.widgetSettings.showExport){
            arg.iconsinformation= arraySlice(arg.iconsinformation,"name","export");
        }
        if(!embedOptions.widgetSettings.showMoreOption){
            arg.iconsinformation= arraySlice(arg.iconsinformation,"name","menu");
        }
        var serverFnc = window[beforeWidgetIconRenderedFn];
        if (serverFnc instanceof Function) {
            serverFnc.call(this, arg);
        }

        var clientFnc = window[embedOptions.widgetSettings.beforeIconRender];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
    };

    var onBoldBIDashboardWidgetIconClick = function(arg) {
        var serverFnc = window[onWidgetIconClickFn];
        if (serverFnc instanceof Function) {
            serverFnc.call(this, arg);
        }

        var clientFnc = window[embedOptions.widgetSettings.onIconClick];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
    };

    var onBoldBIDashboardUpdatefavorite = function(arg) {
        var serverFnc = window[onFavoriteStateChangeFn];
        if (serverFnc instanceof Function) {
            serverFnc.call(this, arg);
        }
        var clientFnc = window[embedOptions.dashboardSettings.onFavoriteIconClick];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
    };

    var showLoader = function() {
        var loaderStyle = document.createElement('style');
        loaderStyle.innerHTML = `#` + embedOptions.embedContainerId + ` .viewer-blue-loader { display: block !important; }		
		  #` + embedOptions.embedContainerId + ` .loader-icon { display: block; }
		  #` + embedOptions.embedContainerId + ` .loader-icon { left: 0px !important; position: relative; margin: 0px auto; width: 54px; height: 54px; }
		  #` + embedOptions.embedContainerId + ` .loader-icon .circular { -webkit-animation: rotate 2s linear infinite; animation: rotate 2s linear infinite; height: 54px; width: 54px; position: relative; }
		  #` + embedOptions.embedContainerId + ` .loader-icon .path { stroke-dasharray: 1,200; stroke-dashoffset: 0; -webkit-animation: dash 1.5s ease-in-out infinite; animation: dash 1.5s ease-in-out infinite; stroke: #5592FB; stroke-linecap: square; }
		  @keyframes rotate { 100% { transform: rotate(360deg); } }
		  @-webkit-keyframes rotate { 100% { transform: rotate(360deg); } }
		  @keyframes dash { 0% { stroke-dasharray: 1,200; stroke-dashoffset: 0; } 50% { stroke-dasharray: 89,200; stroke-dashoffset: -35; } 100% { stroke-dasharray: 89,200; stroke-dashoffset: -124; } }
		  @-webkit-keyframes dash { 0% { stroke-dasharray: 1,200; stroke-dashoffset: 0; } 50% { stroke-dasharray: 89,200; stroke-dashoffset: -35; } 100% { stroke-dasharray: 89,200; stroke-dashoffset: -124; } }`;
        document.head.appendChild(loaderStyle);

        var loader = "<div class='preloader-wrap viewer-blue-loader' style='display: none; width: " + embedOptions.width + ";height: " + embedOptions.height + "; top: 0; bottom: 0; z-index : 2;'> <div id='loader_image' align='center' style='position:relative;top:45%;'> <div class='loader-blue loader-icon' id='loader-icon'> <svg class='circular'> <circle class='path' cx='27' cy='27' r='20' fill='none' stroke-width='4' stroke-miterlimit='10'></circle> </svg> </div> </div> </div>";
        removeElement("embedded-bi-error");
        document.getElementById(embedOptions.embedContainerId).insertAdjacentHTML('afterbegin', loader);
    };

    var getAuthorizationToken = function() {

        var embedQuerString = "embed_nonce=" + uuidv4Generartor()+
            "&embed_dashboard_id=" + embedOptions.dashboardId +
            "&embed_dashboard_path="+ embedOptions.dashboardPath+
            "&embed_timestamp=" + Math.round((new Date()).getTime() / 1000) +
            "&embed_expirationtime=" + embedOptions.expirationTime;

        if(isWidgetMode){
            embedQuerString = embedQuerString +
                "&embed_widget_isenabled="+isWidgetMode+
                "&embed_widget_name="+widgetName;
        }

        var data = {
            embedQuerString: encodeURI(embedQuerString),
            dashboardServerApiUrl: dashboardServerApiUrl,
        };

        xhrRequestHelper("POST", embedOptions.authorizationServer.url, data, embedOptions.authorizationServer.headers, renderDashboard);

    };

    var xhrRequestHelper = function(type, url, data, headers, callBackFn) {
        var http = new XMLHttpRequest();

        http.open(type, url, true);
        http.responseType = 'json';
        http.setRequestHeader("Content-type", "application/json");

        for (var key in headers) {
            http.setRequestHeader(key, headers[key]);
        }

        http.onreadystatechange = function() {
            if (http.readyState == 4 && http.status == 200) {
                callBackFn.call(this, typeof http.response == "object" ? http.response : JSON.parse(http.response));
            }
            else if(http.readyState == 4 && http.status == 404){
                throwError("Server not found");
            }
            else if(http.readyState==4){
                throwError(http.statusText);
            }
        };

        http.send(JSON.stringify(data));
    };

    var emptyHtml = function(elementID) {
        document.getElementById(elementID).innerHTML = "";
    };

    var removeElement = function(id) {
        var elem = document.getElementById(id);
        if (elem !== null)
            elem.parentNode.removeChild(elem);
    };

    var uuidv4Generartor = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    var isEmptyOrSpaces = function(str) {
        return typeof(str) === "undefined" || str === null || str.match(/^ *$/) !== null;
    };

    var validateOptions = function(options) {
        if (isEmptyOrSpaces(options.serverUrl)) {
            throwError("Server URL cannot be empty");
        }
        if (isEmptyOrSpaces(options.dashboardId) && isEmptyOrSpaces(options.dashboardPath)) {
            throwError("Dashboard id or path cannot be empty");
        }
        if (isEmptyOrSpaces(options.embedContainerId)) {
            throwError("Embedded DOM id cannot be empty");
        }
        return true;
    };

    var throwError = function(errorMsg) {
        removeElementsClass(embedOptions.embedContainerId, ".preloader-wrap", "viewer-blue-loader");
        var errorMessage = "<div id='embedded-bi-error' style='display:table;height:100%;width:100%;'><div style='display: table-cell;vertical-align: middle;text-align: center;'><div style='display: inline-block;'><img src='" + errorImage + "' style='float: left'/><div style='float: left;margin-left: 10px;line-height: 20px;'>BoldBI Embedded: " + errorMsg + "</div></div>";
        document.getElementById(embedOptions.embedContainerId).innerHTML = errorMessage;
        throw "BoldBI Embedded: " + errorMsg;
    };

    var removeElementsClass = function(id, childElement, targeClass) {
        var nodeList = [];
        if (isEmptyOrSpaces(id)) {
            nodeList = document.querySelector(childElement);
        } else if (isEmptyOrSpaces(childElement)) {
            nodeList.push(document.getElementById(id));
        } else {
            nodeList = document.getElementById(id).querySelectorAll(childElement);
        }
        nodeList.forEach(function(element) {
            removeClass(element, targeClass);
        });
    };

    var hasClass = function(el, className) {
        if (el.classList)
            return el.classList.contains(className);
        return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    };

    var addClass = function(el, className) {
        if (el.classList)
            el.classList.add(className)
        else if (!hasClass(el, className))
            el.className += " " + className;
    };

    var removeClass = function(el, className) {
        if (el.classList)
            el.classList.remove(className);
        else if (hasClass(el, className)) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            el.className = el.className.replace(reg, ' ');
        }
    };

    var arraySlice = function(arr,key, value){

        arr.forEach(function(item, index, object) {
            if (item[key] === value) {
              object.splice(index, 1);
            }
        });
        return arr;
    };

    var instance = {
        _storage: new WeakMap(),
        put: function(element, key, obj) {
            if (!this._storage.has(element)) {
                this._storage.set(element, new Map());
            }
            this._storage.get(element).set(key, obj);
        },
        get: function(element, key) {
            return this._storage.get(element).get(key);
        },
        has: function(element, key) {
            return this._storage.has(element) && this._storage.get(element).has(key);
        },
        remove: function(element, key) {
            var ret = this._storage.get(element).delete(key);
            if (this._storage.get(element).size !== 0) {
                this._storage.delete(element);
            }
            return ret;
        }
    };
    return this;
})();
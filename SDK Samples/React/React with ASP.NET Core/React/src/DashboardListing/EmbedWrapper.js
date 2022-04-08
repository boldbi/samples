/* global $ */
/* eslint-disable */
export class BoldBI {
    constructor() {
        this.IsDependencyLoaded = false;

        this.rootUrl = "";
        this.baseUrl = "";
        this.siteIdentifier = "";
        this.dashboardServerApiUrl = "";
        this.designerRootUrl = "";
        this.scheduleEndpointUrl = "";
        this.childContainer = "";
        this.cdnLink = "";
        this.onSaveFilterFn = "saveFilter";
        this.onSaveAsFilterFn = "saveAsFilter";
        this.onViewSavedFiltersFn = "openViewSection";
        this.onBannerIconClickFn = "onBannerIconClick";
        this.beforeWidgetIconRenderedFn = "beforeWidgetIconRendered";
        this.onWidgetIconClickFn = "onWidgetIconClick";
        this.actionBeginFn = "onActionBeginOfNewDashboardViewer";
        this.actionCompleteFn = "onActionCompleteOfNewDashboardViewer";
        this.beforeBannerIconRenderFn = "beforeBannerIconRender";
        this.beforeOtherRenderFn = "beforeOtherOptionContextMenuRender";
        this.isWidgetMode = false;
        this.widgetName = "";
        this.isDashboardViewMode = false;
        this.dashboardViewName = "";
        this.errorImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjExNzgwNzk4MzhBOTExRTQ4MDMxRTZEMkIzQUQzNjdCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjExNzgwNzk5MzhBOTExRTQ4MDMxRTZEMkIzQUQzNjdCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTE3ODA3OTYzOEE5MTFFNDgwMzFFNkQyQjNBRDM2N0IiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTE3ODA3OTczOEE5MTFFNDgwMzFFNkQyQjNBRDM2N0IiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4RB5yjAAABXklEQVR42rRUsU7DQAzNRWxESMydK2XsAhtiQGHo1LmsZYCBMSNDx3wASJQ1zN0rJjZYOlbqDCsSPxCeq5f0anwtSMHSk52L/c4++85VVRW1KXu14ZwLOn2enK1+Hr48B3evE3ONoQhBcgw1AjKgw+V3YAY8gvz1V4QgOoC6B4b0nQML2inQo/0EXIH4K0hIMslAspsCOQKWKvMuVAEMAMkyE9KmF2LUH3AugQoYK5IbgVob07f0eWJ1ZlLmFDveqjM/JRqhj1QxZOxKYs9nRJ0bTdwHEmM9V7EbhNLNuT4zSkLSSGW5ZNMyi7DjddMiTAL/Ft5YrQd7h3z8+aZwaFPLCaX1t3CkjP1Rssxfj3Omb825wFjvctBnFuGEujCyeCC0FCp2TYiy3qBkSAd6sCF9YmOweVtKxv7P1Qs9DnfAxY7HQaq53vo4qEyOoC4Dz9fEL9MkbEviqGX5FmAA1Vq0VgBUvekAAAAASUVORK5CYII=";
        this.pinBoardRendered = true;
        this.pinboardIds = {};
        this.fromColumn, this.toColumn, this.fromPosition, this.toPosition, this.column, this.position = null;

        this.viewerScriptFiles = [
            "ej1.common.all.min.js",
            "ej2.common.all.min.js",
            "ej1.web.all.min.js",
            "ej2.web.all.min.js",
            "designerlocalization.js",
        ];

        this.pinBoardScriptFiles = [
            "bootstrap.min.js"
        ];

        this.ejDependentFiles = [
            "ej.dashboarddesigner.min.js",
        ];

        this.designerScriptFiles = [
            "ej1.web.all.min.js",
            "ej2.web.all.min.js",
            "designerlocalization.js",
        ];

        this.cssFiles = [
            "font-server.min.css",
            "homepages-page.min.css",
            "ej1.web.all.min.css",
            "ej2.partone.web.all.min.css",
            "ej2.parttwo.web.all.min.css",
            "ej.designerwidgets.all.min.css",
            "ej.dashboarddesigner.min.css",
        ];

        this.embedOptions = {
            serverUrl: "",
            dashboardId: "",
            dashboardPath: "",
            datasourceId: "",
            datasourceName: "",
            embedContainerId: "",
            embedType: BoldBI.EmbedType.Component,
            environment: BoldBI.Environment.Enterprise,
            mode: BoldBI.Mode.View,
            dashboardSettings: {
                showHeader: true,
                showExport: true,
                showRefresh: true,
                showMoreOption: true,
                onFavoriteIconClick: "",
                beforeIconRender: "",
                onIconClick: "",
                onInteraction: "",
                enableTheme: true,
                enableFilterOverview: true,
                enableFullScreen: false
            },
            widgetSettings: {
                showExport: true,
                showMaximize: true,
                showMoreOption: true,
                showFilter: true,
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
                showCSV: true,
            },
            height: "768px",
            width: "1024px",
            theme: BoldBI.Theme.Light,
            authorizationServer: {
                url: "",
                headers: {

                },
                authorizionComplete: ""
            },
            expirationTime: 86400,
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
            beforeContextMenuRnder: "",
            beforeNavigateUrlLinking: "",
            beforeNavigateToDashboard: "",
            toolbarSettings: {
                showToolbar: true
            },
            pinboardName: "",
            enablePinboardHeader: true,
            onUnpin: "",
            onDrag: "",
            onDrop: "",
            onLayoutChange: "",
            onResize: "",
            //multipleDatasource: []
        };
    }


    // Customer exposed functions
    static create(options) {
        var boldBIObj = new BoldBI();
        if (document.addEventListener) {
            document.addEventListener('webkitfullscreenchange', boldBIObj._fullscreenExitHandler, false);
            document.addEventListener('mozfullscreenchange', boldBIObj._fullscreenExitHandler, false);
            document.addEventListener('fullscreenchange', boldBIObj._fullscreenExitHandler, false);
            document.addEventListener('MSFullscreenChange', boldBIObj._fullscreenExitHandler, false);
            window.addEventListener('resize', function (event) {
                if (!boldBIObj._isEmptyOrSpaces(boldBIObj.embedOptions.pinboardName) || !boldBIObj._isNullOrUndefined(this.embedOptions.pinboardName)) {
                    boldBIObj.setListMinimumHeight();
                }
            });
        }
        if (boldBIObj._validateOptions(options)) {
            boldBIObj._initializeEmbedOptions(options);
            if (boldBIObj.embedOptions.embedType == BoldBI.EmbedType.Component) {
                boldBIObj.childContainer = document.createElement("div");
                boldBIObj.childContainer.id = boldBIObj.embedOptions.embedContainerId + "_embeddedbi";
                if (document.getElementById(boldBIObj.embedOptions.embedContainerId) === null) {
                    var dbrdContainer = $(document.getElementById(document.querySelector('[id$="multi_tab_dashboard"]').id)).parent();
                    dbrdContainer.html('');
                    dbrdContainer.append('<div id="' + boldBIObj.embedOptions.embedContainerId + '"></div>');
                    document.getElementById(boldBIObj.embedOptions.embedContainerId).append(boldBIObj.childContainer);
                } else {
                    document.getElementById(boldBIObj.embedOptions.embedContainerId).append(boldBIObj.childContainer);
                }
                boldBIObj._initializeUrls();
                if (!boldBIObj.IsDependencyLoaded) {
                    if (boldBIObj.embedOptions.environment === BoldBI.Environment.Cloud) {
                        if (boldBIObj._isEmptyOrSpaces(boldBIObj.cdnLink) || boldBIObj._isEmptyOrSpaces(boldBIObj.designerRootUrl)) {
                            boldBIObj._getCloudLinks();
                        }
                    } else {
                        boldBIObj._loadDepedentFiles();
                    }
                }
            }
            var ele = document.getElementById(boldBIObj.embedOptions.embedContainerId);
            if (BoldBI._instance.has(ele, "embeddedBoldBI")) {
                BoldBI._instance.remove(ele, "embeddedBoldBI");
            }

            var retObj = Object.assign(boldBIObj)
            BoldBI._instance.put(ele, "embeddedBoldBI", retObj);
            return retObj;
        }
    };

    static getInstance(eleID) {
        return BoldBI._instance.get(document.getElementById(eleID), "embeddedBoldBI");
    };

    destroy() {
        var that = this;
        var embedContainerId = this.embedOptions.embedContainerId;
        var existingDashboardInstance = this._getDashboardInstance();
        if (existingDashboardInstance != undefined) {
            existingDashboardInstance.destroy();
        }
        BoldBI._instance.remove(document.getElementById(embedContainerId), "embeddedBoldBI");
        document.getElementById(embedContainerId).innerHTML = "";

        document.querySelectorAll('link').forEach(function (node) {
            that.cssFiles.forEach(function (file) {
                if (node.href.toLowerCase().indexOf(file.toLowerCase()) !== -1) {
                    node.parentNode.removeChild(node);
                }
            });
        });
    };

    loadDashboard(dashboardId) {
        if (this.embedOptions.mode !== BoldBI.Mode.View) {
            this._throwError("Invalid embed mode");
        }
        if (this.embedOptions.pinboardName !== '') {
            this._throwError("Invalid embed pinboard");
        }
        if (dashboardId != undefined) {
            this.embedOptions.dashboardId = dashboardId;
        }
        if (this.embedOptions.embedType == BoldBI.EmbedType.Component) {
            this.isWidgetMode = false;
            this.widgetName = "";
            this.isDashboardViewMode = false;
            this.dashboardViewName = "";
            this._showLoader();
            this._isDependencyLoaded(this);
        } else if (this.embedOptions.embedType == BoldBI.EmbedType.IFrame) {
            var iframe = document.createElement('iframe');
            iframe.frameBorder = 0;
            iframe.width = this.embedOptions.width;
            iframe.height = this.embedOptions.height;
            iframe.id = this.embedOptions.embedContainerId + "_" + this.embedOptions.dashboardId;
            iframe.allowfullscreen = this.embedOptions.dashboardSettings.showFullScreen;
            iframe.setAttribute("src", this.embedOptions.serverUrl + "/dashboards/" + this.embedOptions.dashboardId + "?isembed=true");

            document.getElementById(this.embedOptions.embedContainerId).appendChild(iframe);
        }
    };

    loadPinboard() {
        if (this.embedOptions.pinboardName === '') {
            this._throwError("Invalid embed pinboard");
        }
        if (this.embedOptions.embedType == BoldBI.EmbedType.Component) {
            this.isWidgetMode = false;
            this.widgetName = "";
            this.isDashboardViewMode = false;
            this.dashboardViewName = "";
            this._showLoader();
            this._isDependencyLoaded(this);
        } else if (this.embedOptions.embedType == BoldBI.EmbedType.IFrame) {
            var iframe = document.createElement('iframe');
            iframe.frameBorder = 0;
            iframe.width = this.embedOptions.width;
            iframe.height = this.embedOptions.height;
            iframe.id = this.embedOptions.embedContainerId + "_" + this.embedOptions.dashboardId;
            iframe.allowfullscreen = this.embedOptions.dashboardSettings.showFullScreen;
            iframe.setAttribute("src", this.embedOptions.serverUrl + "/dashboards/" + this.embedOptions.dashboardId + "?isembed=true");

            document.getElementById(this.embedOptions.embedContainerId).appendChild(iframe);
        }
    }

    loadDashboardView(name) {
        this._throwError("loadDashboardView not implemented");
    };

    loadDashboardWidget(name, dashboardId) {
        if (this._isEmptyOrSpaces(name)) {
            this._throwError("Widget name should be empty");
        }
        if (this.embedOptions.pinboardName !== '' && this.pinBoardRendered) {
            this._throwError("Invalid embed pinboard");
        }
        if (this.embedOptions.embedType == BoldBI.EmbedType.Component) {
            this.isWidgetMode = true;
            this.widgetName = name;
            this.isDashboardViewMode = false;
            this.dashboardViewName = "";
            this._showLoader();
            this._isDependencyLoaded(this, dashboardId);
        } else if (this.embedOptions.embedType == BoldBI.EmbedType.IFrame) {
            var iframe = document.createElement('iframe');
            iframe.frameBorder = 0;
            iframe.width = this.embedOptions.width;
            iframe.height = this.embedOptions.height;
            iframe.id = this.embedOptions.embedContainerId + "_" + this.embedOptions.dashboardId;
            iframe.allowfullscreen = this.embedOptions.dashboardSettings.showFullScreen;
            iframe.setAttribute("src", this.embedOptions.serverUrl + "/dashboards/" + this.embedOptions.dashboardId + "?isembed=true");

            document.getElementById(this.embedOptions.embedContainerId).appendChild(iframe);
        }
    };

    loadDesigner(dashboardId) {
        if (this.embedOptions.mode === BoldBI.Mode.View) {
            this._throwError("Invalid embed mode");
        }
        if (this.embedOptions.pinboardName !== '') {
            this._throwError("Invalid embed pinboard");
        }
        if (dashboardId != undefined) {
            this.embedOptions.dashboardId = dashboardId;
        }
        if (this.embedOptions.embedType == BoldBI.EmbedType.Component) {
            this.isWidgetMode = false;
            this.widgetName = "";
            this.isDashboardViewMode = false;
            this.dashboardViewName = "";
            this._showLoader();
            this._isDependencyLoaded(this);
        } else if (this.embedOptions.embedType == BoldBI.EmbedType.IFrame) {
            var iframe = document.createElement('iframe');
            iframe.frameBorder = 0;
            iframe.width = this.embedOptions.width;
            iframe.height = this.embedOptions.height;
            iframe.id = this.embedOptions.embedContainerId + "_" + this.embedOptions.dashboardId;
            iframe.allowfullscreen = this.embedOptions.dashboardSettings.showFullScreen;
            iframe.setAttribute("src", this.embedOptions.serverUrl + "/dashboard-designer/" + this.embedOptions.dashboardId + "?isembed=true");

            document.getElementById(this.embedOptions.embedContainerId).appendChild(iframe);
        }
    };

    updateFilters(filterParameters) {
        var existingDashboardInstance = this._getDashboardInstance();
        if (existingDashboardInstance != undefined) {
            existingDashboardInstance.option("filterParameters", filterParameters);
        }
    };

    resizeDashboard(filterParameters) {
        var existingDashboardInstance = this._getDashboardInstance();
        if (existingDashboardInstance != undefined) {
            var clientFnc = window[that.embedOptions.onResize];
            if (clientFnc instanceof Function) {
                clientFnc.call(this, existingDashboardInstance);
            }
            if (this.embedOptions.onResize instanceof Function) {
                this.embedOptions.onResize.call(this, existingDashboardInstance);
            }
            existingDashboardInstance.resizeDashboard();
        }
    };

    refreshDashboard() {
        var existingDashboardInstance = this._getDashboardInstance();
        if (existingDashboardInstance != undefined) {
            existingDashboardInstance.updateDashboard();
        }
    };

    // Internal functions. Will not be accessible outside of this scope.
    _initializeEmbedOptions(options) {
        this.embedOptions = Object.assign(this.embedOptions, options);
    };

    _initializeUrls() {
        if (this.embedOptions.environment == BoldBI.Environment.Enterprise) {
            this.rootUrl = this.embedOptions.serverUrl.substr(0, this.embedOptions.serverUrl.indexOf("/bi/") + 3);
            this.baseUrl = this.embedOptions.serverUrl;
            this.siteIdentifier = this.embedOptions.serverUrl.substr(this.embedOptions.serverUrl.indexOf("/site/") + 1);
            this.dashboardServerApiUrl = this.rootUrl + "/api/" + this.siteIdentifier; //"http://localhost:51778/bi" + "/api/" + this.siteIdentifier;
            this.designerRootUrl = this.rootUrl + "/designer";
        } else {
            this.rootUrl = this.embedOptions.serverUrl;
            this.baseUrl = this.embedOptions.serverUrl;
            this.siteIdentifier = "";
            this.dashboardServerApiUrl = this.rootUrl + "/api/";
        }
        this.scheduleEndpointUrl = this.baseUrl + "/datasources/recurrence-type-page";
    };

    _loadCloudDepedentFiles(responseInfo) {
        var responseData = responseInfo.Data;
        this.cdnLink = responseData.CdnUrl;
        this.designerRootUrl = responseData.DesignerServerUrl;
        this._loadDepedentFiles();
    };

    _getCloudLinks() {
        this._xhrRequestHelper("Get", this.dashboardServerApiUrl + "/system-settings/get-url", {}, {}, this._loadCloudDepedentFiles)
    };

    _loadDepedentFiles() {
        if (this.embedOptions.mode === BoldBI.Mode.Design) {
            this._addedDependentFiles(this, this.designerScriptFiles, false);
        }
        else {
            this._addedDependentFiles(this, this.viewerScriptFiles, false);
        }

        if (this.embedOptions.pinboardName !== "") {
            this._addedDependentFiles(this, this.pinBoardScriptFiles, false);
        }

        this._addedDependentFiles(this, this.cssFiles, true);
        this._loadDependentDesignerFiles(this);
    };

    _loadDependentDesignerFiles(that) {
        if (window.ej instanceof Object &&
            window.ej.createObject instanceof Function &&
            window.Designer instanceof Object) {
            that._addedDependentFiles(that, that.ejDependentFiles, false);

        } else {
            setTimeout(that._loadDependentDesignerFiles, 50, that);
        }
    };

    _addedDependentFiles(that, fileUriArray, isCSS) {
        var fileUri = "";
        fileUriArray.forEach(function (file) {
            if (!that._checkDepedentFileExists(file, isCSS)) {
                if (isCSS) {
                    if (that.embedOptions.environment === BoldBI.Environment.Enterprise) {
                        if (file === "font-server.min.css")
                            fileUri = that.rootUrl + "/cdn/css/" + file;
                        else if (file === "bootstrap.min.css")
                            fileUri = that.rootUrl + "/Content/Styles/Bootstrap/" + file;
                        else if (file === "homepages-page.min.css")
                            fileUri = that.rootUrl + "/cdn/css/" + file;
                        else
                            fileUri = that.rootUrl + "/webdesignerservice/themes/" + file;
                    }
                    else {
                        if (file === "font-server.css")
                            fileUri = that.cdnLink + "/css/" + file;
                        else if (file === "bootstrap.min.css")
                            fileUri = that.cdnLink + "/css/" + file;
                        else if (file === "homepages-page.min.css")
                            fileUri = that.cdnLink + "/css/" + file;
                        else
                            fileUri = that.cdnLink + "/css/designer/" + file;
                    }

                    var cssTag = document.createElement("link");
                    cssTag.rel = "stylesheet";
                    cssTag.href = fileUri;
                    if ($("link[href='" + fileUri + "']").length < 1)
                        document.head.appendChild(cssTag);
                }
                else {
                    if (that.embedOptions.environment === BoldBI.Environment.Enterprise) {
                        if (file === 'bootstrap.min.js')
                            fileUri = that.rootUrl + "/cdn/scripts/" + file;
                        //fileUri = that.rootUrl + "/scripts/bootstrap/" + file;
                        else if (file === "designerlocalization.js")
                            //fileUri = that.rootUrl + "/designer/scripts/" + file;
                            fileUri = that.rootUrl + "/designer/localization/" + file;
                        else
                            fileUri = that.rootUrl + "/cdn/scripts/designer/" + file;
                        //fileUri = that.rootUrl + "/webdesignerservice/scripts/" + file;
                    }
                    else {
                        if (file === 'bootstrap.min.js')
                            fileUri = that.cdnLink + "/scripts/" + file;
                        else if (file === "designerlocalization.js")
                            fileUri = that.designerRootUrl + "/localization/" + file;
                        else
                            fileUri = that.cdnLink + "/scripts/designer/" + file;
                    }

                    var scriptTag = document.createElement("script");
                    scriptTag.type = "text/javascript";
                    scriptTag.src = fileUri;
                    if ($("script[src='" + fileUri + "']").length < 1)
                        document.head.appendChild(scriptTag);
                }
            }
        }.bind(that));
        if (that.embedOptions.pinboardName !== "") {
            $("<style type='text/css'> .e-dbrd-designcanvas-container{ border-width: 0 0 0 0 !important; background-color: #fff !important; overflow: hidden !important;} .e-canvas.e-dbrd-control-container{ box-shadow: none !important} </style>").appendTo("head");
        }
    };

    _checkDepedentFileExists(file, isCSS) {
        var isFileExists = false;
        var selectItem = isCSS ? "link" : "script";
        var tagList = document.head.querySelectorAll(selectItem);
        tagList.forEach(function (tag) {
            if (!isFileExists) {
                if (isCSS) {
                    isFileExists = tag.href.indexOf(file) !== -1;
                }
                else {
                    isFileExists = tag.src.indexOf(file) !== -1;
                }
            }
        });

        return isFileExists;
    };

    _renderDashboard(responseInfo) {
        var that = this;
        var parameter = "";
        if (!responseInfo.Status) {
            this._throwError(responseInfo.Message);
        } else {
            var embedResponse = responseInfo.Data;
            if (this.embedOptions.pinboardName !== "" && $.isEmptyObject(this.pinboardIds)) {
                this._renderPinboard(embedResponse);
            } else if (embedResponse.length) {
                this._renderMultiTabDashboard(embedResponse);
            }
            else {
                embedResponse.ItemDetail = JSON.parse(responseInfo.Data.ItemDetail);
                var embedContainerId = !$.isEmptyObject(this.pinboardIds) ? this.pinboardIds[embedResponse.WidgetId] : !ej.isNullOrUndefined(document.getElementById(this.embedOptions.embedContainerId)) ? this.embedOptions.embedContainerId : 'multi_' + embedResponse.ItemDetail.Id;
                var height = !$.isEmptyObject(this.pinboardIds) ? $('#' + embedContainerId).height() : (!ej.isNullOrUndefined(document.getElementById(this.embedOptions.embedContainerId)) ? this.embedOptions.height : (parseInt(this.embedOptions.height) - 36 + 'px'));
                if (typeof (responseInfo.Data.UserDetail) !== "undefined") {
                    embedResponse.UserDetail = JSON.parse(responseInfo.Data.UserDetail);
                }

                this._onBoldBIAuthorizionComplete(embedResponse);
                document.getElementById(embedContainerId).style.height = height;
                document.getElementById(embedContainerId).style.width = this.embedOptions.width;

                var dashboardOptions = {
                    siteUrl: this.baseUrl,
                    serviceUrl: this.designerRootUrl,
                    dataServiceUrl: this.designerRootUrl,
                    serverUrl: this.dashboardServerApiUrl,
                    viewerSettings: {
                        serviceUrl: this.designerRootUrl + "/v1.0/design",
                    },
                    localeSettings: {
                        culture: this.embedOptions.localeSettings.culture
                    },
                    mode: this.embedOptions.mode,
                    environment: this.embedOptions.environment,
                    IsEmbed: true,
                    _isPublic: embedResponse.ItemDetail.IsPublic,
                    itemId: embedResponse.ItemDetail.Id,
                    dashboardPath: embedResponse.ItemDetail.ItemLocation,
                    serviceAuthorizationToken: embedResponse.access_token,
                    dashboardName: embedResponse.ItemDetail.Name,
                    dashboardDescription: embedResponse.ItemDetail.Description,
                    theme: this.embedOptions.theme,
                    enableTheme: this.embedOptions.dashboardSettings.enableTheme,
                    enableFilterOverview: this.embedOptions.dashboardSettings.enableFilterOverview,
                    isPinWidget: !$.isEmptyObject(this.pinboardIds),
                    export: {
                        Image: this.embedOptions.exportSettings.showImage,
                        Excel: this.embedOptions.exportSettings.showExcel,
                        Pdf: this.embedOptions.exportSettings.showPDF
                    },
                    filterParameters: parameter + (this._isEmptyOrSpaces(this.embedOptions.filterParameters) ? "" : "&") + this.embedOptions.filterParameters,
                    actionBegin: function (arg) {
                        that._onBoldBIDashboardInstaceActionBegin(arg, embedContainerId);
                    },
                    actionComplete: function (arg) {
                        that._onBoldBIDashboardInstaceActionComplete(arg);
                    },
                    beforeBannerIconRender: function (arg) {
                        that._onBoldBIDashboardBeforeBannerIconRender(arg);
                    },
                    beforeOtherOptionContextMenuRender: function (arg) {
                        that._onBoldBIDashboardBeforeOtherOptionContextMenuRender(arg);
                    },
                    _onSaveFilter: function (arg) {
                        that._onBoldBIDashboardSaveFilter(arg);
                    },
                    _onSaveAsFilter: function (arg) {
                        that._onBoldBIDashboardSaveAsFilter(arg);
                    },
                    _onViewSavedFilters: function (arg) {
                        that._onBoldBIDashboardOpenViewSection(arg);
                    },
                    onBannerIconClick: function (arg) {
                        that._onBoldBIDashboardBannerIconClick(arg);
                    },
                    beforeWidgetIconRendered: function (arg) {
                        that._onBoldBIDashboardBeforeWidgetIconRendered(arg);
                    },
                    onWidgetIconClick: function (arg) {
                        that._onBoldBIDashboardWidgetIconClick(arg);
                    },
                    _onFavoriteStateChange: function (arg) {
                        that._onBoldBIDashboardUpdatefavorite(arg);
                    },
                    onExportRender: function (arg) {
                        that._onBoldBIWidgetExportRender(arg);
                    },
                    beforeNavigateUrlLinking: function (arg) {
                        that._onBoldBIBeforeNavigateUrlLinking(arg);
                    },
                    beforeControlMenuOpen: function (arg) {
                        that._onBoldBIBeforeControlMenuOpen(arg);
                    }
                };

                if (this.embedOptions.mode == BoldBI.Mode.Design) {
                    if (embedResponse.ItemDetail.IsDraft) {
                        dashboardOptions.dashboardPath = "";
                        var datasourceId = !this._isEmptyOrSpaces(embedResponse.DatasourceId) ? embedResponse.DatasourceId : "";
                        if (!this._isEmptyOrSpaces(datasourceId)) {
                            dashboardOptions.datasource = datasourceId;
                        }
                    }

                    //if (this.embedOptions.multipleDatasource.length > 0) {
                    //    dashboardOptions.datasources = this.embedOptions.multipleDatasource;
                    //}

                    dashboardOptions.schedule = {
                        endPoint: this.scheduleEndpointUrl,
                        summaryText: ''
                    };
                    dashboardOptions.serverSettings = {
                        isAdmin: typeof (embedResponse.IsAdmin) === "undefined" ? false : embedResponse.IsAdmin,
                    };
                    dashboardOptions.intermediateDbStatus = embedResponse.IntermediateDbStatus;
                    dashboardOptions.connectionList = embedResponse.ConnectionList;
                    dashboardOptions.isAllowUserToCreateDatasource = embedResponse.CanCreateDatasource;
                    dashboardOptions.enablePublicDashboardSetting = false;
                    dashboardOptions.beforeNavigateToDashboard = function (arg) {
                        that._onBoldBIBeforeNavigateToDashboard(arg);
                    };
                    dashboardOptions.toolbarSettings = {
                        showToolbar: this.embedOptions.toolbarSettings.showToolbar,
                    };
                    if (this.embedOptions.environment == BoldBI.Environment.Enterprise) {
                        dashboardOptions.configuration = this.rootUrl + "/webdesignerservice/scripts/settings/" + embedResponse.Branding + "/settings.min.js";
                    } else {
                        dashboardOptions.configuration = this.cdnLink + "/scripts/settings/" + embedResponse.Branding + "/settings.min.js";
                    }
                }

                if (this.isWidgetMode) {
                    dashboardOptions.isPinWidget = this.isWidgetMode;
                    dashboardOptions.widgetId = embedResponse.WidgetId;
                }
                if (this.embedOptions.dashboardSettings.showHeader === false) {
                    dashboardOptions.isHideHeader = true;
                } else {
                    dashboardOptions.isHideHeader = false;
                }

                if (this.embedOptions.dynamicConnection.isEnabled) {
                    dashboardOptions.customIdentity = this.embedOptions.dynamicConnection.identity;
                }
                //if (this.embedOptions.environment == BoldBI.Environment.Enterprise) {
                //    dashboardOptions.cdnPath = this.rootUrl + "/webdesignerservice/scripts/";
                //} else {
                //    dashboardOptions.cdnPath = this.cdnLink + "/scripts/designer/";
                //}

                if (this.embedOptions.autoRefreshSettings.enabled) {
                    dashboardOptions.enableAutoRefresh = true;
                    dashboardOptions.autoRefreshSettings = {
                        intervalSettings: {
                            mode: "Hourly",
                            hourlySchedule: {
                                hours: this.embedOptions.autoRefreshSettings.hourlySchedule.hours,
                                minutes: this.embedOptions.autoRefreshSettings.hourlySchedule.minutes,
                                seconds: this.embedOptions.autoRefreshSettings.hourlySchedule.seconds
                            }
                        }
                    };
                }

                if (window.jQuery instanceof Function) {
                    var embedContainer = window.jQuery.call(that, "#" + (!$.isEmptyObject(this.pinboardIds) ? (embedContainerId + '_embeddedbi') : that.childContainer.id));
                    var embedChildId;
                    if (embedContainer.length === 0) {
                        embedContainer = window.jQuery.call(that, "#" + embedContainerId + '_embeddedbi');
                        embedChildId = embedContainerId + '_embeddedbi';
                    }
                    if (window.ejDashboardDesigner instanceof Function) {
                        var existingDashboardInstance = this._getDashboardInstance(embedChildId);
                        if (existingDashboardInstance != undefined) {
                            existingDashboardInstance.model = Object.assign(existingDashboardInstance.model, dashboardOptions);
                            existingDashboardInstance.redrawDashboard();
                        } else {
                            window.ejDashboardDesigner.call(that, embedContainer, dashboardOptions);
                        }
                    } else {
                        this._throwError("ejDashboardDesigner is not defined");
                    }
                } else {
                    this._throwError("jQuery is not defined");
                }
                this._removeElementsClass(embedContainerId, ".preloader-wrap", "viewer-blue-loader");
            }
        }
    }

    _renderPinboard(itemDetail) {
        var widgetContainer = $('<div id="server-app-container" style="background: #f9f9f9; overflow: hidden !important;min-height: 600px"><div id="content-area" class="clearfix col-xs-12 e-waitingpopup e-js" style="padding: 0;padding-bottom: 30px"><div id="homepage-page-container"><div id="homepage-header" style="display:' + (this.embedOptions.enablePinboardHeader ? "block" : "none") + '"><div id="element-container"><div id="homepage-menu" style="margin-top: 5px"><span id="homepage-list-container" style="font-size: 15px;width: 165px;line-height: 18px;padding: 25px;">' + this.embedOptions.pinboardName + '</span></div><div id="options-container"><div id="pinboard-fullscreen" class="server-banner-icon e-dashboard-banner-icon e-dbrd-designer-hoverable su su-maximize-1 e-icon-dbrd-theme" data-tooltip="Fullscreen" data-name="fullscreen" data-event="true" style="font-size: 14px;display: block;float: left;margin: 8px 15px 0 7px; cursor: pointer"></div><div id="divider"></div><div id="layout-container"><div id="layout" class="dropdown-toggle" data-toggle="dropdown">Edit Layout</div><div class="dropdown-menu" id="layout-items" role="menu"><span class="su su-single-column" id="1"></span><span class="su su-two-column" id="11"></span><span class="su su-small-big-column" id="12"></span><span class="su su-big-small-column" id="21"></span><span class="su su-three-column" id="111"></span></div></div></div></div></div><div id="widget-container" data-homepage-id="" data-current-layout="" data-virtual-homepage="" style="margin-bottom: 30px"></div></div></div></div>');
        $('#' + this.embedOptions.embedContainerId).append(widgetContainer);
        this._createPinboardDom(itemDetail);
        this._renderItem(itemDetail);
        this._removeElementsClass(this.embedOptions.embedContainerId, ".preloader-wrap", "viewer-blue-loader");
        var that = this;
        $(document).on("click", ".unpin-widget", function (e) {
            e.preventDefault();
            var unpinWidgetInstance = $('#' + $(e.target).parents('li').find('.pinWidget').attr('id') + '_embeddedbi').data('ejDashboardDesigner');
            var clientFnc = window[that.embedOptions.onUnpin];
            if (clientFnc instanceof Function) {
                clientFnc.call(this, unpinWidgetInstance);
            }
            if (that.embedOptions.onUnpin instanceof Function) {
                that.embedOptions.onUnpin.call(that, unpinWidgetInstance);
            }
            that.column = parseInt($(this).closest("ul").attr("data-column-id"));
            that.position = $(this).parents('li').index() + 1;
            that._unPinItem(that.column, that.position, event);
        });

        $(document).on("click", "#pinboard-fullscreen", function (e) {
            var embedElement = $('#server-app-container')[0];
            if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
                $('#server-app-container').removeAttr('style');
                $('#server-app-container').attr('style', 'background-color: #f9f9f9; overflow: auto !important');
                if (embedElement.requestFullscreen) {
                    embedElement.requestFullscreen();
                } else if (embedElement.msRequestFullscreen) {
                    embedElement.msRequestFullscreen();
                } else if (embedElement.mozRequestFullScreen) {
                    embedElement.mozRequestFullScreen();
                } else if (embedElement.webkitRequestFullscreen) {
                    embedElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                } else {
                    if ("ActiveXObject" in window) {
                        var wscript = new ActiveXObject("Wscript.shell");
                        wscript.SendKeys("{F11}");
                        setTimeout(function () {
                            if ((screen.availHeight || screen.height - 30) <= window.innerHeight) {
                                $("body").addClass("hide-dashboard-icons");
                                $("#pinboard-fullscreen").removeClass("su-maximize-1").addClass("su-minimize").attr("data-tooltip", "Exit Fullscreen");
                            } else {
                                $("body").removeClass("hide-dashboard-icons");
                                $("#pinboard-fullscreen").addClass("su-maximize-1").removeClass("su-minimize").attr("data-tooltip", "Fullscreen");
                            }
                        }, 400);
                    }
                }
            } else {
                $('#server-app-container').attr('style', 'background-color: #f9f9f9; height:' + $("#content-area").height() + 'px;overflow: hidden !important;min-height: 600px');
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }
        });

        $(document).on("click", "#layout-items span", function () {
            var clientFnc = window[that.embedOptions.onLayoutChange];
            if (clientFnc instanceof Function) {
                clientFnc.call(this, $("#widget-container"));
            }
            if (that.embedOptions.onLayoutChange instanceof Function) {
                that.embedOptions.onLayoutChange.call(that, $("#widget-container"));
            }
            var currentLayout = $("#widget-container").attr("data-current-layout");
            $("#widget-container").attr("data-current-layout", $(this).attr("id"));
            $("#layout-items span").removeClass("active");
            $(this).addClass("active");
            switch ($(this).attr("id")) {
                case "1":
                    if (currentLayout != "1") {
                        that.changeLayout(1);
                        if (currentLayout == "111") {
                            that.appendListItem(1, 2);
                        }
                        else if (currentLayout == "11" || currentLayout == "12" || currentLayout == "21") {
                            that.appendListItem(1, 1);
                        }
                        that._setLayout(1);
                    }
                    break;
                case "11":
                    if (currentLayout != "11") {
                        that.changeLayout(11);
                        if (currentLayout == "111") {
                            that.appendListItem(2, 1);
                        }
                        else if (currentLayout == "1") {
                            that.createEmptyList(2, 2);
                        }
                        that._setLayout(11);
                    }
                    break;
                case "12":
                    if (currentLayout != "12") {
                        that.changeLayout(12);
                        if (currentLayout == "111") {
                            that.appendListItem(2, 1);
                        }
                        else if (currentLayout == "1") {
                            that.createEmptyList(2, 2);
                        }
                        that._setLayout(12);
                    }
                    break;
                case "21":
                    if (currentLayout != "21") {
                        that.changeLayout(21);
                        if (currentLayout == "111") {
                            that.appendListItem(2, 1);
                        }
                        else if (currentLayout == "1") {
                            that.createEmptyList(2, 2);
                        }
                        that._setLayout(21);
                    }
                    break;
                case "111":
                    if (currentLayout != "111") {
                        that.changeLayout(111);
                        if (currentLayout == "1") {
                            that.createEmptyList(2, 3);
                        }
                        else if (currentLayout == "11" || currentLayout == "12" || currentLayout == "21") {
                            that.createEmptyList(3, 3);
                        }
                        that._setLayout(111);
                    }
                    break;
            }
        });
    }

    createEmptyList(from, to) {
        for (var i = from; i <= to; i++) {
            $("#widget-container").append("<ul id='column-" + i + "' data-column-id='" + i + "' data-child-count='0'><li class='empty click-container'><div class='empty-content empty-homepage'><span class='drag-widget'>Drag your widgets here to customize layout</span></div></li></ul>");
        }
    }

    appendListItem(appendTo, count) {
        for (var i = appendTo + 1; i <= appendTo + count; i++) {
            if ($("#column-" + i + " li:not(.empty)").length > 0) {
                $("#column-" + appendTo + " li.empty").remove();
            }
            $("#column-" + appendTo).append($("#column-" + i + " li:not(.empty)"));
            $("#column-" + i).remove();
        }
    }

    changeLayout(layout) {
        var homepageItemId = $("#widget-container").attr("data-homepage-id");
        var that = this;
        var isVirtualHomepage = $("#widget-container").attr("data-virtual-homepage");
        if (homepageItemId === "" && isVirtualHomepage === "true") {
            homepageItemId = saveVirtualHomepage();
            $("#initial-message").hide();
        }
        var embedQuerString = "embed_nonce=" + this._uuidv4Generartor() +
            "&homepageId=" + homepageItemId +
            "&layout=" + layout +
            "&embed_mode=" + this.embedOptions.mode +
            "&embed_timestamp=" + Math.round((new Date()).getTime() / 1000) +
            "&embed_expirationtime=" + this.embedOptions.expirationTime;
        var data = {
            embedQuerString: encodeURI(embedQuerString),
            dashboardServerApiUrl: this.dashboardServerApiUrl
        };
        this._xhrRequestHelper("POST", this.embedOptions.authorizationServer.url, data, this.embedOptions.authorizationServer.headers, function (result) {
            if (result.Status && homepageItemId !== "" && isVirtualHomepage === "true") {
                this.afterVirtualHomepageSave(homepageItemId);
            }
            else if (!result.Status) {
                that._throwError("Change layout failure due to" + result.Message);
            }
        });
    }

    _createPinboardDom(itemDetail) {
        var that = this;
        if (itemDetail.ColumnInfo) {
            $('#widget-container').attr("data-homepage-id", itemDetail.Id).attr("data-current-layout", itemDetail.ColumnInfo.Layout).attr("data-item-type", itemDetail.ItemType).attr("data-virtual-homepage", itemDetail.IsVirtualHomepage);
            if (itemDetail.ItemType.toLowerCase() === "widget") {
                var column = itemDetail.ColumnInfo.Column;
                $.each(column, function (i) {
                    $('#widget-container').append('<ul id=column-' + (i + 1) + ' class="widget-list" data-column-id=' + (i + 1) + '></ul>');
                    if (column[i].Item.length > 0) {
                        $.each(column[i].Item, function (j) {
                            var item = column[i].Item[j].Id == null ? '/bi/' + that.siteIdentifier + '/widgets/widgets' : '/bi/' + that.siteIdentifier + '/dashboards';
                            var itemName = column[i].Item[j].Name;
                            var widgetType = column[i].Item[j].WidgetType;
                            var height = 0;
                            if (widgetType != null && (widgetType.includes("Card") || widgetType.includes("Image"))) {
                                height = 250;
                            }
                            else {
                                height = 400;
                            }
                            var queryString = column[i].Item[j].QueryString != null ? column[i].Item[j].QueryString : "";
                            var href = column[i].Item[j].TabId == null ? (item + '/' + column[i].Item[j].ItemId + '/' + (column[i].Item[j].Id != null ? (column[i].Item[j].CategoryName + '/') : "") + column[i].Item[j].ItemName + (queryString != "" ? '?' + queryString : queryString)) : (item + '/' + column[i].Item[j].ItemId + '/' + (column[i].Item[j].Id != null ? (column[i].Item[j].CategoryName + '/') : "") + column[i].Item[j].ItemName + '?tab=' + column[i].Item[j].TabId + (queryString != "" ? '&' + queryString : queryString));
                            var styleAttr = j !== 0 ? 'style="width:100%;height:100%;"' : '';
                            if (column[i].Item[j].ItemExtension.toLowerCase() !== ".sydj") {
                                $('#column-' + (i + 1)).append('<li class="list-item" ' + styleAttr + '><div class="widget" id=widget_' + (i + 1) + '_' + (j + 1) + ' data-dashboardurl="' + href + '" style="height:100%;width:100%;"></div></li>');
                            }
                            else {
                                //<i data-href="' + href + '" class="items view-item su su-open-link-newtab" data-toggle="tooltip" data-original-title="Go To Dashboard" style="color: black;" />
                                $('#column-' + (i + 1)).append('<li class="list-item" ' + styleAttr + '><div class="widget" id=widget_' + (i + 1) + '_' + (j + 1) + ' data-dashboardurl="' + href + '" style="height: ' + height + 'px;width:100%;background:#fff;"><div class="widget-sortable" style="width:100%;float:left;display:block;height:25px"><div style="height:100%;width:100%;cursor:move;"><div id="item-name">' + itemName + '</div><div id="widget-icons"><i class="items unpin-widget su su-delete" data-toggle="tooltip" data-original-title="Unpin Widget"  style="color: black;" /></div></div></div></div></li>');
                            }

                        });
                    }
                    else {
                        $('#column-' + (i + 1)).append("<li class='empty click-container'><div class='empty-content empty-homepage'><span class='drag-widget'>Drag your widgets here to customize layout</span></div></li>");
                    }
                });
                var listItems = $("li.list-item a");
                for (var t = 0; t < listItems.length; t++) {
                    $("li.list-item a").eq(t).attr("href", $("li.list-item a").eq(t).attr("data-url"));
                }
            }
            else if (itemDetail.ItemType.toLowerCase() === "dashboard") {
                $("#add-item, #layout-container, #divider").hide();
                $('#widget-container').append('<ul id="column-1" class="dashboard-column col-lg-12 col-md-12 col-sm-12 col-xs-12" data-column-id="1"><li class="dashboard-list"><div class="dashboard" id="dashboard_1_1" style="height:100%;width:100%"></div></li></ul>');
            }
        } else {
            this._throwError('Pinboard Details not found', this.embedOptions.embedContainerId);
        }
    }

    _checkEmptyHomepage() {
        var length = 0;
        var isEmptyHomepage = false;
        $("#widget-container ul").each(function (i) {
            length = $("#column-" + (i + 1) + " li:not('.empty')").length;
            isEmptyHomepage = length > 0 ? false : true;
            return length > 0 ? false : true;
        });
        return isEmptyHomepage;
    }

    _setLayout(layout) {
        var itemType = $("#widget-container").attr("data-item-type").toLowerCase();
        $("#layout-items").find("span#" + layout).addClass("active");
        switch (layout) {
            case 1:
                $("#column-1").removeClass().addClass("col-lg-12 col-md-12 col-sm-12 col-xs-12");
                break;
            case 11:
                $("#column-1,#column-2").removeClass().addClass("col-lg-6 col-md-6 col-sm-6 col-xs-6");
                break;
            case 12:
                $("#column-1").removeClass().addClass("col-lg-4 col-md-4 col-sm-4 col-xs-4");
                $("#column-2").removeClass().addClass("col-lg-8 col-md-8 col-sm-8 col-xs-8");
                break;
            case 21:
                $("#column-1").removeClass().addClass("col-lg-8 col-md-8 col-sm-8 col-xs-8");
                $("#column-2").removeClass().addClass("col-lg-4 col-md-4 col-sm-4 col-xs-4");
                break;
            case 111:
                $("#column-1,#column-2,#column-3").removeClass().addClass("col-lg-4 col-md-4 col-sm-4 col-xs-4");
                break;
        }
        var isEmptyHomepage = this._checkEmptyHomepage();
        if (isEmptyHomepage) {
            if (!window.IsMobile) {
                $("#widget-container ul li.empty .empty-content").find(".drag-widget").hide();
                $("#widget-container ul li.empty .empty-content").removeClass("non-empty-homepage").addClass("empty-homepage");
            }
            else {
                $("#widget-container ul li.empty .empty-content").removeClass("non-empty-homepage").addClass("mobile-empty-homepage");
                $("#widget-container ul li.empty .empty-content").find(".drag-widget").text(window.Server.App.LocalizationContent.HomepageMobileMessage).show();
                $("#widget-container ul li.empty").css("border", "none");
            }
        }
        if (itemType != "dashboard") {
            var that = this;
            this.enableSorting();
            this.setListMinimumHeight();
            $('.pinBoardDbrd').each(function () {
                var dbrdInstance = that._getDashboardInstance(this.id);
                var clientFnc = window[that.embedOptions.onResize];
                if (clientFnc instanceof Function) {
                    clientFnc.call(that, dbrdInstance);
                }
                if (that.embedOptions.onResize instanceof Function) {
                    that.embedOptions.onResize.call(that, dbrdInstance);
                }
                dbrdInstance.resizeDashboard();
            });
        }
        //$.map($("#widget-container").find('ul'), function (value, index) {
        //    $.map($(value).find('li'), function (liValue, liIndex) {
        //        if (liIndex !== 0) {
        //            $(liValue).css('margin-top', '30px');
        //        };
        //    });
        //});
    }

    setListMinimumHeight() {
        var tempArr = [];
        $('#widget-container > ul').each(function (i) {
            var tempVar = 0;
            $(this).find("li").each(function (j) {
                tempVar = tempVar + $(this).innerHeight() + 20;
            });
            tempArr[i] = tempVar;
        });
        var minimumHeight = Math.max.apply(Math, tempArr) > 400 ? Math.max.apply(Math, tempArr) : 440;
        $('#widget-container > ul').css("min-height", minimumHeight);
        $("#server-app-container").height($("#content-area").height());
    }

    enableSorting() {
        var that = this;
        var isSyncfusionIdentifier = false;
        $("#column-1, #column-2, #column-3").sortable({
            connectWith: "ul",
            placeholder: "placeholder",
            handle: ".widget-sortable",
            cancel: ".empty",
            containment: "#" + that.embedOptions.embedContainerId,
            cursor: "move",
            tolerance: "pointer",
            scroll: true,
            scrollSensitivity: 10,
            scrollSpeed: 20,
            update: function (event, ui) {
                that.toColumn = $(event.target).data("column-id");
                that.toPosition = ui.item.index() + 1;
            },
            start: function (event, ui) {
                $("li.placeholder").append("<div class='placeholder-text' style='color: dimgray; font-size: 20px;padding-top: 10px;text-align: center;'>Drag your widgets here to customize layout</div>");
                $("li.placeholder").css({ 'height': ui.item.height().toString() + "px", 'background-color': '#eeeeee', 'border': 'dashed lightgray' });
                $('#widget-container ul li.empty').remove();
                that.fromColumn = $(event.target).data("column-id");
                that.fromPosition = ui.item.index() + 1;
                that.toColumn = $(event.target).data("column-id");
                that.toPosition = ui.item.index() + 1;
                var dragPinWidgetInstance = $('#' + ui.item.find('.pinWidget').attr('id') + '_embeddedbi').data('ejDashboardDesigner');
                var clientFnc = window[that.embedOptions.onDrag];
                if (clientFnc instanceof Function) {
                    clientFnc.call(this, dragPinWidgetInstance);
                }
                if (that.embedOptions.onDrag instanceof Function) {
                    that.embedOptions.onDrag.call(that, dragPinWidgetInstance);
                }
            },
            stop: function (event, ui) {
                that.showEmptyList();
                var clientFnc = window[that.embedOptions.onDrop];
                var dropPinWidgetInstance = $('#' + ui.item.find('.pinWidget').attr('id') + '_embeddedbi').data('ejDashboardDesigner');
                if (clientFnc instanceof Function) {
                    clientFnc.call(this, dropPinWidgetInstance);
                }
                if (that.embedOptions.onDrop instanceof Function) {
                    that.embedOptions.onDrop.call(that, dropPinWidgetInstance);
                }
                if (!(that.fromColumn === that.toColumn && that.fromPosition === that.toPosition)) {
                    if (that.fromColumn !== that.toColumn) {
                        $('#' + ui.item.find('.pinWidget').attr('id') + '_embeddedbi').data("ejDashboardDesigner").resizeDashboard();
                    }
                    that.dragAndDrop(that.fromColumn, that.toColumn, that.fromPosition, that.toPosition, ui);
                }
                that.setListMinimumHeight();
            }
        });
        $("#column-1, #column-2, #column-3").disableSelection();
    }

    showEmptyList() {
        $("#widget-container ul").each(function (i) {
            if ($("#column-" + (i + 1) + " li").length < 1) {
                $('#column-' + (i + 1)).append("<li class='empty click-container'><div class='empty-content empty-homepage'><span class='drag-widget'>Drag your widgets here to customize layout</span></div></li>");
            }
        });
    }

    dragAndDrop(fromColumn, toColumn, fromPosition, toPosition, ui) {
        var homepageItemId = $("#widget-container").attr("data-homepage-id");
        var from = { Column: fromColumn, Position: fromPosition };
        var to = { Column: toColumn, Position: toPosition };
        //$.map($("#widget-container").find('ul'), function (value, index) {
        //    $.map($(value).find('li'), function (liValue, liIndex) {
        //        if (liIndex !== 0) {
        //            $(liValue).css('margin-top', '30px');
        //        } else {
        //            $(liValue).css('margin-top', '10px');
        //        }
        //    });
        //});
        var embedQuerString = "embed_nonce=" + this._uuidv4Generartor() +
            "&homepageId=" + homepageItemId +
            "&moveFrom=" + JSON.stringify(from) +
            "&moveTo=" + JSON.stringify(to) +
            "&embed_mode=" + this.embedOptions.mode +
            "&embed_timestamp=" + Math.round((new Date()).getTime() / 1000) +
            "&embed_expirationtime=" + this.embedOptions.expirationTime;
        var data = {
            embedQuerString: encodeURI(embedQuerString),
            dashboardServerApiUrl: this.dashboardServerApiUrl
        };
        this._xhrRequestHelper("POST", this.embedOptions.authorizationServer.url, data, this.embedOptions.authorizationServer.headers, this._dragAndDropSuccess);
    }

    _unPinItem(column, position, event) {
        var homepageItemId = $("#widget-container").attr("data-homepage-id");
        var unpinPosition = { Column: column, Position: position };
        var embedQuerString = "embed_nonce=" + this._uuidv4Generartor() +
            "&homepageId=" + homepageItemId +
            "&unpinPosition=" + JSON.stringify(unpinPosition) +
            "&isUnpin=" + true +
            "&embed_mode=" + this.embedOptions.mode +
            "&embed_timestamp=" + Math.round((new Date()).getTime() / 1000) +
            "&embed_expirationtime=" + this.embedOptions.expirationTime;
        var data = {
            embedQuerString: encodeURI(embedQuerString),
            dashboardServerApiUrl: this.dashboardServerApiUrl
        };
        this._xhrRequestHelper("POST", this.embedOptions.authorizationServer.url, data, this.embedOptions.authorizationServer.headers, this._unPinSuccess);
    }

    _unPinSuccess(result) {
        if (result.Status) {
            $("#column-" + this.column + " li:eq(" + (this.position - 1) + ")").remove();
            this.showEmptyList();
            var isEmptyHomepage = this.checkEmptyHomepage();
            if (isEmptyHomepage) {
                $("#widget-container ul li.empty .empty-content").find(".drag-widget").hide();
                $("#widget-container ul li.empty .empty-content").removeClass("non-empty-homepage").addClass("empty-homepage");
            }
            //$.map($("#widget-container").find('ul'), function (value, index) {
            //    $.map($(value).find('li'), function (liValue, liIndex) {
            //        if (liIndex !== 0) {
            //            $(liValue).css('margin-top', '30px');
            //        } else {
            //            $(liValue).css('margin-top', '10px');
            //        }
            //    });
            //});
            this.setListMinimumHeight();
        }
    }

    checkEmptyHomepage() {
        var length = 0;
        var isEmptyHomepage = false;
        $("#widget-container ul").each(function (i) {
            length = $("#column-" + (i + 1) + " li:not('.empty')").length;
            isEmptyHomepage = length > 0 ? false : true;
            return length > 0 ? false : true;
        });
        return isEmptyHomepage;
    }

    _dragAndDropSuccess(result) {
        if (!result.Status) {
            this._throwError("Drag and drop failure due to" + result.Message);
        }
    }

    _renderItem(itemDetail) {
        var that = this;
        var isEmptyHomepage = this._checkEmptyHomepage();
        if (isEmptyHomepage) {
            $("#widget-container ul li.empty .empty-content").find(".drag-widget").hide();
            $("#widget-container ul li.empty .empty-content").removeClass("non-empty-homepage").addClass("empty-homepage");
        }

        $("#widget-container").hide();
        if (itemDetail.ItemType.toLowerCase() === "widget") {
            this._setLayout(itemDetail.ColumnInfo.Layout, true);
            var column = itemDetail.ColumnInfo.Column;
            $.each(column, function (i) {
                if (column[i].Item.length > 0) {
                    $.each(column[i].Item, function (j) {
                        if (column[i].Item[j].ItemExtension.toLowerCase() !== ".sydj") {
                            $("#widget_" + (i + 1) + "_" + (j + 1)).ejDashboardViewer({
                                accessToken: accessToken,
                                serviceUrl: dashboardServiceUrl,
                                serverUrl: dashboardServerUrl,
                                _enableHyperLinkOnErrorMessage: false,
                                cdnFilePath: isUseCdn ? cdnLink + "/scripts/viewer" : "",
                                dashboardPath: column[i].Item[j].Path,
                                _itemId: column[i].Item[j].ItemId,
                                reportName: "",
                                reportDescription: "",
                                enableExport: true,
                                enablePrint: false,
                                actionBegin: function (args) {
                                    if (args.eventType === "beforeNavigate") {
                                        hasWidgetLink = true;
                                    }
                                },
                                localeSettings: {
                                    resourcePath: ""
                                },
                                enableWidgetMode: column[i].Item[j].Id == null ? false : true,
                                filterParameters: column[i].Item[j].QueryString,
                                showTab: column[i].Item[j].TabId == null ? true : false,
                                widgetModeSettings: {
                                    name: "",
                                    id: column[i].Item[j].Id == null ? "" : column[i].Item[j].Id,
                                    title: column[i].Item[j].Name
                                },
                                _selectedTabGuid: column[i].Item[j].TabId == null ? "" : column[i].Item[j].TabId,
                                afterWidgetRender: $.proxy(function (args, param) {
                                    if (param.data.controlType.toLowerCase() == "card") {
                                        $("#widget_" + (i + 1) + "_" + (j + 1) + " .e-control-heading span").hasClass("e-control-title") == false ? $("#widget_" + (i + 1) + "_" + (j + 1) + " .e-control-heading").text(args[i].Item[j].Name) : "";
                                    }
                                    if (args[i].Item[j].IsActive && !args[i].Item[j].IsHavingPermission) {
                                        $("#widget_" + (i + 1) + "_" + (j + 1)).find(".e-dbrd-control").remove();
                                        $("#widget_" + (i + 1) + "_" + (j + 1)).find(".e-dbrd-control-container").append("<div class='no-permission'><span class='message'>" + window.Server.App.LocalizationContent.PermissionDeniedWidget + "</span></div>");
                                    }
                                    else if (!args[i].Item[j].IsActive && !args[i].Item[j].IsHavingPermission) {
                                        $("#widget_" + (i + 1) + "_" + (j + 1)).find(".e-dbrd-control").remove();
                                        $("#widget_" + (i + 1) + "_" + (j + 1)).find(".e-dbrd-control-container").append("<div class='no-permission'><span class='message'>" + window.Server.App.LocalizationContent.DeletedWidgetMessage + "</span></div>");
                                    }
                                    if (args[i].Item[j].IsActive && args[i].Item[j].IsHavingPermission && args[i].Item[j].QueryString != null) {
                                        var currentElement = $("#widget_" + (i + 1) + "_" + (j + 1));
                                        currentElement.find("#filter-info").parent().append('<div class="filter-overview"><span id="heading">' + window.Server.App.LocalizationContent.AppliedFilters + '</span><div id="outer-div"><div id="scroller-content"><div id="applied-filters-container"></div></div></div></div>');
                                        var parsedQueryFilter = currentElement.data("ejDashboardViewer")._parseParameterQuery(args[i].Item[j].QueryString);
                                        var filtersDom = buildAppliedFiltersDom(parsedQueryFilter);
                                        currentElement.find(".filter-overview #applied-filters-container").append(filtersDom);
                                        if (currentElement.find(".filter-overview #applied-filters-container").height() > 180) {
                                            currentElement.find(".filter-overview #scroller-content").ejScroller({
                                                height: 180,
                                                width: 248,
                                                scrollerSize: 9
                                            });
                                        }
                                        currentElement.find(".filter-overview").addClass("display-none");
                                    }
                                }, this, column),
                                beforeWidgetIconRendered: $.proxy(function (args, event) {
                                    if (event.widgetInformation.Name.toLowerCase() != "widget not configured") {
                                        if (!window.IsMobile) {
                                            if (event.widgetInformation.Name.toLowerCase() != "card") {
                                                $("#widget_" + (i + 1) + "_" + (j + 1)).data("ejDashboardViewer").model.size.height = "400px";
                                            }
                                            else {
                                                $("#widget_" + (i + 1) + "_" + (j + 1)).data("ejDashboardViewer").model.size.height = "250px";
                                            }
                                        }
                                        else {
                                            $("#widget_" + (i + 1) + "_" + (j + 1)).data("ejDashboardViewer").model.size.height = "250px";
                                        }
                                    }
                                    else {
                                        $("#widget_" + (i + 1) + "_" + (j + 1)).data("ejDashboardViewer").model.size.height = "200px";
                                        $("#widget_" + (i + 1) + "_" + (j + 1)).find(".e-dbrd-control-container").append("<div class='no-permission'><span class='message'>" + window.Server.App.LocalizationContent.DeletedWidgetMessage + "</span></div>");
                                    }
                                    if (event.iconsinformation.length > 0 && event.iconsinformation[0].classname == "e-dbrd-link-enable") {
                                        event.iconsinformation[0].margintop = "1px";
                                    }

                                    if (!window.IsMobile) {
                                        event.iconsinformation.unshift({ "classname": "su su-delete unpin", "name": "Unpin Widget", "datatooltip": window.Server.App.LocalizationContent.UnpinWidget, "marginright": "-18px", "margintop": "4px" });
                                    }

                                    var addWidgetIcons = args[i].Item[j].IsActive && args[i].Item[j].IsHavingPermission && event.widgetInformation.Name.toLowerCase() != "widget not configured";
                                    if (addWidgetIcons) {
                                        event.iconsinformation.unshift({ "classname": "su su-maximize unpin", "name": "Maximize Widget", "datatooltip": window.Server.App.LocalizationContent.MaximizeWidget, "marginright": "-18px", "margintop": "4px" });
                                        event.iconsinformation.unshift({ "classname": "su su-open-link-newtab unpin", "name": "Go to Dashboard", "datatooltip": window.Server.App.LocalizationContent.GotoDashboard, "marginright": "-18px", "margintop": "4px" });
                                    }

                                    if (addWidgetIcons && args[i].Item[j].QueryString != null) {
                                        event.iconsinformation.unshift({ "id": "filter-info", "classname": "su su-info unpin", "name": "Applied Filters", "datatooltip": window.Server.App.LocalizationContent.ViewAppliedFilters, "margintop": "4px", "marginright": "0px" });
                                    }

                                    $("#widget-container").show();
                                    hideWaitingPopup("content-area");
                                    var data = $("#widget_" + (i + 1) + "_" + (j + 1)).ejDashboardViewer();
                                    data.resize();
                                }, this, column),
                                dashboardCreated: function (args) {
                                    var href = $("#widget_" + (i + 1) + "_" + (j + 1)).attr("data-dashboardurl");
                                    $("#widget_" + (i + 1) + "_" + (j + 1)).find(".su-open-link-newtab").wrap($('<a class="redirect" href="' + href + '" target="_blank">'));
                                },
                                onMenuIconClick: function (information) {
                                    if (typeof (information.name) != "undefined" && information.name.toLowerCase() == "unpin widget") {
                                        ShowWaitingProgress("#content-area", "show");
                                        var column = information.target.parents("ul").data("column-id");
                                        var position = information.target.parents("li").index() + 1;
                                        unPinItem(column, position, information.event);
                                    }
                                    else if (typeof (information.name) != "undefined" && information.name.toLowerCase() == "maximize widget") {
                                        parent.$("#maximize").removeClass("display-none");
                                        var currentElement = information.target.parents(".widget").attr("id");
                                        var control = parent.$("#" + currentElement).data('ejDashboardViewer').getWidgetDataByReportName(information.widgetId);
                                        var header = information.headertext;
                                        maximizeWidget(header, control, information.event, information.serviceUrl, information.dashboardPath);
                                    }
                                    else if (typeof (information.name) != "undefined" && information.name.toLowerCase() == "applied filters") {
                                        var currentElement = $(information.event.target).parent().find(".filter-overview");
                                        currentElement.toggleClass("display-none");
                                        $(".filter-overview").not(currentElement).addClass("display-none");
                                        information.event.preventDefault();
                                    }
                                }
                            });
                        }
                        else {
                            //$("#widget_" + (i + 1) + "_" + (j + 1)).addClass("sydj-format").append("<div class='no-permission'><span class='message'>" + window.Server.App.LocalizationContent.SydjWidgetMessage + "</span></div>");
                            //$("#homepage-list").selectpicker("refresh");
                            var height = 0;
                            var widgetType = column[i].Item[j].WidgetType;
                            if (widgetType != null && (widgetType.includes("Card") || widgetType.includes("Image"))) {
                                height = 225;
                            }
                            else {
                                height = 375;
                            }

                            //$("#widget_" + (i + 1) + "_" + (j + 1)).append("<iframe width='100%' height='100%' style='border:0;height: " + height + "px;' src='" + that.baseUrl.trimEnd("/") + "/dashboards/" + column[i].Item[j].ItemId + "/" + column[i].Item[j].CategoryName + "/" + column[i].Item[j].ItemName + "?isWidgetMode=true&widgetId=" + column[i].Item[j].Id + "'></iframe>");
                            var pinboardIdName = that.embedOptions.embedContainerId + '_pinBoard_' + (i + 1) + '_' + (j + 1);
                            $("#widget_" + (i + 1) + "_" + (j + 1)).append('<div class="pinWidget" style="height:calc(100% - 30px);width:100%;overflow: hidden !important;" id="' + pinboardIdName + '"><div id="' + pinboardIdName + '_embeddedbi" class="pinBoardDbrd"></div ></div>');
                            that.pinBoardRendered = false;
                            that.pinboardIds[column[i].Item[j].Id] = pinboardIdName;
                            that.loadDashboardWidget(column[i].Item[j].Name, column[i].Item[j].ItemId);

                            if (column[i].Item[j].IsActive && !column[i].Item[j].IsHavingPermission) {
                                $("#widget_" + (i + 1) + "_" + (j + 1)).find("iframe").remove();
                                $("#widget_" + (i + 1) + "_" + (j + 1)).append("<div class='no-permission'><span class='message'>" + window.Server.App.LocalizationContent.PermissionDeniedWidget + "</span></div>");
                            }
                            else if (!column[i].Item[j].IsActive && !column[i].Item[j].IsHavingPermission) {
                                $("#widget_" + (i + 1) + "_" + (j + 1)).find("iframe").remove();
                                $("#widget_" + (i + 1) + "_" + (j + 1)).append("<div class='no-permission'><span class='message'>" + window.Server.App.LocalizationContent.DeletedWidgetMessage + "</span></div>");
                            }
                        }
                    });

                    $("#widget-container").show();
                    //hideWaitingPopup("content-area");
                }
                else {
                    $("#widget-container").show();
                    //hideWaitingPopup("content-area");
                }
            });
            this.enableSorting();
            this.setListMinimumHeight();
        }
        else if (itemDetail.ItemType.toLowerCase() == "dashboard") {
            var column = itemDetail.ColumnInfo.Column;
            $("#dashboard_1_1").css({ "height": $(window).height() - $("#header-area").outerHeight() - $("#base-footer-div").outerHeight() - $("#homepage-header").outerHeight() - 30, "width": $("#content-area").width() - 10 });
            if (column[0].Item[0].IsActive && column[0].Item[0].IsHavingPermission && column[0].Item[0].ItemExtension.toLowerCase() !== ".sydj") {
                $("#dashboard_1_1").ejDashboardViewer({
                    accessToken: accessToken,
                    serviceUrl: dashboardServiceUrl,
                    serverUrl: dashboardServerUrl,
                    _enableHyperLinkOnErrorMessage: false,
                    cdnFilePath: isUseCdn ? cdnLink + "/scripts/viewer" : "",
                    dashboardPath: itemDetail.ColumnInfo.Column[0].Item[0].Path,
                    _itemId: itemDetail.ColumnInfo.Column[0].Item[0].ItemId,
                    reportName: "",
                    reportDescription: "",
                    enableExport: true,
                    enablePrint: false,
                    showGetLinkIcon: false,
                    localeSettings: {
                        resourcePath: ""
                    },
                    interactionSettings: {
                        allowHistoryMaintenance: false,
                        handleHistoryEvent: false
                    },
                    enableWidgetMode: false,
                    filterParameters: itemDetail.ColumnInfo.Column[0].Item[0].QueryString,
                    showTab: itemDetail.ColumnInfo.Column[0].Item[0].TabId != null ? false : true,
                    _selectedTabGuid: itemDetail.ColumnInfo.Column[0].Item[0].TabId != null ? itemDetail.ColumnInfo.Column[0].Item[0].TabId : "",
                    beforeControlMenuOpen: function (e) {
                        e.menuData.splice(1, 1);
                    },
                    onTabSelectionFailure: "OnFailtoLoadChildDashboard",
                    beforeContextMenuOpen: function (e) {
                        var removeByAttr = function (arr, attr, value) {
                            var i = arr.length;
                            while (i--) {
                                if (arr[i] && arr[i].hasOwnProperty(attr) && (arguments.length > 2 && arr[i][attr] === value)) {
                                    arr.splice(i, 1);
                                }
                            }
                            return arr;
                        }
                        removeByAttr(e.menuData, "text", "Export");
                    }
                });
            }
            else {
                if (!column[0].Item[0].IsActive) {
                    $("#dashboard_1_1").append("<div class='no-permission'><span class='message'>" + window.Server.App.LocalizationContent.DeletedDashboardMessage + "</span></div>");
                }
                else if (column[0].Item[0].IsActive && !column[0].Item[0].IsHavingPermission) {
                    $("#dashboard_1_1").append("<div class='no-permission'><span class='message'>" + window.Server.App.LocalizationContent.PermissionDeniedDashboard + "</span></div>");
                }
                else if (column[0].Item[0].IsActive && column[0].Item[0].IsHavingPermission && column[0].Item[0].ItemExtension.toLowerCase() === ".sydj") {
                    $("#dashboard_1_1").append("<div class='no-permission'><span class='message'>" + window.Server.App.LocalizationContent.SydjDashboardMessage + "</span></div>");
                }
            }
            $("#widget-container").show();
            hideWaitingPopup("content-area");
        }
    }

    addWidgetToPinboard(dashboardId, widgetId, widgetName) {
        if (!this._isEmptyOrSpaces(dashboardId) && !this._isEmptyOrSpaces(widgetId)) {
            var homepageItemId = $("#widget-container").attr("data-homepage-id");
            var that = this;
            var embedQuerString = "embed_nonce=" + this._uuidv4Generartor() +
                "&homepageId=" + homepageItemId +
                "&isPinUpdate=" + true +
                "&pinWidgetId=" + widgetId +
                "&pinDashbooardId=" + dashboardId +
                "&pinWidgetName=" + (this._isNullOrUndefined(widgetName) ? null : widgetName) +
                "&pinboard_name=" + this.embedOptions.pinboardName +
                "&embed_mode=" + this.embedOptions.mode +
                "&embed_timestamp=" + Math.round((new Date()).getTime() / 1000) +
                "&embed_expirationtime=" + this.embedOptions.expirationTime;
            var data = {
                embedQuerString: encodeURI(embedQuerString),
                dashboardServerApiUrl: this.dashboardServerApiUrl
            };
            this._xhrRequestHelper("POST", this.embedOptions.authorizationServer.url, data, this.embedOptions.authorizationServer.headers, function (result) {
                if (result.Status) {
                    //$('#' + that.embedOptions.embedContainerId).find('#server-app-container').remove();
                    that._addWidgetInPinboard(result.Data);
                }
                else if (!result.Status) {
                    that._throwError("Can't able to add the widget due to " + result.Message);
                }
            });
        } else {
            this._throwError("Please provide the valid dashboard id and widget id");
        }
    }

    _addWidgetInPinboard(itemDetails) {
        var ulElement = $('#widget-container').find('ul:first');
        if ($('#widget-container').find('ul:first li').length === 1 && $('#widget-container').find('ul:first li').hasClass('empty')) {
            $('#widget-container').find('ul:first li').remove();
        }
        var ulElementLilength = $('#widget-container').find('ul:first li').length;
        var column = itemDetails.ColumnInfo.Column[0];
        var item = column.Item[0].Id == null ? '/bi/' + this.siteIdentifier + '/widgets/widgets' : '/bi/' + this.siteIdentifier + '/dashboards';
        var itemName = column.Item[0].Name;
        var widgetType = column.Item[0].WidgetType;
        var height = 0;
        if (widgetType != null && (widgetType.includes("Card") || widgetType.includes("Image"))) {
            height = 250;
        }
        else {
            height = 400;
        }
        var queryString = column.Item[0].QueryString != null ? column.Item[0].QueryString : "";
        var href = column.Item[0].TabId == null ? (item + '/' + column.Item[0].ItemId + '/' + (column.Item[0].Id != null ? (column.Item[0].CategoryName + '/') : "") + column.Item[0].ItemName + (queryString != "" ? '?' + queryString : queryString)) : (item + '/' + column.Item[0].ItemId + '/' + (column.Item[0].Id != null ? (column.Item[0].CategoryName + '/') : "") + column.Item[0].ItemName + '?tab=' + column.Item[0].TabId + (queryString != "" ? '&' + queryString : queryString));
        var styleAttr = ulElementLilength !== 0 ? 'style="width:100%;height:100%;"' : '';
        $(ulElement).prepend('<li class="list-item"><div class="widget" id=widget_' + 1 + '_' + (ulElementLilength + 1) + ' data-dashboardurl="' + href + '" style="height: ' + height + 'px;width:100%;background:#fff;"><div class="widget-sortable" style="width:100%;float:left;display:block;height:25px"><div style="height:100%;width:100%;cursor:move;"><div id="item-name">' + itemName + '</div><div id="widget-icons"><i class="items unpin-widget su su-delete" data-toggle="tooltip" data-original-title="Unpin Widget"  style="color: black;" /></div></div></div></div></li>');
        var pinWidgetHeight = 0;
        if (widgetType != null && (widgetType.includes("Card") || widgetType.includes("Image"))) {
            pinWidgetHeight = 225;
        }
        else {
            pinWidgetHeight = 375;
        }

        //$("#widget_" + (i + 1) + "_" + (j + 1)).append("<iframe width='100%' height='100%' style='border:0;height: " + height + "px;' src='" + that.baseUrl.trimEnd("/") + "/dashboards/" + column[i].Item[j].ItemId + "/" + column[i].Item[j].CategoryName + "/" + column[i].Item[j].ItemName + "?isWidgetMode=true&widgetId=" + column[i].Item[j].Id + "'></iframe>");
        var pinboardIdName = this.embedOptions.embedContainerId + '_pinBoard_1' + '_' + (ulElementLilength + 1);
        $("#widget_1" + "_" + (ulElementLilength + 1)).append('<div class="pinWidget" style="height:calc(100% - 30px);width:100%;overflow: hidden !important;" id="' + pinboardIdName + '"><div id="' + pinboardIdName + '_embeddedbi" class="pinBoardDbrd"></div ></div>');
        this.pinBoardRendered = false;
        this.pinboardIds[column.Item[0].Id] = pinboardIdName;
        this.loadDashboardWidget(column.Item[0].Name, column.Item[0].ItemId);
        this.enableSorting();
        this.setListMinimumHeight();
        this._removeElementsClass(this.embedOptions.embedContainerId, ".preloader-wrap", "viewer-blue-loader");
    }

    _renderMultiTabDashboard(embedResponse) {
        var that = this;
        var tabObj;
        var tabIndex = 0;
        var embedContainer = $('#' + that.embedOptions.embedContainerId).parent();
        embedContainer.html('');
        var containerName = that.embedOptions.embedContainerId + "_multi_tab_dashboard";
        var multiTabContainer = $("<div id=" + containerName + "></div>");
        embedContainer.append(multiTabContainer);
        var tabHeader = $('<div class="e-tab-header"></div>');
        var tabContent = $('<div class="e-content"></div>');
        $.map(embedResponse, function (value, index) {
            var dashboardId = 'multi_' + value.DashboardId;
            tabHeader.append($('<div>' + value.Name + '</div>'));
            var multitabDbrdEle = $('<div style="height:100%;width:100%;overflow: hidden !important;" id="' + dashboardId + '"></div>');
            tabContent.append($('<div></div>').append(multitabDbrdEle.append('<div id="' + dashboardId + '_embeddedbi"></div>')));
            if (index === 0) {
                that._getAuthorizationToken(value.DashboardId);
            }
        });
        multiTabContainer.append(tabHeader).append(tabContent);
        tabObj = new ejdashboard.navigations.Tab({
            enableAnimation: false,
            selected: $.proxy(this._tabSelected, this)
        });
        tabObj.appendTo("#" + containerName);
        $('.e-tab-header .e-toolbar-item .e-tab-text').css({ 'display': 'inline-block', 'width': '150px', 'white-space': 'nowrap', 'overflow': 'hidden', 'text-overflow': 'ellipsis', 'color': '#000' });
        $('.e-control.e-tab .e-tab-header .e-indicator').css('background', '#0565ff');
        $.map($('.e-tab-header .e-toolbar-item .e-tab-text'), function (value, index) {
            $(value).attr('title', $(value).text());
            $($('.e-content').find('#e-content-multi_tab_dashboard_' + index).children()).css({ "height": "100%", "width": "100%", "overflow": "hidden", "display": "block", "position": "absolute", "left": $(".e-content.e-lib.e-touch").width() * index });
        });
        $("#" + containerName).css({ 'width': $(".e-content.e-lib.e-touch").width(), 'height': this.embedOptions.height, 'position': 'fixed' }); //'overflow-x': 'hidden' });
        tabObj.refreshActElePosition();
    }

    _tabSelected(args) {
        var containerName = args.selectedItem.parentNode.parentNode.parentElement.attributes['id'].value;
        for (var i = 0; i < $("#" + containerName + " .e-toolbar-item").length; i++) {
            $('.e-content').find('#e-content-multi_tab_dashboard_' + i).css('display', 'block');
            if ($("#" + containerName + " .e-toolbar-item.e-active").attr("aria-controls") === "e-content-" + containerName + "_" + i) {
                $($('.e-content').find("#e-content-" + containerName + "_" + i).children()).css({ "display": "block", "position": "absolute", "left": 0 });
                var dbrdInstance = $('#' + $($('.e-content').find("#e-content-" + containerName + "_" + i).children()).children().attr('id')).data('ejDashboardDesigner');
                if (dbrdInstance === null || dbrdInstance === undefined) {
                    this._getAuthorizationToken($('.e-content').find("#e-content-" + containerName + "_" + i).children().attr('id').split('_')[1]);
                }
            } else {
                $($('.e-content').find("#e-content-" + containerName + "_" + i).children()).css({ "display": "block", "position": "absolute", "left": $(".e-content.e-lib.e-touch").width() * (i + 1) });
            }
        }
    }

    _isDependencyLoaded(that, dashboardId) {
        if (window.jQuery instanceof Function &&
            window.ej instanceof Object &&
            window.ej.dashboardDesigner instanceof Object &&
            window.ejDashboardDesigner instanceof Function &&
            !that._isEmptyOrSpaces(that.designerRootUrl) &&
            window.Designer instanceof Object) {
            if (!that.IsDependencyLoaded) {
                that.IsDependencyLoaded = true;
            }
            that._getAuthorizationToken(dashboardId);

        } else {
            setTimeout(that._isDependencyLoaded, 500, that);
        }
    };

    _getDashboardInstance(embedChildId) {
        var ele = window.jQuery.call(this, "#" + (embedChildId ? embedChildId : this.childContainer.id))[0];
        return window.jQuery.data.call(this, ele, "ejDashboardDesigner");
    };

    _onBoldBIDashboardInstaceActionBegin(arg, embedContainerId) {

        if (typeof (arg) != "undefined") {
            switch (arg.eventType) {
                case "renderLayout":
                    this._removeElementsClass(embedContainerId, ".preloader-wrap", "viewer-blue-loader");
                    break;
                default:
                    break;
            }
        }

        var serverFnc = window[this.actionBeginFn];
        if (serverFnc instanceof Function) {
            serverFnc.call(this, arg);
        }

        var clientFnc = window[this.embedOptions.actionBegin];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (this.embedOptions.actionBegin instanceof Function) {
            this.embedOptions.actionBegin.call(this, arg);
        }
    };

    _onBoldBIDashboardInstaceActionComplete(arg) {

        var serverFnc = window[this.actionCompleteFn];
        if (arg.eventType == "interactionCompleted") {
            var data = {
                filterData: this._getFilterData(arg.source.data.encryptedData),
                data: arg
            };
            var clientFnc = window[this.embedOptions.dashboardSettings.onInteraction];
            if (clientFnc instanceof Function) {
                clientFnc.call(this, data);
            }
            if (this.embedOptions.dashboardSettings.onInteraction instanceof Function) {
                this.embedOptions.dashboardSettings.onInteraction.call(this, arg);
            }

        } else {

            if (serverFnc instanceof Function) {
                serverFnc.call(this, arg);
            }

            var clientFnc = window[this.embedOptions.actionComplete];
            if (clientFnc instanceof Function) {
                clientFnc.call(this, arg);
            }
            if (this.embedOptions.actionComplete instanceof Function) {
                this.embedOptions.actionComplete.call(this, arg);
            }
        }
    };

    _onBoldBIDashboardBeforeBannerIconRender(arg) {
        if (this.embedOptions.dashboardSettings.showMoreOption === false || (this.embedOptions.dashboardSettings.showRefresh === false && this.embedOptions.dashboardSettings.showExport === false)) {
            arg.iconsinformation = this._arraySlice(arg.iconsinformation, "groupName", "Option");
        }
        var serverFnc = window[this.beforeBannerIconRenderFn];
        if (this.embedOptions.dashboardSettings.enableFullScreen) {
            var commentAndView = {
                groupId: "dashboard-comment-view",
                groupName: "Dashboard Comment & Views",
                items: [
                    this._createBannerIcon("<div/>", "dashboard-fullscreen", "su su-maximize-1", "Fullscreen", "fullscreen", true, false, { "font-size": "14px" })
                ]
            };
            arg.iconsinformation.unshift(commentAndView);
        }
        if (serverFnc instanceof Function) {
            serverFnc.call(this, arg);
        }
        var clientFnc = window[this.embedOptions.dashboardSettings.beforeIconRender];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (this.embedOptions.dashboardSettings.beforeIconRender instanceof Function) {
            this.embedOptions.dashboardSettings.beforeIconRender.call(this, arg);
        }
    };

    _createBannerIcon(tag, id, className, label, dataName, dataEvent, showText, css, href) {
        if (showText) {
            return jQuery(tag, {
                id: id,
                html: jQuery('<span/>', { "class": "icon-with-label", text: label, css: { "font-family": "Roboto", "padding": "10px" } }),
                "class": "server-banner-icon e-dashboard-banner-icon e-dbrd-designer-hoverable " + className,
                "data-name": dataName,
                "data-event": dataEvent,
                "href": href,
                css: css
            });
        } else {
            return jQuery(tag, {
                id: id,
                "class": "server-banner-icon e-dashboard-banner-icon e-dbrd-designer-hoverable " + className,
                "data-tooltip": label,
                "data-name": dataName,
                "data-event": dataEvent,
                css: css
            });
        }
    }

    _onBoldBIDashboardBeforeOtherOptionContextMenuRender(arg) {

        if (this.embedOptions.dashboardSettings.showRefresh === false) {
            arg.iconsinformation = this._arraySlice(arg.iconsinformation, "groupName", "refresh");
        }
        if (this.embedOptions.dashboardSettings.showExport === false) {
            arg.iconsinformation = this._arraySlice(arg.iconsinformation, "groupName", "export");
        }

        arg.iconsinformation.forEach(function (x, y) {
            if (x.groupName === "export") {

                if (this.embedOptions.exportSettings.showExcel === false) {
                    x.items[0].child = this._arraySlice(x.items[0].child, "id", "excel");
                }
                if (this.embedOptions.exportSettings.showImage === false) {
                    x.items[0].child = this._arraySlice(x.items[0].child, "id", "image");
                }
                if (this.embedOptions.exportSettings.showPDF === false) {
                    x.items[0].child = this._arraySlice(x.items[0].child, "id", "pdf");
                }
                if (this.embedOptions.exportSettings.showCSV === false) {
                    x.items[0].child = this._arraySlice(x.items[0].child, "id", "csv");
                }
            }
        }.bind(this));

        var serverFnc = window[this.beforeOtherRenderFn];
        if (serverFnc instanceof Function) {
            serverFnc.call(this, arg);
        }

        var clientFnc = window[this.embedOptions.beforeContextMenuRnder];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (this.embedOptions.beforeContextMenuRnder instanceof Function) {
            this.embedOptions.beforeContextMenuRnder.call(this, arg);
        }
    };

    _onBoldBIDashboardSaveFilter(arg) {
        var serverFnc = window[this.onSaveFilterFn];
        if (serverFnc instanceof Function) {
            serverFnc.call(this, arg);
        }

        var clientFnc = window[this.embedOptions.filterSettings.onSaveFilter];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (this.embedOptions.filterSettings.onSaveFilter instanceof Function) {
            this.embedOptions.filterSettings.onSaveFilter.call(this, arg);
        }
    };

    _onBoldBIDashboardSaveAsFilter(arg) {
        var serverFnc = window[this.onSaveAsFilterFn];
        if (serverFnc instanceof Function) {
            serverFnc.call(this, arg);
        }

        var clientFnc = window[this.embedOptions.filterSettings.onSaveAsFilter];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (this.embedOptions.filterSettings.onSaveAsFilter instanceof Function) {
            this.embedOptions.filterSettings.onSaveAsFilter.call(this, arg);
        }
    };

    _onBoldBIDashboardOpenViewSection(arg) {
        var serverFnc = window[this.onViewSavedFiltersFn];
        if (serverFnc instanceof Function) {
            serverFnc.call(this, arg);
        }

        var clientFnc = window[this.embedOptions.filterSettings.onViewSavedFilters];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (this.embedOptions.filterSettings.onViewSavedFilters instanceof Function) {
            this.embedOptions.filterSettings.onViewSavedFilters.call(this, arg);
        }
    };

    _onBoldBIDashboardBannerIconClick(arg) {
        if (arg.name.toLowerCase() === 'fullscreen') {
            this._switchFullscreenMode(arg);
        }
        var serverFnc = window[this.onBannerIconClickFn];
        if (serverFnc instanceof Function) {
            serverFnc.call(this, arg);
        }

        var clientFnc = window[this.embedOptions.dashboardSettings.onIconClick];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (this.embedOptions.dashboardSettings.onIconClick instanceof Function) {
            this.embedOptions.dashboardSettings.onIconClick.call(this, arg);
        }

        if (typeof (arg.name) != "undefined" && arg.name.toLowerCase() == "theming") {
            var dashboardViewerInstance = this._getDashboardInstance();
            dashboardViewerInstance.applyDashboardTheme(arg.selectedTheme);

        }

    };

    _switchFullscreenMode(arg) {
        var embedElement = document.getElementById(arg.target.parent().attr('id').split('_embeddedbi')[0]);
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
            if (embedElement.requestFullscreen) {
                embedElement.requestFullscreen();
            } else if (embedElement.msRequestFullscreen) {
                embedElement.msRequestFullscreen();
            } else if (embedElement.mozRequestFullScreen) {
                embedElement.mozRequestFullScreen();
            } else if (embedElement.webkitRequestFullscreen) {
                embedElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            } else {
                if ("ActiveXObject" in window) {
                    var wscript = new ActiveXObject("Wscript.shell");
                    wscript.SendKeys("{F11}");
                    setTimeout(function () {
                        if ((screen.availHeight || screen.height - 30) <= window.innerHeight) {
                            $("body").addClass("hide-dashboard-icons");
                            $("#dashboard-fullscreen").removeClass("su-maximize-1").addClass("su-minimize").attr("data-tooltip", "Exit Fullscreen");
                        } else {
                            $("body").removeClass("hide-dashboard-icons");
                            $("#dashboard-fullscreen").addClass("su-maximize-1").removeClass("su-minimize").attr("data-tooltip", "Fullscreen");
                        }
                    }, 400);
                }
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }

    _fullscreenExitHandler() {
        if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            $("body").removeClass("hide-dashboard-icons");
            $("#dashboard-fullscreen").addClass("su-maximize-1").removeClass("su-minimize").attr("data-tooltip", "Fullscreen");
            $("#pinboard-fullscreen").addClass("su-maximize-1").removeClass("su-minimize").attr("data-tooltip", "Fullscreen");
            $('#server-app-container').attr('style', 'background-color: #f9f9f9; height:' + $("#content-area").height() + 'px;overflow: hidden !important;min-height: 600px');
        } else {
            $("body").addClass("hide-dashboard-icons");
            $("#dashboard-fullscreen").removeClass("su-maximize-1").addClass("su-minimize").attr("data-tooltip", "Exit Fullscreen");
            $("#pinboard-fullscreen").removeClass("su-maximize-1").addClass("su-minimize").attr("data-tooltip", "Exit Fullscreen");
            $('#server-app-container').attr('style', 'background-color: #f9f9f9; overflow: auto !important');
        }
    }

    _onBoldBIDashboardBeforeWidgetIconRendered(arg) {
        if (this.embedOptions.widgetSettings.showMaximize === false) {
            arg.iconsinformation = this._arraySlice(arg.iconsinformation, "name", "maximize");
        }
        if (this.embedOptions.widgetSettings.showFilter === false) {
            arg.iconsinformation = this._arraySlice(arg.iconsinformation, "name", "filter");
        }
        if (this.embedOptions.widgetSettings.showExport === false) {
            arg.iconsinformation = this._arraySlice(arg.iconsinformation, "name", "export");
            if (!this._isNullOrUndefined(arg.widgetInformation) &&
                !this._isNullOrUndefined(arg.widgetInformation.widgetJson) &&
                !this._isNullOrUndefined(arg.widgetInformation.widgetJson.ContainerSettings) &&
                !arg.widgetInformation.widgetJson.ContainerSettings.ViewData) {
                arg.iconsinformation = this._arraySlice(arg.iconsinformation, "name", "menu");
            }
        }
        if (this.embedOptions.widgetSettings.showMoreOption === false) {
            arg.iconsinformation = this._arraySlice(arg.iconsinformation, "name", "menu");
        }
        var serverFnc = window[this.beforeWidgetIconRenderedFn];
        if (serverFnc instanceof Function) {
            serverFnc.call(this, arg);
        }

        var clientFnc = window[this.embedOptions.widgetSettings.beforeIconRender];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (this.embedOptions.widgetSettings.beforeIconRender instanceof Function) {
            this.embedOptions.widgetSettings.beforeIconRender.call(this, arg);
        }
    };

    _onBoldBIBeforeControlMenuOpen(arg) {
        if (this.embedOptions.widgetSettings.showExport === false) {
            arg.menuItems = this._arraySlice(arg.menuItems, "id", "export");
        }
    }

    _onBoldBIDashboardWidgetIconClick(arg) {
        var serverFnc = window[this.onWidgetIconClickFn];
        if (serverFnc instanceof Function) {
            serverFnc.call(this, arg);
        }

        var clientFnc = window[this.embedOptions.widgetSettings.onIconClick];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (this.embedOptions.widgetSettings.onIconClick instanceof Function) {
            this.embedOptions.widgetSettings.onIconClick.call(this, arg);
        }
    };

    _onBoldBIDashboardUpdatefavorite(arg) {
        var serverFnc = window[this.onFavoriteStateChangeFn];
        if (serverFnc instanceof Function) {
            serverFnc.call(this, arg);
        }
        var clientFnc = window[this.embedOptions.dashboardSettings.onFavoriteIconClick];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (this.embedOptions.dashboardSettings.onFavoriteIconClick instanceof Function) {
            this.embedOptions.dashboardSettings.onFavoriteIconClick.call(this, arg);
        }
    };

    _onBoldBIWidgetExportRender(arg) {
        if (this.embedOptions.exportSettings.showExcel === false) {
            arg.iconsinformation = this._arraySlice(arg.exportOptionCollection, "id", "excel");
        }
        if (this.embedOptions.exportSettings.showImage === false) {
            arg.iconsinformation = this._arraySlice(arg.exportOptionCollection, "id", "image");
        }
        if (this.embedOptions.exportSettings.showPDF === false) {
            arg.iconsinformation = this._arraySlice(arg.exportOptionCollection, "id", "pdf");
        }
        if (this.embedOptions.exportSettings.showCSV === false) {
            arg.iconsinformation = this._arraySlice(arg.exportOptionCollection, "id", "csv");
        }
    };

    _onBoldBIBeforeNavigateUrlLinking(arg) {
        var clientFnc = window[this.embedOptions.beforeNavigateUrlLinking];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (this.embedOptions.beforeNavigateUrlLinking instanceof Function) {
            this.embedOptions.beforeNavigateUrlLinking.call(this, arg);
        }
    };

    _onBoldBIBeforeNavigateToDashboard(arg) {
        var clientFnc = window[this.embedOptions.beforeNavigateToDashboard];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (this.embedOptions.beforeNavigateToDashboard instanceof Function) {
            this.embedOptions.beforeNavigateToDashboard.call(this, arg);
        }
    };

    _onBoldBIAuthorizionComplete(arg) {
        var clientFnc = window[this.embedOptions.authorizationServer.authorizionComplete];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (this.embedOptions.authorizationServer.authorizionComplete instanceof Function) {
            this.embedOptions.authorizationServer.authorizionComplete.call(this, arg);
        }
    };

    _showLoader() {
        var loaderStyle = document.createElement('style');
        loaderStyle.innerHTML = '#' + this.embedOptions.embedContainerId + ' .viewer-blue-loader { display: block !important; }	' +
            ' #' + this.embedOptions.embedContainerId + ' .loader-icon { display: block; }' +
            ' #' + this.embedOptions.embedContainerId + ' .loader-icon { left: 0px !important; position: relative; margin: 0px auto; width: 54px; height: 54px; }' +
            ' #' + this.embedOptions.embedContainerId + ' .loader-icon .circular { -webkit-animation: rotate 2s linear infinite; animation: rotate 2s linear infinite; height: 54px; width: 54px; position: relative; }' +
            ' #' + this.embedOptions.embedContainerId + ' .loader-icon .path { stroke-dasharray: 1,200; stroke-dashoffset: 0; -webkit-animation: dash 1.5s ease-in-out infinite; animation: dash 1.5s ease-in-out infinite; stroke: #5592FB; stroke-linecap: square; }' +
            ' @keyframes rotate { 100% { transform: rotate(360deg); } }' +
            ' @-webkit-keyframes rotate { 100% { transform: rotate(360deg); } }' +
            ' @keyframes dash { 0% { stroke-dasharray: 1,200; stroke-dashoffset: 0; } 50% { stroke-dasharray: 89,200; stroke-dashoffset: -35; } 100% { stroke-dasharray: 89,200; stroke-dashoffset: -124; } }' +
            ' @-webkit-keyframes dash { 0% { stroke-dasharray: 1,200; stroke-dashoffset: 0; } 50% { stroke-dasharray: 89,200; stroke-dashoffset: -35; } 100% { stroke-dasharray: 89,200; stroke-dashoffset: -124; } }';

        document.head.appendChild(loaderStyle);

        var loader = "<div class='preloader-wrap viewer-blue-loader' style='display: none; width: " + this.embedOptions.width + ";height: " + this.embedOptions.height + "; top: 0; bottom: 0; z-index : 2;'> <div id='loader_image' align='center' style='position:relative;top:45%;'> <div class='loader-blue loader-icon' id='loader-icon'> <svg class='circular'> <circle class='path' cx='27' cy='27' r='20' fill='none' stroke-width='4' stroke-miterlimit='10'></circle> </svg> </div> </div> </div>";
        this._removeElement("embedded-bi-error");
        document.getElementById(this.embedOptions.embedContainerId).insertAdjacentHTML('afterbegin', loader);
    };

    _getAuthorizationToken(dashboardId) {
        var embedDbrdId = dashboardId ? dashboardId : this.embedOptions.dashboardId;
        var embedQuerString = "embed_nonce=" + this._uuidv4Generartor() +
            "&embed_dashboard_id=" + embedDbrdId +
            "&embed_dashboard_path=" + this.embedOptions.dashboardPath +
            "&pinboard_name=" + (this.pinBoardRendered ? this.embedOptions.pinboardName : '') +
            "&embed_mode=" + this.embedOptions.mode +
            "&embed_timestamp=" + Math.round((new Date()).getTime() / 1000) +
            "&embed_expirationtime=" + this.embedOptions.expirationTime;

        if (this.isWidgetMode) {
            embedQuerString = embedQuerString +
                "&embed_widget_isenabled=" + this.isWidgetMode +
                "&embed_widget_name=" + this.widgetName;
        }

        if (!this._isEmptyOrSpaces(this.embedOptions.datasourceId)) {
            embedQuerString = embedQuerString +
                "&embed_datasource_id=" + this.embedOptions.datasourceId;
        }
        else if (!this._isEmptyOrSpaces(this.embedOptions.datasourceName)) {
            embedQuerString = embedQuerString +
                "&embed_datasource_name=" + this.embedOptions.datasourceName;
        }

        var data = {
            embedQuerString: encodeURI(embedQuerString),
            dashboardServerApiUrl: this.dashboardServerApiUrl,
        };

        if (this.embedOptions.authorizationServer.url != '') {
            this._xhrRequestHelper("POST", this.embedOptions.authorizationServer.url, data, this.embedOptions.authorizationServer.headers, this._renderDashboard);

        } else {
            this._renderDashboard(this.embedOptions.authorizationServer.data);
        }
        this.pinBoardRendered = true;
    };

    _xhrRequestHelper(type, url, data, headers, callBackFn) {
        var that = this;
        var http = new XMLHttpRequest();

        http.open(type, url, true);
        http.responseType = 'json';
        http.setRequestHeader("Content-type", "application/json");

        for (var key in headers) {
            http.setRequestHeader(key, headers[key]);
        }

        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                callBackFn.call(that, typeof http.response == "object" ? http.response : JSON.parse(http.response));
            }
            else if (http.readyState == 4 && http.status == 404) {
                that._throwError("Server not found");
            }
            else if (http.readyState == 4) {
                that._throwError(http.statusText);
            }
        };

        http.send(JSON.stringify(data));
    };

    _emptyHtml(elementID) {
        document.getElementById(elementID).innerHTML = "";
    };

    _removeElement(id) {
        var elem = document.getElementById(id);
        if (elem !== null)
            elem.parentNode.removeChild(elem);
    };

    _uuidv4Generartor() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    _isEmptyOrSpaces(str) {
        return typeof (str) === "undefined" || str === null || str.match(/^ *$/) !== null;
    };

    _isNullOrUndefined(value) {
        return value === undefined || value === null;
    };

    _validateOptions(options) {
        if (this._isEmptyOrSpaces(options.serverUrl)) {
            this._throwError("Server URL cannot be empty", options.embedContainerId);
        }
        if (!this._isEmptyOrSpaces(options.pinboardName)) {
            return true;
        }
        if (this._isEmptyOrSpaces(options.dashboardId) && this._isEmptyOrSpaces(options.dashboardPath) && options.mode !== BoldBI.Mode.Design) {
            this._throwError("Dashboard id or path cannot be empty", options.embedContainerId);
        }
        if (this._isEmptyOrSpaces(options.embedContainerId)) {
            throw "BoldBI Embedded: Embedded DOM id cannot be empty";
        }
        return true;
    };

    _throwError(errorMsg, embedContainerId) {
        embedContainerId = this._isEmptyOrSpaces(embedContainerId) ? this.embedOptions.embedContainerId : embedContainerId;
        this._removeElementsClass(embedContainerId, ".preloader-wrap", "viewer-blue-loader");
        var errorMessage = "<div id='embedded-bi-error' style='display:table;height:100%;width:100%;'><div style='display: table-cell;vertical-align: middle;text-align: center;'><div style='display: inline-block;'><img src='" + this.errorImage + "' style='float: left'/><div style='float: left;margin-left: 10px;line-height: 20px;'>BoldBI Embedded: " + errorMsg + "</div></div>";
        document.getElementById(embedContainerId).innerHTML = errorMessage;
        throw "BoldBI Embedded: " + errorMsg;
    };

    _removeElementsClass(id, childElement, targeClass) {
        var nodeList = [];
        if (this._isEmptyOrSpaces(id)) {
            nodeList = document.querySelector(childElement);
        } else if (this._isEmptyOrSpaces(childElement)) {
            nodeList.push(document.getElementById(id));
        } else {
            nodeList = document.getElementById(id).querySelectorAll(childElement);
        }
        nodeList.forEach(function (element) {
            this._removeClass(element, targeClass);
        }.bind(this));
    };

    _hasClass(el, className) {
        if (el.classList)
            return el.classList.contains(className);
        return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    };

    _addClass(el, className) {
        if (el.classList)
            el.classList.add(className)
        else if (!this._hasClass(el, className))
            el.className += " " + className;
    };

    _removeClass(el, className) {
        if (el.classList)
            el.classList.remove(className);
        else if (this._hasClass(el, className)) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            el.className = el.className.replace(reg, ' ');
        }
    };

    _arraySlice(arr, key, value) {

        arr.forEach(function (item, index, object) {
            if (item[key] === value) {
                object.splice(index, 1);
            }
        }.bind(this));
        return arr;
    };

    _getFilterData(filterQuery) {
        var processData = [];
        var decryptfilterParam = decodeURI(filterQuery).
            replace(/~&~/g, String.fromCharCode(251) + String.fromCharCode(251)).
            replace(/~=~/g, String.fromCharCode(250) + String.fromCharCode(250)).
            replace(/~[?]~/g, String.fromCharCode(253) + String.fromCharCode(253)).
            replace(/~[/]~/g, String.fromCharCode(254) + String.fromCharCode(254)).
            replace(/&&/g, '&').
            replace(/&/g, '|,|').
            replace(/=/g, '|:|').
            replace(/~,~/g, String.fromCharCode(252) + String.fromCharCode(252));
        var splitFilterParamObj = decryptfilterParam.split('|,|');
        for (var index = 0; index < splitFilterParamObj.length; index++) {
            var splitFilterQuery = splitFilterParamObj[index].split('|:|');
            if (splitFilterQuery.length >= 2 && splitFilterQuery[0].trim().toUpperCase() === 'FILTERQUERY') {
                var filterValue = splitFilterQuery[1];
                var filterData = $.parseJSON(filterValue);
                if (filterData !== '' && filterData.length !== 0) {
                    processData = this._lengthensSelectedFilterInfo(filterData);
                    this._unEscapeSelectedFilterDataforURLFilter(processData.masterData);
                }
                continue;
            }

        }
        return this._createFilterCollection(processData.masterData);
    };

    _createFilterCollection(masterdata) {
        var collection = [];

        masterdata.forEach(function (filter) {
            var columnName = filter.ColumnName;
            var values = [];
            if (filter.InitialDateFilter.DisplayDateFilterList.length > 0) {
                values = filter.InitialDateFilter.DisplayDateFilterList;
                if (filter.IsRange)
                    values = [values[0] + " - " + values[1]];
            }
            if (filter.InitialMeasureFilter.Values.length > 0)
                values = filter.InitialMeasureFilter.Values;
            if (filter.InitialDimensionFilter.Text.length > 0) {
                values = filter.InitialDimensionFilter.Text;
                columnName = columnName + " (" + filter.InitialDimensionFilter.DimesnionFilterCondition + ")"
            }
            if (filter.InitialDimensionFilter.Text.length > 0)
                values = filter.InitialDimensionFilter.Text;
            collection.push({ "ColumnName": columnName, "Values": values });
        }.bind(this));
        return collection;
    };

    _lengthensSelectedFilterInfo(shortenFilterInfoList) {
        var unMinifiedList = [];
        var shortenListLen = shortenFilterInfoList.length;
        for (var index = 0; index < shortenListLen; index++) {
            var minObj = shortenFilterInfoList[index];
            var unMinifyObj = new SelectedFilterValue();
            if (this._hasValue(minObj, shortenEnum.UniqueColumnName)) {
                unMinifyObj[lengthenEnum.UniqueColumnName] = minObj[shortenEnum.UniqueColumnName];
            }
            if (this._hasValue(minObj, shortenEnum.ReportName)) {
                unMinifyObj[lengthenEnum.ReportName] = minObj[shortenEnum.ReportName];
            }
            if (this._hasValue(minObj, shortenEnum.IsStdDateTime)) {
                unMinifyObj[lengthenEnum.IsStdDateTime] = minObj[shortenEnum.IsStdDateTime];
            }
            if (this._hasValue(minObj, shortenEnum.IsRange)) {
                unMinifyObj[lengthenEnum.IsRange] = minObj[shortenEnum.IsRange];
            }
            if (this._hasValue(minObj, shortenEnum.IsGroupBarFilter)) {
                unMinifyObj[lengthenEnum.IsGroupBarFilter] = minObj[shortenEnum.IsGroupBarFilter];
            }
            if (this._hasValue(minObj, shortenEnum.IsMultiSelection)) {
                unMinifyObj[lengthenEnum.IsMultiSelection] = minObj[shortenEnum.IsMultiSelection];
            }
            if (this._hasValue(minObj, shortenEnum.ColumnName)) {
                unMinifyObj[lengthenEnum.ColumnName] = minObj[shortenEnum.ColumnName];
            }
            if (this._hasValue(minObj, shortenEnum.FieldId)) {
                unMinifyObj[lengthenEnum.FieldId] = minObj[shortenEnum.FieldId];
            }
            if (this._hasValue(minObj, shortenEnum.IsPoPWidget)) {
                unMinifyObj[lengthenEnum.IsPoPWidget] = minObj[shortenEnum.IsPoPWidget];
            }
            if (this._hasValue(minObj, shortenEnum.InitialDateFilter)) {
                if (this._hasValue(minObj[shortenEnum.InitialDateFilter], shortenEnum.DateFilterCondition)) {
                    unMinifyObj.InitialDateFilter[lengthenEnum.DateFilterCondition] =
                        minObj[shortenEnum.InitialDateFilter][shortenEnum.DateFilterCondition];
                }
                if (this._hasValue(minObj[shortenEnum.InitialDateFilter], shortenEnum.DateFilterList)) {
                    unMinifyObj.InitialDateFilter[lengthenEnum.DateFilterList] =
                        minObj[shortenEnum.InitialDateFilter][shortenEnum.DateFilterList];
                }
                if (this._hasValue(minObj[shortenEnum.InitialDateFilter], shortenEnum.DateFilterType)) {
                    unMinifyObj.InitialDateFilter[lengthenEnum.DateFilterType] =
                        minObj[shortenEnum.InitialDateFilter][shortenEnum.DateFilterType];
                }
                if (this._hasValue(minObj[shortenEnum.InitialDateFilter], shortenEnum.DisplayDateFilterList)) {
                    unMinifyObj.InitialDateFilter[lengthenEnum.DisplayDateFilterList] =
                        minObj[shortenEnum.InitialDateFilter][shortenEnum.DisplayDateFilterList];
                }
                if (this._hasValue(minObj[shortenEnum.InitialDateFilter], shortenEnum.DateFormat)) {
                    unMinifyObj.InitialDateFilter[lengthenEnum.DateFormat] =
                        minObj[shortenEnum.InitialDateFilter][shortenEnum.DateFormat];
                }
                if (this._hasValue(minObj[shortenEnum.InitialDateFilter], shortenEnum.SelectedRangeforRelativeFilter)) {
                    unMinifyObj.InitialDateFilter[lengthenEnum.SelectedRangeforRelativeFilter] =
                        minObj[shortenEnum.InitialDateFilter][shortenEnum.SelectedRangeforRelativeFilter];
                }
            }
            if (this._hasValue(minObj, shortenEnum.InitialDimensionFilter)) {
                if (this._hasValue(minObj[shortenEnum.InitialDimensionFilter], shortenEnum.DimesnionFilterCondition)) {
                    unMinifyObj.InitialDimensionFilter[lengthenEnum.DimesnionFilterCondition] =
                        minObj[shortenEnum.InitialDimensionFilter][shortenEnum.DimesnionFilterCondition];
                }
                if (this._hasValue(minObj[shortenEnum.InitialDimensionFilter], shortenEnum.Text)) {
                    unMinifyObj.InitialDimensionFilter[lengthenEnum.Text] = minObj[shortenEnum.InitialDimensionFilter][shortenEnum.Text];
                }
            }
            if (this._hasValue(minObj, shortenEnum.InitialMeasureFilter)) {
                if (this._hasValue(minObj[shortenEnum.InitialMeasureFilter], shortenEnum.MeasureFilterCondition)) {
                    unMinifyObj.InitialMeasureFilter[lengthenEnum.MeasureFilterCondition] =
                        minObj[shortenEnum.InitialMeasureFilter][shortenEnum.MeasureFilterCondition];
                }
                if (this._hasValue(minObj[shortenEnum.InitialMeasureFilter], shortenEnum.Values)) {
                    unMinifyObj.InitialMeasureFilter[lengthenEnum.Values] = minObj[shortenEnum.InitialMeasureFilter][shortenEnum.Values];
                }
            }
            if (this._hasValue(minObj, shortenEnum.PoPFilter)) {
                if (this._hasValue(minObj[shortenEnum.PoPFilter], shortenEnum.DateFieldId)) {
                    unMinifyObj.PoPFilter[lengthenEnum.DateFieldId] = minObj[shortenEnum.PoPFilter][shortenEnum.DateFieldId];
                }
                if (this._hasValue(minObj[shortenEnum.PoPFilter], shortenEnum.PrimaryType)) {
                    unMinifyObj.PoPFilter[lengthenEnum.PrimaryType] = minObj[shortenEnum.PoPFilter][shortenEnum.PrimaryType];
                }
                if (this._hasValue(minObj[shortenEnum.PoPFilter], shortenEnum.SecondaryType)) {
                    unMinifyObj.PoPFilter[lengthenEnum.SecondaryType] = minObj[shortenEnum.PoPFilter][shortenEnum.SecondaryType];
                }
                if (this._hasValue(minObj[shortenEnum.PoPFilter], shortenEnum.PrimaryCustomRange)) {
                    //tslint:disable-next-line:max-line-length
                    unMinifyObj.PoPFilter[lengthenEnum.PrimaryCustomRange][lengthenEnum.StartRange] = minObj[shortenEnum.PoPFilter][shortenEnum.PrimaryCustomRange][shortenEnum.StartRange];
                    //tslint:disable-next-line:max-line-length
                    unMinifyObj.PoPFilter[lengthenEnum.PrimaryCustomRange][lengthenEnum.EndRange] = minObj[shortenEnum.PoPFilter][shortenEnum.PrimaryCustomRange][shortenEnum.EndRange];
                }
                if (this._hasValue(minObj[shortenEnum.PoPFilter], shortenEnum.SecondaryCustomRange)) {
                    if (minObj[shortenEnum.PoPFilter][shortenEnum.SecondaryCustomRange].length > 0) {
                        //tslint:disable-next-line:max-line-length
                        unMinifyObj.PoPFilter[lengthenEnum.SecondaryCustomRange][0][lengthenEnum.StartRange] = minObj[shortenEnum.PoPFilter][shortenEnum.SecondaryCustomRange][0][shortenEnum.StartRange];
                        unMinifyObj.PoPFilter[lengthenEnum.SecondaryCustomRange][0][lengthenEnum.EndRange] = minObj[shortenEnum.PoPFilter][shortenEnum.SecondaryCustomRange][0][shortenEnum.EndRange];
                    }
                }
            }
            if (this._hasValue(unMinifyObj, lengthenEnum.UniqueColumnName) && this._hasValue(unMinifyObj, lengthenEnum.ReportName)) {
                unMinifiedList.push(unMinifyObj);
            }
        }
        return { masterData: unMinifiedList };
    };

    _hasValue(filterObj, property) {
        return !this._isNullOrUndefined(filterObj) && !this._isNullOrUndefined(filterObj[property]);
    };

    _unEscapeSelectedFilterDataforURLFilter(filterInfoList) {
        for (var index = 0; index < filterInfoList.length; index++) {
            var filterInfo = filterInfoList[index];
            if ((!this._isNullOrUndefined(filterInfo.InitialDimensionFilter.Text) && filterInfo.InitialDimensionFilter.Text.length !== 0)) {
                for (var i = 0; i < filterInfo.InitialDimensionFilter.Text.length; i++) {
                    //tslint:disable-next-line:max-line-length
                    filterInfo.InitialDimensionFilter.Text[i] = filterInfo.InitialDimensionFilter.Text[i].replaceAll(String.fromCharCode(252) + String.fromCharCode(252), ',').
                        replaceAll(String.fromCharCode(251) + String.fromCharCode(251), '&').
                        replaceAll(String.fromCharCode(250) + String.fromCharCode(250), '=').
                        replaceAll(String.fromCharCode(253) + String.fromCharCode(253), '?').
                        replaceAll(String.fromCharCode(254) + String.fromCharCode(254), '/');
                }
            }
        }
        return filterInfoList;
    };
}

BoldBI.Mode = {
    View: "view",
    Design: "design",
    Connection: "connection",
    DataSoruce: "dataSource"
};

BoldBI.EmbedType = {
    Component: "component",
    IFrame: "iframe"
};

BoldBI.Environment = {
    Cloud: "cloud",
    Enterprise: "onpremise"
};

BoldBI.Theme = {
    Off: "off",
    Light: "light",
    Dark: "dark"
};

BoldBI._instance = {
    _storage: new WeakMap(),
    put: function (element, key, obj) {
        if (!this._storage.has(element)) {
            this._storage.set(element, new Map());
        }
        this._storage.get(element).set(key, obj);
    },
    get: function (element, key) {
        if (this._storage.has(element)) {
            return this._storage.get(element).get(key);
        }
    },
    has: function (element, key) {
        return this._storage.has(element) && this._storage.get(element).has(key);
    },
    remove: function (element, key) {
        if (this._storage.has(element)) {
            var ret = this._storage.get(element).delete(key);
            if (this._storage.get(element).size !== 0) {
                this._storage.delete(element);
            }
            return ret;
        }
    }
};
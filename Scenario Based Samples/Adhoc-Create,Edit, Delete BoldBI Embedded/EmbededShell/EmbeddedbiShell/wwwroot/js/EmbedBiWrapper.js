class BoldBI {
    static Mode = {
        View: "view",
        Design: "design",
        Connection: "connection",
        DataSoruce: "dataSource"
    };

    static EmbedType = {
        Component: "component",
        IFrame: "iframe"
    };

    static Environment = {
        Cloud: "cloud",
        Enterprise: "enterprise"
    };

    static Theme = {
        Off: "off",
        Light: "light",
        Dark: "dark"
    };

    IsDependencyLoaded = false;

    rootUrl = "";
    baseUrl = "";
    siteIdentifier = "";
    dashboardServerApiUrl = "";
    designerRootUrl = "";
    scheduleEndpointUrl = "";
    childContainer = "";
    cdnLink = "";
    onSaveFilterFn = "saveFilter";
    onSaveAsFilterFn = "saveAsFilter";
    onViewSavedFiltersFn = "openViewSection";
    onBannerIconClickFn = "onBannerIconClick";
    beforeWidgetIconRenderedFn = "beforeWidgetIconRendered";
    onWidgetIconClickFn = "onWidgetIconClick";
    actionBeginFn = "onActionBeginOfNewDashboardViewer";
    actionCompleteFn = "onActionCompleteOfNewDashboardViewer";
    beforeBannerIconRenderFn = "beforeBannerIconRender";
    beforeOtherRenderFn = "beforeOtherOptionContextMenuRender";
    isWidgetMode = false;
    widgetName = "";
    isDashboardViewMode = false;
    dashboardViewName = "";
    errorImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjExNzgwNzk4MzhBOTExRTQ4MDMxRTZEMkIzQUQzNjdCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjExNzgwNzk5MzhBOTExRTQ4MDMxRTZEMkIzQUQzNjdCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTE3ODA3OTYzOEE5MTFFNDgwMzFFNkQyQjNBRDM2N0IiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTE3ODA3OTczOEE5MTFFNDgwMzFFNkQyQjNBRDM2N0IiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4RB5yjAAABXklEQVR42rRUsU7DQAzNRWxESMydK2XsAhtiQGHo1LmsZYCBMSNDx3wASJQ1zN0rJjZYOlbqDCsSPxCeq5f0anwtSMHSk52L/c4++85VVRW1KXu14ZwLOn2enK1+Hr48B3evE3ONoQhBcgw1AjKgw+V3YAY8gvz1V4QgOoC6B4b0nQML2inQo/0EXIH4K0hIMslAspsCOQKWKvMuVAEMAMkyE9KmF2LUH3AugQoYK5IbgVob07f0eWJ1ZlLmFDveqjM/JRqhj1QxZOxKYs9nRJ0bTdwHEmM9V7EbhNLNuT4zSkLSSGW5ZNMyi7DjddMiTAL/Ft5YrQd7h3z8+aZwaFPLCaX1t3CkjP1Rssxfj3Omb825wFjvctBnFuGEujCyeCC0FCp2TYiy3qBkSAd6sCF9YmOweVtKxv7P1Qs9DnfAxY7HQaq53vo4qEyOoC4Dz9fEL9MkbEviqGX5FmAA1Vq0VgBUvekAAAAASUVORK5CYII=";

    scriptFiles = [
        "ej1.common.all.min.js",
        "ej2.common.all.min.js",
    ];

    ejDependentFiles = [
        "ej.dashboarddesigner.min.js",
    ];

    designerScriptFiles = [
        "ej1.web.all.min.js",
        "ej2.web.all.min.js",
    ];

    cssFiles = [
        "ej1.web.all.min.css",
        "ej2.partone.web.all.min.css",
        "ej2.parttwo.web.all.min.css",
        "ej.designerwidgets.all.min.css",
        "ej.dashboarddesigner.min.css",
    ];

    embedOptions = {
        serverUrl: "",
        dashboardId: "",
        dashboardPath: "",
        datasourceId: "",
        datasourceName: "",
        embedContainerId: "",
        embedType: "component",
        environment: "enterprise",
        mode: "view",
        dashboardSettings: {
            showHeader: true,
            showExport: true,
            showRefresh: true,
            showMoreOption: true,
            onFavoriteIconClick: "",
            beforeIconRender: "",
            onIconClick: "",
            onInteraction: "",
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
        theme: "light",
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
            showToolbar: true,
			showPanel: true,
        }

    };

    // Customer exposed functions
    static create(options) {
        var boldBIObj = new BoldBI();
        if (boldBIObj._validateOptions(options)) {
            boldBIObj._initializeEmbedOptions(options);
            if (boldBIObj.embedOptions.embedType == BoldBI.EmbedType.Component) {
                boldBIObj.childContainer = document.createElement("div");
                boldBIObj.childContainer.id = boldBIObj.embedOptions.embedContainerId + "_embeddedbi";
                document.getElementById(boldBIObj.embedOptions.embedContainerId).append(boldBIObj.childContainer);
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
        var existingDashboardInstance = this._getDashboardInstance();
        if (existingDashboardInstance != undefined) {
            existingDashboardInstance.destroy();
        }
        BoldBI._instance.remove(document.getElementById(this.embedOptions.childContainer.Id), "embeddedBoldBI");
    };

    loadDashboard(dashboardId) {
        if (this.embedOptions.mode !== BoldBI.Mode.View) {
            this._throwError("Invalid embed mode");
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

    loadDashboardView(name) {
        this._throwError("loadDashboardView not implemented");
    };

    loadDashboardWidget(name) {
        if (this._isEmptyOrSpaces(name)) {
            this._throwError("Widget name should be empty");
        }
        if (this.embedOptions.embedType == BoldBI.EmbedType.Component) {
            this.isWidgetMode = true;
            this.widgetName = name;
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

    loadDesigner(dashboardId) {
        if (this.embedOptions.mode === BoldBI.Mode.View) {
            this._throwError("Invalid embed mode");
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
            this.dashboardServerApiUrl = this.rootUrl + "/api/" + this.siteIdentifier;
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
            this._addedDependentFiles(this, this.scriptFiles, false);
        }

        this._addedDependentFiles(this, this.cssFiles, true);
        this._loadDependentDesignerFiles(this);
    };

    _loadDependentDesignerFiles(that) {
        if (window.ej instanceof Object && window.ej.createObject instanceof Function) {
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
                    if (that.embedOptions.environment === BoldBI.Environment.Enterprise)
                        fileUri = that.rootUrl + "/webdesignerservice/themes/" + file;
                    else
                        fileUri = that.cdnLink + "/css/designer/" + file;

                    var cssTag = document.createElement("link");
                    cssTag.rel = "stylesheet";
                    cssTag.href = fileUri;
                    document.head.appendChild(cssTag);
                }
                else {
                    if (that.embedOptions.environment === BoldBI.Environment.Enterprise)
                        fileUri = that.rootUrl + "/webdesignerservice/scripts/" + file;
                    else
                        fileUri = that.cdnLink + "/scripts/designer/" + file;

                    var scriptTag = document.createElement("script");
                    scriptTag.type = "text/javascript";
                    scriptTag.src = fileUri
                    document.head.appendChild(scriptTag);
                }
            }
        }.bind(that));
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
            embedResponse.ItemDetail = JSON.parse(responseInfo.Data.ItemDetail);
            if (typeof (responseInfo.Data.UserDetail) !== "undefined") {
                embedResponse.UserDetail = JSON.parse(responseInfo.Data.UserDetail);
            }

            this._onBoldBIAuthorizionComplete(embedResponse);

            document.getElementById(this.embedOptions.embedContainerId).style.height = this.embedOptions.height;
            document.getElementById(this.embedOptions.embedContainerId).style.width = this.embedOptions.width;

            var dashboardOptions = {
                siteUrl: this.baseUrl,
                serviceUrl: this.designerRootUrl,
                dataServiceUrl: this.designerRootUrl,
                serverUrl: this.dashboardServerApiUrl,
                viewerSettings: {
                    serviceUrl: this.designerRootUrl + "/v1.0/design",
                },
                mode: this.embedOptions.mode,
                IsEmbed: true,
                _isPublic: embedResponse.ItemDetail.IsPublic,
                itemId: embedResponse.ItemDetail.Id,
                dashboardPath: embedResponse.ItemDetail.ItemLocation,
                serviceAuthorizationToken: embedResponse.access_token,
                dashboardName: embedResponse.ItemDetail.Name,
                dashboardDescription: embedResponse.ItemDetail.Description,
                theme: this.embedOptions.theme,
                export: {
                    Image: this.embedOptions.exportSettings.showImage,
                    Excel: this.embedOptions.exportSettings.showExcel,
                    Pdf: this.embedOptions.exportSettings.showPDF
                },
                filterParameters: parameter + (this._isEmptyOrSpaces(this.embedOptions.filterParameters) ? "" : "&") + this.embedOptions.filterParameters,
                actionBegin: function (arg) {
                    that._onBoldBIDashboardInstaceActionBegin(arg);
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

            };

            if (this.embedOptions.mode == BoldBI.Mode.Design) {
                if (embedResponse.ItemDetail.IsDraft) {
                    dashboardOptions.dashboardPath = "";
                    var datasourceId = !this._isEmptyOrSpaces(embedResponse.DatasourceId) ? embedResponse.DatasourceId : "";
                    if (!this._isEmptyOrSpaces(datasourceId)) {
                        dashboardOptions.datasource = datasourceId;
                    }
                }

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
				dashboardOptions.showItemPanel = this.embedOptions.toolbarSettings.showPanel;
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
            if (this.embedOptions.environment == BoldBI.Environment.Enterprise) {
                dashboardOptions.cdnPath = this.rootUrl + "/webdesignerservice/scripts/";
            } else {
                dashboardOptions.cdnPath = this.cdnLink + "/scripts/designer/";
            }

            if (this.embedOptions.autoRefreshSettings.enabled) {
                dashboardOptions.enableAutoRefresh = true;
                dashboardOptions.autoRefreshSettings = {
                    mode: "Hourly",
                    hourlySchedule: {
                        hours: this.embedOptions.autoRefreshSettings.hourlySchedule.hours,
                        minutes: this.embedOptions.autoRefreshSettings.hourlySchedule.minutes,
                        seconds: this.embedOptions.autoRefreshSettings.hourlySchedule.seconds
                    }
                };
            }

            if (window.jQuery instanceof Function) {
                var embedContainer = window.jQuery.call(that, "#" + that.childContainer.id);
                if (window.ejDashboardDesigner instanceof Function) {
                    var existingDashboardInstance = this._getDashboardInstance();
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
        }

        this._removeElementsClass(this.embedOptions.embedContainerId, ".preloader-wrap", "viewer-blue-loader");
    };

    _isDependencyLoaded(that) {
        if (window.jQuery instanceof Function &&
            window.ej instanceof Object &&
            window.ej.dashboardDesigner instanceof Object &&
            window.ejDashboardDesigner instanceof Function) {
            if (!that.IsDependencyLoaded) {
                that.IsDependencyLoaded = true;
            }
            that._getAuthorizationToken();

        } else {
            setTimeout(that._isDependencyLoaded, 500, that);
        }
    };

    _getDashboardInstance() {
        var ele = window.jQuery.call(this, "#" + this.childContainer.id)[0];
        return window.jQuery.data.call(this, ele, "ejDashboardDesigner");
    };

    _onBoldBIDashboardInstaceActionBegin(arg) {

        if (typeof (arg) != "undefined") {
            switch (arg.eventType) {
                case "renderLayout":
                    this._removeElementsClass(this.embedOptions.embedContainerId, ".preloader-wrap", "viewer-blue-loader");
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

        } else {

            if (serverFnc instanceof Function) {
                serverFnc.call(this, arg);
            }

            var clientFnc = window[this.embedOptions.actionComplete];
            if (clientFnc instanceof Function) {
                clientFnc.call(this, arg);
            }
        }
    };

    _onBoldBIDashboardBeforeBannerIconRender(arg) {
        if (this.embedOptions.dashboardSettings.showMoreOption === false || (this.embedOptions.dashboardSettings.showRefresh === false && this.embedOptions.dashboardSettings.showExport === false)) {
            arg.iconsinformation = this._arraySlice(arg.iconsinformation, "groupName", "Option");
        }
        var serverFnc = window[this.beforeBannerIconRenderFn];
        if (serverFnc instanceof Function) {
            serverFnc.call(this, arg);
        }
        var clientFnc = window[this.embedOptions.dashboardSettings.beforeIconRender];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
    };

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
    };

    _onBoldBIDashboardBannerIconClick(arg) {
        var serverFnc = window[this.onBannerIconClickFn];
        if (serverFnc instanceof Function) {
            serverFnc.call(this, arg);
        }

        var clientFnc = window[this.embedOptions.dashboardSettings.onIconClick];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }

        if (typeof (arg.name) != "undefined" && arg.name.toLowerCase() == "theming") {
            var dashboardViewerInstance = this._getDashboardInstance();
            dashboardViewerInstance.applyDashboardTheme(arg.themeValue);

        }

    };

    _onBoldBIDashboardBeforeWidgetIconRendered(arg) {
        if (this.embedOptions.widgetSettings.showMaximize === false) {
            arg.iconsinformation = this._arraySlice(arg.iconsinformation, "name", "maximize");
        }
        if (this.embedOptions.widgetSettings.showFilter === false) {
            arg.iconsinformation = this._arraySlice(arg.iconsinformation, "name", "filter");
        }
        if (this.embedOptions.widgetSettings.showExport === false) {
            arg.iconsinformation = this._arraySlice(arg.iconsinformation, "name", "export");
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
    };

    _onBoldBIDashboardWidgetIconClick(arg) {
        var serverFnc = window[this.onWidgetIconClickFn];
        if (serverFnc instanceof Function) {
            serverFnc.call(this, arg);
        }

        var clientFnc = window[this.embedOptions.widgetSettings.onIconClick];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
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
    };

    _onBoldBIBeforeNavigateToDashboard(arg) {
        var clientFnc = window[this.embedOptions.beforeNavigateToDashboard];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
    };

    _onBoldBIAuthorizionComplete(arg) {
        var clientFnc = window[this.embedOptions.authorizationServer.authorizionComplete];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
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

    _getAuthorizationToken() {

        var embedQuerString = "embed_nonce=" + this._uuidv4Generartor() +
            "&embed_dashboard_id=" + this.embedOptions.dashboardId +
            "&embed_dashboard_path=" + this.embedOptions.dashboardPath +
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

        this._xhrRequestHelper("POST", this.embedOptions.authorizationServer.url, data, this.embedOptions.authorizationServer.headers, this._renderDashboard);

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

    static _instance = {
        _storage: new WeakMap(),
        put: function (element, key, obj) {
            if (!this._storage.has(element)) {
                this._storage.set(element, new Map());
            }
            this._storage.get(element).set(key, obj);
        },
        get: function (element, key) {
            return this._storage.get(element).get(key);
        },
        has: function (element, key) {
            return this._storage.has(element) && this._storage.get(element).has(key);
        },
        remove: function (element, key) {
            var ret = this._storage.get(element).delete(key);
            if (this._storage.get(element).size !== 0) {
                this._storage.delete(element);
            }
            return ret;
        }
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
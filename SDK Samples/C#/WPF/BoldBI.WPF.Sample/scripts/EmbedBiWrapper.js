(function (window) {
    function BoldBIEmbed() {
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
        var sEmbedConfig = {};

        var scriptFiles = [
            "designerlocalization.js",
            "ej1.common.all.min.js",
            "ej2.common.all.min.js",
            "ej.dashboarddesigner.min.js"
        ];

        var scriptFilesCloud = [
            "designerlocalization.js",
            "ej1.common.all.min.js",
            "ej2.common.all.min.js",
            "ej.dashboarddesigner.min.js"
        ];

        var cssFiles = [
            "ej1.web.all.min.css",
            "ej2.partone.web.all.min.css",
            "ej2.parttwo.web.all.min.css",
            "ej.designerwidgets.all.min.css",
            "ej.dashboarddesigner.min.css"
        ];

        var cssFilesCloud = [
            "dashboard-viewer-component.css"
        ];

        var embedOptions = {
            serverUrl: "",
            user: "",
            dashboardId: "",
            dashboardPath: "",
            embedContainerId: "",
            embedType: "Component",
            environment: "OnPremise",
            dashboardSettings: {
                showHeader: true,
                showExport: true,
                showRefresh: true,
                showInfo: true,
                showFavorite: true,
                showFullScreen: true,
                showComments: true,
                onFavoriteIconClick: "",
                beforeIconRender: "",
                onIconClick: ""
            },
            widgetSettings: {
                showHeader: true,
                showExport: true,
                showFullScreen: true,
                showViewData: true,
                showComments: true,
                beforeIconRender: "",
                onIconClick: ""
            },
            enableFilterOverview: true,
            filterParameters: "",
            filterSettings: {
                showSaveIcon: true,
                showSaveAsIcon: true,
                showSavedFilters: true,
                onSaveFilter: "",
                onSaveAsFilter: "",
                onViewSavedFilters: ""
            },
            dynamicConnection: {
                isEnabled: false,
                keyIdentifier: ""
            },
            exportSettings: {
                showExcel: true,
                showPDF: true,
                showImage: true
            },
            height: "768px",
            width: "1024px",
            enableDarkMode: false,
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
                culture: "en-US"
            },
            actionBegin: "",
            actionComplete: ""
        };

        // Customer exposed functions

        this.create = function (options) {
            if (validateOptions(options)) {
                initializeEmbedOptions(options);
                if (embedOptions.embedType == EmbedType.Component) {
                    childContainer = document.createElement("div");
                    childContainer.id = embedOptions.embedContainerId + "_embeddedbi";
                    document.getElementById(embedOptions.embedContainerId).append(childContainer);
                    initializeUrls();
                    if (!window.BoldBI.IsDependencyLoaded) {
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

        this.destroy = function () {
            instance.remove(document.getElementById(embedOptions.embedContainerId), "embeddedBoldBI");
        };

        this.getInstance = function (eleID) {
            return instance.get(document.getElementById(eleID), "embeddedBoldBI");
        };

        this.loadDashboard = function () {
            if (embedOptions.embedType == EmbedType.Component) {
                showLoader();
                isDependencyLoaded();
            } else if (this.embedOptions.embedType == EmbedType.IFrame) {
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

        this.loadDashboardView = function (viewName) {
            throwError("loadDashboardView not implemented");
        };

        this.loadDashboardWidget = function (widgetName) {
            throwError("loadDashboardView not implemented");
        };

        this.refreshDashboard = function () {

            var existingDashboardInstance = getDashboardInstance();
            if (existingDashboardInstance != undefined) {
                existingDashboardInstance.refresh();
            }
        };

        // Internal functions. Will not be accessible outside of this scope.
        var initializeEmbedOptions = function (options) {
            embedOptions = Object.assign(embedOptions, options);
        };

        var initializeUrls = function () {

            if (embedOptions.environment == BoldBI.Environment.OnPremise) {

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

        var loadCloudDepedentFiles = function (responseInfo) {
            var responseData = responseInfo.Data;
            cdnLink = responseData.CdnUrl;
            designerRootUrl = responseData.DesignerServerUrl;
            loadDepedentFiles();
        };

        var getCloudLinks = function () {
            xhrRequestHelper("Get", dashboardServerApiUrl + "/system-settings/get-url", {}, {}, loadCloudDepedentFiles);
        };

        var loadDepedentFiles = function () {
            scriptFiles.forEach(function (script) {
                var scriptTag = document.createElement("script");
                scriptTag.type = "text/javascript";
                if (embedOptions.environment === BoldBI.Environment.OnPremise){
                    if (script === "designerlocalization.js")
                        scriptTag.src = rootUrl + "/designer/localization/" + script;
                    else
                        scriptTag.src = rootUrl + "/webdesignerservice/scripts/" + script;
                }
                else
                    scriptTag.src = cdnLink + "/scripts/designer/" + script;

                document.head.appendChild(scriptTag);
            });

            cssFiles.forEach(function (css) {
                var cssTag = document.createElement("link");
                cssTag.rel = "stylesheet";
                if (embedOptions.environment === BoldBI.Environment.OnPremise)
                    cssTag.href = rootUrl + "/webdesignerservice/themes/" + css;
                else
                    cssTag.href = cdnLink + "/css/designer/" + css;

                document.head.appendChild(cssTag);
            });
        };

        var renderDashboard = function (responseInfo) {

            // if (!responseInfo.Status) {
            //     throwError(responseInfo.Message);
            // } else {
            //     var embedResponse = responseInfo.Data;
            //     embedResponse.ItemDetail = JSON.parse(responseInfo.Data.ItemDetail);
            //     if (typeof (responseInfo.Data.UserDetail) !== "undefined") {
            //         embedResponse.UserDetail = JSON.parse(responseInfo.Data.UserDetail);
            //     }

            //     var version = embedResponse.ItemDetail.ItemLocation.substr(embedResponse.ItemDetail.ItemLocation.lastIndexOf("\\") + 1);
            //     document.getElementById(embedOptions.embedContainerId).style.height = embedOptions.height;
            //     document.getElementById(embedOptions.embedContainerId).style.width = embedOptions.width;

            //     var dashboardOptions = {
            //         siteUrl: baseUrl,
            //         serviceUrl: designerRootUrl,
            //         dataServiceUrl: designerRootUrl,
            //         serverUrl: dashboardServerApiUrl,
            //         viewerSettings: {
            //             serviceUrl: designerRootUrl + "/v1.0/design",
            //         },
            //         mode: ej.dashboardDesigner.mode.view,
            //         IsEmbed: true,
            //         _isPublic: true,
            //         itemId: embedResponse.ItemDetail.Id,
            //         dashboardPath: embedResponse.ItemDetail.Id + "/" + version,
            //         serviceAuthorizationToken: embedResponse.access_token,
            //         dashboardName: embedResponse.ItemDetail.Name,
            //         dashboardDescription: embedResponse.ItemDetail.Description,
            //         theme: embedOptions.enableDarkMode ? "dark" : "light",
            //         actionBegin: function (arg) {
            //             onBoldBIDashboardInstaceActionBegin(arg);
            //         },
            //         actionComplete: function (arg) {
            //             onBoldBIDashboardInstaceActionComplete(arg);
            //         },
            //         beforeBannerIconRender: function (arg) {
            //             onBoldBIDashboardBeforeBannerIconRender(arg);
            //         },
            //         beforeOtherOptionContextMenuRender: function (arg) {
            //             onBoldBIDashboardBeforeOtherOptionContextMenuRender(arg);
            //         },
            //         _onSaveFilter: function (arg) {
            //             onBoldBIDashboardSaveFilter(arg);
            //         },
            //         _onSaveAsFilter: function (arg) {
            //             onBoldBIDashboardSaveAsFilter(arg);
            //         },
            //         _onViewSavedFilters: function (arg) {
            //             onBoldBIDashboardOpenViewSection(arg);
            //         },
            //         onBannerIconClick: function (arg) {
            //             onBoldBIDashboardBannerIconClick(arg);
            //         },
            //         beforeWidgetIconRendered: function (arg) {
            //             onBoldBIDashboardBeforeWidgetIconRendered(arg);
            //         },
            //         onWidgetIconClick: function (arg) {
            //             onBoldBIDashboardWidgetIconClick(arg);
            //         },
            //         _onFavoriteStateChange: function (arg) {
            //             onBoldBIDashboardUpdatefavorite(arg);
            //         },

            //     };

            //     if (embedOptions.environment == BoldBI.Environment.OnPremise) {
            //         dashboardOptions.cdnPath = rootUrl + "/webdesignerservice/scripts/";
            //     } else {
            //         dashboardOptions.cdnPath = cdnLink + "/scripts/designer/";
            //     }

            //     if (embedOptions.autoRefreshSettings.enabled) {
            //         dashboardOptions.autoRefreshSettings = {
            //             mode: "Hourly",
            //             hourlySchedule: {
            //                 hours: embedOptions.autoRefreshSettings.hourlySchedule.hours,
            //                 minutes: embedOptions.autoRefreshSettings.hourlySchedule.minutes,
            //                 seconds: embedOptions.autoRefreshSettings.hourlySchedule.seconds
            //             }
            //         };
            //     }

            //     if (window.jQuery instanceof Function) {
            //         var embedContainer = window.jQuery.call(this, "#" + childContainer.id);
            //         if (window.ejDashboardDesigner instanceof Function) {
            //             var existingDashboardInstance = getDashboardInstance();
            //             if (existingDashboardInstance != undefined) {
            //                 existingDashboardInstance.model = Object.assign(existingDashboardInstance.model, dashboardOptions);
            //                 existingDashboardInstance.redrawDashboard();
            //             } else {
            //                 window.ejDashboardDesigner.call(this, embedContainer, dashboardOptions);
            //             }
            //         } else {
            //             throwError("ejDashboardDesigner is not defined");
            //         }
            //     } else {
            //         throwError("jQuery is not defined");
            //     }
            // }

            var embedResponse = responseInfo.Data;
            embedResponse.ItemDetail = JSON.parse(responseInfo.Data.ItemDetail);
            if (typeof (responseInfo.Data.UserDetail) !== "undefined") {
                embedResponse.UserDetail = JSON.parse(responseInfo.Data.UserDetail);
            }

            var version = 1;
            document.getElementById(embedOptions.embedContainerId).style.height = embedOptions.height;
            document.getElementById(embedOptions.embedContainerId).style.width = embedOptions.width;

            var dashboardOptions = {
                siteUrl: baseUrl,
                serviceUrl: designerRootUrl,
                dataServiceUrl: designerRootUrl,
                serverUrl: dashboardServerApiUrl,
                viewerSettings: {
                    serviceUrl: designerRootUrl + "/v1.0/design"
                },
                mode: ej.dashboardDesigner.mode.view,
                IsEmbed: true,
                _isPublic: true,
                itemId: embedResponse.ItemDetail.Id,
                dashboardPath: embedResponse.ItemDetail.Id + "/" + version,
                serviceAuthorizationToken: embedResponse.access_token,
                dashboardName: embedResponse.ItemDetail.Name,
                dashboardDescription: embedResponse.ItemDetail.Description,
                theme: embedOptions.enableDarkMode ? "dark" : "light",
                actionBegin: function (arg) {
                    onBoldBIDashboardInstaceActionBegin(arg);
                },
                actionComplete: function (arg) {
                    onBoldBIDashboardInstaceActionComplete(arg);
                },
                beforeBannerIconRender: function (arg) {
                    onBoldBIDashboardBeforeBannerIconRender(arg);
                },
                beforeOtherOptionContextMenuRender: function (arg) {
                    onBoldBIDashboardBeforeOtherOptionContextMenuRender(arg);
                },
                _onSaveFilter: function (arg) {
                    onBoldBIDashboardSaveFilter(arg);
                },
                _onSaveAsFilter: function (arg) {
                    onBoldBIDashboardSaveAsFilter(arg);
                },
                _onViewSavedFilters: function (arg) {
                    onBoldBIDashboardOpenViewSection(arg);
                },
                onBannerIconClick: function (arg) {
                    onBoldBIDashboardBannerIconClick(arg);
                },
                beforeWidgetIconRendered: function (arg) {
                    onBoldBIDashboardBeforeWidgetIconRendered(arg);
                },
                onWidgetIconClick: function (arg) {
                    onBoldBIDashboardWidgetIconClick(arg);
                },
                _onFavoriteStateChange: function (arg) {
                    onBoldBIDashboardUpdatefavorite(arg);
                }
            };

            if (embedOptions.environment == BoldBI.Environment.OnPremise) {
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

        };

        var isDependencyLoaded = function () {
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

        var getDashboardInstance = function () {
            var ele = window.jQuery.call(this, "#" + childContainer.id)[0];
            return window.jQuery.data.call(this, ele, "ejDashboardDesigner");
        };

        var onBoldBIDashboardInstaceActionBegin = function (arg) {

            if (typeof (arg) != "undefined") {
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
                serverFnc.call(this, arg, sEmbedConfig);
            }

            var clientFnc = window[embedOptions.actionBegin];
            if (clientFnc instanceof Function) {
                clientFnc.call(this, arg);
            }
        };

        var onBoldBIDashboardInstaceActionComplete = function (arg) {

            var serverFnc = window[actionCompleteFn];
            if (serverFnc instanceof Function) {
                serverFnc.call(this, arg, sEmbedConfig);
            }

            var clientFnc = window[embedOptions.actionCompleteFn];
            if (clientFnc instanceof Function) {
                clientFnc.call(this, arg);
            }
        };

        var onBoldBIDashboardBeforeBannerIconRender = function (arg) {

            var serverFnc = window[beforeBannerIconRenderFn];
            if (serverFnc instanceof Function) {
                serverFnc.call(this, arg, sEmbedConfig);
            }
            var clientFnc = window[embedOptions.dashboardSettings.beforeIconRender];
            if (clientFnc instanceof Function) {
                clientFnc.call(this, arg);
            }
        };

        var onBoldBIDashboardBeforeOtherOptionContextMenuRender = function (arg) {
            var serverFnc = window[beforeOtherRenderFn];
            if (serverFnc instanceof Function) {
                serverFnc.call(this, arg, sEmbedConfig);
            }
        };

        var onBoldBIDashboardSaveFilter = function (arg) {
            var serverFnc = window[onSaveFilterFn];
            if (serverFnc instanceof Function) {
                serverFnc.call(this, arg, sEmbedConfig);
            }

            var clientFnc = window[embedOptions.filterSettings.onSaveFilter];
            if (clientFnc instanceof Function) {
                clientFnc.call(this, arg);
            }
        };

        var onBoldBIDashboardSaveAsFilter = function (arg) {
            var serverFnc = window[onSaveAsFilterFn];
            if (serverFnc instanceof Function) {
                serverFnc.call(this, arg, sEmbedConfig);
            }

            var clientFnc = window[embedOptions.filterSettings.onSaveAsFilter];
            if (clientFnc instanceof Function) {
                clientFnc.call(this, arg);
            }
        };

        var onBoldBIDashboardOpenViewSection = function (arg) {
            var serverFnc = window[onViewSavedFiltersFn];
            if (serverFnc instanceof Function) {
                serverFnc.call(this, arg, sEmbedConfig);
            }

            var clientFnc = window[embedOptions.filterSettings.onViewSavedFilters];
            if (clientFnc instanceof Function) {
                clientFnc.call(this, arg);
            }
        };

        var onBoldBIDashboardBannerIconClick = function (arg) {
            var serverFnc = window[onBannerIconClickFn];
            if (serverFnc instanceof Function) {
                serverFnc.call(this, arg, sEmbedConfig);
            }

            var clientFnc = window[embedOptions.dashboardSettings.onIconClick];
            if (clientFnc instanceof Function) {
                clientFnc.call(this, arg);
            }

            if (typeof (arg.name) != "undefined" && arg.name.toLowerCase() == "theming") {
                var dashboardViewerInstance = getDashboardInstance();
                dashboardViewerInstance.applyDashboardTheme(arg.themeValue);

            }

        };

        var onBoldBIDashboardBeforeWidgetIconRendered = function (arg) {
            var serverFnc = window[beforeWidgetIconRenderedFn];
            if (serverFnc instanceof Function) {
                serverFnc.call(this, arg, sEmbedConfig);
            }

            var clientFnc = window[embedOptions.widgetSettings.beforeIconRender];
            if (clientFnc instanceof Function) {
                clientFnc.call(this, arg);
            }
        };

        var onBoldBIDashboardWidgetIconClick = function (arg) {
            var serverFnc = window[onWidgetIconClickFn];
            if (serverFnc instanceof Function) {
                serverFnc.call(this, arg, sEmbedConfig);
            }

            var clientFnc = window[embedOptions.widgetSettings.onIconClick];
            if (clientFnc instanceof Function) {
                clientFnc.call(this, arg);
            }
        };

        var onBoldBIDashboardUpdatefavorite = function (arg) {
            var serverFnc = window[onFavoriteStateChangeFn];
            if (serverFnc instanceof Function) {
                serverFnc.call(this, arg);
            }
            var clientFnc = window[embedOptions.dashboardSettings.onFavoriteIconClick];
            if (clientFnc instanceof Function) {
                clientFnc.call(this, arg);
            }
        };

        var showLoader = function () {
            var loaderStyle = document.createElement('style');
            loaderStyle.innerHTML = "#" + embedOptions.embedContainerId + ".viewer-blue-loader { display: block !important;}" +
                "#" + embedOptions.embedContainerId + ".loader - icon { display: block; }" +
                "#" + embedOptions.embedContainerId + " .loader-icon { left: 0px !important; position: relative; margin: 0px auto; width: 54px; height: 54px; }" +
                "#" + embedOptions.embedContainerId + " .loader-icon .circular { -webkit-animation: rotate 2s linear infinite; animation: rotate 2s linear infinite; height: 54px; width: 54px; position: relative; }" +
                "#" + embedOptions.embedContainerId + " .loader-icon .path { stroke-dasharray: 1,200; stroke-dashoffset: 0; -webkit-animation: dash 1.5s ease-in-out infinite; animation: dash 1.5s ease-in-out infinite; stroke: #5592FB; stroke-linecap: square; }" +
                "@keyframes rotate { 100% { transform: rotate(360deg); } }" +
                "@-webkit-keyframes rotate { 100% { transform: rotate(360deg); } }" +
                "@keyframes dash { 0% { stroke-dasharray: 1,200; stroke-dashoffset: 0; } 50% { stroke-dasharray: 89,200; stroke-dashoffset: -35; } 100% { stroke-dasharray: 89,200; stroke-dashoffset: -124; } }" +
                "@-webkit-keyframes dash { 0% { stroke-dasharray: 1,200; stroke-dashoffset: 0; } 50% { stroke-dasharray: 89,200; stroke-dashoffset: -35; } 100% { stroke-dasharray: 89,200; stroke-dashoffset: -124; } }";
            document.head.appendChild(loaderStyle);

            var loader = "<div class='preloader-wrap viewer-blue-loader' style='display: none; width: " + embedOptions.width + ";height: " + embedOptions.height + "; position: fixed; top: 0; bottom: 0; z-index : 2;'> <div id='loader_image' align='center' style='position:relative;top:45%;'> <div class='loader-blue loader-icon' id='loader-icon'> <svg class='circular'> <circle class='path' cx='27' cy='27' r='20' fill='none' stroke-width='4' stroke-miterlimit='10'></circle> </svg> </div> </div> </div>";
            document.getElementById(embedOptions.embedContainerId).insertAdjacentHTML('afterbegin', loader);
        };

        var getAuthorizationToken = function () {

            var embedConfig = {
                "embed_nonce": uuidv4Generartor(),
                "embed_user_email": embedOptions.user.email,
                "embed_dashboard_id": embedOptions.dashboardId,
                "embed_dashboard_path": embedOptions.dashboardPath,
                "embed_timestamp": Math.round((new Date()).getTime() / 1000),
                "embed_expirationtime": embedOptions.expirationTime
            };

            var embedQuerString = "embed_nonce=" + embedConfig.embed_nonce +
                "&embed_dashboard_id=" + embedConfig.embed_dashboard_id +
                "&embed_timestamp=" + embedConfig.embed_timestamp +
                "&embed_expirationtime=" + embedConfig.embed_expirationtime;

            var data = {
                embedQuerString: embedQuerString,
                dashboardServerApiUrl: dashboardServerApiUrl
            };
            if (embedOptions.authorizationServer.url != '') {
                xhrRequestHelper("POST", embedOptions.authorizationServer.url, data, embedOptions.authorizationServer.headers, renderDashboard);
            } else {
                renderDashboard(embedOptions.authorizationServer.data);
            }

        };

        var xhrRequestHelper = function (type, url, data, headers, callBackFn) {
            var http = new XMLHttpRequest();

            http.open(type, url, true);
            http.responseType = 'json';
            http.setRequestHeader("Content-type", "application/json");

            for (var key in headers) {
                http.setRequestHeader(key, headers[key]);
            }

            http.onreadystatechange = function () {
                if (http.readyState == 4 && http.status == 200) {
                    callBackFn.call(this, typeof http.response == "object" ? http.response : JSON.parse(http.response));
                }
            };

            http.send(JSON.stringify(data));
        };

        var uuidv4Generartor = function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };

        var isEmptyOrSpaces = function (str) {
            return typeof (str) === "undefined" || str === null || str.match(/^ *$/) !== null;
        };

        var validateOptions = function (options) {
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

        var throwError = function (errorMsg) {
            removeElementsClass(embedOptions.embedContainerId, ".preloader-wrap", "viewer-blue-loader");
            throw "BoldBI Embedded: " + errorMsg;
        };

        var removeElementsClass = function (id, childElement, targeClass) {
            var nodeList = [];
            if (isEmptyOrSpaces(id)) {
                nodeList = document.querySelector(childElement);
            } else if (isEmptyOrSpaces(childElement)) {
                nodeList.push(document.getElementById(id));
            } else {
                nodeList = document.getElementById(id).querySelectorAll(childElement);
            }
            //nodeList.forEach(function (element) {
            //    removeClass(element, targeClass);
            //});
            for (var i = 0; i < nodeList.length; i++) {
                removeClass(nodeList[i], targeClass);
            }
        };

        var hasClass = function (el, className) {
            if (el.classList)
                return el.classList.contains(className);
            return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
        };

        var addClass = function (el, className) {
            if (el.classList)
                el.classList.add(className);
            else if (!hasClass(el, className))
                el.className += " " + className;
        };

        var removeClass = function (el, className) {
            if (el.classList)
                el.classList.remove(className);
            else if (hasClass(el, className)) {
                var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
                el.className = el.className.replace(reg, ' ');
            }
        };

        var instance = {
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
                //var ret = this._storage.get(element).delete(key);
                //if (this._storage.get(element).size !== 0) {
                //    this._storage.delete(element);
                //}
                return;
            }
        };

        return this;
    }

    if (typeof (window.BoldBI) === 'undefined') {
        window.BoldBI = BoldBIEmbed();
        window.BoldBI.EmbedType = {
            Component: "Component",
            IFrame: "IFrame"
        };

        window.BoldBI.Environment = {
            Cloud: "Cloud",
            OnPremise: "OnPremise"
        };

        window.BoldBI.IsDependencyLoaded = false;
    }
})(window);

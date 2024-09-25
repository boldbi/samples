let bbEmbed;
let tabInstance;
class BoldBI {
    constructor() {
        this.loadPinboard = this.Invoke(function () {
            if (!this.invalidDetail) {
                if (this.embedOptions.pinboardName == '') {
                    throw new Error('Pinboard name should not be empty');
                }
                if (this.embedOptions.mode != BoldBI.Mode.View) {
                    throw new Error('Cant able to render the Pinboard in design mode');
                }
                this.embedOptions.dashboardIds = [];
                this.embedOptions.dashboardPaths = [];
                if (!this._checkWidgetList()) {
                    if (this.embedOptions.embedType == BoldBI.EmbedType.Component) {
                        this.isWidgetMode = false;
                        this.widgetName = '';
                        this.isDashboardViewMode = false;
                        this.dashboardViewName = '';
                        this.isPinboardRendering = true;
                        this._showLoader();
                        this._isDependencyLoaded(this);
                    }
                    else if (this.embedOptions.embedType == BoldBI.EmbedType.IFrame) {
                        const iframe = document.createElement('iframe');
                        iframe.frameBorder = 0;
                        iframe.width = this.embedOptions.width;
                        iframe.height = this.embedOptions.height;
                        iframe.id = this.embedOptions.embedContainerId + '_' + this.embedOptions.dashboardId;
                        iframe.allowfullscreen = this.embedOptions.dashboardSettings.showFullScreen;
                        iframe.setAttribute('src', this.embedOptions.serverUrl + '/dashboards/' + this.embedOptions.dashboardId + '?isembed=true');
                        document.getElementById(this.embedOptions.embedContainerId).appendChild(iframe);
                    }
                }
            }
        });
        this.loadDatasource = this.Invoke(function () {
            if (!this.invalidDetail) {
                if (this.embedOptions.dashboardId || this.embedOptions.dashboardPath) {
                    this.embedOptions.dashboardId = this.embedOptions.dashboardPath = '';
                }
                if (this.embedOptions.pinboardName != '') {
                    this.embedOptions.pinboardName = '';
                }
                if (!this._checkWidgetList()) {
                    if (this.embedOptions.mode == BoldBI.Mode.DataSource || this.embedOptions.mode == BoldBI.Mode.Connection) {
                        if (this.embedOptions.embedType == BoldBI.EmbedType.Component) {
                            this.isWidgetMode = false;
                            this.widgetName = '';
                            this.isDashboardViewMode = false;
                            this.dashboardViewName = '';
                            this._showLoader();
                            this._isDependencyLoaded(this);
                        }
                        else if (this.embedOptions.embedType == BoldBI.EmbedType.IFrame) {
                            const iframe = document.createElement('iframe');
                            iframe.frameBorder = 0;
                            iframe.width = this.embedOptions.width;
                            iframe.height = this.embedOptions.height;
                            iframe.id = this.embedOptions.embedContainerId + '_' + this.embedOptions.datasourceId;
                            iframe.allowfullscreen = this.embedOptions.dashboardSettings.showFullScreen;
                            iframe.setAttribute('src', this.embedOptions.serverUrl + '/datasource-designer/' + this.embedOptions.datasourceId + '?isembed=true');
                            document.getElementById(this.embedOptions.embedContainerId).appendChild(iframe);
                        }
                    }
                    else {
                        throw new Error('Invalid embed Mode');
                    }
                }
            }
        });
        this._initializeUrls = this.Invoke(function () {
            if (this.embedOptions.serverUrl.indexOf('/bi') <= 0) {
                throw new Error('Invalid Bold BI serverUrl.');
            }
            if (this.embedOptions.environment == BoldBI.Environment.Enterprise) {
                this.rootUrl = this.embedOptions.serverUrl.substr(0, (this.embedOptions.serverUrl.indexOf('/bi/') >= 0 ? (this.embedOptions.serverUrl.indexOf('/bi/') + 3) : (this.embedOptions.serverUrl.indexOf('/bi') + 3)));
                this.baseUrl = this.embedOptions.serverUrl;
                this.siteIdentifier = this.embedOptions.serverUrl.indexOf('/site/') >= 0 ? this.embedOptions.serverUrl.substr(this.embedOptions.serverUrl.indexOf('/site/') + 1) : '';
                this.dashboardServerApiUrl = this.rootUrl + '/api' + (this._isEmptyOrSpaces(this.siteIdentifier) ? '' : ('/' + this.siteIdentifier));
                this.designerRootUrl = this.rootUrl + '/designer';
                this.customThemeUrl = this.rootUrl.replace(/\/bi(?!.*\/bi)/, '/ums/theme/styles');
            }
            else {
                this.rootUrl = this.embedOptions.serverUrl.endsWith('/') ? this.embedOptions.serverUrl.slice(0, -1) : this.embedOptions.serverUrl;
                this.baseUrl = this.embedOptions.serverUrl;
                this.siteIdentifier = '';
                this.dashboardServerApiUrl = this.rootUrl + '/api';
            }
            this.scheduleEndpointUrl = this.baseUrl + '/datasources/recurrence-type-page';
            return true;
        });
        this._addJquerydependentFiles = this.Invoke(function () {
            if (!this._checkDepedentFileExists(this.jQueryDepedentFile, false) && !(window.jQuery != undefined && window.jQuery().jquery == '1.10.2')) {
                const script = document.createElement('script');
                if (this.embedOptions.environment == BoldBI.Environment.Enterprise) {
                    script.setAttribute('src', this.rootUrl + '/cdn/scripts/designer/' + this.jQueryDepedentFile);
                }
                else {
                    script.setAttribute('src', this.cdnLink + '/scripts/designer/' + this.jQueryDepedentFile);
                }
                if (this.embedOptions.nonce) {
                    script.nonce = this.embedOptions.nonce;
                }
                document.head.appendChild(script);
                // now wait for it to load...
                script.onload = () => {
                    try {
                        const scriptTag = document.createElement('script');
                        scriptTag.append(this.jqConflictFile);
                        if (this.embedOptions.nonce) {
                            scriptTag.nonce = this.embedOptions.nonce;
                        }
                        document.head.appendChild(scriptTag);
                        bbEmbed = window.bbEmbed = window.bb$;
                        this._addWrapperDependentFiles(this, this.wrapperDependentScriptFiles);
                        this._loadDepedentFiles();
                    }
                    catch (e) {
                        this._throwError('server Not Found');
                        this.invalidDetail = true;
                    }
                };
                script.onerror = (arg) => this._handleEnvironmentError(arg);
            }
            else {
                // Wait for jQuery to finish loading
                const checkjQueryLoaded = setInterval(() => {
                    if (window.jQuery) {
                        clearInterval(checkjQueryLoaded);
                        bbEmbed = window.bbEmbed = window.$;
                        if (typeof window.bb$ != 'undefined') {
                            bbEmbed = window.bbEmbed = window.bb$;
                        }
                        this._addWrapperDependentFiles(this, this.wrapperDependentScriptFiles);
                        this._loadDepedentFiles();
                    }
                }, 1000);
            }
        });
        this._renderDashboard = this.Invoke(function (responseInfo) {
            const that = this;
            const parameter = '';
            if (!responseInfo.Status) {
                if (responseInfo.errorMessage == 'The page you are looking for was unavailable.') {
                    responseInfo.Status = false;
                    responseInfo.Message = responseInfo.errorMessage;
                }
                if (responseInfo.Message === 'Object reference not set to an instance of an object.') {
                    if (this.embedOptions.mode === 'view' || this.embedOptions.mode === 'design') {
                        if (!this._isEmptyOrSpaces(this.embedOptions.dashboardId) || !this._isEmptyOrSpaces(this.embedOptions.dashboardPath)) {
                            responseInfo.Message = 'Invalid dashboard details.';
                        }
                        if (!this._isEmptyOrSpaces(this.embedOptions.pinboardName)) {
                            responseInfo.Message = 'Invalid pinboard name.';
                        }
                    }
                }
                throw new Error(responseInfo.Message);
            }
            else {
                if (Array.isArray(responseInfo.Data) && this._isEmptyOrSpaces(this.embedOptions.dashboardId) && this._isEmptyOrSpaces(this.embedOptions.dashboardPath)) {
                    for (const item of responseInfo.Data) {
                        if ('ErrorMessage' in item) {
                            const errorMsg = `BoldBI Embedded: ${item.ErrorMessage}`;
                            if (!this._isNullOrUndefined(this.embedOptions.onError) && this.embedOptions.onError !== '') {
                                const errormessage = new Error(errorMsg);
                                this.onErrorClient(errormessage);
                            }
                            else {
                                console.error(errorMsg);
                            }
                            responseInfo.Data = responseInfo.Data.filter((dataItem) => dataItem !== item);
                        }
                    }
                    if (!responseInfo.Data.length) {
                        throw new Error('Provided dashboard details are invalid.');
                    }
                }
                const embedResponse = responseInfo.Data;
                if (this.embedOptions.pinboardName != '' && this.pinboardIds.length == 0) {
                    if (embedResponse.ColumnInfo) {
                        this._renderPinboard(embedResponse);
                    }
                    else {
                        throw new Error('Pinboard Details not found');
                    }
                }
                else if (embedResponse.length) {
                    if (this.isWidgetMode) {
                        const ele = document.getElementById(this.embedOptions.embedContainerId);
                        if (BoldBI._hasinstance(ele, 'embeddedBoldBI')) {
                            BoldBI._removeinstance(ele, 'embeddedBoldBI');
                        }
                        throw new Error('Cant able to render the widget from Multitab dashboard');
                    }
                    else if (this.embedOptions.mode != BoldBI.Mode.View) {
                        const ele = document.getElementById(this.embedOptions.embedContainerId);
                        if (BoldBI._hasinstance(ele, 'embeddedBoldBI')) {
                            BoldBI._removeinstance(ele, 'embeddedBoldBI');
                        }
                        throw new Error('Cant able to render the Multitab dashboard in design mode');
                    }
                    this._renderMultiTabDashboard(embedResponse);
                }
                else {
                    let embedContainerId;
                    embedResponse.ItemDetail = this.embedOptions.mode != BoldBI.Mode.Connection ? !this.embedOptions.token ? JSON.parse(responseInfo.Data.ItemDetail) : responseInfo.Data.ItemDetail : null;
                    if (!this.embedOptions.token) {
                        if (this.embedOptions.mode == BoldBI.Mode.View || (embedResponse.ItemDetail && embedResponse.ItemDetail.IsEnableDefaultView)) {
                            this.isDefaultView = embedResponse.ItemDetail.IsEnableDefaultView;
                            if (this._isNullOrUndefined(this.embedOptions.dashboardSettings.filterOverviewSettings)) {
                                this.embedOptions.dashboardSettings.filterOverviewSettings = {};
                            }
                            if (embedResponse.ItemDetail.ItemViews) {
                                this.embedOptions.dashboardSettings.filterOverviewSettings.viewId = embedResponse.ItemDetail.ItemViews[0].ViewId;
                                this.embedOptions.dashboardSettings.filterOverviewSettings.viewName = embedResponse.ItemDetail.ItemViews[0].ViewName;
                                this.embedOptions.filterParameters = embedResponse.ItemDetail.ItemViews[0].QueryString;
                            }
                        }
                        if (this.embedOptions.mode == BoldBI.Mode.View) {
                            this.dashboardUrl = '/dashboard/' + embedResponse.ItemDetail.Id + '/' + embedResponse.ItemDetail.CategoryName + '/' + embedResponse.ItemDetail.Name + '?';
                        }
                        if (this.embedOptions.mode == BoldBI.Mode.View && this.embedOptions.viewId) {
                            this.embedOptions.dashboardId = embedResponse.ItemDetail.Id;
                        }
                    }
                    this.accessToken = that.embedOptions.token ? that.embedOptions.token : embedResponse.access_token;
                    let dashboardName = '';
                    let childDashboardId;
                    if (this.pinboardIds.length > 0) {
                        const id = this.embedOptions.token ? embedResponse.Id : embedResponse.WidgetId;
                        bbEmbed.map(this.pinboardIds, function (value) {
                            if (value['widgetId'] == id) {
                                const instance = that._getDashboardInstance(value['pinboardContainerId'] + '_embeddedbi');
                                if (that._isNullOrUndefined(instance)) {
                                    embedContainerId = value['pinboardContainerId'];
                                }
                            }
                        });
                        childDashboardId = that.embedOptions.token ? embedResponse.ItemId : '';
                    }
                    else if (this.isMultiTab) {
                        const Id = this.embedOptions.token ? embedResponse.DashboardId.toString().replaceAll('-', '') : embedResponse.ItemDetail.Id.toString().replaceAll('-', '');
                        embedContainerId = 'multi_' + Id;
                        if (!that._isNullOrUndefined(that.embedOptions.dashboardSettings.dashboardName) && typeof that.embedOptions.dashboardSettings.dashboardName != 'string') {
                            bbEmbed.map(that.embedOptions.dashboardSettings.dashboardName, function (val) {
                                if (embedResponse.ItemDetail.Id == val.dashboardId) {
                                    dashboardName = val.dashboardName;
                                }
                            });
                        }
                        childDashboardId = that.embedOptions.token ? embedResponse.DashboardId : '';
                    }
                    else {
                        embedContainerId = this.embedOptions.embedContainerId;
                        if (!that._isNullOrUndefined(that.embedOptions.dashboardSettings.dashboardName) && typeof that.embedOptions.dashboardSettings.dashboardName == 'string') {
                            dashboardName = that.embedOptions.dashboardSettings.dashboardName;
                        }
                    }
                    const height = this.pinboardIds.length > 0 ? bbEmbed('#' + embedContainerId).height() : this.isMultiTab ? (this.embedOptions.height.indexOf('%') > 0 ? (this.embedOptions.height.includes('calc') ? 'calc(100% - 36px)' : 'calc(' + this.embedOptions.height + ' - 36px)') : (parseInt(this.embedOptions.height, 10) - 36 + 'px')) : this.embedOptions.height;
                    if (typeof (responseInfo.Data.UserDetail) != 'undefined') {
                        embedResponse.UserDetail = JSON.parse(responseInfo.Data.UserDetail);
                    }
                    if (this.embedOptions.mode == BoldBI.Mode.Connection) {
                        bbEmbed('<style type="text/css"> .e-dashboarddesigner .bbi-dbrd-connection-mode-dlg .bbi-dbrd-connection-mode-header .bbi-dbrd-icon-container .bbi-dbrd-close-icon{ display: none !important} </style>').appendTo('head');
                    }
                    this._onBoldBIAuthorizionComplete(embedResponse);
                    if (this.embedOptions.widgetList == '') {
                        document.getElementById(embedContainerId).style.height = height;
                        document.getElementById(embedContainerId).style.width = (this.embedOptions.pinboardName != '' ? document.getElementById(embedContainerId).style.width : (!this.isMultiTab ? this.embedOptions.width : '100%'));
                    }
                    if ((this.embedOptions.mode == BoldBI.Mode.View) && (!this.embedOptions.authorizationServer.url) && (!this.embedOptions.authorizationServer.data) && !this._isNullOrUndefined(this.embedOptions.dashboardSettings.filterOverviewSettings)) {
                        this.embedOptions.dashboardSettings.filterOverviewSettings.showSaveIcon = false;
                        this.embedOptions.dashboardSettings.filterOverviewSettings.showSaveAsIcon = false;
                    }
                    if (this.embedOptions.mode == BoldBI.Mode.Design && !this._isNullOrUndefined(this.embedOptions.dashboardSettings.filterOverviewSettings)) {
                        this.embedOptions.dashboardSettings.filterOverviewSettings.showSaveIcon = false;
                        this.embedOptions.dashboardSettings.filterOverviewSettings.showSaveAsIcon = false;
                        this.embedOptions.dashboardSettings.filterOverviewSettings.showViewSavedFilterIcon = false;
                    }
                    let dashboardOptions;
                    const fontFamilyUrl = this.embedOptions.environment === BoldBI.Environment.Enterprise ? this.rootUrl.replace(/\/bi(?!.*\/bi)/, '/ums/user-interface/fonts') + '?family=' + this.embedOptions.dashboardSettings.fontFamily : `${this.rootUrl + '/user-interface/fonts?family=' + this.embedOptions.dashboardSettings.fontFamily}`;
                    // eslint-disable-next-line
                    dashboardOptions = {
                        siteUrl: this.baseUrl,
                        serviceUrl: this.designerRootUrl,
                        dataServiceUrl: this.designerRootUrl,
                        serverUrl: this.dashboardServerApiUrl,
                        viewerSettings: {
                            serviceUrl: this.designerRootUrl + '/v1.0/design'
                        },
                        nonce: this.embedOptions.nonce,
                        localeSettings: {
                            culture: this.embedOptions.localeSettings.culture,
                            dateFormat: this._isEmptyOrSpaces(this.embedOptions.localeSettings.dateFormat) ? 'M/d/yyyy' : this.embedOptions.localeSettings.dateFormat,
                            timeFormat: this._isEmptyOrSpaces(this.embedOptions.localeSettings.timeFormat) ? 'h:mm:ss tt' : this.embedOptions.localeSettings.timeFormat
                        },
                        mode: this.embedOptions.mode,
                        environment: this.embedOptions.environment,
                        IsEmbed: true,
                        _isPublic: this.embedOptions.mode != BoldBI.Mode.Connection ? (this._isNullOrUndefined(embedResponse.ItemDetail)) ? '' : embedResponse.ItemDetail.IsPublic : '',
                        itemId: this.embedOptions.mode != BoldBI.Mode.Connection ? (this._isNullOrUndefined(this.embedOptions.token) || this._isEmptyOrSpaces(this.embedOptions.token)) ? embedResponse.ItemDetail.Id : childDashboardId ? childDashboardId : this.embedOptions.dashboardId : '',
                        dashboardPath: (this.embedOptions.mode == BoldBI.Mode.DataSource || this.embedOptions.mode == BoldBI.Mode.Connection) ? '' : (this._isNullOrUndefined(this.embedOptions.token) || this._isEmptyOrSpaces(this.embedOptions.token)) ? embedResponse.ItemDetail.ItemLocation : childDashboardId ? childDashboardId + '/1' : this.embedOptions.dashboardId + '/1',
                        serviceAuthorizationToken: !(this._isNullOrUndefined(this.embedOptions.token) || this._isEmptyOrSpaces(this.embedOptions.token)) ? this.embedOptions.token : embedResponse.access_token,
                        dashboardName: (this.embedOptions.mode == BoldBI.Mode.DataSource || this.embedOptions.mode == BoldBI.Mode.Connection) ? '' : (this._isNullOrUndefined(embedResponse.ItemDetail)) ? '' : this._isEmptyOrSpaces(dashboardName) ? embedResponse.ItemDetail.Name : dashboardName,
                        dashboardDescription: (this.embedOptions.mode == BoldBI.Mode.DataSource || this.embedOptions.mode == BoldBI.Mode.Connection) ? '' : (this._isNullOrUndefined(embedResponse.ItemDetail)) ? '' : embedResponse.ItemDetail.Description,
                        theme: this._isEmptyOrSpaces(this.multiTabTheme) ? this.embedOptions.theme : this.multiTabTheme,
                        enableTheme: this.embedOptions.dashboardSettings.enableTheme === undefined ? false : this.embedOptions.dashboardSettings.enableTheme,
                        enableFilterOverview: this.embedOptions.dashboardSettings.enableFilterOverview,
                        isPinWidget: this.pinboardIds.length > 0,
                        layoutSetting: this.embedOptions.layoutSettings,
                        export: {
                            Image: this.embedOptions.exportSettings.showImage,
                            Excel: this.embedOptions.exportSettings.showExcel,
                            Pdf: this.embedOptions.exportSettings.showPDF,
                            CustomFontFamilyUrl: this.embedOptions.dashboardSettings.fontFamily ? fontFamilyUrl : '',
                            IsDefaultFont: false
                        },
                        dashboardExportMenuSettings: {
                            showCSV: this.embedOptions.exportSettings.showCSV,
                            showExcel: this.embedOptions.exportSettings.showExcel,
                            showImage: this.embedOptions.exportSettings.showImage,
                            showPDF: this.embedOptions.exportSettings.showPDF
                        },
                        widgetExportMenuSettings: {
                            showCSV: this.embedOptions.exportSettings.showCSV,
                            showExcel: this.embedOptions.exportSettings.showExcel,
                            showImage: this.embedOptions.exportSettings.showImage,
                            showPDF: this.embedOptions.exportSettings.showPDF
                        },
                        filterParameters: parameter + (this._isEmptyOrSpaces(this.embedOptions.filterParameters) ? '' : '&') + ((this.isMultiTab && window['multiTabFilterParameter']) ? window['multiTabFilterParameter'] : this.embedOptions.filterParameters),
                        designCanvasSettings: this.embedOptions.designCanvasSettings,
                        widgetContainerSettings: this.embedOptions.widgetContainerSettings,
                        viewDataSettings: {
                            checkShowAllColumns: this._isNullOrUndefined(this.embedOptions.dashboardSettings.viewDataSettings) ? false : this.embedOptions.dashboardSettings.viewDataSettings.showAllColumns
                        },
                        viewDataActions: {
                            allowExporting: this._isNullOrUndefined(this.embedOptions.dashboardSettings.viewDataSettings) ? true : this.embedOptions.dashboardSettings.viewDataSettings.enableExporting,
                            allowColumnSelection: this._isNullOrUndefined(this.embedOptions.dashboardSettings.viewDataSettings) ? true : this.embedOptions.dashboardSettings.viewDataSettings.enableColumnSelection
                        },
                        dashboardThemeSettings: {
                            appearance: !this._isNullOrUndefined(this.embedOptions.dashboardSettings.themeSettings) ? (!this._isNullOrUndefined(this.embedOptions.dashboardSettings.themeSettings.appearance) ? this.embedOptions.dashboardSettings.themeSettings.appearance : 'light') : 'light',
                            applicationTheme: !this._isNullOrUndefined(this.embedOptions.dashboardSettings.themeSettings) ? (!this._isNullOrUndefined(this.embedOptions.dashboardSettings.themeSettings.application) ? this.embedOptions.dashboardSettings.themeSettings.application : null) : null,
                            dashboardTheme: !this._isNullOrUndefined(this.embedOptions.dashboardSettings.themeSettings) ? (!this._isNullOrUndefined(this.embedOptions.dashboardSettings.themeSettings.dashboard) ? this.embedOptions.dashboardSettings.themeSettings.dashboard : (this.embedOptions.dashboardSettings.themeSettings.isLocalTheme ? 'boldBITheme' : null)) : null
                        },
                        filterOverviewSettings: {
                            showSaveIcon: this._isNullOrUndefined(this.embedOptions.dashboardSettings.filterOverviewSettings) ? false : this.embedOptions.dashboardSettings.filterOverviewSettings.showSaveIcon,
                            showSaveAsIcon: this._isNullOrUndefined(this.embedOptions.dashboardSettings.filterOverviewSettings) ? false : this.embedOptions.dashboardSettings.filterOverviewSettings.showSaveAsIcon,
                            showViewSavedFilterIcon: this._isNullOrUndefined(this.embedOptions.dashboardSettings.filterOverviewSettings) ? false : this.embedOptions.dashboardSettings.filterOverviewSettings.showViewSavedFilterIcon,
                            viewId: !this._isNullOrUndefined(this.embedOptions.dashboardSettings.filterOverviewSettings) ? this._isEmptyOrSpaces(this.embedOptions.dashboardSettings.filterOverviewSettings.viewId) ? null : this.embedOptions.dashboardSettings.filterOverviewSettings.viewId : null,
                            viewName: !this._isNullOrUndefined(this.embedOptions.dashboardSettings.filterOverviewSettings) ? this._isEmptyOrSpaces(this.embedOptions.dashboardSettings.filterOverviewSettings.viewName) ? null : this.embedOptions.dashboardSettings.filterOverviewSettings.viewName : null
                        },
                        widgets: this._getWidgetFilterInfo(),
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
                        beforeNavigateUrlLinking: function (arg) {
                            that._onBoldBIBeforeNavigateUrlLinking(arg);
                        },
                        beforeControlMenuOpen: function (arg) {
                            that._onBoldBIBeforeControlMenuOpen(arg);
                        },
                        beforeDashboardMobileMenuOpen: function (arg) {
                            that._onBoldBIBeforeDashboardMobileMenuOpen(arg);
                        },
                        ajaxBeforeLoad: function (arg) {
                            that._onBoldBIAjaxBeforeLoad(arg);
                        },
                        beforeDesignerToolbarButtonsRendered: function (arg) {
                            that._onBoldBIbeforeDesignerToolbarButtonsRendered(arg);
                        },
                        onControlMenuClick: function (arg) {
                            that._onBoldBIonControlMenuClick(arg);
                        },
                        beforeDatasourceToolbarButtonsRendered: function (arg) {
                            that._onBoldBIbeforeDatasourceToolbarButtonsRendered(arg);
                        },
                        beforeDatasourceToolbarIconsRendered: function (arg) {
                            that._onBoldBIbeforeDatasourceToolbarIconsRendered(arg);
                        },
                        beforeDesignerToolbarIconsRendered: function (arg) {
                            that._onBoldBIbeforeDesignerToolbarIconsRendered(arg);
                        },
                        toolbarClick: function (arg) {
                            that._onBoldBItoolbarClick(arg);
                        },
                        beforeWidgetItemsListed: function (arg) {
                            that._onBoldBIbeforeWidgetItemsListed(arg);
                        }
                    };
                    if (this.embedOptions.widgetList == '') {
                        dashboardOptions.actionBegin = function (arg) {
                            that._onBoldBIDashboardInstaceActionBegin(arg, embedContainerId);
                        };
                    }
                    if (this.embedOptions.mode == BoldBI.Mode.Design) {
                        if ((this.embedOptions.token && !this.embedOptions.dashboardId) || (!this.embedOptions.token && embedResponse.ItemDetail.IsDraft)) {
                            dashboardOptions.dashboardPath = '';
                        }
                        const datasourceId = !this._isEmptyOrSpaces(embedResponse.DatasourceId) ? embedResponse.DatasourceId : '';
                        if (!this._isEmptyOrSpaces(datasourceId)) {
                            dashboardOptions.datasource = datasourceId;
                        }
                        if (this.embedOptions.datasources.length > 0) {
                            dashboardOptions.datasources = this.embedOptions.datasources;
                        }
                        dashboardOptions.disableAutoRecover = this.embedOptions.disableAutoRecover;
                        dashboardOptions.schedule = {
                            endPoint: this.scheduleEndpointUrl,
                            summaryText: ''
                        };
                        dashboardOptions.serverSettings = {
                            isAdmin: typeof (embedResponse.IsAdmin) == 'undefined' ? false : embedResponse.IsAdmin
                        };
                        dashboardOptions.intermediateDbStatus = embedResponse.IntermediateDbStatus;
                        dashboardOptions.connectionList = embedResponse.ConnectionList;
                        dashboardOptions.isAllowUserToCreateDatasource = embedResponse.CanCreateDatasource;
                        dashboardOptions.enablePublicDashboardSetting = false;
                        dashboardOptions.beforeNavigateToDashboard = function (arg) {
                            that._onBoldBIBeforeNavigateToDashboard(arg);
                        };
                        dashboardOptions.toolbarSettings = {
                            showToolbar: this.embedOptions.toolbarSettings.showToolbar
                        };
                        dashboardOptions.predefinedWidgets = this.embedOptions.preConfiguredWidgets;
                        if (this.embedOptions.environment == BoldBI.Environment.Enterprise) {
                            dashboardOptions.configuration = this.rootUrl + '/webdesignerservice/scripts/settings/' + embedResponse.Branding + '/settings.min.js';
                        }
                        else {
                            dashboardOptions.configuration = this.cdnLink + '/scripts/settings/' + embedResponse.Branding + '/settings.min.js';
                        }
                        dashboardOptions.designerSettings = {
                            widgetsPanel: {
                                hideExistingWidgets: this._isNullOrUndefined(this.embedOptions.dashboardSettings.widgetsPanel) ? false : this.embedOptions.dashboardSettings.widgetsPanel.hideExistingWidgets,
                                hideDefaultWidgets: this._isNullOrUndefined(this.embedOptions.dashboardSettings.widgetsPanel) ? false : this.embedOptions.dashboardSettings.widgetsPanel.hideDefaultWidgets,
                                defaultPanelDisplayText: this._isNullOrUndefined(this.embedOptions.dashboardSettings.widgetsPanel) ? '' : this.embedOptions.dashboardSettings.widgetsPanel.defaultPanelDisplayText,
                                existingPanelDisplayText: this._isNullOrUndefined(this.embedOptions.dashboardSettings.widgetsPanel) ? '' : this.embedOptions.dashboardSettings.widgetsPanel.existingPanelDisplayText,
                                defaultPanelSearchPlaceholder: this._isNullOrUndefined(this.embedOptions.dashboardSettings.widgetsPanel) ? '' : this.embedOptions.dashboardSettings.widgetsPanel.defaultPanelSearchPlaceholder,
                                existingPanelSearchPlaceholder: this._isNullOrUndefined(this.embedOptions.dashboardSettings.widgetsPanel) ? '' : this.embedOptions.dashboardSettings.widgetsPanel.existingPanelSearchPlaceholder,
                                existingDashboards: this._isNullOrUndefined(this.embedOptions.dashboardSettings.widgetsPanel) ? [] : this.embedOptions.dashboardSettings.widgetsPanel.existingDashboards,
                                dragAndDropSettings: {
                                    rowSpan: (!this._isNullOrUndefined(this.embedOptions.dashboardSettings.widgetsPanel) && !this._isNullOrUndefined(this.embedOptions.dashboardSettings.widgetsPanel.dragAndDropSettings)) ? this.embedOptions.dashboardSettings.widgetsPanel.dragAndDropSettings.rowSpan : null,
                                    columnSpan: (!this._isNullOrUndefined(this.embedOptions.dashboardSettings.widgetsPanel) && !this._isNullOrUndefined(this.embedOptions.dashboardSettings.widgetsPanel.dragAndDropSettings)) ? this.embedOptions.dashboardSettings.widgetsPanel.dragAndDropSettings.columnSpan : null,
                                    isWidgetMode: (!this._isNullOrUndefined(this.embedOptions.dashboardSettings.widgetsPanel) && !this._isNullOrUndefined(this.embedOptions.dashboardSettings.widgetsPanel.dragAndDropSettings)) ? this.embedOptions.dashboardSettings.widgetsPanel.dragAndDropSettings.isWidgetMode : false
                                }
                            },
                            dataSourceConfig: {
                                hideDataSourceConfig: this._isNullOrUndefined(this.embedOptions.dashboardSettings.dataSourceConfig) ? false : this.embedOptions.dashboardSettings.dataSourceConfig.hideDataSourceConfig
                            }
                        };
                        dashboardOptions.userSettings = {
                            hidePreviewAs: this._isNullOrUndefined(this.embedOptions.dashboardSettings.showPreviewAs) ? false : !this.embedOptions.dashboardSettings.showPreviewAs
                        };
                    }
                    if (this.embedOptions.mode == BoldBI.Mode.Connection) {
                        dashboardOptions.connectionList = embedResponse.ConnectionList;
                    }
                    if (this.embedOptions.mode == BoldBI.Mode.DataSource) {
                        dashboardOptions.itemId = (this._isNullOrUndefined(this.embedOptions.token) || this._isEmptyOrSpaces(this.embedOptions.token)) ? embedResponse.ItemDetail.Id : this.embedOptions.datasourceId;
                        dashboardOptions.datasourceName = (this._isNullOrUndefined(this.embedOptions.token) || this._isEmptyOrSpaces(this.embedOptions.token)) ? embedResponse.ItemDetail.Name : this.embedOptions.datasourceName;
                        dashboardOptions.datasource = (this._isNullOrUndefined(this.embedOptions.token) || this._isEmptyOrSpaces(this.embedOptions.token)) ? embedResponse.ItemDetail.Id : this.embedOptions.datasourceId;
                    }
                    this.isMultipleWidgetMode = (this.embedOptions.widgetList == '') ? false : this.isMultipleWidgetMode;
                    if (this.isWidgetMode) {
                        dashboardOptions.isPinWidget = this.isWidgetMode;
                        dashboardOptions.widgetId = (this._isNullOrUndefined(this.embedOptions.token) || this._isEmptyOrSpaces(this.embedOptions.token)) ? embedResponse.WidgetId : this.widgetName;
                    }
                    if (this.embedOptions.dashboardSettings.showHeader == false) {
                        dashboardOptions.isHideHeader = true;
                    }
                    else {
                        dashboardOptions.isHideHeader = false;
                    }
                    if (this.isMultiTab) {
                        dashboardOptions.dashboardSettings = {
                            parentId: this.parentDbrdId,
                            isMultiTab: this.parentId == null || this.parentId === '' ? false : true
                        };
                    }
                    if (this.embedOptions.dynamicConnection.isEnabled) {
                        dashboardOptions.customIdentity = this.embedOptions.dynamicConnection.identity;
                    }
                    if (this.embedOptions.autoRefreshSettings.enabled) {
                        dashboardOptions.enableAutoRefresh = true;
                        dashboardOptions.autoRefreshSettings = {
                            intervalSettings: {
                                mode: 'Hourly',
                                hourlySchedule: {
                                    hours: this.embedOptions.autoRefreshSettings.hourlySchedule.hours,
                                    minutes: this.embedOptions.autoRefreshSettings.hourlySchedule.minutes,
                                    seconds: this.embedOptions.autoRefreshSettings.hourlySchedule.seconds
                                }
                            }
                        };
                    }
                    if (window.bbEmbed instanceof Function) {
                        if (this.isMultipleWidgetMode == false) {
                            let embedContainer = window.bbEmbed.call(that, '#' + (that.pinboardIds.length > 0 ? (embedContainerId + '_embeddedbi') : that.childContainer.id));
                            let embedChildId;
                            if (embedContainer.length === 0) {
                                embedContainer = window.bbEmbed.call(that, '#' + embedContainerId + '_embeddedbi');
                                embedChildId = embedContainerId + '_embeddedbi';
                            }
                            if (window.BoldBIDashboardDesigner instanceof Function) {
                                const existingDashboardInstance = this._getDashboardInstance(embedChildId);
                                if (existingDashboardInstance != undefined) {
                                    existingDashboardInstance.model = Object.assign(existingDashboardInstance.model, dashboardOptions);
                                    existingDashboardInstance.redrawDashboard();
                                }
                                else {
                                    window.BoldBIDashboardDesigner.call(that, embedContainer, dashboardOptions);
                                }
                            }
                            else {
                                this._throwError('BoldBIDashboardDesigner is not defined');
                            }
                        }
                        else {
                            const thatIns = this;
                            bbEmbed.ajax({
                                type: 'POST',
                                url: dashboardOptions.serviceUrl + '/v1.0/dashboard/preloaddashboard/' + embedResponse.ItemDetail.ItemLocation,
                                beforeSend: function (xhr) {
                                    xhr.setRequestHeader('Authorization', 'bearer ' + responseInfo.Data.access_token);
                                    xhr.setRequestHeader('Caller', dashboardOptions.serverUrl);
                                },
                                success: function (result) {
                                    if (result.ApiStatus) {
                                        dashboardOptions.isPreLoaded = true;
                                        const widgetIdList = JSON.parse(responseInfo.Data.WidgetList);
                                        const multipleWidgetsList = thatIns.embedOptions.widgetList;
                                        multipleWidgetsList.forEach(function (widgetInfo) {
                                            const boldBIMulObj = new BoldBI();
                                            dashboardOptions.widgetId = widgetIdList[widgetInfo.widgetName.toLowerCase()];
                                            const embedWidgetContainerId = widgetInfo.containerId;
                                            dashboardOptions.actionBegin = function (arg) {
                                                that._onBoldBIDashboardInstaceActionBegin(arg, embedWidgetContainerId);
                                            };
                                            document.getElementById(embedWidgetContainerId).style.height = height;
                                            document.getElementById(embedWidgetContainerId).style.width = !this.isMultiTab ? this.embedOptions.width : '100%';
                                            const embedContainer = window.bbEmbed.call(that, '#' + (embedWidgetContainerId + '_embeddedbi'));
                                            const embedChildId = embedWidgetContainerId + '_embeddedbi';
                                            boldBIMulObj.childContainer = embedContainer[0];
                                            boldBIMulObj.childContainer.id = embedWidgetContainerId + '_embeddedbi';
                                            boldBIMulObj.embedOptions = thatIns.embedOptions;
                                            boldBIMulObj._initializeUrls();
                                            boldBIMulObj.isMultipleWidgetMode = true;
                                            boldBIMulObj.isWidgetMode = true;
                                            const ele = document.getElementById(embedWidgetContainerId);
                                            if (BoldBI._hasinstance(ele, 'embeddedBoldBI')) {
                                                BoldBI._removeinstance(ele, 'embeddedBoldBI');
                                            }
                                            const retObj = Object.assign(boldBIMulObj);
                                            BoldBI._putinstance(ele, 'embeddedBoldBI', retObj);
                                            if (window.BoldBIDashboardDesigner instanceof Function) {
                                                const existingDashboardInstance = that._getDashboardInstance(embedChildId);
                                                if (existingDashboardInstance != undefined) {
                                                    existingDashboardInstance.model = Object.assign(existingDashboardInstance.model, dashboardOptions);
                                                    existingDashboardInstance.redrawDashboard();
                                                }
                                                else {
                                                    window.BoldBIDashboardDesigner.call(that, embedContainer, dashboardOptions);
                                                }
                                            }
                                            else {
                                                this._throwError('BoldBIDashboardDesigner is not defined');
                                            }
                                            this._removeElementsClass(embedWidgetContainerId, '.preloader-wrap', 'viewer-blue-loader');
                                        }.bind(thatIns));
                                    }
                                },
                                error: function () {
                                    that._throwError('Error while downloading the dashboards' + this.embedOptions.dashboardId);
                                }
                            });
                        }
                    }
                    else {
                        throw new Error('bbEmbed is not defined');
                    }
                    if (this.embedOptions.widgetList == '') {
                        this._removeElementsClass(embedContainerId, '.preloader-wrap', 'viewer-blue-loader');
                    }
                    if (this.isMultiTab && !this.embedOptions.token && embedResponse.ItemDetail.ItemViews) {
                        this.embedOptions.dashboardSettings.filterOverviewSettings.viewId = this.embedOptions.dashboardSettings.filterOverviewSettings.viewName = this.embedOptions.filterParameters = null;
                    }
                }
            }
        });
        this._changeLayoutSuccess = this.Invoke(function (result) {
            if (result.Status && this.homepageItemId != '' && this.isVirtualHomepage) {
                this.afterVirtualHomepageSave(this.homepageItemId);
            }
            else if (!result.Status) {
                throw new Error('Change layout failure due to' + result.Message);
            }
        });
        this._createPinboardDom = this.Invoke(function (itemDetail) {
            const that = this;
            bbEmbed('#widget-container').attr('data-homepage-id', itemDetail.Id).attr('data-current-layout', itemDetail.ColumnInfo.Layout).attr('data-item-type', itemDetail.ItemType).attr('data-virtual-homepage', itemDetail.IsVirtualHomepage);
            if (itemDetail.ItemType.toLowerCase() == 'widget') {
                const column = itemDetail.ColumnInfo.Column;
                bbEmbed.each(column, function (i) {
                    bbEmbed('#widget-container').append('<ul id=column-' + (i + 1) + ' class="widget-list" data-column-id=' + (i + 1) + '></ul>');
                    if (column[`${i}`].Item.length > 0) {
                        bbEmbed.each(column[`${i}`].Item, function (j) {
                            const item = column[`${i}`].Item[`${j}`].Id == null ? '/bi/' + that.siteIdentifier + '/widgets/widgets' : '/bi/' + that.siteIdentifier + '/dashboards';
                            const itemName = column[`${i}`].Item[`${j}`].Name;
                            const widgetType = column[`${i}`].Item[`${j}`].WidgetType;
                            let height = 0;
                            if (widgetType != null && (widgetType.includes('Card') || widgetType.includes('Image'))) {
                                height = 250;
                            }
                            else {
                                height = 400;
                            }
                            const queryString = column[`${i}`].Item[`${j}`].QueryString != null ? column[`${i}`].Item[`${j}`].QueryString : '';
                            const href = column[`${i}`].Item[`${j}`].TabId == null ? (item + '/' + column[`${i}`].Item[`${j}`].ItemId + '/' + (column[`${i}`].Item[`${j}`].Id != null ? (column[`${i}`].Item[`${j}`].CategoryName + '/') : '') + column[`${i}`].Item[`${j}`].ItemName + (queryString != '' ? '?' + queryString : queryString)) : (item + '/' + column[`${i}`].Item[`${j}`].ItemId + '/' + (column[`${i}`].Item[`${j}`].Id != null ? (column[`${i}`].Item[`${j}`].CategoryName + '/') : '') + column[`${i}`].Item[`${j}`].ItemName + '?tab=' + column[`${i}`].Item[`${j}`].TabId + (queryString != '' ? '&' + queryString : queryString));
                            const styleAttr = j != 0 ? 'style="width:100%;height:100%;"' : '';
                            if (column[`${i}`].Item[`${j}`].ItemExtension.toLowerCase() != '.sydj') {
                                bbEmbed('#column-' + (i + 1)).append('<li class="list-item" ' + styleAttr + '><div class="widget" id=widget_' + (i + 1) + '_' + (j + 1) + ' data-dashboardurl="' + href + '" style="height:100%;width:100%;"></div></li>');
                            }
                            else {
                                const deleteIconDiv = that.embedOptions.pinboardSettings.enableUnpinWidget || that.embedOptions.pinboardSettings.enableUnpinWidget === undefined ? '<div id="widget-icons"><i class="items unpin-widget su su-delete" data-toggle="tooltip" data-original-title="Unpin Widget"  style="color: black;" /></div>' : '';
                                bbEmbed('#column-' + (i + 1)).append('<li class="list-item" ' + styleAttr + '><div class="widget" id=widget_' + (i + 1) + '_' + (j + 1) + ' data-dashboardurl="' + href + '" style="height: ' + height + 'px;width:100%;background:#fff;"><div class="widget-sortable" style="width:100%;float:left;display:block;height:0px"><div style="height:100%;width:100%;cursor:move;"><div id="item-name">' + itemName + '</div>' + deleteIconDiv + '</div></div></div></li>');
                            }
                        });
                    }
                    else {
                        bbEmbed('#column-' + (i + 1)).append('<li class="empty click-container"><div class="empty-content empty-homepage"><span class="drag-widget" style="font-family:var(--font-family)">Drag your widgets here to customize layout</span></div></li>');
                    }
                });
                const listItems = bbEmbed('li.list-item a');
                for (let t = 0; t < listItems.length; t++) {
                    bbEmbed('li.list-item a').eq(t).attr('href', bbEmbed('li.list-item a').eq(t).attr('data-url'));
                }
            }
            else if (itemDetail.ItemType.toLowerCase() == 'dashboard') {
                bbEmbed('#add-item, #layout-container, #divider').hide();
                bbEmbed('#widget-container').append('<ul id="column-1" class="dashboard-column col-lg-12 col-md-12 col-sm-12 col-xs-12" data-column-id="1"><li class="dashboard-list"><div class="dashboard" id="dashboard_1_1" style="height:100%;width:100%"></div></li></ul>');
            }
        });
        this._dragAndDropSuccess = this.Invoke(function (result) {
            if (!result.Status) {
                throw new Error('Drag and drop failure due to' + result.Message);
            }
        });
        this._renderMultiTabDashboard = this.Invoke(function (embedResponse) {
            this.isMultiTab = true;
            const that = this;
            const embedContainer = bbEmbed('#' + that.embedOptions.embedContainerId);
            embedContainer.html('');
            const containerName = that.embedOptions.embedContainerId + '_multi_tab_dashboard';
            const multiTabContainer = bbEmbed('<div id="' + containerName + '" class="multitab-dbrd" style="height: 100% !important"></div>');
            embedContainer.append(multiTabContainer);
            const tabHeader = bbEmbed('<div class="e-tab-header"></div>');
            const tabContent = bbEmbed('<div class="e-content"></div>');
            bbEmbed.map(embedResponse, function (value) {
                let dashboardItemDetail = {};
                if (that.embedOptions.token) {
                    dashboardItemDetail.Id = value.DashboardId;
                    dashboardItemDetail.Name = value.DashboardName;
                }
                else {
                    dashboardItemDetail = JSON.parse(value.ItemDetail);
                }
                that.parentDbrdId = that.embedOptions.token ? that.embedOptions.dashboardId : value.parentId;
                const dashboardId = dashboardItemDetail.Id.replaceAll('-', '');
                that.dashboardDetails[`${dashboardId}`] = value;
                if (!that._isNullOrUndefined(that.embedOptions.dashboardSettings.dashboardName) && typeof that.embedOptions.dashboardSettings.dashboardName != 'string') {
                    bbEmbed.map(that.embedOptions.dashboardSettings.dashboardName, function (val) {
                        dashboardItemDetail.Name = (dashboardId == val.dashboardId.replaceAll('-', '')) ? that._isEmptyOrSpaces(val.dashboardName) ? dashboardItemDetail.Name : val.dashboardName : dashboardItemDetail.Name;
                    });
                }
                tabHeader.append(bbEmbed('<div>' + dashboardItemDetail.Name + '</div>'));
                const multitabDbrdEle = bbEmbed('<div style="height:100%;width:100%;overflow: hidden !important;" id="multi_' + dashboardId + '"></div>');
                tabContent.append(bbEmbed('<div></div>').append(multitabDbrdEle.append('<div id="multi_' + dashboardId + '_embeddedbi" class="bbembed-multitab-dbrd"></div>')));
            });
            multiTabContainer.append(tabHeader).append(tabContent);
            tabInstance = new ejdashboard.navigations.Tab({
                enableAnimation: false,
                selected: bbEmbed.proxy(this._tabSelected, this)
            });
            tabInstance.appendTo('#' + containerName);
            bbEmbed('.e-tab-header .e-toolbar-item .e-tab-text').css({ 'display': 'inline-block', 'width': '150px', 'white-space': 'nowrap', 'overflow': 'hidden', 'text-overflow': 'ellipsis', 'color': '#000', 'font-family': 'var(--font-family)', 'text-transform': 'none' });
            bbEmbed('<style type="text/css"> .embed-multi-tab-indicator{ background: var(--primary-branding-color) !important; border-radius: 4px; display: block !important; height: 5px !important;}</style>').appendTo('head');
            bbEmbed('.e-control.e-tab .e-tab-header .e-indicator').addClass('embed-multi-tab-indicator');
            bbEmbed.map(bbEmbed('.e-tab-header .e-toolbar-item .e-tab-text'), function (value, index) {
                bbEmbed(value).attr('title', bbEmbed(value).text());
                bbEmbed(bbEmbed('.e-content').find('#e-content-multi_tab_dashboard_' + index).children()).css({ 'height': '100%', 'width': '100%', 'overflow': 'hidden', 'display': 'block', 'position': 'absolute', 'left': bbEmbed('.e-content.e-lib.e-touch').width() * index });
            });
            bbEmbed('.multitab-dbrd .e-content').attr('style', 'height: 100% !important');
            bbEmbed.map(bbEmbed('.multitab-dbrd .e-content').children(), function (value) {
                bbEmbed(value).css({ 'height': '100%' });
            });
            bbEmbed(embedContainer).css({ 'overflow-x': 'hidden', 'overflow-y': 'hidden', 'width': that.embedOptions.width });
            bbEmbed('#' + containerName).css({ 'width': bbEmbed('.e-content.e-lib.e-touch').width(), 'height': this.embedOptions.height });
            bbEmbed('.e-tab-header')[0].ej2_instances[0].refreshOverflow();
            tabInstance.resizeContext();
            bbEmbed.map(embedResponse, function (value, index) {
                if (index == 0) {
                    const response = {
                        Apistatus: true,
                        Data: value,
                        Status: true
                    };
                    that._renderDashboard(response);
                }
            });
        });
        this._getAuthorizationToken = this.Invoke(function (dashboardId) {
            const that = this;
            const embedDbrdId = dashboardId ? dashboardId : this.embedOptions.dashboardId;
            const embedDbrdIds = this.embedOptions.dashboardIds.join(',');
            const embedDbrbPaths = this.embedOptions.dashboardPaths.join(',');
            let embedQuerString = 'embed_nonce=' + this._uuidv4Generartor() +
                '&embed_dashboard_id=' + embedDbrdId +
                '&embed_dashboard_ids=' + embedDbrdIds +
                '&embed_dashboard_path=' + this.embedOptions.dashboardPath +
                '&embed_dashboard_paths=' + embedDbrbPaths +
                '&pinboard_name=' + (this.pinBoardRendered ? this.embedOptions.pinboardName : '') +
                '&embed_mode=' + this.embedOptions.mode +
                '&embed_timestamp=' + Math.round((new Date()).getTime() / 1000) +
                '&embed_expirationtime=' + this.embedOptions.expirationTime;
            if (this.embedOptions.viewId) {
                embedQuerString = embedQuerString +
                    '&embed_dashboardview_id=' + this.embedOptions.viewId;
            }
            else if (this.embedOptions.viewName) {
                embedQuerString = embedQuerString + '&embed_dashboardview_name=' + this.embedOptions.viewName;
            }
            if (this.isWidgetMode) {
                if (this.isMultipleWidgetMode == false) {
                    embedQuerString = embedQuerString +
                        '&embed_widget_isenabled=' + this.isWidgetMode +
                        '&embed_widget_name=' + this.widgetName;
                }
                else {
                    const multipleWidgetList = [];
                    this.embedOptions.widgetList.forEach(function (widgetDetails) {
                        multipleWidgetList.push(widgetDetails.widgetName.toLowerCase());
                    });
                    embedQuerString = embedQuerString +
                        '&embed_widget_isenabled=' + this.isWidgetMode +
                        '&embed_widget_list=' + multipleWidgetList;
                }
            }
            if (this.isMultiTab) {
                embedQuerString = embedQuerString +
                    '&isMultiTab=' + this.isMultiTab;
            }
            if (!this._isEmptyOrSpaces(this.embedOptions.datasourceId)) {
                embedQuerString = embedQuerString +
                    '&embed_datasource_id=' + this.embedOptions.datasourceId;
            }
            else if (!this._isEmptyOrSpaces(this.embedOptions.datasourceName)) {
                embedQuerString = embedQuerString +
                    '&embed_datasource_name=' + this.embedOptions.datasourceName;
            }
            const data = {
                embedQuerString: encodeURI(embedQuerString),
                dashboardServerApiUrl: this.dashboardServerApiUrl
            };
            if (this.embedOptions.authorizationServer.url != '') {
                this._xhrRequestHelper('POST', this.embedOptions.authorizationServer.url, data, this.embedOptions.authorizationServer.headers, this._renderDashboard);
            }
            else if (!(this._isNullOrUndefined(this.embedOptions.authorizationServer.data)) && this.embedOptions.authorizationServer.data != '' && this.embedOptions.authorizationServer.url == '') {
                this._renderDashboard(this.embedOptions.authorizationServer.data);
            }
            else if ((this.embedOptions.authorizationServer.url == '' || this.embedOptions.authorizationServer.data == '') && this.embedOptions.mode == BoldBI.Mode.View && this._isEmptyOrSpaces(this.embedOptions.pinboardName) && (this.embedOptions.dashboardId || this.embedOptions.dashboardPath || this.embedOptions.dashboardIds || this.embedOptions.dashboardPaths)) {
                bbEmbed.ajax({
                    async: true,
                    type: 'POST',
                    url: this.dashboardServerApiUrl + this.embedAuthorizeEndPoint,
                    data: JSON.stringify(embedQuerString),
                    contentType: 'application/json',
                    success: bbEmbed.proxy(that._renderDashboard, that)
                });
            }
            else {
                throw new Error('Access has been denied due to the AuthorizationServer is missing in the BoldBI.Create().');
            }
            this.pinBoardRendered = true;
        });
        this._validateOptions = this.Invoke(function (options) {
            this.embedOptions.embedContainer = options.embedContainerId;
            if (!this._isNullOrUndefined(options.onError)) {
                this.embedOptions.onError = options.onError;
            }
            if (this._isEmptyOrSpaces(options.embedContainerId) && this._isNullOrUndefined(options.widgetList)) {
                this.invalidDetail = true;
                throw new Error('Please provide the valid Embed container Id');
            }
            if (this._isEmptyOrSpaces(options.serverUrl)) {
                this.invalidDetail = true;
                throw new Error('Server URL cannot be empty');
            }
            if (!this._isUrl(options.serverUrl)) {
                this.invalidDetail = true;
                throw new Error('Please provide a valid Server URL');
            }
            if (!this._isEmptyOrSpaces(options.pinboardName)) {
                return true;
            }
            if (options.mode == BoldBI.Mode.Connection) {
                return true;
            }
            if (options.dashboardPath || (options.dashboardPaths && options.mode !== BoldBI.Mode.DataSource)) {
                const pathsToValidate = options.dashboardPath ? [options.dashboardPath] : options.dashboardPaths;
                pathsToValidate.forEach((path, index) => {
                    pathsToValidate[Number(index)] = `${path.startsWith('/') ? '' : '/'}${path}`.replace(/\/+$/, '');
                    const splitedPath = pathsToValidate[Number(index)].split('/');
                    if (splitedPath.length !== 3 || splitedPath[0] !== '' || splitedPath[1] === '' || splitedPath[2] === '') {
                        throw new Error('Invalid dashboard path: ' + path);
                    }
                });
                if (options.dashboardPath) {
                    options.dashboardPath = pathsToValidate[0];
                }
                else {
                    options.dashboardPaths = pathsToValidate;
                }
            }
            if (this._isEmptyOrSpaces(options.dashboardId) && (!options.dashboardIds || !options.dashboardIds.length) && (!options.dashboardPaths || !options.dashboardPaths.length) && this._isEmptyOrSpaces(options.dashboardPath) && options.mode !== BoldBI.Mode.Design && this._isEmptyOrSpaces(options.datasourceId) && this._isEmptyOrSpaces(options.datasourceName)) {
                if (options.mode != BoldBI.Mode.DataSource) {
                    if (this._isEmptyOrSpaces(options.pinboardName) && !this._isNullOrUndefined(options.pinboardName)) {
                        this.invalidDetail = true;
                        throw new Error('Pinboard name cannot be empty');
                    }
                    else if (this._isEmptyOrSpaces(options.viewId)) {
                        this.invalidDetail = true;
                        throw new Error('Dashboard id or path or view id cannot be empty');
                    }
                }
                else {
                    this.invalidDetail = true;
                    throw new Error('Datasource id or name cannot be empty');
                }
            }
            return true;
        });
        this.IsDependencyLoaded = false;
        this.rootUrl = '';
        this.baseUrl = '';
        this.siteIdentifier = '';
        this.dashboardServerApiUrl = '';
        this.designerRootUrl = '';
        this.customThemeUrl = '';
        this.scheduleEndpointUrl = '';
        this.childContainer = '';
        this.cdnLink = '';
        this.beforeSaveViewDialogOpenFn = 'beforeSaveViewDialogRendered';
        this.beforeSaveAsViewDialogOpenFn = 'beforeSaveAsViewDialogRendered';
        this.onViewSavedFiltersClickFn = 'openViewSection';
        this.onBannerIconClickFn = 'onBannerIconClick';
        this.beforeWidgetIconRenderedFn = 'beforeWidgetIconRendered';
        this.onWidgetIconClickFn = 'onWidgetIconClick';
        this.actionBeginFn = 'onActionBeginOfNewDashboardViewer';
        this.actionCompleteFn = 'onActionCompleteOfNewDashboardViewer';
        this.beforeBannerIconRenderFn = 'beforeBannerIconRender';
        this.beforeOtherRenderFn = 'beforeOtherOptionContextMenuRender';
        this.isWidgetMode = false;
        this.isDashboardRendering = false;
        this.isPinboardRendering = false;
        this.isDashboardViewRendering = false;
        this.widgetName = '';
        this.isDashboardViewMode = false;
        this.dashboardViewName = '';
        this.errorImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjExNzgwNzk4MzhBOTExRTQ4MDMxRTZEMkIzQUQzNjdCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjExNzgwNzk5MzhBOTExRTQ4MDMxRTZEMkIzQUQzNjdCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTE3ODA3OTYzOEE5MTFFNDgwMzFFNkQyQjNBRDM2N0IiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTE3ODA3OTczOEE5MTFFNDgwMzFFNkQyQjNBRDM2N0IiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4RB5yjAAABXklEQVR42rRUsU7DQAzNRWxESMydK2XsAhtiQGHo1LmsZYCBMSNDx3wASJQ1zN0rJjZYOlbqDCsSPxCeq5f0anwtSMHSk52L/c4++85VVRW1KXu14ZwLOn2enK1+Hr48B3evE3ONoQhBcgw1AjKgw+V3YAY8gvz1V4QgOoC6B4b0nQML2inQo/0EXIH4K0hIMslAspsCOQKWKvMuVAEMAMkyE9KmF2LUH3AugQoYK5IbgVob07f0eWJ1ZlLmFDveqjM/JRqhj1QxZOxKYs9nRJ0bTdwHEmM9V7EbhNLNuT4zSkLSSGW5ZNMyi7DjddMiTAL/Ft5YrQd7h3z8+aZwaFPLCaX1t3CkjP1Rssxfj3Omb825wFjvctBnFuGEujCyeCC0FCp2TYiy3qBkSAd6sCF9YmOweVtKxv7P1Qs9DnfAxY7HQaq53vo4qEyOoC4Dz9fEL9MkbEviqGX5FmAA1Vq0VgBUvekAAAAASUVORK5CYII=';
        this.pinBoardRendered = true;
        this.pinboardIds = [];
        this.fromColumn = null;
        this.toColumn = null;
        this.fromPosition = null;
        this.toPosition = null;
        this.column = null;
        this.position = null;
        this.isMultiTab = false;
        this.parentDbrdId = '';
        this.isNewConnection = false;
        this.multiTabTheme = '';
        this.dashboardDetails = {};
        this.pinboardDetails = [];
        this.accessToken = '';
        this.homepageItemId = '';
        this.isVirtualHomepage = false;
        this.dashboardUrl = '';
        this.commentsArgs = {};
        this._widgetsCollection = [];
        this.jQueryDepedentFile = 'jquery-1.10.2.min.js';
        this.jqConflictFile = 'window.bb$ = jQuery.noConflict();';
        this.isFullscreen = false;
        this.embedAuthorizeEndPoint = '/embed/authorize';
        this.embedGetDetailsEndPoint = '/embed/get-details';
        this.isMultipleWidgetMode = false;
        this.invalidDetail = false;
        this.isDefaultView = false;
        this.tokenResponse = {
            DatasourceId: '',
            ConnectionList: '',
            ItemDetail: {
                IsPublic: false,
                Description: '',
                Name: ''
            }
        };
        this.wrapperDependentScriptFiles = [
            'jquery.easing.1.3.min.js',
            'jquery-ui.min.js',
            'jsrender.min.js'
        ];
        this.viewerScriptFiles = [
            'ej1.web.all.min.js',
            'ej2.web.all.min.js',
            'designerlocalization.js'
        ];
        this.pinBoardScriptFiles = [
            'bootstrap.min.js'
        ];
        this.pinboardCssFiles = [
            'pinboard-embed.min.css'
        ];
        this.ejViewerDependentFiles = [
            'ej.dashboarddesigner.min.js'
        ];
        this.ejDesignerDependentFiles = [
            'codemirror.min.js'
        ];
        this.designerScriptFiles = [
            'ej1.web.all.min.js',
            'ej2.web.all.min.js',
            'designerlocalization.js',
            'signalr.min.js'
        ];
        this.cssFiles = [
            'font-server.min.css',
            'ej1.web.all.min.css',
            'ej2.partone.web.all.min.css',
            'ej2.parttwo.web.all.min.css',
            'ej.designerwidgets.all.min.css',
            'ej.dashboarddesigner.min.css'
        ];
        this.designerCssFiles = [
            'ej.codemirror.min.css'
        ];
        this.applicationThemeCssFiles = [
            'boldbi.theme.definition.min.css',
            'application.theme.css'
        ];
        this.dashboardThemeCssFiles = [
            'dashboard.theme.css'
        ];
        this.fontFamilyCssFiles = [
            'font-family.min.css'
        ];
        this.embedOptions = {
            serverUrl: '',
            dashboardId: '',
            dashboardIds: [],
            dashboardPath: '',
            dashboardPaths: [],
            datasourceId: '',
            datasourceName: '',
            embedContainerId: '',
            embedType: BoldBI.EmbedType.Component,
            environment: BoldBI.Environment.Enterprise,
            mode: BoldBI.Mode.View,
            viewId: '',
            viewName: '',
            nonce: '',
            layoutSettings: {
                hideDesignerScroller: false
            },
            dashboardSettings: {
                showHeader: true,
                showExport: true,
                showRefresh: true,
                showMoreOption: true,
                onFavoriteIconClick: '',
                beforeIconRender: '',
                onIconClick: '',
                onInteraction: '',
                enableTheme: false,
                enableFilterOverview: true,
                enableFullScreen: false,
                showDashboardParameter: true,
                dashboardName: '',
                beforePublishAs: '',
                beforeDesignerToolbarButtons: '',
                enableComment: false,
                beforeDesignerToolbarIconsRendered: '',
                beforeDatasourceToolbarButtonsRendered: '',
                beforeDatasourceToolbarIconsRendered: '',
                toolbarClick: '',
                fontFamily: '',
                widgetsPanel: {
                    hideDefaultWidgets: false,
                    hideExistingWidgets: false,
                    defaultPanelDisplayText: '',
                    existingPanelDisplayText: '',
                    defaultPanelSearchPlaceholder: '',
                    existingPanelSearchPlaceholder: '',
                    existingDashboards: [],
                    dragAndDropSettings: {
                        rowSpan: null,
                        columnSpan: null,
                        isWidgetMode: false
                    }
                },
                dataSourceConfig: {
                    hideDataSourceConfig: false
                },
                viewDataSettings: {
                    showAllColumns: false,
                    enableExporting: true,
                    enableColumnSelection: true
                },
                showPreviewAs: true,
                themeSettings: {
                    appearance: '',
                    application: '',
                    dashboard: '',
                    isLocalTheme: false
                },
                filterOverviewSettings: {
                    showSaveAsIcon: false,
                    showSaveIcon: false,
                    showViewSavedFilterIcon: false,
                    viewId: '',
                    viewName: ''
                },
                saveFilterClick: '',
                saveAsFilterClick: '',
                viewSavedFiltersClick: '',
                beforeSaveViewDialogOpen: '',
                beforeSaveAsViewDialogOpen: '',
                onViewSavedFiltersClick: ''
            },
            widgetSettings: {
                showExport: true,
                showMaximize: true,
                showMoreOption: true,
                showFilter: true,
                beforeIconRender: '',
                onIconClick: '',
                beforeWidgetControlMenuOpen: '',
                onWidgetControlMenuClick: '',
                enableComment: false,
                beforeWidgetItemsListed: ''
            },
            filterParameters: '',
            dynamicConnection: {
                isEnabled: false,
                identity: ''
            },
            exportSettings: {
                showExcel: true,
                showPDF: true,
                showImage: true,
                showCSV: true
            },
            height: '768px',
            width: '1024px',
            theme: '',
            authorizationServer: {
                url: '',
                data: '',
                headers: {},
                authorizionComplete: ''
            },
            token: '',
            expirationTime: 86400,
            autoRefreshSettings: {
                enabled: false,
                hourlySchedule: {
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                }
            },
            isRemoveStyle: false,
            scalingFactor: 1,
            localeSettings: {
                culture: 'en-US',
                dateFormat: 'M/d/yyyy',
                timeFormat: 'h:mm:ss tt',
                appLocale: 'en-US'
            },
            actionBegin: '',
            actionComplete: '',
            beforeContextMenuRender: '',
            beforeNavigateUrlLinking: '',
            beforeNavigateToDashboard: '',
            beforeFilterApply: '',
            afterFilterApply: '',
            toolbarSettings: {
                showToolbar: true
            },
            pinboardName: '',
            pinboardSettings: {
                enablePinboardHeader: true,
                enableUnpinWidget: true
            },
            onUnpin: '',
            onDrag: '',
            onDrop: '',
            onLayoutChange: '',
            onResize: '',
            datasources: [],
            designCanvasSettings: {
                margin: null
            },
            widgetContainerSettings: {
                margin: null,
                boxShadow: null
            },
            beforeDatasourceSave: '',
            afterDatasourceSave: '',
            preConfiguredWidgets: {
                dashboardId: '',
                categoryName: ''
            },
            disableAutoRecover: false,
            ajaxBeforeLoad: '',
            isBingMapRequired: false,
            widgetList: ''
        };
        this.loadDashboard = this.Invoke(function (dashboardId) {
            if (!this.invalidDetail) {
                if (this.embedOptions.mode != BoldBI.Mode.View) {
                    throw new Error('Invalid embeded Mode');
                }
                if (this.embedOptions.pinboardName != '') {
                    this.embedOptions.pinboardName = '';
                }
                if (dashboardId != undefined) {
                    this.embedOptions.dashboardId = dashboardId;
                }
                this.embedOptions.dashboardIds = [];
                this.embedOptions.dashboardPaths = [];
                if (!this._checkWidgetList()) {
                    if (this.embedOptions.embedType == BoldBI.EmbedType.Component) {
                        this.isDashboardRendering = true;
                        this.isWidgetMode = false;
                        this.widgetName = '';
                        this.isDashboardViewMode = false;
                        this.dashboardViewName = '';
                        this._showLoader();
                        this._isDependencyLoaded(this);
                    }
                    else if (this.embedOptions.embedType == BoldBI.EmbedType.IFrame) {
                        const iframe = document.createElement('iframe');
                        iframe.frameBorder = 0;
                        iframe.width = this.embedOptions.width;
                        iframe.height = this.embedOptions.height;
                        iframe.id = this.embedOptions.embedContainerId + '_' + this.embedOptions.dashboardId;
                        iframe.allowfullscreen = this.embedOptions.dashboardSettings.showFullScreen;
                        iframe.setAttribute('src', this.embedOptions.serverUrl + '/dashboards/' + this.embedOptions.dashboardId + '?isembed=true');
                        document.getElementById(this.embedOptions.embedContainerId).appendChild(iframe);
                    }
                }
            }
        });
        this.loadMultitabDashboard = this.Invoke(function (dashboardIds) {
            if (!this.invalidDetail) {
                if (this.embedOptions.mode != BoldBI.Mode.View) {
                    throw new Error('Invalid embeded Mode');
                }
                if (this.embedOptions.pinboardName != '') {
                    this.embedOptions.pinboardName = '';
                }
                if (dashboardIds !== undefined && dashboardIds !== null) {
                    this.embedOptions.dashboardIds = dashboardIds;
                }
                if (this.embedOptions.embedType == BoldBI.EmbedType.Component) {
                    this.isWidgetMode = false;
                    this.widgetName = '';
                    this.isDashboardViewMode = false;
                    this.dashboardViewName = '';
                    this._showLoader();
                    this._isDependencyLoaded(this);
                }
            }
        });
        this.loadView = this.Invoke(function () {
            if (!this.invalidDetail) {
                if (this.embedOptions.mode != BoldBI.Mode.View) {
                    throw new Error('Invalid embeded Mode');
                }
                if (this.embedOptions.pinboardName != '') {
                    this.embedOptions.pinboardName = '';
                }
                if (this.embedOptions.embedType == BoldBI.EmbedType.Component) {
                    this.isDashboardViewRendering = true;
                    this.isWidgetMode = false;
                    this.widgetName = '';
                    this.isDashboardViewMode = false;
                    this.dashboardViewName = '';
                    this._showLoader();
                    this._isDependencyLoaded(this);
                }
            }
        });
        this.loadDashboardWidget = this.Invoke(function (name, dashboardId) {
            if (!this.invalidDetail) {
                if (this._isEmptyOrSpaces(name)) {
                    throw new Error('Widget id or name cannot not be empty');
                }
                if (this.embedOptions.mode != BoldBI.Mode.View) {
                    throw new Error('Cant able to render the Widget in design mode');
                }
                if (this.embedOptions.pinboardName != '' && this.pinBoardRendered) {
                    this.embedOptions.pinboardName = '';
                }
                this.embedOptions.dashboardIds = [];
                this.embedOptions.dashboardPaths = [];
                if (!this._checkWidgetList()) {
                    if (this.embedOptions.embedType == BoldBI.EmbedType.Component) {
                        this.isWidgetMode = true;
                        this.widgetName = name;
                        this.isDashboardViewMode = false;
                        this.dashboardViewName = '';
                        this._showLoader();
                        this._isDependencyLoaded(this, dashboardId);
                    }
                    else if (this.embedOptions.embedType == BoldBI.EmbedType.IFrame) {
                        const iframe = document.createElement('iframe');
                        iframe.frameBorder = 0;
                        iframe.width = this.embedOptions.width;
                        iframe.height = this.embedOptions.height;
                        iframe.id = this.embedOptions.embedContainerId + '_' + this.embedOptions.dashboardId;
                        iframe.allowfullscreen = this.embedOptions.dashboardSettings.showFullScreen;
                        iframe.setAttribute('src', this.embedOptions.serverUrl + '/dashboards/' + this.embedOptions.dashboardId + '?isembed=true');
                        document.getElementById(this.embedOptions.embedContainerId).appendChild(iframe);
                    }
                }
            }
        });
        this.loadMultipleWidgets = this.Invoke(function (dashboardId) {
            if (!this.invalidDetail) {
                if (this.embedOptions.widgetList == '') {
                    throw new Error('Provide the Widget details with containerID in an array');
                }
                if (this.embedOptions.mode != BoldBI.Mode.View) {
                    throw new Error('Invalid embed mode');
                }
                if (this.embedOptions.pinboardName != '') {
                    this.embedOptions.pinboardName = '';
                }
                if (dashboardId != undefined) {
                    this.embedOptions.dashboardId = dashboardId;
                }
                if (this.embedOptions.embedType == BoldBI.EmbedType.Component) {
                    this.isWidgetMode = true;
                    this.isMultipleWidgetMode = true;
                    this.widgetName = '';
                    this.isDashboardViewMode = false;
                    this.dashboardViewName = '';
                    const that = this;
                    const multipleWidgetsList = this.embedOptions.widgetList;
                    const checkjQueryLoaded = setInterval(() => {
                        if (window.jQuery) {
                            clearInterval(checkjQueryLoaded);
                            multipleWidgetsList.forEach(function (widgetInfo) {
                                const embedWidgetContainerId = widgetInfo.containerId;
                                let embedContainer = window.bbEmbed.call(that, '#' + embedWidgetContainerId + '_embeddedbi');
                                if (embedContainer.length === 0) {
                                    this.childContainer = document.createElement('div');
                                    this.childContainer.id = embedWidgetContainerId + '_embeddedbi';
                                    bbEmbed('#' + embedWidgetContainerId).css({ 'width': bbEmbed('.e-content.e-lib.e-touch').width(), 'height': this.embedOptions.height });
                                    document.getElementById(embedWidgetContainerId).append(this.childContainer);
                                    embedContainer = window.bbEmbed.call(that, '#' + embedWidgetContainerId + '_embeddedbi');
                                }
                                this._showLoader(embedWidgetContainerId);
                            }.bind(this));
                            this._isDependencyLoaded(this, dashboardId);
                        }
                    }, 1000);
                }
            }
        });
        this.loadDesigner = this.Invoke(function (dashboardId) {
            if (!this.invalidDetail) {
                if (this.embedOptions.mode != BoldBI.Mode.Design) {
                    throw new Error('Invalid embed Mode');
                }
                if (this.embedOptions.pinboardName != '') {
                    this.embedOptions.pinboardName = '';
                }
                if (dashboardId != undefined) {
                    this.embedOptions.dashboardId = dashboardId;
                }
                if (!this._checkWidgetList()) {
                    if (this.embedOptions.embedType == BoldBI.EmbedType.Component) {
                        this.isDashboardRendering = true;
                        this.isWidgetMode = false;
                        this.widgetName = '';
                        this.isDashboardViewMode = false;
                        this.dashboardViewName = '';
                        this._showLoader();
                        this._isDependencyLoaded(this);
                    }
                    else if (this.embedOptions.embedType == BoldBI.EmbedType.IFrame) {
                        const iframe = document.createElement('iframe');
                        iframe.frameBorder = 0;
                        iframe.width = this.embedOptions.width;
                        iframe.height = this.embedOptions.height;
                        iframe.id = this.embedOptions.embedContainerId + '_' + this.embedOptions.dashboardId;
                        iframe.allowfullscreen = this.embedOptions.dashboardSettings.showFullScreen;
                        iframe.setAttribute('src', this.embedOptions.serverUrl + '/dashboard-designer/' + this.embedOptions.dashboardId + '?isembed=true');
                        document.getElementById(this.embedOptions.embedContainerId).appendChild(iframe);
                    }
                }
            }
        });
        /**
         * @param {string} widgetNames - Define the name of the widget to be Refresh.
         * @param {boolean} hideLoader - Define whether to show or hide loading indicator while processing.
         * @param {string} dashboardId - Define the unique id of the dashboard if it is present within the multitab dashboard.
         */
        this.refreshWidgetData = this.Invoke(function (widgetNames, hideLoader, dashboardId) {
            if (Array.isArray(widgetNames) == true) {
                if (this.isMultiTab) {
                    const dashboardContainer = bbEmbed('#' + this.embedOptions.embedContainerId).find('.e-content .bbembed-multitab-dbrd');
                    for (let i = 0; i < dashboardContainer.length; i++) {
                        if (bbEmbed(dashboardContainer[`${i}`]).attr('id').includes(dashboardId.toString().replaceAll('-', '')) > 0) {
                            const embedId = bbEmbed(dashboardContainer[`${i}`]).attr('id');
                            const dbrdInstance = this._getDashboardInstance(embedId);
                            if (dbrdInstance != undefined) {
                                dbrdInstance.refreshWidget(widgetNames, hideLoader);
                            }
                            break;
                        }
                    }
                }
                else {
                    const dbrdInstance = this._getDashboardInstance();
                    if (dbrdInstance != undefined) {
                        dbrdInstance.refreshWidget(widgetNames, hideLoader);
                    }
                }
            }
            else {
                throw new Error('Cannot able to refresh the widget the WigetName should be in array');
            }
        });
        this.renderWidgets = this.Invoke(function (widgetslist) {
            if (this.embedOptions.mode != BoldBI.Mode.Design) {
                this._throwError('The renderWidgets method is supported only for Design Mode.');
            }
            const dbrdInstance = this._getDashboardInstance();
            let widgetValue;
            if (dbrdInstance != undefined) {
                widgetValue = dbrdInstance.renderWidgets(widgetslist);
            }
            if (widgetValue != undefined) {
                this._throwError(widgetValue);
            }
        });
        this.getSupportedWidgets = this.Invoke(function (clientFnc) {
            if (this.embedOptions.mode != BoldBI.Mode.Design) {
                this._throwError('The getSupportedWidgets method is only supported for Design Mode.');
            }
            const dbrdInstance = this._getDashboardInstance();
            if (dbrdInstance != undefined) {
                const widgetsValue = dbrdInstance.getSupportedWidgets(clientFnc);
                if (window[`${clientFnc}`] instanceof Function) {
                    window[`${clientFnc}`].call(this, widgetsValue);
                }
                else {
                    clientFnc.call(this, widgetsValue);
                }
            }
        });
        this.addWidgetToPinboard = this.Invoke(function (dashboardId, widgetId, widgetName) {
            if (!this._isEmptyOrSpaces(dashboardId) && !this._isEmptyOrSpaces(widgetId) && !this._isEmptyOrSpaces(widgetName)) {
                const specialCharsRegex = /^[a-zA-Z0-9!@$^ ()_=\-}{.`~]*$/;
                if (!(specialCharsRegex.test(widgetName))) {
                    throw new Error('Please avoid special characters in widget name');
                }
                const homepageItemId = bbEmbed('#widget-container').attr('data-homepage-id');
                const that = this;
                const embedQuerString = 'embed_nonce=' + this._uuidv4Generartor() +
                    '&homepageId=' + homepageItemId +
                    '&isPinUpdate=' + true +
                    '&pinWidgetId=' + widgetId +
                    '&pinDashbooardId=' + dashboardId +
                    '&pinWidgetName=' + (this._isNullOrUndefined(widgetName) ? null : widgetName) +
                    '&pinboard_name=' + this.embedOptions.pinboardName +
                    '&embed_mode=' + this.embedOptions.mode +
                    '&embed_timestamp=' + Math.round((new Date()).getTime() / 1000) +
                    '&embed_expirationtime=' + this.embedOptions.expirationTime;
                const data = {
                    embedQuerString: encodeURI(embedQuerString),
                    dashboardServerApiUrl: this.dashboardServerApiUrl
                };
                this._xhrRequestHelper('POST', this.embedOptions.authorizationServer.url, data, this.embedOptions.authorizationServer.headers, function (result) {
                    if (result.Status) {
                        that._addWidgetInPinboard(result.Data);
                    }
                    else if (!result.Status) {
                        that._throwError('Cant able to add the widget due to ' + result.Message);
                    }
                });
            }
            else if (this._isEmptyOrSpaces(dashboardId) || this._isEmptyOrSpaces(widgetId)) {
                throw new Error('Please provide the valid dashboard id and widget id');
            }
            else {
                throw new Error('Please provide the valid widget name');
            }
        });
        this.saveFilterView = this.Invoke(function (viewParameters, callBackFunc) {
            const regex = /^(?:\{{0,1}(?:[0-9a-fA-F]){8}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){12}\}{0,1})$/;
            const isGuidDbrd = regex.exec(viewParameters.ItemId);
            const isGuidChildDbrd = this.isMultiTab ? regex.exec(viewParameters.ChildItemId) : false;
            if ((!this._isEmptyOrSpaces(viewParameters.ViewName)) && (!this._isEmptyOrSpaces(viewParameters.QueryString)) && ((this.isMultiTab && isGuidChildDbrd && isGuidDbrd) || (isGuidDbrd))) {
                const that = this;
                const data = {
                    'ViewName': viewParameters.ViewName,
                    'ItemId': viewParameters.ItemId,
                    'QueryString': viewParameters.QueryString,
                    'IsPublic': false,
                    'ChildItemId': this.isMultiTab ? viewParameters.ChildItemId : null,
                    'IsDefault': viewParameters.IsDefault ? viewParameters.IsDefault : false
                };
                bbEmbed.ajax({
                    async: false,
                    type: 'POST',
                    url: this.dashboardServerApiUrl + '/v4.0/dashboards/views',
                    headers: {
                        'Authorization': 'bearer ' + this.accessToken
                    },
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    success: function (result) {
                        if (result.Status) {
                            const view = {}; // Create a new object in each iteration
                            view['ItemId'] = viewParameters.ItemId;
                            view['ViewId'] = result.Data;
                            view['ViewName'] = viewParameters.ViewName;
                            that._updateInFilterOverviewUI(viewParameters.ViewName, result.Data);
                            if (window[`${callBackFunc}`] instanceof Function) {
                                window[`${callBackFunc}`].call(that, view, result.StatusMessage);
                            }
                            else {
                                callBackFunc.call(that, view, result.StatusMessage);
                            }
                        }
                        else {
                            if (window[`${callBackFunc}`] instanceof Function) {
                                window[`${callBackFunc}`].call(that, null, result.StatusMessage);
                            }
                            else {
                                callBackFunc.call(that, null, result.StatusMessage);
                            }
                        }
                    },
                    error: function (jqXHR) { that.ajaxErrorFnc(jqXHR); }
                });
            }
            else {
                if (!isGuidDbrd) {
                    throw new Error('Please provide valid dashboard ID.');
                }
                if (this.isMultiTab && !isGuidChildDbrd) {
                    throw new Error('Please provide valid child dashboard ID.');
                }
                if (this._isEmptyOrSpaces(viewParameters.ViewName)) {
                    throw new Error('Please provide valid view name.');
                }
                if (this._isEmptyOrSpaces(viewParameters.QueryString)) {
                    throw new Error('Please provide valid query string.');
                }
            }
        });
        this.saveAsFilterView = this.Invoke(function (viewParameters, callBackFunc) {
            const regex = /^(?:\{{0,1}(?:[0-9a-fA-F]){8}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){12}\}{0,1})$/;
            const isGuidDbrd = regex.exec(viewParameters.ItemId);
            const isGuidChildDbrd = this.isMultiTab ? regex.exec(viewParameters.ChildItemId) : false;
            if ((!this._isEmptyOrSpaces(viewParameters.ViewName)) && (!this._isEmptyOrSpaces(viewParameters.QueryString)) && ((this.isMultiTab && isGuidChildDbrd && isGuidDbrd) || (isGuidDbrd))) {
                const that = this;
                const data = {
                    'ViewName': viewParameters.ViewName,
                    'ItemId': viewParameters.ItemId,
                    'QueryString': viewParameters.QueryString,
                    'ChildItemId': this.isMultiTab ? viewParameters.ChildItemId : null,
                    'IsDefault': viewParameters.IsDefault ? viewParameters.IsDefault : false
                };
                bbEmbed.ajax({
                    async: false,
                    type: 'POST',
                    url: this.dashboardServerApiUrl + '/v4.0/dashboards/views',
                    headers: {
                        'Authorization': 'bearer ' + this.accessToken
                    },
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    success: function (result) {
                        if (result.Status) {
                            const view = {}; // Create a new object in each iteration
                            view['ItemId'] = viewParameters.ItemId;
                            view['ViewId'] = result.Data;
                            view['ViewName'] = viewParameters.ViewName;
                            that._updateInFilterOverviewUI(viewParameters.ViewName, result.Data);
                            if (window[`${callBackFunc}`] instanceof Function) {
                                window[`${callBackFunc}`].call(that, view, result.StatusMessage);
                            }
                            else {
                                callBackFunc.call(that, view, result.StatusMessage);
                            }
                        }
                        else {
                            if (window[`${callBackFunc}`] instanceof Function) {
                                window[`${callBackFunc}`].call(that, null, result.StatusMessage);
                            }
                            else {
                                callBackFunc.call(that, null, result.StatusMessage);
                            }
                        }
                    },
                    error: function (jqXHR) { that.ajaxErrorFnc(jqXHR); }
                });
            }
            else {
                if (!isGuidDbrd) {
                    throw new Error('Please provide valid dashboard ID.');
                }
                if (this.isMultiTab && !isGuidChildDbrd) {
                    throw new Error('Please provide valid child dashboard ID.');
                }
                if (this._isEmptyOrSpaces(viewParameters.ViewName)) {
                    throw new Error('Please provide valid view name.');
                }
                if (this._isEmptyOrSpaces(viewParameters.QueryString)) {
                    throw new Error('Please provide valid query string.');
                }
            }
        });
        this.updateFilterView = this.Invoke(function (viewParameters, callBackFunc) {
            const regex = /^(?:\{{0,1}(?:[0-9a-fA-F]){8}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){12}\}{0,1})$/;
            const isGuidDbrd = regex.exec(viewParameters.DashboardId);
            const isGuidView = regex.exec(viewParameters.ViewId);
            if (isGuidDbrd && (!this._isEmptyOrSpaces(viewParameters.QueryString)) && isGuidView) {
                const that = this;
                const data = {
                    'ViewId': viewParameters.ViewId,
                    'DashboardId': viewParameters.DashboardId,
                    'QueryString': viewParameters.QueryString,
                    'IsDefault': viewParameters.IsDefault
                };
                bbEmbed.ajax({
                    async: false,
                    type: 'PUT',
                    url: this.dashboardServerApiUrl + '/v4.0/dashboards/views',
                    headers: {
                        'Authorization': 'bearer ' + this.accessToken
                    },
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    success: function (result) {
                        if (result.Status) {
                            const view = {}; // Create a new object in each iteration
                            view['ViewId'] = viewParameters.ViewId;
                            if (window[`${callBackFunc}`] instanceof Function) {
                                window[`${callBackFunc}`].call(that, view, result.StatusMessage);
                            }
                            else {
                                callBackFunc.call(that, view, result.StatusMessage);
                            }
                        }
                    },
                    error: function (jqXHR) { that.ajaxErrorFnc(jqXHR); }
                });
            }
            else {
                if (!isGuidDbrd) {
                    throw new Error('Please provide valid dashboard ID.');
                }
                if (!isGuidView) {
                    throw new Error('Please provide valid view ID.');
                }
                if (this._isEmptyOrSpaces(viewParameters.QueryString)) {
                    throw new Error('Please provide valid query string.');
                }
            }
        });
        this.getViewsByDashboardId = this.Invoke(function (dashboardId, callBackFunc) {
            const regex = /^(?:\{{0,1}(?:[0-9a-fA-F]){8}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){12}\}{0,1})$/;
            const isGuidDbrd = regex.exec(dashboardId);
            if (isGuidDbrd) {
                const that = this;
                const data = {
                    'DashboardId': dashboardId
                };
                bbEmbed.ajax({
                    async: false,
                    type: 'GET',
                    url: this.dashboardServerApiUrl + '/v4.0/dashboards/' + dashboardId + '/views',
                    headers: {
                        'Authorization': 'bearer ' + this.accessToken
                    },
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    success: function (result) {
                        if (result) {
                            const viewItems = [];
                            for (let x = 0; x < result.length; x++) {
                                const view = {}; // Create a new object in each iteration
                                view['ItemId'] = result[`${x}`].ItemId;
                                view['ViewId'] = result[`${x}`].ViewId;
                                view['ViewName'] = result[`${x}`].ViewName;
                                view['QueryString'] = result[`${x}`].QueryString;
                                viewItems.push(view); // Push the new object to the array
                            }
                            if (window[`${callBackFunc}`] instanceof Function) {
                                window[`${callBackFunc}`].call(that, viewItems);
                            }
                            else {
                                callBackFunc.call(that, viewItems);
                            }
                        }
                        else {
                            if (window[`${callBackFunc}`] instanceof Function) {
                                window[`${callBackFunc}`].call(that);
                            }
                            else {
                                callBackFunc.call(that);
                            }
                        }
                    },
                    error: function (jqXHR) { that.ajaxErrorFnc(jqXHR); }
                });
            }
            else {
                if (!isGuidDbrd) {
                    throw new Error('Please provide valid dashboard ID.');
                }
            }
        });
        this.getViewByViewId = this.Invoke(function (viewId, callBackFunc) {
            const regex = /^(?:\{{0,1}(?:[0-9a-fA-F]){8}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){12}\}{0,1})$/;
            const isGuidView = regex.exec(viewId);
            if (isGuidView) {
                const that = this;
                const data = {
                    'ViewId': viewId
                };
                bbEmbed.ajax({
                    async: false,
                    type: 'GET',
                    url: this.dashboardServerApiUrl + '/v4.0/dashboards/views/' + viewId,
                    headers: {
                        'Authorization': 'bearer ' + this.accessToken
                    },
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    success: function (result) {
                        const view = {}; // Create a new object in each iteration
                        if (result) {
                            view['ViewId'] = result.ViewId;
                            view['ViewName'] = result.ViewName;
                            view['QueryString'] = result.QueryString;
                        }
                        if (window[`${callBackFunc}`] instanceof Function) {
                            window[`${callBackFunc}`].call(that, view);
                        }
                        else {
                            callBackFunc.call(that, view);
                        }
                    },
                    error: function (jqXHR) { that.ajaxErrorFnc(jqXHR); }
                });
            }
            else {
                if (!isGuidView) {
                    throw new Error('Please provide valid view ID.');
                }
            }
        });
        this.deleteFilterView = this.Invoke(function (viewId, callBackFunc) {
            const regex = /^(?:\{{0,1}(?:[0-9a-fA-F]){8}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){12}\}{0,1})$/;
            const isGuidView = regex.exec(viewId);
            if (isGuidView) {
                const that = this;
                const data = {
                    'ViewId': viewId
                };
                bbEmbed.ajax({
                    async: false,
                    type: 'DELETE',
                    url: this.dashboardServerApiUrl + '/v4.0/dashboards/views/' + viewId,
                    headers: {
                        'Authorization': 'bearer ' + this.accessToken
                    },
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    success: function () {
                        if (window[`${callBackFunc}`] instanceof Function) {
                            window[`${callBackFunc}`].call(that, viewId);
                        }
                        else {
                            callBackFunc.call(that, viewId);
                        }
                    },
                    error: function (jqXHR) { that.ajaxErrorFnc(jqXHR); }
                });
            }
            else {
                if (!isGuidView) {
                    throw new Error('Please provide valid view ID.');
                }
            }
        });
    }
    // Customer exposed functions
    static create(options) {
        const boldBIObj = new BoldBI();
        boldBIObj.isMultiTab = false;
        boldBIObj.parentDbrdId = '';
        boldBIObj.pinboardIds = [];
        delete window['multiTabFilterParameter'];
        if (document.addEventListener) {
            document.addEventListener('webkitfullscreenchange', function () { boldBIObj._fullscreenExitHandler(boldBIObj); }, false);
            document.addEventListener('mozfullscreenchange', function () { boldBIObj._fullscreenExitHandler(boldBIObj); }, false);
            document.addEventListener('fullscreenchange', function () { boldBIObj._fullscreenExitHandler(boldBIObj); }, false);
            document.addEventListener('MSFullscreenChange', function () { boldBIObj._fullscreenExitHandler(boldBIObj); }, false);
            window.addEventListener('resize', function () {
                if (boldBIObj.isMultiTab) {
                    boldBIObj.resizeDashboard('');
                }
                else if (!boldBIObj._isEmptyOrSpaces(boldBIObj.embedOptions.pinboardName) || !boldBIObj._isNullOrUndefined(boldBIObj.embedOptions.pinboardName)) {
                    boldBIObj.setListMinimumHeight();
                }
            });
        }
        if (boldBIObj._validateOptions(options)) {
            boldBIObj._initializeEmbedOptions(options);
            if (boldBIObj.embedOptions.embedType == BoldBI.EmbedType.Component) {
                try {
                    if (boldBIObj.embedOptions.widgetList == '' || boldBIObj.embedOptions.embedContainerId) {
                        boldBIObj.childContainer = document.createElement('div');
                        boldBIObj.childContainer.id = boldBIObj.embedOptions.embedContainerId + '_embeddedbi';
                        const _biInstance = BoldBI._gettinstance(document.getElementById(boldBIObj.embedOptions.embedContainerId), 'embeddedBoldBI');
                        if (_biInstance != null || _biInstance != undefined) {
                            _biInstance.destroy();
                        }
                        document.getElementById(boldBIObj.embedOptions.embedContainerId).innerHTML = '';
                        document.getElementById(boldBIObj.embedOptions.embedContainerId).append(boldBIObj.childContainer);
                    }
                    if (boldBIObj._initializeUrls()) {
                        if (!boldBIObj.IsDependencyLoaded) {
                            if (boldBIObj.embedOptions.environment == BoldBI.Environment.Cloud) {
                                if (boldBIObj._isEmptyOrSpaces(boldBIObj.cdnLink) || boldBIObj._isEmptyOrSpaces(boldBIObj.designerRootUrl)) {
                                    boldBIObj._getCloudLinks();
                                }
                            }
                            else {
                                boldBIObj._addJquerydependentFiles();
                            }
                        }
                    }
                    else {
                        boldBIObj.invalidDetail = true;
                        const retObj = Object.assign(boldBIObj);
                        return retObj;
                    }
                }
                catch (ex) {
                    if (ex.message == 'Cannot read property append of null') {
                        alert('Invalid Embed Container Id');
                        return false;
                    }
                    else {
                        boldBIObj._throwError(ex.message, boldBIObj.embedOptions.embedContainerId);
                        boldBIObj.invalidDetail = true;
                        const retObj = Object.assign(boldBIObj);
                        return retObj;
                    }
                }
            }
            else {
                boldBIObj._throwError('Invalid EmbedType', boldBIObj.embedOptions.embedContainerId);
                boldBIObj.invalidDetail = true;
                const retObj = Object.assign(boldBIObj);
                return retObj;
            }
            if (boldBIObj.embedOptions.widgetList == '') {
                const ele = document.getElementById(boldBIObj.embedOptions.embedContainerId);
                if (this._hasinstance(ele, 'embeddedBoldBI')) {
                    this._removeinstance(ele, 'embeddedBoldBI');
                }
            }
            //const retObj:any = Object.assign({}, boldBIObj)
            // eslint-disable-next-line
            const retObj = Object.assign(boldBIObj);
            if (boldBIObj.embedOptions.widgetList == '') {
                const ele = document.getElementById(boldBIObj.embedOptions.embedContainerId);
                this._putinstance(ele, 'embeddedBoldBI', retObj);
            }
            return retObj;
        }
        boldBIObj._initializeEmbedOptions(options);
        boldBIObj.invalidDetail = true;
        const retObj = Object.assign(boldBIObj);
        return retObj;
    }
    static getInstance(eleID) {
        BoldBI._widgetsCollection = [];
        return this._gettinstance(document.getElementById(eleID), 'embeddedBoldBI');
    }
    // eslint-disable-next-line
    Invoke(originalMethod) {
        const that = this;
        // eslint-disable-next-line
        return function (...args) {
            try {
                return originalMethod.apply(this, args);
            }
            catch (error) {
                that._throwError(error, this.embedOptions.embedContainer);
            }
        }.bind(this);
    }
    destroy() {
        const that = this;
        if (this.isMultiTab) {
            const dashboardContainer = bbEmbed('#' + this.embedOptions.embedContainerId).find('.e-content .bbembed-multitab-dbrd');
            for (let i = 0; i < dashboardContainer.length; i++) {
                const embedId = bbEmbed(dashboardContainer[`${i}`]).attr('id');
                const existingDashboardInstance = this._getDashboardInstance(embedId);
                if (existingDashboardInstance != undefined) {
                    existingDashboardInstance.destroy();
                }
            }
            BoldBI._removeinstance(document.getElementById(this.embedOptions.embedContainerId), 'embeddedBoldBI');
            document.getElementById(this.embedOptions.embedContainerId).innerHTML = '';
        }
        else if (bbEmbed('.pinBoardDbrd').length > 0) {
            bbEmbed('.pinBoardDbrd').each(function () {
                const existingDashboardInstance = that._getDashboardInstance(this.id);
                if (existingDashboardInstance != undefined) {
                    existingDashboardInstance.destroy();
                }
            });
            BoldBI._removeinstance(document.getElementById(this.embedOptions.embedContainerId), 'embeddedBoldBI');
            document.getElementById(this.embedOptions.embedContainerId).innerHTML = '';
        }
        else {
            const embedContainerId = this.embedOptions.embedContainerId;
            const existingDashboardInstance = this._getDashboardInstance();
            if (existingDashboardInstance != undefined) {
                existingDashboardInstance.destroy();
            }
            BoldBI._removeinstance(document.getElementById(embedContainerId), 'embeddedBoldBI');
            document.getElementById(embedContainerId).innerHTML = '';
        }
        if (this.embedOptions.isRemoveStyle == true) {
            document.querySelectorAll('link').forEach(function (node) {
                that.cssFiles.forEach(function (file) {
                    if (node.href.toLowerCase().indexOf(file.toLowerCase()) != -1) {
                        node.parentNode.removeChild(node);
                    }
                });
            });
        }
    }
    loadDashboardView() {
        throw new Error('loadDashboardView not implemented');
    }
    /**
     * @param {object} exportInformation - It is an object that holds "dashboardId" - Define the unique id of the dashboard if it is present within the multitab dashboard, "fileName" - Define the name of the file to be exported, "pageSize" - Define the size of the page('A3','A4','A5','Letter'), "pageOrientation" - Define the page orientation('Landscape','Portrait'), "showAppliedFilters" - Define whether we need to export the dashboard with or without a filter.
     * @param {string} exportInformation.dashboardId - Define the unique id of the dashboard if it is present within the multitab dashboard
     * @param {string} exportInformation.fileName - Define the name of the file to be exported
     * @param {string} exportInformation.pageSize - Define the size of the page('A3','A4','A5','Letter').
     * @param {string} exportInformation.pageOrientation - Define the page orientation('Landscape','Portrait').
     * @param {boolean} exportInformation.showAppliedFilters - Define whether we need to export the dashboard with or without a filter.
     */
    exportDashboardAsPdf(exportInformation) {
        if (this.isMultiTab) {
            let dashboardId = exportInformation.dashboardId;
            dashboardId = dashboardId.replaceAll('-', '');
            const MultitabDashboardId = 'multi_' + dashboardId + '_embeddedbi';
            const dbrdInstance = this._getDashboardInstance(MultitabDashboardId);
            if (dbrdInstance != undefined) {
                dbrdInstance.exportAsPdf(exportInformation.fileName, exportInformation.pageSize, exportInformation.pageOrientation, exportInformation.showAppliedFilters);
            }
        }
        else {
            const dbrdInstance = this._getDashboardInstance();
            if (dbrdInstance != undefined) {
                if (exportInformation) {
                    dbrdInstance.exportAsPdf(exportInformation.fileName, exportInformation.pageSize, exportInformation.pageOrientation, exportInformation.showAppliedFilters);
                }
                else {
                    dbrdInstance.exportAsPdf();
                }
            }
        }
    }
    /**
     * @param {object} exportInformation -It is an object that holds "dashboardId" - Define the unique id of the dashboard if it is present within the multitab dashboard, "fileName" - Define the name of the file to be exported, "exportImageFormat" - Define the format of the image to be exported('jpg','png'and'bmp'), "resolutionDpi" - Define the resolution of the image (Integer value above 96),"showAppliedFilters" - Define whether we need to export the dashboard with or without a filter
     * @param {string} exportInformation.dashboardId - Define the unique id of the dashboard if it is present within the multitab dashboard
     * @param {string} exportInformation.fileName - Define the name of the file to be exported
     * @param {string} exportInformation.exportImageFormat - Define the format of the image to be exported('jpg','png'and'bmp').
     * @param {number} exportInformation.resolutionDpi - Define the resolution of the image (Integer value above 96).
     * @param {boolean} exportInformation.showAppliedFilters - Define whether we need to export the dashboard with or without a filter
     */
    exportDashboardAsImage(exportInformation) {
        if (parseInt(exportInformation.resolutionDpi, 10) > 300) {
            exportInformation.resolutionDpi = '300';
        }
        if (this.isMultiTab) {
            let dashboardId = exportInformation.dashboardId;
            dashboardId = dashboardId.replaceAll('-', '');
            const MultitabDashboardId = 'multi_' + dashboardId + '_embeddedbi';
            const dbrdInstance = this._getDashboardInstance(MultitabDashboardId);
            if (dbrdInstance != undefined) {
                dbrdInstance.exportAsImage(exportInformation.fileName, exportInformation.exportImageFormat, exportInformation.resolutionDpi, exportInformation.showAppliedFilters);
            }
        }
        else {
            const dbrdInstance = this._getDashboardInstance();
            if (dbrdInstance != undefined) {
                if (exportInformation) {
                    dbrdInstance.exportAsImage(exportInformation.fileName, exportInformation.exportImageFormat, exportInformation.resolutionDpi, exportInformation.showAppliedFilters);
                }
                else {
                    dbrdInstance.exportAsImage();
                }
            }
        }
    }
    /**
     * @param {object} exportInformation - It is an object that holds "dashboardId" - Define the unique id of the dashboard if it is present within the multitab dashboard, "fileName" - Define the name of the file to be exported, "fileType" - Define the type of file to be exported ('xlsx','xls').
     * @param {string} exportInformation.dashboardId - Define the unique id of the dashboard if it is present within the multitab dashboard
     * @param {string} exportInformation.fileName - Define the name of the file to be exported
     * @param {string} exportInformation.fileType - Define the type of file to be exported ('xlsx','xls').
     */
    exportDashboardAsExcel(exportInformation) {
        if (this.isMultiTab) {
            let dashboardId = exportInformation.dashboardId;
            dashboardId = dashboardId.replaceAll('-', '');
            const MultitabDashboardId = 'multi_' + dashboardId + '_embeddedbi';
            const dbrdInstance = this._getDashboardInstance(MultitabDashboardId);
            if (dbrdInstance != undefined) {
                dbrdInstance.exportAsExcel(exportInformation.fileName, exportInformation.fileType);
            }
        }
        else {
            const dbrdInstance = this._getDashboardInstance();
            if (dbrdInstance != undefined) {
                if (exportInformation) {
                    dbrdInstance.exportAsExcel(exportInformation.fileName, exportInformation.fileType);
                }
                else {
                    dbrdInstance.exportAsExcel();
                }
            }
        }
    }
    /**
     * @param {object} exportInformation - It is an object that holds "dashboardId" - Define the unique id of the dashboard if it is present within the multitab dashboard or widget id present in the pinboard, "widgetName" - Define the name of the widget to be exported, "fileName" - Define the name of the file to be exported, "pageSize" - Define the size of the page('A3','A4','A5','Letter'), "pageOrientation" - Define the page orientation('Landscape','Portrait'), "showAppliedFilters" - Define whether we need to export the dashboard with or without a filter.
     * @param {string} exportInformation.dashboardId - Define the unique id of the dashboard if it is present within the multitab dashboard or widget id present in the pinboard
     * @param {string} exportInformation.widgetName - Define the name of the widget to be exported
     * @param {string} exportInformation.fileName - Define the name of the file to be exported
     * @param {string} exportInformation.pageSize - Define the size of the page('A3','A4','A5','Letter').
     * @param {string} exportInformation.pageOrientation - Define the page orientation('Landscape','Portrait').
     * @param {boolean} exportInformation.showAppliedFilters - Define whether we need to export the dashboard with or without a filter.
     */
    exportWidgetAsPdf(exportInformation) {
        const that = this;
        if (this.isMultiTab) {
            let dashboardId = exportInformation.dashboardId;
            dashboardId = dashboardId.replaceAll('-', '');
            const MultitabDashboardId = 'multi_' + dashboardId + '_embeddedbi';
            const dbrdInstance = this._getDashboardInstance(MultitabDashboardId);
            if (dbrdInstance != undefined) {
                dbrdInstance.exportWidgetAsPdf(exportInformation.widgetName, exportInformation.fileName, exportInformation.pageSize, exportInformation.pageOrientation, exportInformation.showAppliedFilters);
            }
        }
        else if (bbEmbed('.pinBoardDbrd').length > 0) {
            const length = bbEmbed('.pinBoardDbrd').length;
            for (let i = 0; i < length; i++) {
                if (that.pinboardIds[`${i}`].widgetId == exportInformation.dashboardId) {
                    const pinboardId = that.pinboardIds[`${i}`].pinboardContainerId;
                    const dbrdInstance = that._getDashboardInstance(pinboardId + '_embeddedbi');
                    if (dbrdInstance != undefined) {
                        dbrdInstance.exportWidgetAsPdf(exportInformation.widgetName, exportInformation.fileName, exportInformation.pageSize, exportInformation.pageOrientation, exportInformation.showAppliedFilters);
                    }
                }
            }
        }
        else {
            const dbrdInstance = this._getDashboardInstance();
            if (dbrdInstance != undefined) {
                dbrdInstance.exportWidgetAsPdf(exportInformation.widgetName, exportInformation.fileName, exportInformation.pageSize, exportInformation.pageOrientation, exportInformation.showAppliedFilters);
            }
        }
    }
    /**
     * @param {object} exportInformation - It is an object that holds "dashboardId" - Define the unique id of the dashboard if it is present within the multitab dashboard or widget id present in the pinboard, "widgetName" - Define the name of the widget to be exported, "fileName" - Define the name of the file to be exported, "exportImageFormat" - Define the format of the image to be exported('jpg','png'and'bmp'), "resolutionDpi" - Define the resolution of the image (Integer value above 96), "showAppliedFilters" - Define whether we need to export the dashboard with or without a filter.
     * @param {string} exportInformation.dashboardId - Define the unique id of the dashboard if it is present within the multitab dashboard or widget id present in the pinboard
     * @param {string} exportInformation.widgetName - Define the name of the widget to be exported
     * @param {string} exportInformation.fileName - Define the name of the file to be exported
     * @param {string} exportInformation.exportImageFormat - Define the format of the image to be exported('jpg','png'and'bmp').
     * @param {number} exportInformation.resolutionDpi - Define the resolution of the image (Integer value above 96).
     * @param {boolean} exportInformation.showAppliedFilters - Define whether we need to export the dashboard with or without a filter.
     */
    exportWidgetAsImage(exportInformation) {
        const that = this;
        if (parseInt(exportInformation.resolutionDpi, 10) > 300) {
            exportInformation.resolutionDpi = '300';
        }
        if (this.isMultiTab) {
            let dashboardId = exportInformation.dashboardId;
            dashboardId = dashboardId.replaceAll('-', '');
            const MultitabDashboardId = 'multi_' + dashboardId + '_embeddedbi';
            const dbrdInstance = this._getDashboardInstance(MultitabDashboardId);
            if (dbrdInstance != undefined) {
                dbrdInstance.exportWidgetAsImage(exportInformation.widgetName, exportInformation.fileName, exportInformation.exportImageFormat, exportInformation.resolutionDpi, exportInformation.showAppliedFilters);
            }
        }
        else if (bbEmbed('.pinBoardDbrd').length > 0) {
            const length = bbEmbed('.pinBoardDbrd').length;
            for (let i = 0; i < length; i++) {
                if (that.pinboardIds[`${i}`].widgetId == exportInformation.dashboardId) {
                    const pinboardId = that.pinboardIds[`${i}`].pinboardContainerId;
                    const dbrdInstance = that._getDashboardInstance(pinboardId + '_embeddedbi');
                    if (dbrdInstance != undefined) {
                        dbrdInstance.exportWidgetAsImage(exportInformation.widgetName, exportInformation.fileName, exportInformation.exportImageFormat, exportInformation.resolutionDpi, exportInformation.showAppliedFilters);
                    }
                }
            }
        }
        else {
            const dbrdInstance = this._getDashboardInstance();
            if (dbrdInstance != undefined) {
                dbrdInstance.exportWidgetAsImage(exportInformation.widgetName, exportInformation.fileName, exportInformation.exportImageFormat, exportInformation.resolutionDpi, exportInformation.showAppliedFilters);
            }
        }
    }
    /**
     * @param {object} exportInformation - It is an object that holds "dashboardId" - Define the unique id of the dashboard if it is present within the multitab dashboard or widget id present in the pinboard, "widgetName" - Define the name of the widget to be exported, "fileName" - Define the name of the file to be exported, "fileType" - Define the type of file to be exported ('xlsx','xls').
     * @param {string} exportInformation.dashboardId - Define the unique id of the dashboard if it is present within the multitab dashboard or widget id present in the pinboard
     * @param {string} exportInformation.widgetName - Define the name of the widget to be exported
     * @param {string} exportInformation.fileName - Define the name of the file to be exported
     * @param {string} exportInformation.fileType - Define the type of file to be exported ('xlsx','xls').
     */
    exportWidgetAsExcel(exportInformation) {
        const that = this;
        if (this.isMultiTab) {
            let dashboardId = exportInformation.dashboardId;
            dashboardId = dashboardId.replaceAll('-', '');
            const MultitabDashboardId = 'multi_' + dashboardId + '_embeddedbi';
            const dbrdInstance = this._getDashboardInstance(MultitabDashboardId);
            if (dbrdInstance != undefined) {
                dbrdInstance.exportWidgetAsExcel(exportInformation.widgetName, exportInformation.fileName, exportInformation.fileType);
            }
        }
        else if (bbEmbed('.pinBoardDbrd').length > 0) {
            const length = bbEmbed('.pinBoardDbrd').length;
            for (let i = 0; i < length; i++) {
                if (that.pinboardIds[`${i}`].widgetId == exportInformation.dashboardId) {
                    const pinboardId = that.pinboardIds[`${i}`].pinboardContainerId;
                    const dbrdInstance = that._getDashboardInstance(pinboardId + '_embeddedbi');
                    if (dbrdInstance != undefined) {
                        dbrdInstance.exportWidgetAsExcel(exportInformation.widgetName, exportInformation.fileName, exportInformation.fileType);
                    }
                }
            }
        }
        else {
            const dbrdInstance = this._getDashboardInstance();
            if (dbrdInstance != undefined) {
                dbrdInstance.exportWidgetAsExcel(exportInformation.widgetName, exportInformation.fileName, exportInformation.fileType);
            }
        }
    }
    /**
     * @param {object} exportInformation - It is an object that holds "dashboardId" - Define the unique id of the dashboard if it is present within the multitab dashboard or widget id present in the pinboard, "widgetName" - Define the name of the widget to be exported, "fileName" - Define the name of the file to be exported.
     * @param {string} exportInformation.dashboardId - Define the unique id of the dashboard if it is present within the multitab dashboard or widget id present in the pinboard
     * @param {string} exportInformation.widgetName - Define the name of the widget to be exported
     * @param {string} exportInformation.fileName - Define the name of the file to be exported
     */
    exportWidgetAsCsv(exportInformation) {
        const that = this;
        if (this.isMultiTab) {
            let dashboardId = exportInformation.dashboardId;
            dashboardId = dashboardId.replaceAll('-', '');
            const MultitabDashboardId = 'multi_' + dashboardId + '_embeddedbi';
            const dbrdInstance = this._getDashboardInstance(MultitabDashboardId);
            if (dbrdInstance != undefined) {
                dbrdInstance.exportWidgetAsCsv(exportInformation.widgetName, exportInformation.fileName);
            }
        }
        else if (bbEmbed('.pinBoardDbrd').length > 0) {
            const length = bbEmbed('.pinBoardDbrd').length;
            for (let i = 0; i < length; i++) {
                if (that.pinboardIds[`${i}`].widgetId == exportInformation.dashboardId) {
                    const pinboardId = that.pinboardIds[`${i}`].pinboardContainerId;
                    const dbrdInstance = that._getDashboardInstance(pinboardId + '_embeddedbi');
                    if (dbrdInstance != undefined) {
                        dbrdInstance.exportWidgetAsCsv(exportInformation.widgetName, exportInformation.fileName);
                    }
                }
            }
        }
        else {
            const dbrdInstance = this._getDashboardInstance();
            if (dbrdInstance != undefined) {
                dbrdInstance.exportWidgetAsCsv(exportInformation.widgetName, exportInformation.fileName);
            }
        }
    }
    updateDatasource() {
        const dbrdInstance = this._getDashboardInstance();
        if (dbrdInstance != undefined) {
            dbrdInstance.modules.queryDesigner.saveQueryInfo();
        }
    }
    updateFilters(filterParameters) {
        const that = this;
        if (this.isMultiTab) {
            window['multiTabFilterParameter'] = filterParameters;
            const dashboardContainer = bbEmbed('#' + this.embedOptions.embedContainerId).find('.e-content .bbembed-multitab-dbrd');
            for (let i = 0; i < dashboardContainer.length; i++) {
                const embedId = bbEmbed(dashboardContainer[`${i}`]).attr('id');
                const existingDashboardInstance = this._getDashboardInstance(embedId);
                if (existingDashboardInstance != undefined) {
                    existingDashboardInstance.option('filterParameters', filterParameters);
                }
            }
        }
        else if (bbEmbed('.pinBoardDbrd').length > 0) {
            bbEmbed('.pinBoardDbrd').each(function () {
                const existingDashboardInstance = that._getDashboardInstance(this.id);
                if (existingDashboardInstance != undefined) {
                    existingDashboardInstance.option('filterParameters', filterParameters);
                }
            });
        }
        else {
            const existingDashboardInstance = this._getDashboardInstance();
            if (existingDashboardInstance != undefined) {
                existingDashboardInstance.option('filterParameters', filterParameters);
            }
        }
    }
    resizeDashboard(filterParameters) {
        const that = this;
        if (this.isMultiTab) {
            bbEmbed('#' + that.embedOptions.embedContainerId + '_multi_tab_dashboard').css('width', bbEmbed('#' + that.embedOptions.embedContainerId).width());
            window['multiTabFilterParameter'] = filterParameters;
            const dashboardContainer = bbEmbed('#' + this.embedOptions.embedContainerId).find('.e-content .bbembed-multitab-dbrd');
            for (let i = 0; i < dashboardContainer.length; i++) {
                const embedId = bbEmbed(dashboardContainer[`${i}`]).attr('id');
                const existingDashboardInstance = this._getDashboardInstance(embedId);
                if (existingDashboardInstance != undefined) {
                    const clientFnc = window[that.embedOptions.onResize];
                    if (clientFnc instanceof Function) {
                        clientFnc.call(this, existingDashboardInstance);
                    }
                    if (this.embedOptions.onResize instanceof Function) {
                        this.embedOptions.onResize.call(this, existingDashboardInstance);
                    }
                    existingDashboardInstance.resizeDashboard();
                }
            }
            this._tabSelected();
        }
        else if (bbEmbed('.pinBoardDbrd').length > 0) {
            bbEmbed('.pinBoardDbrd').each(function () {
                const existingDashboardInstance = that._getDashboardInstance(this.id);
                if (existingDashboardInstance != undefined) {
                    const clientFnc = window[that.embedOptions.onResize];
                    if (clientFnc instanceof Function) {
                        clientFnc.call(that, existingDashboardInstance);
                    }
                    if (that.embedOptions.onResize instanceof Function) {
                        that.embedOptions.onResize.call(that, existingDashboardInstance);
                    }
                    existingDashboardInstance.resizeDashboard();
                }
            });
        }
        else {
            const existingDashboardInstance = this._getDashboardInstance();
            if (existingDashboardInstance != undefined) {
                const clientFnc = window[that.embedOptions.onResize];
                if (clientFnc instanceof Function) {
                    clientFnc.call(this, existingDashboardInstance);
                }
                if (this.embedOptions.onResize instanceof Function) {
                    this.embedOptions.onResize.call(this, existingDashboardInstance);
                }
                existingDashboardInstance.resizeDashboard();
            }
        }
    }
    refreshDashboard() {
        const that = this;
        if (this.isMultiTab) {
            const dashboardContainer = bbEmbed('#' + this.embedOptions.embedContainerId).find('.e-content .bbembed-multitab-dbrd');
            for (let i = 0; i < dashboardContainer.length; i++) {
                const embedId = bbEmbed(dashboardContainer[`${i}`]).attr('id');
                const existingDashboardInstance = this._getDashboardInstance(embedId);
                if (existingDashboardInstance != undefined) {
                    existingDashboardInstance.updateDashboard();
                }
            }
        }
        else if (bbEmbed('.pinBoardDbrd').length > 0) {
            bbEmbed('.pinBoardDbrd').each(function () {
                const existingDashboardInstance = that._getDashboardInstance(this.id);
                if (existingDashboardInstance != undefined) {
                    existingDashboardInstance.updateDashboard();
                }
            });
        }
        else {
            const existingDashboardInstance = this._getDashboardInstance();
            if (existingDashboardInstance != undefined) {
                existingDashboardInstance.updateDashboard();
            }
        }
    }
    hidePopup() {
        if (this.isMultiTab) {
            const dashboardContainer = bbEmbed('#' + this.embedOptions.embedContainerId).find('.e-content .bbembed-multitab-dbrd');
            for (let i = 0; i < dashboardContainer.length; i++) {
                const embedId = bbEmbed(dashboardContainer[`${i}`]).attr('id');
                const existingDashboardInstance = this._getDashboardInstance(embedId);
                if (existingDashboardInstance != undefined) {
                    existingDashboardInstance.hideAllPopupsForDashboard();
                }
            }
        }
        else {
            const dbrdInstance = this._getDashboardInstance();
            if (dbrdInstance != undefined) {
                dbrdInstance.hideAllPopupsForDashboard();
            }
        }
    }
    hideWaitingIndicator() {
        if (this.isMultiTab) {
            const dashboardContainer = bbEmbed('#' + this.embedOptions.embedContainerId).find('.e-content .bbembed-multitab-dbrd');
            for (let i = 0; i < dashboardContainer.length; i++) {
                const embedId = bbEmbed(dashboardContainer[`${i}`]).attr('id');
                const waitingPopupInstance = bbEmbed('#' + embedId + '_designAreaContainer').data('BoldBIDashboardWaitingPopup');
                if (waitingPopupInstance !== null && waitingPopupInstance !== undefined) {
                    waitingPopupInstance.destroy();
                }
            }
        }
        else {
            const waitingPopupInstance = bbEmbed('.bbi-dashboarddesigner-designAreaContainer').data('BoldBIDashboardWaitingPopup');
            if (waitingPopupInstance !== null && waitingPopupInstance !== undefined) {
                waitingPopupInstance.destroy();
            }
        }
    }
    getWidgetData(widgetName, clientFnc, dashboardId) {
        let widgetValue;
        if (this.isMultiTab) {
            const dashboardContainer = bbEmbed('#' + this.embedOptions.embedContainerId).find('.e-content .bbembed-multitab-dbrd');
            for (let i = 0; i < dashboardContainer.length; i++) {
                if (bbEmbed(dashboardContainer[`${i}`]).attr('id').includes(dashboardId.toString().replaceAll('-', '')) > 0) {
                    const embedId = bbEmbed(dashboardContainer[`${i}`]).attr('id');
                    const dbrdInstance = this._getDashboardInstance(embedId);
                    if (dbrdInstance != undefined) {
                        widgetValue = dbrdInstance.getWidgetData(widgetName, clientFnc);
                        if (widgetValue.toLowerCase().includes('widget') > 0) {
                            if (window[`${clientFnc}`] instanceof Function) {
                                window[`${clientFnc}`].call(this, widgetValue);
                            }
                            else {
                                clientFnc.call(this, widgetValue);
                            }
                        }
                    }
                    break;
                }
            }
        }
        else {
            const dbrdInstance = this._getDashboardInstance();
            if (dbrdInstance != undefined) {
                widgetValue = dbrdInstance.getWidgetData(widgetName, clientFnc);
                if (widgetValue.toLowerCase().includes('widget') > 0) {
                    if (window[`${clientFnc}`] instanceof Function) {
                        window[`${clientFnc}`].call(this, widgetValue);
                    }
                    else {
                        clientFnc.call(this, widgetValue);
                    }
                }
            }
        }
    }
    getWidgetDataWithFilters(widgetName, dashboardId, filter, clientFnc) {
        let responseData;
        const data = JSON.stringify({
            'dashboardId': dashboardId, 'widgetName': widgetName, 'filter': filter
        });
        if (this._isEmptyOrSpaces(dashboardId)) {
            responseData = {
                'status': false, 'message': 'dashboardId is invalid', 'request': data
            };
            return responseData;
        }
        if (this._isEmptyOrSpaces(widgetName)) {
            responseData = {
                'status': false, 'message': 'widgetName is invalid', 'request': data
            };
            return responseData;
        }
        const thatIns = this;
        bbEmbed.ajax({
            type: 'POST',
            url: this.designerRootUrl + '/v1.0/design/loadwidgetdata',
            data: data,
            contentType: 'application/json; charset=utf-8',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'bearer ' + thatIns.accessToken);
                xhr.setRequestHeader('Caller', thatIns.dashboardServerApiUrl);
            },
            success: function (result) {
                if (result.Status) {
                    responseData = {
                        'status': result.Status, 'data': result.Data, 'message': result.Message, 'request': data
                    };
                }
                else {
                    responseData = {
                        'status': result.Status, 'message': result.Message, 'request': data
                    };
                }
                clientFnc.call(thatIns, responseData);
            },
            error: function (request, message) {
                responseData = {
                    'status': false, 'message': message, 'request': request
                };
                clientFnc.call(thatIns, responseData);
            }
        });
        responseData = {
            'status': true, 'message': 'Data fetching initiated.', 'request': data
        };
        return responseData;
    }
    /**
     * @param {string} clientFnc - It denotes the method name to be defined
     * @param {string} containerId - This should be the container id where you want to embed the dashboard
     */
    getDashboardCategories(clientFnc, containerId) {
        const dbrdInstance = (this._isNullOrUndefined(containerId) || this._isEmptyOrSpaces(containerId)) ? this._getDashboardInstance() : this._getDashboardInstance(containerId + '_embeddedbi');
        if (dbrdInstance != undefined) {
            const widgetValue = dbrdInstance.GetDashboardCategories(clientFnc);
            if (window[`${clientFnc}`] instanceof Function) {
                window[`${clientFnc}`].call(this, widgetValue);
            }
            else {
                clientFnc.call(this, widgetValue);
            }
        }
    }
    /**
     * @param {string} categoryName - Define new category name want to create .
     * @param {string} categoryDescription - Define the description of new category name .
     * @param {string} clientFnc - It denotes the method name to be defined
     * @param {string} containerId - This should be the container id where you want to embed the dashboard
     */
    createDashboardCategory(categoryName, categoryDescription, clientFnc, containerId) {
        const dbrdInstance = (this._isNullOrUndefined(containerId) || this._isEmptyOrSpaces(containerId)) ? this._getDashboardInstance() : this._getDashboardInstance(containerId + '_embeddedbi');
        if (dbrdInstance != undefined) {
            const widgetValue = dbrdInstance.CreateDashboardCategory(categoryName, categoryDescription, clientFnc);
            if (window[`${clientFnc}`] instanceof Function) {
                window[`${clientFnc}`].call(this, widgetValue);
            }
            else {
                clientFnc.call(this, widgetValue);
            }
        }
    }
    /**
     * @param {string} publishModel - Define the information about publish dashboard
     * @param {string} containerId - This should be the container id where you want to embed the dashboard
     */
    saveDashboard(publishModel, containerId) {
        const dbrdInstance = (this._isNullOrUndefined(containerId) || this._isEmptyOrSpaces(containerId)) ? this._getDashboardInstance() : this._getDashboardInstance(containerId + '_embeddedbi');
        if (dbrdInstance != undefined) {
            dbrdInstance.model.serverSettings.enableMarkAsPublic = publishModel.IsPublic ? publishModel.IsPublic : false;
            dbrdInstance.saveDashboardToServer(publishModel);
        }
    }
    getWidgetInstance(eleID) {
        const widgetBIObjvalue = new widgetBI();
        widgetBIObjvalue.containerID = this.embedOptions.embedContainerId;
        this._widgetsCollection[this._widgetsCollection.length] = eleID;
        const returnValue = Object.assign(widgetBIObjvalue);
        widgetBIObjvalue.widgetCollection = this._widgetsCollection;
        if (!BoldBI._hasinstance(document.getElementById(this.embedOptions.embedContainerId), 'embeddedBoldBIWidget_' + eleID)) {
            BoldBI._putinstance(document.getElementById(this.embedOptions.embedContainerId), 'embeddedBoldBIWidget_' + eleID, returnValue);
        }
        return returnValue;
    }
    /**
     * @param {string} containerId - This should be the container id where you want to embed the dashboard
     */
    updateWidgetFilters(containerId) {
        const that = this;
        const filters = this._getWidgetFilterInfo();
        if (this.isMultiTab) {
            const dashboardContainer = bbEmbed('#' + this.embedOptions.embedContainerId).find('.e-content .bbembed-multitab-dbrd');
            for (let i = 0; i < dashboardContainer.length; i++) {
                const embedId = bbEmbed(dashboardContainer[`${i}`]).attr('id');
                const existingDashboardInstance = this._getDashboardInstance(embedId);
                if (existingDashboardInstance != undefined) {
                    existingDashboardInstance.option('widgets', filters);
                }
            }
        }
        else if (bbEmbed('.pinBoardDbrd').length > 0) {
            bbEmbed('.pinBoardDbrd').each(function () {
                const existingDashboardInstance = that._getDashboardInstance(this.id);
                if (existingDashboardInstance != undefined) {
                    existingDashboardInstance.option('widgets', filters);
                }
            });
        }
        else {
            const dbrdInstance = (this._isNullOrUndefined(containerId) || this._isEmptyOrSpaces(containerId)) ? this._getDashboardInstance() : this._getDashboardInstance(containerId + '_embeddedbi');
            if (dbrdInstance != undefined) {
                dbrdInstance.option('widgets', filters);
            }
        }
    }
    // Internal functions. Will not be accessible outside of this scope.
    _initializeEmbedOptions(options) {
        this.embedOptions = Object.assign(this.embedOptions, options);
    }
    _loadCloudDepedentFiles(responseInfo) {
        const responseData = responseInfo.Data;
        this.cdnLink = responseData.CdnUrl;
        this.designerRootUrl = responseData.DesignerServerUrl;
        this._addJquerydependentFiles();
    }
    _handleEnvironmentError(arg) {
        if (arg.type == 'error') {
            this._throwError('Server not found. If you are using Cloud BI Server, please ensure that the Environment member is set on the client side.');
            this.invalidDetail = true;
        }
    }
    _getCloudLinks() {
        this._xhrRequestHelper('Get', this.dashboardServerApiUrl + '/system-settings/get-url', {}, {}, this._loadCloudDepedentFiles);
    }
    _loadDepedentFiles() {
        if (this.embedOptions.dashboardSettings.themeSettings && !this.embedOptions.dashboardSettings.themeSettings.isLocalTheme && this.embedOptions.dashboardSettings.themeSettings.dashboard) {
            this._addedDependentFiles(this, this.dashboardThemeCssFiles, true);
        }
        else if (this.embedOptions.dashboardSettings.themeSettings && !this.embedOptions.dashboardSettings.themeSettings.isLocalTheme) {
            this._addedDependentFiles(this, this.applicationThemeCssFiles, true);
        }
        else if (!this.embedOptions.dashboardSettings.themeSettings) {
            this._addedDependentFiles(this, this.applicationThemeCssFiles, true);
        }
        if (this.embedOptions.mode == BoldBI.Mode.Design || this.embedOptions.mode == BoldBI.Mode.DataSource || this.embedOptions.mode == BoldBI.Mode.Connection) {
            this._addedDependentFiles(this, this.designerScriptFiles, false);
        }
        else {
            this._addedDependentFiles(this, this.viewerScriptFiles, false);
        }
        if (!this._isNullOrUndefined(this.embedOptions.dashboardSettings.fontFamily) && !this._isEmptyOrSpaces(this.embedOptions.dashboardSettings.fontFamily)) {
            this._addedDependentFiles(this, this.fontFamilyCssFiles, true);
        }
        if (this.embedOptions.pinboardName != '') {
            this._addedDependentFiles(this, this.pinBoardScriptFiles, false);
        }
        this._addedDependentFiles(this, this.cssFiles, true);
        if (this.embedOptions.pinboardName != '') {
            this._addedDependentFiles(this, this.pinboardCssFiles, true);
        }
        if (this.embedOptions.mode == BoldBI.Mode.Design || this.embedOptions.mode == BoldBI.Mode.DataSource || this.embedOptions.mode == BoldBI.Mode.Connection) {
            this._addedDependentFiles(this, this.designerCssFiles, true);
        }
        if (this.embedOptions.isBingMapRequired) {
            this._loadBingmapDependentFiles();
        }
        this._loadDependentDesignerFiles(this);
    }
    _loadBingmapDependentFiles() {
        const scriptTag = '<script type="text/javascript" src="https://www.bing.com/api/maps/mapcontrol" async></script>';
        bbEmbed(scriptTag).appendTo('head');
    }
    _loadDependentDesignerFiles(that) {
        if (window.BoldBIDashboard instanceof Object &&
            window.BoldBIDashboard.createObject instanceof Function &&
            window.Designer instanceof Object) {
            that._addedDependentFiles(that, that.ejViewerDependentFiles, false);
            if (that.embedOptions.mode == BoldBI.Mode.Design || that.embedOptions.mode == BoldBI.Mode.DataSource || that.embedOptions.mode == BoldBI.Mode.Connection) {
                that._addedDependentFiles(that, that.ejDesignerDependentFiles, false);
            }
        }
        else {
            setTimeout(that._loadDependentDesignerFiles, 50, that);
        }
    }
    _addWrapperDependentFiles(obj, fileUriArray) {
        const that = obj;
        fileUriArray.forEach(function (file) {
            if (!((file == 'jquery-ui.min.js' && window.jQuery.ui != undefined && window.jQuery.ui.version == '1.12.1') || (file == 'jsrender.min.js' && window.jQuery.views != undefined && window.jQuery.views.jsviews == 'v1.0.0-beta'))) {
                const scriptTag = document.createElement('script');
                if (this.embedOptions.nonce) {
                    scriptTag.nonce = this.embedOptions.nonce;
                }
                if (file == 'jquery.easing.1.3.min.js') {
                    scriptTag.src = (that.embedOptions.environment == BoldBI.Environment.Enterprise) ? that.rootUrl + '/cdn/scripts/designer/' + file : that.cdnLink + '/scripts/designer/' + file;
                }
                if (file == 'jquery-ui.min.js') {
                    scriptTag.src = (that.embedOptions.environment == BoldBI.Environment.Enterprise) ? that.rootUrl + '/cdn/scripts/' + file : that.cdnLink + '/scripts/' + file;
                }
                else if (file == 'jsrender.min.js') {
                    scriptTag.src = (that.embedOptions.environment == BoldBI.Environment.Enterprise) ? that.rootUrl + '/cdn/scripts/designer/' + file : that.cdnLink + '/scripts/designer/' + file;
                }
                document.head.appendChild(scriptTag);
                scriptTag.onerror = (arg) => this._handleEnvironmentError(arg);
            }
        }.bind(that));
    }
    _addedDependentFiles(that, fileUriArray, isCSS) {
        let fileUri = '';
        fileUriArray.forEach(function (file) {
            if (!that._checkDepedentFileExists(file, isCSS)) {
                if (isCSS) {
                    if (that.embedOptions.environment == BoldBI.Environment.Enterprise) {
                        if (file == 'font-server.min.css') {
                            fileUri = that.rootUrl + '/cdn/css/' + file;
                        }
                        else if (file == 'bootstrap.min.css') {
                            fileUri = that.rootUrl + '/Content/Styles/Bootstrap/' + file;
                        }
                        else if (file == 'pinboard-embed.min.css') {
                            fileUri = that.rootUrl + '/cdn/css/' + file;
                        }
                        else if (file == 'boldbi.theme.definition.min.css') {
                            if (that.embedOptions.dashboardSettings.themeSettings && !that.embedOptions.dashboardSettings.themeSettings.isLocalTheme && !that._isNullOrUndefined(that.embedOptions.dashboardSettings.themeSettings.appearance) && !that._isEmptyOrSpaces(that.embedOptions.dashboardSettings.themeSettings.appearance)) {
                                fileUri = that.rootUrl + '/cdn/css/designer/' + that.embedOptions.dashboardSettings.themeSettings.appearance + '/' + file;
                            }
                            else {
                                fileUri = that.rootUrl + '/cdn/css/designer/light/' + file;
                            }
                        }
                        else if (file == 'application.theme.css' || file == 'dashboard.theme.css') {
                            if (that.embedOptions.dashboardSettings.themeSettings && !that.embedOptions.dashboardSettings.themeSettings.isLocalTheme && !that._isNullOrUndefined(that.embedOptions.dashboardSettings.themeSettings.dashboard) && !that._isEmptyOrSpaces(that.embedOptions.dashboardSettings.themeSettings.dashboard)) {
                                fileUri = that.customThemeUrl + '/dashboard?theme=' + that.embedOptions.dashboardSettings.themeSettings.dashboard;
                            }
                            else if (that.embedOptions.dashboardSettings.themeSettings && !that.embedOptions.dashboardSettings.themeSettings.isLocalTheme && !that._isNullOrUndefined(that.embedOptions.dashboardSettings.themeSettings.application) && !that._isEmptyOrSpaces(that.embedOptions.dashboardSettings.themeSettings.application)) {
                                fileUri = that.customThemeUrl + '/application?theme=' + that.embedOptions.dashboardSettings.themeSettings.application;
                            }
                        }
                        else if (file == 'font-family.min.css') {
                            const fontFamilyUrl = this.rootUrl.replace(/\/bi(?!.*\/bi)/, '/ums/user-interface/fonts');
                            fileUri = fontFamilyUrl + '?family=' + that.embedOptions.dashboardSettings.fontFamily;
                        }
                        else {
                            fileUri = that.rootUrl + '/webdesignerservice/themes/' + file;
                        }
                    }
                    else {
                        if (file == 'font-server.min.css') {
                            fileUri = that.cdnLink + '/css/' + file;
                        }
                        else if (file == 'bootstrap.min.css') {
                            fileUri = that.cdnLink + '/css/' + file;
                        }
                        else if (file == 'pinboard-embed.min.css') {
                            fileUri = that.cdnLink + '/css/' + file;
                        }
                        else if (file == 'boldbi.theme.definition.min.css') {
                            if (that.embedOptions.dashboardSettings.themeSettings && !that.embedOptions.dashboardSettings.themeSettings.isLocalTheme && !that._isNullOrUndefined(that.embedOptions.dashboardSettings.themeSettings.appearance) && !that._isEmptyOrSpaces(that.embedOptions.dashboardSettings.themeSettings.appearance)) {
                                fileUri = that.cdnLink + '/css/designer/' + that.embedOptions.dashboardSettings.themeSettings.appearance + '/' + file;
                            }
                            else {
                                fileUri = that.cdnLink + '/css/designer/light/' + file;
                            }
                        }
                        else if (file == 'application.theme.css' || file == 'dashboard.theme.css') {
                            if (that.embedOptions.dashboardSettings.themeSettings && !that.embedOptions.dashboardSettings.themeSettings.isLocalTheme && !that._isNullOrUndefined(that.embedOptions.dashboardSettings.themeSettings.dashboard) && !that._isEmptyOrSpaces(that.embedOptions.dashboardSettings.themeSettings.dashboard)) {
                                fileUri = that.rootUrl + '/theme/styles/dashboard?theme=' + that.embedOptions.dashboardSettings.themeSettings.dashboard;
                            }
                            else if (that.embedOptions.dashboardSettings.themeSettings && !that.embedOptions.dashboardSettings.themeSettings.isLocalTheme && !that._isNullOrUndefined(that.embedOptions.dashboardSettings.themeSettings.application) && !that._isEmptyOrSpaces(that.embedOptions.dashboardSettings.themeSettings.application)) {
                                fileUri = that.rootUrl + '/theme/styles/application?theme=' + that.embedOptions.dashboardSettings.themeSettings.application;
                            }
                        }
                        else if (file == 'font-family.min.css') {
                            fileUri = that.rootUrl + '/user-interface/fonts?family=' + that.embedOptions.dashboardSettings.fontFamily;
                        }
                        else {
                            fileUri = that.cdnLink + '/css/designer/' + file;
                        }
                    }
                    const cssTag = document.createElement('link');
                    cssTag.rel = 'stylesheet';
                    cssTag.href = fileUri;
                    if (bbEmbed('link[href="' + fileUri + '"]').length < 1) {
                        document.head.appendChild(cssTag);
                    }
                }
                else {
                    if (that.embedOptions.environment == BoldBI.Environment.Enterprise) {
                        if (file == 'bootstrap.min.js') {
                            fileUri = that.rootUrl + '/cdn/scripts/' + file;
                        }
                        else if (file == 'designerlocalization.js') {
                            fileUri = that.rootUrl + '/designer/localization/' + file + '?c=' + that.embedOptions.localeSettings.appLocale;
                        }
                        else if (file == 'signalr.min.js') {
                            fileUri = that.rootUrl + '/cdn/scripts/signalr/' + file;
                        }
                        else {
                            fileUri = that.rootUrl + '/cdn/scripts/designer/' + file;
                        }
                    }
                    else {
                        if (file == 'bootstrap.min.js') {
                            fileUri = that.cdnLink + '/scripts/' + file;
                        }
                        else if (file == 'designerlocalization.js') {
                            fileUri = that.designerRootUrl + '/localization/' + file;
                        }
                        else if (file == 'signalr.min.js') {
                            fileUri = that.cdnLink + '/scripts/signalr/' + file;
                        }
                        else {
                            fileUri = that.cdnLink + '/scripts/designer/' + file;
                        }
                    }
                    const scriptTag = document.createElement('script');
                    scriptTag.type = 'text/javascript';
                    scriptTag.src = fileUri;
                    if (this.embedOptions.nonce) {
                        scriptTag.nonce = this.embedOptions.nonce;
                    }
                    if (bbEmbed('script[src= "' + fileUri + '"]').length < 1) {
                        document.head.appendChild(scriptTag);
                    }
                    scriptTag.onerror = (arg) => this._handleEnvironmentError(arg);
                }
            }
        }.bind(that));
    }
    _checkDepedentFileExists(file, isCSS) {
        let isFileExists = false;
        const selectItem = isCSS ? 'link' : 'script';
        const tagList = document.head.querySelectorAll(selectItem);
        tagList.forEach(function (tag) {
            if (!isFileExists) {
                if (isCSS) {
                    isFileExists = tag.href.indexOf(file) != -1;
                }
                else {
                    isFileExists = tag.src.indexOf(file) != -1;
                }
            }
        });
        return isFileExists;
    }
    _renderPinboard(itemDetail) {
        const widgetContainer = bbEmbed('<div id="server-app-container" style="background: #f9f9f9; overflow: hidden !important;min-height: 600px; width:' + this.embedOptions.width + ';"><div id="content-area" class="clearfix col-xs-12 e-waitingpopup e-js" style="padding: 0;padding-bottom: 30px"><div id="homepage-page-container"><div id="homepage-header" style="display:' + (this.embedOptions.pinboardSettings.enablePinboardHeader || this.embedOptions.pinboardSettings.enablePinboardHeader === undefined ? 'block' : 'none') + ';font-family:var(--font-family)"><div id="element-container"><div id="homepage-menu" style="margin-top: 5px"><span id="homepage-list-container" style="font-size: 15px;width: 165px;line-height: 18px;padding: 25px;">' + this.embedOptions.pinboardName + '</span></div><div id="options-container"><div id="pinboard-fullscreen" class="server-banner-icon e-dashboard-banner-icon bbi-dbrd-designer-hoverable su su-maximize-1 e-icon-dbrd-theme" data-tooltip="Fullscreen" data-name="fullscreen" data-event="true" style="font-size: 14px;display: block;float: left;margin: 8px 15px 0 7px; cursor: pointer"></div><div id="divider"></div><div id="layout-container"><div id="layout" class="dropdown-toggle" data-toggle="dropdown">Edit Layout</div><div class="dropdown-menu" id="layout-items" role="menu"><span class="su su-single-column" id="1"></span><span class="su su-two-column" id="11"></span><span class="su su-small-big-column" id="12"></span><span class="su su-big-small-column" id="21"></span><span class="su su-three-column" id="111"></span></div></div></div></div></div><div id="widget-container" data-homepage-id="" data-current-layout="" data-virtual-homepage="" style="margin-bottom: 30px"></div></div></div></div>');
        bbEmbed('#' + this.embedOptions.embedContainerId).append(widgetContainer);
        this._createPinboardDom(itemDetail);
        this._renderItem(itemDetail);
        this._removeElementsClass(this.embedOptions.embedContainerId, '.preloader-wrap', 'viewer-blue-loader');
        const that = this;
        bbEmbed(document).on('click', '.unpin-widget', function (e) {
            e.preventDefault();
            const unpinWidgetInstance = bbEmbed('#' + bbEmbed(e.target).parents('li').find('.pinWidget').attr('id') + '_embeddedbi').data('BoldBIDashboardDesigner');
            const clientFnc = window[that.embedOptions.onUnpin];
            if (clientFnc instanceof Function) {
                clientFnc.call(this, unpinWidgetInstance);
            }
            if (that.embedOptions.onUnpin instanceof Function) {
                that.embedOptions.onUnpin.call(that, unpinWidgetInstance);
            }
            that.column = parseInt(bbEmbed(this).closest('ul').attr('data-column-id'), 10);
            that.position = bbEmbed(this).parents('li').index() + 1;
            unpinWidgetInstance.destroy();
            that._unPinItem(that.column, that.position);
        });
        bbEmbed(document).on('click', '#pinboard-fullscreen', function () {
            const embedElement = bbEmbed('#server-app-container')[0];
            if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
                bbEmbed('#server-app-container').removeAttr('style');
                bbEmbed('#server-app-container').attr('style', 'background-color: #f9f9f9; overflow: auto !important');
                if (embedElement.requestFullscreen) {
                    embedElement.requestFullscreen();
                }
                else if (embedElement.msRequestFullscreen) {
                    embedElement.msRequestFullscreen();
                }
                else if (embedElement.mozRequestFullScreen) {
                    embedElement.mozRequestFullScreen();
                }
                else if (embedElement.webkitRequestFullscreen) {
                    embedElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                }
                else {
                    if ('ActiveXObject' in window) {
                        const wscript = new ActiveXObject('Wscript.shell');
                        wscript.SendKeys('{F11}');
                        setTimeout(function () {
                            if ((screen.availHeight || screen.height - 30) <= window.innerHeight) {
                                bbEmbed('#pinboard-fullscreen').removeClass('su-maximize-1').addClass('su-minimize').attr('data-tooltip', 'Exit Fullscreen');
                            }
                            else {
                                bbEmbed('#pinboard-fullscreen').addClass('su-maximize-1').removeClass('su-minimize').attr('data-tooltip', 'Fullscreen');
                            }
                        }, 400);
                    }
                }
            }
            else {
                bbEmbed('#server-app-container').attr('style', 'background-color: #f9f9f9; height:' + bbEmbed('#content-area').height() + 'px;overflow: hidden !important;min-height: 600px; width:' + that.embedOptions.width + '');
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
                else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                }
                else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }
        });
        bbEmbed(document).on('click', '#layout-items span', function () {
            const clientFnc = window[that.embedOptions.onLayoutChange];
            if (clientFnc instanceof Function) {
                clientFnc.call(this, bbEmbed('#widget-container'));
            }
            if (that.embedOptions.onLayoutChange instanceof Function) {
                that.embedOptions.onLayoutChange.call(that, bbEmbed('#widget-container'));
            }
            const currentLayout = bbEmbed('#widget-container').attr('data-current-layout');
            bbEmbed('#widget-container').attr('data-current-layout', bbEmbed(this).attr('id'));
            bbEmbed('#layout-items span').removeClass('active');
            bbEmbed(this).addClass('active');
            switch (bbEmbed(this).attr('id')) {
                case '1':
                    if (currentLayout != '1') {
                        that.changeLayout(1);
                        if (currentLayout == '111') {
                            that.appendListItem(1, 2);
                        }
                        else if (currentLayout == '11' || currentLayout == '12' || currentLayout == '21') {
                            that.appendListItem(1, 1);
                        }
                        that._setLayout(1);
                    }
                    break;
                case '11':
                    if (currentLayout != '11') {
                        that.changeLayout(11);
                        if (currentLayout == '111') {
                            that.appendListItem(2, 1);
                        }
                        else if (currentLayout == '1') {
                            that.createEmptyList(2, 2);
                        }
                        that._setLayout(11);
                    }
                    break;
                case '12':
                    if (currentLayout != '12') {
                        that.changeLayout(12);
                        if (currentLayout == '111') {
                            that.appendListItem(2, 1);
                        }
                        else if (currentLayout == '1') {
                            that.createEmptyList(2, 2);
                        }
                        that._setLayout(12);
                    }
                    break;
                case '21':
                    if (currentLayout != '21') {
                        that.changeLayout(21);
                        if (currentLayout == '111') {
                            that.appendListItem(2, 1);
                        }
                        else if (currentLayout == '1') {
                            that.createEmptyList(2, 2);
                        }
                        that._setLayout(21);
                    }
                    break;
                case '111':
                    if (currentLayout != '111') {
                        that.changeLayout(111);
                        if (currentLayout == '1') {
                            that.createEmptyList(2, 3);
                        }
                        else if (currentLayout == '11' || currentLayout == '12' || currentLayout == '21') {
                            that.createEmptyList(3, 3);
                        }
                        that._setLayout(111);
                    }
                    break;
            }
        });
        bbEmbed.map(that.pinboardDetails, function (value) {
            that.isWidgetMode = true;
            that.widgetName = that.embedOptions.token ? value.Id : value.WidgetId;
            that.isDashboardViewMode = false;
            that.dashboardViewName = '';
            const response = {
                Apistatus: true,
                Data: that.embedOptions.token ? value : JSON.parse(value),
                Status: true
            };
            that._renderDashboard(response);
        });
    }
    createEmptyList(from, to) {
        for (let i = from; i <= to; i++) {
            bbEmbed('#widget-container').append('<ul id="column-' + i + '" data-column-id="' + i + '" data-child-count="0"><li class="empty click-container"><div class="empty-content empty-homepage"><span class="drag-widget" style="font-family:var(--font-family)">Drag your widgets here to customize layout</span></div></li></ul>');
        }
    }
    appendListItem(appendTo, count) {
        for (let i = appendTo + 1; i <= appendTo + count; i++) {
            if (bbEmbed('#column-' + i + ' li:not(.empty)').length > 0) {
                bbEmbed('#column-' + appendTo + ' li.empty').remove();
            }
            bbEmbed('#column-' + appendTo).append(bbEmbed('#column-' + i + ' li:not(.empty)'));
            bbEmbed('#column-' + i).remove();
        }
    }
    changeLayout(layout) {
        const that = this;
        let data;
        that.homepageItemId = bbEmbed('#widget-container').attr('data-homepage-id');
        that.isVirtualHomepage = bbEmbed('#widget-container').attr('data-virtual-homepage');
        if (that.homepageItemId == '' && that.isVirtualHomepage) {
            //that.homepageItemId = saveVirtualHomepage();
            bbEmbed('#initial-message').hide();
        }
        const embedQuerString = 'embed_nonce=' + this._uuidv4Generartor() +
            '&homepageId=' + that.homepageItemId +
            '&layout=' + layout +
            '&embed_mode=' + this.embedOptions.mode +
            '&embed_timestamp=' + Math.round((new Date()).getTime() / 1000) +
            '&embed_expirationtime=' + this.embedOptions.expirationTime;
        if (!that.embedOptions.token && !that._isEmptyOrSpaces(that.embedOptions.authorizationServer.url)) {
            data = {
                embedQuerString: encodeURI(embedQuerString),
                dashboardServerApiUrl: this.dashboardServerApiUrl
            };
            this._xhrRequestHelper('POST', this.embedOptions.authorizationServer.url, data, this.embedOptions.authorizationServer.headers, this._changeLayoutSuccess);
        }
        else {
            data = {
                'homepageId': that.homepageItemId,
                'layout': layout
            };
            bbEmbed.ajax({
                async: false,
                type: 'POST',
                url: that.dashboardServerApiUrl + this.embedGetDetailsEndPoint,
                headers: {
                    'Authorization': 'Bearer ' + that.accessToken
                },
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: bbEmbed.proxy(that._changeLayoutSuccess, that)
            });
        }
    }
    _checkEmptyHomepage() {
        let length = 0;
        let isEmptyHomepage = false;
        bbEmbed('#widget-container ul').each(function (i) {
            length = bbEmbed('#column-' + (i + 1) + ' li:not(".empty")').length;
            isEmptyHomepage = length > 0 ? false : true;
            return length > 0 ? false : true;
        });
        return isEmptyHomepage;
    }
    _setLayout(layout) {
        const itemType = bbEmbed('#widget-container').attr('data-item-type').toLowerCase();
        bbEmbed('#layout-items').find('span#' + layout).addClass('active');
        switch (layout) {
            case 1:
                bbEmbed('#column-1').removeClass().addClass('col-lg-12 col-md-12 col-sm-12 col-xs-12');
                break;
            case 11:
                bbEmbed('#column-1,#column-2').removeClass().addClass('col-lg-6 col-md-6 col-sm-6 col-xs-6');
                break;
            case 12:
                bbEmbed('#column-1').removeClass().addClass('col-lg-4 col-md-4 col-sm-4 col-xs-4');
                bbEmbed('#column-2').removeClass().addClass('col-lg-8 col-md-8 col-sm-8 col-xs-8');
                break;
            case 21:
                bbEmbed('#column-1').removeClass().addClass('col-lg-8 col-md-8 col-sm-8 col-xs-8');
                bbEmbed('#column-2').removeClass().addClass('col-lg-4 col-md-4 col-sm-4 col-xs-4');
                break;
            case 111:
                bbEmbed('#column-1,#column-2,#column-3').removeClass().addClass('col-lg-4 col-md-4 col-sm-4 col-xs-4');
                break;
        }
        const isEmptyHomepage = this._checkEmptyHomepage();
        if (isEmptyHomepage) {
            if (!window.IsMobile) {
                bbEmbed('#widget-container ul li.empty .empty-content').find('.drag-widget').hide();
                bbEmbed('#widget-container ul li.empty .empty-content').removeClass('non-empty-homepage').addClass('empty-homepage');
            }
            else {
                bbEmbed('#widget-container ul li.empty .empty-content').removeClass('non-empty-homepage').addClass('mobile-empty-homepage');
                bbEmbed('#widget-container ul li.empty .empty-content').find('.drag-widget').text('Log in using a desktop client to add widgets to this pinboard.').show();
                bbEmbed('#widget-container ul li.empty').css('border', 'none');
            }
        }
        if (itemType != 'dashboard') {
            const that = this;
            this.enableSorting();
            this.setListMinimumHeight();
            bbEmbed('.pinBoardDbrd').each(function () {
                const dbrdInstance = that._getDashboardInstance(this.id);
                const clientFnc = window[that.embedOptions.onResize];
                if (clientFnc instanceof Function) {
                    clientFnc.call(that, dbrdInstance);
                }
                if (that.embedOptions.onResize instanceof Function) {
                    that.embedOptions.onResize.call(that, dbrdInstance);
                }
                dbrdInstance.resizeDashboard();
            });
        }
    }
    setListMinimumHeight() {
        const tempArr = [];
        bbEmbed('#widget-container > ul').each(function (i) {
            let tempVar = 0;
            bbEmbed(this).find('li').each(function () {
                tempVar = tempVar + bbEmbed(this).innerHeight() + 20;
            });
            tempArr[`${i}`] = tempVar;
        });
        const minimumHeight = Math.max(...tempArr) > 400 ? Math.max(...tempArr) : 440;
        bbEmbed('#widget-container > ul').css('min-height', minimumHeight);
        bbEmbed('#server-app-container').height(bbEmbed('#content-area').height());
    }
    enableSorting() {
        const that = this;
        window.bbEmbed('#column-1, #column-2, #column-3').sortable({
            connectWith: 'ul',
            placeholder: 'placeholder',
            handle: '.e-rteItem .e-rte-content, .bbi-dbrd-control-header:not(.bbi-dbrd-control-menu-icon)',
            cancel: '.empty, .bbi-dbrd-control-menu-icon',
            containment: '#server-app-container',
            cursor: 'move',
            tolerance: 'pointer',
            scroll: true,
            scrollSensitivity: 10,
            scrollSpeed: 20,
            update: function (event, ui) {
                that.toColumn = bbEmbed(event.target).data('column-id');
                that.toPosition = ui.item.index() + 1;
            },
            start: function (event, ui) {
                bbEmbed('li.placeholder').append('<div class="placeholder-text" style="color: dimgray; font-size: 20px;padding-top: 10px;text-align: center;font-family:var(--font-family)">Drag your widgets here to customize layout</div>');
                bbEmbed('li.placeholder').css({ 'height': ui.item.height().toString() + 'px', 'background-color': '#eeeeee', 'border': 'dashed lightgray' });
                bbEmbed('#widget-container ul li.empty').remove();
                that.fromColumn = bbEmbed(event.target).data('column-id');
                that.fromPosition = ui.item.index() + 1;
                that.toColumn = bbEmbed(event.target).data('column-id');
                that.toPosition = ui.item.index() + 1;
                const dragPinWidgetInstance = bbEmbed('#' + ui.item.find('.pinWidget').attr('id') + '_embeddedbi').data('BoldBIDashboardDesigner');
                const clientFnc = window[that.embedOptions.onDrag];
                if (clientFnc instanceof Function) {
                    clientFnc.call(this, dragPinWidgetInstance);
                }
                if (that.embedOptions.onDrag instanceof Function) {
                    that.embedOptions.onDrag.call(that, dragPinWidgetInstance);
                }
            },
            stop: function (event, ui) {
                that.showEmptyList();
                const clientFnc = window[that.embedOptions.onDrop];
                const dropPinWidgetInstance = bbEmbed('#' + ui.item.find('.pinWidget').attr('id') + '_embeddedbi').data('BoldBIDashboardDesigner');
                if (clientFnc instanceof Function) {
                    clientFnc.call(this, dropPinWidgetInstance);
                }
                if (that.embedOptions.onDrop instanceof Function) {
                    that.embedOptions.onDrop.call(that, dropPinWidgetInstance);
                }
                if (!(that.fromColumn == that.toColumn && that.fromPosition == that.toPosition)) {
                    if (that.fromColumn != that.toColumn) {
                        window.bbEmbed('#' + ui.item.find('.pinWidget').attr('id') + '_embeddedbi').data('BoldBIDashboardDesigner').resizeDashboard();
                    }
                    that.dragAndDrop(that.fromColumn, that.toColumn, that.fromPosition, that.toPosition);
                }
                that.setListMinimumHeight();
            }
        });
        window.bbEmbed('#column-1, #column-2, #column-3').disableSelection();
    }
    showEmptyList() {
        bbEmbed('#widget-container ul').each(function (i) {
            if (bbEmbed('#column-' + (i + 1) + ' li').length < 1) {
                bbEmbed('#column-' + (i + 1)).append('<li class="empty click-container"><div class="empty-content empty-homepage"><span class="drag-widget" style="font-family:var(--font-family)">Drag your widgets here to customize layout</span></div></li>');
            }
        });
    }
    dragAndDrop(fromColumn, toColumn, fromPosition, toPosition) {
        const that = this;
        let data;
        const homepageItemId = bbEmbed('#widget-container').attr('data-homepage-id');
        const from = { Column: fromColumn, Position: fromPosition };
        const to = { Column: toColumn, Position: toPosition };
        const embedQuerString = 'embed_nonce=' + this._uuidv4Generartor() +
            '&homepageId=' + homepageItemId +
            '&moveFrom=' + JSON.stringify(from) +
            '&moveTo=' + JSON.stringify(to) +
            '&embed_mode=' + this.embedOptions.mode +
            '&embed_timestamp=' + Math.round((new Date()).getTime() / 1000) +
            '&embed_expirationtime=' + this.embedOptions.expirationTime;
        if (!that.embedOptions.token && !that._isEmptyOrSpaces(that.embedOptions.authorizationServer.url)) {
            data = {
                embedQuerString: encodeURI(embedQuerString),
                dashboardServerApiUrl: this.dashboardServerApiUrl
            };
            this._xhrRequestHelper('POST', this.embedOptions.authorizationServer.url, data, this.embedOptions.authorizationServer.headers, this._dragAndDropSuccess);
        }
        else {
            data = {
                'homepageId': homepageItemId,
                'moveFrom': JSON.stringify(from),
                'moveTo': JSON.stringify(to)
            };
            bbEmbed.ajax({
                async: false,
                type: 'POST',
                url: that.dashboardServerApiUrl + this.embedGetDetailsEndPoint,
                data: JSON.stringify(data),
                headers: {
                    'Authorization': 'Bearer ' + that.accessToken
                },
                contentType: 'application/json',
                success: bbEmbed.proxy(that._dragAndDropSuccess, that)
            });
        }
    }
    _unPinItem(column, position) {
        const that = this;
        let data;
        const homepageItemId = bbEmbed('#widget-container').attr('data-homepage-id');
        const unpinPosition = { Column: column, Position: position };
        const embedQuerString = 'embed_nonce=' + this._uuidv4Generartor() +
            '&homepageId=' + homepageItemId +
            '&unpinPosition=' + JSON.stringify(unpinPosition) +
            '&isUnpin=' + true +
            '&embed_mode=' + this.embedOptions.mode +
            '&embed_timestamp=' + Math.round((new Date()).getTime() / 1000) +
            '&embed_expirationtime=' + this.embedOptions.expirationTime;
        if (!that.embedOptions.token && !that._isEmptyOrSpaces(that.embedOptions.authorizationServer.url)) {
            data = {
                embedQuerString: encodeURI(embedQuerString),
                dashboardServerApiUrl: this.dashboardServerApiUrl
            };
            this._xhrRequestHelper('POST', this.embedOptions.authorizationServer.url, data, this.embedOptions.authorizationServer.headers, this._unPinSuccess);
        }
        else {
            data = {
                'homepageId': homepageItemId,
                'unpinPosition': JSON.stringify(unpinPosition),
                'isUnpin': true
            };
            bbEmbed.ajax({
                async: false,
                type: 'POST',
                url: that.dashboardServerApiUrl + this.embedGetDetailsEndPoint,
                headers: {
                    'Authorization': 'Bearer ' + that.accessToken
                },
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: bbEmbed.proxy(that._unPinSuccess, that)
            });
        }
    }
    _unPinSuccess(result) {
        if (result.Status) {
            bbEmbed('#column-' + this.column + ' li:eq(' + (this.position - 1) + ')').remove();
            this.showEmptyList();
            const isEmptyHomepage = this.checkEmptyHomepage();
            if (isEmptyHomepage) {
                bbEmbed('#widget-container ul li.empty .empty-content').find('.drag-widget').hide();
                bbEmbed('#widget-container ul li.empty .empty-content').removeClass('non-empty-homepage').addClass('empty-homepage');
            }
            this.setListMinimumHeight();
        }
    }
    checkEmptyHomepage() {
        let length = 0;
        let isEmptyHomepage = false;
        bbEmbed('#widget-container ul').each(function (i) {
            length = bbEmbed('#column-' + (i + 1) + ' li:not(".empty")').length;
            isEmptyHomepage = length > 0 ? false : true;
            return length > 0 ? false : true;
        });
        return isEmptyHomepage;
    }
    _renderItem(itemDetail) {
        const that = this;
        const isEmptyHomepage = this._checkEmptyHomepage();
        if (isEmptyHomepage) {
            bbEmbed('#widget-container ul li.empty .empty-content').find('.drag-widget').hide();
            bbEmbed('#widget-container ul li.empty .empty-content').removeClass('non-empty-homepage').addClass('empty-homepage');
        }
        bbEmbed('#widget-container').hide();
        if (itemDetail.ItemType.toLowerCase() == 'widget') {
            this._setLayout(itemDetail.ColumnInfo.Layout);
            const column = itemDetail.ColumnInfo.Column;
            bbEmbed.each(column, function (i) {
                if (column[`${i}`].Item.length > 0) {
                    bbEmbed.each(column[`${i}`].Item, function (j) {
                        if (column[`${i}`].Item[`${j}`].ItemExtension.toLowerCase() != '.sydj') {
                            bbEmbed('#widget_' + (i + 1) + '_' + (j + 1)).ejDashboardViewer({
                                accessToken: this.accessToken,
                                serviceUrl: this.dashboardServiceUrl,
                                serverUrl: this.dashboardServerUrl,
                                _enableHyperLinkOnErrorMessage: false,
                                cdnFilePath: this.isUseCdn ? this.cdnLink + '/scripts/viewer' : '',
                                dashboardPath: column[`${i}`].Item[`${j}`].Path,
                                _itemId: column[`${i}`].Item[`${j}`].ItemId,
                                reportName: '',
                                reportDescription: '',
                                enableExport: true,
                                enablePrint: false,
                                actionBegin: function (args) {
                                    if (args.eventType == 'beforeNavigate') {
                                        this.hasWidgetLink = true;
                                    }
                                },
                                localeSettings: {
                                    resourcePath: ''
                                },
                                enableWidgetMode: column[`${i}`].Item[`${j}`].Id == null ? false : true,
                                filterParameters: column[`${i}`].Item[`${j}`].QueryString,
                                showTab: column[`${i}`].Item[`${j}`].TabId == null ? true : false,
                                widgetModeSettings: {
                                    name: '',
                                    id: column[`${i}`].Item[`${j}`].Id == null ? '' : column[`${i}`].Item[`${j}`].Id,
                                    title: column[`${i}`].Item[`${j}`].Name
                                },
                                _selectedTabGuid: column[`${i}`].Item[`${j}`].TabId == null ? '' : column[`${i}`].Item[`${j}`].TabId,
                                afterWidgetRender: bbEmbed.proxy(function (args, param) {
                                    if (param.data.controlType.toLowerCase() == 'card') {
                                        if (!bbEmbed('#widget_' + (i + 1) + '_' + (j + 1) + ' .e-control-heading span').hasClass('e-control-title')) {
                                            bbEmbed('#widget_' + (i + 1) + '_' + (j + 1) + ' .e-control-heading').text(args[`${i}`].Item[`${j}`].Name);
                                        }
                                    }
                                    if (args[`${i}`].Item[`${j}`].IsActive && !args[`${i}`].Item[`${j}`].IsHavingPermission) {
                                        bbEmbed('#widget_' + (i + 1) + '_' + (j + 1)).find('.bbi-dbrd-control').remove();
                                        bbEmbed('#widget_' + (i + 1) + '_' + (j + 1)).find('.bbi-dbrd-control-container').append('<div class="no-permission"><span class="message">You do not have permission to view this widget.</span></div>');
                                    }
                                    else if (!args[`${i}`].Item[`${j}`].IsActive && !args[`${i}`].Item[`${j}`].IsHavingPermission) {
                                        bbEmbed('#widget_' + (i + 1) + '_' + (j + 1)).find('.bbi-dbrd-control').remove();
                                        bbEmbed('#widget_' + (i + 1) + '_' + (j + 1)).find('.bbi-dbrd-control-container').append('<div class="no-permission"><span class="message">This widget has been deleted.</span></div>');
                                    }
                                    if (args[`${i}`].Item[`${j}`].IsActive && args[`${i}`].Item[`${j}`].IsHavingPermission && args[`${i}`].Item[`${j}`].QueryString != null) {
                                        const currentElement = bbEmbed('#widget_' + (i + 1) + '_' + (j + 1));
                                        currentElement.find('#filter-info').parent().append('<div class="filter-overview"><span id="heading">Applied Filters</span><div id="outer-div"><div id="scroller-content"><div id="applied-filters-container"></div></div></div></div>');
                                        //const filtersDom = buildAppliedFiltersDom(parsedQueryFilter);
                                        //currentElement.find(".filter-overview #applied-filters-container").append(filtersDom);
                                        if (currentElement.find('.filter-overview #applied-filters-container').height() > 180) {
                                            currentElement.find('.filter-overview #scroller-content').BoldBIDashboardScroller({
                                                height: 180,
                                                width: 248,
                                                scrollerSize: 9
                                            });
                                        }
                                        currentElement.find('.filter-overview').addClass('display-none');
                                    }
                                }, this, column),
                                beforeWidgetIconRendered: bbEmbed.proxy(function (args, event) {
                                    if (event.widgetInformation.Name.toLowerCase() != 'widget not configured') {
                                        if (!window.IsMobile) {
                                            if (event.widgetInformation.Name.toLowerCase() != 'card') {
                                                bbEmbed('#widget_' + (i + 1) + '_' + (j + 1)).data('ejDashboardViewer').model.size.height = '400px';
                                            }
                                            else {
                                                bbEmbed('#widget_' + (i + 1) + '_' + (j + 1)).data('ejDashboardViewer').model.size.height = '250px';
                                            }
                                        }
                                        else {
                                            bbEmbed('#widget_' + (i + 1) + '_' + (j + 1)).data('ejDashboardViewer').model.size.height = '250px';
                                        }
                                    }
                                    else {
                                        bbEmbed('#widget_' + (i + 1) + '_' + (j + 1)).data('ejDashboardViewer').model.size.height = '200px';
                                        bbEmbed('#widget_' + (i + 1) + '_' + (j + 1)).find('.bbi-dbrd-control-container').append('<div class="no-permission"><span class="message">This widget has been deleted.</span></div>');
                                    }
                                    if (event.iconsinformation.length > 0 && event.iconsinformation[0].classname == 'bbi-dbrd-link-enable') {
                                        event.iconsinformation[0].margintop = '1px';
                                    }
                                    if (!window.IsMobile) {
                                        event.iconsinformation.unshift({ 'classname': 'su su-delete unpin', 'name': 'Unpin Widget', 'datatooltip': 'Unpin Widget', 'marginright': '-18px', 'margintop': '4px' });
                                    }
                                    const addWidgetIcons = args[`${i}`].Item[`${j}`].IsActive && args[`${i}`].Item[`${j}`].IsHavingPermission && event.widgetInformation.Name.toLowerCase() != 'widget not configured';
                                    if (addWidgetIcons) {
                                        event.iconsinformation.unshift({ 'classname': 'su su-maximize unpin', 'name': 'Maximize Widget', 'datatooltip': 'Maximize Widget', 'marginright': '-18px', 'margintop': '4px' });
                                        event.iconsinformation.unshift({ 'classname': 'su su-open-link-newtab unpin', 'name': 'Go to Dashboard', 'datatooltip': 'Go to Dashboard', 'marginright': '-18px', 'margintop': '4px' });
                                    }
                                    if (addWidgetIcons && args[`${i}`].Item[`${j}`].QueryString != null) {
                                        event.iconsinformation.unshift({ 'id': 'filter-info', 'classname': 'su su-info unpin', 'name': 'Applied Filters', 'datatooltip': 'View Applied Filters', 'margintop': '4px', 'marginright': '0px' });
                                    }
                                    bbEmbed('#widget-container').show();
                                    //hideWaitingPopup('content-area');
                                    const data = bbEmbed('#widget_' + (i + 1) + '_' + (j + 1)).ejDashboardViewer();
                                    data.resize();
                                }, this, column),
                                dashboardCreated: function () {
                                    const href = bbEmbed('#widget_' + (i + 1) + '_' + (j + 1)).attr('data-dashboardurl');
                                    bbEmbed('#widget_' + (i + 1) + '_' + (j + 1)).find('.su-open-link-newtab').wrap(bbEmbed('<a class="redirect" href="' + href + '" target="_blank">'));
                                },
                                onMenuIconClick: function (information) {
                                    if (typeof (information.name) != 'undefined' && information.name.toLowerCase() == 'unpin widget') {
                                        //ShowWaitingProgress('#content-area', 'show');
                                        const column = information.target.parents('ul').data('column-id');
                                        const position = information.target.parents('li').index() + 1;
                                        this.unPinItem(column, position, information.event);
                                    }
                                    else if (typeof (information.name) != 'undefined' && information.name.toLowerCase() == 'maximize widget') {
                                        //parent.bbEmbed('#maximize').removeClass('display-none');
                                        //const control = parent.bbEmbed('#' + currentElement).data('ejDashboardViewer').getWidgetDataByReportName(information.widgetId);
                                        //maximizeWidget(header, control, information.event, information.serviceUrl, information.dashboardPath);
                                    }
                                    else if (typeof (information.name) != 'undefined' && information.name.toLowerCase() == 'applied filters') {
                                        const currentElement = bbEmbed(information.event.target).parent().find('.filter-overview');
                                        currentElement.toggleClass('display-none');
                                        bbEmbed('.filter-overview').not(currentElement).addClass('display-none');
                                        information.event.preventDefault();
                                    }
                                }
                            });
                        }
                        else {
                            const pinboardIdName = that.embedOptions.embedContainerId + '_pinBoard_' + (i + 1) + '_' + (j + 1);
                            bbEmbed('#widget_' + (i + 1) + '_' + (j + 1)).append('<div class="pinWidget" style="height:calc(100% - 5px);width:93%;overflow: hidden !important;" id="' + pinboardIdName + '"><div id="' + pinboardIdName + '_embeddedbi" class="pinBoardDbrd"></div ></div>');
                            that.pinBoardRendered = false;
                            that.pinboardIds.push({ 'widgetId': column[`${i}`].Item[`${j}`].Id, 'pinboardContainerId': pinboardIdName });
                            that.pinboardDetails[that.pinboardDetails.length] = that.embedOptions.token ? column[`${i}`].Item[`${j}`] : column[`${i}`].Item[`${j}`].WidgetDetails;
                            if (column[`${i}`].Item[`${j}`].IsActive && !column[`${i}`].Item[`${j}`].IsHavingPermission) {
                                bbEmbed('#widget_' + (i + 1) + '_' + (j + 1)).find('iframe').remove();
                                bbEmbed('#widget_' + (i + 1) + '_' + (j + 1)).append('<div class="no-permission"><span class="message">You do not have permission to view this widget.</span></div>');
                            }
                            else if (!column[`${i}`].Item[`${j}`].IsActive && !column[`${i}`].Item[`${j}`].IsHavingPermission) {
                                bbEmbed('#widget_' + (i + 1) + '_' + (j + 1)).find('iframe').remove();
                                bbEmbed('#widget_' + (i + 1) + '_' + (j + 1)).append('<div class="no-permission"><span class="message">This widget has been deleted.</span></div>');
                            }
                        }
                    });
                    bbEmbed('#widget-container').show();
                }
                else {
                    bbEmbed('#widget-container').show();
                }
            });
            this.enableSorting();
            this.setListMinimumHeight();
        }
        else if (itemDetail.ItemType.toLowerCase() == 'dashboard') {
            const column = itemDetail.ColumnInfo.Column;
            bbEmbed('#dashboard_1_1').css({ 'height': bbEmbed(window).height() - bbEmbed('#header-area').outerHeight() - bbEmbed('#base-footer-div').outerHeight() - bbEmbed('#homepage-header').outerHeight() - 30, 'width': bbEmbed('#content-area').width() - 10 });
            if (column[0].Item[0].IsActive && column[0].Item[0].IsHavingPermission && column[0].Item[0].ItemExtension.toLowerCase() != '.sydj') {
                bbEmbed('#dashboard_1_1').ejDashboardViewer({
                    // accessToken: accessToken,
                    // serviceUrl: dashboardServiceUrl,
                    // serverUrl: dashboardServerUrl,
                    // _enableHyperLinkOnErrorMessage: false,
                    // cdnFilePath: isUseCdn ? cdnLink + "/scripts/viewer" : "",
                    dashboardPath: itemDetail.ColumnInfo.Column[0].Item[0].Path,
                    _itemId: itemDetail.ColumnInfo.Column[0].Item[0].ItemId,
                    reportName: '',
                    reportDescription: '',
                    enableExport: true,
                    enablePrint: false,
                    showGetLinkIcon: false,
                    localeSettings: {
                        resourcePath: ''
                    },
                    interactionSettings: {
                        allowHistoryMaintenance: false,
                        handleHistoryEvent: false
                    },
                    enableWidgetMode: false,
                    filterParameters: itemDetail.ColumnInfo.Column[0].Item[0].QueryString,
                    showTab: itemDetail.ColumnInfo.Column[0].Item[0].TabId != null ? false : true,
                    _selectedTabGuid: itemDetail.ColumnInfo.Column[0].Item[0].TabId != null ? itemDetail.ColumnInfo.Column[0].Item[0].TabId : '',
                    beforeControlMenuOpen: function (e) {
                        e.menuData.splice(1, 1);
                    },
                    onTabSelectionFailure: 'OnFailtoLoadChildDashboard',
                    beforeContextMenuOpen: function (e) {
                        const removeByAttr = function (arr, attr, value) {
                            let i = arr.length;
                            while (i--) {
                                if (arr[`${i}`] && Object.prototype.hasOwnProperty.call(arr[`${i}`], attr) && (arguments.length > 2 && arr[`${i}`][`${attr}`] == value)) {
                                    arr.splice(i, 1);
                                }
                            }
                            return arr;
                        };
                        removeByAttr(e.menuData, 'text', 'Export');
                    }
                });
            }
            else {
                if (!column[0].Item[0].IsActive) {
                    bbEmbed('#dashboard_1_1').append('<div class="no-permission"><span class="message">This dashboard has been deleted.</span></div>');
                }
                else if (column[0].Item[0].IsActive && !column[0].Item[0].IsHavingPermission) {
                    bbEmbed('#dashboard_1_1').append('<div class="no-permission"><span class="message">You do not have permission to view this dashboard.</span></div>');
                }
                else if (column[0].Item[0].IsActive && column[0].Item[0].IsHavingPermission && column[0].Item[0].ItemExtension.toLowerCase() == '.sydj') {
                    bbEmbed('#dashboard_1_1').append('<div class="no-permission"><span class="message">Currently this dashboard is not supported.</span></div>');
                }
            }
            bbEmbed('#widget-container').show();
            //hideWaitingPopup("content-area");
        }
    }
    _addWidgetInPinboard(itemDetails) {
        const ulElement = bbEmbed('#widget-container').find('ul:first');
        if (bbEmbed('#widget-container').find('ul:first li').length == 1 && bbEmbed('#widget-container').find('ul:first li').hasClass('empty')) {
            bbEmbed('#widget-container').find('ul:first li').remove();
        }
        const ulElementLilength = bbEmbed('#widget-container').find('ul:first li').length;
        const column = itemDetails.ColumnInfo.Column[0];
        const item = column.Item[0].Id == null ? '/bi/' + this.siteIdentifier + '/widgets/widgets' : '/bi/' + this.siteIdentifier + '/dashboards';
        const itemName = column.Item[0].Name;
        const widgetType = column.Item[0].WidgetType;
        let height = 0;
        if (widgetType != null && (widgetType.includes('Card') || widgetType.includes('Image'))) {
            height = 250;
        }
        else {
            height = 400;
        }
        const queryString = column.Item[0].QueryString != null ? column.Item[0].QueryString : '';
        const href = column.Item[0].TabId == null ? (item + '/' + column.Item[0].ItemId + '/' + (column.Item[0].Id != null ? (column.Item[0].CategoryName + '/') : '') + column.Item[0].ItemName + (queryString != '' ? '?' + queryString : queryString)) : (item + '/' + column.Item[0].ItemId + '/' + (column.Item[0].Id != null ? (column.Item[0].CategoryName + '/') : '') + column.Item[0].ItemName + '?tab=' + column.Item[0].TabId + (queryString != '' ? '&' + queryString : queryString));
        const deleteIconDiv = this.embedOptions.pinboardSettings.enableUnpinWidget || this.embedOptions.pinboardSettings.enableUnpinWidget === undefined ? '<div id="widget-icons"><i class="items unpin-widget su su-delete" data-toggle="tooltip" data-original-title="Unpin Widget"  style="color: black;" /></div>' : '';
        bbEmbed(ulElement).prepend('<li class="list-item"><div class="widget" id=widget_' + 1 + '_' + (ulElementLilength + 1) + ' data-dashboardurl="' + href + '" style="height: ' + height + 'px;width:100%;background:#fff;"><div class="widget-sortable" style="width:100%;float:left;display:block;height:0px"><div style="height:100%;width:100%;cursor:move;"><div id="item-name">' + itemName + '</div>' + deleteIconDiv + '</div></div></div></li>');
        const pinboardIdName = this.embedOptions.embedContainerId + '_pinBoard_1' + '_' + (ulElementLilength + 1);
        bbEmbed('#widget_1' + '_' + (ulElementLilength + 1)).append('<div class="pinWidget" style="height:calc(100% - 5px);width:93%;overflow: hidden !important;" id="' + pinboardIdName + '"><div id="' + pinboardIdName + '_embeddedbi" class="pinBoardDbrd"></div ></div>');
        this.pinBoardRendered = false;
        this.pinboardIds.push({ 'widgetId': column.Item[0].Id, 'pinboardContainerId': pinboardIdName });
        this.loadDashboardWidget(column.Item[0].Id, column.Item[0].ItemId);
        this.enableSorting();
        this.setListMinimumHeight();
        this._removeElementsClass(this.embedOptions.embedContainerId, '.preloader-wrap', 'viewer-blue-loader');
    }
    _tabSelected() {
        const containerName = window.bbEmbed('.multitab-dbrd').attr('id');
        for (let i = 0; i < window.bbEmbed('#' + containerName + ' .e-toolbar-item').length; i++) {
            window.bbEmbed('.e-content').find('#e-content-' + containerName + '_' + i).attr('style', 'display:block !important');
            if (window.bbEmbed('#' + containerName + ' .e-toolbar-item.e-active').attr('aria-controls') == 'e-content-' + containerName + '_' + i) {
                window.bbEmbed(window.bbEmbed('.e-content').find('#e-content-' + containerName + '_' + i).children()).css({ 'display': 'block', 'position': 'absolute', 'left': 0 });
                const dbrdInstance = window.bbEmbed('#' + window.bbEmbed(window.bbEmbed('.e-content').find('#e-content-' + containerName + '_' + i).children()).children().attr('id')).data('BoldBIDashboardDesigner');
                if (dbrdInstance == null || dbrdInstance == undefined) {
                    const dashboardId = window.bbEmbed('.e-content').find('#e-content-' + containerName + '_' + i).children().attr('id').split('_')[1];
                    const response = {
                        Apistatus: true,
                        Data: this.dashboardDetails[`${dashboardId}`],
                        Status: true
                    };
                    this._renderDashboard(response);
                }
            }
            else {
                window.bbEmbed(window.bbEmbed('.e-content').find('#e-content-' + containerName + '_' + i).children()).css({ 'display': 'block', 'position': 'absolute', 'left': window.bbEmbed('.e-content.e-lib.e-touch').width() * (i + 1) });
            }
        }
    }
    _isDependencyLoaded(that, dashboardId) {
        if (window.bbEmbed instanceof Function &&
            window.BoldBIDashboard instanceof Object && !that._isNullOrUndefined(window.BoldBIDashboard) &&
            window.BoldBIDashboard.Designer instanceof Object &&
            window.BoldBIDashboardDesigner instanceof Function &&
            !that._isEmptyOrSpaces(that.designerRootUrl) &&
            window.Designer instanceof Object) {
            if (!that.IsDependencyLoaded) {
                that.IsDependencyLoaded = true;
            }
            if (that.embedOptions.token) {
                if (that.embedOptions.dashboardPath && !that.embedOptions.dashboardId) {
                    that._throwError('Token API does not support rendering dashboard with dashboardPath');
                }
                else if (that.embedOptions.datasourceName && !that.embedOptions.datasourceId) {
                    that._throwError('Token API does not support rendering dashboard with datasourceName');
                }
                else if (that.embedOptions.viewName && !that.embedOptions.viewId) {
                    that._throwError('Token API does not support rendering dashboard with viewName');
                }
                else if ((that.isDashboardRendering && that.embedOptions.dashboardId) || (that.isPinboardRendering && that.embedOptions.pinboardName)) {
                    const apiUrl = that.isDashboardRendering ? that.dashboardServerApiUrl + '/v5.0/dashboards/' + that.embedOptions.dashboardId : that.dashboardServerApiUrl + '/pinboard/' + that.embedOptions.pinboardName;
                    bbEmbed.ajax({
                        async: false,
                        type: 'GET',
                        url: apiUrl,
                        headers: {
                            'Authorization': 'bearer ' + that.embedOptions.token
                        },
                        contentType: 'application/json',
                        success: function (result) {
                            const resultData = (that.isDashboardRendering && result.IsMultiDashboard && that.embedOptions.mode == BoldBI.Mode.Design) ? 'Designer embedding' : (that.isDashboardRendering && result.IsMultiDashboard) ? result.TabDetail : (that.isPinboardRendering && result.Status) ? result.Data : that.tokenResponse;
                            if (resultData != 'Designer embedding') {
                                that._renderDashboard({ Apistatus: true, Data: resultData, Status: true });
                            }
                            else {
                                that._throwError('Cannot render Multitab dashboard in designer mode');
                            }
                        },
                        error: function (jqXHR) {
                            if (jqXHR.status == 401) {
                                that._throwError('Please provide valid access token');
                            }
                            else if (jqXHR.status == 404 && that.isDashboardRendering) {
                                that._throwError('Please provide valid dashboard ID');
                            }
                            else {
                                that._throwError('Please provide valid pinboard name');
                            }
                        }
                    });
                }
                else if (that.embedOptions.viewId && that.isDashboardViewRendering) {
                    bbEmbed.ajax({
                        async: false,
                        type: 'GET',
                        url: that.dashboardServerApiUrl + '/v5.0/dashboards/views/' + that.embedOptions.viewId,
                        headers: {
                            'Authorization': 'bearer ' + that.embedOptions.token
                        },
                        contentType: 'application/json',
                        success: function (result) {
                            if (that._isNullOrUndefined(that.embedOptions.dashboardSettings.filterOverviewSettings)) {
                                that.embedOptions.dashboardSettings.filterOverviewSettings = {};
                            }
                            that.embedOptions.dashboardId = result.ItemId;
                            that.embedOptions.dashboardSettings.filterOverviewSettings.viewId = that.embedOptions.viewId;
                            that.embedOptions.dashboardSettings.filterOverviewSettings.viewName = result.ViewName;
                            that.embedOptions.filterParameters = result.QueryString;
                            that._renderDashboard({ Apistatus: true, Data: that.tokenResponse, Status: true });
                        },
                        error: function (jqXHR) {
                            if (jqXHR.status == 401) {
                                that._throwError('Please provide valid access token');
                            }
                            else if (jqXHR.status == 400) {
                                that._throwError('Please provide valid view ID');
                            }
                            else if (jqXHR.status == 404) {
                                that._throwError('View details not found');
                            }
                        }
                    });
                }
                else if (that.widgetName) {
                    const regex = /^(?:\{{0,1}(?:[0-9a-fA-F]){8}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){12}\}{0,1})$/;
                    const isGuidDbrd = regex.exec(that.widgetName);
                    if (!isGuidDbrd) {
                        that._throwError('Token API does not support rendering widget with widgetName');
                    }
                    else {
                        that._renderDashboard({ Apistatus: true, Data: that.tokenResponse, Status: true });
                    }
                }
                else {
                    that._renderDashboard({ Apistatus: true, Data: that.tokenResponse, Status: true });
                }
            }
            else {
                that._getAuthorizationToken(dashboardId);
            }
        }
        else {
            setTimeout(that._isDependencyLoaded, 500, that);
        }
    }
    _getDashboardInstance(embedChildId) {
        const ele = window.bbEmbed.call(this, '#' + (embedChildId ? embedChildId : this.childContainer.id))[0];
        if (ele) {
            return window.bbEmbed.data.call(this, ele, 'BoldBIDashboardDesigner');
        }
    }
    _checkWidgetList() {
        if (this.embedOptions.widgetList.length > 0 && !this.embedOptions.embedContainerId) {
            const error = 'Error: For rendering multiple widgets, please use the method loadMultipleWidget()';
            this.embedOptions.widgetList.forEach((widget) => {
                const containerId = widget.containerId;
                const errorMessage = '<div id="embedded-bi-error" style="display:table;height:100%;width:100%;"><div style="display: table-cell;vertical-align: middle;text-align: center;"><div style="display: inline-block;"><img src=' + this.errorImage + ' style="float: left"/><div style="float: left;margin-left: 10px;line-height: 20px;">BoldBI Embedded: ' + error + '</div></div>';
                document.getElementById(containerId).innerHTML = errorMessage;
            });
            return true;
        }
        else {
            this.embedOptions.widgetList = '';
            return false;
        }
    }
    _onBoldBIDashboardInstaceActionBegin(arg, embedContainerId) {
        if (this.isMultiTab && parseInt(bbEmbed('.e-content .e-active').attr('id').split('_')[bbEmbed('.e-content .e-active').attr('id').split('_').length - 1], 10) == 0) {
            const dashboadInstance = bbEmbed('.e-content .e-active').find('.bbembed-multitab-dbrd').data('BoldBIDashboardDesigner');
            this.setDefaultTheme(dashboadInstance.modules.themeHelper.getBannerBackground(), dashboadInstance.modules.themeHelper.getBannerTextColor(), dashboadInstance.modules.themeHelper.getBannerIconColor());
        }
        if (typeof (arg) != 'undefined') {
            switch (arg.eventType) {
                case 'renderLayout':
                    this._removeElementsClass(embedContainerId, '.preloader-wrap', 'viewer-blue-loader');
                    break;
                default:
                    break;
            }
        }
        // Hiding the Refresh Setting button in connection embedding.
        if (this.embedOptions.mode == BoldBI.Mode.Connection || this.embedOptions.mode == BoldBI.Mode.Design) {
            const style = document.createElement('style');
            style.type = 'text/css';
            // Define the CSS rule to hide the refresh setting button in the webAPI connector.
            const cssCode = '#' + this.embedOptions.embedContainerId + '_embeddedbi_newConnection_webDs_schedule_tr .bbi-dbrd-datasource-schedule { display: none }';
            style.appendChild(document.createTextNode(cssCode));
            document.head.appendChild(style);
        }
        const serverFnc = window[this.actionBeginFn];
        if (serverFnc instanceof Function) {
            serverFnc.call(this, arg);
        }
        const clientFnc = window[this.embedOptions.actionBegin];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (this.embedOptions.actionBegin instanceof Function) {
            this.embedOptions.actionBegin.call(this, arg);
        }
        if (arg.eventType == 'dataSourceSaveAction') {
            this._onBoldBIBeforeDatasourceSaveAction(arg);
        }
        if (arg.eventType == 'filterInteraction') {
            const clientFnc = window[this.embedOptions.beforeFilterApply];
            if (clientFnc instanceof Function) {
                clientFnc.call(this, arg);
            }
            if (this.embedOptions.beforeFilterApply instanceof Function) {
                this.embedOptions.beforeFilterApply.call(this, arg);
            }
        }
        if (arg.eventType == 'publishAsAction') {
            const clientFnc = window[this.embedOptions.dashboardSettings.beforePublishAs];
            if (clientFnc instanceof Function) {
                clientFnc.call(this, arg);
            }
            if (this.embedOptions.dashboardSettings.beforePublishAs instanceof Function) {
                this.embedOptions.dashboardSettings.beforePublishAs.call(this, arg);
            }
        }
    }
    _onBoldBIDashboardInstaceActionComplete(arg) {
        const that = this;
        let data;
        const serverFnc = window[this.actionCompleteFn];
        if (!this._isNullOrUndefined(arg.data)) {
            if (arg.data.event == 'createConnection') {
                this.embedOptions.datasourceId = arg.data.source.data;
                this.embedOptions.mode = BoldBI.Mode.DataSource;
                this.isNewConnection = true;
                if (that.embedOptions.token) {
                    that._renderDashboard({ Apistatus: true, Data: this.tokenResponse, Status: true });
                }
                else if (!that._isEmptyOrSpaces(that.embedOptions.authorizationServer.url)) {
                    this._getAuthorizationToken();
                }
                else {
                    data = {
                        'embed_datasource_id': that.embedOptions.datasourceId,
                        'embed_mode': that.embedOptions.mode
                    };
                    bbEmbed.ajax({
                        async: false,
                        type: 'POST',
                        url: that.dashboardServerApiUrl + this.embedGetDetailsEndPoint,
                        headers: {
                            'Authorization': 'Bearer ' + that.accessToken
                        },
                        data: JSON.stringify(data),
                        contentType: 'application/json',
                        success: bbEmbed.proxy(that._renderDashboard, that)
                    });
                }
            }
            if (arg.data.event == 'cancelDataSource') {
                this.embedOptions.mode = BoldBI.Mode.Connection;
                if (that.embedOptions.token) {
                    that._renderDashboard({ Apistatus: true, Data: this.tokenResponse, Status: true });
                }
                else if (!that._isEmptyOrSpaces(that.embedOptions.authorizationServer.url)) {
                    this._getAuthorizationToken();
                }
                else {
                    data = {
                        'embed_mode': that.embedOptions.mode
                    };
                    bbEmbed.ajax({
                        async: false,
                        type: 'POST',
                        url: that.dashboardServerApiUrl + this.embedGetDetailsEndPoint,
                        headers: {
                            'Authorization': 'Bearer ' + that.accessToken
                        },
                        data: JSON.stringify(data),
                        contentType: 'application/json',
                        success: bbEmbed.proxy(that._renderDashboard, that)
                    });
                }
            }
        }
        if (this.pinboardIds.length > 0 && arg.eventType === 'renderWidget') {
            const controlHeaderWrapper = arg.source.element.find('.bbi-dbrd-control-header .bbi-dbrd-control-title-wrapper');
            if (controlHeaderWrapper.length === 0) {
                arg.source.element.parents('.widget').find('#widget-icons').css('margin-top', '8px');
                if (arg.source.element.attr('data-name').toLowerCase().includes('card')) {
                    arg.source.element.find('.bbi-dbrd-control').css('top', '20px');
                }
            }
            else {
                arg.source.element.find('.bbi-dbrd-control-header').css('margin-left', '-8px');
                arg.source.element.find('.bbi-dbrd-control-title-wrapper').css('margin-left', '8px');
            }
        }
        if (arg.eventType == 'interactionCompleted') {
            data = {
                filterData: this._getFilterData(arg.source.data.encryptedData),
                data: arg
            };
            const clientFnc = window[this.embedOptions.dashboardSettings.onInteraction];
            if (clientFnc instanceof Function) {
                clientFnc.call(this, data);
            }
            if (this.embedOptions.dashboardSettings.onInteraction instanceof Function) {
                this.embedOptions.dashboardSettings.onInteraction.call(this, arg);
            }
        }
        else {
            if (serverFnc instanceof Function) {
                serverFnc.call(this, arg);
            }
            const clientFnc = window[this.embedOptions.actionComplete];
            if (clientFnc instanceof Function) {
                clientFnc.call(this, arg);
            }
            if (this.embedOptions.actionComplete instanceof Function) {
                this.embedOptions.actionComplete.call(this, arg);
            }
        }
        if (arg.eventType == 'filterInteraction') {
            const clientFnc = window[this.embedOptions.afterFilterApply];
            if (clientFnc instanceof Function) {
                clientFnc.call(this, arg);
            }
            if (this.embedOptions.afterFilterApply instanceof Function) {
                this.embedOptions.afterFilterApply.call(this, arg);
            }
        }
        if (arg.eventType == 'dataSourceSaveAction' && JSON.parse(arg.schema.schema).length > 0) {
            this._onBoldBIAfterDatasourceSaveAction(arg);
        }
    }
    _onBoldBIBeforeDatasourceSaveAction(arg) {
        const clientFnc = window[this.embedOptions.beforeDatasourceSave];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (this.embedOptions.beforeDatasourceSave instanceof Function) {
            this.embedOptions.beforeDatasourceSave.call(this, arg);
        }
    }
    _onBoldBIAfterDatasourceSaveAction(arg) {
        const clientFnc = window[this.embedOptions.afterDatasourceSave];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (this.embedOptions.afterDatasourceSave instanceof Function) {
            this.embedOptions.afterDatasourceSave.call(this, arg);
        }
    }
    _onBoldBIDashboardBeforeBannerIconRender(arg) {
        const themeGroup = arg.iconsinformation.shift();
        const filterOverviewOption = arg.iconsinformation.shift();
        const refreshGroup = arg.iconsinformation.shift();
        if (this.embedOptions.dashboardSettings.showMoreOption == false || this.embedOptions.dashboardSettings.showExport == false || (this.embedOptions.exportSettings.showExcel == false && this.embedOptions.exportSettings.showImage == false && this.embedOptions.exportSettings.showPDF == false && this.embedOptions.exportSettings.showCSV == false)) {
            arg.iconsinformation = this._arraySlice(arg.iconsinformation, 'groupName', 'Option');
        }
        if (this.embedOptions.dashboardSettings.showDashboardParameter == false) {
            for (let i = filterOverviewOption.items.length - 1; i >= 0; i--) {
                if (!this._isNullOrUndefined(filterOverviewOption.items[`${i}`]) && filterOverviewOption.items[`${i}`][0].dataset['name'] == 'dashboardparameters') {
                    filterOverviewOption.items.splice(i, 1);
                }
            }
        }
        if (this.embedOptions.dashboardSettings.showRefresh == false) {
            refreshGroup.items.splice(0, 1);
        }
        const serverFnc = window[this.beforeBannerIconRenderFn];
        if (this.embedOptions.dashboardSettings.enableFullScreen) {
            const refreshAndFullScreen = {
                groupId: 'refresh-fullscreen',
                groupName: 'Refresh & FullScreen',
                enableGroupSeperator: true,
                items: [
                    this._createBannerIcon('<div/>', 'dashboard-refresh', 'e-dbrd-banner-refresh', 'Refresh', 'refreshdashboard', true, false, { 'display': 'none', 'font-size': '14px' }),
                    this._createBannerIcon('<div/>', 'dashboard-fullscreen', this.isFullscreen ? 'su su-minimize' : 'su su-maximize-1', 'Fullscreen', 'fullscreen', true, false, { 'font-size': '14px' })
                ]
            };
            arg.iconsinformation.unshift(refreshAndFullScreen);
        }
        if (refreshGroup.items.length > 0) {
            arg.iconsinformation.unshift(refreshGroup);
            arg.iconsinformation[0].enableGroupSeperator = this.embedOptions.dashboardSettings.enableFullScreen ? false : true;
        }
        if (filterOverviewOption.items.length > 0) {
            arg.iconsinformation.unshift(filterOverviewOption);
        }
        if (themeGroup.items.length > 0) {
            arg.iconsinformation.unshift(themeGroup);
        }
        if (serverFnc instanceof Function) {
            serverFnc.call(this, arg);
        }
        const clientFnc = window[this.embedOptions.dashboardSettings.beforeIconRender];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (this.embedOptions.dashboardSettings.beforeIconRender instanceof Function) {
            this.embedOptions.dashboardSettings.beforeIconRender.call(this, arg);
        }
        bbEmbed('<style type="text/css"> #dashboard-refresh { display: none !important} </style>').appendTo('head');
    }
    _createBannerIcon(tag, id, className, label, dataName, dataEvent, showText, css, href) {
        if (showText) {
            return bbEmbed(tag, {
                id: id,
                html: bbEmbed('<span/>', { 'class': 'icon-with-label', text: label, css: { 'font-family': 'Roboto', 'padding': '10px' } }),
                'class': 'server-banner-icon e-dashboard-banner-icon bbi-dbrd-designer-hoverable ' + className,
                'data-name': dataName,
                'data-event': dataEvent,
                'href': href,
                css: css
            });
        }
        else {
            return bbEmbed(tag, {
                id: id,
                'class': 'server-banner-icon e-dashboard-banner-icon bbi-dbrd-designer-hoverable ' + className,
                'data-tooltip': label,
                'data-name': dataName,
                'data-event': dataEvent,
                css: css
            });
        }
    }
    _onBoldBIDashboardBeforeOtherOptionContextMenuRender(arg) {
        if (this.embedOptions.dashboardSettings.showExport == false) {
            arg.iconsinformation = this._arraySlice(arg.iconsinformation, 'groupName', 'export');
        }
        const serverFnc = window[this.beforeOtherRenderFn];
        if (serverFnc instanceof Function) {
            serverFnc.call(this, arg);
        }
        const clientFnc = window[this.embedOptions.beforeContextMenuRender];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (this.embedOptions.beforeContextMenuRender instanceof Function) {
            this.embedOptions.beforeContextMenuRender.call(this, arg);
        }
    }
    _onBoldBIDashboardSaveFilter(arg) {
        const that = this;
        const SaveEvent = that.embedOptions.dashboardSettings.beforeSaveViewDialogOpen || that.embedOptions.dashboardSettings.saveFilterClick;
        const serverFnc = window[that.beforeSaveViewDialogOpenFn];
        if (serverFnc instanceof Function) {
            serverFnc.call(that, arg);
        }
        const clientFnc = window[`${SaveEvent}`];
        if (clientFnc instanceof Function) {
            clientFnc.call(that, arg);
        }
        if (SaveEvent instanceof Function) {
            SaveEvent.call(that, arg);
        }
        if (arg.cancel === false) {
            if (that.embedOptions.dashboardId == '' && that.embedOptions.dashboardIds == '') {
                console.error('Please provide DashboardId in BoldBI.Create().');
            }
            else {
                // If arg.viewId is defined, it will update the existing View; if undefined or null, it will create a new View.
                bbEmbed('body').find('#save_view_dialog_wrapper').remove();
                let dashboardId;
                if (that.embedOptions.dashboardIds && that.embedOptions.dashboardIds.length > 0) {
                    dashboardId = that.embedOptions.dashboardId = that._getActiveChildDashboardId();
                }
                else {
                    dashboardId = that.isMultiTab ? that._getActiveChildDashboardId() : that.embedOptions.dashboardId;
                }
                if (arg.viewId) {
                    const viewParameters = {
                        ViewId: arg.viewId,
                        DashboardId: dashboardId,
                        QueryString: arg.data.encryptedData
                    };
                    that.updateFilterView(viewParameters, function (view, message) {
                        console.log(message + ' and you can add custom functionalities using viewId: ' + view.ViewId);
                    });
                }
                else {
                    that._createSaveViewDialog(arg);
                }
            }
        }
    }
    _addSaveViewDialogStyles() {
        bbEmbed('<style type="text/css"> \
                    #save_view_dialog_header .su-view { float: left; padding-top: 5px; padding-right: 5px; font-size: 14px; color: var(--primary-text-normal-color); } \
                    #save_view_dialog_content { font-size: 12px; line-height: 1.4; } \
                    #save_view_dialog_header #save_view_dialog_header_title { color: var(--primary-text-normal-color);font-family: var(--font-family); font-size: 14px; padding-top: 5px; line-height: 15px; } \
                    #view_name_left_col { width: 25%; font-family: var(--font-family); font-size: 13px; float: left; text-align: right; margin: 5px 0px; } \
                    #view_name_right_col { width: 61%; float: left; margin-left: 50px; } \
                    #view_name_divison {height: 50px} \
                    #default_view_divison {height: 50px} \
                    #default_view_left {width: 25%; font-size: 13px; font-family: var(--font-family); float: left; text-align: right; margin: 5px 0px;} \
                    #default_view_right { width: 61%; float: left; margin-left: 50px; margin-top:5px; margin-bottom:5px} \
                    #view_name_textbox { width: 100%; border: 1px solid var(--secondary-border-color); padding: 6px 12px; color: var(--primary-text-normal-color); background: var(--primary-background-color); font-size: 12px; } \
                    #view_name_textbox:focus { border-color: var(--primary-branding-border-color)!important; } \
                    #cancel_button:hover { background: var(--secondary-btn-bg-hover-color); border: 1px solid var(--secondary-btn-border-normal-color); color: var(--secondary-btn-text-hover-color); } \
                    #save_button:hover { background: var(--primary-btn-bg-hover-color); border: 1px solid var(--primary-btn-border-normal-color); color: var(--primary-btn-text-hover-color) !important; } \
                    #save_view_dialog_footer { padding: 10px 15px; border-top: 1px solid var(--secondary-border-color); background: var(--secondary-background-color); } \
                    #save_view_dialog .e-dlg-closeicon-btn { margin-right: 5px; padding: 5px 0px; width: 15px; height: 20px; } \
                    #save_view_dialog .e-dlg-closeicon-btn .e-icon-dlg-close { font-size: 10px; color: var(--hyper-link-hover-color); } \
                    #save_view_dialog .e-dlg-closeicon-btn:hover, #save_view_dialog .e-dlg-closeicon-btn { background: var(--primary-background-color); } \
                    #save_view_dialog .e-dlg-content { background: var(--primary-background-color); color: var(--primary-text-normal-color); padding-bottom: 25px; } \
                    #view_name_err_msg { display: none; color: #ff3b30; font-size: 12px; } \
                    #cancel_button { background: var(--secondary-btn-bg-normal-color); border: 1px solid var(--secondary-btn-border-normal-color); color: var(--secondary-text-normal-color); font-family: var(--font-family);} \
                    #save_button { margin-right: 15px; background: var(--primary-btn-bg-normal-color); border: 1px solid var(--primary-btn-border-normal-color); color: var(--primary-btn-text-normal-color); font-family: var(--font-family); } \
                    #save_view_dialog .e-dlg-header-content { padding: 10px 15px; height: 40px; background: var(--primary-background-color); color: var(--primary-text-normal-color); } \
                    #save_view_dialog { background: var(--primary-background-color); } \
                    .footer-button-class { border-radius: 4px; display: inline-block; cursor: pointer; font-size: 12px; float: right; font-weight: 600; height: 32px; line-height: 18px; min-width: 90px; outline: 0; text-align: center; padding: 6px 20px; } \
                    .e-dlg-overlay { position: fixed; } \
                    .viewname-textbox-error { border: 1px solid #ff3b30 !important; } \
                    .default_view_switch {position: relative;display: inline-block;width: 28px; /* Width of the switch */height: 16px; /* Height of the switch margin-top: */}\
                    .default_view_switch input {  display: none;}\
                    .default_view_slider {position: absolute;cursor: pointer;top: 0;left: 0;right: 0;bottom: 0;background-color: var(--material-switch-background-bg-normal-color); border: 1px solid var(--secondary-btn-border-normal-color); -webkit-transition: .4s;transition: .4s;border-radius: 16px; /* Half of the height for a round shape */}\
                    .default_view_slider:before { position: absolute; content: ""; height: 9px; /* Height minus border width */width: 9px; /* Height minus border width */top: 3px; /* (Width - Height) / 2 to center it horizontally */ bottom: 3px; /* (Height - Height) / 2 to center it vertically  */left:2px; background-color: var(--material-switch-foreground-bg-normal-color); -webkit-transition: .4s; transition: .4s; border-radius: 50%; }\
                    .default_view_slider:hover {border: 1px solid var(--hover-icon-color);}\
                    input:checked + .default_view_slider { background-color: var(--primary-branding-color); border-color:var(--primary-branding-border-color);}\
                    input:focus + .default_view_slider {  box-shadow: 0 0 0.5px #2196F3;}\
                    input:checked + .default_view_slider:before {-webkit-transform: translateX(17.5px); /* Half of the width minus half of the height */-ms-transform: translateX(17.5px);transform: translateX(13.5px);background-color: white;}\
                    #info-icon {padding-left: 15px; cursor: pointer; font-size: 12px;} \
                    .su-info:before {content: \u24D8;}\
                    .tooltip {position: relative;display: inline-block;}\
                    .tooltip .tooltiptext {visibility: hidden;font-size: 11.8px;width: 320px;background: var(--primary-background-color);font-family: var(--font-family);color: var(--primary-text-normal-color);text-align: left;border-radius: 6px;padding: 5px;position: absolute;z-index: 1;top:130%;left:270%;margin-left:-60px; opacity: 0;transition: opacity 0.3s; border: 1px solid var(--secondary-border-color); box-shadow: 0 6px 12px rgba(0,0,0,.175)}\
                    .tooltip:hover .tooltiptext {visibility: visible;opacity: 1;}\
                    </style > ').appendTo('head');
    }
    _createSaveViewDialog(args) {
        const that = this;
        that._addSaveViewDialogStyles();
        const saveViewDialogWrapper = bbEmbed('<div>')
            .attr('id', 'save_view_dialog_wrapper')
            .appendTo('body');
        const saveViewDialog = bbEmbed('<div>')
            .attr('id', 'save_view_dialog')
            .appendTo(saveViewDialogWrapper);
        const saveViewHeader = '<div id="save_view_dialog_header">' +
            '<span class="su su-view"></span>' +
            '<div id="save_view_dialog_header_title">Save View</div>' +
            '</div>';
        const saveViewContent = `
            <div id='save_view_dialog_content'>
                <div id = "view_name_divison">
                    <label id='view_name_left_col'>Name*</label>
                    <div id='view_name_right_col'>
                        <input type='text' id='view_name_textbox' data-query='${args.data.encryptedData}' data-id='${args.viewId}'>
                        <span id='view_name_err_msg'></span>
                    </div>
                </div>
                <div id="default_view_divison">
                <label class="text-label" id="default_view_left">Mark as Default</label>
                    <div id='default_view_right'>
                        <label class="default_view_switch">
                            <input type="checkbox" id="default_view_checkbox">
                            <span class="default_view_slider"></span>
                        </label>
                        <div class="tooltip">
                            <div class="su su-info bbi-dbrd-designer-hoverable" id="info-icon" data-tooltip></div>
                            <div class="tooltiptext" id="tooltip-text"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        const saveViewFooter = bbEmbed('<div>')
            .attr('id', 'save_view_dialog_footer');
        const saveButton = bbEmbed('<button>')
            .attr('id', 'save_button')
            .addClass('footer-button-class')
            .text('Save').on('click', () => that._saveFilterView(that));
        const cancelButton = bbEmbed('<button>')
            .attr('id', 'cancel_button')
            .addClass('footer-button-class')
            .text('Cancel')
            .on('click', function () {
                bbEmbed('body').find('#save_view_dialog_wrapper, #success_save_view_dialog_wrapper').remove();
            });
        saveViewFooter.append(cancelButton);
        saveViewFooter.append(saveButton);
        saveViewDialog.append(saveViewFooter);
        const saveViewDialogObj = new window.ejdashboard.popups.Dialog({
            header: saveViewHeader,
            width: '600px',
            isModal: true,
            showCloseIcon: true,
            target: saveViewDialogWrapper[0],
            content: saveViewContent
        });
        saveViewDialogObj.appendTo('#save_view_dialog');
        document.getElementById('view_name_textbox').addEventListener('input', function () {
            that._viewNameValidation();
        });
        const tooltipIcon = document.getElementById('info-icon');
        const tooltipText = document.getElementById('tooltip-text');
        let infoMessage;
        tooltipIcon.addEventListener('mouseover', function () {
            tooltipText.textContent = infoMessage;
        });
        tooltipIcon.addEventListener('mouseout', function () {
            tooltipText.textContent = ''; // Clear the tooltip when mouse leaves
        });
        if (!this.isDefaultView) {
            document.getElementById('default_view_checkbox').checked = false;
            document.getElementById('default_view_checkbox').disabled = true;
            infoMessage = 'Based on your Dashboard Settings in Bold BI, these filters will be applied by default when next time render the Dashboard.';
        }
        else {
            document.getElementById('default_view_checkbox').checked = true;
            infoMessage = 'If enabled, the current view will be set as your default view for this dashboard.';
        }
    }
    _saveFilterView(dbrdInstance) {
        const that = dbrdInstance;
        const inputElement = bbEmbed('#view_name_textbox')[0];
        if (that._viewNameValidation()) {
            let activeChildDashboardId;
            if (!this.embedOptions.dashboardIds) {
                activeChildDashboardId = that.isMultiTab ? that._getActiveChildDashboardId() : '';
            }
            const viewName = inputElement.value;
            const queryString = inputElement.getAttribute('data-query');
            const viewId = inputElement.getAttribute('data-id');
            const viewParameters = {
                ViewName: viewName,
                ItemId: that.embedOptions.dashboardId,
                QueryString: queryString,
                ChildItemId: activeChildDashboardId,
                IsDefault: document.getElementById('default_view_checkbox').checked ? true : false
            };
            const saveFilterViewCallback = (responseViewInfo) => {
                if (responseViewInfo) {
                    bbEmbed('body').find('#save_view_dialog_wrapper').remove();
                }
                else {
                    that._viewNameValidation(true);
                }
            };
            if (viewId === 'null') {
                that.saveFilterView(viewParameters, saveFilterViewCallback);
            }
            else {
                that.saveAsFilterView(viewParameters, saveFilterViewCallback);
            }
        }
    }
    _updateInFilterOverviewUI(viewName, viewId) {
        let dashboardInstance = {};
        if (this.isMultiTab) {
            dashboardInstance = window.bbEmbed('.e-content .e-active').find('.bbembed-multitab-dbrd').data('BoldBIDashboardDesigner');
        }
        else {
            dashboardInstance = this._getDashboardInstance();
        }
        if (dashboardInstance) {
            dashboardInstance._updateFilterOverview(viewName, viewId);
        }
    }
    _viewNameValidation(isExistingView) {
        const textBox = bbEmbed('#view_name_textbox');
        const errorMessage = bbEmbed('#view_name_err_msg');
        const specialCharsRegex = /^[a-zA-Z0-9!@$^ ()_=\-}{.`~]*$/;
        const containsSpecialChars = !(specialCharsRegex.test(textBox.val()));
        const isEmptyString = this._isEmptyOrSpaces(textBox[0].value);
        if (isExistingView || containsSpecialChars || isEmptyString) {
            errorMessage.css({ 'display': 'block', 'font-family': 'var(--font-family)' })
                .text(isExistingView ? 'View Name Already Exists' :
                    containsSpecialChars ? 'Please avoid special characters' :
                        isEmptyString ? 'Please enter the view name' : '');
            textBox.addClass('viewname-textbox-error');
            return false;
        }
        else {
            errorMessage.css('display', 'none').text();
            textBox.removeClass('viewname-textbox-error');
            return true;
        }
    }
    _getActiveChildDashboardId() {
        const regex = /^([\da-f]{8})([\da-f]{4})([\da-f]{4})([\da-f]{4})([\da-f]{12})$/;
        const activeChildDashboardId = window.bbEmbed('.e-content .e-active').find('.bbembed-multitab-dbrd').data('BoldBIDashboardDesigner')._id.split('_')[1].replace(regex, '$1-$2-$3-$4-$5');
        return activeChildDashboardId;
    }
    _getParametersFromQueryString(queryString) {
        const filterQuery = JSON.parse(decodeURIComponent(queryString).split('filterQuery=')[1]);
        return filterQuery.map((query) => {
            const columnName = query.dimfi && !query.dimfi.c.toLowerCase().includes('include') ? `${query.cn} (${query.dimfi.c})` : query.cn;
            const columnValues = query.dimfi ? query.dimfi.t : query.idf.dfl;
            return {
                name: columnName,
                values: columnValues
            };
        });
    }
    _onBoldBIDashboardSaveAsFilter(arg) {
        const that = this;
        const saveAsEvent = this.embedOptions.dashboardSettings.beforeSaveAsViewDialogOpen || this.embedOptions.dashboardSettings.saveAsFilterClick;
        const serverFnc = window[this.beforeSaveAsViewDialogOpenFn];
        if (serverFnc instanceof Function) {
            serverFnc.call(this, arg);
        }
        const clientFnc = window[`${saveAsEvent}`];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (saveAsEvent instanceof Function) {
            saveAsEvent.call(this, arg);
        }
        if (arg.cancel === false) {
            if (that.embedOptions.dashboardId == '') {
                console.error('Please provide DashboardId in BoldBI.create().');
            }
            else {
                bbEmbed('body').find('#save_view_dialog_wrapper').remove();
                that._createSaveViewDialog(arg);
            }
        }
    }
    _onBoldBIDashboardOpenViewSection(arg) {
        const that = this;
        const viewSavedEvent = that.embedOptions.dashboardSettings.onViewSavedFiltersClick || that.embedOptions.dashboardSettings.viewSavedFiltersClick;
        const serverFnc = window[that.onViewSavedFiltersClickFn];
        const itemId = this.isMultiTab ? this._getActiveChildDashboardId() : this.embedOptions.dashboardId;
        this.getViewsByDashboardId(itemId, function (viewInfos) {
            arg.viewInfos = viewInfos;
        });
        if (serverFnc instanceof Function) {
            serverFnc.call(that, arg);
        }
        const clientFnc = window[`${viewSavedEvent}`];
        if (clientFnc instanceof Function) {
            clientFnc.call(that, arg);
        }
        if (viewSavedEvent instanceof Function) {
            viewSavedEvent.call(that, arg);
        }
    }
    _onBoldBIDashboardBannerIconClick(arg) {
        if (arg.name.toLowerCase() == 'fullscreen') {
            this._switchFullscreenMode(arg);
        }
        if (arg.name.toLowerCase() == 'refreshdashboard') {
            if (this.isMultiTab) {
                const dashboardInstance = window.bbEmbed('.e-content .e-active').find('.bbembed-multitab-dbrd').data('BoldBIDashboardDesigner');
                dashboardInstance.updateDashboard();
            }
            else {
                const dashboardInstance = this._getDashboardInstance();
                dashboardInstance.updateDashboard();
            }
        }
        if (arg.name.toLowerCase() == 'dashboardparameters') {
            const styleElement = document.createElement('style');
            styleElement.innerHTML = '.remove-scroller-dashboard-parameter { width: 100% !important; height: 100% !important; color: #333; background: #fff; border-radius: 0; }';
            document.head.appendChild(styleElement);
            const that = this;
            setTimeout(function () {
                const dashboardInstance = that.isMultiTab ? window.bbEmbed('.e-content .e-active').find('.bbembed-multitab-dbrd').data('BoldBIDashboardDesigner') : that._getDashboardInstance();
                bbEmbed('#' + dashboardInstance._id + '_dashboardparameter_dialog').addClass('remove-scroller-dashboard-parameter');
            }, 50);
        }
        const serverFnc = window[this.onBannerIconClickFn];
        if (serverFnc instanceof Function) {
            serverFnc.call(this, arg);
        }
        const clientFnc = window[this.embedOptions.dashboardSettings.onIconClick];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (this.embedOptions.dashboardSettings.onIconClick instanceof Function) {
            this.embedOptions.dashboardSettings.onIconClick.call(this, arg);
        }
        if (typeof (arg.name) != 'undefined' && arg.name.toLowerCase() == 'theming') {
            let embedId;
            if (this.isMultiTab) {
                this.multiTabTheme = arg.selectedTheme;
                const dashboadInstance = window.bbEmbed('.e-content .e-active').find('.bbembed-multitab-dbrd').data('BoldBIDashboardDesigner');
                dashboadInstance.applyDashboardTheme(arg.selectedTheme);
                this.setDefaultTheme(dashboadInstance.modules.themeHelper.getBannerBackground(), dashboadInstance.modules.themeHelper.getBannerTextColor(), dashboadInstance.modules.themeHelper.getBannerIconColor());
                const dashboardContainer = window.bbEmbed('#' + this.embedOptions.embedContainerId).find('.e-content .bbembed-multitab-dbrd');
                for (let i = 0; i < dashboardContainer.length; i++) {
                    if (window.bbEmbed(window.bbEmbed('.e-content .e-active').find('.bbembed-multitab-dbrd')).attr('id') != window.bbEmbed(dashboardContainer[`${i}`]).attr('id')) {
                        const embedId = window.bbEmbed(dashboardContainer[`${i}`]).attr('id');
                        const dashboardViewerInstance = this._getDashboardInstance(embedId);
                        if (dashboardViewerInstance != undefined) {
                            dashboardViewerInstance.applyDashboardTheme(arg.selectedTheme);
                        }
                    }
                }
            }
            else {
                const dashboardViewerInstance = this._getDashboardInstance(embedId);
                dashboardViewerInstance.applyDashboardTheme(arg.selectedTheme);
            }
        }
    }
    getComments(commentType, args, callBackFn) {
        const that = this;
        const data = {
            'ItemId': commentType == 'dashboard' ? args.dashboardId : args.widgetId,
            'DashboardItemId': commentType == 'dashboard' ? ((this.isMultiTab ? args.multitabDashboardId : args.dashboardId)) : (args.dashboardId),
            'ItemType': commentType,
            'ParentItemId': this.isMultiTab ? args.multitabDashboardId : null,
            'CommentAction': 3,
            'OrderBy': 1 //To get the comment in decending order (newly added first).
        };
        bbEmbed.ajax({
            async: false,
            type: 'POST',
            url: this.dashboardServerApiUrl + '/comments/operation',
            headers: {
                'Authorization': 'bearer ' + this.accessToken
            },
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (result) {
                if (result.Status) {
                    if (commentType == 'dashboard') {
                        that.commentsArgs['Comments'] = result.Comments;
                        that.commentsArgs['ActiveCommentsCount'] = result.ActiveCommentsCount;
                        that.commentsArgs['SortBy'] = 1;
                        that.commentsArgs['DashboardId'] = result.ItemId;
                        if (window[`${callBackFn}`] instanceof Function) {
                            window[`${callBackFn}`].call(that, that.commentsArgs);
                        }
                        else {
                            callBackFn.call(that, that.commentsArgs);
                        }
                    }
                    else if (commentType == 'widget') {
                        const widgetContainer = bbEmbed('[data-widget-id=' + args.widgetId + ']');
                        const widgetId = widgetContainer[0].id;
                        const widgetContanierWidth = bbEmbed('#' + widgetId).width();
                        const positionX = widgetContainer.offset().left + widgetContanierWidth;
                        const positionY = widgetContainer.offset().top;
                        let right = bbEmbed(window).width() - (positionX + 350);
                        if (right < 0) {
                            right = bbEmbed(window).width() - (positionX - (bbEmbed(window).width() < 450 ? 0 : 75));
                            if (bbEmbed(window).width() < 375) {
                                right = 0;
                            }
                        }
                        that.commentsArgs['Comments'] = result.Comments;
                        that.commentsArgs['Position'] = { 'top': positionY + 20, 'right': right + 40 };
                        that.commentsArgs['ActiveCommentsCount'] = result.ActiveCommentsCount;
                        that.commentsArgs['SortBy'] = 1;
                        that.commentsArgs['WidgetId'] = args.widgetId;
                        that.commentsArgs['DashboardId'] = args.dashboardId;
                        if (window[`${callBackFn}`] instanceof Function) {
                            window[`${callBackFn}`].call(that, that.commentsArgs);
                        }
                        else {
                            callBackFn.call(that, that.commentsArgs);
                        }
                    }
                }
            },
            error: function (jqXHR) { that.ajaxErrorFnc(jqXHR); }
        });
    }
    /**
     * @param {object} arg - It is an object that holds 'content' - Defines the comment you want to add, 'dashboardId" -Defines the unique id of the dashboard,"parentCommentId" Defines the comment Id of the comment for which the reply comment is to be added. It should be defined only when adding a reply to the dashboard comment. For other cases, it should be null,"multitabDashboardId"Defines the unique id of the multitab dashboard. It should be defined only when adding a multitab dashboard comment. For other cases, it should be null.
     * @param {string} arg.content - Defines the comment you want to add to the dashboard.
     * @param {string} arg.dashboardId - Define the unique id of the dashboard.
     * @param {string} arg.multitabDashboardId - Defines the unique id of the multitab dashboard
     * @param {string} arg.parentCommentId - Defines the comment Id of the comment for which the reply comment is to be added. It should be defined only when adding a reply to the Dashboard comment. For other cases, it should be null.
     * @param {string} callBackFn - It denotes the callback method name that must be defined. It would returns the updated comments as arguments.
     */
    addDashboardComment(arg, callBackFn) {
        const that = this;
        const regex = /^(?:\{{0,1}(?:[0-9a-fA-F]){8}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){12}\}{0,1})$/;
        const isGuidDbrd = regex.exec(arg.dashboardId);
        const isGuidMultiDbrd = arg.multitabDashboardId ? (regex.exec(arg.multitabDashboardId) ? true : false) : true;
        const isReplyCmtId = arg.parentCommentId ? (Number(arg.parentCommentId) ? true : false) : true;
        if (isGuidDbrd && isGuidMultiDbrd && isReplyCmtId && !this._isEmptyOrSpaces(arg.content)) {
            const isoStr = new Date().toISOString();
            const data = {
                'ItemType': 'dashboard',
                'Comment': arg.content,
                'ItemId': arg.dashboardId,
                'ParentId': arg.parentCommentId,
                'ParentItemId': arg.multitabDashboardId,
                'CommentAction': 0,
                'CurrentDate': isoStr,
                'Url': this.dashboardUrl
            };
            bbEmbed.ajax({
                async: false,
                type: 'POST',
                url: this.dashboardServerApiUrl + '/comments/operation',
                headers: {
                    'Authorization': 'bearer ' + this.accessToken
                },
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function (result) {
                    if (result.Status) {
                        that.getComments('dashboard', arg, callBackFn);
                    }
                },
                error: function (jqXHR) { that.ajaxErrorFnc(jqXHR); }
            });
        }
        else {
            if (!isGuidDbrd || !isGuidMultiDbrd) {
                console.error('Please provide valid dashboard ID.');
            }
            else if (!isReplyCmtId) {
                console.error('Please provide a valid reply comment Id.');
            }
            else if (this._isEmptyOrSpaces(arg.content)) {
                console.error('Please provide valid comment text.');
            }
        }
    }
    /**
     * @param {object} arg - It is an object that holds 'content' - Defines the comment you want to add,'widgetId' - Defines the unique id of the widget,"dashboardId" -Defines the unique id of the dashboard,"parentCommentId" - Defines the comment Id of the comment for which the reply comment is to be added. It should be defined only when adding a reply to the widget comment. For other cases, it should be null,"multitabDashboardId"- Defines the unique id of the multitab dashboard. It should be defined only when adding a multitab widget comment. For other cases, it should be null.
     * @param {string} arg.content - Defines the comment you want to add to the Widget.
     * @param {string} arg.widgetId - Defines the unique id of the widget
     * @param {string} arg.dashboardId - Defines the unique id of the dashboard
     * @param {string} arg.parentCommentId - Defines the comment Id of the comment for which the reply comment is to be added. It should be defined only when adding a reply to the widget comment. For other cases, it should be null.
     * @param {string} arg.multitabDashboardId - Defines the unique id of the multitab dashboard. It should be defined only when adding a multitab widget comment. For other cases, it should be null.
     * @param {string} callBackFn -  It denotes the callback method name that must be defined. It would returns the updated comments as arguments.
     */
    addWidgetComment(arg, callBackFn) {
        const that = this;
        const regex = /^(?:\{{0,1}(?:[0-9a-fA-F]){8}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){12}\}{0,1})$/;
        const isGuidDbrd = regex.exec(arg.dashboardId);
        const isGuidWidget = regex.exec(arg.widgetId);
        const isGuidMultiDbrd = arg.multitabDashboardId ? (regex.exec(arg.multitabDashboardId) ? true : false) : true;
        const isReplyCmtId = arg.parentCommentId ? (Number(arg.parentCommentId) ? true : false) : true;
        if (isGuidWidget && isGuidDbrd && isGuidMultiDbrd && isReplyCmtId && !this._isEmptyOrSpaces(arg.content)) {
            const isoStr = new Date().toISOString();
            const data = {
                'ItemType': 'widget',
                'Comment': arg.content,
                'ItemId': arg.widgetId,
                'DashboardItemId': arg.dashboardId,
                'ParentId': arg.parentCommentId,
                'ParentItemId': arg.multitabDashboardId,
                'CommentAction': 0,
                'CurrentDate': isoStr,
                'Url': this.dashboardUrl
            };
            bbEmbed.ajax({
                async: false,
                type: 'POST',
                url: this.dashboardServerApiUrl + '/comments/operation',
                headers: {
                    'Authorization': 'bearer ' + this.accessToken
                },
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function (result) {
                    if (result.Status) {
                        that.getComments('widget', arg, callBackFn);
                    }
                },
                error: function (jqXHR) { that.ajaxErrorFnc(jqXHR); }
            });
        }
        else {
            if (!isGuidDbrd || !isGuidMultiDbrd || !isGuidWidget) {
                console.error('Please provide valid dashboard or widget ID.');
            }
            else if (!isReplyCmtId) {
                console.error('Please provide a valid reply comment Id.');
            }
            else if (this._isEmptyOrSpaces(arg.content)) {
                console.error('Please provide valid comment text.');
            }
        }
    }
    /**
     * @param {object} arg - It is an object that holds "commentId" - Defines the comment Id of the comment you want to delete,"dashboardId" - Defines the unique dashboard Id,"multitabDashboardId" - Defines the unique id of the multitab dashboard. It should be defined only when deleting a multitab dashboard comment. For other cases, it should be null.
     * @param {string} arg.commentId - Defines the comment Id of the comment you want to delete in the dashboard.
     * @param {string} arg.dashboardId - Defines the unique dashboard Id
     * @param {string} arg.multitabDashboardId - Defines the unique id of the multitab dashboard
     * @param {string} callBackFn - It denotes the callback method name that must be defined. It would returns the updated comments as arguments.
     */
    deleteDashboardComment(arg, callBackFn) {
        const that = this;
        const regex = /^(?:\{{0,1}(?:[0-9a-fA-F]){8}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){12}\}{0,1})$/;
        const isGuidDbrd = regex.exec(arg.dashboardId);
        const isGuidMultiDbrd = arg.multitabDashboardId ? (regex.exec(arg.multitabDashboardId) ? true : false) : true;
        if (isGuidDbrd && isGuidMultiDbrd && !this._isEmptyOrSpaces(arg.commentId)) {
            const isoStr = new Date().toISOString();
            const data = {
                'ItemType': 'dashboard',
                'CommentId': arg.commentId,
                'ItemId': arg.dashboardId,
                'ParentItemId': arg.multitabDashboardId,
                'CommentAction': 2,
                'CurrentDate': isoStr,
                'Url': this.dashboardUrl
            };
            bbEmbed.ajax({
                async: false,
                type: 'POST',
                url: this.dashboardServerApiUrl + '/comments/operation',
                headers: {
                    'Authorization': 'bearer ' + this.accessToken
                },
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function (result) {
                    if (result.Status) {
                        that.getComments('dashboard', arg, callBackFn);
                    }
                },
                error: function (jqXHR) { that.ajaxErrorFnc(jqXHR); }
            });
        }
        else {
            if (!isGuidDbrd || !isGuidMultiDbrd) {
                console.error('Please provide valid dashboard ID.');
            }
            else if (this._isEmptyOrSpaces(arg.commentId)) {
                console.error('Please provide a valid comment Id.');
            }
        }
    }
    /**
     * @param {object} arg - It is an object that holds "commentId" - It defines the comment Id of the comment that you want to delete,"widgetId" -Defines the unique widget Id,"dashboardId" -Defines the unique id of the dashboard,"multitabDashboardId" - Defines the unique id of the multitab dashboard. It should be defined only when deleting a multitab widget comment. For other cases, it should be null.
     * @param {string} arg.commentId - It defines the comment Id of the comment that you want to delete in the widget
     * @param {string} arg.widgetId - Defines the unique widget Id
     * @param {string} arg.dashboardId - Defines the unique id of the dashboard
     * @param {string} arg.multitabDashboardId - Defines the unique id of the multitab dashboard
     * @param {string} callBackFn -  It denotes the callback method name that must be defined. It would returns the updated comments as arguments.
     */
    deleteWidgetComment(arg, callBackFn) {
        const that = this;
        const regex = /^(?:\{{0,1}(?:[0-9a-fA-F]){8}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){12}\}{0,1})$/;
        const isGuidDbrd = regex.exec(arg.dashboardId);
        const isGuidWidget = regex.exec(arg.widgetId);
        const isGuidMultiDbrd = arg.multitabDashboardId ? (regex.exec(arg.multitabDashboardId) ? true : false) : true;
        if (isGuidWidget && isGuidDbrd && isGuidMultiDbrd && !this._isEmptyOrSpaces(arg.commentId)) {
            const isoStr = new Date().toISOString();
            const data = {
                'ItemType': 'widget',
                'CommentId': arg.commentId,
                'ItemId': arg.widgetId,
                'DashboardItemId': arg.dashboardId,
                'ParentItemId': arg.multitabDashboardId,
                'CommentAction': 2,
                'CurrentDate': isoStr,
                'Url': this.dashboardUrl
            };
            bbEmbed.ajax({
                async: false,
                type: 'POST',
                url: this.dashboardServerApiUrl + '/comments/operation',
                headers: {
                    'Authorization': 'bearer ' + this.accessToken
                },
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function (result) {
                    if (result.Status) {
                        that.getComments('widget', arg, callBackFn);
                    }
                },
                error: function (jqXHR) { that.ajaxErrorFnc(jqXHR); }
            });
        }
        else {
            if (!isGuidDbrd || !isGuidMultiDbrd || !isGuidWidget) {
                console.error('Please provide valid dashboard or widget ID.');
            }
            else if (this._isEmptyOrSpaces(arg.commentId)) {
                console.error('Please provide a valid comment Id.');
            }
        }
    }
    /**
     * @param {object} arg - It is an object that holds "content" - Defines the comment you have edited,"commentId" - Defines the comment Id of the comment you have edited,"dashboardId" - Defines the unique dashboard Id,"multitabDashboardId" - Defines the unique id of the multitab dashboard. It should be defined only when editing a multitab widget comment. For other cases, it should be null.
     * @param {string} arg.content - Defines the comment you have to edited in the dashboard
     * @param {string} arg.commentId - Defines the comment Id of the comment you have to edit
     * @param {string} arg.dashboardId - Defines the unique id of the dashboard
     * @param {string} arg.multitabDashboardId - Defines the unique id of the multitab dashboard
     * @param {string} callBackFn -  It denotes the callback method name that must be defined. It would returns the updated comments as arguments.
     */
    editDashboardComment(arg, callBackFn) {
        const that = this;
        const regex = /^(?:\{{0,1}(?:[0-9a-fA-F]){8}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){12}\}{0,1})$/;
        const isGuidDbrd = regex.exec(arg.dashboardId);
        const isGuidMultiDbrd = arg.multitabDashboardId ? (regex.exec(arg.multitabDashboardId) ? true : false) : true;
        if (isGuidDbrd && isGuidMultiDbrd && !this._isEmptyOrSpaces(arg.content) && !this._isEmptyOrSpaces(arg.commentId)) {
            const isoStr = new Date().toISOString();
            const data = {
                'ItemType': 'dashboard',
                'Comment': arg.content,
                'CommentId': arg.commentId,
                'ItemId': arg.dashboardId,
                'ParentItemId': arg.multitabDashboardId,
                'CommentAction': 1,
                'CurrentDate': isoStr,
                'Url': this.dashboardUrl
            };
            bbEmbed.ajax({
                async: false,
                type: 'POST',
                url: this.dashboardServerApiUrl + '/comments/operation',
                headers: {
                    'Authorization': 'bearer ' + this.accessToken
                },
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function (result) {
                    if (result.Status) {
                        that.getComments('dashboard', arg, callBackFn);
                    }
                },
                error: function (jqXHR) { that.ajaxErrorFnc(jqXHR); }
            });
        }
        else {
            if (!isGuidDbrd || !isGuidMultiDbrd) {
                console.error('Please provide valid dashboard ID.');
            }
            else if (this._isEmptyOrSpaces(arg.commentId)) {
                console.error('Please provide a valid comment Id.');
            }
            else if (this._isEmptyOrSpaces(arg.content)) {
                console.error('Please provide valid comment text.');
            }
        }
    }
    /**
     * @param {object} arg - It is an object that holds,"content" - Defines the comment you have edited,"commentId" - Defines the comment Id of the comment you have edited,"widgetId" - Defines the unique widget Id,"dashboardId" - Defines the unique id of the dashboard,"multitabDashboardId" - Defines the unique id of the multitab dashboard. It should be defined only when editing a multitab dashboard comment or widget comment. For other cases, it should be null.
     * @param {string} arg.content - Defines the comment you have edited
     * @param {string} arg.commentId - Defines the comment Id of the comment you have edited
     * @param {string} arg.widgetId - Defines the unique widget Id
     * @param {string} arg.dashboardId - Defines the unique id of the dashboard
     * @param {string} arg.multitabDashboardId - Defines the unique id of the multitab dashboard
     * @param {string} callBackFn - It denotes the callback method name that must be defined. It would returns the updated comments as arguments.
     */
    editWidgetComment(arg, callBackFn) {
        const that = this;
        const regex = /^(?:\{{0,1}(?:[0-9a-fA-F]){8}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){12}\}{0,1})$/;
        const isGuidDbrd = regex.exec(arg.dashboardId);
        const isGuidWidget = regex.exec(arg.widgetId);
        const isGuidMultiDbrd = arg.multitabDashboardId ? (regex.exec(arg.multitabDashboardId) ? true : false) : true;
        if (isGuidWidget && isGuidDbrd && isGuidMultiDbrd && !this._isEmptyOrSpaces(arg.content) && !this._isEmptyOrSpaces(arg.commentId)) {
            const isoStr = new Date().toISOString();
            const data = {
                'ItemType': 'widget',
                'Comment': arg.content,
                'CommentId': arg.commentId,
                'ItemId': arg.widgetId,
                'DashboardItemId': arg.dashboardId,
                'ParentItemId': arg.multitabDashboardId,
                'CommentAction': 1,
                'CurrentDate': isoStr,
                'Url': this.dashboardUrl
            };
            bbEmbed.ajax({
                async: false,
                type: 'POST',
                url: this.dashboardServerApiUrl + '/comments/operation',
                headers: {
                    'Authorization': 'bearer ' + this.accessToken
                },
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function (result) {
                    if (result.Status) {
                        that.commentsArgs['StatusMessage'] = result.StatusMessage;
                        that.getComments('widget', arg, callBackFn);
                    }
                },
                error: function (jqXHR) { that.ajaxErrorFnc(jqXHR); }
            });
        }
        else {
            if (!isGuidDbrd || !isGuidMultiDbrd || !isGuidWidget) {
                console.error('Please provide valid dashboard or widget ID.');
            }
            else if (this._isEmptyOrSpaces(arg.commentId)) {
                console.error('Please provide a valid comment Id.');
            }
            else if (this._isEmptyOrSpaces(arg.content)) {
                console.error('Please provide valid comment text.');
            }
        }
    }
    ajaxErrorFnc(jqXHR) {
        let msg = '';
        if (jqXHR.status == 0) {
            msg = 'Not connected. Please check the network.';
        }
        else if (jqXHR.status == 404) {
            if (jqXHR.statusText == 'Not Found') {
                msg = 'The view id is not found. Please provide valid view id';
            }
            else {
                msg = 'The requested page was not found (404).';
            }
        }
        else if (jqXHR.status == 500) {
            msg = 'There is an Internal Server Error (500).';
        }
        else {
            msg = 'Uncaught Error occurred.' + jqXHR.responseText;
        }
        if (!this._isNullOrUndefined(this.embedOptions.onError) && this.embedOptions.onError != '') {
            this.onErrorClient(msg);
        }
        else {
            console.error(msg);
        }
    }
    setDefaultTheme(bgColor, textColor, iconColor) {
        bbEmbed('.e-tab-header.e-control.e-toolbar.e-lib.e-keyboard').css('color', iconColor);
        bbEmbed('.e-toolbar-item .e-tab-text').css('color', textColor);
        bbEmbed('.e-toolbar-item.e-active .e-tab-text').addClass('active-font-color');
        bbEmbed('.multitab-dbrd').css('background', bgColor);
        bbEmbed('.e-items.e-toolbar-items.e-lib.e-hscroll.e-control.e-touch .e-nav-arrow').css('color', iconColor);
    }
    _switchFullscreenMode(arg) {
        const embedElement = document.getElementById(arg.target.parent().attr('id').split('_embeddedbi')[0]);
        this.isFullscreen = false;
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
            if (embedElement.requestFullscreen) {
                embedElement.requestFullscreen();
            }
            else if (embedElement.msRequestFullscreen) {
                embedElement.msRequestFullscreen();
            }
            else if (embedElement.mozRequestFullScreen) {
                embedElement.mozRequestFullScreen();
            }
            else if (embedElement.webkitRequestFullscreen) {
                embedElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
            else {
                if ('ActiveXObject' in window) {
                    const wscript = new ActiveXObject('Wscript.shell');
                    wscript.SendKeys('{F11}');
                    setTimeout(function () {
                        if ((screen.availHeight || screen.height - 30) <= window.innerHeight) {
                            bbEmbed('<style id="embed-fullscreen" type="text/css"> .hide-dashboard-icons #dashboard-refresh {  display: block !important; } .hide-dashboard-icons ul.options, .hide-dashboard-icons .su-pin, .hide-dashboard-icons .su-edit, .hide-dashboard-icons .bbi-dbrd-banner-link, .hide-dashboard-icons .bbi-dbrd-banner-menu, .hide-dashboard-icons .bbi-dbrd-banner-text-icon, .hide-dashboard-icons .bbi-dbrd-banner-widget-withoutcomments, .hide-dashboard-icons .bbi-dbrd-banner-widget-withcomments, .hide-dashboard-icons .bbi-dbrd-control-menu, .hide-dashboard-icons .e-dashboard-banner-menu, .hide-dashboard-icons .e-dashboard-banner-link, .hide-dashboard-icons .su-icon, .hide-dashboard-icons .bbi-dbrd-control-menu-icon, .hide-dashboard-icons .e-dashboard-banner-icon:not(#dashboard-fullscreen):not(#dashboard-refresh):not(#pinboard-fullscreen), .hide-dashboard-icons .e-dashboard-banner-description, .hide-dashboard-icons .server-banner-icon + .e-banner-verticalsplitline, .hide-dashboard-icons #dashboard_bannerPanel div a + .e-banner-verticalsplitline, .hide-dashboard-icons .bbi-dashboard-widget-menu { display: none !important; } .hide-dashboard-icons #dashboard { width: 100% !important; } .hide-embed-dashboard-icons .bbi-dbrd-banner-link, .hide-embed-dashboard-icons .bbi-dbrd-banner-menu, .hide-embed-dashboard-icons .bbi-dbrd-banner-text-icon, .hide-embed-dashboard-icons .bbi-dbrd-banner-widget-withoutcomments, .hide-embed-dashboard-icons .bbi-dbrd-banner-widget-withcomments, .hide-embed-dashboard-icons .bbi-dbrd-control-menu, .hide-embed-dashboard-icons .e-dashboard-banner-menu, .hide-embed-dashboard-icons .e-dashboard-banner-link, .hide-embed-dashboard-icons .e-dashboard-banner-icon:not(#dashboard-fullscreen):not(#dashboard-refresh):not(#dashboard_otheroption):not(#dashboard-view):not(#dashboard-comment):not(#dashboard_dashboardmenu), .hide-embed-dashboard-icons #dashboard_bannerPanel div a + .e-banner-verticalsplitline, .hide-embed-dashboard-icons .saved-view .su.cursor-pointer { display: none !important; } </style>').appendTo('head');
                            bbEmbed('body').addClass('hide-dashboard-icons');
                            bbEmbed('#dashboard-fullscreen').removeClass('su-maximize-1').addClass('su-minimize').attr('data-tooltip', 'Exit Fullscreen');
                        }
                        else {
                            bbEmbed('#embed-fullscreen').remove();
                            bbEmbed('body').removeClass('hide-dashboard-icons');
                            if (this.isMultiTab) {
                                bbEmbed('#' + this.embedOptions.embedContainerId).find('.multitab-dbrd').css('width', this.embedOptions.width);
                            }
                            bbEmbed('#dashboard-fullscreen').addClass('su-maximize-1').removeClass('su-minimize').attr('data-tooltip', 'Fullscreen');
                        }
                    }, 400);
                }
            }
        }
        else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }
    _fullscreenExitHandler(boldBIObj) {
        if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            bbEmbed('#embed-fullscreen').remove();
            bbEmbed('body').removeClass('hide-dashboard-icons');
            if (boldBIObj.isMultiTab) {
                bbEmbed('#' + boldBIObj.embedOptions.embedContainerId).find('.multitab-dbrd').css('width', '100%');
                bbEmbed('#' + boldBIObj.embedOptions.embedContainerId).find('.multitab-dbrd .e-content .e-active').find('#dashboard-fullscreen').addClass('su-maximize-1').removeClass('su-minimize').attr('data-tooltip', 'Fullscreen');
            }
            else {
                bbEmbed('#dashboard-fullscreen').addClass('su-maximize-1').removeClass('su-minimize').attr('data-tooltip', 'Fullscreen');
            }
            bbEmbed('#pinboard-fullscreen').addClass('su-maximize-1').removeClass('su-minimize').attr('data-tooltip', 'Fullscreen');
            bbEmbed('#server-app-container').attr('style', 'background-color: #f9f9f9; height:' + bbEmbed('#content-area').height() + 'px;overflow: hidden !important;min-height: 600px; width:' + boldBIObj.embedOptions.width + '');
        }
        else {
            this.isFullscreen = true;
            const displayVal = (this.embedOptions.dashboardSettings.showRefresh != false) ? 'block !important' : 'none !important';
            bbEmbed('<style id="embed-fullscreen" type="text/css"> .hide-dashboard-icons #dashboard-refresh { display:' + displayVal + '; } .hide-dashboard-icons ul.options, .hide-dashboard-icons .su-pin, .hide-dashboard-icons .su-edit, .hide-dashboard-icons .bbi-dbrd-banner-link, .hide-dashboard-icons .bbi-dbrd-banner-menu, .hide-dashboard-icons .bbi-dbrd-banner-text-icon, .hide-dashboard-icons .bbi-dbrd-banner-widget-withoutcomments, .hide-dashboard-icons .bbi-dbrd-banner-widget-withcomments, .hide-dashboard-icons .bbi-dbrd-control-menu, .hide-dashboard-icons .e-dashboard-banner-menu, .hide-dashboard-icons .e-dashboard-banner-link, .hide-dashboard-icons .su-icon, .hide-dashboard-icons .bbi-dbrd-control-menu-icon, .hide-dashboard-icons .e-dashboard-banner-icon:not(#dashboard-fullscreen):not(#dashboard-refresh):not(#pinboard-fullscreen), .hide-dashboard-icons .e-dashboard-banner-description, .hide-dashboard-icons .server-banner-icon + .e-banner-verticalsplitline, .hide-dashboard-icons #dashboard_bannerPanel div a + .e-banner-verticalsplitline, .hide-dashboard-icons .bbi-dashboard-widget-menu { display: none !important; } .hide-dashboard-icons #dashboard { width: 100% !important; } .hide-embed-dashboard-icons .bbi-dbrd-banner-link, .hide-embed-dashboard-icons .bbi-dbrd-banner-menu, .hide-embed-dashboard-icons .bbi-dbrd-banner-text-icon, .hide-embed-dashboard-icons .bbi-dbrd-banner-widget-withoutcomments, .hide-embed-dashboard-icons .bbi-dbrd-banner-widget-withcomments, .hide-embed-dashboard-icons .bbi-dbrd-control-menu, .hide-embed-dashboard-icons .e-dashboard-banner-menu, .hide-embed-dashboard-icons .e-dashboard-banner-link, .hide-embed-dashboard-icons .e-dashboard-banner-icon:not(#dashboard-fullscreen):not(#dashboard-refresh):not(#dashboard_otheroption):not(#dashboard-view):not(#dashboard-comment):not(#dashboard_dashboardmenu), .hide-embed-dashboard-icons #dashboard_bannerPanel div a + .e-banner-verticalsplitline, .hide-embed-dashboard-icons .saved-view .su.cursor-pointer { display: none !important; } </style>').appendTo('head');
            bbEmbed('body').addClass('hide-dashboard-icons');
            if (boldBIObj.isMultiTab) {
                bbEmbed('#' + boldBIObj.embedOptions.embedContainerId).find('.multitab-dbrd .e-content .e-active').find('#dashboard-fullscreen').removeClass('su-maximize-1').addClass('su-minimize').attr('data-tooltip', 'Exit Fullscreen');
            }
            else {
                bbEmbed('#dashboard-fullscreen').removeClass('su-maximize-1').addClass('su-minimize').attr('data-tooltip', 'Exit Fullscreen');
            }
            bbEmbed('#pinboard-fullscreen').removeClass('su-maximize-1').addClass('su-minimize').attr('data-tooltip', 'Exit Fullscreen');
            bbEmbed('#server-app-container').attr('style', 'background-color: #f9f9f9; overflow: auto !important');
        }
    }
    _onBoldBIDashboardBeforeWidgetIconRendered(arg) {
        if (this.embedOptions.widgetSettings.showMaximize == false) {
            arg.iconsinformation = this._arraySlice(arg.iconsinformation, 'name', 'maximize');
        }
        if (this.embedOptions.widgetSettings.showFilter == false) {
            arg.iconsinformation = this._arraySlice(arg.iconsinformation, 'name', 'filter');
        }
        if (this.embedOptions.widgetSettings.showExport == false || (this.embedOptions.exportSettings.showExcel == false && this.embedOptions.exportSettings.showImage == false && this.embedOptions.exportSettings.showPDF == false && this.embedOptions.exportSettings.showCSV == false)) {
            arg.iconsinformation = this._arraySlice(arg.iconsinformation, 'name', 'export');
            if (!this._isNullOrUndefined(arg.widgetInformation) &&
                !this._isNullOrUndefined(arg.widgetInformation.widgetJson) &&
                !this._isNullOrUndefined(arg.widgetInformation.widgetJson.ContainerSettings) &&
                !arg.widgetInformation.widgetJson.ContainerSettings.ViewData) {
                arg.iconsinformation = this._arraySlice(arg.iconsinformation, 'name', 'menu');
            }
        }
        if (this.embedOptions.widgetSettings.showMoreOption == false) {
            arg.iconsinformation = this._arraySlice(arg.iconsinformation, 'name', 'menu');
        }
        const serverFnc = window[this.beforeWidgetIconRenderedFn];
        if (serverFnc instanceof Function) {
            serverFnc.call(this, arg);
        }
        const clientFnc = window[this.embedOptions.widgetSettings.beforeIconRender];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (this.embedOptions.widgetSettings.beforeIconRender instanceof Function) {
            this.embedOptions.widgetSettings.beforeIconRender.call(this, arg);
        }
    }
    _onBoldBIBeforeControlMenuOpen(arg) {
        if (this.embedOptions.widgetSettings.showExport == false || (this.embedOptions.exportSettings.showExcel == false && this.embedOptions.exportSettings.showCSV == false && this.embedOptions.exportSettings.showImage == false && this.embedOptions.exportSettings.showPDF == false)) {
            arg.menuItems = this._arraySlice(arg.menuItems, 'id', 'export');
        }
        const clientFnc = window[this.embedOptions.widgetSettings.beforeWidgetControlMenuOpen];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (this.embedOptions.widgetSettings.beforeWidgetControlMenuOpen instanceof Function) {
            this.embedOptions.widgetSettings.beforeWidgetControlMenuOpen.call(this, arg);
        }
    }
    _onBoldBIBeforeDashboardMobileMenuOpen(arg) {
        if (this.embedOptions.dashboardSettings.showDashboardParameter == false || this.embedOptions.dashboardSettings.showRefresh == false || this.embedOptions.dashboardSettings.showExport == false) {
            for (let i = arg.menuItems.length - 1; i >= 0; i--) {
                if ((this.embedOptions.dashboardSettings.showDashboardParameter == false && arg.menuItems[`${i}`].id == 'dashboardparameters') || (this.embedOptions.dashboardSettings.showRefresh == false && arg.menuItems[`${i}`].id == 'refreshDashboard') || (this.embedOptions.dashboardSettings.showExport == false && arg.menuItems[`${i}`].id == 'export')) {
                    arg.menuItems.splice(i, 1);
                }
            }
        }
        const clientFnc = window[this.embedOptions.beforeDashboardMobileMenuOpen];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (this.embedOptions.beforeDashboardMobileMenuOpen instanceof Function) {
            this.embedOptions.beforeDashboardMobileMenuOpen.call(this, arg);
        }
    }
    _onBoldBIAjaxBeforeLoad(arg) {
        const clientFnc = window[this.embedOptions.ajaxBeforeLoad];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (this.embedOptions.ajaxBeforeLoad instanceof Function) {
            this.embedOptions.ajaxBeforeLoad.call(this, arg);
        }
    }
    _onBoldBIbeforeDesignerToolbarButtonsRendered(arg) {
        const clientFnc = window[this.embedOptions.dashboardSettings.beforeDesignerToolbarButtons];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (this.embedOptions.dashboardSettings.beforeDesignerToolbarButtons instanceof Function) {
            this.embedOptions.dashboardSettings.beforeDesignerToolbarButtons.call(this, arg);
        }
    }
    _onBoldBIbeforeDatasourceToolbarButtonsRendered(arg) {
        for (let i = arg.toolbarButtons.length - 1; i >= 0; i--) {
            if (arg.toolbarButtons[`${i}`].elementId == this.embedOptions.embedContainerId + '_embeddedbi_continue_dashboard_button' || arg.toolbarButtons[`${i}`].elementId == this.embedOptions.embedContainerId + '_embeddedbi_editScheduleButton') {
                arg.toolbarButtons.splice(i, 1);
            }
            // For Datasource Edit Mode.
            if (!this.isNewConnection && this.embedOptions.mode != BoldBI.Mode.Design) {
                if (arg.toolbarButtons[`${i}`].elementId == this.embedOptions.embedContainerId + '_embeddedbi_cancelButton') {
                    arg.toolbarButtons.splice(i, 1);
                }
            }
        }
        this.isNewConnection = false;
        const clientFnc = window[this.embedOptions.dashboardSettings.beforeDatasourceToolbarButtonsRendered];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (this.embedOptions.dashboardSettings.beforeDatasourceToolbarButtonsRendered instanceof Function) {
            this.embedOptions.dashboardSettings.beforeDatasourceToolbarButtonsRendered.call(this, arg);
        }
    }
    _onBoldBIbeforeDatasourceToolbarIconsRendered(arg) {
        const clientFnc = window[this.embedOptions.dashboardSettings.beforeDatasourceToolbarIconsRendered];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (this.embedOptions.dashboardSettings.beforeDatasourceToolbarIconsRendered instanceof Function) {
            this.embedOptions.dashboardSettings.beforeDatasourceToolbarIconsRendered.call(this, arg);
        }
    }
    _onBoldBIbeforeDesignerToolbarIconsRendered(arg) {
        const clientFnc = window[this.embedOptions.dashboardSettings.beforeDesignerToolbarIconsRendered];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (this.embedOptions.dashboardSettings.beforeDesignerToolbarIconsRendered instanceof Function) {
            this.embedOptions.dashboardSettings.beforeDesignerToolbarIconsRendered.call(this, arg);
        }
    }
    _onBoldBItoolbarClick(arg) {
        const clientFnc = window[this.embedOptions.dashboardSettings.toolbarClick];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (this.embedOptions.dashboardSettings.toolbarClick instanceof Function) {
            this.embedOptions.dashboardSettings.toolbarClick.call(this, arg);
        }
    }
    _onBoldBIbeforeWidgetItemsListed(arg) {
        const clientFnc = window[this.embedOptions.widgetSettings.beforeWidgetItemsListed];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (this.embedOptions.widgetSettings.beforeWidgetItemsListed instanceof Function) {
            this.embedOptions.widgetSettings.beforeWidgetItemsListed.call(this, arg);
        }
    }
    _onBoldBIDashboardWidgetIconClick(arg) {
        const serverFnc = window[this.onWidgetIconClickFn];
        if (serverFnc instanceof Function) {
            serverFnc.call(this, arg);
        }
        const clientFnc = window[this.embedOptions.widgetSettings.onIconClick];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (this.embedOptions.widgetSettings.onIconClick instanceof Function) {
            this.embedOptions.widgetSettings.onIconClick.call(this, arg);
        }
    }
    _onBoldBIonControlMenuClick(arg) {
        const clientFnc = window[this.embedOptions.widgetSettings.onWidgetControlMenuClick];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (this.embedOptions.widgetSettings.onWidgetControlMenuClick instanceof Function) {
            this.embedOptions.widgetSettings.onWidgetControlMenuClick.call(this, arg);
        }
    }
    _onBoldBIDashboardUpdatefavorite(arg) {
        const serverFnc = window[this.onFavoriteStateChangeFn];
        if (serverFnc instanceof Function) {
            serverFnc.call(this, arg);
        }
        const clientFnc = window[this.embedOptions.dashboardSettings.onFavoriteIconClick];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (this.embedOptions.dashboardSettings.onFavoriteIconClick instanceof Function) {
            this.embedOptions.dashboardSettings.onFavoriteIconClick.call(this, arg);
        }
    }
    _onBoldBIBeforeNavigateUrlLinking(arg) {
        const clientFnc = window[this.embedOptions.beforeNavigateUrlLinking];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (this.embedOptions.beforeNavigateUrlLinking instanceof Function) {
            this.embedOptions.beforeNavigateUrlLinking.call(this, arg);
        }
    }
    _onBoldBIBeforeNavigateToDashboard(arg) {
        const clientFnc = window[this.embedOptions.beforeNavigateToDashboard];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (this.embedOptions.beforeNavigateToDashboard instanceof Function) {
            this.embedOptions.beforeNavigateToDashboard.call(this, arg);
        }
    }
    _onBoldBIAuthorizionComplete(arg) {
        const clientFnc = window[this.embedOptions.authorizationServer.authorizionComplete];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, arg);
        }
        if (this.embedOptions.authorizationServer.authorizionComplete instanceof Function) {
            this.embedOptions.authorizationServer.authorizionComplete.call(this, arg);
        }
    }
    _showLoader(container) {
        if (this.isMultipleWidgetMode) {
            this.embedOptions.embedContainerId = container;
        }
        const loaderStyle = document.createElement('style');
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
        const loader = '<div class="preloader-wrap viewer-blue-loader" style="display: none; width: ' + this.embedOptions.width + ';height: ' + this.embedOptions.height + '; top: 0; bottom: 0; z-index : 2;"> <div id="loader_image" align="center" style="position:relative;top:45%;"> <div class="loader-blue loader-icon" id="loader-icon"> <svg class="circular"> <circle class="path" cx="27" cy="27" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"></circle> </svg> </div> </div> </div>';
        this._removeElement('embedded-bi-error');
        document.getElementById(this.embedOptions.embedContainerId).insertAdjacentHTML('afterbegin', loader);
    }
    _xhrRequestHelper(type, url, data, headers, callBackFn) {
        const that = this;
        const http = new XMLHttpRequest();
        http.open(type, url, true);
        http.responseType = 'json';
        http.setRequestHeader('Content-type', 'application/json');
        for (const key in headers) {
            if (Object.prototype.hasOwnProperty.call(headers, key)) {
                http.setRequestHeader(key, headers[`${key}`]);
            }
        }
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                callBackFn.call(that, typeof http.response == 'object' ? http.response : JSON.parse(http.response));
            }
            else if (http.readyState == 4 && http.status == 404) {
                that._throwError('Server not found');
            }
            else if (http.readyState == 4) {
                that._throwError(http.statusText);
            }
        };
        http.send(JSON.stringify(data));
    }
    _emptyHtml(elementID) {
        document.getElementById(elementID).innerHTML = '';
    }
    _removeElement(id) {
        const elem = document.getElementById(id);
        if (elem != null) {
            elem.parentNode.removeChild(elem);
        }
    }
    _uuidv4Generartor() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    _isEmptyOrSpaces(str) {
        return typeof (str) == 'undefined' || str == null || str.match(/^ *$/) != null;
    }
    _isNullOrUndefined(value) {
        return value == undefined || value == null;
    }
    _isUrl(str) {
        let url;
        try {
            url = new URL(str);
        }
        catch (_) {
            return false;
        }
        return url.protocol == 'http:' || url.protocol == 'https:';
    }
    _throwError(errorMsg, embedContainerId) {
        embedContainerId = this._isEmptyOrSpaces(embedContainerId) ? this.embedOptions.embedContainerId : embedContainerId;
        if (embedContainerId) {
            this._removeElementsClass(embedContainerId, '.preloader-wrap', 'viewer-blue-loader');
            const errorMessage = '<div id="embedded-bi-error" style="display:table;height:100%;width:100%;"><div style="display: table-cell;vertical-align: middle;text-align: center;"><div style="display: inline-block;"><img src=' + this.errorImage + ' style="float: left"/><div style="float: left;margin-left: 10px;line-height: 20px;">BoldBI Embedded: ' + errorMsg + '</div></div>';
            document.getElementById(embedContainerId).innerHTML = errorMessage;
        }
        else {
            alert(errorMsg);
        }
        if (!this._isNullOrUndefined(this.embedOptions.onError) && this.embedOptions.onError != '') {
            const errormessage = new Error('BoldBI Embedded: ' + errorMsg);
            this.onErrorClient(errormessage);
        }
        else {
            throw new Error('BoldBI Embedded: ' + errorMsg);
        }
    }
    //The method uses to passes the client side error.
    onErrorClient(errorMessage) {
        const errorDetail = {
            errorStatus: true,
            StatusMessage: errorMessage,
            StatusCode: 500
        };
        const clientFnc = window[this.embedOptions.onError];
        if (clientFnc instanceof Function) {
            clientFnc.call(this, errorDetail);
        }
        if (this.embedOptions.onError instanceof Function) {
            this.embedOptions.onError.call(this, errorDetail);
        }
    }
    _removeElementsClass(id, childElement, targeClass) {
        let nodeList = [];
        if (this._isEmptyOrSpaces(id)) {
            nodeList = document.querySelector(childElement);
        }
        else if (this._isEmptyOrSpaces(childElement)) {
            nodeList.push(document.getElementById(id));
        }
        else {
            nodeList = document.getElementById(id).querySelectorAll(childElement);
        }
        nodeList.forEach(function (element) {
            this._removeClass(element, targeClass);
        }.bind(this));
    }
    _hasClass(el, className) {
        if (el.classList) {
            return el.classList.contains(className);
        }
        const regex = RegExp;
        return !!el.className.match(new regex('(\\s|^)' + className + '(\\s|$)'));
    }
    _addClass(el, className) {
        if (el.classList) {
            el.classList.add(className);
        }
        else if (!this._hasClass(el, className)) {
            el.className += ' ' + className;
        }
    }
    _removeClass(el, className) {
        if (el.classList) {
            el.classList.remove(className);
        }
        else if (this._hasClass(el, className)) {
            const regex = RegExp;
            const reg = new regex('(\\s|^)' + className + '(\\s|$)');
            el.className = el.className.replace(reg, ' ');
        }
    }
    _arraySlice(arr, key, value) {
        arr.forEach(function (item, index, object) {
            if (item[`${key}`] == value) {
                object.splice(index, 1);
            }
        }.bind(this));
        return arr;
    }
    _getFilterData(filterQuery) {
        const processData = { masterData: [] };
        const decryptfilterParam = decodeURI(filterQuery).
            replace(/~&~/g, String.fromCharCode(251) + String.fromCharCode(251)).
            replace(/~=~/g, String.fromCharCode(250) + String.fromCharCode(250)).
            replace(/~[?]~/g, String.fromCharCode(253) + String.fromCharCode(253)).
            replace(/~[/]~/g, String.fromCharCode(254) + String.fromCharCode(254)).
            replace(/&&/g, '&').
            replace(/&/g, '|,|').
            replace(/=/g, '|:|').
            replace(/~,~/g, String.fromCharCode(252) + String.fromCharCode(252));
        const splitFilterParamObj = decryptfilterParam.split('|,|');
        for (let index = 0; index < splitFilterParamObj.length; index++) {
            const splitFilterQuery = splitFilterParamObj[`${index}`].split('|:|');
            if (splitFilterQuery.length >= 2 && splitFilterQuery[0].trim().toUpperCase() == 'FILTERQUERY') {
                const filterValue = splitFilterQuery[1];
                const filterData = bbEmbed.parseJSON(filterValue);
                if (filterData != '' && filterData.length != 0) {
                    processData.masterData = this._lengthensSelectedFilterInfo(filterData);
                    this._unEscapeSelectedFilterDataforURLFilter(processData.masterData);
                }
                continue;
            }
        }
        return this._createFilterCollection(processData.masterData);
    }
    _createFilterCollection(masterdata) {
        if (masterdata) {
            const collection = [];
            masterdata.forEach(function (filter) {
                let columnName = filter.ColumnName;
                let values = [];
                if (filter.InitialDateFilter.DisplayDateFilterList.length > 0) {
                    values = filter.InitialDateFilter.DisplayDateFilterList;
                    if (filter.IsRange) {
                        values = [values[0] + ' - ' + values[1]];
                    }
                }
                if (filter.InitialMeasureFilter.Values.length > 0) {
                    values = filter.InitialMeasureFilter.Values;
                }
                if (filter.InitialDimensionFilter.Text.length > 0) {
                    values = filter.InitialDimensionFilter.Text;
                    columnName = columnName + ' (' + filter.InitialDimensionFilter.DimesnionFilterCondition + ')';
                }
                if (filter.InitialDimensionFilter.Text.length > 0) {
                    values = filter.InitialDimensionFilter.Text;
                }
                collection.push({ 'ColumnName': columnName, 'Values': values });
            }.bind(this));
            return collection;
        }
    }
    _lengthensSelectedFilterInfo(shortenFilterInfoList) {
        const unMinifiedList = [];
        const shortenListLen = shortenFilterInfoList.length;
        for (let index = 0; index < shortenListLen; index++) {
            const minObj = shortenFilterInfoList[`${index}`];
            const unMinifyObj = new SelectedFilterValue();
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
                    unMinifyObj.PoPFilter[lengthenEnum.PrimaryCustomRange][lengthenEnum.StartRange] = minObj[shortenEnum.PoPFilter][shortenEnum.PrimaryCustomRange][shortenEnum.StartRange];
                    unMinifyObj.PoPFilter[lengthenEnum.PrimaryCustomRange][lengthenEnum.EndRange] = minObj[shortenEnum.PoPFilter][shortenEnum.PrimaryCustomRange][shortenEnum.EndRange];
                }
                if (this._hasValue(minObj[shortenEnum.PoPFilter], shortenEnum.SecondaryCustomRange)) {
                    if (minObj[shortenEnum.PoPFilter][shortenEnum.SecondaryCustomRange].length > 0) {
                        unMinifyObj.PoPFilter[lengthenEnum.SecondaryCustomRange][0][lengthenEnum.StartRange] = minObj[shortenEnum.PoPFilter][shortenEnum.SecondaryCustomRange][0][shortenEnum.StartRange];
                        unMinifyObj.PoPFilter[lengthenEnum.SecondaryCustomRange][0][lengthenEnum.EndRange] = minObj[shortenEnum.PoPFilter][shortenEnum.SecondaryCustomRange][0][shortenEnum.EndRange];
                    }
                }
            }
            if (this._hasValue(unMinifyObj, lengthenEnum.UniqueColumnName) && this._hasValue(unMinifyObj, lengthenEnum.ReportName)) {
                unMinifiedList.push(unMinifyObj);
            }
        }
        return unMinifiedList;
    }
    _hasValue(filterObj, property) {
        return !this._isNullOrUndefined(filterObj) && !this._isNullOrUndefined(filterObj[`${property}`]);
    }
    _unEscapeSelectedFilterDataforURLFilter(filterInfoList) {
        for (let index = 0; index < filterInfoList.length; index++) {
            const filterInfo = filterInfoList[`${index}`];
            if ((!this._isNullOrUndefined(filterInfo.InitialDimensionFilter.Text) && filterInfo.InitialDimensionFilter.Text.length != 0)) {
                for (let i = 0; i < filterInfo.InitialDimensionFilter.Text.length; i++) {
                    filterInfo.InitialDimensionFilter.Text[`${i}`] = filterInfo.InitialDimensionFilter.Text[`${i}`].replaceAll(String.fromCharCode(252) + String.fromCharCode(252), ',').
                        replaceAll(String.fromCharCode(251) + String.fromCharCode(251), '&').
                        replaceAll(String.fromCharCode(250) + String.fromCharCode(250), '=').
                        replaceAll(String.fromCharCode(253) + String.fromCharCode(253), '?').
                        replaceAll(String.fromCharCode(254) + String.fromCharCode(254), '/');
                }
            }
        }
        return filterInfoList;
    }
    _getWidgetFilterInfo() {
        const widgetId = this._widgetsCollection;
        const widgetDetails = [];
        if (Array.isArray(widgetId) == true) {
            for (let i = 0; i < widgetId.length; i++) {
                let filtersDetails = BoldBI._gettinstance(document.getElementById(this.embedOptions.embedContainerId), 'embeddedBoldBIWidget_' + widgetId[`${i}`]);
                filtersDetails = Array.isArray(filtersDetails) ? filtersDetails : [filtersDetails];
                const filtervalue = [];
                let filterscolumn;
                for (let k = 0; k < filtersDetails.length; k++) {
                    if (filtersDetails[`${k}`].includes('=')) {
                        filterscolumn = {
                            columnName: filtersDetails[`${k}`].split('=')[0].toString(),
                            values: filtersDetails[`${k}`].split('=')[1].split(',')
                        };
                    }
                    else {
                        filterscolumn = {
                            values: filtersDetails
                        };
                    }
                    filtervalue[filtervalue.length] = filterscolumn;
                }
                const widgetValue = {
                    id: widgetId[`${i}`],
                    filters: filtervalue
                };
                widgetDetails[widgetDetails.length] = widgetValue;
            }
        }
        return widgetDetails;
    }
    addStyles() {
        const that = this;
        that._loadDepedentFiles();
    }
    destroyStyles() {
        const that = this;
        document.querySelectorAll('link').forEach(function (node) {
            that.cssFiles.forEach(function (file) {
                if (node.href.toLowerCase().indexOf(file.toLowerCase()) != -1) {
                    node.parentNode.removeChild(node);
                }
            });
        });
    }
    static _putinstance(element, key, obj) {
        //_storage = new WeakMap();
        if (!BoldBI._storage.has(element)) {
            BoldBI._storage.set(element, new Map());
        }
        BoldBI._storage.get(element).set(key, obj);
    }
    static _gettinstance(element, key) {
        if (BoldBI._storage.has(element)) {
            return BoldBI._storage.get(element).get(key);
        }
    }
    static _hasinstance(element, key) {
        return BoldBI._storage.has(element) && BoldBI._storage.get(element).has(key);
    }
    static _removeinstance(element, key) {
        if (BoldBI._storage.has(element)) {
            const ret = BoldBI._storage.get(element).delete(key);
            if (BoldBI._storage.get(element).size != 0) {
                BoldBI._storage.delete(element);
            }
            return ret;
        }
    }
}
BoldBI.Mode = Object.freeze({ 'View': 'view', 'Design': 'design', 'Connection': 'connection', 'DataSource': 'datasource' });
BoldBI.EmbedType = Object.freeze({ 'Component': 'component', 'IFrame': 'iframe' });
BoldBI.Environment = Object.freeze({ 'Enterprise': 'onpremise', 'Cloud': 'cloud' });
BoldBI.Theme = Object.freeze({ 'Off': 'off', 'Light': 'light', 'Dark': 'dark' });
BoldBI._storage = new WeakMap();
BoldBI._widgetsCollection = [];
class widgetBI {
    constructor() {
        this.containerID = '';
        this.widgetCollection = [];
    }
    setFilterParameters(filters) {
        const widgetId = this.widgetCollection;
        if (Array.isArray(widgetId) == true) {
            if (BoldBI._hasinstance(document.getElementById(this.containerID), 'embeddedBoldBIWidget_' + widgetId[widgetId.length - 1])) {
                BoldBI._putinstance(document.getElementById(this.containerID), 'embeddedBoldBIWidget_' + widgetId[widgetId.length - 1], filters);
            }
        }
    }
}
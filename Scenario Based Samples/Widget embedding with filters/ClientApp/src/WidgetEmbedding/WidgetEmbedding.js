import React from "react";
import "../index";
import { BoldBI } from "@boldbi/boldbi-embedded-sdk";
import "./widget.css";
import { MultiSelectComponent } from "@syncfusion/ej2-react-dropdowns";

//ASP.NET Core application would be run on https://localhost:5001; http://localhost:5000, which needs to be set as `apiHost`
const apiHost = "http://localhost:5292";

//Url of the AuthorizationServer action in BoldBIEmbedController of the ASP.NET Core application
const authorizationUrl = "/api/boldbiembed/authorizationserver";

var BoldBiObj;
class WidgetEmbedding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toke: undefined,
      items: [],
      embedConfig: {},
    };
    this.BoldBiObj = new BoldBI();
    this.channelsData = [
      "Retail",
      "Corporate",
      "Distributor",
      "Online",
      "Dealer"
    ];
    this.widgetFilter = this.widgetFilter.bind(this);
    this.getSelectedValues = this.getSelectedValues.bind(this);
  }

  widgetFilter() {
    var instance = BoldBI.getInstance("dashboard");
    var selectedValues = this.getSelectedValues();
    if(selectedValues != "") {
      var updatefiltersValue = "Channel=" + selectedValues;
      instance.updateFilters(updatefiltersValue);
    }
  }

  getSelectedValues() { 
    var multiselectContainer = document.getElementById("multi-select");
    var getlistObj = multiselectContainer.ej2_instances && multiselectContainer.ej2_instances[0];
    var selectedValuesList = getlistObj.tempValues;
    var selectedValuesString = "";
    if (selectedValuesList && selectedValuesList.length !== 0) {
      document.getElementById("error-text").style.display = "none";
      selectedValuesString = selectedValuesList.join(",");
      return selectedValuesString;
    }
    else {
      document.getElementById("error-text").style.display = "block";
      return selectedValuesString;
    }
  }

  renderWidget(data) {
    this.dashboard = BoldBI.create({
      serverUrl: data.ServerUrl + "/" + data.SiteIdentifier,
      dashboardId: data.DashboardId,
      embedContainerId: "dashboard",
      width: "100%",
      height: window.innerHeight + "px",
      authorizationServer: {
        url: apiHost + authorizationUrl
      }
    });
    this.dashboard.loadDashboardWidget("Sales by Channel");
  }

  render() {
    return (
      <div>
        <div id="viewer-section">
          <div id="dashboard"></div>
        </div>
        <div id="property">
          <div className="property-header">
            <h4>Properties</h4>
            <div className="separator"></div>
          </div>
          <div className="dimension-filter">
            <span>
              <b>Widget-based Filter</b>
            </span>
            <br />
            <div id="heading-content">
              <p>
                Here, we are utilizing the <b>Sales by Channel</b> widget from
                the sample dashboard of the <b>Sales Analysis Dashboard</b>.
              </p>
            </div>
            <div className="dimension-initial">
              <span>
                In the <b>Initial Rendered</b> view, you can see all the below
                values in the Sales by Channel widget.
              </span>
              <ul>
                <li>Retail</li>
                <li>Corporate</li>
                <li>Distributor</li>
                <li>Online</li>
                <li>Dealer</li>
              </ul>
            </div>
            <div className="dimension-ondemand">
              <span>
                For <b>On-demand Action</b>, you need to select the options from
                the dropdown list below and click the
                <b> "Apply filters"</b> button to see the selected
                filter values in the Sales by Channel widget.
              </span>
              <br />
              <MultiSelectComponent
                id="multi-select"
                dataSource={this.channelsData}
                placeholder="Select Channels"
              />
              <div id="error-text">Please select atleast one channel</div>
              <div className="filter-button">
                <button onClick={this.widgetFilter}>
                  Apply filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  async componentDidMount() {
    try {
      const response = await fetch(apiHost + "/api/boldbiembed/GetData");
      const data = await response.json();
      // Transform camelCase keys to PascalCase
      const transformedEmbedConfigData = {
        DashboardId: data.dashboardId,
        EmbedType: data.embedType,
        Environment: data.environment,
        ServerUrl: data.serverUrl,
        SiteIdentifier: data.siteIdentifier,
      };
      this.setState({ embedConfig: transformedEmbedConfigData }, () => {
        this.renderWidget(this.state.embedConfig);
      });
    } catch (error) {
      console.log(error);
      this.setState({ toke: "error", items: "error" });
    }
  }
}
export default WidgetEmbedding;
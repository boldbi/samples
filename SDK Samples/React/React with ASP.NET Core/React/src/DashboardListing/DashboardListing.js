import React from 'react';
import './DashboardListing.css';
import '../index.css';
import '../index';
// import {BoldBI} from './EmbedBiWrapper.js';
import {BoldBI} from './EmbedWrapper.js';
import Axios from 'axios';

//For Bold BI Enterprise edition, it should be like `site/site1`. For Bold BI Cloud, it should be empty string.
const siteIdentifier = "site/site1";

//Your Bold BI application environment. (If Cloud, you should use `cloud`, if Enterprise, you should use `onpremise`)
const environment = "onpremise";

//ASP.NET Core application would be run on http://localhost:61377/, which needs to be set as `apiHost`
const apiHost="http://localhost:61377/"

//Bold BI Server URL (ex: http://localhost:5000/bi, http://demo.boldbi.com/bi)
const rootUrl = "http://localhost:54321/bi/"; //"https://demo-chargebackgurus.boldbi.com/bi/";

//Url of the GetDetails action in ValuesController of the ASP.NET Core application
const authorizationUrl="/api/home/getdetails";

//Enter your BoldBI credentials here
const userEmail= "alagarsamyd@syncfusion.com"; //"demo@boldbi.com";
const userPassword= "Asdf@123"; //"Demo$786";
var BoldBiObj;

class DashboardListing extends React.Component {
   constructor(props){
       super(props);
       this.state = {toke: undefined, items: []};
       this.BoldBiObj = new BoldBI();
   };

   renderDashboard(data) {
    this.dashboard= BoldBI.create({
      serverUrl: rootUrl + siteIdentifier,
      dashboardId: data.Id,
      embedContainerId: "dashboard",
      embedType: BoldBI.EmbedType.Component,
      environment: environment,
      width:"100%",
      height: window.innerHeight + 'px',
      expirationTime:100000,
      authorizationServer: {
          url:apiHost + authorizationUrl
      }
  });

  console.log(this.dashboard);
  this.dashboard.loadDashboard();     
    
  }

  render() {
    return (
      <div id="DashboardListing">
          <div id="container">
            <div className="header-section">
              <div id="grid-title">All Dashboard</div>
            </div>
            <div id="panel">
              {this.state.items.map((el) => 
                <button className="dashboard-item" attr-name ={el.Name} attr-id = {el.Id} value={el} onClick={((e) => this.renderDashboard(el))} >
                {el.Name}
                </button>
              )}
            </div>
          </div>
          <div id="viewer-section">
            <div id="dashboard"></div>
          </div>
      </div>
    );
  }

  componentDidMount() {
    var dashboard = undefined;
    var querystring = require('querystring');
    var token = "";
    Axios.post(rootUrl+'api/'+ siteIdentifier +'/get-user-key',
    querystring.stringify({
            UserId: userEmail,
            Password: userPassword
    }), {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(response => {
          var result = response;
          token = JSON.parse(result.data.Token).access_token;
          this.setState({ toke: token});
          //Get Dashboards
      Axios.get(rootUrl+'api/'+ siteIdentifier +'/v2.0/items?ItemType=2',
      {
        headers: { 
          "Access-Control-Allow-Origin": "*",
          "Authorization":'bearer ' + this.state.toke
        }
      }).then(res => {
          var arrayOfObjects = res.data;
          this.setState({ items: arrayOfObjects});
          this.renderDashboard(arrayOfObjects[0]);
      },
      error => {
          this.setState({items: "error"});
      });
    },
    error => {
       this.setState({toke: "error"});
    });
  }  
}
export default DashboardListing;

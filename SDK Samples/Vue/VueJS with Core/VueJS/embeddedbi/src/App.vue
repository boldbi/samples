<template>
  <div id="app" ref="app">
    <div id="dashboard" ref="dashboard"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import $ from 'jquery'
import {BoldBI} from '../src/assets/js/EmbedWrapper.js';

//import HelloWorld from './components/HelloWorld.vue'
Vue.prototype.jQuery = $
window.jQuery = $

export default Vue.extend ({
  name: 'App',
  // components: {
  //   HelloWorld
  // },
  mounted: function() {
    var scripts = [
      "https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js",
      "https://cdnjs.cloudflare.com/ajax/libs/jquery/1.10.2/jquery.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/jsrender/1.0.0-beta/jsrender.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js",
    ];
    scripts.forEach(script => {
      let tag = document.createElement("script");
      tag.setAttribute("src", script);
      tag.setAttribute("type", "text/javascript");
      tag.setAttribute("defer", "defer");
      tag.async = true;
      document.head.appendChild(tag);
    });

    //Bold BI Server URL (ex: http://localhost:5000/bi, http://demo.boldbi.com/bi)
    let rootUrl = "http://localhost:64503/bi";
    //For Bold BI Enterprise edition, it should be like `site/site1`. For Bold BI Cloud, it should be empty string.
    let siteIdentifier = "/site/site1";
    //ID of the Dashboard
    let dashboardId = "2426b843-bf97-4392-96b1-ef12c007b66f";
    //Your Bold BI application environment. (If Cloud, you should use `cloud`, if Enterprise, you should use `onpremise`)
    let environment = "onpremise";
    //Url of the GetDetails api in ASP.NET Core server and act as Authorization Server.
    let authorizationUrl = "http://localhost:61377/getdetails";

    let dashboard = BoldBI.create({
                    serverUrl: rootUrl + siteIdentifier,
                    dashboardId: dashboardId,
                    embedContainerId: "dashboard",
                    embedType: BoldBI.EmbedType.Component,
                    environment: environment == "onpremise" ? BoldBI.Environment.Enterprise : BoldBI.Environment.Cloud,
                    width: "100%",
                    height: window.innerHeight + "px",
                    expirationTime: 100000,
                    authorizationServer: {
                        url: authorizationUrl
                    },
                    dynamicConnection: {
                        isEnabled: false,
                        identity: "",
                    },
                    autoRefreshSettings: {
                        enabled: true,
                        hourlySchedule: {
                            hours: 0,
                            minutes: 1,
                            seconds: 0
                        }
                    }
                });
                dashboard.loadDashboard(); 
                console.log(dashboard);
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>

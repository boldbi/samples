<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="ISO-8859-1">
	<title>BoldBI Embed - JAVA Servlet</title>
	<script type="text/javascript" src="ajax.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jsrender/1.0.0-beta/jsrender.js"></script>
    <script type="text/javascript" src="https://ajax.aspnetcdn.com/ajax/signalr/jquery.signalr-2.1.2.min.js"></script>
    <script type="text/javascript" src="https://cdn.boldbi.com/embedded-sdk/v4.1.36/embed-js.js"></script>
</head>
<body>
	
	<div style="height:100%;width:100%;overflow: hidden !important;" id="sample_dashboard"></div>
	<script>
		//Rooturl of the BoldBI. This can be domain name/IP/Localhost along with the '/bi' at the end as below
		var rootUrl = "http://localhost:64503/bi";
		//This is by defaul 'site/site1'. If you have created the new tenant in your onpremise version, it might be vary based on your entries
		var siteIdentifier = "/site/site1";
		//Your Bold BI application environment. (If Cloud, you should use `cloud`, if Enterprise, you should use `onpremise`)
		var environment = "onpremise";
		//Unique Id of the Dashboard
		var dashboardId = "606badda-ffbe-41b8-90c4-b1e4ba367aa3";
		//Authorization endpoint which has encrypt the user context and send back to the Bold BI Server for authorization.
		var authorizationUrl = "BoldBI.do"
   		$(document).ready(function()  {
        	var boldbiEmbedInstance = BoldBI.create({
    		  serverUrl: rootUrl + siteIdentifier,
    	      dashboardId: dashboardId,
    	      embedContainerId: "sample_dashboard",
    	      embedType: BoldBI.EmbedType.Component,
    	      environment: environment,
    	      width:"100%",
    	      height: window.innerHeight + 'px',
    	      expirationTime:100000,
    	      authorizationServer: {
    	          url: authorizationUrl
    	      }
            });
        	boldbiEmbedInstance.loadDashboard();
		});
	</script>
</body>
</html>
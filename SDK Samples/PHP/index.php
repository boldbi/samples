
<?php
// ServerURL, DashboardPath and AuthorizeSeverURL to embed widget 
$serverUrl = "http://localhost:55106/bi/site/site1";
$dashboardId ="a3042415-5c57-4f66-b475-8502be4987e8";
$authorizeServerUrl = "http://localhost:8070/boldbi/dashboard/rest/authorizeserver.php";
?>

<html>
<head>
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,700" />
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jsrender/1.0.5/jsrender.min.js"></script>
<script type="text/javascript" src="http://cdn.boldbi.com/embedded-sdk/v5.1.55/embed-js.js"></script>
</head>
<body onload="embedSample();">
<div id="dashboard-container">
   <div id="widget-container1" style="float:left;"></div>
   <div id="widget-container2" style="float:left;"></div>
</div>
    <script>
        function embedSample() {
            var dashboardemb = BoldBI.create({
                serverUrl: '<?php echo $serverUrl;?>',
                dashboardId: '<?php echo $dashboardId;?>',
                embedContainerId: "widget-container1",// This should be the container id where you want to embed the widget1
                embedType: BoldBI.EmbedType.Component,
                environment: BoldBI.Environment.Enterprise,
                height: "700px",
                width: "1500px",
                authorizationServer: {
                    url: '<?php echo $authorizeServerUrl;?>'
                },
                expirationTime: "100000",
            });
            dashboardemb.loadDashboard();
        }
    </script>
</body>
</html>




<?php
//// Embed Properties ////
$secretCode = "wBIbCcPOmELNfSiip3kMuGoDLCTnTHpE"; // Use your SecretCode here 
$userEmail = "arasu6raja@gmail.com"; // Email address of the user

$data = json_decode(file_get_contents('php://input'), true);

// Getting embedQuerString and dashboardServerApiUrl from BoldBI wrapper 
if ($data != null && $data["embedQuerString"] !="" && $data["dashboardServerApiUrl"]!="") {
  $embedQuerString = $data["embedQuerString"];
  $dashboardServerApiUrl= $data["dashboardServerApiUrl"];
  $dashdetails = GetEmbedDetails($embedQuerString, $dashboardServerApiUrl);
  header('Content-type: application/json');
  echo json_encode($dashdetails);
 }
 
// This function used to get dashboard details from Bold BI Server 
function GetEmbedDetails($embedQuerString, $dashboardServerApiUrl){
  global $userEmail;
  $embedQuerString = $embedQuerString . "&embed_user_email=" . $userEmail. "&embed_datasource_filter=[{&&StoreName=Trousers','Jackets}]";
  $embedSignature = "&embed_signature=" . getSignatureUrl($embedQuerString);
//echo $embedSignature;
  $embedDetailsUrl = "/embed/authorize?" . $embedQuerString . $embedSignature;
	//echo   $dashboardServerApiUrl . $embedDetailsUrl;
  $curl = curl_init();
  curl_setopt_array($curl, array(
    CURLOPT_URL => $dashboardServerApiUrl . $embedDetailsUrl,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 50000,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_HTTPHEADER => array(
      "Content-Type: application/json"
    ),
  ));
  $response = curl_exec($curl);
  $err = curl_error($curl);
  curl_close($curl);

  return $response;
}

//// Prepare embed_Signature by encrypting with secretCode ////
function getSignatureUrl($embedQuerString) {
  global $secretCode; 
  $keyBytes = utf8_encode($secretCode);            
  $messageBytes = utf8_encode($embedQuerString);
  $hashMessage = hash_hmac('sha256',$messageBytes, $keyBytes, true);
  $signature = base64_encode($hashMessage);
  return $signature;
}
?>

var fs = require("fs");
var http = require("http");
var url = require("url");
var express = require('express');
var app = express();
var bytes = require('utf8-bytes');
var crypto = require('crypto');

// Get the embedSecret key from Bold BI
var embedSecret = "BLb36Sblz2ISqZPa4WyVeOioqHLRXAVI";

//Enter your BoldBI credentials here
var userEmail = "admin@domain.com";

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.post('/embeddetail/get', function (req, response) {
  var embedQuerString = req.body.embedQuerString;
  var dashboardServerApiUrl = req.body.dashboardServerApiUrl;

  embedQuerString += "&embed_user_email=" + userEmail;
  var embedSignature = "&embed_signature=" + GetSignatureUrl(embedQuerString.toLowerCase());
  var embedDetailsUrl = "/embed/authorize?" + embedQuerString.toLowerCase()+embedSignature;

  http.get(dashboardServerApiUrl+embedDetailsUrl, function(res){
        var str = '';
        res.on('data', function (chunk) {
               str += chunk;
         });
        res.on('end', function () {
             response.send(str);
        });
  });
})

function GetSignatureUrl(queryString)
{
  var keyBytes = Buffer.from(embedSecret);
  var hmac = crypto.createHmac('sha256', keyBytes);
  data = hmac.update(queryString);
  gen_hmac= data.digest().toString('base64');

return gen_hmac;
}

app.get("/",function (request, response) {

  var pathname = url.parse(request.url).pathname;
  console.log("Request for " + pathname + " received.");

  response.writeHead(200);

  if(pathname == "/") {
      html = fs.readFileSync("index.html", "utf8");
      response.write(html);
  }
  response.end();
})

var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})

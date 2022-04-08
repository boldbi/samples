
<!--Get Embed Details -->
<cfcomponent>
	<cfset mailId = "alagarsamyd@syncfusion.com">
	<cfset embedSignature = "rkpFgP4EqK6o2VjHTD44prSyJHtfYvaA">
	<cffunction name="GetEmbedDetails" access="remote" returnformat="JSON">
		<cfset requestBody = toString( getHttpRequestData().content )>
		<cfset query = deserializeJSON(requestBody)>
		<cfset embedQuery = query.embedQuerString>
		<cfset apiUrl = query.dashboardServerApiUrl>
		<cfset userMail = "&embed_user_email=" & mailId>
		<cfset embedQueryString = embedQuery & userMail>
		<cfset getSignature(embedQueryString)>
		<cfset embedSignature="&embed_signature=" & base64Hash>
		<cfset embedDetailsUrl = apiUrl & "/embed/authorize?" & embedQueryString & embedSignature>
		<cfhttp url="#embedDetailsUrl#" method="get" result="result">
			<cfhttpparam type="url" name="url_Test" value="url value" >
		</cfhttp>
		<cfreturn result.Filecontent>
	</cffunction>
	<cffunction name="getSignature">
		<cfargument name="embedQueryString">
		<cfset hexHash = hmac(arguments.embedQueryString, embedSignature, "HMACSHA256", "UTF-8")>
		<cfset base64Hash = binaryEncode(binaryDecode(hexHash, "hex"), "base64")>
		<cfreturn base64Hash>		
	</cffunction>	
</cfcomponent>
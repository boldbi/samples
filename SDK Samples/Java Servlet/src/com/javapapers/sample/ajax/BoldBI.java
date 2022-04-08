package com.javapapers.sample.ajax;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;


import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class BoldBI extends HttpServlet {

	/**
	 * A simple HelloWorld Servlet
	 */
	public static String UserEmail = "admin@domain.com";
	public static String EmbedSecret = "MvAiyOHPyppihvV22RpQDkMy8bQC10hL";
	
	public void doPost(HttpServletRequest req, HttpServletResponse res)
			throws java.io.IOException {
		StringBuffer jb = new StringBuffer();
		  String line = null;
		  try {
		    BufferedReader reader = req.getReader();
		    while ((line = reader.readLine()) != null)
		      jb.append(line);
		  } catch (Exception e) { /*report an error*/ }
		  
		  JSONObject json = new JSONObject();
		  try {
			  JSONParser parser = new JSONParser();  
			  json = (JSONObject) parser.parse(jb.toString());  
			    
			  } catch (Exception e) {
			    // crash and burn
			    throw new IOException("Error parsing JSON request string");
			  }
		  
		var embedQuery = String.valueOf(json.get("embedQuerString"));
		var serverAPIUrl = String.valueOf(json.get("dashboardServerApiUrl"));
		StringBuilder embedQueryBuilder = new 
                StringBuilder(embedQuery);
        // User your user-email as embed_user_email
		embedQueryBuilder.append("&embed_user_email=" + UserEmail);
        var embedDetailsUrl = new StringBuilder("/embed/authorize?");
		try {
			embedDetailsUrl.append(embedQueryBuilder.toString() + "&embed_signature=" + GetSignatureUrl(embedQueryBuilder.toString()));
		} catch (InvalidKeyException e) {
			e.printStackTrace();
		}
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder().uri(URI.create(serverAPIUrl + embedDetailsUrl)).build();
        HttpResponse<String> response = null;
		try {
			response = client.send(request, BodyHandlers.ofString());
		} catch (IOException | InterruptedException e) {
			e.printStackTrace();
		}
        var resp = response.body();
        PrintWriter out = res.getWriter();
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        out.print(resp);
        out.flush();   
	}
	
	public static String GetSignatureUrl (String queryString) throws InvalidKeyException {
		String secretAccessKey = EmbedSecret;
	   	byte[] secretKey = secretAccessKey.getBytes();
	   	SecretKeySpec signingKey = new SecretKeySpec(secretKey, "HmacSHA256");
	   	Mac mac = null;
		try {
			mac = Mac.getInstance("HmacSHA256");
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		mac.init(signingKey);
		byte[] bytes = queryString.getBytes();
		byte[] rawHmac = mac.doFinal(bytes);
		//System.out.println(Base64.encodeBytes(rawHmac));
		return new String(Base64.getEncoder().encode(rawHmac));
	}
	
	public void doGet(HttpServletRequest req, HttpServletResponse res)
			throws java.io.IOException {
		doPost(req, res);
	}	
	
}

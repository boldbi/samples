package ServletSample;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.SignatureAlgorithm;
import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class TokenHelper {

    public String generateJSONWebToken() {
        String signingKey = ConfigReader.getProperty("signingKey");
        SecretKey securityKey = Keys.hmacShaKeyFor(signingKey.getBytes());

        Map<String, Object> claims = new HashMap<>();
        claims.put("sub", ConfigReader.getProperty("userid"));
        claims.put("email", ConfigReader.getProperty("email"));
        claims.put("first_name", ConfigReader.getProperty("first_name"));
        claims.put("last_name", ConfigReader.getProperty("last_name"));
        claims.put("phone", ConfigReader.getProperty("phone"));

        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(new Date(System.currentTimeMillis() + 120 * 60 * 1000)) // 2 hours expiration
                .signWith(securityKey, SignatureAlgorithm.HS256).compact();
    }
}


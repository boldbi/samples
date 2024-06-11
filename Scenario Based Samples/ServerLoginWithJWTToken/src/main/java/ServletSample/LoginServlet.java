package ServletSample;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/Login")
public class LoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public LoginServlet() {
        super();
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException { 
        TokenHelper tokenHelper = new TokenHelper();
        String token = tokenHelper.generateJSONWebToken();
        String serverUrl = ConfigReader.getProperty("ourserverurl").trim();                                     
        String url = serverUrl.endsWith("/") ? serverUrl + "sso/jwt/callback?jwt=" + token
                : serverUrl + "/sso/jwt/callback?jwt=" + token;

        response.sendRedirect(url);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	doGet(request, response);
    }
}

package ServletSample;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/Logout")
public class LogoutServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public LogoutServlet() {
        super();
    }
    
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException { 
        String serverUrl = ConfigReader.getProperty("ourserverurl").trim();                                     
        String url = serverUrl.endsWith("/") ? serverUrl + "ums/accounts/login?ReturnUrl=%2Fums%2Fhomepage%3Fview%3Dall-sites" : serverUrl + "/ums/accounts/login?ReturnUrl=%2Fums%2Fhomepage%3Fview%3Dall-sites";
        response.sendRedirect(url);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}

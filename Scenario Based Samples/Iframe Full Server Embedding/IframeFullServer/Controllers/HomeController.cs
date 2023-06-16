using Microsoft.AspNetCore.Mvc;
using IframeFullServer.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;

namespace IframeFullServer.Controllers;

public class HomeController : Controller
{
    private readonly IConfiguration _configuration;
    public HomeController(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public ActionResult Index()
    {
        ViewBag.IsAuthenticated = HttpContext.User.Identity.IsAuthenticated;
        return View();
    }

    public ActionResult About()
    {
        ViewBag.IsAuthenticated = HttpContext.User.Identity.IsAuthenticated;
        ViewBag.Message = "Your application description page.";

        return View();
    }

    public ActionResult Contact()
    {
        ViewBag.IsAuthenticated = HttpContext.User.Identity.IsAuthenticated;
        ViewBag.Message = "Your contact page.";

        return View();
    }

    public ActionResult Login()
    {
        var email = Request.Form["user"].ToString();
        string redirectUrl = Request.Form["returnURL"];
        if (email != null)
        {
            var claims = new List<Claim>
                {
                new Claim(ClaimTypes.Name, email)
            };
            var identity = new ClaimsIdentity(claims, "Cookies");
            HttpContext.User = new ClaimsPrincipal(identity);
            HttpContext.SignInAsync("Cookies", HttpContext.User);
        }
        if (string.IsNullOrWhiteSpace(redirectUrl))
            return RedirectToAction("Index");
        else
            return RedirectToAction("Embed");
    }

    public ActionResult JWTLogin()
    {
        if (HttpContext.User.Identity.IsAuthenticated)
        {
            var email = HttpContext.User.Identity.Name;
            var token = new TokenHelper().GenerateJSONWebToken(new User { Email = email });
            var url = _configuration["jwt:ourserverurl"].TrimEnd('/') + "/sso/jwt/callback?jwt=" + token;
            return Redirect(url);
        }
        else
        {
            return RedirectToAction("Loginpage");
        }
    }

    public ActionResult Loginpage()
    {
        ViewBag.IsAuthenticated = HttpContext.User.Identity.IsAuthenticated;
        ViewBag.ReturnURL = Request.Query["returnURL"].ToString();
        return View();
    }

    public ActionResult Logout()
    {
        HttpContext.SignOutAsync("Cookies");
        var url = _configuration["jwt:ourserverurl"].TrimEnd('/') + "/oauth/logout?redirect_uri=localhost:44383/Home/Loginpage";
        return Redirect(url);
    }

    public ActionResult JWTLogOut()
    {
        return RedirectToAction("Index");
    }

    public ActionResult Embed()
    {
        ViewBag.IsAuthenticated = HttpContext.User.Identity.IsAuthenticated;
        return View();
    }

}

using boldbi.web.api.Model;
using boldbi.web.api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace boldbi.web.api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly ILogger<AccountController> _logger;
        private readonly IUser _userService;
        private readonly IJWTServiceManager _jwtAuthManager;

        public AccountController(ILogger<AccountController> logger, IUser userService, IJWTServiceManager jwtAuthManager)
        {
            _logger = logger;
            _userService = userService;
            _jwtAuthManager = jwtAuthManager;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public ActionResult Login([FromBody] LoginRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            if (!_userService.IsValidUserCredentials(request.UserEmail, request.Password))
            {
                Response.Headers.Remove("WWW-Authenticate");
                return Unauthorized(new { Error = "Invalid username or password" });
            }

            var role = _userService.GetUserRole(request.UserEmail);
            var name = _userService.GetUserName(request.UserEmail);
            var claims = new[]
            {
                new Claim(ClaimTypes.Name,name),
                new Claim(ClaimTypes.Role, role),
                new Claim(ClaimTypes.Email, request.UserEmail)
            };

            var jwtResult = _jwtAuthManager.GenerateTokens(name, claims, DateTime.Now);
            _logger.LogInformation($"User [{name}] logged in the system.");
            return Ok(new LoginResult
            {
                UserName = name,
                Role = role,
                AccessToken = jwtResult.AccessToken,
                Expires = jwtResult.Expires
            });
        }

        [HttpGet("user")]
        [Authorize]
        public ActionResult GetCurrentUser()
        {
            return Ok(new LoginResult
            {
                UserName = User.Identity?.Name,
                Role = User.FindFirst(ClaimTypes.Role)?.Value ?? string.Empty,
                OriginalUserName = User.FindFirst("OriginalUserName")?.Value
            });
        }

      
    }
}

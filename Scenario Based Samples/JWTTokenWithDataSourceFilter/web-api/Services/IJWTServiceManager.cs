using System.Collections.Immutable;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace boldbi.web.api.Services
{
    public interface IJWTServiceManager
    {
        JwtAuthResult GenerateTokens(string username, Claim[] claims, DateTime now);
        (ClaimsPrincipal, JwtSecurityToken) DecodeJwtToken(string token);
    }
}

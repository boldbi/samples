using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace IframeFullServer.Models
{
    public class TokenHelper
    {
        private readonly IConfiguration _configuration;

        public TokenHelper()
        {
            var config = new ConfigurationBuilder()
              .AddJsonFile("appsettings.json")
                .Build();

            _configuration = config;
        }

        public string GenerateJSONWebToken(User userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["jwt:signingkey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature, SecurityAlgorithms.Sha256Digest);

            var claims = new[] {
        new Claim(JWTSSOClaims.Upn, new System.Net.Mail.MailAddress(userInfo.Email).User),
        new Claim(JWTSSOClaims.Email, userInfo.Email),
        new Claim(JWTSSOClaims.FirstName, new System.Net.Mail.MailAddress(userInfo.Email).User),
        new Claim(JWTSSOClaims.LastName, new System.Net.Mail.MailAddress(userInfo.Email).User),
        new Claim(JWTSSOClaims.Sub, _configuration["user:userid"].ToLower())
            };

            var token = new JwtSecurityToken(claims: claims,
                expires: DateTime.Now.AddMinutes(Convert.ToInt32(_configuration["ExpirationTimeInMinutes"])),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    public class JWTSSOClaims
    {
        public const string Sub = "sub";

        public const string Upn = "upn";

        public const string Email = "email";

        public const string FirstName = "first_name";

        public const string LastName = "last_name";

        public const string Phone = "phone";
    }

}
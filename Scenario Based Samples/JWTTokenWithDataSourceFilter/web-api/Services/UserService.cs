using boldbi.web.api.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace boldbi.web.api.Services
{
    public class UserService:IUser
    {
        private readonly ILogger<UserService> _logger;
        private readonly ApplicationDbContext _dbContext;
        private readonly IPasswordHasher<UserCustomAttribute> _passwordHasher;

        public UserService(ILogger<UserService> logger, ApplicationDbContext dbContext, IPasswordHasher<UserCustomAttribute> passwordHasher)
        {
            _logger = logger;
            _dbContext = dbContext;
            _passwordHasher = passwordHasher;
        }

        public bool IsValidUserCredentials(string userEmail, string password)
        {
            _logger.LogInformation($"Validating user [{userEmail}]");

            if (string.IsNullOrWhiteSpace(userEmail) || string.IsNullOrWhiteSpace(password))
            {
                return false;
            }

            // Use EF.Functions.Like for case-insensitive comparison
            var user = _dbContext.usercustomattributes
                .FirstOrDefault(u => EF.Functions.Like(u.useremail, userEmail));

            if (user == null)
            {
                return false;
            }
            return user.password == password;
        }


        public bool IsAnExistingUser(string userName)
        {
            return _dbContext.usercustomattributes
                .Any(u => EF.Functions.Like(u.username, userName));
        }

        public string GetUserRole(string userEmail)
        {
            var user = _dbContext.usercustomattributes
                .FirstOrDefault(u => u.useremail == userEmail);

            if (user == null)
            {
                return string.Empty;
            }

            return user.role;
        }

        public string GetUserName(string userEmail)
        {
            _logger.LogInformation($"Fetching name for user [{userEmail}]");

            var user = _dbContext.usercustomattributes
                .FirstOrDefault(u => EF.Functions.Like(u.useremail, userEmail)); // Case-insensitive comparison in SQL

            if (user == null)
            {
                return null;
            }

            return user.username;
        }

    }

    public static class UserRoles
    {
        public const string Admin = nameof(Admin);
        public const string BasicUser = nameof(BasicUser);
    }
}


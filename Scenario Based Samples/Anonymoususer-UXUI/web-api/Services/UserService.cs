using boldbi.web.api.Model;

namespace boldbi.web.api.Services
{
    public class UserService:IUser
    {
        private readonly ILogger<UserService> _logger;

        private readonly IDictionary<string, (string, string)> _users = new Dictionary<string, (string, string)>(StringComparer.OrdinalIgnoreCase)
        {
            { "jack@alphaelectronics.com", ("Jack@123", "") },
            { "grace@alphaelectronics.com", ("Grace@123", "") },
            { "henry@alphaelectronics.com", ("Henry@123", "") },
            { "leo@alphaelectronics.com", ("Leo@123", "") },
            { "ella@betaenterprise.com", ("Ella@123", "") },
            { "sam@betaenterprise.com", ("Sam@123", "") },
            { "lily@betaenterprise.com", ("Lily@123", "") },
            { "alex@betaenterprise.com", ("Alex@123", "") },
            { "ryan@gammaindustries.com", ("Ryan@123", "") },
            { "kate@gammaindustries.com", ("Kate@123", "") },
            { "eric@gammaindustries.com", ("Eric@123", "") },
            { "jake@gammaindustries.com", ("Jake@123", "") },
            { "paul@deltaindustries.com", ("Paul@123", "") },
            { "nora@deltaindustries.com", ("Nora@123", "") },
            { "luke@deltaindustries.com", ("Luke@123", "") },
            { "amy@deltaindustries.com", ("Amy@123", "") }
        };

        // inject your database here for user validation
        public UserService(ILogger<UserService> logger)
        {
            _logger = logger;
        }

        public bool IsValidUserCredentials(string userName, string password)
        {
            _logger.LogInformation($"Validating user [{userName}]");
            if (string.IsNullOrWhiteSpace(userName) || string.IsNullOrWhiteSpace(password))
            {
                return false;
            }
            return _users.TryGetValue(userName, out var p) && p.Item1 == password;
        }

        public bool IsAnExistingUser(string userName)
        {
            return _users.ContainsKey(userName);
        }

        public string GetUserRole(string userName)
        {
            if (!IsAnExistingUser(userName))
            {
                return string.Empty;
            }

            if (userName == "admin")
            {
                return UserRoles.Admin;
            }

            return UserRoles.BasicUser;
        }
        public string GetUserEmail(string userName)
        {
            if (_users.TryGetValue(userName, out var userTuple))
            {
                return userTuple.Item2; 
            }

            return null;
        }
    }

    public static class UserRoles
    {
        public const string Admin = nameof(Admin);
        public const string BasicUser = nameof(BasicUser);
    }
}


using boldbi.web.api.Model;

namespace boldbi.web.api.Services
{
    public class UserService:IUser
    {
        private readonly ILogger<UserService> _logger;

        private readonly IDictionary<string, (string, string)> _users = new Dictionary<string, (string, string)>(StringComparer.OrdinalIgnoreCase)
        {
            //{ "John", ("John@123", "john.smith@example.com") },
            //{ "Sarah", ("Sarah@123", "sarah.johnson@example.com") },
            //{ "Michael",("Michael@123","michael.brown@example.com")},
            //{ "anuabarna.b@syncfusion.com", ("Anu@123", "") },

            { "Admin", ("Admin@123", "") },
            { "anuabarna.b@syncfusion.com", ("Anu@123", "") },
            { "demo@boldbi.com", ("Demo@123", "") },
            { "emily@alphaelectronics.com", ("Emily@123", "") },
            { "john@betaelectronics.com", ("John@123", "") },
            { "john@betaindustry.com", ("John@1234", "") },
            { "sarah@gammaelectronics.com", ("Sarah@123", "") },
            { "david@gammaelectronics.com", ("David@123", "") },
            { "michel@deltaelectronics.com", ("Micael@123", "") },
            { "jose@betaelectronics.com", ("Jose@123", "") },
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


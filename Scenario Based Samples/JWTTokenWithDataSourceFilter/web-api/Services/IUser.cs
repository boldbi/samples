namespace boldbi.web.api.Services
{
    public interface IUser
    {
        bool IsAnExistingUser(string userName);
        bool IsValidUserCredentials(string userName, string password);
        string GetUserRole(string userName);
        string GetUserName(string userName);
        string GetUserTenant(string requestUserEmail);
        IEnumerable<UserCustomAttribute>? GetAllUsers();
    }
}

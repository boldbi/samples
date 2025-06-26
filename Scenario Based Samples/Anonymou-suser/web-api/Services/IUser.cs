namespace boldbi.web.api.Services
{
    public interface IUser
    {
        bool IsAnExistingUser(string userName);
        bool IsValidUserCredentials(string userName, string password);
        string GetUserRole(string userName);
        string GetUserEmail(string userName);
    }
}

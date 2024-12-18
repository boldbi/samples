namespace boldbi.web.api;

using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    // public DbSet<UserCustomAttribute> usercustomattributes { get; set; }
    public DbSet<UserCustomAttribute> staging_usercustomattributes { get; set; }
}

public class UserCustomAttribute
{
    public int id { get; set; }
    public string username { get; set; }
    public string useremail { get; set; }
    public string password { get; set; }
    public string customattribute { get; set; }
    public string role { get; set; }
    public string usertenant { get; set; }
}

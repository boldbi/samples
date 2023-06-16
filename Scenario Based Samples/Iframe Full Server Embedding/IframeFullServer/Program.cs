using Microsoft.AspNetCore.Authentication.Cookies;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container. 
        ConfigureServices(builder.Services);

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (!app.Environment.IsDevelopment())
        {
            app.UseExceptionHandler("/Home/Error");
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles();

        app.UseRouting();
        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllerRoute(
            name: "default",
            pattern: "{controller=Home}/{action=Index}/{id?}");

        app.Run();
    }
    public static void ConfigureServices(IServiceCollection services)
    {
        services.AddControllersWithViews();

        services.AddAuthentication(options =>
        {
            options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        })
        .AddCookie(options =>
        {
            options.Cookie.Name = "UserCookie"; //Use any name
            options.LoginPath = "/Home/Login"; // Specify your login page URL
        });

        services.AddAuthorization();
    }
}
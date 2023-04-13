//using BoldBI.Embedded.Sample.Models;
//using Newtonsoft.Json;

//namespace BoldBI.Embed.Sample
//{
//    public class Program
//    {
//        static void Main(string[] args)
//        {
//            var builder = WebApplication.CreateBuilder(args);

//            // Add services to the container.
//            builder.Services.AddControllersWithViews();

//            var app = builder.Build();

//            var loggerFactory = LoggerFactory.Create(builder =>
//            {
//                builder.AddConsole();
//            });
//            var logger = loggerFactory.CreateLogger<Program>();

//            try
//            {
//                string BasePath = AppDomain.CurrentDomain.BaseDirectory;
//                string jsonString = File.ReadAllText(BasePath + "\\app_data\\embedConfig.json");
//                GlobalAppSettings.EmbedDetails = JsonConvert.DeserializeObject<EmbedDetails>(jsonString);
//                app.MapControllerRoute(
//                name: "default",
//                pattern: "{controller=Home}/{action=ErrorLog}/{id?}");
//                // string errorMessage = "An error occurred: ";
//                // MessageBox.Show(errorMessage, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
//            }
//            catch (Exception)
//            {
//                app.MapControllerRoute(
//                name: "default",
//                pattern: "{controller=Home}/{action=EmbedConfigErrorLog}/{id?}");
//            }
//            //catch (Exception)
//            //{
//            //    Console.Error.WriteLine($"Please download the embed JSON file and configure the values in the embedConfig.json file.");  
//            //}

//            // Configure the HTTP request pipeline.
//            if (!app.Environment.IsDevelopment())
//            {
//                app.UseExceptionHandler("/Home/Error");
//                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
//                app.UseHsts();
//            }

//            app.UseHttpsRedirection();
//            app.UseStaticFiles();

//            app.UseRouting();

//            app.UseAuthorization();

//            app.MapControllerRoute(
//                name: "default",
//                pattern: "{controller=Home}/{action=Index}/{id?}");

//            app.Run();
//        }
//    }
//}



using BoldBI.Embedded.Sample.Models;
using Newtonsoft.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

try
{
    string BasePath = AppDomain.CurrentDomain.BaseDirectory;
    string jsonString = File.ReadAllText(BasePath + "\\app_data\\embedConfig.json");
    GlobalAppSettings.EmbedDetails = JsonConvert.DeserializeObject<EmbedDetails>(jsonString);
}
catch (Exception)
{
    app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=EmbedConfigErrorLog}");
}

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

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();


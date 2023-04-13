using BoldBI.Embedded.Sample.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace BoldBI.Embed.Sample
{
    public class Program
    {

        private static ILogger<Program> _logger;
        public Program(ILogger<Program> logger)
        {
            _logger = logger;
        }

        public static void OnGet()
        {
            //_logger.LogInformation("About page visited at {DT}");
            Console.WriteLine("Content");
        }

        static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Logging.ClearProviders();
            builder.Logging.AddConsole();

            // Add services to the container.
            builder.Services.AddControllersWithViews();

            var app = builder.Build();

            var loggerFactory = LoggerFactory.Create(builder =>
            {
                builder.AddConsole();
            });

            var logger = loggerFactory.CreateLogger<Program>();

           // using var loggerFactory = LoggerFactory.Create(loggingBuilder => loggingBuilder
           //.SetMinimumLevel(LogLevel.Trace)
           //.AddConsole());

            try
            {
                string BasePath = AppDomain.CurrentDomain.BaseDirectory;
                string jsonString = File.ReadAllText(BasePath + "\\app_data\\embedConfig.json");
                GlobalAppSettings.EmbedDetails = JsonConvert.DeserializeObject<EmbedDetails>(jsonString);
                Console.Error.WriteLine($"Please download the embed JSON file and configure the values in the embedConfig.json file.");
            }
            catch (Exception)
            {
                //ILogger logger = loggerFactory.CreateLogger<Program>();
                //logger.LogInformation("Example log message");
                //Console.Error.WriteLine($"An error occurred: {ex.Message}");
                //logger.LogError(ex, "Error reading embedConfig.json");
                //System.Diagnostics.Debug.WriteLine("This is a log");
                //System.Console.WriteLine("Cir");
                //Console.Error.WriteLine("Failed to perform operation");
                Console.Error.WriteLine($"Please download the embed JSON file and configure the values in the embedConfig.json file.");
                //  Console.WriteLine($"Error: Message");
                // _logger.LogError(ex, "An error occurred while doing something important.");
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
        }


        //public static IHostBuilder CreateHostBuilder(string[] args) =>
        //Host.CreateDefaultBuilder(args)
        //.ConfigureLogging(logging =>
        //{
        //    logging.ClearProviders();
        //    logging.AddConsole();
        //});
    }
}


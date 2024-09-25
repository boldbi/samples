// <copyright file="Startup.cs" company="Syncfusion Inc">
// Copyright (c) Syncfusion Inc. All rights reserved.
// </copyright>

namespace SampleCoreApp
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Runtime.InteropServices;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.HttpsPolicy;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.ResponseCompression;
    using Microsoft.AspNetCore.Rewrite;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Newtonsoft.Json;
    using SampleCoreApp.Controllers;
    using SampleCoreApp.Models;

    /// <summary>
    /// Starup class.
    /// </summary>
    public class Startup
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="Startup"/> class.
        /// Startup Constructor.
        /// </summary>
        /// <param name="configuration">Iconfiguration parameter.</param>
        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        /// <summary>
        /// Gets or sets basePath member.
        /// </summary>
        public static string BasePath { get; set; }

        /// <summary>
        /// Gets configuration member.
        /// </summary>
        public IConfiguration Configuration { get; }

        /// <summary>
        /// This method gets called by the runtime. Use this method to add services to the container.
        /// </summary>
        /// <param name="services">Service collection parameter.</param>
        [ObsoleteAttribute("This property is obsolete. Use NewProperty instead.", false)]
        public static void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc(options => options.EnableEndpointRouting = false);
            services.AddResponseCompression(options =>
            {
                options.EnableForHttps = true;
                options.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(new[]
                {
                    "image/svg+xml",
                    "image/png",
                    "image/jpg"
                }).ToList();
                options.Providers.Add<GzipCompressionProvider>();
            });
            services.AddAntiforgery(options =>
            {
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            });
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddHttpContextAccessor();
            services.AddRazorPages().AddRazorRuntimeCompilation();
        }

        /// <summary>
        /// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// </summary>
        /// <param name="app">IApplicationBuilder parameter.</param>
        /// <param name="env">IHostenvironment parameter.</param>

        public static void Configure(IApplicationBuilder app, IHostEnvironment env)
        {
            app.Use(async (context, next) =>
            {
                if (context.Request.Path.Equals("/embed", StringComparison.OrdinalIgnoreCase))
                {
                    context.Response.Redirect("/");
                    return;
                }

                await next();
            });
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UsePathBase("/");
            app.UseCookiePolicy();
            app.UseMvc(routes =>
            {
                routes.MapRoute("dashboardsample", "{categoryName}/{sampleName?}", defaults: new { controller = "Home", action = "Index" });
                routes.MapRoute(
                   name: "default",
                   template: "/{controller=Home}/{action=Index}/{id?}");
            });
            BasePath = env?.ContentRootPath;
        }
    }
}
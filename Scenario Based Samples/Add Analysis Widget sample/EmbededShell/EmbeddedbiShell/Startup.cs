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
            //services.Configure<CookiePolicyOptions>(options =>
            //{
            //    // This lambda determines whether user consent for non-essential cookies is needed for a given request.
            //    options.CheckConsentNeeded = context => true;
            //    options.MinimumSameSitePolicy = SameSiteMode.None;
            //});
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

            //app.UseRewriter(new RewriteOptions().AddRedirectToHttps());
            //app.Use(async (context, next) =>
            //{
            //    //Commented to improve performance
            //    //context.Response.Headers.Add("Cache-Control", "no-cache");
            //    context.Response.Headers.Add("X-Frame-Options", "SAMEORIGIN");
            //    context.Response.Headers.Add("Cross-Origin-Opener-Policy", "SAMEORIGIN");
            //    context.Response.Headers.Add("X-Content-Type-Options", "nosniff");
            //    context.Response.Headers.Add("Content-Security-Policy", "font-src 'self' https://cdn.boldbi.com https://demo-adhoc.boldbi.com https://fonts.gstatic.com https://code.ionicframework.com https://client.crisp.chat data:; style-src 'self' https://cdn.boldbi.com https://fonts.googleapis.com https://code.ionicframework.com https://code.ionicframework.com https://r.bing.com https://client.crisp.chat https://demo-adhoc.boldbi.com https://www.bing.com 'unsafe-inline'; script-src 'self' https://data.boldbi.com https://certify-js.alexametrics.com https://demo-adhoc.boldbi.com https://r.bing.com https://client.crisp.chat https://www.googletagmanager.com https://cdnjs.cloudflare.com https://cdn.boldbi.com https://code.jquery.com https://www.google-analytics.com/analytics.js https://www.bing.com data: 'unsafe-inline' 'unsafe-eval';  img-src 'self' https://cdn.boldbi.com https://acd66d002472745f90339854c65a13390.profile.iad79-c2.cloudfront.net https://a83243951f3d23ac93783d3311ed5ae13.profile.mci50-p2.cloudfront.net/ https://ae7aae901734299e0744ad4fb49d2cc03.profile.nrt51-p2.cloudfront.net https://www.google.com https://www.google.co.in https://redirect.prod.experiment.routing.cloudfront.aws.a2z.com https://certify.alexametrics.com https://demo-adhoc.boldbi.com https://cdn.syncfusion.com https://image.crisp.chat https://www.googletagmanager.com https://www.google-analytics.com/collect data:;  connect-src 'self' wss://localhost:44367/SampleCoreApp/ wss://client.relay.crisp.chat wss://localhost:44392/SampleCoreApp/ wss://localhost:44347/SampleCoreApp/ https://data.boldbi.com https://demo-adhoc.boldbi.com https://www.bing.com https://r.bing.com https://www.google-analytics.com https://stats.g.doubleclick.net;  frame-src 'self' https://demo-adhoc.boldbi.com");
            //    await next().ConfigureAwait(false);
            //});

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UsePathBase("/");
            app.UseCookiePolicy();
            //app.UseCors("AllowAll");
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
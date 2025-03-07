using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using boldbi.web.api.Services;
using boldbi.web.api.Model;


var builder = WebApplication.CreateBuilder(args);

builder.Configuration.SetBasePath(Directory.GetCurrentDirectory());
builder.Configuration.AddJsonFile("appsettings.json");

//Adding boldbi embedConfig json to service configuration
builder.Configuration.AddJsonFile("embedConfig.json"); 


var jwtTokenConfig = builder.Configuration.GetSection("jwtTokenConfig").Get<JwtTokenConfig>();
builder.Services.AddSingleton(jwtTokenConfig);
var boldBIProperties = builder.Configuration.Get<EmbedDetails>();
builder.Services.AddSingleton(boldBIProperties);
builder.Services.AddControllers().AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null); 
builder.Services.AddAuthentication(k =>
{
    k.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    k.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(p =>
{
    p.SaveToken = true;
    p.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = jwtTokenConfig.Issuer,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtTokenConfig.Secret)),
        ValidAudience = jwtTokenConfig.Audience,
        ValidateAudience = true,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.FromMinutes(1)
    };
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => { builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader(); });
});

builder.Services.AddScoped<IUser, UserService>();
builder.Services.AddSingleton<IJWTServiceManager, JWTServiceManager>();



var app = builder.Build();
app.UseRouting();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();
app.UsePathBase("/row-level-security/anonymous-webapi");
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});
app.Run();


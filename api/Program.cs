using System.Text;
using api.Data;
using api.Repositories;
using api.Services;
using api.Settings;
using dotenv.net;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

DotEnv.Load();

if (!Directory.Exists("wwwroot"))
{
    Directory.CreateDirectory("wwwroot");
    FileUploadService.LoadDefaultImage();
}

var builder = WebApplication.CreateBuilder(args);
var jwtKey = Encoding.ASCII.GetBytes(Settings.GetJwtKey());

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<TokenService>();
builder.Services.AddScoped<PostRepository>();
builder.Services.AddScoped<PostService>();
builder.Services.AddScoped<CityRepository>();
builder.Services.AddScoped<CityService>();
builder.Services.AddScoped<FileUploadService>();

builder.Services.AddHttpContextAccessor();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<Context>(
    options =>
        options.UseMySql(
            builder.Configuration.GetConnectionString("Connection"),
            ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("Connection"))
        )
);

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(
        "Firebase",
        options =>
        {
            var projectId = System.Environment.GetEnvironmentVariable("FIREBASE_APP_ID");
            options.Authority = $"https://securetoken.google.com/{projectId}";
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = $"https://securetoken.google.com/{projectId}",
                ValidateAudience = true,
                ValidAudience = $"{projectId}",
                ValidateLifetime = true
            };
        }
    )
    .AddJwtBearer(auth =>
    {
        auth.RequireHttpsMetadata = false;
        auth.SaveToken = true;
        auth.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(jwtKey),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader();
        }
    );
});

var app = builder.Build();

app.UseHttpsRedirection();
app.UseStaticFiles(new StaticFileOptions { RequestPath = "/api/public" });

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(MyAllowSpecificOrigins);

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

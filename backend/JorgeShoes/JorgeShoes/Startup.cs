using JorgeShoes.Context;
using JorgeShoes.Models;
using JorgeShoes.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace JorgeShoes
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;

            //Para ser possível atualizar as settings em runtime
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddEnvironmentVariables();

            Configuration = builder.Build();
        }
        public IConfiguration Configuration { get; set; }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();

                builder.WithOrigins("http://localhost:3000", "https://localhost:3000")
                       .AllowAnyMethod()
                       .AllowAnyHeader()
                       .AllowCredentials();
            }));

            services.AddMvc().AddSessionStateTempDataProvider();
            services.AddSession(options =>
            {
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
                options.Cookie.SameSite = SameSiteMode.Strict;
                options.Cookie.HttpOnly = true;
                options.Cookie.MaxAge = TimeSpan.FromDays(7);
                options.IdleTimeout = TimeSpan.FromDays(7);
                options.IOTimeout = TimeSpan.FromDays(7);
            });

            services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));


            services.AddScoped<IProductService, ProductsService>();
            services.AddScoped<IProductTypeService, ProductTypeService>();

            services.AddControllers();
            services.AddSignalR();

            services.AddHttpContextAccessor();

            services.AddSwaggerGen(options => {
                options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
                {
                    Description = "Standard Authorization header using the Bearer scheme (\"bearer {token}\")",
                    In = ParameterLocation.Header,
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey
                });

                options.OperationFilter<SecurityRequirementsOperationFilter>();
            });

            services.AddIdentity<ApplicationUser, ApplicationRoles>(options =>
            {
                options.SignIn.RequireConfirmedAccount = false;
            }).AddEntityFrameworkStores<AppDbContext>().AddDefaultTokenProviders();

            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequireUppercase = true;
                options.Password.RequiredLength = 8;
            });

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ClockSkew = TimeSpan.Zero,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration["Jwt:Key"])),
                    ValidateLifetime = false,
                    ValidateAudience = true,
                    ValidAudience = Configuration["Jwt:Issuer"],
                    ValidateIssuer = true,
                    ValidIssuer = Configuration["Jwt:Issuer"],
                    ValidateIssuerSigningKey = true
                };
                options.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        context.Response.StatusCode = 401;
                        return Task.FromResult<object>(null);
                    },
                    OnTokenValidated = context =>
                    {
                        var _userManager = context.HttpContext.RequestServices.GetRequiredService<UserManager<ApplicationUser>>();

                        var userID = context.Principal.Claims.Where(x => x.Type == ClaimTypes.NameIdentifier).FirstOrDefault().Value;

                        if (userID is null)
                        {
                            context.Response.StatusCode = 401;
                            context.Fail("invalid Data");
                            return Task.CompletedTask;
                        }
                        var user = _userManager.Users
                        .Include(u => u.UserRoles).
                        ThenInclude(t => t.Roles).
                        Single(o => o.Id == userID);

                        if (user is null)
                        {
                            context.Response.StatusCode = 401;
                            context.Fail("Invalid Data");
                            return Task.CompletedTask;
                        }

                        var jwtUserRoles = context.Principal.Claims.Where(x => x.Type == ClaimTypes.Role).ToList();
                        if (jwtUserRoles.Count == 0)
                        {
                            context.Response.StatusCode = 401;
                            context.Fail("Invalid Data");
                            return Task.CompletedTask;
                        }

                        var userRoles = user.UserRoles.Select(x => x.Roles.Name).ToList();
                        if (userRoles.Count == 0)
                        {
                            context.Response.StatusCode = 401;
                            context.Fail("Invalid Data");
                            return Task.CompletedTask;
                        }

                        foreach (var jwtUserRole in jwtUserRoles)
                        {
                            var doesUserHaveRole = userRoles.Contains(jwtUserRole.Value);
                            if (doesUserHaveRole == false)
                            {
                                context.Response.StatusCode = 401;
                                context.Fail("Invalid Data");
                                return Task.CompletedTask;
                            }
                        }
                        return Task.CompletedTask;

                    }
                };
            });

            services.AddTransient<IProductService, ProductsService>();
            services.AddTransient<IProductTypeService, ProductTypeService>();
            services.AddTransient<IAuthenticationServices, AuthenticationService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IEmailService, EmailService>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider serviceProvider, AppDbContext applicationDbContext)
        {

            applicationDbContext.Database.Migrate();

            // Configure the HTTP request pipeline.
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Livros v1"));
            }
            app.UseSession();

            app.UseRouting();

            app.UseHttpsRedirection();

            app.UseStaticFiles();
            app.UseDefaultFiles();
            app.UseAuthorization();
            app.UseAuthentication();

            app.UseCors("MyPolicy");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            CreateUserRoles(serviceProvider).Wait();
        }

        private async Task CreateUserRoles(IServiceProvider serviceProvider)
        {
            var UserManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();

            foreach (var role in Roles.List)
            {
                await CreateRole(serviceProvider, role.Value);
            }

            //ADMIN
            var userADMIN = "admin@gmail.com";
            ApplicationUser auADMIN = await UserManager.FindByEmailAsync(userADMIN);
            if (auADMIN == null)
            {
                auADMIN = new ApplicationUser
                {
                    Email = "admin@gmail.com",
                    EmailConfirmed = true,
                    UserName = "admin@gmail.com",
                    Name = "Admin",
                    DateCreated = DateTime.Now,

                };
                await UserManager.CreateAsync(auADMIN, "Pass1234@");
            }
            await UserManager.AddToRolesAsync(auADMIN, new List<string> { Roles.Admin.Value });
        }

        public async Task CreateRole(IServiceProvider serviceProvider, string roleName)
        {
            var RoleManager = serviceProvider.GetRequiredService<RoleManager<ApplicationRoles>>();
            if (await RoleManager.RoleExistsAsync(roleName) == false)
            {
                await RoleManager.CreateAsync(new ApplicationRoles(roleName));
            }
        }
    }
}

using Internet_Store.ApiJson;
using Internet_Store.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text.RegularExpressions;

namespace Internet_Store.Controllers
{
    [ApiController]
    [Route("Internetstore/[controller]/[action]")]
    public class AuthController : ControllerBase
    {
        [HttpPost]
        public async  Task<IActionResult> LoginUser(LoginJson user)
        {
            using(AppDbContext context= new AppDbContext()) {
                var user_ = context.Users.FirstOrDefaultAsync<User>(x=> x.Email==user.Email && x.Password==user.Password);
                if(user_ is  null)
                {
                    return BadRequest("Неправильный логин или пароль");
                }
                List<Claim> Claims = new List<Claim>();
                Claims.Add(new Claim(ClaimTypes.Name, user_.Result.Name));
                Claims.Add(new Claim(ClaimTypes.Role, "User"));
                var jwt = new JwtSecurityToken(issuer: AuthOptions.ISSUER,// создание токенов для возвращения метода
                audience: AuthOptions.AUDIENCE,
                claims: Claims,
                expires: DateTime.UtcNow.Add(TimeSpan.FromHours(2)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymSecurityKey(), SecurityAlgorithms.HmacSha256));
                Claims.Add(new Claim(ClaimTypes.Authentication, new JwtSecurityTokenHandler().WriteToken(jwt)));
                return Ok(new AccesTokenHandler { AccessToken= new JwtSecurityTokenHandler().WriteToken(jwt)});
            }
        }
        [HttpPost]
        public async Task<IActionResult> LoginAdmin(LoginJson user)
        {
            using (AppDbContext context = new AppDbContext())
            {
                var user_ = context.Workers.FirstOrDefaultAsync<Worker>(x => x.Email == user.Email && x.Password == user.Password);
                if (user_ is null)
                {
                    return BadRequest("Неправильный логин или пароль");
                }
                List<Claim> Claims = new List<Claim>();
                Claims.Add(new Claim(ClaimTypes.Name, user_.Result.Name));
                Claims.Add(new Claim(ClaimTypes.Role, "Admin"));
                var jwt = new JwtSecurityToken(issuer: AuthOptions.ISSUER,// создание токенов для возвращения метода
                audience: AuthOptions.AUDIENCE,
                claims: Claims,
                expires: DateTime.UtcNow.Add(TimeSpan.FromHours(2)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymSecurityKey(), SecurityAlgorithms.HmacSha256));
                Claims.Add(new Claim(ClaimTypes.Authentication, new JwtSecurityTokenHandler().WriteToken(jwt)));
                return Ok(new AccesTokenHandler { AccessToken = new JwtSecurityTokenHandler().WriteToken(jwt) });
            }
        }
        [HttpPost]

        public async Task<IActionResult> Register(string name, string email, string password)
        {
            // Регулярное выражение для проверки email
            string pattern = @"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$";
            bool isValidEmail = Regex.IsMatch(email, pattern);
            if (isValidEmail)
            {
                using (AppDbContext context = new AppDbContext())
                {
                    var findUser = await context.Users.FirstOrDefaultAsync(u => u.Email == email);
                    if (findUser is null)
                    {
                        var people = new User()
                        {
                            Name = name,
                            Email = email,
                            Password = password
                        };
                        await context.Users.AddAsync(people);
                        await context.SaveChangesAsync();
                    }
                    else return BadRequest("Пользователь с такой почтой уже существует");

                }
                return Ok();
            }
            else return BadRequest("Неправильная почта");

        }
    }
}

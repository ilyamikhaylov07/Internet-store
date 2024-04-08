using Internet_Store.ApiJson;
using Internet_Store.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

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
    }
}

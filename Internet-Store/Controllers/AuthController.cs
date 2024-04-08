using Internet_Store.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace Internet_Store.Controllers
{
    [ApiController]
    [Route("Internetstore/[controller]/[action]")]
    public class AuthController : ControllerBase
    {
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

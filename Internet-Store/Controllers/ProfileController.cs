using Internet_Store.ApiJsonResponse;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Internet_Store.Controllers
{
    [ApiController]
    [Route("Internetstore/[controller]/[action]")]
    public class ProfileController : ControllerBase
    {
        [Authorize(AuthenticationSchemes = "Access", Roles = "User")]
        [HttpGet]
        public async Task<IActionResult> GetUserInProfile()
        {
            using (AppDbContext context = new AppDbContext())
            {

                var user_email = HttpContext.User.FindFirstValue(ClaimTypes.Email);
                if (user_email != null)
                {
                    var users = await context.Users.Where(u => u.Email == user_email).ToListAsync();

                    if (users.Count > 0)
                    {
                        var user = users[0];
                        return Ok(new ResponseUserLK()
                        {
                            Id = user.Id,
                            Name = user.Name,
                            Email = user.Email,
                            NumberPhone = user.NumberPhone,
                            Password = user.Password,
                            EmailToken = user.EmailToken,
                            IsConfirmed = user.IsConfirmed
                        });
                    }
                    else return BadRequest("User not exists");

                }
                else return NotFound("User NotFound");

            }

        }
    }
}

using Internet_Store.ApiJsonResponse;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Internet_Store.Controllers
{
    [ApiController]
    [Route("Internetstore/[controller]/[action]")]
    public class AdminController : ControllerBase
    {
        [Authorize(AuthenticationSchemes = "Access", Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAdminInProfile()
        {
            using (AppDbContext context = new AppDbContext())
            {

                var admin_email = HttpContext.User.FindFirstValue(ClaimTypes.Email);
                if (admin_email != null)
                {
                    var admins = await context.Workers.Where(u => u.Email == admin_email).ToListAsync();

                    if (admins.Count > 0)
                    {
                        var admin = admins[0];
                        return Ok(new ResponseAdminLK()
                        {
                            Id = admin.Id,
                            Name = admin.Name,
                            Surname = admin.Surname,
                            Otchestvo = admin.Otchestvo,
                            Email = admin.Email,
                            NumberPhone = admin.NumberPhone,
        
                        });
                    }
                    else return BadRequest("Admin not exists");

                }
                else return NotFound("Admin NotFound");

            }
            
        }
    }
}

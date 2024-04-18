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
        [Authorize(AuthenticationSchemes = "Access", Roles = "User")]
        [HttpPost]

        public async Task<IActionResult> UpdateNumberPhoneUser(string numberphone)
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
                        user.NumberPhone = numberphone;
                        await context.SaveChangesAsync();
                        return Ok();
                    }
                    else return BadRequest("User not exists");

                }
                else return NotFound("User NotFound");

            }

        }

        [Authorize(AuthenticationSchemes = "Access", Roles = "User")]
        [HttpGet]

        public async Task<IActionResult> GetOrdersUser()
        {
            using (AppDbContext context = new AppDbContext())
            {
                var user_email = HttpContext.User.FindFirstValue(ClaimTypes.Email);
                if (user_email == null)
                {
                    return NotFound("User not found");
                }

                var user = await context.Users.FirstOrDefaultAsync(u => u.Email == user_email);
                if (user == null)
                {
                    return BadRequest("User not exists");
                }

                var orders = await context.Orders
                                          .Where(o => o.UserId == user.Id)
                                          .Include(o => o.Items)
                                            .ThenInclude(i => i.ModelWithSize)
                                            .ThenInclude(mws => mws.Model)
                                          .ToListAsync();

                if (!orders.Any())
                {
                    return Ok("Заказы не найдены");
                }
                var result = orders.Select(order => new
                {
                    order.Price,
                    order.PriceWithDelivery,
                    order.City,
                    order.Street,
                    order.House,
                    order.Index,
                    order.State,
                    Models = order.Items.Select(i => new
                    {
                        ModelName = i.ModelWithSize.Model.Name,
                        ModelSize = i.ModelWithSize.Size,
                        ModelColor = i.ModelWithSize.Model.Colour,
                        ModelPrice = i.ModelWithSize.Model.Price,
                        ModelImageUrl = System.IO.File.ReadAllBytes(Path.Combine(Directory.GetCurrentDirectory(), "Images", i.ModelWithSize.Model.Image_url))
                    }).ToList()
                });

                return Ok(result);

            }
        }

    }
}

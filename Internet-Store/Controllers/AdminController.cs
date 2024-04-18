using Internet_Store.ApiJson;
using Internet_Store.ApiJsonResponse;
using Internet_Store.Models;
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
        [Authorize(AuthenticationSchemes = "Access", Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> AddModel(AddModelJson addModel)
        {
            using (AppDbContext context = new AppDbContext())
            {
                var model = new Model()
                {
                    Name = addModel.Name,
                    Materials = addModel.Materials,
                    Price = addModel.Price,
                    Colour = addModel.Colour,
                    Brand = addModel.Brand,
                    Image_url = addModel.Image_url,
                    CategoryId = addModel.Category_id,
                    ModelWithSize = addModel.ModelWithSize.Select(s => new ModelWithSize()
                    {
                        Size = s.Size,
                        Amount = s.Amount,
                    }).ToList()

                };
                await context.Models.AddAsync(model);
                await context.SaveChangesAsync();
                return Ok("Товар успешно сохранился");
            }
        }

        [Authorize(AuthenticationSchemes = "Access", Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ResponseAllOrders>>> GetAllOrders()
        {
            using (AppDbContext context = new AppDbContext())
            {
                List<ResponseAllOrders> order = new List<ResponseAllOrders>();
                var orders = await context.Orders.ToListAsync();
                foreach (var o in orders)
                {
                    order.Add(new ResponseAllOrders
                    {
                        Id = o.Id,
                        Price = o.Price,
                        PriceWithDelivery = o.PriceWithDelivery,
                        City = o.City,
                        Street = o.Street,
                        House = o.House,
                        Index = o.Index,
                        State = o.State,
                        UserId = o.UserId,
                    });
                    
                }
                if(order.Count < 1) return Ok("Заказов нет"); 
                return Ok(order);
            }
        }

        [Authorize(AuthenticationSchemes = "Access", Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> UpdateState(string state, int orderId)
        {
            using (AppDbContext context = new AppDbContext())
            {
                var order = await context.Orders.Where(o => o.Id == orderId).FirstOrDefaultAsync();
                if (order == null) return BadRequest("Такого заказа не существует");
                order.State = state;
                await context.SaveChangesAsync();

                return Ok("Статус заказа изменён");
            }
        }

        [Authorize(AuthenticationSchemes = "Access", Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> AddCategory(AddCategoryJson addCategory)
        {
            using (AppDbContext context = new AppDbContext())
            {
                var category = new Category()
                {
                    Title = addCategory.Title
                };
                var findcategory = await context.Categories.FirstOrDefaultAsync(t => t.Title == category.Title);
                if (findcategory?.Title is null)
                {
                    await context.Categories.AddAsync(category);
                    await context.SaveChangesAsync();
                    return Ok("Категория успешно добавлена");
                }
                else return BadRequest("Такая категория уже существует");

            }

        }
    }
}

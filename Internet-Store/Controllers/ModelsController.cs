using Internet_Store.ApiJsonResponse;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Internet_Store.Controllers
{
    [ApiController]
    [Route("Internetstore/[controller]/[action]")]
    public class ModelsController : ControllerBase
    {
       
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ResponseModelWithCatalog>>> ModelWithCatalog()
        {
            
            using (AppDbContext context = new AppDbContext())
            {
                var models = await context.Models
                    .Select(m => new ResponseModelWithCatalog
                    {
                        Name = m.Name,
                        Price = m.Price,
                        Image = System.IO.File.ReadAllBytes(Path.Combine(Directory.GetCurrentDirectory(), "Images", m.Image_url))
                    })
                    .ToListAsync();
                
                return models;
            }

        }
    }
}

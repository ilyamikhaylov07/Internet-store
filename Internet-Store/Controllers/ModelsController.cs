using Internet_Store.ApiJsonResponse;
using Internet_Store.ModelFactories;
using Internet_Store.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Internet_Store.Controllers
{
    [ApiController]
    [Route("Internetstore/[controller]/[action]")]
    public class ModelsController : ControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ResponseModelWithCatalog>>> ModelWithCatalog()
        {
            try
            {
                using (AppDbContext context = new AppDbContext())
                {
                    List<ResponseModelWithCatalog> cardmodels = new List<ResponseModelWithCatalog>();
                    var modeles = await context.Models.ToListAsync();
                    foreach (Models.Model model in modeles)
                    {
                        var modelWithSize = await context.ModelWithSizes.Where(m => m.ModelId == model.Id).ToListAsync();
                        List<string> sizes = new List<string>();
                        foreach (var modelwithsizes in modelWithSize)    
                        {
                            sizes.Add(modelwithsizes.Size);
                        }
                        SizeSort.SortSizes(sizes);
                        cardmodels.Add(new ResponseModelWithCatalog()
                        {
                            Name = model.Name,
                            Image = System.IO.File.ReadAllBytes(Path.Combine(Directory.GetCurrentDirectory(), "Images", model.Image_url)),
                            Price = model.Price,
                            Sizes = sizes
                        });

                    }
                    return cardmodels;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }



        }

    }

}


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
                            Sizes = sizes,
                            Id = model.Id.ToString()
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
        [HttpPost]
        public async Task<ActionResult<IEnumerable<ResponseModelWithCatalog>>> CardsWithFIlter(Filters filters)
        {
            using (AppDbContext context = new AppDbContext())
            {
                if (filters.Categorie == null)
                {

                    List<ResponseModelWithCatalog> cardmodels = new List<ResponseModelWithCatalog>();
                    var allmodeles = await context.Models.ToListAsync();
                    List<Models.Model> models = new List<Models.Model>();
                    foreach(var model_ in allmodeles)
                    {
                        if(int.Parse(model_.Price)>=int.Parse(filters.From) && int.Parse(model_.Price) <= int.Parse(filters.To))
                        {
                            models.Add(model_);
                        }
                    }
                    foreach (Models.Model model in models)
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
                            Sizes = sizes,
                            Id=model.Id.ToString()
                        });
                    }
                    return cardmodels;
                }
                else
                {
                    List<ResponseModelWithCatalog> cardmodels = new List<ResponseModelWithCatalog>();
                    var allmodeles = await context.Models.ToListAsync();
                    List<Models.Model> models = new List<Models.Model>();
                    foreach (var model_ in allmodeles)
                    {
                        if (int.Parse(model_.Price) >= int.Parse(filters.From) && int.Parse(model_.Price) <= int.Parse(filters.To) && 
                            context.Categories.FirstOrDefault(m => m.Id==model_.CategoryId).Title==filters.Categorie)
                        {
                            models.Add(model_);
                        }
                    }
                    foreach (Models.Model model in models)
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
                            Sizes = sizes,
                            Id = model.Id.ToString()
                        });
                    }
                    return cardmodels;
                }
            }

        }
        [HttpPost]
        public async Task<ResponseModelPage> GetModelInfo(string id)
        {
            ResponseModelPage model = new ResponseModelPage();
            using (AppDbContext db = new AppDbContext())
            {
                var unfilteredmodel = await db.Models.FirstOrDefaultAsync(m => m.Id == int.Parse(id));
                model.Colour = unfilteredmodel.Colour;
                model.Name = unfilteredmodel.Name;
                model.Price = unfilteredmodel.Price;
                model.Brand = unfilteredmodel.Brand;
                model.Category=db.Categories.First(c=> c.Id==unfilteredmodel.CategoryId).Title;
                model.Image = System.IO.File.ReadAllBytes(Path.Combine(Directory.GetCurrentDirectory(), "Images", unfilteredmodel.Image_url));
                model.Materials = unfilteredmodel.Materials;
                var modelWithSize = await db.ModelWithSizes.Where(m => m.ModelId == unfilteredmodel.Id).ToListAsync();
                List<string> sizes = new List<string>();
                foreach (var modelwithsizes in modelWithSize)
                {
                    sizes.Add(modelwithsizes.Size);
                }
                SizeSort.SortSizes(sizes);
                model.Sizes = sizes;

            }
            return model;
        }
        [HttpGet]
        public async Task<List<string>> GetCategories()
        {
            using (AppDbContext db = new AppDbContext())
            {
                return await db.Categories.Select(c=>c.Title).ToListAsync();
            }
        }


    }
}


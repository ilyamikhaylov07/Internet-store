using Internet_Store.ApiJson;
using Internet_Store.ApiJsonResponse;
using Internet_Store.ModelFactories;
using Internet_Store.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

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
                return BadRequest();
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
                    foreach (var model_ in allmodeles)
                    {
                        if (int.Parse(model_.Price) >= int.Parse(filters.From) && int.Parse(model_.Price) <= int.Parse(filters.To))
                        {
                            models.Add(model_);
                        }
                    }
                    foreach (Models.Model model in models)
                    {
                        var modelWithSize = await context.ModelWithSizes.Where(m => m.ModelId == model.Id && m.Amount > 0).ToListAsync();
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
                else
                {
                    List<ResponseModelWithCatalog> cardmodels = new List<ResponseModelWithCatalog>();
                    var allmodeles = await context.Models.ToListAsync();
                    List<Models.Model> models = new List<Models.Model>();
                    foreach (var model_ in allmodeles)
                    {
                        if (int.Parse(model_.Price) >= int.Parse(filters.From) && int.Parse(model_.Price) <= int.Parse(filters.To) &&
                            context.Categories.FirstOrDefault(m => m.Id == model_.CategoryId).Title == filters.Categorie)
                        {
                            models.Add(model_);
                        }
                    }
                    foreach (Models.Model model in models)
                    {
                        var modelWithSize = await context.ModelWithSizes.Where(m => m.ModelId == model.Id && m.Amount > 0).ToListAsync();
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
                model.Id = unfilteredmodel.Id.ToString();
                model.Name = unfilteredmodel.Name;
                model.Price = unfilteredmodel.Price;
                model.Brand = unfilteredmodel.Brand;
                model.Category = db.Categories.First(c => c.Id == unfilteredmodel.CategoryId).Title;
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
                return await db.Categories.Select(c => c.Title).ToListAsync();
            }
        }
        [HttpPost]
        public async Task<ResponseCartModels> GetCardModelsByIdSize(ModelIdSize ModelInfo)
        {
            using (AppDbContext db = new AppDbContext())
            {
                ResponseCartModels responseCartModels = new ResponseCartModels();
                var unfilteredmodel = await db.Models.FirstOrDefaultAsync(m => m.Id == db.ModelWithSizes.FirstOrDefault(
                    ms => ms.ModelId.ToString() == ModelInfo.Id && ms.Size == ModelInfo.Size && ms.Amount > 0).ModelId);
                if (unfilteredmodel != null)
                {
                    responseCartModels.Brand = unfilteredmodel.Brand;
                    responseCartModels.Id = unfilteredmodel.Id.ToString();
                    responseCartModels.Price = unfilteredmodel.Price;
                    responseCartModels.Materials = unfilteredmodel.Materials;
                    responseCartModels.Size = ModelInfo.Size;
                    responseCartModels.Name = unfilteredmodel.Name;
                    responseCartModels.Image = System.IO.File.ReadAllBytes(Path.Combine(Directory.GetCurrentDirectory(), "Images", unfilteredmodel.Image_url));
                }
                return responseCartModels;

            }
        }
        [Authorize(AuthenticationSchemes = "Access", Roles = "User")]
        [HttpPost]
        public async Task<IActionResult> MakeOrder(OrderInfo orderInfo)
        {

            using (AppDbContext db = new AppDbContext())
            {
                Order order=new Order();
                order.Items=new List<Item>();
                var user_email = HttpContext.User.FindFirstValue(ClaimTypes.Email);
                var user = await db.Users.FirstOrDefaultAsync(u => u.Email == user_email);
                for (int i = 0; i < orderInfo.Idies.Count(); i++)
                {
                    var modelws = await db.ModelWithSizes.FirstOrDefaultAsync(m => m.ModelId.ToString() == orderInfo.Idies[i] && m.Size == orderInfo.Sizes[i]);
                    if (modelws.Amount > 0)
                    {
                        var item = db.Items.Add(new Item() { ModelWithSizeId = modelws.Id }).Entity;
                        if (user != null)
                        {
                            modelws.Amount -= 1;
                            order.Street=orderInfo.Street;
                            order.City=orderInfo.City;
                            order.Price=orderInfo.Price-1000;
                            order.PriceWithDelivery = orderInfo.Price;
                            order.House=orderInfo.House;
                            order.Index=orderInfo.Index;
                            order.User=user;
                            order.Items.Add(item);
                            order.State = "В обработке";
                            order.WorkerId = 1;
                        }
                    }
                    else
                    {
                        var model = await db.Models.FirstOrDefaultAsync(m => m.Id.ToString() == orderInfo.Idies[i]);
                        return BadRequest($"Изивинте, товар {model.Name} с размером {modelws.Size} закончился, пожалуйста, удалите его из корзины");
                        
                    }
                }
                db.Orders.Add(order);
                db.SaveChanges();
                return Ok("Заказ успешно оформлен");
            }
        }
        [HttpPost]
        public async Task<List<ResponseReaction>> GetReactionsForModel(string modelId)
        {
            using (AppDbContext db = new AppDbContext())
            {
                var Reactions = await (from r in db.Reactions
                                join u in db.Users on r.UserId equals u.Id
                                where r.ModelId.ToString() == modelId
                                select new ResponseReaction() { Name = u.Name, Text = r.Content }).ToListAsync();

                return Reactions;
            }
        }
        [Authorize(AuthenticationSchemes = "Access", Roles = "User")]
        [HttpPost]
        public async Task<IActionResult> PostReaction(ReactionInfo info)
        {
            using (AppDbContext db = new AppDbContext())
            {
                var user_email = HttpContext.User.FindFirstValue(ClaimTypes.Email);
                var user = await db.Users.FirstOrDefaultAsync(u => u.Email == user_email);
                if (user != null) {
                    db.Reactions.Add(new Reaction() { Content = info.Text, ModelId = int.Parse(info.ModelId), User = user });
                    db.SaveChanges();
                    return Ok("Комментарий успешно добавлен");
                }
                return BadRequest("error");
            }
        }



    }
}


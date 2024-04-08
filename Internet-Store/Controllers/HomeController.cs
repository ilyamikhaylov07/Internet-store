using Microsoft.AspNetCore.Mvc;

namespace Internet_Store.Controllers
{
    [ApiController]
    public class HomeController : ControllerBase
    {
        public IActionResult Index()
        {
            return Ok();
        }
    }
}

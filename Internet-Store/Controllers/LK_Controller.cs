using Microsoft.AspNetCore.Mvc;

namespace Internet_Store.Controllers
{
    [ApiController]
    [Route("Internet-store/[controller]/[action]")]
    public class LK_Controller : ControllerBase
    {
        public IActionResult Index()
        {
            return Ok();
        }
    }
}

using Microsoft.AspNetCore.Mvc;

namespace Internet_Store.Controllers
{
    [ApiController]
    [Route("Internetstore/[controller]/[action]")]
    public class AuthController : ControllerBase
    {
        [HttpGet]
        
        public IActionResult Index()
        {
            return Ok();
        }
    }
}

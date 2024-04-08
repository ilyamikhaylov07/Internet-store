using System.ComponentModel.DataAnnotations;

namespace Internet_Store.ApiJson
{
    public class LoginJson
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}

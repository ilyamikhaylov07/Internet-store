using System.ComponentModel.DataAnnotations;

namespace Internet_Store.ApiJson
{
    public class RegistrationJson
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        
    }
}

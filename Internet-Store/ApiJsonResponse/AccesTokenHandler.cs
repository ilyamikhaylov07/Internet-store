using System.ComponentModel.DataAnnotations;

namespace Internet_Store.ApiJsonResponse
{
    public class AccesTokenHandler
    {
        [Required]
        public string AccessToken { get; set; }
    }
}

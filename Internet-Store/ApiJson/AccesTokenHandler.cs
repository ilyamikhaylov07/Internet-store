using System.ComponentModel.DataAnnotations;

namespace Internet_Store.ApiJson
{
    public class AccesTokenHandler
    {
        [Required]
        public string AccessToken {  get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace Internet_Store.ApiJson
{
    public class ModelIdSize
    {
        [Required]
        public string Id { get; set; }
        [Required]
        public string Size { get; set; }
    }
}

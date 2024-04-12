using System.ComponentModel.DataAnnotations;

namespace Internet_Store.ApiJsonResponse
{
    public class ResponseModelWithCatalog
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Price { get; set; }
        [Required]
        public byte[] Image { get; set; }
    }
}

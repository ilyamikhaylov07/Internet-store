using System.ComponentModel.DataAnnotations;

namespace Internet_Store.ApiJsonResponse
{
    public class ResponseCartModels
    {
        [Required]
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Price { get; set; }
        [Required]
        public string Materials { get; set; }
        [Required]
        public string Brand { get; set; }
        [Required]
        public string Size { get; set; }
        [Required]
        public byte[] Image { get; set; }
    }
}

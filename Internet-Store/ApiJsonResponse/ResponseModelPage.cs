using System.ComponentModel.DataAnnotations;

namespace Internet_Store.ApiJsonResponse
{
    public class ResponseModelPage
    {
        [Required]
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Price { get; set; }
        [Required]
        public string Category { get; set; }
        [Required]
        public List<string> Sizes { get; set; } = new List<string>();
        [Required]
        public byte[] Image { get; set; }
        [Required]
        public string Materials { get; set; }
        [Required]
        public string Colour { get; set; }
        [Required]
        public string Brand { get; set; }
    }

}

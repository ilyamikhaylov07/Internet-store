using System.ComponentModel.DataAnnotations;

namespace Internet_Store.ApiJson
{
    public class OrderInfo
    {
        [Required]
        public string City {  get; set; }
        [Required] 
        public string Street { get; set; }
        [Required]
        public string House { get; set; }
        [Required]
        public string Index { get; set; }
        [Required]
        public int Price {  get; set; }
        [Required]
        public List<string> Idies { get; set; }
        [Required]
        public List<string> Sizes { get; set; }
    }
}

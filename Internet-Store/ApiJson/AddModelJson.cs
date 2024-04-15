using Internet_Store.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Internet_Store.ApiJson
{
    public class AddModelJson
    {
        public required string Name { get; set; }
        public required string Materials { get; set; }
        public required string Price { get; set; }
        public required string Colour { get; set; }
        public required string Brand { get; set; }
        public required string Image_url { get; set; }
        public required List<AddModelWithSizeJson> ModelWithSize { get; set; }
        public required int Category_id {  get; set; }

    }
}

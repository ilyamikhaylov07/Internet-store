using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Internet_Store.Models
{
    public class Model
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Materials { get; set; }
        public string Price { get; set; }
        public string Colour { get; set; }
        public string Brand { get; set; }
        public string Image_url {  get; set; }
        public List<Reaction> Reactions { get; set; }
        public List<ModelWithSize> ModelWithSize { get; set; }

        [ForeignKey("CategoryId")]
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        
    }
}

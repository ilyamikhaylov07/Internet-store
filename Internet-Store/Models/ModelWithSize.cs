using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Internet_Store.Models
{
    public class ModelWithSize
    {
        [Key]
        public int Id { get; set; }
        public string Size { get; set; }
        public int Amount { get; set; }
        public List<Item> Items { get; set; }
        [ForeignKey("ModelId")]
        public int ModelId { get; set; }
        public Model Model { get; set; }

    }
}

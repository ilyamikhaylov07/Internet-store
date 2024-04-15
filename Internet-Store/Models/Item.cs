using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Internet_Store.Models
{
    public class Item
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("ModelWithSizeId")]
        public int ModelWithSizeId { get; set; }
        public ModelWithSize ModelWithSize { get; set; }
        [ForeignKey("OrderId")]
        public int OrderId { get; set; }
        public Order? Order { get; set; }

    }
}

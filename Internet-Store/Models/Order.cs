using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Internet_Store.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        public decimal Price { get; set; }
        public decimal PriceWithDelivery { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string House { get; set; }
        public string Index { get; set; }
        public string State { get; set; }
        public List<Item> Items { get; set; }
        [ForeignKey("UserId")]
        public int UserId { get; set; }
        public User User { get; set; }
        [ForeignKey("WorkerId")]
        public int WorkerId { get; set; }
        public Worker? Worker { get; set; }
        
        
    }
}

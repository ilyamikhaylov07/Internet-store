using System.ComponentModel.DataAnnotations;

namespace Internet_Store.Models
{
    public class Delivery
    {
        [Key]
        public int Id { get; set; }
        public DateOnly Date { get; set; }
        public string State { get; set; }

    }
}

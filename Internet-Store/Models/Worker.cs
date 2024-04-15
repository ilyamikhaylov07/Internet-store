using System.ComponentModel.DataAnnotations;

namespace Internet_Store.Models
{
    public class Worker
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Otchestvo {  get; set; }
        public string NumberPhone { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public List<Order>? Orders { get; set; }
    }
}

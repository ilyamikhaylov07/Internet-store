using System.ComponentModel.DataAnnotations;

namespace Internet_Store.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string? NumberPhone { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public string? EmailToken {  get; set; }

        public bool IsConfirmed { get; set; }
        public List<Reaction>? Reactions { get; set; }
        public List<Order>? Orders { get; set; }
    }
}

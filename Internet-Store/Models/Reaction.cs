using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Internet_Store.Models
{
    public class Reaction
    {
        [Key]
        public int Id { get; set; }
        public string Content { get; set; }

        [ForeignKey("UserId")]
        public int UserId { get; set; }
        public User User { get; set; }

        [ForeignKey("ModelId")]
        public int ModelId { get; set; }
        public Model Model { get; set; }
    }
}

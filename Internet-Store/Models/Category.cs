using System.ComponentModel.DataAnnotations;

namespace Internet_Store.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public List<Model> Models { get; set; }
    }
}

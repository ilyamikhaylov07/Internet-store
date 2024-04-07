namespace Internet_Store.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public List<Model> Models { get; set; }
    }
}

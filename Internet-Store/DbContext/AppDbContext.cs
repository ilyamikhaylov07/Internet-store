using Internet_Store.Models;
using Microsoft.EntityFrameworkCore;

namespace Internet_Store
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Delivery> Deliveries { get; set; }
        public DbSet <Item> Items { get; set; }
        public DbSet<Model> Models { get; set; }
        public DbSet<ModelWithSize> ModelWithSizes { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Reaction> Reactions { get; set; }
        public DbSet<Worker> Workers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("host=localhost; port=5432; database=Intenet-Store; Username=postgres; Password = mendo890");
        }
    }
}

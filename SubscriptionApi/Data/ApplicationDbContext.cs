using Microsoft.EntityFrameworkCore;
using SubscriberApp.Models;

namespace SubscriberApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<Companies> Companies { get; set; }
        public DbSet<Subscribers> Subscribers { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<Messages> Messages { get; set; }
    }
}

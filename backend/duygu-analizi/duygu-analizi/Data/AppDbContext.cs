using duygu_analizi.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace duygu_analizi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<Kullanici> Kullanicilar { get; set; }
        public DbSet<Mesaj> Mesajlar { get; set; }
    }
}

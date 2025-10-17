using Microsoft.EntityFrameworkCore;
using duygu_analizi.Data;
using duygu_analizi.Services.Interfaces;
using duygu_analizi.Services.Implementations;

var builder = WebApplication.CreateBuilder(args);

// ✅ Veritabanı bağlantısı (SQLite)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// ✅ Servisleri Dependency Injection’a ekle
builder.Services.AddScoped<IKullaniciService, KullaniciService>();
builder.Services.AddScoped<IMesajService, MesajService>();

// ✅ Controller ve Swagger ayarları
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ✅ Geliştirme ortamı için detaylı hata ekranı
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();
app.Run();

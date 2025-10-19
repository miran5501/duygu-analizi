using duygu_analizi.Data;
using duygu_analizi.Models.DTO.Responses;
using duygu_analizi.Models.Entities;
using duygu_analizi.Services.Interfaces;

namespace duygu_analizi.Services.Implementations
{
    public class KullaniciService : IKullaniciService
    {
        private readonly AppDbContext _db;

        public KullaniciService(AppDbContext db)
        {
            _db = db;
        }

        //kullanıcı var ise o kullanıcıyı dönüyoruz yok ise kullanıcıyı oluşturup dönüyoruz.
        public KullaniciResponseDto GetOrCreateUser(string kullaniciAdi)
        {
            // Boş veya geçersiz kullanıcı adı kontrolü
            if (string.IsNullOrWhiteSpace(kullaniciAdi))
                throw new ArgumentException("Kullanıcı adı boş olamaz.");
            KullaniciResponseDto dto = new KullaniciResponseDto();

            var existingUser = _db.Kullanicilar.FirstOrDefault(u => u.KullaniciAdi == kullaniciAdi);

            if (existingUser != null)
            {

                dto.Id = existingUser.Id;
                dto.KullaniciAdi = existingUser.KullaniciAdi;

                return dto;
            }

            var newUser = new Kullanici { KullaniciAdi = kullaniciAdi };
            _db.Kullanicilar.Add(newUser);
            _db.SaveChanges();

            dto.Id = newUser.Id;
            dto.KullaniciAdi = newUser.KullaniciAdi;


            return dto;
        }
    }
}

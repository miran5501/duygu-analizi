using duygu_analizi.Models.DTO.Responses;
using duygu_analizi.Models.Entities;

namespace duygu_analizi.Services.Interfaces
{
    public interface IKullaniciService
    {
        KullaniciResponseDto GetOrCreateUser(string kullaniciAdi);
    }
}

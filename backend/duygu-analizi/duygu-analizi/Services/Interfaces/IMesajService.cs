using duygu_analizi.Models.DTO.Respones;
using duygu_analizi.Models.Entities;

namespace duygu_analizi.Services.Interfaces
{
    public interface IMesajService
    {
        Task<MesajResponseDto> PostMesajAsync(int kullaniciId, string mesaj, string dil);
        Task<List<MesajResponseDto>> GetMesajGecmisiAsync(int kullaniciId);
    }
}

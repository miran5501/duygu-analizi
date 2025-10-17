using duygu_analizi.Models.Entities;

namespace duygu_analizi.Models.DTO.Respones
{
    public class MesajResponseDto
    {
        public int Id { get; set; }
        public string Text { get; set; } = "";
        public string DuyguDurumu { get; set; } = "";
        public double DuyguYuzdesi { get; set; }
        public DateTime OlusturulmaTarihi { get; set; } = DateTime.UtcNow;
    }
}

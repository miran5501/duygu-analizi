namespace duygu_analizi.Models.Entities
{
    public class Mesaj
    {
        public int Id { get; set; }
        public string Text { get; set; } = "";
        public string DuyguDurumu { get; set; } = "";
        public double DuyguYuzdesi { get; set; }
        public DateTime OlusturulmaTarihi { get; set; } = DateTime.UtcNow;
        public int KullaniciId { get; set; }
        public Kullanici? Kullanici { get; set; }
    }
}

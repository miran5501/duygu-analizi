namespace duygu_analizi.Models.Entities
{
    public class Kullanici
    {
        public int Id { get; set; }
        public string KullaniciAdi { get; set; } = "";

        public List<Mesaj> Mesajlar { get; set; } = new();
    }
}

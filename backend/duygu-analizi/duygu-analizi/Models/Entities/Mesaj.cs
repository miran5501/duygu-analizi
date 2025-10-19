namespace duygu_analizi.Models.Entities
{
    public class Mesaj
    {
        public int Id { get; set; }
        public string Text { get; set; } = "";
        public string DuyguDurumu { get; set; } = "";
        public double DuyguYuzdesi { get; set; }
        //Frontendde tr-TR dönüşümü yapmadığım için tarihte 2 frontendi düzeltmekle uğraşmamak için anlık çözümde buradan 3 saat ekliyorum
        //Frontendde o işlem düzeltildiğinde burada +3 saat ekleme kaldırılacak.
        public DateTime OlusturulmaTarihi { get; set; } = DateTime.UtcNow.AddHours(3);
        public int KullaniciId { get; set; }
        public Kullanici? Kullanici { get; set; }
    }
}

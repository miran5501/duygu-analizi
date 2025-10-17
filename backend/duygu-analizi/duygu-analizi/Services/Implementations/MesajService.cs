using duygu_analizi.Data;
using duygu_analizi.Models.DTO.Requests;
using duygu_analizi.Models.DTO.Respones;
using duygu_analizi.Models.Entities;
using duygu_analizi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace duygu_analizi.Services.Implementations
{
    public class MesajService : IMesajService
    {
        private readonly AppDbContext _db;
        private readonly HttpClient _httpClient;
        private const string BaseUrl = "https://miran55-duygu-analizi.hf.space/gradio_api/call/predict";

        public MesajService(AppDbContext db)
        {
            _db = db;
            _httpClient = new HttpClient();
        }

        //Kullanıcının mesaj geçmişini alıyor liste olarak dönüyor
        public async Task<List<MesajResponseDto>> GetMesajGecmisiAsync(int kullaniciId)
        {
            if (kullaniciId <= 0)
                throw new ArgumentException("Geçersiz kullanıcı ID.");

            try
            {
                //o kullanıcıid ile kullanıcıyı alıyor ve var mı kontrol ediyor
                bool kullanici = await _db.Kullanicilar.AnyAsync(u => u.Id == kullaniciId);
                if (!kullanici)
                    throw new KeyNotFoundException($"ID'si {kullaniciId} olan kullanıcı bulunamadı.");

                var mesajlar = await _db.Mesajlar
                    .AsNoTracking()
                    .Where(m => m.KullaniciId == kullaniciId)
                    .OrderBy(m => m.OlusturulmaTarihi) // 🔹 En eski üstte, en yeni altta
                    .ToListAsync();


                // DTO dönüşümü yapılıyor
                var dtoList = mesajlar.Select(m => new MesajResponseDto
                {
                    Id = m.Id,
                    Text = m.Text,
                    DuyguDurumu = m.DuyguDurumu,
                    DuyguYuzdesi = m.DuyguYuzdesi,
                    OlusturulmaTarihi = m.OlusturulmaTarihi
                }).ToList();

                return dtoList;
            }
            catch (Exception ex)
            {
                // Diğer hatalar genel exception ile dönüyor
                throw new Exception($"Mesajlar alınırken hata oluştu: {ex.Message}");
            }
        }


        //kullanıcıdan mesaj alınıyor ve duygu analizi yapılıp veritabanına kaydediliyor mesajında duygu durumu dönüyor
        public async Task<MesajResponseDto> PostMesajAsync(int kullaniciId, string mesaj, string dil)
        {
            try
            {
                if (kullaniciId <= 0)
                    throw new ArgumentException("Geçersiz kullanıcı ID.");

                //kullanici kontrolü
                var kullanici = await _db.Kullanicilar.AnyAsync(u => u.Id == kullaniciId);
                if (!kullanici)
                    throw new KeyNotFoundException($"ID'si {kullaniciId} olan kullanıcı bulunamadı.");

                //mesaj boş mu kontrolü
                if (string.IsNullOrWhiteSpace(mesaj))
                    throw new ArgumentException("Mesaj boş olamaz.");

                //dil tr veya en mi diye kontrol ediliyor büyük küçük harfe bakılmaksızın
                if (string.IsNullOrWhiteSpace(dil) ||
                    !(dil.Equals("tr", StringComparison.OrdinalIgnoreCase) ||
                      dil.Equals("en", StringComparison.OrdinalIgnoreCase)))
                {
                    throw new ArgumentException("Geçersiz dil parametresi. Sadece 'tr' veya 'en' olmalıdır.");
                }

                //önce eventId almak gerekiyor gradio üzerinden işlem yapabilmek için
                var eventId = await RequestPredictionAsync(mesaj, dil);
                if (string.IsNullOrEmpty(eventId))
                    throw new Exception("Gradio event_id alınamadı.");

                //eventId ile dönen sonucu almak için get işlemi yapıyoruz
                var (duyguDurumu, yuzde) = await GetTahminSonucuAsync(eventId, dil);

                var yeniMesaj = new Mesaj
                {
                    Text = mesaj,
                    DuyguDurumu = duyguDurumu,
                    DuyguYuzdesi = yuzde,
                    KullaniciId = kullaniciId,
                    OlusturulmaTarihi = DateTime.UtcNow
                };

                _db.Mesajlar.Add(yeniMesaj);
                await _db.SaveChangesAsync();

                var dto = new MesajResponseDto
                {
                    Id = yeniMesaj.Id,
                    Text = yeniMesaj.Text,
                    DuyguDurumu = yeniMesaj.DuyguDurumu,
                    DuyguYuzdesi = yeniMesaj.DuyguYuzdesi,
                    OlusturulmaTarihi = yeniMesaj.OlusturulmaTarihi
                };

                return dto;
            }
            catch (ArgumentException ex)
            {
                throw new Exception(ex.Message);
            }
            catch (KeyNotFoundException ex)
            {
                throw new Exception(ex.Message);
            }
            catch (Exception ex)
            {
                throw new Exception($"MesajService hata: {ex.Message}");
            }
        }

        //eventId almak için önce gerekli verileri gönderiyoruz bize eventId dönülüyor bu id ile sonucu get işlemiyle alıcaz
        private async Task<string?> RequestPredictionAsync(string mesaj, string dil)
        {
            var veri = new { data = new[] { mesaj, dil } };

            var request = new StringContent(
                JsonConvert.SerializeObject(veri),
                System.Text.Encoding.UTF8,
                "application/json"
            );

            var response = await _httpClient.PostAsync(BaseUrl, request);
            var json = await response.Content.ReadAsStringAsync();

            dynamic? parsed = JsonConvert.DeserializeObject(json);
            return parsed?.event_id;
        }

        //EventId ile tahmin sonucunu geri alıyoruz
        private async Task<(string duygu, double yuzde)> GetTahminSonucuAsync(string eventId, string dil)
        {
            string url = $"{BaseUrl}/{eventId}";

            var response = await _httpClient.GetAsync(url);
            var raw = await response.Content.ReadAsStringAsync();

            //Gradio üstünden dönen veri json değil onu düzenliyoruz
            var cleanJson = ExtractJson(raw);
            if (cleanJson == null)
                return ("belirsiz", 0.0);

            dynamic? parsed = JsonConvert.DeserializeObject(cleanJson);
            string duygu = parsed?.data?.label ?? "belirsiz";
            double yuzde = parsed?.data?.score ?? 0.0;

            //dil tr ise yani türkçe işlem yapılmışsa türkçeleştirme yapıyoruz
            if (dil.Equals("tr", StringComparison.OrdinalIgnoreCase))
                duygu = TranslateSentiment(duygu);

            return (TranslateSentiment(duygu), yuzde);
        }

        //veriyi ayıklama
        private string? ExtractJson(string raw)
        {
            var start = raw.IndexOf("{\"status\"");
            var end = raw.LastIndexOf("}") + 1;

            if (start >= 0 && end > start)
                return raw.Substring(start, end - start);

            return null;
        }

        //veriyi türkçeleştirme
        private string TranslateSentiment(string label)
        {
            return label.ToLower() switch
            {
                "positive" => "Pozitif",
                "negative" => "Negatif",
                "neutral" => "Nötr",
                _ => label
            };
        }
        
    }
}

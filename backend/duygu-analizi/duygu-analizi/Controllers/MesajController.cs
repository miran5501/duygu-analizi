using duygu_analizi.Models.DTO.Requests;
using duygu_analizi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace duygu_analizi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MesajController : ControllerBase
    {
        private readonly IMesajService _mesajService;

        public MesajController(IMesajService mesajService)
        {
            _mesajService = mesajService;
        }

        [HttpPost("mesaj-kaydet/{kullaniciId}")]
        public async Task<IActionResult> PostMesajAsync(int kullaniciId, [FromBody] MesajRequestDto dto)
        {
            //servis katmanına veriyi ham gönderiyoruz.
            if (dto == null)
                return BadRequest();
            var mesaj = dto.Mesaj;
            var dil = dto.Dil;
            try
            {
                var yeniMesaj = await _mesajService.PostMesajAsync(kullaniciId, mesaj, dil);
                return Ok(yeniMesaj);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Bir hata oluştu: {ex.Message}");
            }
        }

        [HttpGet("gecmis/{kullaniciId}")]
        public async Task<IActionResult> GetMesajGecmisi(int kullaniciId)
        {
            try
            {
                var messages = await _mesajService.GetMesajGecmisiAsync(kullaniciId);
                return Ok(messages);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Bir hata oluştu: {ex.Message}");
            }
        }

    }
}

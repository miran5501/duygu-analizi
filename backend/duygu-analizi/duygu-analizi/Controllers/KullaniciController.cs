using Microsoft.AspNetCore.Mvc;
using duygu_analizi.Services.Interfaces;
using duygu_analizi.Models.DTO.Requests;

namespace duygu_analizi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KullaniciController : ControllerBase
    {
        private readonly IKullaniciService _kullaniciService;

        public KullaniciController(IKullaniciService kullaniciService)
        {
            _kullaniciService = kullaniciService;
        }

        [HttpPost("getorcreate")]
        public IActionResult GetOrCreate([FromBody] KullaniciRequestDto dto)
        {
            if(dto == null)
                return BadRequest();

            var user = _kullaniciService.GetOrCreateUser(dto.KullaniciAdi);
            return Ok(user);
        }
    }
}

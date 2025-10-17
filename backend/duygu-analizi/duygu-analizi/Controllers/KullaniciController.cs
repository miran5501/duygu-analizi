using Microsoft.AspNetCore.Mvc;
using duygu_analizi.Services.Interfaces;

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
        public IActionResult GetOrCreate([FromBody] string kullaniciAdi)
        {
            var user = _kullaniciService.GetOrCreateUser(kullaniciAdi);
            return Ok(user);
        }
    }
}

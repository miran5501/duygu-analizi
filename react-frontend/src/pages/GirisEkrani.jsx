import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { kullaniciGiris } from "../api/apiClient";
import "../styles/GirisEkrani.css";


const GirisEkrani = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Lütfen bir isim giriniz!");
    setLoading(true);
    try {
      const user = await kullaniciGiris(name);
      navigate("/mesaj-ekrani", { state: { user } });
    } catch (err) {
      alert("Kullanıcı oluşturulamadı: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="name-page">
      <h1>Duygu Analizi</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="İsminizi girin..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Oluşturuluyor..." : "Devam Et"}
        </button>
      </form>
    </div>
  );
};

export default GirisEkrani;

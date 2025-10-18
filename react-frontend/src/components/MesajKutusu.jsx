import { useState } from "react";
import "../styles/MesajKutusu.css";

const MesajKutusu = ({ onSend, loading, language, setLanguage }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <form className="mesaj-kutusu" onSubmit={handleSubmit}>
      {/*dil seçimi */}
      <select
        className="dil-secici"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="tr">TR</option>
        <option value="en">EN</option>
      </select>

      {/*mesaj kutusu */}
      <textarea
        placeholder={
            "Analiz edilecek metni yaz..."
        }
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="2"
      />

      {/*gönder butonu */}
      <button type="submit" disabled={loading}>
        {loading ? "..." : "Gönder"}
      </button>
    </form>
  );
};

export default MesajKutusu;

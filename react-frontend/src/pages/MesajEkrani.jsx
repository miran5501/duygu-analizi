import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { duyguAnalizi, eskiMesajlariGetir } from "../api/apiClient";
import MesajKutusu from "../components/MesajKutusu";
import MesajKart from "../components/MesajKart";
import "../styles/MesajEkrani.css";

const MesajEkrani = () => {
  const { state } = useLocation();
  const user = state?.user;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("tr");

  //sayfa ilk açıldığında eski mesajları getir
  useEffect(() => {
    const mesajlariGetir = async () => {
      if (!user?.id) return;
      try {
        const oldMessages = await eskiMesajlariGetir(user.id);
        const formatted = oldMessages.map((msg) => ({
          id: msg.id,
          text: msg.text,
          duyguDurumu: msg.duyguDurumu,
          duyguYuzdesi: msg.duyguYuzdesi,
          tarih: msg.olusturulmaTarihi,
        }));
        setMessages(formatted);
      } catch (err) {
        console.error("Mesaj geçmişi alınamadı:", err);
      }
    };

    mesajlariGetir();
  }, [user]);

  const mesajAnaliz = async (text) => {
    setLoading(true);
    try {
      const response = await duyguAnalizi(user.id, text, language);

      const newMsg = {
        id: Date.now(),
        text,
        duyguDurumu: response.duyguDurumu,
        duyguYuzdesi: response.duyguYuzdesi,
        tarih: response.olusturulmaTarihi || new Date().toLocaleString(),
      };

      setMessages((prev) => [...prev, newMsg]);
    } catch (error) {
      alert("Analiz yapılamadı: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="mesaj-ekrani">
      <div className="chat-container">
        <h2>Hoş geldin, {user?.kullaniciAdi || user?.isim}</h2>

        {/*Mesaj kartları */}
        <div className="chat-messages">
          {messages.length === 0 && (
            <p className="bos-mesaj">Henüz mesaj yok. Bir şeyler yaz!</p>
          )}

          {messages.map((msg) => (
            <MesajKart key={msg.id} mesaj={msg} />
          ))}
        </div>

        {/*Mesaj kutusu */}
        <MesajKutusu
          onSend={mesajAnaliz}
          loading={loading}
          language={language}
          setLanguage={setLanguage}
        />
      </div>
    </div>
  );
};

export default MesajEkrani;

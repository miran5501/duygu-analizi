import axios from "axios";

const API = axios.create({
  baseURL: "https://duygu-analizi-lmqp.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const kullaniciGetirVeyaOlustur = async (kullaniciAdi) => {
  try {
    const response = await API.post("/api/Kullanici/getorcreate", {
      kullaniciAdi: kullaniciAdi,
    });
    return response.data;
  } catch (error) {
    console.error("Kullanıcı oluşturulamadı:", error);
    throw error;
  }
};

export const mesajKaydet = async (kullaniciId, mesaj, dil) => {
  try {
    const response = await API.post(`/api/Mesaj/mesaj-kaydet/${kullaniciId}`, {
      mesaj,
      dil,
    });
    return response.data;
  } catch (error) {
    console.error("Mesaj kaydedilemedi:", error);
    throw error;
  }
};

export const mesajGecmisiGetir = async (kullaniciId) => {
  try {
    const response = await API.get(`/api/Mesaj/gecmis/${kullaniciId}`);
    return response.data;
  } catch (error) {
    console.error("Mesaj geçmişi alınamadı:", error);
    throw error;
  }
};

export default API;

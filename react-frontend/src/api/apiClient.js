import axios from "axios";

const API = axios.create({
  baseURL: "https://duygu-analizi-lmqp.onrender.com",
});

export const kullaniciGiris = async (kullaniciAdi) => {
  const res = await API.post("/api/Kullanici/getorcreate", { kullaniciAdi : kullaniciAdi });
  return res.data;
};

export const duyguAnalizi = async (kullaniciId, mesaj, dil) => {
  const res = await API.post(`/api/Mesaj/mesaj-kaydet/${kullaniciId}`, {
    mesaj,
    dil,
  });
  return res.data;
};

export const eskiMesajlariGetir = async (kullaniciId) => {
  const res = await API.get(`/api/Mesaj/gecmis/${kullaniciId}`);
  return res.data;
};

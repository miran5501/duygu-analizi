import React, { useState, useEffect, useRef } from "react";
import { View, Text, FlatList, Alert } from "react-native";
import { mesajKaydet, mesajGecmisiGetir } from "../api/api";
import MesajKutusu from "../components/MesajKutusu";
import MesajKart from "../components/MesajKart";
import styles from "../styles/MesajEkraniStil";

const MesajEkrani = ({ route }) => {
  const { user } = route.params;
  const [mesajlar, setMesajlar] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [dil, setDil] = useState("tr");
  const flatListRef = useRef(null);

  useEffect(() => {
    const eskiMesajlariYukle = async () => {
      if (!user?.id) return;
      try {
        const eskiVeriler = await mesajGecmisiGetir(user.id);
        const duzenlenmis = eskiVeriler.map((msg) => ({
          id: msg.id,
          text: msg.text,
          duyguDurumu: msg.duyguDurumu,
          duyguYuzdesi: msg.duyguYuzdesi,
          tarih: msg.olusturulmaTarihi,
        }));
        setMesajlar(duzenlenmis);
      } catch (err) {
        console.error("Mesaj geçmişi alınamadı:", err);
      }
    };
    eskiMesajlariYukle();
  }, [user]);

  const mesajAnalizEt = async (text, language) => {
    setYukleniyor(true);
    try {
      const yanit = await mesajKaydet(user.id, text, language);
      const yeniMesaj = {
        id: Date.now(),
        text,
        duyguDurumu: yanit.duyguDurumu,
        duyguYuzdesi: yanit.duyguYuzdesi,
        tarih: yanit.olusturulmaTarihi || new Date().toISOString(),
      };
      setMesajlar((onceki) => [...onceki, yeniMesaj]);
    } catch (error) {
      Alert.alert("Hata", "Analiz yapılamadı: " + error.message);
    }
    setYukleniyor(false);
  };

  return (
    <View style={styles.ekran}>
      <Text style={styles.baslik}>
        Hoş geldin, {user?.kullaniciAdi || user?.isim}
      </Text>

      <View style={styles.chatAlan}>
        {mesajlar.length === 0 ? (
          <Text style={styles.bosMesaj}>Henüz mesaj yok. Bir şeyler yaz!</Text>
        ) : (
          <FlatList
            ref={flatListRef}
            data={mesajlar}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MesajKart mesaj={item} />}
            style={styles.liste}
            contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
          />
        )}
      </View>

      <View style={styles.altAlan}>
        <MesajKutusu
          onSend={mesajAnalizEt}
          loading={yukleniyor}
          language={dil}
          setLanguage={setDil}
        />
      </View>
    </View>
  );
};

export default MesajEkrani;

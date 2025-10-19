import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { kullaniciGetirVeyaOlustur } from "../api/api";
import styles from "../styles/GirisEkraniStil";

const GirisEkrani = ({ navigation }) => {
  const [isim, setIsim] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);

  const handleSubmit = async () => {
    if (!isim.trim()) {
      Alert.alert("Uyarı", "Lütfen bir isim giriniz!");
      return;
    }

    setYukleniyor(true);
    try {
      const user = await kullaniciGetirVeyaOlustur(isim);
      navigation.navigate("MesajEkrani", { user });
    } catch (err) {
      Alert.alert("Hata", "Kullanıcı oluşturulamadı: " + err.message);
    }
    setYukleniyor(false);
  };

  return (
    <View style={styles.sayfa}>
      <Text style={styles.baslik}>Duygu Analizi</Text>

      <TextInput
        style={styles.input}
        placeholder="İsminizi girin..."
        placeholderTextColor="#999"
        value={isim}
        onChangeText={setIsim}
      />

      <TouchableOpacity style={styles.buton} onPress={handleSubmit} disabled={yukleniyor}>
        {yukleniyor ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.butonYazi}>Devam Et</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default GirisEkrani;

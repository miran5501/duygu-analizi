import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator, Picker } from "react-native";
import styles from "../styles/MesajKutusuStil";

const MesajKutusu = ({ onSend, loading }) => {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("tr");

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSend(text, language);
    setText("");
  };

  return (
    <View style={styles.kapsayici}>
      <View style={styles.dilSeciciKapsam}>
        <TouchableOpacity
          style={[
            styles.dilButon,
            language === "tr" && styles.dilButonSecili,
          ]}
          onPress={() => setLanguage("tr")}
        >
          <Text style={styles.dilYazi}>TR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.dilButon,
            language === "en" && styles.dilButonSecili,
          ]}
          onPress={() => setLanguage("en")}
        >
          <Text style={styles.dilYazi}>EN</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.mesajAlani}
        placeholder="Analiz edilecek metni yaz..."
        placeholderTextColor="#999"
        value={text}
        onChangeText={setText}
        multiline
      />

      <TouchableOpacity
        style={[styles.gonderButon, loading && styles.gonderButonPasif]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.gonderYazi}>Gönder</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default MesajKutusu;

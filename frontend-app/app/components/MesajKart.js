import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/MesajKartStil";

const MesajKart = ({ mesaj }) => {
  const { text, duyguDurumu, duyguYuzdesi, tarih } = mesaj;

  //tarihi okunabilir formata dönüştürülüyor
  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <View style={styles.kart}>
      <View style={styles.sol}>
        <Text style={styles.duygu}>{duyguDurumu}</Text>
        <Text style={styles.yuzde}>%{duyguYuzdesi}</Text>
      </View>

      <View style={styles.sag}>
        <Text style={styles.icerik}>{text}</Text>
        <Text style={styles.tarih}>{formatDate(tarih)}</Text>
      </View>
    </View>
  );
};

export default MesajKart;

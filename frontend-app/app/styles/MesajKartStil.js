import { StyleSheet } from "react-native";

export default StyleSheet.create({
  kart: {
    flexDirection: "row",
    alignItems: "stretch",
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },

  sol: {
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    backgroundColor: "#2A2A2A",
    borderRadius: 8,
    paddingVertical: 10,
  },
  duygu: {
    color: "#BB86FC",
    fontSize: 16,
    fontWeight: "bold",
  },
  yuzde: {
    color: "#fff",
    fontSize: 14,
    marginTop: 4,
  },

  sag: {
    flex: 1,
    justifyContent: "center",
    position: "relative",
  },

  icerik: {
    color: "#fff",
    fontSize: 15,
    textAlign: "right",
    paddingRight: 2,
  },

  tarih: {
    position: "absolute",
    right: 0,
    bottom: 0,
    color: "#999",
    fontSize: 12,
  },
});

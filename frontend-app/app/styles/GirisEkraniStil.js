import { StyleSheet } from "react-native";

export default StyleSheet.create({
  sayfa: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    paddingHorizontal: 24,
  },
  baslik: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    backgroundColor: "#1E1E1E",
    color: "#fff",
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#333",
  },
  buton: {
    width: "100%",
    backgroundColor: "#6200EE",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  butonYazi: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

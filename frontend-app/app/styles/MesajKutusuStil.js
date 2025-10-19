import { StyleSheet } from "react-native";

export default StyleSheet.create({
  kapsayici: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: "#333",
    backgroundColor: "#1E1E1E",
  },

  dilSeciciKapsam: {
    flexDirection: "column",
    marginRight: 8,
  },

  dilButon: {
    backgroundColor: "#2A2A2A",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 6,
  },

  dilButonSecili: {
    backgroundColor: "#6200EE",
  },

  dilYazi: {
    color: "#fff",
    fontWeight: "bold",
  },

  mesajAlani: {
    flex: 1,
    backgroundColor: "#2A2A2A",
    color: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 15,
    maxHeight: 100,
  },

  gonderButon: {
    marginLeft: 8,
    backgroundColor: "#6200EE",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  gonderButonPasif: {
    opacity: 0.7,
  },

  gonderYazi: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

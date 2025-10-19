import gradio as gr
from transformers import pipeline

# modelleri huggingface üzerinden yüklüyor
model_en = pipeline("sentiment-analysis", model="cardiffnlp/twitter-roberta-base-sentiment-latest")
model_tr = pipeline("sentiment-analysis", model="incidelen/electra-base-turkish-sentiment-analysis-cased")

# türkçe modelde labellar LABEL_0,1,2 olarak döndüğü için dönüşüm yapılıyor
label_map_tr = {
    "LABEL_0": "pozitif",
    "LABEL_1": "nötr",
    "LABEL_2": "negatif"
}

# analizin yapıldığı fonksiyon
def duygu_analizi(mesaj: str, dil: str):
    mesaj = mesaj.strip()
    dil = dil.lower()

    #2 dil seçeneğinden biri düzgün şekilde verilmiş mi kontrol ediliyor
    if dil not in ["en", "tr"]:
        return {
            "status": "error",
            "data": {"language": "-", "text": mesaj, "label": "tr veya en dilini seçiniz", "score": 0.0}
        }

    if dil == "en":
        result = model_en(mesaj)[0]
        return {
            "status": "ok",
            "data": {
                "language": "English",
                "text": mesaj,
                "label": result["label"],
                "score": round(result["score"], 3)
            }
        }

    if dil == "tr":
        result = model_tr(mesaj)[0]
        label = label_map_tr.get(result["label"], result["label"])
        return {
            "status": "ok",
            "data": {
                "language": "Turkish",
                "text": mesaj,
                "label": label,
                "score": round(result["score"], 3)
            }
        }

# Gradio arayüzü
iface = gr.Interface(
    fn=duygu_analizi,
    inputs=["text", "text"],  # (mesaj, dil)
    outputs="json"
)

#.NET üzerinden erişmek için api endpointi oluşturuyor
iface.launch(show_api=True)



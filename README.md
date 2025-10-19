# 💬 Full Stack + AI Chat Uygulaması

Bu proje, **Konuşarak Öğren Full Stack + AI Stajyer Projesi** kapsamında geliştirilmiş bir web ve mobil tabanlı sohbet uygulamasıdır.  
Amaç, kullanıcıların mesajlaşarak etkileşim kurabildiği ve her mesajın **Yapay Zeka (AI)** tarafından **duygu analizine tabi tutulduğu** bir sistem geliştirmektir.

Uygulama, modern full-stack yapıyı uçtan uca göstermektedir:  
**React (Frontend Web)** / **React Native CLI (Frontend Mobil)** → **.NET Core API (Backend)** → **Python + Hugging Face (AI Servisi)**

---

## 🚀 Proje Özeti

Uygulamada kullanıcılar basit bir rumuz (kullanıcı adı) belirleyerek sohbet ekranına giriş yapar. Ya da o kullanıcı adı ile önceden giriş yapılıp mesaj gönderilmişse o mesajları sohbet ekranında görüntüler.
Her gönderilen mesaj backend ile AI servisine iletilir; **pozitif**, **nötr** veya **negatif** olarak etiketlenir ve sonuç anlık olarak kullanıcıya gösterilir. Hem tr hem de en olarak 2 seçenek sunuluyor değerlendirme yapılırken. Bunun sebebi türkçe olan modelde tam istediğim sonucu alamadım ingilizce bulduğum modelde daha güzel sonuçlar aldım bende 2 modeli de ekleyip kullanıcının istediğini kullanmasını sağladım.

Bu süreçte:
- **Frontend** mesajları alır backende gönderir ve dönen sonucu arayüz ile kullanıcıya gösterir,
- **Backend** veritabanı yönetimi ve API iletişimini sağlar,  
- **AI Servisi** ise mesajın duygu analizini yapar.

Proje tamamen **ücretsiz servislerde** deploy edilmiştir:
- 🌐 **Frontend (React):** Vercel  
- 📱 **Mobil (React Native CLI)** GitHub
- ⚙️ **Backend (.NET + SQLite):** Render  
- 🤖 **AI Servisi (Python Gradio):** Hugging Face Spaces

---

## 🌐 Canlı Proje Linkleri

| Katman | Platform | Link |
|--------|-----------|------|
| 🌐 **Frontend (Web)** | Vercel | 🔗 [https://duygu-analizi.vercel.app](https://duygu-analizi.vercel.app) |
| 📱 **Mobil (React Native CLI)** | APK (GitHub) | 🔗 [İndir (GitHub)](https://github.com/miran5501/duygu-analizi/blob/main/app-release.apk) |
| ⚙️ **Backend (API)** | Render | 🔗 [https://duygu-analizi-lmqp.onrender.com](https://duygu-analizi-lmqp.onrender.com) |
| 🤖 **AI Servisi (Model)** | Hugging Face Spaces | 🔗 [https://huggingface.co/spaces/miran55/duygu-analizi](https://huggingface.co/spaces/miran55/duygu-analizi) |


---

## 🧠 Kullanılan Teknolojiler ve Araçlar

| Katman | Teknoloji / Araç | Açıklama |
|--------|------------------|----------|
| 🌐 **Frontend (Web)** | React, Axios | Kullanıcı arayüzü ve API iletişimi için kullanıldı. |
| 📱 **Mobil (Frontend)** | React Native CLI | Web ile aynı API yapısını kullanarak mobil deneyim sağladı. |
| ⚙️ **Backend (API)** | .NET 8, Entity Framework Core, SQLite | Kullanıcı ve mesaj verilerini yönetir, AI servisine istek gönderir. |
| 💾 **Veritabanı** | SQLite | Render üzerinde kolay deploy edilebilen hafif veritabanı. |
| 🤖 **AI Servisi** | Python, Gradio, Transformers | Duygu analizi için Hugging Face üzerindeki modeller kullanıldı. |
| 🧠 **Model(ler)** | - `cardiffnlp/twitter-roberta-base-sentiment-latest` (EN)  <br> - `incidelen/electra-base-turkish-sentiment-analysis-cased` (TR) | İngilizce ve Türkçe mesajlarda çok dilli duygu analizi. |
| ☁️ **Hosting / Deployment** | Vercel (Frontend), Render (Backend), Hugging Face Spaces (AI) | Tüm servisler ücretsiz olarak çevrimiçi erişime açıldı. |
| 🧰 **Yardımcı Araçlar** | Postman, Git, GitHub, Swagger | API testleri, versiyon kontrolü ve proje yönetimi. |

---


## 🧠 AI Servisi (`ai-service/`)

🔗 [https://huggingface.co/spaces/miran55/duygu-analizi](https://huggingface.co/spaces/miran55/duygu-analizi)

Bu klasör, mesajların duygu analizini gerçekleştiren **Python tabanlı AI servisidir.**  
Hugging Face Spaces üzerinde **Gradio API** olarak deploy edilmiştir.
Modellerin kullanımı (pipeline) ve Gradio kullanımı ChatGPT ile yapılmıştır.

### 🔹 Görev ve Sorumluluklar
- Backend’den gelen mesajları alır.  
- Duygu analizini yaparak sonucu (`pozitif`, `nötr`, `negatif`) olarak döner.  
- REST API üzerinden kullanılabilir hale getirilmiştir.

### 🧩 Kullanılan Modeller
| Dil | Model Adı | Açıklama |
|-----|------------|----------|
| 🇬🇧 İngilizce | `cardiffnlp/twitter-roberta-base-sentiment-latest` | İngilizce metinlerde 3 sınıflı duygu analizi (positive/neutral/negative). |
| 🇹🇷 Türkçe | `incidelen/electra-base-turkish-sentiment-analysis-cased` | Türkçe metinlerde duygu sınıflandırması yapar (pozitif/nötr/negatif). |

### ⚙️ Teknik Detaylar
- **Framework:** Gradio  
- **Kütüphaneler:** `transformers`, `torch`, `gradio`  
- **Endpoint:**  
  - `POST /gradio_api/call/predict` → Tahmini başlatır ve `event_id` döner  
  - **Girdi** 
    ```json
    {
        "data": [
        "Bugün çok mutluyum!",
        "tr"
        ]
    }
    ```
  - **Çıktı**
    ```json
    {
    "event_id": "cmpl-9d7bb01d-0b3b-47b1-9d8e-cb4b4caa9e7f"
    }
  - `GET /gradio_api/call/predict/{event_id}` → Tahmin sonucunu döner  
  - **Çıktı**
    ```json
    event: complete
    data: [{"status": "ok", "data": {"language": "Turkish", "text": "Bugün çok mutluyum!", "label": "Positive", "score": 0.9743}}]
    ```


### 🚀 Çalıştırma (Lokal)
```bash
cd ai-service
pip install -r requirements.txt
python app.py
```

## ⚙️ Backend (`backend/`)

🔗 [https://duygu-analizi-lmqp.onrender.com/swagger/index.html](https://duygu-analizi-lmqp.onrender.com/swagger/index.html)

Bu klasör, uygulamanın **.NET 8 tabanlı backend (API)** kısmını içerir.  
Backend, hem kullanıcı işlemlerini hem de mesajların **AI servisine (Gradio API)** iletilmesini yönetir.  
Veritabanı olarak **SQLite** kullanılmıştır ve uygulama **Render** üzerinde deploy edilmiştir.
Uygulamanın Program.cs tarafı gelen datayı jsona uygun formata çevirme, null kontrollerinden sonra exception dönüş tipleri, veriyi türkçeleştirme, docker klasörlerinin içi gibi ayar dosyaları ChatGPT tarafından yazılmıştır.

---

### 🔹 Görev ve Sorumluluklar
- Kullanıcı oluşturma veya var olan kullanıcıyı getirme işlemlerini yapar.  
- Mesajları duygu analizi için AI servise gönderir.
- Servisten dönen mesajı ve duygu durumunu frontende döner.
- Duygu sonucunu (`Pozitif`, `Negatif`, `Nötr`) SQLite veritabanına kaydeder.  
- Swagger arayüzü ile API dokümantasyonu sağlar.  

---

### 🧩 Katman Yapısı
| Katman | Açıklama |
|--------|-----------|
| **Controllers/** | HTTP isteklerini karşılayan katmandır (`KullaniciController`, `MesajController`). |
| **Services/** | İş mantığının yürütüldüğü katmandır. Kullanıcıdan gelen giriş bilgisini veya mesajları işleyerek kullanıcıya gerekli bilgileri döndürür (`MesajService`, `IMesajService`). |
| **Models/Entities/** | Veritabanı tablolarını temsil eden sınıflar (`Kullanici`, `Mesaj`). |
| **Models/DTO/** | Veri transferi için kullanılan sınıflar. Kullanıcıya dönmesi gerekmeyen bilgileri kırpan veya kullanıcıdan gelicek verilerin formatını belirleyen yapı (`MesajRequestDto`, `MesajResponseDto` ...). |
| **Data/** | `AppDbContext` sınıfı ile veritabanı bağlantısını yönetir. |

---

### ⚙️ Teknik Detaylar
- **Framework:** .NET 8  
- **ORM:** Entity Framework Core  
- **Veritabanı:** SQLite  
- **Dokümantasyon:** Swagger (Swashbuckle)  
- **JSON İşleme:** `Newtonsoft.Json`  
- **HTTP İstekleri:** `HttpClient` (AI servis entegrasyonu için)  

### 🚀 Çalıştırma (Lokal)
```bash
cd backend
cd duygu-analizi
cd duygu-analizi
dotnet restore
dotnet run
```

## 🌐 Web (`frontend/`)

🔗 [https://duygu-analizi.vercel.app](https://duygu-analizi.vercel.app)


Bu klasör, projenin **web tabanlı kullanıcı arayüzünü (frontend)** içerir.  
React ile geliştirilmiştir ve uygulama **Vercel** platformu üzerinde deploy edilmiştir.  
Frontend, kullanıcıdan gelen mesajları **.NET Backend API**’sine gönderir ve AI analiz sonuçlarını canlı olarak ekranda gösterir.  
Uygulamanın CSS stilleri ve genel görünüm ChatGPT ile yapılmıştır.

---

### 🔹 Görev ve Sorumluluklar
- Kullanıcının rumuz (kullanıcı adı) ile giriş yapmasını sağlar.  
- Mesaj gönderme, mesaj geçmişini gösterme ve duygu analizi sonucunu ekrana yansıtma işlemlerini yönetir.  
- Backend ile API üzerinden veri alışverişi yapar.  

---

### ⚙️ Teknik Detaylar
- **Framework:** React  
- **Kütüphaneler:** `axios`, `react-router-dom`, `react-icons`  


### 🧩 Klasör Yapısı
 - **Components:** Mesaj kutusu ve mesaj kartlarının bulunduğu kısım
 - **Pages:** Giriş ekranı ve mesaj ekranının bulunduğu kısım mesaj ekranında mesaj kutusu ve mesaj kartı componentleri çağrılıp mesaj girdisi ve listelenmesi yapılıyor
 - **Api** API linkleri bulunuyor sayfalardan buradaki linkler çağrılıyor ve doldurularak backende istek atılıyor.
 - **Styles** Sayfaların stilleri bulunuyor css sayfalarından oluşuyor
 - **App.js** Uygulama yönlendirmesi.
 - **İndex.js** Uygulama girişi.

### 🚀 Çalıştırma (Lokal)
```bash
cd react-frontend
npm install
npm start
```

## 📱 Mobil Uygulama (`frontend-app/`)

🔗 [Apk Linki](https://github.com/miran5501/duygu-analizi/blob/main/app-release.apk)

Bu klasör, projenin **mobil uygulama (React Native CLI)** kısmını içerir.  
Mobil uygulama, web arayüzüyle aynı backend ve AI servisini kullanır.  
Kullanıcıların mobil cihazlarından mesaj gönderip duygu analizi sonuçlarını **gerçek zamanlı** görmelerini sağlar.  
Bu kısımda genel uygulama stilleri ChatGPT tarafından yapıldı. Diğer kısımlarda da yardım alındı.

---

### 🔹 Görev ve Sorumluluklar
- Kullanıcının rumuz (kullanıcı adı) ile giriş yapmasını sağlar.  
- Mesaj gönderme, mesaj geçmişini görüntüleme ve duygu analiz sonuçlarını gösterir.  
- Web sürümüyle aynı API yapısını kullanır.

---

### ⚙️ Teknik Detaylar
- **Framework:** React Native CLI  
- **Programlama Dili:** JavaScript  
- **Kütüphaneler:** `axios`, `react-navigation`, `react-native-vector-icons`, `react-native-safe-area-context`  
- **Platform Desteği:** Android (APK olarak GitHub’da paylaşılmıştır) 

---

### 🧩 Klasör Yapısı
 - **Components:** Mesaj kutusu ve mesaj kartlarının bulunduğu kısım
 - **Screens:** Giriş ekranı ve mesaj ekranının bulunduğu kısım mesaj ekranında mesaj kutusu ve mesaj kartı componentleri çağrılıp mesaj girdisi ve listelenmesi yapılıyor
 - **Api** API linkleri bulunuyor sayfalardan buradaki linkler çağrılıyor ve doldurularak backende istek atılıyor.
 - **Styles** Sayfaların stilleri bulunuyor css sayfalarından oluşuyor
 - **App.js** Uygulama yönlendirmesi.
 - **İndex.js** Uygulama girişi.

🔗 [Youtube React Native CLI kurma linki](https://www.youtube.com/watch?v=sdrqDQAC3Gw&t=1122s)

### 🚀 Çalıştırma (Lokal)
```bash
cd FrontendApp
npm install
npx react-native start
npx react-native run-android
```

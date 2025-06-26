# 🚗 Rent a Car Uygulaması

JWT tabanlı kullanıcı ve admin giriş sistemi içeren, araç kiralama işlevine sahip tam işlevli bir web uygulamasıdır.

---

## 🧰 Kullanılan Teknolojiler

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Veri:** JSON dosyaları (MongoDB kullanılmaz)
- **JWT:** Kimlik doğrulama için token yapısı
- **Swagger:** API dökümantasyonu
- **Docker:** Dockerfile & docker-compose
- **CI/CD:** GitHub Actions ile otomatik test/build sistemi

---

## 👤 Giriş Bilgileri

### 👨‍💼 Admin Girişi
- **Kullanıcı Adı:** `admin`
- **Şifre:** `123456`

### 👤 Kullanıcı Girişi
- **Kullanıcı Adı:** `userdeneme`
- **Şifre:** `12345`

> Dilerseniz kayıt sayfasından yeni kullanıcı oluşturabilirsiniz.

---

## 🚀 Kurulum Adımları

### 1. Projeyi Klonla
```bash
git clone https://github.com/kullanici-adi/rentacar.git
cd rentacar
```

### 2. Backend’i Başlat
```bash
cd backend
npm install
node app.js
```

### 3. Frontend’i Aç
Tarayıcıda şu dosyalardan birini açabilirsiniz:
- `frontend/login.html`
- `frontend/user-home.html`
- `frontend/admin-panel.html`

---

## 📦 API Test (Swagger)

Tüm API uç noktalarını test etmek için tarayıcıda aç:
```
http://localhost:5000/api-docs
```

---

## 📋 Otomatik Veri Yükleme

Sunucu başlarken şu veriler otomatik yüklenir:
- 1 admin kullanıcı
- 1 test kullanıcı
- 2 örnek araç
- 1 örnek marka
- 1 kiralama geçmişi

---

## 🐳 Docker ile Çalıştırma

Projeyi container olarak başlatmak için:
```bash
docker-compose up --build
```

---

## 🔄 CI/CD

GitHub Actions üzerinden her `push` sonrası:
- Otomatik build yapılır
- (İsteğe bağlı) Render gibi platformlara otomatik deploy yapılabilir

---

## 📝 Lisans

Bu proje bireysel eğitim ve geliştirme amaçlıdır. Her hakkı saklıdır.

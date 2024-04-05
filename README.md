# Back-end Developer Case Question
Bu proje Invent Analytics tarafından verilen bir Case Question için geliştirilmiştir.  **Proje için hazırladığım dökümantasyon `docs` klasörü altında yer almaktadır.**


## Kurulum

### Yerel Makineye Kurulum

#### Bağımlılıkların Yüklenmesi:

Terminalde projenin kök dizinine gidin ve aşağıdaki komutu çalıştırarak projenin bağımlılıklarını yükleyin:

```bash
npm install
```


#### Veritabanı Bağlantısının Ayarlanması:

`config/config.json` dosyasını açın ve aşağıdaki bağlantı bilgilerini düzenleyin:

```json
"development": {
  "username": "postgres_username",
  "password": "postgres_password",
  "database": "database_name",
  "host": "127.0.0.1",
  "dialect": "postgres"
}
```

- `username`: PostgreSQL veritabanına erişmek için kullanılan kullanıcı adı.

- `password`: PostgreSQL veritabanına erişmek için kullanılan şifre.
- `database`: Kullanılacak olan PostgreSQL veritabanı adı.
- `host`: PostgreSQL veritabanına erişilecek olan adres (varsayılan olarak 127.0.0.1 olarak belirtilmiştir).
- `dialect`: Kullanılan veritabanı türü (varsayılan olarak postgres olarak belirtilmiştir).


#### Veritabanı Migration'larının Uygulanması:

Terminalde aşağıdaki komutu çalıştırarak veritabanı migration'larını uygulayın:

```bash
npx sequelize-cli db:migrate
```

#### Projeyi Başlatma:

Terminalde projeyi başlatmak için aşağıdaki komutu çalıştırın:

```bash
npm start
```


📍 *Projenin kurulumu tamamlandıktan sonra API'leri test etmek için Postman'i kullanabilirsiniz.*





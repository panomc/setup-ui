<h3>Adım - 2/3</h3>
<p>
  Platform verilerinin web sunucunuzda kayıt edilmesi için veritabanına
  bağlanması gerekmekte. Veritabanı bilgilerini bilmiyorsanız sunucunuzu
  sağlayan kurum ile iletişime geçiniz.
</p>
<h5 class="text-primary">Veri Tabanı Bilgileri</h5>

<div class="alert alert-dismissible text-danger" id="databaseError">
  <button class="close" type="button">
    <span aria-hidden="true">&times;</span>
  </button>
  Hata mesajı
</div>

<form>
  <div class="form-group">
    <nav
      class="nav nav-pills flex-nowrap text-lg-left text-center"
      id="databaseTabs"
      role="tablist">
      <a
        aria-controls="mysql"
        aria-selected="true"
        class="nav-link active"
        data-toggle="tab"
        href="#mysql"
        id="mysql-tab"
        role="tab"
        title="Veritabanı Türü">
        <img alt="MySQL" src="/assets/img/mysql.png" width="24" height="24" />
        MySQL -
        <img
          alt="MariaDB"
          src="/assets/img/mariadb.png"
          width="24"
          height="24" />
        MariaDB
      </a>
    </nav>
  </div>

  <div class="form-group tab-content">
    <div
      aria-labelledby="mysql-tab"
      class="tab-pane fade show active"
      id="mysql"
      role="tabpanel">
      <div class="form-group">
        <label for="databaseAddress">Veri Tabanı Adresi:</label>
        <input
          class="form-control"
          id="databaseAddress"
          placeholder="localhost:80"
          type="text"
          v-model="host" />
      </div>

      <div class="form-group">
        <label for="databaseName">Veri Tabanı Adı:</label>
        <input
          class="form-control"
          id="databaseName"
          placeholder="pano"
          type="text" />
      </div>
      <div class="form-group">
        <label for="databaseUserName">Veri Tabanı Kullanıcı Adı:</label>
        <input
          class="form-control"
          id="databaseUserName"
          placeholder="admin"
          type="text" />
      </div>

      <div class="form-group">
        <label for="databaseUserPassword">Veri Tabanı Şifresi:</label>
        <input
          class="form-control"
          id="databaseUserPassword"
          placeholder="****************"
          type="password" />
      </div>

      <div class="form-group">
        <label for="databaseTablePrefix">Veri Tabanı Tablo Öneki:</label>
        <input
          class="form-control"
          id="databaseTablePrefix"
          placeholder="pano_"
          type="text" />
      </div>
    </div>

    <div
      aria-labelledby="sqlite-tab"
      class="tab-pane fade show"
      id="sqlite"
      role="tabpanel">
      sqlite
    </div>
  </div>

  <a href="/step-2" class="btn btn-primary" role="button">Devam Et</a>
  <a href="/" class="btn btn-outline-primary" role="button">Geri</a>
</form>

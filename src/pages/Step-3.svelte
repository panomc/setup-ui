<script>
  import { nextStep, backStep } from "../Store";

  let buttonsLoading = false;

  function back() {
    if (!buttonsLoading) {
      buttonsLoading = true;

      backStep({
        step: 3
      });
    }
  }
</script>

<h3>Adım - 3/3</h3>
<p>
  Son olarak, platformunuzu yönetmek için bir hesaba ihtiyacınız var. Çevrimiçi
  <a href="https://panomc.com" target="_blank">Panomc.com</a>
  hesabınızı kullanabilir veya yerel bir hesap oluşturabilirsiniz.
</p>
<h5 class="text-primary">Yönetici Hesabı Bilgileri</h5>

<form>
  <div class="alert alert-primary">
    Pano hesabınızı bağladığınızda temalar ve eklentiler için gerekli alışveriş
    işlemlerini kullanabilirsiniz.
    <br />
    <br />
    <a
      class="btn btn-outline-primary"
      target="_blank"
      href="javascript:void(0);"
      role="button">
      Pano Hesabımı Platforma Bağla (Önerilir)
    </a>
  </div>

  <div class="alert alert-success">
    <strong>???</strong>
    hesabı başarıyla platforma bağlandı.
    <br />
    <br />
    <a class="btn btn-outline-success" href="javascript:void(0);">
      Bağlantıyı Kes
    </a>
  </div>

  <div class="alert alert-dismissible text-danger" id="finishError">
    <button class="close" type="button">
      <span aria-hidden="true">&times;</span>
    </button>
    ???
  </div>

  <div class="form-group">
    <label for="admin-username">Minecraft Kullanıcı Adı:</label>
    <input class="form-control" id="admin-username" type="text" />
  </div>
  <div class="form-group">
    <label for="admin-email">E-Posta:</label>
    <input class="form-control" id="admin-email" type="email" />
  </div>
  <div class="form-group">
    <label for="admin-password">Şifre:</label>
    <input
      class="form-control"
      id="admin-password"
      placeholder="************"
      type="password" />
    <small>Minimum: 6 karakter.</small>
  </div>
</form>

<a class="btn btn-secondary" role="button" href="javascript:void(0);">
  Tamamla
</a>
<a
  class="btn btn-outline-primary"
  role="button"
  href="javascript:void(0);"
  on:click={back}
  class:disabled={buttonsLoading}>
  Geri
</a>

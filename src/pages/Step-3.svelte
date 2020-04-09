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
  </div>

  <a
    class="btn text-primary"
    target="_blank"
    href="javascript:void(0);"
    role="button">
    Pano Hesabımı Platforma Bağla (Önerilir)
  </a>

  <div class="alert alert-success">
    <h5>Başarılı!</h5>
    <hr />
    <strong>???</strong>
    hesabı başarıyla platforma bağlandı.
    <br />
    <br />
    <a class="alert-link text-danger" href="javascript:void(0);">
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
    <input class="form-control" id="admin-password" type="password" />
    <small>Minimum: 6 karakter.</small>
  </div>
</form>

<a href="javascript:void(0);" on:click={back} class:disabled={buttonsLoading}>
  <button class="btn btn-primary" type="button">
    <!--            <span aria-hidden="true"-->
    <!--                  class="spinner-border spinner-border-sm text-light mx-4"-->
    <!--                  role="status"></span>-->
    <!--      <a v-if="!nextButtonLoading">-->
    <i class="fas fa-arrow-alt-circle-right" />
    Geri Dön
    <!--      </a>-->
  </button>
</a>

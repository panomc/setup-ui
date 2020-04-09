<script>
  import jQuery from "jquery";

  import { backStep, panoAccount } from "../Store";
  import { ApiUtil, NETWORK_ERROR } from "../util/api.util";

  let buttonsLoading = false;
  let finishButtonDisabled = true;
  let errorCode;

  let username;
  let email;
  let password;

  function submit() {
    buttonsLoading = true;

    ApiUtil.post("setup/finish", {
      username: username,
      email: email,
      password: password
    })
      .then(response => {
        if (response.data.result === "ok") {
          window.location.assign("/panel");

        } else if (response.data.result === "error") {
          const errorCode = response.data.error;

          showError(errorCode);
        } else {
          showError(NETWORK_ERROR);
          console.log(response);
        }
      })
      .catch(() => {
        showError(NETWORK_ERROR);
      });
  }

  function back() {
    if (!buttonsLoading) {
      buttonsLoading = true;

      backStep({
        step: 3
      });
    }
  }

  function showError(error) {
    buttonsLoading = false;

    errorCode = error;

    jQuery("#error").fadeIn();
  }

  function dismissErrorBox() {
    jQuery("#error").fadeOut("slow");
  }
</script>

<h3>Adım - 3/3</h3>
<p>
  Son olarak, platformunuzu yönetmek için bir hesaba ihtiyacınız var. Çevrimiçi
  <a href="https://panomc.com" target="_blank">Panomc.com</a>
  hesabınızı kullanabilir veya yerel bir hesap oluşturabilirsiniz.
</p>
<h5 class="text-primary">Yönetici Hesabı Bilgileri</h5>

<form on:submit|preventDefault={submit}>
  <div class="alert alert-primary">
    Pano hesabınızı bağladığınızda temalar ve eklentiler için gerekli alışveriş
    işlemlerini kullanabilirsiniz.
    <br/>
    <br/>
    <a
      class="btn btn-outline-primary"
      target="_blank"
      href="javascript:void(0);"
      role="button">
      Pano Hesabımı Platforma Bağla (Önerilir)
    </a>
  </div>

  <div class="alert alert-success">
    <a
      class="alert-link"
      href="https://panomc.com/user/username"
      target="_blank">
      ???
    </a>
    hesabı başarıyla platforma bağlandı.
    <br/>
    <br/>
    <a class="btn btn-outline-success" href="javascript:void(0);">
      Bağlantıyı Kes
    </a>
  </div>

  <div class="alert alert-dismissible text-danger" id="error" style="display: none;">
    <button class="close" type="button" on:click={dismissErrorBox}>
      <span aria-hidden="true">&times;</span>
    </button>
    {errorCode}
  </div>

  <div class="form-group">
    <label for="admin-username">Minecraft Kullanıcı Adı:</label>
    <input class="form-control" id="admin-username" type="text"/>
  </div>
  <div class="form-group">
    <label for="admin-email">E-Posta:</label>
    <input class="form-control" id="admin-email" type="email"/>
  </div>
  <div class="form-group">
    <label for="admin-password">Şifre:</label>
    <input
      class="form-control"
      id="admin-password"
      placeholder="************"
      type="password"/>
    <small>Minimum: 6 karakter.</small>
  </div>

  <button type="submit" class="btn btn-secondary" class:disabled={buttonsLoading || finishButtonDisabled} disabled={buttonsLoading || finishButtonDisabled}>
    Tamamla
  </button>
  <a
    class="btn btn-outline-primary"
    role="button"
    href="javascript:void(0);"
    on:click={back}
    class:disabled={buttonsLoading} disabled={buttonsLoading}>
    Geri
  </a>
</form>

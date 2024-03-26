function CargarAlertas() {

  $.get("/Base/CargarAlertas", function (resHtml) {
    $("#AlertsContainer").append(resHtml);
  }, 'html');
  ShowToast();
}

function Danger(mensaje) {
  var html = ToastTemplate(mensaje, "error");
  $(".toast-container").append(html);
  ShowToast();
}

function Info(mensaje) {
  var html = ToastTemplate(mensaje, "info");
  $(".toast-container").append(html);
  ShowToast();
}

function Warning(mensaje) {
  var html = ToastTemplate(mensaje, "warning");
  $(".toast-container").append(html);
  ShowToast();
}

function Success(mensaje) {
  var html = ToastTemplate(mensaje, "success");
  $(".toast-container").append(html);
  ShowToast();
}

function ToastTemplate(mensaje, tipo) {

  var title = "Info";

  switch (tipo) {
    case "success":
      title = "Success!";
      break;
    case "info":
      title = "Info";
      break;
    case "warning":
      title = "Warning";
      break;
    case "error":
      title = "Error";
      className = "toast-error";
      break;
    default:
      break;
  }

  var html = '<div class="toast toast-' + tipo +'" role="alert" aria-live="assertive" aria-atomic="true"> \
                <div class="toast-header"> \
                    <strong class="me-auto">'+ title +'</strong> \
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button> \
                </div> \
                <div class="toast-body">' + mensaje + '</div> \
              </div>';

  return html;

}

function ShowToast() {
  var toastElList = [].slice.call(document.querySelectorAll('.toast:not(.hide)'))
  var toastList = toastElList.map(function (toastEl) {
    return new bootstrap.Toast(toastEl)
  })

  $('.toast:not(.hide)').on("hidden.bs.toast", function () {
    $(this).remove();
  })

  toastList.forEach(toast => toast.show())
}

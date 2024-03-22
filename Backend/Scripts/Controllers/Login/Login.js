var frmLogin = "Login";

function Ingresar()
{
    $("#divCredencialesIncorrectas").addClass("hidden");

    if ($("#LoginForm").valid()) {
        $.post("/Home/Ingresar/", $("#LoginForm").serialize())
        .success(function (data) {
            if (data.IsEverythingGood) {
                if (data.CredencialesValidas) {
                    window.location.href = '/Home/Index';
                }
                else {
                    $("#divCredencialesIncorrectas").removeClass("hidden");
                }
            }
        })
        .always(function (data) {
            CargarAlertas(frmLogin);
        });
    }
}
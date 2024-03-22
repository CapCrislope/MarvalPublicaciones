var frmLogin = "Login";

function Ingresar() {
    //;

    $("#divCredencialesIncorrectas").addClass("d-none");

    if ($("#LoginForm").valid()) {
        $.post("/Home/Ingresar/", $("#LoginForm").serialize())
            .done(function (data) {
                //;
                if (data.isEverythingGood) {

                    if (data.logInStatus) {
                        CargarHome();
                    }
                    else {
                        $("#divCredencialesIncorrectas").removeClass("d-none");
                    }
                }
            })
            .always(function (data) {
                CargarAlertas(frmLogin);
            });
    }
}
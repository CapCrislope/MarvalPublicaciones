var frmEnvioAuditores = "_EnvioAuditores";

function EnviarInfoAuditores() {

    $("#btnEnvio").prop("disabled", true);
    if ($("#PsExcel").val() != "") {

        $.post('/RRHH/EnvioInfoAuditores', {PasswordExcel: $("#PsExcel").val() })
            .done(function (data) {
                if (data.isEverythingGood == true) {
                    CargarMenu();
                    CargarEstadoProceso();
                }

            })
            .always(function () {
                CargarAlertas(frmHome);
            })
    }
    else {
        $("#btnEnvio").prop("disabled", false);
        Danger("Debe ingresar una contraseña.");
    }

   

}

function guardarNroConstancia() {
    $("#Modo").val("Guardar")
    if ($("#NroConstanciaPago").val() != "") {

        guardarDatos();
    }
    else {
        Danger("Por favor corrobore el campo Nro de Constancia de Orden de Pago.")
    }
}

function omitirNroConstancia() {
    $("#Modo").val("Omitir")
    $("#motivoOmisionBox").show();
}

function enviarMotivoOmision() {

    if ($("#MotivoOmision").val() != "" && $("#MotivoOmision").val().length <=500) {
        guardarDatos();
    }
    else {
        Danger("Si desea omitir el Nro de Constancia debe ingresar un motivo sin excepción y el máx de caracteres es de 500.")
    }
}

function guardarDatos() {
    $.post('/RRHH/GuardarConstanciaDePago', $("#formConstanciaPago").serialize())
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
function CargarAlertas(frmId) {
    var frmCombos = "Combos";
    $("#Alerts" + frmId).load("/Base/CargarAlertas", { keyName: [frmId, frmCombos] });
}

function Danger(mensaje) {
    new PNotify({
        text: mensaje,
        type: 'error',
        styling: 'fontawesome'
    });
}

function Info(mensaje) {
    new PNotify({
        text: mensaje,
        type: 'info',
        styling: 'fontawesome'
    });
}

function Warning(mensaje) {
    new PNotify({
        text: mensaje,
        type: 'warning',
        styling: 'fontawesome'
    });
}

function Success(mensaje) {
    new PNotify({
        text: mensaje,
        type: 'success',
        styling: 'fontawesome'
    });
}

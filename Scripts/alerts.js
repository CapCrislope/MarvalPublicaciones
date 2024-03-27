function CargarAlertas(frmId) {
    var frmCombos = "Combos";
    $("#Alerts" + frmId).load("/Base/CargarAlertas", { keyName: [frmId, frmCombos] });
}

function Danger(mensaje) {
    new PNotify({
        text: mensaje,
        type: 'error',
        styling: 'bootstrap3'
    });
}

function Info(mensaje) {
    new PNotify({
        text: mensaje,
        type: 'info',
        styling: 'bootstrap3'
    });
}

function Warning(mensaje) {
    new PNotify({
        text: mensaje,
        type: 'warning',
        styling: 'bootstrap3'
    });
}

function Success(mensaje) {
    new PNotify({
        text: mensaje,
        type: 'success',
        styling: 'bootstrap3'
    });
}

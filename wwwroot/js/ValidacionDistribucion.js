

function AprobarDistribucion() {

    ;

    $.post('/Finanzas/AprobarDistribucion', { lista: arrDatos })
        .done(function (data) {
            if (data.isEverythingGood == true) {
                CargarMenu();
            }

        })
        .always(function () {
            CargarAlertas(frmHome);
        })
}

function ModalRechazarDistribucion() {

    ;
    $("#dialog").load("/Finanzas/ModalRechazarDistribucion", function (response, status, xhr) {

        if (status == "success") {
            ;
            $("#dialog").modal('show');
        }
        else {
            CargarAlertas(frmHome);
        }
    })

}

function RechazarDistribucion() {

    ;
    var rechazoGastos = $('#chkGastos').prop('checked');
    var rechazoRetenciones = $('#chkRetenciones').prop('checked');
    var notaRevision = $("#notaRevision").val()

    if (notaRevision != "") {
        if (notaRevision.length <= 500) {

            if (rechazoGastos == true || rechazoRetenciones == true) {
                $.post("/Finanzas/RechazarDistribucion", { NotaRevision: notaRevision, rechazoGastos: rechazoGastos, rechazoRetenciones: rechazoRetenciones })
                    .done(function (data) {
                        ;
                        if (data.isEverythingGood == true) {
                            $("#dialog").modal('hide');
                            CargarMenu();
                        }
                    })
                    .always(function () {
                        CargarAlertas(frmHome)
                    })
            }
            else {
                Danger("Debe seleccionar al menos un checkbox para realizar el rechazo.")
            }
        }
        else {
            Danger("La nota de revisión puede contener hasta 500 caracteres.")
        }
    }
    else {
        Danger("Para rechazar la distribución, es obligatorio que cargue una nota de revisión.");
    }

}
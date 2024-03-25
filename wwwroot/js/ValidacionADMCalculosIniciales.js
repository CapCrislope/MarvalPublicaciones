

function AprobarCalculosIniciales() {

    $.post('/SocioAdm/AprobarCalculosIniciales')
        .done(function (data) {
            if (data.isEverythingGood == true) {
                CargarMenu();
            }

        })
        .always(function () {
            CargarAlertas(frmHome);
        })
}

function ModalRechazarCalculosIniciales() {

    ;
    $("#dialog").load("/SocioADM/ModalRechazarCalculosIniciales", function (response, status, xhr) {

        if (status == "success") {
            ;
            $("#dialog").modal('show');
        }
        else {
            CargarAlertas(frmHome);
        }
    })

}

function RechazarCalculosIniciales() {

    ;
    var notaRevision = $("#notaRevision").val()

    if (notaRevision != "") {
        if (notaRevision.length <= 500) {

            $.post("/SocioADM/RechazarCalculosIniciales", { NotaRevision: notaRevision })
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
            Danger("La nota de revisión puede contener hasta 500 caracteres.")
        }
    }
    else {
        Danger("Para rechazar los cálculos iniciales, es obligatorio que cargue una nota de revisión.");
    }

}
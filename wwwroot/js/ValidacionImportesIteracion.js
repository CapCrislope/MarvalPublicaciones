

function AprobarImportesIteracion() {

    $.post('/SocioAdm/AprobarImportesIteracion', { enDolares: enDolares})
        .done(function (data) {
            if (data.isEverythingGood == true) {
                CargarMenu();
            }

        })
        .always(function () {
            CargarAlertas(frmHome);
        })
}

function ModalRechazarImportesIteracion() {

    ;
    $("#dialog").load("/SocioADM/ModalRechazarImportesIteracion", function (response, status, xhr) {

        if (status == "success") {
            ;
            $("#dialog").modal('show');
        }
        else {
            CargarAlertas(frmHome);
        }
    })

}

function RechazarImportesIteracion() {

    ;
    var notaRevision = $("#notaRevision").val()

    if (notaRevision != "") {
        if (notaRevision.length <= 500) {

            $.post("/SocioADM/RechazarImportesIteracion", { NotaRevision: notaRevision })
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
        Danger("Para rechazar los importes de la iteración, es obligatorio que cargue una nota de revisión.");
    }

}
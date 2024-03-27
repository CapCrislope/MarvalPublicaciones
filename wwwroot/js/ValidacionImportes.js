var frmNotaRevision = "_ModalNotaRevision";
var frmValidacionImportes ="_ValidacionImportes"

function AprobarImportes() {

    $.post('/SocioAdm/AprobarImportes')
        .done(function (data) {
            if (data.isEverythingGood == true) {
                CargarMenu();
            }

        })
        .always(function () {
            CargarAlertas(frmValidacionImportes);
        })
}


function ModalNotaRevision() {

    $("#dialog").load("/SocioAdm/NotaRevisionModal", function (response, status, xhr) {

        if (status == "success") {
            ;
            $("#dialog").modal('show');
        }
        else {
            CargarAlertas(frmValidacionImportes);
        }
    })

}

function RechazarImportes() {

    ;
    var notaRevision = $("#notaRevision").val()

    if (notaRevision != "") {
        if (notaRevision.length <= 500) {

            $.post("/SocioAdm/RechazarImportes", { NotaRevision: notaRevision })
                .done(function (data) {
                    ;
                    if (data.isEverythingGood == true) {
                        $("#dialog").modal('hide');
                        CargarMenu();
                    }
                })
                .always(function () {
                    CargarAlertas(frmValidacionImportes)
                })
        }
        else {
            Danger("La nota de revisión puede contener hasta 500 caracteres.")
        }
    }
    else {
        Danger("Para rechazar los importes,es obligatorio que cargue una nota de revisión");
    }
}
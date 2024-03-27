
function AprobarAjusteEjercicio() {

    $.post('/SocioAdm/AprobarAjusteEjercicio')
            .done(function (data) {
                if (data.isEverythingGood == true) {
                    CargarMenu();
                    //CargarEstadoProceso();
                }

            })
            .always(function () {
                CargarAlertas(frmHome);

            })
    }
    



function ModalRechazarAjusteEjercicio() {

    ;
    $("#dialog").load("/SocioADM/ModalRechazarAjusteEjercicio", function (response, status, xhr) {

        if (status == "success") {
            ;
            $("#dialog").modal('show');
        }
        else {
            CargarAlertas(frmHome);
        }
    })

}

function RechazarAjusteEjercicio() {

    ;
    var notaRevision = $("#notaRevision").val()

    if (notaRevision != "") {
        if (notaRevision.length <= 500) {

            $.post("/SocioADM/RechazarAjusteEjercicio", { NotaRevision: notaRevision })
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
        Danger("Para rechazar los ajustes del ejercicio, es obligatorio que cargue una nota de revisión.");
    }

}
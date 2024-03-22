//var frmHome = "_Home";
var frmDefinicionTipoProceso = "DefinicionTipoProceso";


function btnPProvisorio() {
    var html = "";

    html += "<button type='button' id='btnProvisorio' class='btn btn-warning' data-tipoProceso='Provisorio' onclick='CrearProceso(this);'>Proceso Provisorio</button>";

    return html;
}

function btnPReal() {
    var html = "";

    html += "<button type='button' id='btnReal' class='btn btn-primary' data-tipoProceso='Real' onclick='CrearProceso(this);>Proceso Real</button>";

    return html;
}

function ValidationDrawBtn() {

    $.post("/Finanzas/ValidacionCrearProcesoBtn/")
        .done(function (data) {
            ;
            if (data.isEverythingGood == true) {
                if (!data.crearPR) {
                    $("#btnReal").prop("disabled", true);
                }

                if (!data.crearPP) {
                    $("#btnProvisorio").prop("disabled", true);
                }
            } else {
                $("#btnReal").prop("disabled", true);
                $("#btnProvisorio").prop("disabled", true);
            }
        })
        .always(function () {
            CargarAlertas(frmDefinicionTipoProceso)
        })
}

function CrearProceso(btn) {
    ;
    var TipoProceso = btn.getAttribute("data-tipoproceso");

    $.post("/Finanzas/CrearProceso/", { TipoProceso: TipoProceso })
        .done(function (data) {
            ;
            if (data.isEverythingGood == true) {
                CargarMenu();

            }
        })
        .always(function () {
            CargarAlertas(frmDefinicionTipoProceso)
        })
}
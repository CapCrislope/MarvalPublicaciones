
function sumByType(input) {

    
    // pregunto el tipo
    // cambio el valor en el data
    // del total segun el tipo,sumo
    // hago suma de los dos totales y cambio el general
    
    var total = 0;
    var type = input.dataset.type;

    //$("#TotalExSocios").text("Calculando...")

    
    if (input.value == "") {
        $("#" + input.id).val("0")
    }

    $("[data-type='" + type +"'][id^= 'Ajuste_']").each(function (i, val) {

        var ajuste = $("#" + val.id).val();
        if (ajuste == "")
            ajuste = 0;
        total = total + parseInt(ajuste)

    })


    if (type == "Socio") {
        $("#Importe_TotalAjustes_Socios").attr("data-val", total);
        $("#Importe_TotalAjustes_Socios").text("$ " + total.toLocaleString());
    }
    else {
        $("#Importe_TotalAjustes_ExSocios").attr("data-val", total);
        $("#Importe_TotalAjustes_ExSocios").text("$ " + total.toLocaleString());
    }


    var sumTotal = parseInt($("#Importe_TotalAjustes_Socios").attr("data-val")) + parseInt($("#Importe_TotalAjustes_ExSocios").attr("data-val"))
    
    $("#SumaAjustes").text("$ " + sumTotal.toLocaleString());



}



function ObjPersona() {

    var p = {
        IdPersona: null,
        Ajuste: null,
        Observacion:null
    }

    return p;
}


function GetDataAjustes() {

    var arr = [];


    $("#AjustesEjercicioTable [id^= 'Ajuste_']").each(function (i, val) {

        var item = ObjPersona();
      
        item.IdPersona = val.dataset.id;
        item.Ajuste = $("#" + val.id).val();
        item.Observaciones = $("#Observacion_" + val.dataset.id).val()

        arr.push(item)


    })

    return arr;

}


function guardarAjustesEjercicio() {

    var data = {
        AjustesSocios: GetDataAjustes(),
        Modo: $("#Modo").val(),
        IdAjuste: $("#IdAjuste").val()
    }

    if (checkObservaciones(data.AjustesSocios)) {
        $.post('/Finanzas/GuardarAjustesEjericicio', { data: data })
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
    else {
        Danger("Corrobore que las observaciones esten cargadas las mismas tienen un máx de 500 caracteres.")
    }

       
    
 
}

function checkObservaciones(data) {
    
    var ajusteObservacion = true;

    for (var i = 0; i < data.length;i++){

        if (data[i].Ajuste != "0" && data[i].Observaciones == "") {
            return false;
        }
        else {
            if (data[i].Observaciones.length > 500) {
                return false;
            }
        }
       
    }

    return ajusteObservacion

}

function ModalRechazarImpuestosReales() {

    ;
    $("#dialog").load("/Finanzas/ModalRechazarImpuestosReales", function (response, status, xhr) {

        if (status == "success") {
            ;
            $("#dialog").modal('show');
        }
        else {
            CargarAlertas(frmHome);
        }
    })

}

function RechazarImpuestosReales() {

    ;
    var notaRevision = $("#notaRevision").val()

    if (notaRevision != "") {
        if (notaRevision.length <= 500) {

            $.post("/Finanzas/RechazarImpuestosReales", { NotaRevision: notaRevision })
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
        Danger("Para rechazar los impuestos reales del ejercicio, es obligatorio que cargue una nota de revisión.");
    }

}

function SumImportes(input) {
    ;
   
    if (input.value == "") {
        $("#"+ input.id).val("0")
    }

    $("#TotalExSocios").text("Calculando...")
    var total = 0;

    $("[id^= 'Importe_']").each(function (i, val) {

        var importe = $("#" + val.id).val();
        total = total + parseInt(importe)

    })

    $("#TotalExSocios").text(moneda + total.toLocaleString())
    return total;
}

function GuardarRetenciones() {
    ;

    var data = {
        ExSocios: GetDataExSociosImporte(),
        Modo: $("#Modo").val()
    }

    $.post('/RRHH/GuardarRetenciones', { crvm: data })
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


function ObjPersona() {

    var p = {
        IdPersona: null,
        Importe: null
    }

    return p;
}


function GetDataExSociosImporte() {

    var arr = [];


    $("#RetencionesTable tbody tr[data-type='ExSocio']").each(function (i, val) {

        var item = ObjPersona();

        item.IdPersona = val.id;
        item.Importe = $("#Importe_" + val.id).val();

        arr.push(item)


    })

    return arr;

}
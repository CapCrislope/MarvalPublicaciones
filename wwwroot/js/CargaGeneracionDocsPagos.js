
function registrarPago() {
    ;
    $.post('/RRHH/RegistrarPago', { Socios: getData(), IdIteracion: $("#idIteracion").val() })
        .done(function (data) {
            if (data.isEverythingGood == true) {
                CargarMenu();
            }
        })
        .always(function () {
            CargarAlertas(frmHome);
        })
}

function getData() {

    var arr = [];


    $("input[type=checkbox]:checked").each(function (i, val) {

        var item = val.id;

        arr.push(item)

    })

    return arr;

}


function generarTxt(tipoBanco) {

    var Socios = getSociosTxt(tipoBanco);

    if (Socios.length > 0) {

        $.post('/RRHH/GenerarTxt', { Socios: Socios, TipoBanco: tipoBanco, IdIteracion: $("#idIteracion").val() })
            .done(function (data) {
                ;
                // window.location = data

                if (data.isEverythingGood == true) {
                    window.location = "/Base/ExportarFileCompleto?token=" + data.token;
                }
            })
            .always(function () {
                CargarAlertas(frmHome);
            })
    }
    else {
        Danger("El txt no puede generarse porque los socios seleccionados no corresponden al tipo de banco seleccionado.")
    }

  


}



function getSociosTxt(tipoBanco) {

    var arr = [];


    $("input[data-tipobanco="+tipoBanco+"]:checked").each(function (i, val) {

        var item = val.id;

        arr.push(item)

    })

    return arr;

}
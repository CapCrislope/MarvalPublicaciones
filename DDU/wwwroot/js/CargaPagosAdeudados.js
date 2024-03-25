function setActiveSubmenu(btn) {
    if (btn != null && btn != undefined) {
        $(".submenu").closest("[role='presentation']").removeClass("active");
        $(btn).closest("[role='presentation']").addClass("active");
    }
}

function pagosAdeudadosPesos(btn) {

    $('#pnlDistribucion').load('/Independiente/DistribucionPesos/', function (response, status, xhr) {
        if (status == "success") {
            setActiveSubmenu(btn);
        }
    });
}

function pagosAdeudadosDolares(btn) {
    $('#pnlDistribucion').load('/Independiente/DistribucionDolares/', function (response, status, xhr) {
        if (status == "success") {
            setActiveSubmenu(btn);
        }
    });
}


function obj() {

    var data = "";

    data = {
        IdPersona: null,
        IdIteracion:null
    }

    return data;
    
}

function getData() {

    var arr = [];
    var item ;

    $("input[type=checkbox]:checked").each(function (i, val) {

        item = obj();
        item.IdPersona = $("#" + val.id).attr("data-id");
        item.IdIteracion = $("#" + val.id).attr("data-iteracion");
        arr.push(item)

    })

    return arr;

}



function registrarPagoAdeudados() {
    ;
    var Socios = getData();
    if (Socios.length>0) {
        $.post('/Independiente/RegistrarPagosAdeudados', { Socios: Socios, PagoEnPesos: $("#tipoPago").val() })
            .done(function (data) {
                if (data.isEverythingGood == true) {
                    if ($("#tipoPago").val()) {
                        pagosAdeudadosPesos();
                    }
                    else {
                        pagosAdeudadosDolares();
                    }
                }

            })
            .always(function () {
                CargarAlertas(frmHome);
            })
    }
    else {
        Danger("Debe seleccionar al menos un socio de la grilla.")
    }

}

function fItem() {

    var item = {
        IdPersona: null,
        IdImportePagoSocios: null
    }

    return item
}


function getSociosTxtAdeudados(tipoBanco) {

    var arr = [];
    var socio;

    $("input[data-tipobanco=" + tipoBanco + "]:checked").each(function (i, val) {

        socio = fItem();
        socio.IdPersona = $("#" + val.id).attr("data-id");
        socio.IdImportePagoSocios = $("#" + val.id).attr("data-idimportepagosocio");

        arr.push(socio)

    })

    return arr;

}


function generarTxtPagosAdeudados(tipoBanco) {

    var Socios = getSociosTxtAdeudados(tipoBanco);

    if ($("#datepicker").val() != "") {
        if (Socios.length > 0) {
            $.post('/Independiente/GenerarTxtPagosAdeudados', { Socios: Socios, TipoBanco: tipoBanco, FechaPago: $("#datepicker").val() })
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
    else {
        Danger("La fecha de pago es obligatoria.")
    }
   
}
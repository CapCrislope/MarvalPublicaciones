

function ModalRechazarBonosRetiros() {

    ;
    $("#dialog").load("/Finanzas/ModalRechazarBonosRetiros", function (response, status, xhr) {

        if (status == "success") {
            ;
            $("#dialog").modal('show');
        }
        else {
            CargarAlertas(frmHome);
        }
    })

}

function RechazarBonosRetiros() {

    ;
    var notaRevision = $("#notaRevision").val()

    if (notaRevision != "") {
        if (notaRevision.length <= 500) {

            $.post("/Finanzas/RechazarBonosRetiros", { NotaRevision: notaRevision })
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
        Danger("Para rechazar los Bonos/Retiros, es obligatorio que cargue una nota de revisión.");
    }

}


function EdicionDatos(IdSocio) {
    ;
    var EsSocio = $("#" + IdSocio).attr("data-type");
    var Impuestos = $("#ImporteImpuestos_" + IdSocio).attr("data-val");
    var ImpuestosModif = $("#ImporteImpuestos_" + IdSocio).attr("data-modif");
    var Retenciones = $("#ImporteRetenciones_" + IdSocio).attr("data-val");
    var RetencionesModif = $("#ImporteRetenciones_" + IdSocio).attr("data-modif");

    var impuestosSocio = Impuestos;
    var retencionesSocio = Retenciones;

    if (ImpuestosModif != "")
        impuestosSocio = ImpuestosModif;

    if (RetencionesModif != "")
        retencionesSocio = RetencionesModif;

    $("#dialog").load("/Finanzas/ModalEdicionImpuestosRetenciones", { IdSocio: IdSocio, EsSocio: EsSocio, Impuestos: impuestosSocio, Retenciones: retencionesSocio}, function (response, status, xhr) {

        if (status == "success") {
            ;
            $("#dialog").modal('show');
        }
        else {
            CargarAlertas(frmHome);
        }
    })

}

function EdicionImpuestosRetenciones() {
    ;
    var objData = $("#FormEdicionImpuestosRetenciones").serializeArray();
    var IdSocio = objData[0].value;
    var Type = objData[1].value;
    var Impuestos = parseInt(objData[2].value);
    var Retenciones = parseInt(objData[3].value);
    

    var TotalImpuestos = 0;
    var TotalRetenciones = 0;
 
    if (Impuestos >= 0 && Retenciones >= 0) {

        ;
        //modifico los campos retenciones e impuestos
        $("#ImporteRetenciones_" + IdSocio).text("$ " + Retenciones.toLocaleString());
        $("#ImporteRetenciones_" + IdSocio).attr("data-modif", Retenciones);

        $("#ImporteImpuestos_" + IdSocio).text("$ " + Impuestos.toLocaleString());
        $("#ImporteImpuestos_" + IdSocio).attr("data-modif", Impuestos);

        // dentro de este metodo empiezan los callbacks
        ObtenerSaldoInicial(IdSocio, Type, CalcularSumaImpuestos)


        // calcular el total de impuestos
        TotalImpuestos = parseInt($("#Importe_TotalImpuestosSocios").attr("data-val")) + parseInt($("#Importe_TotalImpuestosExSocios").attr("data-val"));
        $("#ImporteSumaTotalImpuestos").attr("data-val", TotalImpuestos);
        $("#ImporteSumaTotalImpuestos").text("$ " + TotalImpuestos.toLocaleString());

        // calcular el total de retenciones
        TotalRetenciones = parseInt($("#Importe_TotalRetencionesSocios").attr("data-val")) + parseInt($("#Importe_TotalRetencionesExSocios").attr("data-val"));
        $("#ImporteSumaTotalRetenciones").attr("data-val",TotalRetenciones);
        $("#ImporteSumaTotalRetenciones").text("$ " + TotalRetenciones.toLocaleString());


        // calcular el total de saldos iniciales
        TotalSaldoInicial = parseInt($("#Importe_TotalSaldoInicialSocios").attr("data-val")) + parseInt($("#Importe_TotalSaldoInicialExSocios").attr("data-val"));
        $("#ImporteSumaTotalSaldoInicial").attr("data-val", TotalSaldoInicial);
        $("#ImporteSumaTotalSaldoInicial").text("$ " + TotalSaldoInicial.toLocaleString());

         $("#dialog").modal('hide');

        Success("Se modificó correctamente los valores de Retenciones e Impuestos del Socio/ExSocio: " + IdSocio);


    }
    else {
        Danger("Los campos Retenciones e Impuestos son obligatorios.")
    }


}

function ObtenerSaldoInicial(IdSocio,Type,callback) {
    ;
    var Importe = parseInt($("#Importe_" + IdSocio).attr("data-val"))
    var Retiros = parseInt($("#ImporteRetiro_" + IdSocio).attr("data-val"))
    var Bonos = parseInt($("#ImporteBono_" + IdSocio).attr("data-val"))
    var Impuestos = parseInt($("#ImporteImpuestos_" + IdSocio).attr("data-modif"))
    var Retenciones = parseInt($("#ImporteRetenciones_" + IdSocio).attr("data-modif"))
    var AJAnterior = parseInt($("#ImporteAjusteEjercicioAnterior_" + IdSocio).attr("data-val"))

    //var SaldoInicial = (AJAnterior - Importe - Retiros - Bonos - Impuestos - Retenciones);
    var SaldoInicial = (Importe - Retiros - Bonos - Impuestos - Retenciones - (AJAnterior));

    // saldo inicial del socio
    $("#ImporteSaldoInicial_" + IdSocio).attr("data-modif",SaldoInicial);
    $("#ImporteSaldoInicial_" + IdSocio).text("$ " + SaldoInicial.toLocaleString());

    // return SaldoInicial;
    callback(Type, CalcularSumaRetenciones)
}

function CalcularSumaImpuestos(type,callback) {

    var importeImpuestos = 0;


    $("#ImportesSocioTable tbody tr[data-type='" + type + "'] ").find("div[id^='ImporteImpuestos_']").each(function (i, val) {
        var id = val.id;
        if ($("#" + id).attr("data-modif") == "") {
            importeImpuestos = parseInt($("#" + id).attr("data-val")) + importeImpuestos;
        }
        else {
            importeImpuestos = parseInt($("#" + id).attr("data-modif")) + importeImpuestos;
        }
    })

    if (type == "Socio") {
        $("#Importe_TotalImpuestosSocios").attr("data-val", importeImpuestos);
        $("#Importe_TotalImpuestosSocios").text("$ " + importeImpuestos.toLocaleString());
    }
    else {
        $("#Importe_TotalImpuestosExSocios").attr("data-val", importeImpuestos);
        $("#Importe_TotalImpuestosExSocios").text("$ " + importeImpuestos.toLocaleString());
    }

     callback(type, CalcularSumaSaldoInicial)
}

function CalcularSumaRetenciones(type,callback) {

      var importeRetenciones = 0;


    $("#ImportesSocioTable tbody tr[data-type='" + type + "'] ").find("div[id^='ImporteRetenciones_']").each(function (i, val) {

        var id = val.id;
        if ($("#" + id).attr("data-modif") == "") {
            importeRetenciones = parseInt($("#" + id).attr("data-val")) + importeRetenciones;
        }
        else {
            importeRetenciones = parseInt($("#" + id).attr("data-modif")) + importeRetenciones;
        }

    })

    if (type == "Socio") {
        $("#Importe_TotalRetencionesSocios").attr("data-val",importeRetenciones);
        $("#Importe_TotalRetencionesSocios").text("$ " + importeRetenciones.toLocaleString());
    }
    else {
        $("#Importe_TotalRetencionesExSocios").attr("data-val", importeRetenciones);
        $("#Importe_TotalRetencionesExSocios").text("$ " + importeRetenciones.toLocaleString());
    }

    // calcular la suma de todos los saldos iniciales
    callback(type)
}


function CalcularSumaSaldoInicial(type) {

    ;
    var saldoInicial = 0;

    $("#ImportesSocioTable tbody tr[data-type='" + type + "'] ").find("div[id^='ImporteSaldoInicial_']").each(function (i, val) {

        var id = val.id;
  
        if ($("#" + id).attr("data-modif") == "") {
            saldoInicial = (parseInt($("#" + id).attr("data-val"))) + saldoInicial;
        }
        else {
            saldoInicial = (parseInt($("#" + id).attr("data-modif"))) + saldoInicial;

        }

    })
    ;
    if (type == "Socio") {
        $("#Importe_TotalSaldoInicialSocios").attr("data-val", saldoInicial);
        $("#Importe_TotalSaldoInicialSocios").text("$ " + saldoInicial.toLocaleString());
    }
    else {
        $("#Importe_TotalSaldoInicialExSocios").attr("data-val", saldoInicial);
        $("#Importe_TotalSaldoInicialExSocios").text("$ " + saldoInicial.toLocaleString());

    }

}


function ObjPersona() {

    var p = {
        PersonaId: null,
        Impuestos: null,
        ImpuestosModif: null,
        Retenciones:null,
        RetencionesModif: null,
        SaldoInicialS: null,
        SaldoInicialModif:null
    }

    return p;
}



function GetDataSociosExSocios(type) {
    var arr = [];


    $("#ImportesSocioTable tbody tr[data-type='"+type+"']").each(function (i, val) {

        var item = ObjPersona();

        var idPersona = val.id;
        var Impuestos = $("#ImporteImpuestos_" + val.id).attr("data-val");
        var ImpuestosModif = $("#ImporteImpuestos_" + val.id).attr("data-modif");
        var Retenciones = $("#ImporteRetenciones_" + val.id).attr("data-val");
        var RetencionesModif = $("#ImporteRetenciones_" + val.id).attr("data-modif");
        var SaldoInicialS = $("#ImporteSaldoInicial_" + val.id).attr("data-val");
        var SaldoInicialModif = $("#ImporteSaldoInicial_" + val.id).attr("data-modif");

        item.PersonaId = idPersona;
        item.Impuestos = Impuestos;
        item.ImpuestosModif = ImpuestosModif;
        item.Retenciones = Retenciones;
        item.RetencionesModif = RetencionesModif;
        item.SaldoInicialS = SaldoInicialS;
        item.SaldoInicialModif = SaldoInicialModif;

        arr.push(item)


    })

    return arr;
}


function GuardarCalculosIniciales() {

    ;

    var data = {
        Socios: GetDataSociosExSocios('Socio'),
        ExSocios: GetDataSociosExSocios('ExSocio'),
        Modo : $("#Modo").val()
    }

    $.post('/Finanzas/GuardarValoresIniciales', { Data : data })
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
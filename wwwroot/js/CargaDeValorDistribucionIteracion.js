
function disableInput(btn) {
    
    var tipoMoneda = $(btn).attr('id');

    if (tipoMoneda == "tipo_Pesos") {
        $("#ImporteDistribucionSociosDolares").prop("disabled", true)
        $("#ImporteDistribucionSociosDolares").val("")
        $("#ImporteDistribucionSociosDolares").blur();

        $("#ImporteDistribucionExSociosDolares").val("")
        $("#ImporteDistribucionExSociosDolares").blur();

        $("#ImporteDistribucionSociosPesos").prop("disabled", false)

        VaciarDistribucionDolares();
    }
    else {
        $("#ImporteDistribucionSociosDolares").prop("disabled", false)

 
    }

}

function conversionPesosADolar() {
    ;
    var conversion = Math.round($("#ImporteDistribucionSociosPesos").val() / parseFloat($("#TipoCambio").val()));
    $("#ImporteDistribucionSociosDolares").val(conversion);
    $("#ImporteDistribucionSociosDolares").blur();
   // $("#ImporteDistribucionSociosDolares").attr("value",conversion);

}

function conversionDolarAPesos() {
    ;
    var conversion = $("#ImporteDistribucionSociosDolares").val() * parseFloat($("#TipoCambio").val());
    $("#ImporteDistribucionSociosPesos").val(conversion);
    $("#ImporteDistribucionSociosPesos").blur();
}


function checkInputTipoCambio() {
    
    if ($("[name='TipoDistribucionPesos']:checked").val() == "True") {
        if (($("#ImporteDistribucionSociosPesos").val() != "0" && ($("#ImporteDistribucionSociosPesos").val() != ""))) {
            
            calcularImporteTotalSociosYExSocios()
        }
        else {
            Danger("Para realizar el calculo,debe ingresar un valor en Importe total en $ a Distribuir a Socios")
        }

    }
    else {

        //si los dos campos estan vacios
        if (($("#ImporteDistribucionSociosPesos").val() == "0" || $("#ImporteDistribucionSociosPesos").val() == "") &&
            ($("#ImporteDistribucionSociosDolares").val() == "0" || $("#ImporteDistribucionSociosDolares").val() == "")) {
            Danger("Debe ingresar un monto en alguno de los campos para realizar la conversión.");
        }
        else {
            // si los dos campos estan llenos
            if (($("#ImporteDistribucionSociosPesos").val() != "0" && $("#ImporteDistribucionSociosPesos").val() != "") &&
                ($("#ImporteDistribucionSociosDolares").val() != "0" && $("#ImporteDistribucionSociosDolares").val() != "")) {
                Danger("Solo un valor debe estar cargado. Por favor corrobore los campos.")
            }
            else {
                if (($("#ImporteDistribucionSociosPesos").val() != "0" && ($("#ImporteDistribucionSociosPesos").val() != ""))) {

                    conversionPesosADolar();
                }
                else {
                    conversionDolarAPesos();
                }

                calcularImporteTotalSociosYExSocios();
            }
        }
        
    }
   
}


function calcular() {

    checkInputTipoCambio();
}


function calcularImporteTotalSociosYExSocios() {

    // porcentaje TOTAL de los socios y exSocios
    ;
    var porcentajeExSocios = $("#TotalPorcentajeExSocios").attr("data-val").replace(",",".");
    var porcentajeSocios = $("#TotalPorcentajeSocios").attr("data-val").replace(",", ".");

    var importeIngresadoSocios = $("#ImporteDistribucionSociosPesos").val()


    var totalExSociosPesos = ((parseFloat(porcentajeExSocios) * parseInt(importeIngresadoSocios)) / parseFloat(porcentajeSocios))
    totalExSociosPesos = Math.round(totalExSociosPesos)
    $("#ImporteDistribucionExSociosPesos").val(totalExSociosPesos)
    $("#ImporteDistribucionExSociosPesos").blur();
    //$("#ImporteDistribucionExSociosPesos").text(totalExSociosPesos)
    
    // si es dolares
    if ($("[name='TipoDistribucionPesos']:checked").val() == "False") {
        var totalExSociosDolar = (totalExSociosPesos / parseFloat($("#TipoCambio").val().replace(",",".")))
        totalExSociosDolar = Math.round(totalExSociosDolar);
        $("#ImporteDistribucionExSociosDolares").val(totalExSociosDolar)
        $("#ImporteDistribucionExSociosDolares").blur();
        //$("#ImporteDistribucionExSociosDolares").text(totalExSociosDolar)
    }
  
    calcularDistribucionSocioYExSocio()
}

function calcularDistribucionSocioYExSocio() {

  // obtengo los socios y exSocioos
    var Socios = GetDataTable('Socio')
    var ExSocios = GetDataTable('ExSocio')

    ;
    // si es solo pesos
    if ($("[name='TipoDistribucionPesos']:checked").val() == "True") {

        calculoDistribucionPesos(Socios, ExSocios, null);
        $("[id^='ImporteDistribucionTotalDolares_'").attr("data-val", 0);
    }
    else {
        // hacer ambas columnas
        calculoDistribucionPesos(Socios, ExSocios, calculoDistribucionDolares);
        
    }

    // hacer suma o poner los mismos campos en 
    //var suma = 0;
    //$("#CargaValorDistribucionIteracionTable tbody tr[data-type='Socio']").each(function (i, val) {
    //    ;
    //    suma += parseFloat(suma) + parseFloat($("#ImporteDistribucionTotalPesos_" + val.id).attr("data-val"))

    //})

  
    
    
}


function calculoDistribucionPesos(Socios,ExSocios,callback) {

    ;
    var distribucionTotal_socio_pesos = parseInt($("#ImporteDistribucionSociosPesos").val());
    var distribucionTotal_exSocio_pesos = parseInt($("#ImporteDistribucionExSociosPesos").val());
    var porcentaje_Socios = parseFloat($("#TotalPorcentajeSocios").attr("data-val").replace(",", "."));
    var porcentaje_ExSocios = parseFloat($("#TotalPorcentajeExSocios").attr("data-val").replace(",", "."));

    $(Socios).each(function (i, val) {

        var totalP = Math.round((distribucionTotal_socio_pesos * parseFloat(val.porcentaje.replace(",", "."))) / porcentaje_Socios);
        $("#ImporteDistribucionTotalPesos_" + val.idPersona).attr("data-val", totalP);
        $("#ImporteDistribucionTotalPesos_" + val.idPersona).text("$ " + totalP.toLocaleString());
    })


    $(ExSocios).each(function (i, val) {

        var totalP = Math.round((distribucionTotal_exSocio_pesos * parseFloat(val.porcentaje.replace(",", "."))) / porcentaje_ExSocios);
        $("#ImporteDistribucionTotalPesos_" + val.idPersona).attr("data-val", totalP);
        $("#ImporteDistribucionTotalPesos_" + val.idPersona).text("$ " + totalP.toLocaleString());

    })

    $("#TotalDistribucionPesosSocios").attr("data-val", distribucionTotal_socio_pesos);
    $("#TotalDistribucionPesosSocios").text("$ " + distribucionTotal_socio_pesos.toLocaleString());

    $("#TotalDistribucionPesosExSocios").attr("data-val", distribucionTotal_exSocio_pesos);
    $("#TotalDistribucionPesosExSocios").text("$ " + distribucionTotal_exSocio_pesos.toLocaleString());

    var sumaTotalPesos = parseInt($("#TotalDistribucionPesosExSocios").attr("data-val")) + parseInt($("#TotalDistribucionPesosSocios").attr("data-val"));
    $("#SumaTotalDistribucionesPesos").text("$ " + sumaTotalPesos.toLocaleString())

    if (callback!=null)
    callback(Socios,ExSocios);
}


function calculoDistribucionDolares(Socios,ExSocios) {

    ;
    var distribucionTotal_socio_dolar = parseInt($("#ImporteDistribucionSociosDolares").val());
    var distribucionTotal_exSocio_dolar = parseInt($("#ImporteDistribucionExSociosDolares").val());
    var porcentaje_Socios = parseFloat($("#TotalPorcentajeSocios").attr("data-val").replace(",", "."));
    var porcentaje_ExSocios = parseFloat($("#TotalPorcentajeExSocios").attr("data-val").replace(",", "."));

    $(Socios).each(function (i, val) {

        var totalP = Math.round((distribucionTotal_socio_dolar * parseFloat(val.porcentaje.replace(",", "."))) / porcentaje_Socios);
        $("#ImporteDistribucionTotalDolares_" + val.idPersona).attr("data-val", totalP);
        $("#ImporteDistribucionTotalDolares_" + val.idPersona).text("U$D " + totalP.toLocaleString());
    })


    $(ExSocios).each(function (i, val) {

        var totalP = Math.round((distribucionTotal_exSocio_dolar * parseFloat(val.porcentaje.replace(",", "."))) / porcentaje_ExSocios);
        $("#ImporteDistribucionTotalDolares_" + val.idPersona).attr("data-val", totalP);
        $("#ImporteDistribucionTotalDolares_" + val.idPersona).text("U$D " + totalP.toLocaleString());

    })


    $("#TotalDistribucionDolaresSocios").attr("data-val", distribucionTotal_socio_dolar);
    $("#TotalDistribucionDolaresSocios").text("U$D " + distribucionTotal_socio_dolar.toLocaleString());

    $("#TotalDistribucionDolaresExSocios").attr("data-val", distribucionTotal_exSocio_dolar);
    $("#TotalDistribucionDolaresExSocios").text("U$D " + distribucionTotal_exSocio_dolar.toLocaleString());

    var sumaTotalDolares = parseInt($("#TotalDistribucionDolaresExSocios").attr("data-val")) + parseInt($("#TotalDistribucionDolaresSocios").attr("data-val"));
    $("#SumaTotalDistribucionesDolares").text("U$D " + sumaTotalDolares.toLocaleString());

}

function VaciarDistribucionDolares() {

    $("[id^='ImporteDistribucionTotalDolares_'").attr("data-val", 0);
    $("[id^='ImporteDistribucionTotalDolares_'").text("U$D 0");

    $("#TotalDistribucionDolaresSocios").attr("data-val", 0);
    $("#TotalDistribucionDolaresSocios").text("U$D 0");

    $("#TotalDistribucionDolaresExSocios").attr("data-val", 0);
    $("#TotalDistribucionDolaresExSocios").text("U$D 0");

    $("#SumaTotalDistribucionesDolares").text("U$D 0");

}


function ObjPersona() {

    var obj = {
        idPersona: null,
        porcentaje:null
    }

    return obj
}

//obtengo el porcentaje de cada persona
function GetDataTable(type) {
    var arr = [];


    $("#CargaValorDistribucionIteracionTable tbody tr[data-type='"+type+"']").each(function (i, val) {

        var item = ObjPersona();

        var idPersona = val.id;
        var porcentaje = $("#DistribucionPorcentaje_" + val.id).attr("data-val");
       

        item.idPersona = idPersona;
        item.porcentaje = porcentaje;


        arr.push(item)

    })

    return arr;
}


function ObjPersonaDistribucion() {

    var obj = {
        IdPersona: null,
        Porcentaje: null,
        ImportePesos: null,
        ImporteDolares:null
    }

    return obj
}

function GetDataSocioTable(type) {
    var arr = [];


    $("#CargaValorDistribucionIteracionTable tbody tr[data-type='" + type + "']").each(function (i, val) {
        ;
        var item = ObjPersonaDistribucion();

        item.IdPersona = val.id;
        item.Porcentaje = $("#DistribucionPorcentaje_" + val.id).attr("data-val");
        item.ImportePesos = parseInt($("#ImporteDistribucionTotalPesos_" + val.id).attr("data-val"));
        item.ImporteDolares = parseInt($("#ImporteDistribucionTotalDolares_" + val.id).attr("data-val"));


        arr.push(item)

    })

    return arr;
}




function guardarDistribucionIteracion() {



    if (validImportesInputAndImportesTabla()) {

        var data = {
            Modo: $("#Modo").val(),
            TipoCambio: $("#TipoCambio").val(),
            Restante: parseInt($("#MontoRestante").attr("data-val")),
            TipoDistribucionPesos: ($("[name='TipoDistribucionPesos']:checked").val() == "True" ?  true : false ),
            ImporteDistribucionSociosDolares: parseInt($("#ImporteDistribucionSociosDolares").val()),
            ImporteDistribucionSociosPesos: parseInt($("#ImporteDistribucionSociosPesos").val()),
            ImporteDistribucionExSociosDolares: parseInt($("#ImporteDistribucionExSociosDolares").val()),
            ImporteDistribucionExSociosPesos: parseInt($("#ImporteDistribucionExSociosPesos").val()),
            Socios: GetDataSocioTable('Socio'),
            ExSocios: GetDataSocioTable('ExSocio')
            
        }

        $.post('/Finanzas/GuardarDistribucionIteracion', { vm: data })
            .done(function (data) {
                if (data.isEverythingGood == true) {
                    CargarMenu();
                    CargarEstadoProceso();
                }

            })
            .always(function () {
                ;
                CargarAlertas(frmHome);
            })
    }

    else {
        Danger("Uno o más valores cambiaron.Por favor realice denuevo el cálculo.")
    }

    
}

function validImportesInputAndImportesTabla() {

    // distribucion = pesos
    if ($("[name='TipoDistribucionPesos']:checked").val() == "True") {

        if (($("#ImporteDistribucionSociosPesos").val() == parseInt($("#TotalDistribucionPesosSocios").attr("data-val"))) &&
            ($("#ImporteDistribucionExSociosPesos").val() == parseInt($("#TotalDistribucionPesosExSocios").attr("data-val")))) {
            return true
        }
        else {
            return false
        }
    }
    else {

        if (((parseInt($("#ImporteDistribucionSociosPesos").val()) == parseInt($("#TotalDistribucionPesosSocios").attr("data-val"))) && 
            ( parseInt($("#ImporteDistribucionExSociosPesos").val()) == parseInt($("#TotalDistribucionPesosExSocios").attr("data-val")))) &&
            (((parseInt($("#ImporteDistribucionSociosDolares").val()) == parseInt($("#TotalDistribucionDolaresSocios").attr("data-val"))) &&
                (parseInt($("#ImporteDistribucionExSociosDolares").val()) == parseInt($("#TotalDistribucionDolaresExSocios").attr("data-val")))))) {
            return true
        }
        else {
            return false
        }
    }
}

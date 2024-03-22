
function GetDataGrillaSocio(idSocio) {
    var data = {
        IdSocio: idSocio,
        Type: $("#" + idSocio).attr("data-type"),
        ImporteGanancias: $("#ImporteGanancias_" + idSocio).attr("data-val"),
        ImporteBienesPersonales: $("#ImporteBienesPersonales_" + idSocio).attr("data-val"),
        ImporteSaldoDDJJBienes: $("#ImporteSaldoDDJJBienes_" + idSocio).attr("data-val"),
        ImporteSaldoDDJJGanancias: $("#ImporteSaldoDDJJGanancias_" + idSocio).attr("data-val"),
        ImporteSaldoDDJJCedular: $("#ImporteSaldoDDJJCedular_" + idSocio).attr("data-val"),
        ImporteImpuestoCedular: $("#ImporteImpuestoCedular_" + idSocio).attr("data-val")

    }
    return data;
}

function ModalEdicionImpuestos(idSocio) {

    ;
    
    $("#dialog").load("/Independiente/ModalEdicionImpuestosSocio", { Data: GetDataGrillaSocio(idSocio)}, function (response, status, xhr) {

        if (status == "success") {
            ;
            $("#dialog").modal('show');
        }
        else {
            CargarAlertas(frmHome);
        }
    })

}

function GuardarEdicionImpuestos() {

    var objData = $("#FormEdicionImpuestosRetenciones").serializeArray();

    if ($("#FormEdicionImpuestosRetenciones").valid()) {
        EditarCamposGrilla(objData, CalculoTotales);
    }
}


function EditarCamposGrilla(objData,callback) {

    var idSocio = objData[0].value;
    var type = objData[1].value;
    var importeGanancias = parseInt(objData[2].value);
    var importeBienesPersonales = parseInt(objData[3].value);
    var importeDDJJBienes = parseInt(objData[4].value);
    var importeDDJJGanancias = parseInt(objData[5].value);
    var importeDDJJCedular = parseInt(objData[6].value);
    var importeImpuestoCedular = parseInt(objData[7].value);
    var totalSocio = importeGanancias + importeBienesPersonales + importeDDJJBienes + importeDDJJGanancias + importeDDJJCedular + importeImpuestoCedular


    //importeGanancias
    $("#ImporteGanancias_" + idSocio).text("$ " + importeGanancias.toLocaleString());
    $("#ImporteGanancias_" + idSocio).attr("data-val", importeGanancias);

    //importeBienesPersonales 
    $("#ImporteBienesPersonales_" + idSocio).text("$ " + importeBienesPersonales.toLocaleString());
    $("#ImporteBienesPersonales_" + idSocio).attr("data-val", importeBienesPersonales);

    //importeDDJJBienes
    $("#ImporteSaldoDDJJBienes_" + idSocio).text("$ " + importeDDJJBienes.toLocaleString());
    $("#ImporteSaldoDDJJBienes_" + idSocio).attr("data-val", importeDDJJBienes);

    //importeDDJJGanancias
    $("#ImporteSaldoDDJJGanancias_" + idSocio).text("$ " + importeDDJJGanancias.toLocaleString());
    $("#ImporteSaldoDDJJGanancias_" + idSocio).attr("data-val", importeDDJJGanancias);

    //importeDDJJCedular
    $("#ImporteSaldoDDJJCedular_" + idSocio).text("$ " + importeDDJJCedular.toLocaleString());
    $("#ImporteSaldoDDJJCedular_" + idSocio).attr("data-val", importeDDJJCedular);

    //importeImpuestoCedular
    $("#ImporteImpuestoCedular_" + idSocio).text("$ " + importeImpuestoCedular.toLocaleString());
    $("#ImporteImpuestoCedular_" + idSocio).attr("data-val", importeImpuestoCedular);

    //totalSocio
    $("#ImporteTotal_" + idSocio).text("$ " + totalSocio.toLocaleString());
    $("#ImporteTotal_" + idSocio).attr("data-val", totalSocio);

    callback(type, CalcularSumaTotales)

}

function CalculoTotales(type,callback) {

    var totalImpuestosGanancias = 0;
    var totalBienesPersonales = 0;
    var totalDDJJBienes = 0;
    var totalDDJJGanancias = 0;
    var totalDDJJImpuestoCedular = 0;
    var totalImpuestoCedular = 0;
    var total = 0


    $("#ImpuestosEstimadosBorradorTable tbody tr[data-type='" + type + "'] ").find("div[id^='ImporteGanancias_']").each(function (i, val) {
       
        totalImpuestosGanancias = parseInt($("#" + val.id).attr("data-val")) + totalImpuestosGanancias;

    })

    $("#ImpuestosEstimadosBorradorTable tbody tr[data-type='" + type + "'] ").find("div[id^='ImporteBienesPersonales_']").each(function (i, val) {
    
        totalBienesPersonales = parseInt($("#" + val.id).attr("data-val")) + totalBienesPersonales;

    })

    $("#ImpuestosEstimadosBorradorTable tbody tr[data-type='" + type + "'] ").find("div[id^='ImporteSaldoDDJJBienes_']").each(function (i, val) {

        totalDDJJBienes = parseInt($("#" + val.id).attr("data-val")) + totalDDJJBienes;

    })

    $("#ImpuestosEstimadosBorradorTable tbody tr[data-type='" + type + "'] ").find("div[id^='ImporteSaldoDDJJGanancias_']").each(function (i, val) {
   
        totalDDJJGanancias = parseInt($("#" + val.id).attr("data-val")) + totalDDJJGanancias;

    })

    $("#ImpuestosEstimadosBorradorTable tbody tr[data-type='" + type + "'] ").find("div[id^='ImporteSaldoDDJJCedular_']").each(function (i, val) {
    
        totalDDJJImpuestoCedular = parseInt($("#" + val.id).attr("data-val")) + totalDDJJImpuestoCedular;

    })

    $("#ImpuestosEstimadosBorradorTable tbody tr[data-type='" + type + "'] ").find("div[id^='ImporteImpuestoCedular_']").each(function (i, val) {
     
        totalImpuestoCedular = parseInt($("#" + val.id).attr("data-val")) + totalImpuestoCedular;

    })

    $("#ImpuestosEstimadosBorradorTable tbody tr[data-type='" + type + "'] ").find("div[id^='ImporteTotal_']").each(function (i, val) {

        total = parseInt($("#" + val.id).attr("data-val")) + total;

    })


    if (type == "Socio") {
        $("#Importe_TotalAnticiposImpuestosGananciasSocios").attr("data-val", totalImpuestosGanancias);
        $("#Importe_TotalAnticiposImpuestosGananciasSocios").text("$ " + totalImpuestosGanancias.toLocaleString());

        $("#Importe_TotalAnticiposBienesPersonalesSocios").attr("data-val", totalBienesPersonales);
        $("#Importe_TotalAnticiposBienesPersonalesSocios").text("$ " + totalBienesPersonales.toLocaleString());

        $("#Importe_TotalSaldoDDJJBienesPersonalesSocios").attr("data-val", totalDDJJBienes);
        $("#Importe_TotalSaldoDDJJBienesPersonalesSocios").text("$ " + totalDDJJBienes.toLocaleString());

        $("#Importe_TotalSaldoDDJJGananciasSocios").attr("data-val", totalDDJJGanancias);
        $("#Importe_TotalSaldoDDJJGananciasSocios").text("$ " + totalDDJJGanancias.toLocaleString());

        $("#Importe_TotalSaldoDDJJImpuestoCedularSocios").attr("data-val", totalDDJJImpuestoCedular);
        $("#Importe_TotalSaldoDDJJImpuestoCedularSocios").text("$ " + totalDDJJImpuestoCedular.toLocaleString());

        $("#Importe_TotalImpuestoCedularSocios").attr("data-val", totalImpuestoCedular);
        $("#Importe_TotalImpuestoCedularSocios").text("$ " + totalImpuestoCedular.toLocaleString());

        $("#Importe_TotalSocios").attr("data-val", total);
        $("#Importe_TotalSocios").text("$ " + total.toLocaleString());

    }
    else {
        $("#Importe_TotalAnticiposImpuestosGananciasExSocios").attr("data-val", totalImpuestosGanancias);
        $("#Importe_TotalAnticiposImpuestosGananciasExSocios").text("$ " + totalImpuestosGanancias.toLocaleString());

        $("#Importe_TotalAnticiposBienesPersonalesExSocios").attr("data-val", totalBienesPersonales);
        $("#Importe_TotalAnticiposBienesPersonalesExSocios").text("$ " + totalBienesPersonales.toLocaleString());

        $("#Importe_TotalSaldoDDJJBienesPersonalesExSocios").attr("data-val", totalDDJJBienes);
        $("#Importe_TotalSaldoDDJJBienesPersonalesExSocios").text("$ " + totalDDJJBienes.toLocaleString());

        $("#Importe_TotalSaldoDDJJGananciasExSocios").attr("data-val", totalDDJJGanancias);
        $("#Importe_TotalSaldoDDJJGananciasExSocios").text("$ " + totalDDJJGanancias.toLocaleString());

        $("#Importe_TotalSaldoDDJJImpuestoCedularExSocios").attr("data-val", totalDDJJImpuestoCedular);
        $("#Importe_TotalSaldoDDJJImpuestoCedularExSocios").text("$ " + totalDDJJImpuestoCedular.toLocaleString());

        $("#Importe_TotalImpuestoCedularExSocios").attr("data-val", totalImpuestoCedular);
        $("#Importe_TotalImpuestoCedularExSocios").text("$ " + totalImpuestoCedular.toLocaleString());

        $("#Importe_TotalExSocios").attr("data-val", total);
        $("#Importe_TotalExSocios").text("$ " + total.toLocaleString());
    }

    callback();

}

function CalcularSumaTotales() {


    var SumaTotalAnticiposImpuestosGanancias = parseInt($("#Importe_TotalAnticiposImpuestosGananciasSocios").attr("data-val")) + parseInt($("#Importe_TotalAnticiposImpuestosGananciasExSocios").attr("data-val"));
    var SumaTotalAnticiposBienesPersonales = parseInt($("#Importe_TotalAnticiposBienesPersonalesSocios").attr("data-val")) + parseInt($("#Importe_TotalAnticiposBienesPersonalesExSocios").attr("data-val"));
    var SumaTotalSaldoDDJJBienesPersonales = parseInt($("#Importe_TotalSaldoDDJJBienesPersonalesSocios").attr("data-val")) + parseInt($("#Importe_TotalSaldoDDJJBienesPersonalesExSocios").attr("data-val"));
    var SumaTotalSaldoDDJJGanancias = parseInt($("#Importe_TotalSaldoDDJJGananciasSocios").attr("data-val")) + parseInt($("#Importe_TotalSaldoDDJJGananciasExSocios").attr("data-val"));
    var SumaTotalSaldoDDJJImpuestoCedular = parseInt($("#Importe_TotalSaldoDDJJImpuestoCedularSocios").attr("data-val")) + parseInt($("#Importe_TotalSaldoDDJJImpuestoCedularExSocios").attr("data-val"));
    var SumaTotalImpuestoCedular = parseInt($("#Importe_TotalImpuestoCedularSocios").attr("data-val")) + parseInt($("#Importe_TotalImpuestoCedularExSocios").attr("data-val"));
    var ImporteSumaTotal = parseInt($("#Importe_TotalSocios").attr("data-val")) + parseInt($("#Importe_TotalExSocios").attr("data-val"));
    
  

    $("#SumaTotalAnticiposImpuestosGanancias").text("$ " + SumaTotalAnticiposImpuestosGanancias.toLocaleString())
    $("#SumaTotalAnticiposBienesPersonales").text("$ " + SumaTotalAnticiposBienesPersonales.toLocaleString())
    $("#SumaTotalSaldoDDJJBienesPersonales").text("$ " + SumaTotalSaldoDDJJBienesPersonales.toLocaleString())
    $("#SumaTotalSaldoDDJJGanancias").text("$ " + SumaTotalSaldoDDJJGanancias.toLocaleString())
    $("#SumaTotalSaldoDDJJImpuestoCedular").text("$ " + SumaTotalSaldoDDJJImpuestoCedular.toLocaleString())
    $("#SumaTotalImpuestoCedular").text("$ " + SumaTotalImpuestoCedular.toLocaleString())
    $("#ImporteSumaTotal").text("$ " + ImporteSumaTotal.toLocaleString())

    $("#dialog").modal('hide');

    Success("Se modificó correctamente los valores de Impuestos del Socio/ExSocio: ");
}


function ObjPersona() {

    var p = {
        IdPersona: null,
        ImporteGanancias: null,
        ImporteBienesPersonales: null,
        ImporteSaldoDDJJBienes: null,
        ImporteSaldoDDJJGanancias: null,
        ImporteSaldoDDJJCedular: null,
        ImporteImpuestoCedular: null,
        Total:null
    }

    return p;
}

function GetDataSociosExSocios(type) {
    var arr = [];


    $("#ImpuestosEstimadosBorradorTable tbody tr[data-type='" + type + "']").each(function (i, val) {

        var item = ObjPersona();      

        item.IdPersona = val.id;
        item.ImporteGanancias = $("#ImporteGanancias_" + val.id).attr("data-val");
        item.ImporteBienesPersonales = $("#ImporteBienesPersonales_" + val.id).attr("data-val");
        item.ImporteSaldoDDJJBienes = $("#ImporteSaldoDDJJBienes_" + val.id).attr("data-val");
        item.ImporteSaldoDDJJGanancias = $("#ImporteSaldoDDJJGanancias_" + val.id).attr("data-val");
        item.ImporteSaldoDDJJCedular = $("#ImporteSaldoDDJJCedular_" + val.id).attr("data-val");
        item.ImporteImpuestoCedular = $("#ImporteImpuestoCedular_" + val.id).attr("data-val");
        item.Total = $("#ImporteTotal_" + val.id).attr("data-val");

        arr.push(item)


    })

    return arr;
}


function GuardarBorradorImpuestosEstimados() {

    ;

    var data = {
        Socios: GetDataSociosExSocios('Socio'),
        ExSocios: GetDataSociosExSocios('ExSocio'),
        
    }

    $.post('/Independiente/GuardarBorradorImpuestos', { Data: data })
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


function CargarTabla(datos) {

    ;
    $("#ImpuestosEstimadosBorradorTable tbody").load("/Independiente/CargarDataTablaBorradorImpuestos", { data: datos }, function (response, status, xhr) {
        if (status == "success") {

        }
    });

    
}

function ValidarDatosExcelBorradorImpuestos() {

    $("#btnCargarExcel").prop("disabled", true);
    ;
    if ($("#excelFile")[0].files[0] != null) {

        var formData = new FormData();
        //$("#formImport")[0]
        formData.append('file', $("#excelFile")[0].files[0]);

            $.ajax({
                type: 'POST',
                url: '/Independiente/ValidarDatosExcelBorradorImpuestos',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    CargarAlertas(frmHome);
                    if (data.isEverythingGood) {

                        CargarTabla(data.lista);
                        $("#btnGuardarBorrador").prop("disabled", false)
                    }
                    else {


                    }
                },
                error: function (data) {
                    CargarAlertas(frmHome);
                },
                complete: function (data) {
                    ;
                    //$("#formImport")[0].reset();
                    $(".custom-file-label").html('Seleccionar Archivo');
                    $("#btnCargarExcel").prop("disabled", false);
                }

            });
        }
        else {
            Danger("Debe cargar un archivo.");
            $("#btnCargarExcel").prop("disabled", false);
    }

    }




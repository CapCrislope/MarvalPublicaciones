

function CargarComboMes() {

    new Combo({
        name: "Mes",
        view: "_CargaImpuestosReales",
        actionController: "/Independiente/LlenarComboMesImpuestosRealesCarga",
        cantItems: 1,
    }).createBasicCombo();
}


function ValidarDatosExcelImpuestosReales() {

    $("#btnCargarExcel").prop("disabled", true);
    ;
    if ($("#excelFile")[0].files[0] != null) {

        var formData = new FormData();
       
        formData.append('file', $("#excelFile")[0].files[0]);
        formData.append('Mes', $("#hMes_CargaImpuestosReales").val())

        $.ajax({
            type: 'POST',
            url: '/Independiente/ValidarDatosExcelImpuestosReales',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                CargarAlertas(frmHome);
                if (data.isEverythingGood) {
                    ;
                    drawItemTable(data);
                    $("#btnCargarExcel").prop("disabled", false);
                    $("#btnGuardarImpuestos").prop("disabled", false)
                }
                else {


                }
            },
            error: function (data) {
                CargarAlertas(frmHome);
             
            },
            complete: function (data) {
                ;
                $("#ImpuestosRealesForm")[0].reset();
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

function drawItemTable(data) {
    $("#ImpuestosRealesTable > tbody").empty();
    var html = '';

    html += renderItemsList(data)

    html += '<tr id="totalExSocios" class="table-info">\
                            <td>Total ExSocios</td>\
                            <td><div> $ '+ data.sumBienesPersonalesExSocios.toLocaleString() + '</div></td>\
                            <td><div> $ '+ data.sumSaldoDDJJBienesExSocios.toLocaleString() + '</div></td>\
                            <td><div> $ '+ data.sumGananciasExSocios.toLocaleString() + '</div></td>\
                            <td><div> $ '+ data.sumSaldoDDJJGananciasExSocios.toLocaleString() + '</div></td>\
                            <td><div> $ '+ data.sumImpuestoCedularExSocios.toLocaleString() + '</div></td>\
                            <td><div> $ '+ data.sumSaldoImpuestoCedularExSocios.toLocaleString() + '</div></td>\
                            <td><div> $ '+ data.sumImportesTotalExSocios.toLocaleString() + '</div></td>\
                        </tr>';

    html += '<tr id="total" class="table-info">\
                            <td>Total</td>\
                            <td><div> $ '+ data.sumTotalBienesPersonales.toLocaleString() + '</div></td>\
                            <td><div> $ '+ data.sumTotalSaldoDDJJBienes.toLocaleString() + '</div></td>\
                            <td><div> $ '+ data.sumTotalGanancias.toLocaleString() + '</div>\ </td>\
                            <td><div> $ '+ data.sumTotalDDJJGanancias.toLocaleString() + '</div></td>\
                            <td><div> $ '+ data.sumTotalImpuestoCedular.toLocaleString() + '</div></td>\
                            <td><div> $ '+ data.sumTotalSaldoImpuestoCedular.toLocaleString() + '</div></td>\
                            <td><div> $ '+ data.sumTotalImportesTotal.toLocaleString() + '</div></td>\
                        </tr>';

        $('#ImpuestosRealesTable tbody').append(html);

    
}

function renderItemsList(data) {
    ;
  
    var itemAnterior = false;
    var html = '';

    for (var i = 0; i < data.socios.length; i++) { 

        

        if (itemAnterior == data.socios[i].socioEgreso) {
            
            
 html += ' <tr id="' + data.socios[i].idPersona + '" data-type="socio">\
        <td>'+ data.socios[i].socio + '</td>\
        <td><div id="BienesPersonales_'+ data.socios[i].idPersona + '" data-value="' + data.socios[i].bienesPersonales + '">$ ' + data.socios[i].bienesPersonales .toLocaleString() + '</div></td>\
        <td><div id="DDJJBienesPersonales_'+ data.socios[i].idPersona + '" data-value="' + data.socios[i].saldoDDJJBienes + '">$ ' + data.socios[i].saldoDDJJBienes.toLocaleString() + '</div></td>\
        <td><div id="ImpuestoGanancia_'+ data.socios[i].idPersona + '" data-value="' + data.socios[i].ganancias + '">$ ' + data.socios[i].ganancias.toLocaleString() + '</div></td >\
        <td><div id="DDJJGanancias_'+ data.socios[i].idPersona + '" data-value="' + data.socios[i].saldoDDJJGanancias + '">$ ' + data.socios[i].saldoDDJJGanancias.toLocaleString() + '</div></td>\
        <td><div id="ImpuestoCedular_'+ data.socios[i].idPersona + '" data-value="' + data.socios[i].impuestoCedular + '">$ ' + data.socios[i].impuestoCedular.toLocaleString() + '</div></td>\
        <td><div id="DDJJImpuestoCedular_'+ data.socios[i].idPersona + '" data-value="' + data.socios[i].saldoImpuestoCedular + '">$ ' + data.socios[i].saldoImpuestoCedular.toLocaleString() + '</div></td >\
        <td><div id="ImporteTotal_'+ data.socios[i].idPersona + '" data-value="' + data.socios[i].importeTotal + '">$ ' + data.socios[i].importeTotal.toLocaleString() + '</div></td>\
        </tr>';

            
        }
        else {
            ;
            html += '<tr id="totalSocios" class="table-info">\
                            <td>Total Socios</td>\
                            <td><div> $ '+ data.sumBienesPersonalesSocios.toLocaleString() +'</div></td>\
                            <td><div> $ '+ data.sumSaldoDDJJBienesSocios.toLocaleString() + '</div></td>\
                            <td><div> $ '+ data.sumGananciasSocios.toLocaleString()  + '</div></td>\
                            <td><div> $ '+ data.sumSaldoDDJJGananciasSocios.toLocaleString() + '</div></td>\
                            <td><div> $ '+ data.sumImpuestoCedularSocios.toLocaleString() + '</div></td>\
                            <td><div> $ '+ data.sumSaldoImpuestoCedularSocios.toLocaleString() + '</div></td>\
                            <td><div> $ '+ data.sumImportesTotalSocios.toLocaleString() + '</div></td>\
                        </tr>';


            html += ' <tr id="' + data.socios[i].idPersona + '" data-type="socio">\
        <td>'+ data.socios[i].socio + '</td>\
        <td><div id="BienesPersonales_'+ data.socios[i].idPersona + '" data-value="' + data.socios[i].bienesPersonales + '">$ ' + data.socios[i].bienesPersonales.toLocaleString() + '</div></td>\
        <td><div id="DDJJBienesPersonales_'+ data.socios[i].idPersona + '" data-value="' + data.socios[i].saldoDDJJBienes + '">$ ' + data.socios[i].saldoDDJJBienes.toLocaleString() + '</div></td>\
        <td><div id="ImpuestoGanancia_'+ data.socios[i].idPersona + '" data-value="' + data.socios[i].ganancias + '">$ ' + data.socios[i].ganancias.toLocaleString() + '</div></td>\
        <td><div id="DDJJGanancias_'+ data.socios[i].idPersona + '" data-value="' + data.socios[i].saldoDDJJGanancias + '">$ ' + data.socios[i].saldoDDJJGanancias.toLocaleString() + '</div></td>\
        <td><div id="ImpuestoCedular_'+ data.socios[i].idPersona + '" data-value="' + data.socios[i].impuestoCedular + '">$ ' + data.socios[i].impuestoCedular.toLocaleString() + '</div></td>\
        <td><div id="DDJJImpuestoCedular_'+ data.socios[i].idPersona + '" data-value="' + data.socios[i].saldoImpuestoCedular + '">$ ' + data.socios[i].saldoImpuestoCedular.toLocaleString() + '</div></td >\
        <td><div id="ImporteTotal_'+ data.socios[i].idPersona + '" data-value="' + data.socios[i].importeTotal + '">$ ' + data.socios[i].importeTotal.toLocaleString() + '</div></td>\
         </tr>';
        }

        itemAnterior = data.socios[i].socioEgreso
          

    }

        return html
}

function guardarImpuestosReales() {

    var data = {
        Socios: GetDataSociosExSocios(),
        Mes: $("#hMes_CargaImpuestosReales").val()
    }

    if ($("#ImpuestosRealesForm").valid() && data.Socios.length > 0) {

        $("#btnCargarExcel").prop("disabled", true);

        $.post('/Independiente/GuardarImpuestosReales', { cvm: data })
            .done(function (data) {
                if (data.IsEverythingGood == true) {
                    //CargarMenu();
                    //CargarEstadoProceso();
                }

            })
            .always(function () {
                CargarAlertas(frmHome);
                $("#btnCargarExcel").prop("disabled", false);
            })
    }
    else {
        Danger("La carga del archivo excel y la selección del mes combo son obligatorios para continuar.")
    }
}


function ObjPersona() {

    var p = {
        IdPersona: null,
        Ganancias: null,
        SaldoDDJJGanancias: null,
        BienesPersonales: null,
        SaldoDDJJBienes: null,
        ImpuestoCedular: null,
        SaldoImpuestoCedular: null,
        ImporteTotal: null
    }

    return p;
}

function GetDataSociosExSocios() {
    var arr = [];


    $("#ImpuestosRealesTable tbody tr[data-type='socio']").each(function (i, val) {

        var item = ObjPersona();

        item.IdPersona = val.id;
        item.BienesPersonales = $("#BienesPersonales_" + val.id).attr("data-value");
        item.SaldoDDJJBienes = $("#DDJJBienesPersonales_" + val.id).attr("data-value");
        item.Ganancias = $("#ImpuestoGanancia_" + val.id).attr("data-value");
        item.SaldoDDJJGanancias = $("#DDJJGanancias_" + val.id).attr("data-value");
        item.ImpuestoCedular = $("#ImpuestoCedular_" + val.id).attr("data-value");
        item.SaldoImpuestoCedular = $("#DDJJImpuestoCedular_" + val.id).attr("data-value");
        item.ImporteTotal = $("#ImporteTotal_" + val.id).attr("data-value");
       
        arr.push(item)


    })

    return arr;
}

function CierreImpuestos() {
    ;
    $.post('/Independiente/CierreImpuestos')
        .done(function (data) {
            if (data.IsEverythingGood == true) {
                CargarMenu();
            }
        })
        .always(function () {
            CargarAlertas(frmHome);
        })
}
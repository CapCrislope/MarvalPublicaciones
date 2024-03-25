function ValidarDatosExcel() {

    $("#btnCargarExcel").prop("disabled", true);
    ;
    if ($("#excelFile")[0].files[0] != null) {

        var formData = new FormData();
        //$("#formImport")[0]
        formData.append('file', $("#excelFile")[0].files[0]);

        $.ajax({
            type: 'POST',
            url: '/Independiente/ValidarDatosExcel',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                CargarAlertas(frmHome);
                if (data.isEverythingGood) {
                    loadTable(data.lista);
                    $("#btnCargarExcel").prop("disabled", false)
                }
                else {


                }
            },
            error: function (data) {
                CargarAlertas(frmHome);
            },
            complete: function (data) {
                ;
                $("#formImport")[0].reset();
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

function loadTable(lista) {
    $('#TablaPlanPagosImpuestos').load('/Independiente/PagosImpuestosTable/', { Lista: lista} ,function (response, status, xhr) {
        if (status == "success") {

        }
    });
}

function ObjPersona() {

    var p = {
        IdPersona: null,
        Ganancias_C1: null,
        Ganancias_C2: null,
        Ganancias_C3: null,
        Ganancias_C4: null,
        Ganancias_C5: null,
        SubTotalGanancias: null,
        Bienes_C1: null,
        Bienes_C2: null,
        Bienes_C3: null,
        Bienes_C4: null,
        Bienes_C5: null,
        SubTotalBienes: null,
        Total: null
    }

    return p;
}

function GetDataSociosExSocios() {
    var arr = [];


    $("#planPagosTable tbody tr[data-type='Socio']").each(function (i, val) {

        var item = ObjPersona();

        item.IdPersona = val.id;
        item.Ganancias_C1 = $("#ImporteC1_Ganancias_" + val.id).attr("data-val");
        item.Ganancias_C2 = $("#ImporteC2_Ganancias_" + val.id).attr("data-val");
        item.Ganancias_C3 = $("#ImporteC3_Ganancias_" + val.id).attr("data-val");
        item.Ganancias_C4 = $("#ImporteC4_Ganancias_" + val.id).attr("data-val");
        item.Ganancias_C5 = $("#ImporteC5_Ganancias_" + val.id).attr("data-val");
        item.SubTotalGanancias = $("#SubTotalGanancias_" + val.id).attr("data-val");
        item.Bienes_C1 = $("#ImporteC1_Bienes_" + val.id).attr("data-val");
        item.Bienes_C2 = $("#ImporteC2_Bienes_" + val.id).attr("data-val");
        item.Bienes_C3 = $("#ImporteC3_Bienes_" + val.id).attr("data-val");
        item.Bienes_C4 = $("#ImporteC4_Bienes_" + val.id).attr("data-val");
        item.Bienes_C5 = $("#ImporteC5_Bienes_" + val.id).attr("data-val");
        item.SubTotalBienes = $("#SubTotalBienes_" + val.id).attr("data-val");
        item.Total = $("#ImporteTotal_" + val.id).attr("data-val"); 

        arr.push(item)


    })

    return arr;
}

function GuardarPlanPagoImpuestos() {

    var data = GetDataSociosExSocios();

    if (data.length != 0) {
        $.post('/Independiente/GuardarPlanPagoImpuestos', { Data: data })
            .done(function (data) {
                if (data.IsEverythingGood == true) {
                    // CargarMenu();
                    //CargarEstadoProceso();
                }

            })
            .always(function () {
                CargarAlertas(frmHome);
            })
    }
    else {
        Danger("Debe cargar un archivo excel antes de guardar.")
    }

    
}
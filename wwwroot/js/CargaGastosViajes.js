
function SumImportes(input) {
    ;

    if (input.value == "") {
        $("#" + input.id).val("0")
    }

    $("#TotalSocios").text("Calculando...")
    var total = 0;

    $("[id^= 'Importe_']").each(function (i, val) {

        var importe = $("#" + val.id).val();
        total = total + parseInt(importe)

    })

    $("#TotalSocios").text("$ " + total.toLocaleString())
    return total;
}

function GuardarGastosViajes() {
    ;

    var data = {
        Socios: GetDataSociosImporte(),
        Modo: $("#Modo").val()
    }

    $.post('/RRHH/GuardarGastosViajes', { cvm: data })
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


function GetDataSociosImporte() {

    var arr = [];


    $("#GastosViajesTable tbody tr[data-type='Socio']").each(function (i, val) {

        var item = ObjPersona();

        item.IdPersona = val.id;
        item.Importe = $("#Importe_" + val.id).val();

        arr.push(item)


    })

    return arr;

}



function CargaDataTablaGastosViajes(modo,datos) {

    ;
    $("#GastosViajesTable tbody").load("/RRHH/CargarTablaGastosViajes", { Modo: modo,Lista: datos }, function (response, status, xhr) {
        if (status == "success") {
            $("input[type=number]").politespace();
        }
    });


}

function ValidarDatosExcelGastosViajes() {

    $("#btnCargarExcel").prop("disabled", true);
    ;
    if ($("#excelFile")[0].files[0] != null) {

        var formData = new FormData();
        //$("#formImport")[0]
        formData.append('file', $("#excelFile")[0].files[0]);

        $.ajax({
            type: 'POST',
            url: '/RRHH/ValidarDatosExcelGastosViajes',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                CargarAlertas(frmHome);
                if (data.isEverythingGood) {

                    CargaDataTablaGastosViajes('EXCEL',data.lista);
             
                }

                $("#btnCargarExcel").prop("disabled", false);
                
            },
            error: function (data) {
                CargarAlertas(frmHome);
                $("#btnCargarExcel").prop("disabled", false);
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
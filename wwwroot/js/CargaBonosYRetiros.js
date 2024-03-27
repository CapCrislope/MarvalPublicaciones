
function ValidarDatosExcel() {

    $("#btnCargarExcel").prop("disabled", true);
    ;
    if ($("#excelFile")[0].files[0] != null) {

        var formData = new FormData();
        //$("#formImport")[0]
        formData.append('file', $("#excelFile")[0].files[0]);

        $.ajax({
            type: 'POST',
            url: '/RRHH/ValidarDatosExcel',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                CargarAlertas(frmHome);
                if (data.isEverythingGood) {

                    drawItemTable(data.lista, data.sumBonos, data.sumRetiros);
                    $("#btnGuardarImportes").prop("disabled",false)
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

function drawItemTable(socios,sumBonos,sumRetiros) {
    $("#BonosYRetirosTable > tbody").empty(); 
    var html = '';

    for (var i = 0; i < socios.length; i++) {
        html += ' <tr id="' + socios[i].personaId + '" data-type="Socio">\
        <td>'+ socios[i].socio + '</td>\
        <td><div id="ImporteBono_'+ socios[i].personaId + '" data-value="' + socios[i].bono + '">$ ' + socios[i].bono.toLocaleString() + '</div>\
        </td>\
        <td><div id="ImporteRetiro_'+ socios[i].personaId + '" data-value="' + socios[i].retiro + '">$ ' + socios[i].retiro.toLocaleString() + '</div></td>\
    </tr>';
    }

    html +=  '<tr id="totalBonosRetiros" class="table-info">\
                            <td>Total</td>\
                            <td><div>$ '+ sumBonos.toLocaleString() +'</div>\
                            </td>\
                            <td><div> $ '+ sumRetiros.toLocaleString() +'</div></td>\
                        </tr>'


    $('#BonosYRetirosTable tbody').append(html);

}

function ObjPersona() {

    var p = {
        PersonaId: null,
        Retiro: null,
        Bono: null
    }

    return p;
}



function GetDataSociosYExSocios() {
    var arr = [];
    

    $("#BonosYRetirosTable tbody tr[data-type='Socio']").each(function (i, val) {

        var item = ObjPersona();

        var idPersona = val.id;
        var importeBono = $("#ImporteBono_" + val.id).attr("data-value");
        var importeRetiro = $("#ImporteRetiro_" + val.id).attr("data-value");

        item.PersonaId = idPersona;
        item.Bono = importeBono;
        item.Retiro = importeRetiro;

        arr.push(item)

       
    })

    return arr;
}

function GuardarImportesBonosYRetiros() {

    ;

    var data = GetDataSociosYExSocios();
    var modo = $("#Modo").val();

    $.post('/RRHH/GuardarImporteBonosYRetiros', { Socios: data , Modo: modo})
                .done(function (data) {
                    if (data.IsEverythingGood == true) {
                        CargarMenu();
                        CargarEstadoProceso();
                    }

                })
                .always(function () {
                    CargarAlertas(frmHome);
                })

}
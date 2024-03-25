
var frmCargaImportes = "CargaDeImportes";
//var frmHome = "_Home";

function ComboEjercicio() {

    new Combo({
        name: "Ejercicio",
        view: "_CargaDeImportes",
        actionController: "/Finanzas/LlenarComboEjercicio",
        cantItems: 1,
    }).createBasicCombo();
}


function ModalAgregarSocio() {

    $("#dialog").load("/Finanzas/ModalAgregarSocio", function (response, status, xhr) {

        if (status == "success") {
            ;
            $("#dialog").modal('show');
        }
        else {
            CargarAlertas(frmHome);
        }
    })
}

function BorrarSocio(idSocio) {
    ;
    var type = $("#" + idSocio).attr("data-type");
    var total = 0;
    $('#ImportesSocioTable tbody tr[id="' + idSocio + '"]').remove();


    $("[data-type='" + type + "'][id^= 'Importe_']").each(function (i, val) {

        var importe = $("#" + val.id).val();
        if (importe == "") {
            importe = 0;
        }
        total = total + parseInt(importe)

    })


    if (type == "Socio") {
        $("#TotalSocios").attr("data-val", total);
        $("#TotalSocios").text("$ " + total.toLocaleString());
    }
    else {
        $("#TotalExSocios").attr("data-val", total);
        $("#TotalExSocios").text("$ " + total.toLocaleString());
    }
}

function ComboSocio() {

    new Combo({
        name: "Socio",
        view: "_ModalAgregarSocio",
        actionController: "/Finanzas/LlenarComboSociosYExSocios",
        valueField: "Id",
        labelField: "Descripcion",
        cantItems: 1
    }).createSearchCombo();

}

function AgregarSocio() {
    var idPersona = $("#hSocio_ModalAgregarSocio").val();
    var bForzarSocio = $('#chkForzarSocio').prop('checked');

    if (idPersona != "") {
        if ($("#ImportesSocioTable tbody tr[id=" + idPersona + "]").length == 0) {
            $.post('/Finanzas/AgregarSocio', { IdPersona: idPersona })
                .done(function (data) {
                  if (data.IsEverythingGood == true) {

                      if (bForzarSocio) {
                        data.Socio.SocioEgreso = false;
                      }                    

                      AddRowTable(data.Socio);
                      $("#dialog").modal("hide");
                    }

                })
                .always(function (data) {
                    CargarAlertas(frmCargaImportes);
                });
        }
        else {
            Danger("El Socio/ExSocio ya esta cargado.");

        }
    }
    else {
        Danger("Debe elergir un Socio/ExSocio del combo.")
    }

}


function ValidarDatosExcel() {

    $("#btnCargarExcel").prop("disabled", true);
    ;
    if ($("#excelFile")[0].files[0] != null) {

        var formData = new FormData();
        //$("#formImport")[0]
        formData.append('file', $("#excelFile")[0].files[0]);

        $.ajax({
            type: 'POST',
            url: '/Finanzas/ValidarDatosExcel',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                CargarAlertas(frmHome);
                if (data.isEverythingGood) {
                    $("#CargaDeImportesForm")[0].reset();
                    drawItemTable(data.lista);
                   
                    //$("#btnGuardarImportes").prop("disabled", false)
                }
                else {


                }
            },
            error: function (data) {
                CargarAlertas(frmHome);
            },
            complete: function (data) {
                ;
                $("#CargaDeImportesForm")[0].reset();
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

function drawItemTable(Lista) {
    $("#ImportesSocioTable > tbody").empty();
    $("#ImportesSocioTable > tbody").load("/Finanzas/CargaImportesDesdeExcel", {Lista : Lista}, function (response, status, xhr) {

        if (status == "success") {
        }
        else {
            CargarAlertas(frmHome);
        }
    })
}



function AddRowTable(Usuario) {
    ;
    var ultimoSocio;
    var ultimoExSocio;

    if (!Usuario.SocioEgreso) {
      var nro = $('#ImportesSocioTable').find('tr[data-type=Socio]').last().attr("data-row");
      if (nro == undefined)
        ultimoSocio = 1
      else
        ultimoSocio = parseInt(nro) + 1;
    }
    else {
      var nro = $('#ImportesSocioTable').find('tr[data-type=ExSocio]').last().attr("data-row");
      if (nro == undefined)
        ultimoExSocio = 1
      else
        ultimoExSocio = parseInt(nro) + 1;
    }

    var html = '';

    html += ' <tr id="' + Usuario.PersonaId + '" data-type="' + (!Usuario.SocioEgreso ? "Socio" : "ExSocio") + '" data-row="' + (!Usuario.SocioEgreso ? ultimoSocio : ultimoExSocio)+'">\
        <td>'+ Usuario.Socio + '</td>\
        <td><div>\
        <input class="form-control form-control-sm text-box single-line" data-val="true" data-val-regex="El numero debe ser un entero." data-val-regex-pattern="([0-9][0-9]*)" id="Importe_'+ Usuario.PersonaId + '"onChange=sumByType(this) data-type="' + (!Usuario.SocioEgreso ? "Socio" : "ExSocio")+'" min="0" name="' + (!Usuario.SocioEgreso ? "Socios[" + ultimoSocio + "]" : "ExSocios[" + ultimoExSocio + "]") +'.Importe" type="number" pattern="[0-9]*" data-politespace="" data-politespace-prefix="$ " data-politespace-reverse="" >\
            <span class="field-validation-valid" data-valmsg-for="' + (!Usuario.SocioEgreso ? "Socios[" + ultimoSocio + "]" : "ExSocios[" + ultimoExSocio + "]") +'.Importe" data-valmsg-replace="true"></span>\
             </div>\
        </td>\
        <td style="text-align: right"><button type="button" class="btn btn-light btn-xs ml-1" data-id="' + Usuario.PersonaId + '" onClick="BorrarSocio(\'' + Usuario.PersonaId + '\'); return false;" title="Quitar"> \
            <span class="fa fa-times fa-1" aria-hidden="true"></span> \
            </button></td>\
    </tr>';


    //antes de agregar ver si es socio o ex socio y agregarlo antes del total

    if (!Usuario.SocioEgreso) {
        $('#ImportesSocioTable #totalSocios').before(html);
    }
    else {
        $('#ImportesSocioTable #totalExSocios').before(html);
    }

    $('#CargaDeImportesForm').data('validator', null);
    $.validator.unobtrusive.parse($('#CargaDeImportesForm')); 

    $("#Importe_"+ Usuario.PersonaId).politespace();

}

function GetDataForm() {
    var obj = {
        Modo: $("#Modo").val(),
        Ejercicio: $("#hEjercicio_CargaDeImportes").val(),
        Socios: GetSocios(),
        ExSocios: GetExSocios(),
        //TotalSocios: $("#Importe_TotalSocios").val(),
        //TotalSocios: $("#TotalSocios").data("val"),
        TotalSocios: $("#TotalSocios").attr("data-val"),
        //TotalExSocios: $("#Importe_TotalExSocios").val(),
        //TotalExSocios: $("#TotalExSocios").data("val"),
        TotalExSocios: $("#TotalExSocios").attr("data-val"),
        IdImporteProceso: $("#IdImporteProceso").val()
    }

    return obj;
}

function GuardarImportes() {
    ;

    var data = GetDataForm();
    if ($("#CargaDeImportesForm").valid()) {
        if (ValidImporte(data.Socios) && ValidImporte(data.ExSocios) && data.TotalSocios != "" && data.TotalExSocios != "") {


            $.post('/Finanzas/GuardarImportes', data)
                .done(function (data) {
                    if (data.IsEverythingGood == true) {
                        CargarMenu();
                        //CargarEstadoProceso();
                    }

                })
                .always(function () {
                    CargarAlertas(frmCargaImportes);
                })
        }
        else {
            Danger("Corrobore los importes. Los mismos no pueden ser valores nulos.")
        }
    }
    else {
        Danger("Por favor verifique los datos ingresados.");
    }

}

function ValidImporte(list) {

    if (list.length > 0) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].Importe == "") {
                return false
            }
        }
    }

    return true;

}


function ObjPersona() {

    var p = {
        PersonaId: null,
        Importe: null,
        SocioEgreso: null
    }

    return p;
}

function GetExSocios() {

    var arr = [];

    $("#ImportesSocioTable tbody tr[data-type='ExSocio']").each(function (i, val) {

        var item = ObjPersona();
        var idPersona = val.id;
        var importe = $("#Importe_" + idPersona).val()

        item.PersonaId = idPersona;
        item.Importe = importe;
        item.SocioEgreso = true;
        arr.push(item)


    })

    return arr;

}


function GetSocios() {

    var arr = [];
   

    $("#ImportesSocioTable tbody tr[data-type='Socio']").each(function (i, val) {

        var item = ObjPersona();
        var idPersona = val.id;
        var importe = $("#Importe_" + idPersona).val()

        item.PersonaId = idPersona;
        item.Importe = importe;
        item.SocioEgreso = false;

        arr.push(item)

    })

    return arr;

}

function sumByType(input) {


    // pregunto el tipo
    // cambio el valor en el data
    // del total segun el tipo,sumo
    // hago suma de los dos totales y cambio el general
    
    var total = 0;
    var type = input.dataset.type;

    //$("#TotalExSocios").text("Calculando...")


    if (input.value == "") {
        $("#" + input.id).val("0")
    }

    $("[data-type='" + type + "'][id^= 'Importe_']").each(function (i, val) {

        var importe = $("#" + val.id).val();
        if (importe == "")
            importe = 0;
        total = total + parseInt(importe)

    })


    if (type == "Socio") {
        $("#TotalSocios").attr("data-val", total);
        $("#TotalSocios").text("$ " + total.toLocaleString());
    }
    else {
        $("#TotalExSocios").attr("data-val", total);
        $("#TotalExSocios").text("$ " + total.toLocaleString());
    }


    //var sumTotal = parseInt($("#Importe_TotalAjustes_Socios").attr("data-val")) + parseInt($("#Importe_TotalAjustes_ExSocios").attr("data-val"))

    //$("#SumaAjustes").text("$ " + sumTotal.toLocaleString());



}

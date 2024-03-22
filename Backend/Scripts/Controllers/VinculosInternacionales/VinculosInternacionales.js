var frmVinculosInternacionales = "VinculosInternacionales";
var frmModal = "Modal";
var frmHome = "Home";
$(document).ready(function () {
    IniciarControles();
    CargarAlertas(frmVinculosInternacionales);
})

function IniciarControles() {

    $.fn.dataTable.ext.errMode = 'none';

    $('#TablaVinculosInternacionales').on('error.dt', function (e, settings, techNote, message) {
        CargarAlertas(frmVinculosInternacionales);
    })

    var oTable = $('#TablaVinculosInternacionales').dataTable({
        dom: 'lfrtip',
        order: [[1, "asc"]],
        bProcessing: true,
        sAjaxSource: "/VinculosInternacionales/LlenarJSONGrillaVinculosInternacionales",
        "aoColumns": [
        {
            data: "id",
            visible: false
        },
        {
            data: "Tipo",
            sWidth: "10%"
        },
        {
            data: "title_es",
            sWidth: "15%"
        },
        {
            data: "description_es",
            sWidth: "70%"
        },
        {
            data: "id",
            orderable: false,
            sWidth: "5%",
            sClass: "der",
            render: function (data, type, row)
            {
                return BotoneraGrilla(row);
            }
        }
        ],
        bAutoWidth: false,
        pageLength: 50,
        fnDrawCallback: function (oSettings) {
            FuncionesBotonera(oSettings.sTableId);
        }
    })
}

function BotoneraGrilla(row) {
    var html = '';

    html = html + '\
        <button type="button" class="editDialog btn btn-default btn-xs editar" data-clientid="' + row.id + '" title="Editar"> \
            <span class="glyphicon glyphicon-edit" aria-hidden="true"></span> \
        </button> \
        <button type="button" id="enc' + row.id + '" class="btn btn-default btn-xs eliminar" data-toggle="confirmation" data-placement="left" data-singleton="true" data-on-confirm="EliminarVinculoInternacional" data-title="¿Está seguro?" onclick="SeleccionarID(' + row.id + ');" title="Eliminar"> \
            <span class="glyphicon glyphicon-remove" aria-hidden="true"> \
            </span> \
        </button>'

    return html;
}

function SeleccionarID(id) {
    $("#hId").val(id);
}

function EliminarVinculoInternacional() {
    var id = $("#hId").val();

    $.post("/VinculosInternacionales/EliminarVinculoInternacional/" + id)
      .success(function (data) {

          if (data.IsEverythingGood == true) {
              ReloadTable('TablaVinculosInternacionales', false);
          }
          else if (data.IsRedirect)
          {
              window.location.href = "/Home/Login";
          }

          CargarAlertas(frmVinculosInternacionales);
      });
};

function FuncionesBotonera(tabla) {
    $('.dt-button').removeClass("dt-button");
    $('.dt-buttons').addClass("space1");

    $('[data-toggle=confirmation]').confirmation();

    $('.editDialog').off().on('click', function () {
        var id = $(this).data('clientid');
        $('#dialog').load('/VinculosInternacionales/Editar/' + id, function (response, status, xhr) {

            $('#dialog').modal('show');

        })
        return false;

    })
 
}

function AltaVinculo() {
    ;
    $("#dialog").load("/VinculosInternacionales/Alta", function (response, status, xhr) {
        if (status == "success") {

            $("#dialog").modal('show')
        } else {
            CargarAlertas(frmVinculosInternacionales);
        }
    });
};


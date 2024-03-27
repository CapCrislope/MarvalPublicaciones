var frmUsuarios = "Usuarios";
var frmModal = "Modal";
var frmHome = "Home";
$(document).ready(function () {
    IniciarControles();
    CargarAlertas(frmUsuarios);
})

function IniciarControles() {

    $.fn.dataTable.ext.errMode = 'none';

    $('#TablaUsuarios').on('error.dt', function (e, settings, techNote, message) {
        CargarAlertas(frmUsuarios);
    })

    var oTable = $('#TablaUsuarios').dataTable({
        dom: 'lfrtip',
        order: [[1, "asc"]],
        bProcessing: true,
        sAjaxSource: "/Usuarios/LlenarJSONGrillaUsuarios",
        "aoColumns": [
        {
            data: "idUsuario",
            visible: false
        },
        {
            data: "Email",
            sWidth: "15%"
        },
        {
            data: "Nombre",
            sWidth: "15%"
        },
        {
            data: "Apellido",
            sWidth: "15%"
        },
        {
            data: "Usuario",
            sWidth: "15%"
        },
        {
            data: "idUsuario",
            orderable: false,
            sWidth: "5%",
            sClass: "der",
            render: function (data, type, row) {
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
        <button type="button" class="editDialog btn btn-default btn-xs editar" data-clientid="' + row.idUsuario + '" title="Editar"> \
            <span class="glyphicon glyphicon-edit" aria-hidden="true"></span> \
        </button> \
        <button type="button" id="enc' + row.idUsuario + '" class="btn btn-default btn-xs eliminar" data-toggle="confirmation" data-placement="left" data-singleton="true" data-on-confirm="EliminarUsuarios" data-title="¿Está seguro?" onclick="SeleccionarID(' + row.idUsuario + ');" title="Eliminar"> \
            <span class="glyphicon glyphicon-remove" aria-hidden="true"> \
            </span> \
        </button>'

    return html;
}

function SeleccionarID(id) {
    $("#hidUsuario").val(id);
}

function EliminarUsuarios() {
    var id = $("#hidUsuario").val();

    $.post("/Usuarios/EliminarUsuarios/" + id)
      .success(function (data) {

          if (data.IsEverythingGood == true) {
              ReloadTable('TablaUsuarios', false);
          }
          else if (data.IsRedirect) {
              window.location.href = "/Home/Login";
          }

          CargarAlertas(frmUsuarios);
      });
};

function FuncionesBotonera(tabla) {
    $('.dt-button').removeClass("dt-button");
    $('.dt-buttons').addClass("space1");

    $('[data-toggle=confirmation]').confirmation();

    $('.editDialog').off().on('click', function () {
        ModalUsuario($(this).data("clientid"), function () {
        });
 
        return false;

    })

}

function AltaUsuarios() {

    ModalUsuario(null, function () {
    });


};

function ModalUsuario(idUsuarios, callback) {
    $("#dialog").load("/Usuarios/ModalUsuarios", { idUsuarios: idUsuarios }, function (response, status, xhr) {
        if (status == "success") {
            $("#dialog").modal('show');

            if (callback)
                callback();
        }
        else {
            CargarAlertas(frmUsuarios);
        }
    });
}

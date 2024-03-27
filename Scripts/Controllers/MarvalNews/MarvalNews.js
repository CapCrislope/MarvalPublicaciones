var frmMarvalNews = "MarvalNews";
var frmModal = "Modal";
var frmHome = "Home";
$(document).ready(function () {
    IniciarControles();
    CargarAlertas(frmMarvalNews);
})

function IniciarControles() {

    $.fn.dataTable.ext.errMode = 'none';

    $('#TablaMarvalNews').on('error.dt', function (e, settings, techNote, message) {
        CargarAlertas(frmMarvalNews);
    })

    var oTable = $('#TablaMarvalNews').dataTable({
        dom: 'lfrtip',
        order: [[1, "desc"]],
        bProcessing: true,
        columnDefs: [{ type: 'fecha', targets: 1 }],
        sAjaxSource: "/MarvalNews/LlenarJSONGrillaMarvalNews",
        "aoColumns": [
        {
            data: "id",
            visible: false
        },
        {
            data: "date",
            sWidth: "20%",
            render: function (data, type, row) {
                try {
                    if (row.date != null) {
                        return row.date.substring(0, 10);
                    }
                    else {
                        return "";
                    }
                }
                catch (ex) {
                    return "";
                }
            }
        },
        {
            data: "nro",
            sWidth: "20%"
        },
        {
            data: "title_es",
            sWidth: "45%"
        },
        {
            data: "id",
            orderable: false,
            sWidth: "10%",
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
    if (row.Habilitado == 1) {
        html += '\
        <button type="button" class="habilitadoDialog btn btn-success btn-xs" data-clientid="' + row.id + '" title="Habilitado" value="0"> \
            <span class="glyphicon glyphicon-off" aria-hidden="true"></span> \
        </button>';
    }
    else {
        html += '\
        <button type="button" class="habilitadoDialog btn btn-danger btn-xs" data-clientid="' + row.id + '" title="DesHabilitado" value="1"> \
            <span class="glyphicon glyphicon-off" aria-hidden="true"></span> \
        </button>';
    }

    html = html + '\
        <button type="button" class="editDialog btn btn-default btn-xs editar" data-clientid="' + row.id + '" title="Editar"> \
            <span class="glyphicon glyphicon-edit" aria-hidden="true"></span> \
        </button> \
        <button type="button" id="enc' + row.id + '" class="btn btn-default btn-xs eliminar" data-toggle="confirmation" data-placement="left" data-singleton="true" data-on-confirm="EliminarMarvalNews" data-title="¿Está seguro?" onclick="SeleccionarID(' + row.id + ');" title="Eliminar"> \
            <span class="glyphicon glyphicon-remove" aria-hidden="true"> \
            </span> \
        </button>'

    return html;
}

function SeleccionarID(id) {
    $("#hId").val(id);
}

function EliminarMarvalNews() {
    var id = $("#hId").val();

    $.post("/MarvalNews/EliminarMarvalNews/" + id)
      .success(function (data) {

          if (data.IsEverythingGood == true) {
              ReloadTable('TablaMarvalNews', false);
          }
          else if (data.IsRedirect) {
              window.location.href = "/Home/Login";
          }

          CargarAlertas(frmMarvalNews);
      });
};

function FuncionesBotonera(tabla) {
    $('.dt-button').removeClass("dt-button");
    $('.dt-buttons').addClass("space1");

    $('[data-toggle=confirmation]').confirmation();

    $('.editDialog').off().on('click', function () {
        ModalMarvalNews($(this).data("clientid"), function () {
        });

        return false;

    })

    $('.habilitadoDialog').off().on('click', function () {
        var button = $(this);
        var id = button.data("clientid");
        var habilitado = button.attr("value");

        $.post("/MarvalNews/HabilitarMarvalNews/", { id: id, habilitado: habilitado })
            .success(function (data) {
                if (data.IsEverythingGood == true) {
                    if (habilitado == 1) {
                        button.attr("value", 0);
                        button.removeClass("btn-danger");
                        button.addClass("btn-success");
                    }
                    else {
                        button.attr("value", 1);
                        button.removeClass("btn-success");
                        button.addClass("btn-danger");
                    }
                }
            })
            .always(function () {
                CargarAlertas(frmMarvalNews);
            });

        return false;
    });

}



function AltaMarvalNews() {

    ModalMarvalNews(null, function () {
    });


};

function ModalMarvalNews(idMarvalNews, callback) {
    $("#dialog").load("/MarvalNews/ModalMarvalNews", { idMarvalNews: idMarvalNews }, function (response, status, xhr) {
        if (status == "success") {
            $("#dialog").modal('show');

            if (callback)
                callback();
        }
        else {
            CargarAlertas(frmMarvalNews);
        }
    });
}

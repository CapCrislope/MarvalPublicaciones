var frmProfesional = "Profesional";
var frmModal = "Modal";
var frmCombo = "Combo";

function IniciarTablaProfesional() {
    $.fn.dataTable.ext.errMode = 'none';

    $('#TablaProfesional').on('error.dt', function (e, settings, techNote, message) {
        CargarAlertas(frmProfesional);
    })

    var oTable = $('#TablaProfesional').dataTable({
        dom: 'Blfrtip',
        buttons: [
        {
            extend: 'excelHtml5',
            text: '<span class="iconoExcel" aria-hidden="true" title="Exportar a Excel"></span>',
            className: 'btn btn-default btn-sm btn-imagen space1',
            exportOptions: {
                columns: [0, 1, 2, 3, 4, 6],
                fnCellRender: function (sValue, iColumn, nTr, iDataIndex) {
                    return sValue
                }
            },
        }],
        order: [[0, "asc"]],
        sAjaxSource: "/Profesional/LlenarJSONGrillaProfesional",
        sServerMethod: "POST",
        "aoColumns": [
        {
            data: "view_order",
            sWidth: "5%"
        },
        {
            data: "initials",
            sWidth: "10%"
        },
        {
            data: "first_name",
            sWidth: "25%"
        },
        {
            data: "last_name",
            sWidth: "25%"
        },
        {
            data: "kind",
            sWidth: "25%"
        },
        {
            data: "id",
            sClass: "der",
            orderable: false,
            sWidth: "10%",
            render: function (data, type, full) { return BotoneraGrillaProfesional(full) }
        },
        {
            data: "visible",
            visible: false,
            render: function (data, type, full) { 
                if (data == 1) {
                    return "SI"
                } else {
                    return "NO"
                }
            }
        },
        ],
        bAutoWidth: false,
        pageLength: 50,
        fnDrawCallback: function (oSettings) {
            FuncionesBotoneraGrillaProfesional();
        }
    });
}

function BotoneraGrillaProfesional(full) {
    var html = "";

    if (full.visible == 1)
    {
        html += '\
        <button type="button" class="habilitadoDialog btn btn-success btn-xs" data-clientid="' + full.id + '" title="Habilitado" value="0"> \
            <span class="glyphicon glyphicon-off" aria-hidden="true"></span> \
        </button>';
    }
    else
    {
        html += '\
        <button type="button" class="habilitadoDialog btn btn-danger btn-xs" data-clientid="' + full.id + '" title="DesHabilitado" value="1"> \
            <span class="glyphicon glyphicon-off" aria-hidden="true"></span> \
        </button>';
    }

    html += '\
        <button type="button" class="editDialog btn btn-default btn-xs" data-clientid="' + full.id + '" title="Editar"> \
            <span class="glyphicon glyphicon-edit" aria-hidden="true"></span> \
        </button> \
        <button type="button" id="mat_' + full.id + '" class="btn btn-default btn-xs" data-toggle="confirmation" data-placement="left" data-singleton="true" data-on-confirm="EliminarProfesional" data-title="¿Está seguro?" onclick="SelProfesional(' + full.id + ');"> \
            <span class="glyphicon glyphicon-remove" aria-hidden="true"> \
            </span> \
        </button>'

    return html;
}

function EliminarProfesional() {
    var idProfesional = $("#hIdProfesional").val();

    $.post("/Profesional/EliminarProfesional", { idProfesional: idProfesional })
      .success(function (data) {
          if (data.IsEverythingGood == true) {
              ReloadTable("TablaProfesional", false);
          }
          else if (data.IsRedirect) {
              window.location.href = "/Home/Login";
          }
      })
      .always(function () {
          CargarAlertas(frmProfesional);
      })
};

function SelProfesional(idProfesional) {
    $("#hIdProfesional").val(idProfesional);
};

function FuncionesBotoneraGrillaProfesional() {
    $('[data-toggle=confirmation]').confirmation();

    $('.dt-button').removeClass("dt-button");
    $('.dt-buttons').addClass("space1");

    $(".editDialog").off().on("click", function () {
        ModalProfesional($(this).data("clientid"), function () {
            IniciarCombosModalProfesional
            (
                JSON.parse('[' + $("#hAreasPracticas" + frmModal).val() + ']'),
                JSON.parse('[' + $("#hIdiomas" + frmModal).val() + ']'),
                $("#hRol" + frmModal).val()
            );
        });
    });

    $('.habilitadoDialog').off().on('click', function () {
        ;
        var button = $(this);
        var clientId = button.data("clientid");
        var habilitado = button.attr("value");

        $.post("/Profesional/HabilitarProfesional/", { idProfesional: clientId, habilitado: habilitado })
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
                CargarAlertas(frmProfesional);
            });

        return false;
    });
}

function AltaProfesional()
{
    ModalProfesional(null, function () {
        IniciarCombosModalProfesional();
    });
}

function ModalProfesional(idProfesional, callback)
{
    $("#dialog").load("/Profesional/ModalProfesional", { idProfesional: idProfesional }, function (response, status, xhr) {
        if (status == "success") {
            $("#dialog").modal('show');

            if (callback)
                callback();
        }
        else {
            CargarAlertas(frmProfesional);
        }
    });
}

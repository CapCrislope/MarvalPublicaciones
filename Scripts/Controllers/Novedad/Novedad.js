var frmNovedad = "Novedad";

function IniciarCombosHomeNovedad() {
    new Combo({
        name: "AreasPracticas",
        view: frmNovedad,
        actionController: "/AreaPractica/LlenarAreasPracticas/",
    }).createBasicCombo();

    new Combo({
        name: "Profesionales",
        view: frmNovedad,
        actionController: "/Profesional/LlenarProfesionales/",
    }).createBasicCombo();

    return false;
}

function FiltrosBusquedaNovedad() {
    if ($("#filstrosBusquedaNovedad").hasClass("shown")) {
        $("#filstrosBusquedaNovedad").slideUp(400);
        $("#filstrosBusquedaNovedad").removeClass("shown");
        $("span", $(".desplegableFiltros")).removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
    }
    else {
        $("#filstrosBusquedaNovedad").slideDown(400);
        $("#filstrosBusquedaNovedad").addClass("shown");
        $("span", $(".desplegableFiltros")).removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
    }
}

function LimpiarFormBusquedaNovedad() {
    $("#hAreasPracticas" + frmNovedad).val("");
    $("#hProfesionales" + frmNovedad).val("");
    $('#ddlAreasPracticas' + frmNovedad)[0].selectize.clear();
    $('#ddlProfesionales' + frmNovedad)[0].selectize.clear();
    $("#busqueda_Desde").val("");
    $("#busqueda_Hasta").val("");
}

function BuscarNovedades() {
    if ($("#BusquedaNovedadForm").valid()) {
        ReloadTable("TablaNovedad");
    }
}

function ExportarExcelCompletoNovedades()
{
    if ($("#TablaNovedad td.dataTables_empty").length == 0) {
        $.post("/Novedad/GenerarExcelCompletoNovedades", $("#BusquedaNovedadForm").serialize())
         .success(function (data) {
             if (data.IsEverythingGood == true) {
                 window.location = "/Novedad/ExportarExcelCompleto?token=" + data.Token;
             }
         })
        .always(function () {
            CargarAlertas(frmNovedad);
        })
    }
    else {
        Danger("Debe haber, por lo menos, 1 registro en la grilla.");
    }
}

function IniciarTablaNovedad() {
    $.fn.dataTable.ext.errMode = 'none';

    $('#TablaNovedad').on('error.dt', function (e, settings, techNote, message) {
        CargarAlertas(frmNovedad);
    })

    var oTable = $('#TablaNovedad').dataTable({
        dom: 'Blfrtip',
        buttons: [
            {
                text: '<span class="iconoExcel" aria-hidden="true" title="Exportar a Excel"></span>',
                className: 'btn btn-default btn-sm btn-imagen space1',
                action: function (e, dt, node, config) {
                    ExportarExcelCompletoNovedades();
                }
            }
        ],
        "order": [[ 0, "desc" ]],
        columnDefs: [{ type: 'fecha', targets: 0 }],
        sAjaxSource: "/Novedad/LlenarJSONGrillaNovedad",
        sServerMethod: "POST",
        "aoColumns": [
        {
            data: "date",
            sWidth: "10%",
            mRender: function (data, type, row) {
                ;
                return data || "";
            }
        },
        {
            data: "featured",
            sWidth: "10%",
            mRender: function (data, type, row) {
                return (data == 1) ? "Sí" : "No";
            }
        },
        {
            data: "title_es",
            sWidth: "70%",
        },
        {
            data: "id",
            sWidth: "10%",
            sClass: "der",
            orderable: false,
            sWidth: "10%",
            render: function (data, type, full) { return BotoneraGrillaNovedad(full); }
        }
        ],
        bAutoWidth: false,
        bProcessing: true,
        pageLength: 50,
        language: {
            select: {
                rows: ". %d filas seleccionadas"
            }
        },
        fnDrawCallback: function (oSettings) {
            FuncionesBotoneraGrillaNovedad();
        },
        fnServerData: function (sSource, aoData, fnCallback) {
            $.ajax({
                "dataType": 'json',
                "type": "POST",
                "url": sSource,
                "data": $("#BusquedaNovedadForm").serialize(),
                "success": fnCallback
            })
        }
    });
}

function BotoneraGrillaNovedad(full) {
    var html = "";

    html += '\
        <button type="button" class="habilitadoNovedad btn ' + ((full.Visible) ? 'btn-success' : 'btn-danger') + ' btn-xs space1" clientid="' + full.id + '" value="' + false + '" style="cursor: default">\
            <span class="glyphicon glyphicon-off"></span>\
        </button>\
        <button type="button" class="editDialog btn btn-default btn-xs" data-clientid="' + full.id + '" title="Editar"> \
            <span class="glyphicon glyphicon-edit" aria-hidden="true"></span> \
        </button> \
        <button type="button" id="mat_' + full.id + '" class="btn btn-default btn-xs" data-toggle="confirmation" data-placement="left" data-singleton="true" data-on-confirm="EliminarNovedad" data-title="¿Está seguro?" onclick="SelNovedad(' + full.id + ');"> \
            <span class="glyphicon glyphicon-remove" aria-hidden="true"> \
            </span> \
        </button>'

    return html;
}

function EliminarNovedad() {
    var idNovedad = $("#hIdNovedad").val();

    $.post("/Novedad/EliminarNovedad", { idNovedad: idNovedad })
      .success(function (data) {
          if (data.IsEverythingGood == true) {
              ReloadTable("TablaNovedad", false);
          }
          else if (data.IsRedirect) {
              window.location.href = "/Home/Login";
          }
      })
      .always(function () {
          CargarAlertas(frmNovedad);
      })
};

function SelNovedad(idNovedad) {
    $("#hIdNovedad").val(idNovedad);
};

function AltaNovedad()
{
    ModalNovedad(null, function () {
        IniciarCombosModalNovedad();
    });
}

function FuncionesBotoneraGrillaNovedad() {
    $('[data-toggle=confirmation]').confirmation();

    $('.dt-button').removeClass("dt-button");
    $('.dt-buttons').addClass("space1");

    $(".editDialog").off().on("click", function () {
        ModalNovedad($(this).data("clientid"), function () {
            ;
            IniciarCombosModalNovedad(
                 JSON.parse('[' + $("#hAreasPracticas" + frmModal).val() + ']'),
                 JSON.parse('[' + $("#hProfesionales" + frmModal).val() + ']'),
                 $("#hkind_id" + frmModal).val(),
                 $("#hImagenPosY" + frmModal).val());
        });
    });

    $(".habilitadoNovedad").off().on("click", function () {
        var button = $(this);
        var clientId = button.attr("clientid");
        var value = button.attr("value");

        $.post("/Novedad/HabilitarNovedad/", { idNovedad: clientId, value: value })
            .success(function (data) {
                if (data.IsEverythingGood == true) {
                    if (value == "true") {
                        button.attr("value", false);
                        button.removeClass("btn-danger");
                        button.addClass("btn-success");
                    }
                    else {
                        button.attr("value", true);
                        button.removeClass("btn-success");
                        button.addClass("btn-danger");
                    }
                }

                CargarAlertas(frmNovedad);
            });

        return false;
    }); 
}

function ModalNovedad(idNovedad, callback) {
    $("#dialog").load("/Novedad/ModalNovedad", { idNovedad: idNovedad }, function (response, status, xhr) {
        if (status == "success") {
            $("#dialog").modal('show');

            if (callback)
                callback();
        }
        else
            CargarAlertas(frmNovedad);
    });
}
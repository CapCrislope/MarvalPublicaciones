var frmPublicacionExterna = "PublicacionExterna";
var frmModal = "Modal";
var frmHome = "Home";
var frmCombo = "Combo";

function IniciarCombosHomePublicacionExterna() {
    new Combo({
        name: "AreaPractica",
        view: frmPublicacionExterna,
        actionController: "/AreaPractica/LlenarAreasPracticas/",
    }).createBasicCombo();

    new Combo({
        name: "Autor",
        view: frmPublicacionExterna,
        actionController: "/Profesional/LlenarProfesionales/",
    }).createBasicCombo();

    return false;
}

function FiltrosBusquedaPublicacionExterna() {
    if ($("#filstrosBusquedaPublicacionExterna").hasClass("shown")) {
        $("#filstrosBusquedaPublicacionExterna").slideUp(400);
        $("#filstrosBusquedaPublicacionExterna").removeClass("shown");
        $("span", $(".desplegableFiltros")).removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
    }
    else {
        $("#filstrosBusquedaPublicacionExterna").slideDown(400);
        $("#filstrosBusquedaPublicacionExterna").addClass("shown");
        $("span", $(".desplegableFiltros")).removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
    }
}

function ModalPublicacionExterna(idPublicacionExterna) {
    $("#dialog").load("/PublicacionExterna/ModalPublicacionExterna", { idPublicacionExterna: idPublicacionExterna }, function (response, status, xhr) {
        if (status == "success") {
            $("#dialog").modal('show');
        }
        else
            CargarAlertas(frmPublicacionExterna);
    });
}

function LimpiarFormBusquedaPublicacionExterna() {
    $("#hAreaPractica" + frmPublicacionExterna).val("");
    $("#hAutor" + frmPublicacionExterna).val("");
    $('#ddlAreaPractica' + frmPublicacionExterna)[0].selectize.clear();
    $('#ddlAutor' + frmPublicacionExterna)[0].selectize.clear();
    $("#busqueda_Texto").val("");
    $("#busqueda_FechaDesde").val("");
    $("#busqueda_FechaHasta").val("");
}

function BuscarPublicacionExternas() {
    if ($("#BusquedaPublicacionExternaForm").valid()) {
        ReloadTable("TablaPublicacionExterna");
    }
}

function IniciarTablaPublicacionExterna() {
    $.fn.dataTable.ext.errMode = 'none';

    $('#TablaPublicacionExterna').on('error.dt', function (e, settings, techNote, message) {
        CargarAlertas(frmPublicacionExterna);
    })

    var oTable = $('#TablaPublicacionExterna').dataTable({
        dom: 'Blfrtip',
        buttons: [
            {
                text: '<span class="iconoExcel" aria-hidden="true" title="Exportar a Excel"></span>',
                className: 'btn btn-default btn-sm btn-imagen space1',
                action: function (e, dt, node, config) {
                    ExportarExcelCompletoPublicacionExternas();
                }
            },
        ],
        order: [[2, "desc"]],
        columnDefs: [{ type: 'fecha', targets: 2 }],
        sAjaxSource: "/PublicacionExterna/LlenarJSONGrillaPublicacionExterna",
        sServerMethod: "POST",
        "aoColumns": [
        {
            data: "title_es",
            sWidth: "40%"
        },
        {
            data: "kind",
            sWidth: "35%",
        },
        {
            data: "pub_date",
            sWidth: "15%",
            render: function (data, type, full) { return full.pub_date || ""; }
        },
        {
            data: "id",
            sWidth: "10%",
            sClass: "der",
            orderable: false,
            sWidth: "10%",
            render: function (data, type, full) { return BotoneraGrillaPublicacionExterna(full); }
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
            FuncionesBotoneraGrillaPublicacionExterna();
        },
        fnServerData: function (sSource, aoData, fnCallback) {
            $.ajax({
                "dataType": 'json',
                "type": "POST",
                "url": sSource,
                "data": $("#BusquedaPublicacionExternaForm").serialize(),
                "success": fnCallback
            })
        }
    });
}

function ExportarExcelCompletoPublicacionExternas() {
    if ($("#TablaPublicacionExterna td.dataTables_empty").length == 0) {
        $.post("/PublicacionExterna/GenerarExcelCompletoPublicacionExternas", $("#BusquedaPublicacionExternaForm").serialize())
         .success(function (data) {
             if (data.IsEverythingGood == true) {
                 window.location = "/PublicacionExterna/ExportarExcelCompleto?token=" + data.Token;
             }
         })
        .always(function () {
            CargarAlertas(frmPublicacionExterna);
        })
    }
    else
    {
        Danger("Debe haber, por lo menos, 1 registro en la grilla.");
    }
}

function BotoneraGrillaPublicacionExterna(full) {
    var html = "";

    if (full.visible == 1) {
        html += '\
        <button type="button" class="habilitadoDialog btn btn-success btn-xs" data-clientid="' + full.id + '" title="Habilitado" value="0"> \
            <span class="glyphicon glyphicon-off" aria-hidden="true"></span> \
        </button>';
    }
    else {
        html += '\
        <button type="button" class="habilitadoDialog btn btn-danger btn-xs" data-clientid="' + full.id + '" title="DesHabilitado" value="1"> \
            <span class="glyphicon glyphicon-off" aria-hidden="true"></span> \
        </button>';
    }

    html += '\
        <button type="button" class="editDialog btn btn-default btn-xs" data-clientid="' + full.id + '" title="Editar"> \
            <span class="glyphicon glyphicon-edit" aria-hidden="true"></span> \
        </button> \
        <button type="button" id="mat_' + full.id + '" class="btn btn-default btn-xs" data-toggle="confirmation" data-placement="left" data-singleton="true" data-on-confirm="EliminarPublicacionExterna" data-title="¿Está seguro?" onclick="SelPublicacionExterna(' + full.id + ');"> \
            <span class="glyphicon glyphicon-remove" aria-hidden="true"> \
            </span> \
        </button>'

    return html;
}

function EliminarPublicacionExterna() {
    var idPublicacionExterna = $("#hIdPublicacionExterna").val();

    $.post("/PublicacionExterna/EliminarPublicacionExterna", { idPublicacionExterna: idPublicacionExterna })
      .success(function (data) {
          if (data.IsEverythingGood == true) {
              ReloadTable("TablaPublicacionExterna", false);
          }
          else if (data.IsRedirect) {
              window.location.href = "/Home/Login";
          }
      })
      .always(function () {
          CargarAlertas(frmPublicacionExterna);
      })
};

function SelPublicacionExterna(idPublicacionExterna) {
    $("#hIdPublicacionExterna").val(idPublicacionExterna);
};

function FuncionesBotoneraGrillaPublicacionExterna() {
    $('[data-toggle=confirmation]').confirmation();

    $('.dt-button').removeClass("dt-button");
    $('.dt-buttons').addClass("space1");

    $(".editDialog").off().on("click", function () {
        ModalPublicacionExterna($(this).data("clientid"), function () {
            ;
            IniciarCombosModalPublicacionExterna(JSON.parse('[' + $("#hAreasPracticas" + frmModal).val() + ']'), JSON.parse('[' + $("#hAutores" + frmModal).val() + ']'), $("#hTipo" + frmModal).val());
        });
    });

    $('.habilitadoDialog').off().on('click', function () {
        var button = $(this);
        var clientId = button.data("clientid");
        var habilitado = button.attr("value");

        $.post("/PublicacionExterna/HabilitarPublicacionExterna/", { idPublicacionExterna: clientId, habilitado: habilitado })
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
                CargarAlertas(frmPublicacionExterna);
            });

        return false;
    });
}

function AltaPublicacionExterna() {
    ModalPublicacionExterna(null, function () {
        IniciarCombosModalPublicacionExterna();
    });
}

function ModalPublicacionExterna(idPublicacionExterna, callback) {
    $("#dialog").load("/PublicacionExterna/ModalPublicacionExterna", { idPublicacionExterna: idPublicacionExterna }, function (response, status, xhr) {
        if (status == "success") {
            $("#dialog").modal('show');

            if (callback)
                callback();
        }
        else {
            CargarAlertas(frmPublicacionExterna);
        }
    });
}
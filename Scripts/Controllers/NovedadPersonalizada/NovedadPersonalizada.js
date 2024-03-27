var frmNovedadPersonalizada = "NovedadPersonalizada";
var frmModal = "Modal";
var frmHome = "Home";
var frmCombo = "Combo";

function IniciarCombosHomeNovedadPersonalizada() {
    new Combo({
        name: "AreaPractica",
        view: frmNovedadPersonalizada,
        actionController: "/AreaPractica/LlenarAreasPracticas/",
    }).createBasicCombo();

    new Combo({
        name: "Autor",
        view: frmNovedadPersonalizada,
        actionController: "/Profesional/LlenarProfesionales/",
    }).createBasicCombo();

    return false;
}

function FiltrosBusquedaNovedadPersonalizada() {
    if ($("#filtrosBusquedaNovedadPersonalizada").hasClass("shown")) {
        $("#filtrosBusquedaNovedadPersonalizada").slideUp(400);
        $("#filtrosBusquedaNovedadPersonalizada").removeClass("shown");
        $("span", $(".desplegableFiltros")).removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
    }
    else {
        $("#filtrosBusquedaNovedadPersonalizada").slideDown(400);
        $("#filtrosBusquedaNovedadPersonalizada").addClass("shown");
        $("span", $(".desplegableFiltros")).removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
    }
}

function ModalNovedadPersonalizada(idNovedadPersonalizada) {
    $("#dialog").load("/NovedadPersonalizada/ModalNovedadPersonalizada", { idNovedadPersonalizada: idNovedadPersonalizada }, function (response, status, xhr) {
        if (status == "success") {
            $("#dialog").modal('show');
        }
        else
            CargarAlertas(frmNovedadPersonalizada);
    });
}

function LimpiarFormBusquedaNovedadPersonalizada() {
    $("#hAreaPractica" + frmNovedadPersonalizada).val("");
    $("#hAutor" + frmNovedadPersonalizada).val("");
    $('#ddlAreaPractica' + frmNovedadPersonalizada)[0].selectize.clear();
    $('#ddlAutor' + frmNovedadPersonalizada)[0].selectize.clear();
    $("#busqueda_Texto").val("");
    $("#busqueda_FechaDesde").val("");
    $("#busqueda_FechaHasta").val("");
}

function BuscarNovedadPersonalizada() {
    if ($("#BusquedaNovedadPersonalizadaForm").valid()) {
        ReloadTable("TablaNovedadPersonalizada");
    }
}

function IniciarTablaNovedadPersonalizada() {
    $.fn.dataTable.ext.errMode = 'none';

    $('#TablaNovedadPersonalizada').on('error.dt', function (e, settings, techNote, message) {
        CargarAlertas(frmNovedadPersonalizada);
    })

    var oTable = $('#TablaNovedadPersonalizada').dataTable({
        dom: 'Blfrtip',
        buttons: [
            {
                text: '<span class="iconoExcel" aria-hidden="true" title="Exportar a Excel"></span>',
                className: 'btn btn-default btn-sm btn-imagen space1',
                action: function (e, dt, node, config) {
                    ExportarExcelCompletoNovedadPersonalizadas();
                }
            },
        ],
        order: [[2, "desc"]],
        columnDefs: [{ type: 'fecha', targets: 2 }],
        sAjaxSource: "/NovedadPersonalizada/LlenarJSONGrillaNovedadPersonalizada",
        sServerMethod: "POST",
        "aoColumns": [
        {
            data: "title_es",
            sWidth: "25%"
        },
        {
            data: "header_es",
            sWidth: "25%",
        },
        {
            data: "date",
            sWidth: "15%",
            render: function (data, type, full) { return full.date || ""; }
        },
        {
            data: "link_es",
            sWidth: "25%"
        },
        {
            data: "id",
            sWidth: "10%",
            sClass: "der",
            orderable: false,
            sWidth: "10%",
            render: function (data, type, full) { return BotoneraGrillaNovedadPersonalizada(full); }
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
            FuncionesBotoneraGrillaNovedadPersonalizada();
        },
        fnServerData: function (sSource, aoData, fnCallback) {
            $.ajax({
                "dataType": 'json',
                "type": "POST",
                "url": sSource,
                "data": $("#BusquedaNovedadPersonalizadaForm").serialize(),
                "success": fnCallback
            })
        }
    });
}

function ExportarExcelCompletoNovedadPersonalizadas() {
    if ($("#TablaNovedadPersonalizada td.dataTables_empty").length == 0) {
        $.post("/NovedadPersonalizada/GenerarExcelCompletoNovedadPersonalizadas", $("#BusquedaNovedadPersonalizadaForm").serialize())
         .success(function (data) {
             if (data.IsEverythingGood == true) {
                 window.location = "/NovedadPersonalizada/ExportarExcelCompleto?token=" + data.Token;
             }
         })
        .always(function () {
            CargarAlertas(frmNovedadPersonalizada);
        })
    }
    else {
        Danger("Debe haber, por lo menos, 1 registro en la grilla.");
    }
}

function BotoneraGrillaNovedadPersonalizada(full) {
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
        <button type="button" id="mat_' + full.id + '" class="btn btn-default btn-xs" data-toggle="confirmation" data-placement="left" data-singleton="true" data-on-confirm="EliminarNovedadPersonalizada" data-title="¿Está seguro?" onclick="SelNovedadPersonalizada(' + full.id + ');"> \
            <span class="glyphicon glyphicon-remove" aria-hidden="true"> \
            </span> \
        </button>'

    return html;
}

function EliminarNovedadPersonalizada() {
    var idNovedadPersonalizada = $("#hIdNovedadPersonalizada").val();

    $.post("/NovedadPersonalizada/EliminarNovedadPersonalizada", { idNovedadPersonalizada: idNovedadPersonalizada })
      .success(function (data) {
          if (data.IsEverythingGood == true) {
              ReloadTable("TablaNovedadPersonalizada", false);
          }
          else if (data.IsRedirect) {
              window.location.href = "/Home/Login";
          }
      })
      .always(function () {
          CargarAlertas(frmNovedadPersonalizada);
      })
};

function SelNovedadPersonalizada(idNovedadPersonalizada) {
    $("#hIdNovedadPersonalizada").val(idNovedadPersonalizada);
};

function FuncionesBotoneraGrillaNovedadPersonalizada() {
    $('[data-toggle=confirmation]').confirmation();

    $('.dt-button').removeClass("dt-button");
    $('.dt-buttons').addClass("space1");

    $(".editDialog").off().on("click", function () {
        
        
        ModalNovedadPersonalizada($(this).data("clientid"), function () {
            IniciarCombosModalNovedadPersonalizada(JSON.parse('[' + $("#hAreasPracticas" + frmModal).val() + ']'), JSON.parse('[' + $("#hAutores" + frmModal).val() + ']'));

            if ($("#novedadPersonalizada_colorFuente").val() != "")
                SetColorByHidden();
            else
                SetColorByInput();


        });

        
    });

    $('.habilitadoDialog').off().on('click', function () {
        var button = $(this);
        var clientId = button.data("clientid");
        var habilitado = button.attr("value");

        $.post("/NovedadPersonalizada/HabilitarNovedadPersonalizada/", { idNovedadPersonalizada: clientId, habilitado: habilitado })
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
                CargarAlertas(frmNovedadPersonalizada);
            });

        return false;
    });
}

function AltaNovedadPersonalizada() {
    ModalNovedadPersonalizada(null, function () {
        IniciarCombosModalNovedadPersonalizada();

        SetColorByInput();
    });
}

function ModalNovedadPersonalizada(idNovedadPersonalizada, callback) {
    $("#dialog").load("/NovedadPersonalizada/ModalNovedadPersonalizada", { idNovedadPersonalizada: idNovedadPersonalizada }, function (response, status, xhr) {
        if (status == "success") {
            $("#dialog").modal('show');

            if (callback)
                callback();
        }
        else {
            CargarAlertas(frmNovedadPersonalizada);
        }
    });
}

function SetColorByInput() {
    $("#novedadPersonalizada_colorFuente").val($("#inputColor").val());
}

function SetColorByHidden() {
    ;
    $("#inputColor").val($("#novedadPersonalizada_colorFuente").val());
}
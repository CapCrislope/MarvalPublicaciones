var frmCV = "CV";
var frmModal = "Modal";
var frmCombo = "Combo";

function FiltrosBusquedaCV() {
    if ($("#filstrosBusquedaCV").hasClass("shown")) {
        $("#filstrosBusquedaCV").slideUp(400);
        $("#filstrosBusquedaCV").removeClass("shown");
        $("span", $(".desplegableFiltros")).removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
    }
    else {
        $("#filstrosBusquedaCV").slideDown(400);
        $("#filstrosBusquedaCV").addClass("shown");
        $("span", $(".desplegableFiltros")).removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
    }
}

function LimpiarFormBusquedaCV() {
    $("#busqueda_Apellido").val("");
    $("#busqueda_Dni").val("");
    $("#busqueda_FechaDesde").val("");
    $("#busqueda_FechaHasta").val("");
}

function BuscarCVs() {
    if ($("#BusquedaCVForm").valid()) {
        ReloadTable("TablaCV");
    }
}

function GenerarComprimidoPDF()
{
    if ($("#TablaCV .dataTables_empty").length == 0) {
        $("#btnExportarPDFs").button('loading');
        $("#btnExportarPDFs").parents('a').addClass("disabled");

        $.post("/CV/GenerarComprimidoPDF/", $("#BusquedaCVForm").serialize())
            .success(function (data) {
                if (data.IsEverythingGood) {
                    window.location = "/CV/ExportarComprimidoPDF?nombreComprimido=" + data.ComprimidoNombre;
                }
                else {
                    CargarAlertas(frmCV);
                }
            })
            .fail(function () { CargarAlertas(frmCV); })
            .always(function (data) {
                $("#btnExportarPDFs").button('reset');
                $("#btnExportarPDFs").parents('a').removeClass("disabled");
            });
    }
    else
    {
        Danger("Debe haber, por lo menos, 1 registro en la grilla.");
    }
}

function ExportarExcelCompletoCSV()
{
    if ($("#TablaCV td.dataTables_empty").length == 0) {
        $("#btnExportarCSVs").button('loading');
        $("#btnExportarCSVs").parents('a').addClass("disabled");

        $.post("/CV/GenerarExcelCompletoCSV", $("#BusquedaCVForm").serialize())
         .success(function (data) {
             if (data.IsEverythingGood == true) {
                 window.location = "/CV/ExportarExcelCompleto?token=" + data.Token;
             }
             else {
                 CargarAlertas(frmCV);
             }
         })
        .fail(function () { CargarAlertas(frmCV); })
        .always(function () {
            $("#btnExportarCSVs").button('reset');
            $("#btnExportarCSVs").parents('a').removeClass("disabled");
        })
    }
    else {
        Danger("Debe haber, por lo menos, 1 registro en la grilla.");
    }
}

function IniciarTablaCV() {
    $.fn.dataTable.ext.errMode = 'none';

    $('#TablaCV').on('error.dt', function (e, settings, techNote, message) {
        CargarAlertas(frmCV);
    })

    var oTable = $('#TablaCV').dataTable({
        dom: 'Blfrtip',
        buttons: [
            {
                text: '<span id="btnExportarCSVs" data-loading-text="<i class=\'glyphicon glyphicon-repeat fa-spin\'></i> Procesando" aria-hidden="true">Exportar CSV</span>',
                className: 'btn btn-default btn-sm space1',
                action: function (e, dt, node, config) {
                    ExportarExcelCompletoCSV();
                }
            },
            {
                text: '<span id="btnExportarPDFs" data-loading-text="<i class=\'glyphicon glyphicon-repeat fa-spin\'></i> Procesando" aria-hidden="true">Exportar PDFs</span>',
                className: 'btn btn-default btn-sm space1',
                action: function (e, dt, node, config) {
                    GenerarComprimidoPDF();
                }
            }
        ],
        "order": [[0, "desc"]],
        columnDefs: [{ type: 'fecha', targets: 0 }],
        sAjaxSource: "/CV/LlenarJSONGrillaCV",
        sServerMethod: "POST",
        "aoColumns": [
        {
            data: "date",
            sWidth: "10%"
        },
        {
            data: "dni",
            sWidth: "10%",
        },
        {
            data: "first_name",
            sWidth: "35%",
        },
        {
            data: "last_name",
            sWidth: "35%",
        },
        {
            data: "id",
            sWidth: "10%",
            sClass: "der",
            orderable: false,
            sWidth: "10%",
            render: function (data, type, full) { return BotoneraGrillaCV(full); }
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
            FuncionesBotoneraGrillaCV();
        },
        fnServerData: function (sSource, aoData, fnCallback) {
            $.ajax({
                "dataType": 'json',
                "type": "POST",
                "url": sSource,
                "data": $("#BusquedaCVForm").serialize(),
                "success": fnCallback
            })
        }
    });
}

function BotoneraGrillaCV(full) {
    var html = "";

    html += '\
        <a href="javascript: ExportarPDF(' + full.id + ');" > \
			<button type="button" class="btn btn-default btn-imagen-xs" title="Exportar PDF"> \
				<span class="iconoPdf"></span> \
			</button></a>\
        <button type="button" class="editDialog btn btn-default btn-xs" data-clientid="' + full.id + '" title="Editar"> \
            <span class="glyphicon glyphicon-edit" aria-hidden="true"></span> \
        </button> \
        <button type="button" id="mat_' + full.id + '" class="btn btn-default btn-xs" data-toggle="confirmation" data-placement="left" data-singleton="true" data-on-confirm="EliminarCV" data-title="¿Está seguro?" onclick="SelCV(' + full.id + ');"> \
            <span class="glyphicon glyphicon-remove" aria-hidden="true"> \
            </span> \
        </button>'

    return html;
}

function EliminarCV() {
    var idCV = $("#hIdCV").val();

    $.post("/CV/EliminarCV", { idCV: idCV })
      .success(function (data) {
          if (data.IsEverythingGood == true) {
              ReloadTable("TablaCV", false);
          }
          else if (data.IsRedirect) {
              window.location.href = "/Home/Login";
          }
      })
      .always(function () {
          CargarAlertas(frmCV);
      })
};

function SelCV(idCV) {
    $("#hIdCV").val(idCV);
};

function FuncionesBotoneraGrillaCV() {
    $('[data-toggle=confirmation]').confirmation();

    $('.dt-button').removeClass("dt-button");
    $('.dt-buttons').addClass("space1");

    $(".editDialog").off().on("click", function () {
        //0: Indica que abrimos el modal en con la primera tab activa.
        DialogModalCVBase($(this).data("clientid"), 0);
    });
}

function AltaCV() {
    var idCV = undefined;
    var nroTab = 0;

    DialogModalCVBase(idCV, nroTab, function () { $("#tabCV > ul.nav-tabs > li:not(.obligatorio)").addClass("disabled"); });
}

function DialogModalCVBase(idCV, tab, callback) {
    var _tab = tab || 0;

    $("#dialog").load("/DialogBases/ModalCV.html", function (response, status, xhr) {
        if (status == "success") {
            $("#hidCVBase").val(idCV);
            $("#tabCV > ul.nav-tabs > li > a")[_tab].click();

            if (callback)
                callback();

            $("#dialog").modal('show');
        }
        else
            CargarAlertas(frmCV);
    })
}

function ExportarPDF(idCV)
{
    $.post("/CV/ExportarPDF/", { idCV: idCV })
    .success(function (data) {
        if (data.IsEverythingGood) {
            window.open(data.RutaPDF, '_blank');
        }
        else {
            CargarAlertas(frmModal);
        }
    })
    .error(function (data) {
        CargarAlertas(frmModal);
    })
}

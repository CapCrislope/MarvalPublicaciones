var frmReg = "Registraciones";

function MostrarPnlBusquedaRegistraciones() {
    $("#pnlContainerBusqueda").slideToggle(500, function () {
        var btn = $(".desplegableFiltros > span");

        if (btn.hasClass("glyphicon-chevron-down")) {
            btn.removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
        } else {
            btn.removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
        }
    });
}

function IniciarPnlBusqueda() {
    $("#pnlBusqueda").load("/Registraciones/Busqueda", function (response, status, xhr) {

    })
}

function IniciarTablaRegistraciones() {
    $.fn.dataTable.ext.errMode = 'none';

    $("#Tabla" + frmReg).on('error.dt', function (e, settings, techNote, message) {
        CargarAlertas(frmReg)
    });

    var oTable = $("#Tabla" + frmReg).dataTable({
        dom: "Blfrtip",
        buttons: [
            {
                //aqui el boton de excel
                text: '<span class="iconoExcel" aria-hidden="true" title="Exportar a Excel"></span>',
                className: 'btn btn-default btn-sm btn-imagen space1',
                action: function (e, dt, node, config) {
                    return GetExcelRegistrosTemplate();
                }
            }
        ],
        order: [[0, "desc"]],
        columnDefs: [{ type: 'fecha', targets: 0 }],
        "aoColumns": [
            {
                data: "FechaAlta",
                sWidth: "25%"
            },
            {
                data: "Email",
                sWidth: "40%"
            },
            {
                data: "FechaEdicion",
                sWidth: "25%"
            },
            {
                data: "DobleCheck",
                sWidth: "10%",
                render: function (data, type, full) {
                    if (data)
                        return "SI";
                    else
                        return "NO";
                }
            }
        ],
        sAjaxSource: "/Registraciones/LlenarJSONGrilla",
        bProccessing: true,
        bAutoWidth: false,
        pageLength: 25,
        sServerMetodh: "POST",
        fnServerData: function (sSource, aoData, fnCallback) {
            //peticion AJAX
            $.ajax({
                type: 'POST',
                typeData: 'json',
                url: sSource,
                data: $("#frmBusquedaRegistraciones").serialize(),
                success: fnCallback
            })
        }

    });
}

function LimpiarFormBusquedaRegistraciones() {
    $("#FechaDesde, #FechaHasta").val("");
}

function BuscarRegistraciones() {
    ReloadTable("Tabla" + frmReg);
}

function GetExcelRegistrosTemplate() {
    if ($("#TablaRegistraciones td.dataTables_empty").length == 0) {
        $.post("/Registraciones/GetExcelRegistrosTemplate", $("#frmBusquedaRegistraciones").serialize())
        .success(function (data) {
            if (data.IsEverythingGood) {
                //Get excel generado
                window.location = "/Registraciones/ExportarExcelCompleto?token=" + data.Token;
            }
        })
        .always(function () {
            CargarAlertas(frmReg)
        });
    } else {
        Danger("La Exportación Debe Contener Al Menos 1 Registro");
    }
    
}
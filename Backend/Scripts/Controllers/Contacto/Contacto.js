function FiltrosBusquedaContacto() {
    if ($("#filtrosBusquedaContacto").hasClass("shown")) {
        $("#filtrosBusquedaContacto").slideUp(400);
        $("#filtrosBusquedaContacto").removeClass("shown");
        $("span", $(".desplegableFiltros")).removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
    }
    else {
        $("#filtrosBusquedaContacto").slideDown(400);
        $("#filtrosBusquedaContacto").addClass("shown");
        $("span", $(".desplegableFiltros")).removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
    }
}

function LimpiarFormBusquedaContacto() {
    $("#busqueda_FechaDesde").val("");
    $("#busqueda_FechaHasta").val("");
}

function BuscarContacto() {
    ReloadTable("TablaContacto");   
}

function IniciarTablaContacto() {
    $.fn.dataTable.ext.errMode = 'none';

    $('#TablaContacto').on('error.dt', function (e, settings, techNote, message) {
        CargarAlertas(frmContacto);
    })

    var oTable = $('#TablaContacto').dataTable({
        dom: 'Blfrtip',
        buttons: [
            {
                text: '<span class="iconoExcel" aria-hidden="true" title="Exportar a Excel"></span>',
                className: 'btn btn-default btn-sm btn-imagen space1',
                action: function (e, dt, node, config) {
                    ExportarExcelCompletoContactos();
                }
            },
        ],
        columnDefs: [{ type: 'fecha', targets: 0 }],
        order: [[0, "desc"]],
        sAjaxSource: "/Contacto/LlenarJSONGrillaContacto",
        sServerMethod: "POST",
        "aoColumns": [
        {
            data: "FechaAlta",
            sWidth: "10%"
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
            data: "Email",
            sWidth: "25%"
        },
        {
            data: "Telefono",
            sWidth: "15%"
        },
        {
            data: "Cargo",
            sWidth: "10%"
        },
        {
            data: "Empresa",
            sWidth: "10%"
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
        fnServerData: function (sSource, aoData, fnCallback) {
            $.ajax({
                "dataType": 'json',
                "type": "POST",
                "url": sSource,
                "data": $("#BusquedaContactoForm").serialize(),
                "success": fnCallback
            })
        },
        initComplete: function()
        {
            ;
            $('.dt-button').removeClass("dt-button");
            $('.dt-buttons').addClass("space1");
        }
    });
}

function ExportarExcelCompletoContactos() {
    if ($("#TablaContacto td.dataTables_empty").length == 0) {
        $.post("/Contacto/GenerarExcelCompletoContactos", $("#BusquedaContactoForm").serialize())
         .success(function (data) {
             if (data.IsEverythingGood == true) {
                 window.location = "/Contacto/ExportarExcelCompleto?token=" + data.Token;
             }
         })
        .always(function () {
            CargarAlertas(frmContacto);
        })
    }
    else {
        Danger("Debe haber, por lo menos, 1 registro en la grilla.");
    }
}
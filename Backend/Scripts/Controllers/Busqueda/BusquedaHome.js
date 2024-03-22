var frmBusquedas = "Busquedas";

function IniciarPnlBusquedaBusquedas() {

    $("#pnlBusqueda").load("/Busquedas/Busqueda", function (response, status, xhr) {

    })

}

function IniciarTablaBusquedas() {
    $.fn.dataTable.ext.errMode = 'none';

    $("#Tabla" + frmBusquedas).on('error.dt', function (e, settings, techNote, message) {
        CargarAlertas(frmBusquedas)
    });

    var oTable = $("#Tabla" + frmBusquedas).dataTable({
        dom: "Blfrtip",
        buttons: [
            {
                //aqui el boton de excel
                text: '<span class="iconoExcel" aria-hidden="true" title="Exportar a Excel"></span>',
                className: 'btn btn-default btn-sm btn-imagen space1',
                action: function (e, dt, node, config) {
                    return GetExcelBusquedas();
                }
            }
        ],
        order: [[0, "desc"]],
        columnDefs: [{ type: 'fecha', targets: 0 }],
        "aoColumns": [
            {
                data: "FechaAlta",
                sWidth: "15%"
            },
            {
                data: "Email",
                sWidth: "25%"
            },
            {
                data: "Pais",
                sWidth: "20%"
            },{
                data: "Ip",
                sWidth:"10%"
            },
            
            {
                data: "Texto",
                sWidth: "30%"
            }
        
        ],
        sAjaxSource: "/Busquedas/LlenarJSONGrilla",
        bProccessing: true,
        bAutoWidth: false,
        pageLength: 100,
        fnDrawCallback: function () {
            return EventHandlerBotonesGrillaBusquedas();
        },
        sServerMetodh: "POST",
        fnServerData: function (sSource, aoData, fnCallback) {
            //peticion AJAX
            $.ajax({
                type: 'POST',
                typeData: 'json',
                url: sSource,
                data: $("#frmBusquedaBusquedas").serialize(),
                success: fnCallback
            })
        }

    });
}

function EventHandlerBotonesGrillaBusquedas() {
    //le saco la clase dt... al btn de Excel porque rompe el diseño.
    $(".dt-button").removeClass("dt-button");
}


function GetExcelBusquedas() {
    if ($("#TablaBusquedas td.dataTables_empty").length == 0) {
        $.post("/Busquedas/GetExcelBusquedas", $("#frmBusquedaBusquedas").serialize())
        .success(function (data) {
            if (data.IsEverythingGood) {
                //Get excel generado
                window.location = "/Busquedas/ExportarExcelCompleto?token=" + data.Token;
            }
        })
        .always(function () {
            CargarAlertas(frmBusquedas);
        });
    } else {
        Danger("La Exportación Debe Contener Al Menos 1 Registro");
    }

}
var frmShare = "Shares";

function IniciarPnlBusquedaShares() {

    $("#pnlBusqueda").load("/Shares/Busqueda", function (response, status, xhr) {

    })

}

function IniciarTablaShares() {
    $.fn.dataTable.ext.errMode = 'none';

    $("#Tabla" + frmShare).on('error.dt', function (e, settings, techNote, message) {
        CargarAlertas(frmShare)
    });

    var oTable = $("#Tabla" + frmShare).dataTable({
        dom: "Blfrti",
        buttons: [
            {
                //aqui el boton de excel
                text: '<span class="iconoExcel" aria-hidden="true" title="Exportar a Excel"></span>',
                className: 'btn btn-default btn-sm btn-imagen space1',
                action: function (e, dt, node, config) {
                    return GetExcelShares();
                }
            }
        ],
        order: [[0, "desc"]],
        columnDefs: [{ type: 'fecha', targets: 0 }],
        "aoColumns": [
            {
                data: "Fecha",
                sWidth: "10%"
            },
            {
                data: "Tipo",
                sWidth: "10%"
            },
            {
                data: "Areas",
                sWidth: "15%"
            },
            {
                data: "Titulo",
                sWidth: "15%"
            },
            {
                data: "Emisor",
                sWidth: "15%"
            },
            {
                data: "Receptor",
                sWidth: "15%"
            },
            {
                data: "Comentario",
                sWidth: "15%"
            },
            {
                //Funcion de renderizado para los botones
                sWidth: "5%",
                sClass: "der",
                orderable: false,
                render: function (data, type, full) { return RenderBotoneraGrillaShares(full); }
            }
        ],
        sAjaxSource: "/Shares/LlenarJSONGrilla",
        bProccessing: true,
        bAutoWidth: false,
        pageLength: 25,
        fnDrawCallback: function(){
            return EventHandlerBotonesGrillaShares();
        },
        sServerMetodh: "POST",
        fnServerData: function (sSource, aoData, fnCallback) {
            //peticion AJAX
            $.ajax({
                type: 'POST',
                typeData: 'json',
                url: sSource,
                data: $("#frmBusquedaShares").serialize(),
                success: fnCallback
            })
        }

    });
}

function RenderBotoneraGrillaShares(full) {
    var html = "";

    //btn Eliminar
    html += '<button type="button" id="enc' + full.Id + '" class="btnEliminar btn btn-default btn-xs" data-IdShares=' + full.Id + ' data-toggle="confirmation">\
                <span class="glyphicon glyphicon-remove"></span>\
            </button>';

    return html;
}
function EventHandlerBotonesGrillaShares() {
    //le saco la clase dt... al btn de Excel porque rompe el diseño.
    $(".dt-button").removeClass("dt-button");


    $('[data-toggle="confirmation"').confirmation({
        singleton: true,
        placement: 'left',
        title: 'Eliminar',
        btnOkLabel: "Si",
        btnCancelLabel: "No",
        onConfirm: function () {
            return borrarRegistroShares($(this).attr("data-IdShares"))
        }
    })
}

function borrarRegistroShares(id) {
    $.post("/Shares/DeleteById", { id: id })
    .success(function (data) {
        if (data.IsEverythingGood) {

            ReloadTable("Tabla" + frmShare, false);
        } else if (data.IsRedirect) {
            window.location.href = "/Home/Login";
        }
    })
    .always(function () {
        CargarAlertas(frmShare);
    })
}

function GetExcelShares() {
    if ($("#TablaShares td.dataTables_empty").length == 0) {
        $.post("/Shares/GetExcelShares", $("#frmBusquedaShares").serialize())
        .success(function (data) {
            if (data.IsEverythingGood) {
                //Get excel generado
                window.location = "/Shares/ExportarExcelCompleto?token=" + data.Token;
            }
        })
        .always(function () {
            CargarAlertas(frmShare);
        });
    } else {
        Danger("La Exportación Debe Contener Al Menos 1 Registro");
    }

}
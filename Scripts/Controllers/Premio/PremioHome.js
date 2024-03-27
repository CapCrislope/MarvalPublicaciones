var frmPremio = "Premios";

function IniciarTablaPremio() {
    $.fn.dataTable.ext.errMode = 'none';

    $("#TablaPremio").on('error.dt', function (e, settings, techNote, message) {
        CargarAlertas(frmPremio)
    });

    var oTable = $("#TablaPremio").dataTable({
        dom: 'Blfrtip',
        buttons: [
            {
                text: '<span class="iconoExcel" aria-hidden="true" title="Exportar a Excel"></span>',
                className: 'btn btn-default btn-sm btn-imagen space1',
                action: function (e, dt, node, config) {
                    GenerarExcelCompletoPremio();
                }
            }
        ],
        sAjaxSource: "/Premio/LlenarJSONGrilla",
        sServerMethod: "POST",
        "order": [[0, "asc"], [2, "desc"]],
        //columnDefs: [{ type: 'Year', targets: 2 }],
        "aoColumns": [
            {
                data: "Order",
                sWidth: "5%"
            },
            {
                data: "Title_Es",
                sWidth: "40%"
            },
            {
                data: "Year",
                sWidth: "5%"
            },
            {
                data: "Areas", //crear combo aqui (ver si es necesario)
                sWidth: "40%"
            },
            {
                data: null,
                sWidth: "10%", //aqui column para botones de editar, eliminar y setear visible
                orderable: false,
                sClass: "der",
                render: function (data, type, full) { return renderBotonesPremio(full); }
            }
        ],
        bAutoWidth: false,
        bProcessing: true,
        pageLength: 25,
        fnServerData: function (sSource, aoData, fnCallback) {
            $.ajax({
                "dataType": 'json',
                "type": "POST",
                "url": sSource,
                "data": $("#frmBusquedaPremio").serialize(),
                "success": fnCallback
            });
        },
        fnDrawCallback: function () {
            return eventHandlerBotonesGrillaPremio();
        }
    });
}

//funciones para el dataTable
function eventHandlerBotonesGrillaPremio() {
    //le saco la clase dt... al btn de Excel porque rompe el diseño.
    $(".dt-button").removeClass("dt-button");

    //Cambiar estado visible o no Visible
    $(".btnVisible").on('click', function () {
        var btn = $(this);

        //conectar a la db para setear el flag "visible" a 1 o 0 segun corresponda
        $.ajax({
            'type': 'POST',
            'dataType': 'json',
            'url': '/Premio/SetVisible',
            'data': { id: btn.data("idpremio"), state: (btn.val() === '1') ? '0' : '1' }
        })
        .success(function () {
            //Si todo fue ok cambiamos el valor en la view
            if (btn.val() === '1') {

                //setear a false
                btn.val(0);

                //cambiar clase a danger
                btn.removeClass("btn-success").addClass("btn-danger");
            } else {
                btn.val(1);

                btn.removeClass("btn-danger").addClass("btn-success");
            };
        })
        .always(function () {
            //enviar notificacion Pnotify indicando la sucesion del evento (si fue ok o no)
            CargarAlertas(frmPremio);
        });
    });

    $(".btnEditar").on('click', function () {
        CargarModalPremio($(this).attr("data-IdPremio"));
    });

    //seteamos el popover del btnEliminar
    $('[data-toggle="confirmation"]').confirmation({
        singleton: true,
        placement: 'left',
        title: 'Eliminar',
        btnOkLabel: "Si",
        btnCancelLabel: "No",
        onConfirm: function () {
            return borrarRegistroPremio($(this).data("idpremio"));
        }
    });
}
function GenerarExcelCompletoPremio() {
    //valido que la tabla posea al menos un registro
    if ($("#TablaPremio td.dataTables_empty").length == 0) {
        $.post("/Premio/GenerarExcelCompletoPremio", $("#frmBusquedaPremio").serialize())
        .success(function (data) {
            if (data.IsEverythingGood) {
                window.location = "/Premio/ExportarExcelCompleto?token=" + data.Token;
            }
        })
        .always(function () {
            CargarAlertas(frmPremio);
        })
    } else {
        Danger("La Exportación Debe Contener Al Menos 1 Registro");
    }
}
function renderBotonesPremio(full) {
    html = '';


    //boton de visible o no visible
    html += '<button type="button" class="btnVisible btn ' + ((full.Visible === 1) ? 'btn-success' : 'btn-danger') + ' btn-xs space1" data-IdPremio=' + full.Id + ' value="' + full.Visible + '">\
                <span class="glyphicon glyphicon-off"></span>\
            </button>';


    //boton de editar
    html += '<button type="button" class="btnEditar btn btn-default btn-xs space1" data-IdPremio=' + full.Id + '>\
                <span class="glyphicon glyphicon-edit"></span>\
            </button>';

    //boton de borrar
    html += '<button type="button" id="enc' + full.Id + '" class="btnEliminar btn btn-default btn-xs" data-IdPremio=' + full.Id + ' data-toggle="confirmation">\
                <span class="glyphicon glyphicon-remove"></span>\
            </button>';


    return html;
}
function borrarRegistroPremio(id) {
    $.ajax({
        'dataType': 'json',
        'type': 'POST',
        'url': '/Premio/EliminarPremioById',
        'data': { id: id }
    })
   .done(function (data) {
       if (data.IsEverythingGood) {
           ReloadTable("TablaPremio", false);
       } else if (data.IsRedirect) {
           window.location.href = "/Home/Login";
       }
   })
   .always(function () {
       CargarAlertas(frmPremio);
   });
}

//funciones para la busqueda
function CargarPnlBusquedaPremio() {
    $("#pnlBusqueda").load("/Premio/Busqueda", function (response, status, xhr) {
        if (status == "success") {

        } else {
            CargarAlertas(frmReconocimientos);
        }
    });
}
function MostrarPnlBusquedaPremio() {
    $("#pnlContainerBusqueda").slideToggle(500, function () {
        var btn = $(".desplegableFiltros > span");

        if (btn.hasClass("glyphicon-chevron-down")) {
            btn.removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
        } else {
            btn.removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
        }
    });
}
function AltaPremio() {
    CargarModalPremio("");
}
function CargarModalPremio(id) {
    $("#dialog").load("/Premio/Modal", { id: id }, function (response, status, xhr) {
        //succes y carga de alertas.
        if (status == "success") {
            $("#dialog").modal('show');
        }
    })
}
var frmSusc = "Suscripciones";

function MostrarPnlBusquedaSuscripciones() {
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
    $("#pnlBusqueda").load("/Suscripciones/Busqueda", function (response, status, xhr) {

    })
}


function IniciarTablaSuscripciones() {
    $.fn.dataTable.ext.errMode = 'none';

    $("#Tabla" + frmSusc).on('error.dt', function (e, settings, techNote, message) {
        CargarAlertas(frmSusc)
    });

    var oTable = $("#Tabla" + frmSusc).dataTable({
        dom: "Blfrti",
        buttons: [
            {
                //aqui el boton de excel
                text: '<span class="iconoExcel" aria-hidden="true" title="Exportar a Excel"></span>',
                className: 'btn btn-default btn-sm btn-imagen space1',
                action: function (e, dt, node, config) {
                    return GetExcelContactsTemplate();
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
                data: "Area",
                sWidth: "30%"
            },
            {
                //Funcion de renderizado para los botones
                sWidth: "5%",
                sClass: "der",
                orderable: false,
                render: function (data, type, full) { return RenderBotoneraGrillaSuscripciones(full); }
            }
        ],
        sAjaxSource: "/Suscripciones/LlenarJSONGrilla",
        bProccessing: true,
        bAutoWidth: false,
        pageLength: 25,
        fnDrawCallback: function(){
            return EventHandlerBotonesGrillaSuscripciones();
        },
        sServerMetodh: "POST",
        fnServerData: function (sSource, aoData, fnCallback) {
            //peticion AJAX
            $.ajax({
                type: 'POST',
                typeData: 'json',
                url: sSource,
                data: $("#frmBusquedaSuscripcion").serialize(),
                success: fnCallback
            })
        }

    });
}

function RenderBotoneraGrillaSuscripciones(full) {
    var html = "";

    //btn Eliminar
    html += '<button type="button" id="enc' + full.Id + '" class="btnEliminar btn btn-default btn-xs" data-IdSuscripcion=' + full.Id + ' data-toggle="confirmation">\
                <span class="glyphicon glyphicon-remove"></span>\
            </button>';

    return html;
}

function EventHandlerBotonesGrillaSuscripciones() {
    //le saco la clase dt... al btn de Excel porque rompe el diseño.
    $(".dt-button").removeClass("dt-button");


    $('[data-toggle="confirmation"').confirmation({
        singleton: true,
        placement: 'left',
        title: 'Eliminar',
        btnOkLabel: "Si",
        btnCancelLabel: "No",
        onConfirm: function () {
            return borrarRegistroSuscripcion($(this).attr("data-IdSuscripcion"))
        }
    })
}


function LimpiarFormBusquedaSuscripcion() {
    $("#FechaDesde, #FechaHasta").val("");
}

function BuscarSuscripcion() {
    ReloadTable("Tabla" + frmSusc);
}

function borrarRegistroSuscripcion(id) {
    $.post("/Suscripciones/DeleteById", { id: id })
    .success(function (data) {
        if (data.IsEverythingGood) {
            ReloadTable("Tabla" + frmSusc, false);
        } else if (data.IsRedirect) {
            window.location.href = "/Home/Login";
        }
    })
    .always(function () {
        CargarAlertas(frmSusc);
    })
}

function GetExcelContactsTemplate() {
    if ($("#TablaSuscripciones td.dataTables_empty").length == 0) {
        $.post("/Suscripciones/GetExcelContactsTemplate", $("#frmBusquedaSuscripcion").serialize())
        .success(function (data) {
            if (data.IsEverythingGood) {
                //Get excel generado
                window.location = "/Suscripciones/ExportarExcelCompleto?token=" + data.Token;
            }
        })
        .always(function () {
            CargarAlertas(frmSusc)
        });
    } else {
        Danger("La Exportación Debe Contener Al Menos 1 Registro");
    }
    
}
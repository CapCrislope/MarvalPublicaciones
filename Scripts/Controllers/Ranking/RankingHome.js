var frmReconocimientos = "Reconocimientos";

function IniciarTablaRanking() {
    ;

    $.fn.dataTable.ext.errMode = 'none';

    $("#TablaRanking").on('error.dt', function (e, settings, techNote, message) {
        CargarAlertas(frmReconocimientos)
    });


    var oTable = $("#TablaRanking").dataTable({
        dom: 'Blfrtip',
        buttons: [
           {
               text: '<span class="iconoExcel" aria-hidden="true" title="Exportar a Excel"></span>',
               className: 'btn btn-default btn-sm btn-imagen space1',
               action: function (e, dt, node, config) {
                   GenerarExcelCompletoRanking();
               }
           },
        ],
        "order": [[0, "asc"], [2, "desc"]],
        //columnDefs: [
        //    { type: 'Order', targets: 0},
        //    { type: 'Year', targets: 2 }
        //],
        sAjaxSource: "/Ranking/LlenarJSONGrilla",
        sServerMethod: "POST",
        "aoColumns": [
            {
                data: "Order",
                sWidth: "5%"
            },
            {
                data: "Title",
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
                render: function(data, type, full){ return renderBotones(full);}
            }
        ],
        bAutoWidth: false,
        bProcessing: true,
        pageLength: 25,
        //ver si es necesario cambiar de metodo de conexion
        fnServerData: function (sSource, aoData, fnCallback) {
            //solicitud ajax
            $.ajax({
                "dataType": 'json',
                "type": "POST",
                "url": sSource,
                "data": $("#formBusquedaRanking").serialize(),
                "success": fnCallback
            });
        },
        fnDrawCallback: function () {
            return eventHandlerBotonesGrilla();
        }
    });
}

function renderBotones(full) {

    html = '';


    //boton de visible o no visible
    html += '<button type="button" class="btnVisible btn '+ ((full.Visible === 1)? 'btn-success' : 'btn-danger') +' btn-xs space1" data-IdReconocimiento=' + full.Id +' value="'+ full.Visible +'">\
                <span class="glyphicon glyphicon-off"></span>\
            </button>';


    //boton de editar
    html += '<button type="button" class="btnEditar btn btn-default btn-xs space1" data-IdReconocimiento=' + full.Id + '>\
                <span class="glyphicon glyphicon-edit"></span>\
            </button>';

    //boton de borrar
    html += '<button type="button" id="enc'+ full.Id +'" class="btnEliminar btn btn-default btn-xs" data-IdReconocimiento=' + full.Id + ' data-toggle="confirmation">\
                <span class="glyphicon glyphicon-remove"></span>\
            </button>';


    return html;
}

function eventHandlerBotonesGrilla() {
    //le saco la clase dt... al btn de Excel porque rompe el diseño.
    $(".dt-button").removeClass("dt-button");

    //Cambiar estado visible o no Visible
    $(".btnVisible").on('click', function () {
        var btn = $(this);

        //conectar a la db para setear el flag "visible" a 1 o 0 segun corresponda
        $.ajax({
            'type': 'POST',
            'dataType': 'json',
            'url': '/Ranking/SetVisible',
            'data': { id: btn.data("idreconocimiento"), state: (btn.val() === '1') ? '0' : '1' }
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
            CargarAlertas(frmReconocimientos);
        });
    });

    $(".btnEditar").on('click', function () {        
        CargarModalRanking($(this).attr("data-IdReconocimiento"));
    });

    //seteamos el popover del btnEliminar
    $('[data-toggle="confirmation"]').confirmation({
        singleton: true,
        placement: 'left',
        title: 'Eliminar',
        btnOkLabel: "Si",
        btnCancelLabel: "No",
        onConfirm: function () {
            return borrarRegistro($(this).data("idreconocimiento"));
        }
    });
}
 
function borrarRegistro(id) {
    $.ajax({
        'dataType': 'json',
        'type': 'POST',
        'url': '/Ranking/EliminarRankingById',
        'data': {id: id}
    })
    .done(function (data) {
        if (data.IsEverythingGood) {
            ReloadTable("TablaRanking", false);
        } else if (data.IsRedirect) {
            window.location.href = "/Home/Login";
        }
    })
    .always(function () {
        CargarAlertas(frmReconocimientos);
    });
}

function AltaRanking() {
    CargarModalRanking("");
}

function CargarPnlBusqueda() {
    $("#pnlBusqueda").load("/Ranking/Busqueda", function (response,status,xhr) {
        if (status == "success") {

        } else {
            CargarAlertas(frmReconocimientos);
        }
    });
}

function MostrarPnlBusqueda() {
    $("#pnlContainerBusqueda").slideToggle(500, function () {

        var btn = $(".desplegableFiltros > span");

        if(btn.hasClass("glyphicon-chevron-down")){
            btn.removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
        }else{
            btn.removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
        }

    });
}

function CargarModalRanking(id) {
    $("#dialog").load("/Ranking/Modal", {id: id}, function (response,status, xhr) {
        //succes y carga de alertas.
        if (status == "success") {
            $("#dialog").modal('show');
        }
    })
}

function GenerarExcelCompletoRanking() {
    if($("#TablaRanking td.dataTables_empty").length == 0){
        $.post("/Ranking/GenerarExcelCompletoRanking", $("#formBusquedaRanking").serialize())
        .success(function (data) {
            if (data.IsEverythingGood) {
                window.location = "/Ranking/ExportarExcelCompleto?token=" + data.Token;
            }
        })
        .always(function () {
            CargarAlertas(frmReconocimientos);
        })
    } else {
        Danger("Debe haber, por lo menos, 1 registro en la grilla.");
    }
    
}
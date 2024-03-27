var frmNews = "Newsletters";

function IniciarTablaNewsletters() {
    //manejo de errores aqui
    $.fn.dataTable.ext.errMode = 'none';

    $("#Tabla" + frmNews).on('error.dt', function (e, settings, techNote, message) {
        CargarAlertas(frmNews);
    });


    var oTable = $("#Tabla" + frmNews).dataTable({
        dom: 'lfrti',
        "order": [[0, "desc"]],
        columnDefs: [{ type: 'fecha', targets: 0 }],
        "aoColumns": [
            {
                data: 'Fecha',
                sWidth: '10%'
            },
            {
                data: 'Titulo',
                sWidth: '30%'
            },
            {
                data: 'Area',
                sWidth: '35%'
            },
            {
                sWidth: '15%',
                sClass: "der",
                orderable: false,
                render: function (data,type,full) { return RenderizarBotonesGrilla(full);}
            }
        ],
        sAjaxSource: '/Newsletters/LlenarJSONGrilla',
        sServerMethod: 'POST',
        bProcessing: true,
        bAutoWidth: false,
        pageLength: 25,
        fnServerData: function(sSource, aoData, fnCallback){
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: sSource,
                success: fnCallback
            });
        },
        fnDrawCallback: function () {
            return EventHandlerBotonesGrillaNewsletter();
        }
    });
}

function EventHandlerBotonesGrillaNewsletter() {
    //le saco la clase dt... al btn de Excel porque rompe el diseño.
    $(".dt-button").removeClass("dt-button");

    //Cambiar estado visible o no Visible
    $(".btnVisible").on('click', function () {
        var btn = $(this);

        //conectar a la db para setear el flag "visible" a 1 o 0 segun corresponda
        $.ajax({
            'type': 'POST',
            'dataType': 'json',
            'url': '/Newsletters/SetVisible',
            'data': { id: btn.attr("data-IdNewsletter"), state: (btn.val() === '1') ? '0' : '1' }
        })
        .success(function (data) {
            if (data.IsEverythingGood) {
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
            } else if (data.IsRedirect) {
                window.location.href = "/Home/Login";
            }            
        })
        .always(function () {
            //enviar notificacion Pnotify indicando la sucesion del evento (si fue ok o no)
            CargarAlertas(frmNews);
        });
    });

    //BTN EDITAR
    $(".btnEditar").on('click', function () {
        CargarModalNewsletter($(this).attr("data-IdNewsletter"));
    });

    //POPOVER DEL BTN ELIMINAR
    $('[data-toggle="confirmation"]').confirmation({
        singleton: true,
        placement: 'left',
        title: 'Eliminar',
        btnOkLabel: 'Si',
        btnCancelLabel: 'No',
        onConfirm: function () {
            return BorrarRegistroNewsletter($(this).attr("data-IdNewsletter"));
        }
    });
}

function RenderizarBotonesGrilla(full) {
    var html = "";

    //boton de visible o no visible
    html += '<button type="button" class="btnVisible btn ' + ((full.Visible === 1) ? 'btn-success' : 'btn-danger') + ' btn-xs space1" data-IdNewsletter=' + full.Id + ' value="' + full.Visible + '">\
                <span class="glyphicon glyphicon-off"></span>\
            </button>';


    //boton de editar
    html += '<button type="button" class="btnEditar btn btn-default btn-xs space1" data-IdNewsletter=' + full.Id + '>\
                <span class="glyphicon glyphicon-edit"></span>\
            </button>';

    //boton de borrar
    html += '<button type="button" id="enc' + full.Id + '" class="btnEliminar btn btn-default btn-xs" data-IdNewsletter=' + full.Id + ' data-toggle="confirmation">\
                <span class="glyphicon glyphicon-remove"></span>\
            </button>';

    return html;
}

function CargarModalNewsletter(id) {
    $("#dialog").load("/Newsletters/Modal", { id: id }, function (response, status, xhr) {
        if (status == "success") {
            $("#dialog").modal('show');
        } else {
            CargarAlertas(frmNews);
        }
    });
}

function BorrarRegistroNewsletter(id) {
    $.post("/Newsletters/DeleteById", { id: id })
    .success(function (data) {
        if (data.IsEverythingGood) {
            ReloadTable("Tabla" + frmNews, false);
        } else if (data.IsRedirect) {
            window.location.href = "/Home/Login";
        }
    })
    .always(function () {
        CargarAlertas(frmNews);
    });
}


function AltaNewsletters() {
    CargarModalNewsletter("");
}
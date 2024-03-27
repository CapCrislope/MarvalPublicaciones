var frmPodcast = "Podcast";
var frmModal = "Modal";

function AltaPodcast() {
    $("#dialog").load("/Podcast/ModalPodcast", function (response, status, xhr) {
        if (status == "success") {
            $("#hModo").attr("value", "Alta");
            $("#dialog").modal('show');
        }
        else
            CargarAlertas(frmPodcast);
    });
}

function EditarPodcast(id) {
    $("#dialog").load("/Podcast/ModalPodcast", { idPodcast: id }, function (response, status, xhr) {
        if (status == "success") {
            $("#dialog").modal('show');
            $("#hModo").attr("value", "Edit");
        }
        else
            CargarAlertas(frmPodcast);
    });
}

function CambiarColorBtnHabilitar(btn) {
    if (btn.hasClass("btn-success")) {
        btn.removeClass("btn-success");
        btn.addClass("btn-danger");
        return false;
    } else {
        btn.removeClass("btn-danger");
        btn.addClass("btn-success");
        return true;
    }
}

function IniciarTablaEpisodios(idPodcast) {
    $.fn.dataTable.ext.errMode = 'none';

    $('#TablaEpisodio' + idPodcast).on('error.dt', function (e, settings, techNote, message) {
        CargarAlertas(frmPodcast);
    })

    $('#TablaEpisodio' + idPodcast).dataTable(
        {
            bProcessing: true,
            //columnDefs: [{ type: 'fecha', targets: 3 }],
            sAjaxSource: "/Podcast/ObtenerEpisodios?idPodcast=" + idPodcast,
            "aoColumns": [
                {
                    data: "Numero",
                    sWidth: "10%",
                    sClass: "columna"
                    //render: function (data, type, row) { return data.split(' ')[0]; }
                },
                {
                    data: "Titulo_es",
                    sWidth: "70%",
                    sClass: "columna"
                },
                {
                    data: "Id",
                    sWidth: "20%",
                    sClass: "der",
                    render: function (data, type, row) { return BotoneraGrillaEpisodio(row); }
                }
            ],
            order: [[0, "asc"]],
            bAutoWidth: false,
            paging: false,
            searching: false,
            fnDrawCallback: function (oSettings) {
                FuncionesBotoneraEpisodios(idPodcast);

                //if (admin != 1) {
                //    $('.editEdicionDialog').hide();
                //    $('.eliminar').hide();
                //}
            }
        })
}

function FuncionesBotoneraEpisodios(idPodcast) {
    $(".editEpisodio").on("click", function () {
        var id = this.id;
        ;
        $("#dialog").load("/Podcast/ModalEpisodio?id=" + id + "&accion=Editar", function (response, status, xhr) {
            if (status == "success") {
                $("#dialog").modal('show');
                $("#hModo").attr("value", "Edit");
            }
            else
                CargarAlertas(frmPodcast);
        });
    })

    $(".deleteEpisodio").on("click", function () {
        ;
        EliminarEpisodio(this.id, idPodcast);
    })
}

function IniciarTablaPodcast() {
    $.fn.dataTable.ext.errMode = 'none';

    $('#TablaPodcast').on('error.dt', function (e, settings, techNote, message) {
        CargarAlertas(frmPodcast);
    })

    var oTable = $('#TablaPodcast').dataTable({
        dom: 'Blfrtip',
        buttons: [

        ],
        order: [[0, "desc"]],
        sAjaxSource: "/Podcast/CargarTabla",
        sServerMethod: "GET",
        "aoColumns": [
            {
                sWidth: "2%",
                data: "IdPodcast",
                orderable: false,
                sClass: "der",
                render: function (data, type, row) { return BotoneraGrillaExpandir(row); }
            },
            {
                data: "Titulo_es",
                sWidth: "80%"
            },
            {
                data: "Id",
                sWidth: "20%",
                sClass: "der",
                orderable: false,
                render: function (data, type, full) { return BotoneraGrillaPodcast(full); }
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
            FuncionesBotoneraGrillaPodcast();
        }
    });
}

function FuncionesBotoneraGrillaPodcast() {
    $('[data-toggle=confirmation]').confirmation();

    $('.dt-button').removeClass("dt-button");
    $('.dt-buttons').addClass("space1");

    $(".editDialog").off().on("click", function () {
        EditarPodcast($(this).data("clientid"));
    });

    $('.habilitadoDialog').off().on('click', function () {
        var button = $(this);
        var clientId = button.data("clientid");

        Habilitar(clientId, CambiarColorBtnHabilitar(button))

        return false;
    });

    $(".btn-Episodio").on("click", function () {
        ModalEpisodio(this.id);
    })

    $(".btn-eliminar").on("click", function () {
        Eliminar(this.id);
    })

    $(".btn-episodio").on("click", function () {
        var tr = $(this).closest('tr');
        var row = $('#TablaPodcast').DataTable().row(tr);
        
        if (row.child.isShown()) {
            // This row is already open - close it
            $(this).switchClass("btn-primary", "btn-default");
            $('div.slider', row.child()).slideUp(500, function () {
                row.child.hide();
                tr.removeClass('shown');
            });
        }
        else {
            // Open this row
            $(this).switchClass("btn-default", "btn-primary");
            row.child(htmlGrillaEpisodios(this.id)).show();
            IniciarTablaEpisodios(this.id); //Segunda Grilla
            tr.addClass('shown');
            $('div.slider', row.child()).slideDown(100);
        }
    })
}

function htmlGrillaEpisodios(d) { //Segunda Grilla
    return '<div class="slider"> \
                    <table id="TablaEpisodio' + d + '" style="width: 100%"> \
                        <thead> \
                            <tr style="background-color: #c0cee4"> \
                               <th>Numero</th>\
                               <th>Titulo (es)</th>\
                               <th></th>\
                            </tr> \
                        </thead> \
                        <tbody></tbody> \
                    </table>\
                </div>';
}

function BotoneraGrillaEpisodio(full) {
    ;
    var html = '\
                <button type="button" id="'+ full.Id + '" class="editEpisodio btn btn-default btn-xs" title="Editar"> \
                    <span class="glyphicon glyphicon-edit" aria-hidden="true"></span> \
                </button> \
                <button type="button" id="' + full.Id + '" class="deleteEpisodio btn btn-default btn-xs" data-toggle="confirmation" data-placement="left" data-singleton="true" data-on-confirm="Eliminar" data-title="¿Está seguro?" onclick="SelPodcast(' + full.Id + ');"> \
                    <span class="glyphicon glyphicon-remove" aria-hidden="true"></span> \
                </button> ';

    return html;
}

function BotoneraGrillaPodcast(full) {
    var html = "";

    if (full.Visible == 1) {
        html += '\
        <button type="button" class="habilitadoDialog btn btn-success btn-xs" data-clientid="' + full.Id + '" title="Habilitado" value="0"> \
            <span class="glyphicon glyphicon-off" aria-hidden="true"></span> \
        </button>';
    }
    else {
        html += '\
        <button type="button" class="habilitadoDialog btn btn-danger btn-xs" data-clientid="' + full.Id + '" title="DesHabilitado" value="1"> \
            <span class="glyphicon glyphicon-off" aria-hidden="true"></span> \
        </button>';
    }

    html += '\
        <button type="button" class="btn-Episodio btn btn-default btn-xs" id="' + full.Id + '" title="Agregar Episodio"> \
            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> \
        </button> \
        <button type="button" class="editDialog btn btn-default btn-xs" data-clientid="' + full.Id + '" title="Editar"> \
            <span class="glyphicon glyphicon-edit" aria-hidden="true"></span> \
        </button> \
        <button type="button" id="mat_' + full.Id + '" class="btn btn-default btn-xs" data-toggle="confirmation" data-placement="left" data-singleton="true" data-on-confirm="Eliminar" data-title="¿Está seguro?" onclick="SelPodcast(' + full.Id + ');"> \
            <span class="glyphicon glyphicon-remove" aria-hidden="true"> \
            </span> \
        </button>'

    return html;
}

function ModalEpisodio(id) {
    $("#dialog").load("/Podcast/ModalEpisodio?id=" + id + "&accion=Alta", function (response, status, xhr) {
        if (status == "success") {
            $("#dialog").modal('show');
            $("#hModo").attr("value", "Edit");
        }
        else
            CargarAlertas(frmPodcast);
    });
}

function Habilitar(id, visible) {
    $.ajax({
        type: 'POST',
        url: '/Podcast/Habilitar',
        data: {
            id: id,
            visible: visible
        }
    })
        .done(function () {
        })
        .fail(function () {
        })
        .always(function () {
            CargarAlertas(frmPodcast);
        })
}

function SelPodcast(id) {
    $("#hIdPodcast").val(id);
}

function Eliminar() {
    var id = $("#hIdPodcast").val();

    $.ajax({
        type: 'POST',
        url: '/Podcast/Eliminar',
        data: { id: id }
    })
    .done(function (data) {
        if (data.isEverythingGood) {
            ReloadTable("TablaPodcast", true);
        }
    })
    .fail(function () {
    })
    .always(function () {
        CargarAlertas(frmPodcast);
    })
}

function BotoneraGrillaExpandir(row) {
    return '\
        <button type="button" class="btn-episodio btn btn-default btn-xs" id="'+ row.Id + '" title="Ver Episodios"> \
            <span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> \
        </button>';
}

function EliminarEpisodio(idEpisodio, idPodcast) {
    $.ajax({
        type: 'POST',
        url: '/Podcast/EliminarEpisodio',
        data: { idEpisodio: idEpisodio }
    }).done(function (data) {
        if (data.isEverythingGood) {
            ReloadTable("TablaEpisodio" + idPodcast, true);
        }
    }).fail()
        .always(function () {
            CargarAlertas(frmPodcast);
        })
}
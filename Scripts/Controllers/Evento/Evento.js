var frmEvento = "Evento";
var frmModal = "Modal";
var formatosImagenesValidas = ['jpg', 'jpeg', 'png', 'bmp'];
var formatoPdf = ['pdf'];
var formatoCalendar = ['ics'];


function InicializarTablaEdicionEvento() {
    $.fn.dataTable.ext.errMode = 'none';

    $('#EventoTable').on('error.dt', function (e, settings, techNote, message) {
        CargarAlertas(frmEvento);
    })

    var oTable = $('#EventoTable').dataTable({
        dom: 'lfrtip',
        sAjaxSource: "/Evento/LlenarJSONGrillaEventoEdicion",
        sServerMethod: "POST",
        columnDefs: [{ type: 'fecha', targets: 2 }],
        "aoColumns": [

            {
                data: "TituloEvento",
                sWidth: "28%",
            },
            {
                data: "TituloEdicion",
                sWidth: "40%",
            },
            {
                data: "FechaEdicion",
                sWidth: "10%",
            },
            {
                data: "EdicionId",
                sClass: "der",
                orderable: false,
                sWidth: "27%",
                render: function (data, type, full) { return BotoneraEdicionEvento(full); }
            }
        ],
        bAutoWidth: false,
        pageLength: 50,
        language: {
            select: {
                rows: ". %d filas seleccionadas"
            }
        },
        fnDrawCallback: function (oSettings) {
            FuncionesBotoneraGrillaEdicionEvento();
        }
    });
}

function BotoneraEdicionEvento(full) {
    var html = "";

    if (full.Visible == 1) {
        html += '\
        <button type="button" class="habilitadoDialog btn btn-success btn-xs" data-clientid="' + full.EdicionId + '" title="Habilitado" value="'+true+'"> \
            <span class="glyphicon glyphicon-off" aria-hidden="true"></span> \
        </button>'
    }
    else {
        html += '\
        <button type="button" class="habilitadoDialog btn btn-danger btn-xs" data-clientid="' + full.EdicionId + '" title="DesHabilitado" value="'+false+'"> \
            <span class="glyphicon glyphicon-off" aria-hidden="true"></span> \
        </button>'
    }


    html += '\
        <button type="button" class="addVideo btn btn-default btn-xs" data-clientid="' + full.EdicionId + '" title="Agregar contenido" > \
            <span class="glyphicon glyphicon-facetime-video" aria-hidden="true"></span> \
        </button> \
        <button type="button" class="addContenidoExtra btn btn-default btn-xs" data-clientid="' + full.EdicionId + '" title="Agregar contenido extra"> \
            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> \
        </button> \
        <button type="button" class="btnAgenda btn btn-default btn-xs" data-clientid="' + full.EdicionId + '" title="Abrir agenda" > \
            <span class="glyphicon glyphicon-calendar" aria-hidden="true"></span> \
        </button> \
        <button type="button" class="editDialog btn btn-default btn-xs" data-clientid="' + full.EdicionId + '" title="Editar"> \
            <span class="glyphicon glyphicon-edit" aria-hidden="true"></span> \
        </button> \
        <button type="button" id="mat_' + full.EdicionId + '" class="btn btn-default btn-xs" data-toggle="confirmation" data-placement="left" data-singleton="true" data-on-confirm="EliminarEdicionEvento" data-title="¿Está seguro?" onclick="SelEdicionEvento(' + full.EdicionId + ');"> \
            <span class="glyphicon glyphicon-remove" aria-hidden="true"> \
            </span> \
        </button>\
        <a role="button" id="' + full.EdicionId + '" class="btn btn-default btn-xs" target="_blank" href="' + web_url_evento + full.Slug + '-' + full.EdicionId + '"> \
            <span class="glyphicon glyphicon-globe" aria-hidden="true"> \
            </span> \
        </a>'

    return html;
}

function FuncionesBotoneraGrillaEdicionEvento() {

    $('[data-toggle=confirmation]').confirmation();

    $(".editDialog").off().on("click", function () {
        ModalEdicionEvento($(this).data("clientid"))
    }); 

    $(".adjunto").off().on("click", function () {
        ModalAdjuntoEvento($(this).data("clientid"))
    });

    $('.habilitadoDialog').off().on('click', function () {
        HabilitarEdicionEvento($(this).data("clientid"), $(this).attr("value"))
    });

    $('.addVideo').off().on('click', function () {
        ModalContenido($(this).data("clientid"))
    });

    $(".btnAgenda").off().on("click", function () {
        ModalAgenda($(this).data("clientid"))
    })

    $(".addContenidoExtra").off().on("click", function () {
        ModalContenidoExtra($(this).data("clientid"));
    })


}


function ModalContenido(idEvento) {

    $("#dialog").load("/Evento/ModalContenidoEvento", { idEvento: idEvento }, function (response, status, xhr) {

        if (status == "success") {
            $("#dialog").modal('show');
        }
        else {
            CargarAlertas(frmEvento);
        }
    })

}

function HabilitarEdicionEvento(IdEdicionEvento, Habilitado) {
    ;
    $.post("/Evento/HabilitarEdicionEvento/", { IdEdicionEvento: IdEdicionEvento, Habilitado: Habilitado })
            .success(function (data) {
                if (data.IsEverythingGood == true) {
                    ;
                    ReloadTable("EventoTable", false);
                    //if (habilitado == 1) {
                    //    button.attr("value", 0);
                    //    button.removeClass("btn-danger");
                    //    button.addClass("btn-success");
                    //}
                    //else {
                    //    button.attr("value", 1);
                    //    button.removeClass("btn-success");
                    //    button.addClass("btn-danger");
                    //}
                }
            })
            .always(function () {
                CargarAlertas(frmEvento);
            });

        return false;
   
}

function SelEdicionEvento(idEdicion) {
    $("#idEdicionEvento").val(idEdicion);
};

function EliminarEdicionEvento() {
    ;
    var idEdicionEvento = $("#idEdicionEvento").val();

    $.post("/Evento/EliminarEdicionEvento", { EdicionEventoId: idEdicionEvento })
        .success(function (data) {
            if (data.IsEverythingGood == true) {
                ReloadTable("EventoTable", false);
            }
            else if (data.IsRedirect) {
                //window.location.href = "/Home/Login";
            }
        })
        .always(function () {
            CargarAlertas(frmEvento);
        })
}

function InicializarCombosAndCkeditorEdicionEvento() {
    ;
    InicializarCKEDITOR("EdicionEvento_Header_en");
    InicializarCKEDITOR("EdicionEvento_Content_en");
    InicializarCKEDITOR("EdicionEvento_Meta_description_en");

    InicializarCKEDITOR("EdicionEvento_Header_es");
    InicializarCKEDITOR("EdicionEvento_Content_es");
    InicializarCKEDITOR("EdicionEvento_Meta_description_es");

    //-------------------------- COMBOS -------------------------------------

    //var areasPracticas = $('#hAreasPracticas' + frmModal).val();
    var areasPracticas = JSON.parse('[' + $("#hAreasPracticas" + frmModal).val() + ']');
    var autores = JSON.parse('[' + $('#hAutores' + frmModal).val() + ']');
    var speakers = JSON.parse('[' + $('#hSpeakers' + frmModal).val() + ']');
    var imagenPosY = $("#hImagenPosY" + frmModal).val();
    var evento = $("#hEvento" + frmModal).val();


    new Combo({
        name: "AreasPracticas",
        view: frmModal,
        actionController: "/AreaPractica/LlenarAreasPracticas/",
        selectValue: areasPracticas
    }).createBasicCombo();

    new Combo({
        name: "Autores",
        view: frmModal,
        actionController: "/Profesional/LlenarProfesionales/",
        selectValue: autores
    }).createBasicCombo();

    new Combo({
        name: "Speakers",
        view: frmModal,
        actionController: "/Profesional/LlenarComboSpeakers/",
        selectValue: speakers
    }).createBasicCombo();

    new Combo({
        name: "ImagenPosY",
        view: frmModal,
        actionController: "/Articulo/LlenarComboPosImg/",
        cantItems: 1,
        selectValue: imagenPosY
    }).createBasicCombo();

    new Combo({
        name: "Evento",
        view: frmModal,
        actionController: "/Evento/LlenarComboEvento/",
        cantItems: 1,
        selectValue: evento
    }).createBasicCombo();
}

function AltaEdicionEvento() {
    ModalEdicionEvento(null);
}


function ModalEdicionEvento(IdEdicionEvento) {

    ;
    $("#dialog").load("/Evento/ModalEdicionEvento", { IdEdicionEvento: IdEdicionEvento }, function (response, status, xhr) {

        if (status == "success") {
            $("#dialog").modal('show');

        }
        else {
            CargarAlertas(frmEvento);
        }
    })
}


function ModalAdjuntoEvento(IdEdicionEvento) {

    ;
    $("#dialog").load("/Evento/ModalAdjuntoEvento", { IdEdicionEvento: IdEdicionEvento }, function (response, status, xhr) {

        if (status == "success") {
            $("#dialog").modal('show');

        }
        else {
            CargarAlertas(frmEvento);
        }
    })
}

function ValidEvento() {
    if (($("#EventoCombo").is(":checked") && ($("#hEventoModal").val() != "")) || ($("#EdicionEvento_NuevoEvento").is(":checked") && ($("#EventoTxt").val() != ""))) {
        return true;
    }
    else {
        Danger("El campo Evento es obligatorio.")
        return false;
    }

}

function GuardarEdicionEvento() {

    ;
    $("#divFormatoFotoIncorrecto").addClass("hidden");
    //agregar validacion de imagen principal obligatoria
    if (ValidarArchivo("principalPicture", formatosImagenesValidas)
        && ValidarArchivo("footerPicture", formatosImagenesValidas)
        && ValidarArchivo("inputStrCalendario", formatoCalendar)
        && ValidarArchivo("inputStrCalendarioEn", formatoCalendar)
        && ValidarArchivo("fileAgenda", formatoPdf)) {

        if ($("#principalPicture").val() != "") {
            if (ValidEvento()) {
                $('#EdicionEvento_Header_en').val(CKEDITOR.instances.EdicionEvento_Header_en.getData());
                $('#EdicionEvento_Content_en').val(CKEDITOR.instances.EdicionEvento_Content_en.getData());
                $('#EdicionEvento_Meta_description_en').val(CKEDITOR.instances.EdicionEvento_Meta_description_en.getData());


                $('#EdicionEvento_Header_es').val(CKEDITOR.instances.EdicionEvento_Header_es.getData());
                $('#EdicionEvento_Content_es').val(CKEDITOR.instances.EdicionEvento_Content_es.getData());
                $('#EdicionEvento_Meta_description_es').val(CKEDITOR.instances.EdicionEvento_Meta_description_es.getData());


                if ($("#EdicionEventoForm").valid()) {

                    $("#btnGuardarEvento").button('loading');

                    ;
                    var formData = new FormData($("#EdicionEventoForm")[0]);

                    $.ajax({
                        url: '/Evento/GuardarEdicionEvento',
                        type: 'POST',
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false
                    })
                    .success(function (data) {
                        if (data.IsEverythingGood == true) {
                            ReloadTable("EventoTable", true);
                            $("#dialog").modal("hide");
                        }
                        else if (data.IsRedirect) {
                            // window.location.href = "/Home/Login";
                        }
                    }).always(function (data) {
                        $("#btnGuardarEvento").button('reset');
                        CargarAlertas(frmModal);
                    });

                }
                else {
                  Danger("No se cumplió la validación del formulario, por favor verifique el mismo.")
                }

            }
        }

        else {
            //$("#errorFile").removeClass("hidden");
            Danger("La edición del evento debe tener una imágen pricipal sin excepción.")
        }
    }

    else {
        //$("#divFormatoFotoIncorrecto").removeClass("hidden");
        Danger("Corrobore que los formatos de los archivos adjuntos sean los correctos.")
    }

    return false;



}

function BorrarPicturePrincipal() {
    BorrarInputFile('inputFilePicture');

    $("#imgPicture").attr("src", "/Images/imgNoDisp.png");
    $("#imgPicture").attr("title", "Imagen no disponible");

    $("#divFormatoIncorrecto").addClass("hidden");
}

function BorrarPictureFooter() {

    BorrarInputFile('inputFilePictureFooter');

    $("#imgPictureFooter").attr("src", "/Images/imgNoDisp.png");
    $("#imgPictureFooter").attr("title", "Imagen no disponible");

    $("#divFormatoIncorrectoFooter").addClass("hidden");
}

function BorrarLinkES() {

    BorrarInputFile('inputStrCalendario');


}

function BorrarLinkEN() {

    BorrarInputFile('inputStrCalendarioEn');

}

function ObtenerOrigenes() {

    $.ajax({
        type: 'GET',
        url: '/Evento/ObtenerContenidoOrigen'
    }).done(function (data) {
        ;
        data.forEach(function (s) {
            $("<option>", {
                value: s.IdOrigenContenido,
                text: s.Origen
            }).appendTo("#select-origenes");
        })

    }).fail()
        .always(function () {
            CargarAlertas(frmModal)
        })

}

function CargarLinks() {
    $.ajax({
        type: 'GET',
        url: '/Evento/ObtenerContenidos',
        data: { idEventoEdicion: $("#EventoContenido_EdicionEvento_id").val() }
    }).done(function (data) {
        var html = '';
        data.forEach(function (d) {
            html += '<div class="row" style="margin-top: 1%"> \
                        <div class="col-md-12"> \
                            <button id="'+ d.Id +'" onclick="BorrarContenido(this.id)" class="borrarContenido btn btn-sm btn-danger" style="margin-right: 1%;"> \
                                <span style="margin-left: 1%" class="glyphicon glyphicon-remove" aria-hidden="true"></span> \
                            </button> \
                            <a href="'+ d.Url + '" target="_blank">' + d.Url + '</a> \
                        </div> \
                    </div> '
        })
        $("#cargarLinks").empty();
        $("#cargarLinks").html(html);
        VistaCarga(false)
    })

}

function GuardarContenido() {
    
    $("#EventoContenido_IdOrigenContenido").val($("#select-origenes").val())
    ;
    if (!$("#formContenido").valid()) {
        return;
    }

    VistaCarga(true)

    $.ajax({

        type: 'POST',
        url: '/Evento/GuardarContenido',
        data: $("#formContenido").serialize()

    }).done(function (data) {

        if (data.IsEverythingGood) {
            $("#formContenido")[0].reset();
            CargarLinks();
        }

    }).fail(function () {
        VistaCarga(false)
    })
        .always(function () {

            CargarAlertas(frmEvento);
            
        })

}


function BorrarContenido(id) {
    VistaCarga(true)
    ;
    $.ajax({
        type: 'POST',
        url: '/Evento/BorrarContenido',
        data: { idContenido: id }
    }).done(function () {
        CargarLinks();
    }).fail(function () {
        VistaCarga(false)
    })
        .always(function () {
            CargarAlertas(frmEvento);
            
        })

}

function VistaCarga(activar) {
    if (activar) {
        $("#loading-overlay").css("display", "block");
    } else {
        $("#loading-overlay").css("display", "none");
    }
}


function CambiarNombreArchivoAgenda() {
    
    var nombre = $("#fileAgenda").val().split('\\').pop(); 

    $("#inputArchivoAgenda").val(nombre);

}

function BorrarArchivoAgenda() {
    
    $("#fileAgenda").val(null);
    $("#inputArchivoAgenda").val(null);

}

function ModalAgenda(idEvento) {

    $("#dialog").load("/Evento/ModalAgenda", { idEdicionEvento: idEvento }, function (response, status, xhr) {

        if (status == "success") {
            $("#dialog").modal('show');

        }
        else {
            CargarAlertas(frmEvento);
        }
    })

}

function CargarAgenda() {
    ;
    $.ajax({
        type: 'GET',
        url: '/Evento/ObtenerAgendas',
        data: { idEvento: $("#EventoAgenda_IdEdicionEvento").val() }
    }).done(function (data) {
        ;
        var html = "";

        if (data.agenda.length > 0) {

            $("#cargarAgenda").html('\
                                    <table class= "table" >\
                                    <thead>\
                                        <tr>\
                                            <th>Titulo</th>\
                                            <th>Fecha</th>\
                                            <th>Hora</th>\
                                            <th></th>\
                                        </tr>\
                                    </thead>\
                                    <tbody id="tablaModalAgenda">\
                                    </tbody>\
                                </table >');

        }

        data.agenda.forEach(function (a) {
            
            ;
            html += '<tr id="ag-' + a.Id + '">\
                        <td>'+ a.TituloEs +'</td>\
                        <td>'+ a.Fecha + '</td>\
                        <td>'+ a.Hora + '</td>\
                        <td class="text-end" style="display:flex; align-items: end; justify-content: end;">\
                            <button type="button" style="float: left; margin-right: 1%;" class="btn btn-default btn-xs" title="Editar" onclick="EditarAgenda(' + a.Id + ');"> \
                                <span class="glyphicon glyphicon-edit" aria-hidden="true"></span> \
                            </button> \
                            <button type="button" style="float: left; margin-right: 1%;" class="btn btn-default btn-xs btn-danger" onclick="EliminarAgenda('+ a.Id + ')" data-toggle="confirmation" data-placement="left" data-singleton="true" data-on-confirm="EliminarEdicionEvento" data-title="¿Está seguro?"> \
                                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span> \
                            </button>\
                        </td>\
                    </tr>'
        })

        var body = $("#tablaModalAgenda");

        body.empty();
        body.html(html);

    }).fail()
        .always(function () {
            CargarAlertas(frmEvento);
        })

}


function EliminarAgenda(idAgenda) {
    
    $("#ag-" + idAgenda).css("display", "none");
    
    $.ajax({
        type: 'POST',
        url: '/Evento/BorrarAgenda',
        data: { idAgenda: idAgenda }
    }).done(function (data) {

    }).fail()
        .always(function () {
            CargarAlertas(frmEvento)
        })

}

function EditarAgenda(idAgenda) {

    $.ajax({
        type: 'GET',
        url: '/Evento/ObtenerAgenda',
        data: { idAgenda: idAgenda }
    }).done(function (data) {
        $('#dialog').animate({ scrollTop: 0 }, 'slow');
        if (data.EventoAgenda.Idioma == "es") {
            $('select option[value="es"]').attr('selected', true);
        } else if (data.EventoAgenda.Idioma == "en") {
            $('select option[value="en"]').attr('selected', true);
        }

        $("#EventoAgenda_Idioma").val(data.EventoAgenda.Idioma);
        $("#EventoAgenda_IdEdicionEvento").val(data.EventoAgenda.IdEdicionEvento);
        $("#EventoAgenda_Fecha").val(data.EventoAgenda.Fecha);
        $("#EventoAgenda_Hora").val(data.EventoAgenda.Hora);
        $("#EventoAgenda_TituloEs").val(data.EventoAgenda.TituloEs);
        $("#EventoAgenda_TituloEn").val(data.EventoAgenda.TituloEn);
        $("#EventoAgenda_Id").val(data.EventoAgenda.Id);
        $("#Modo").val(data.Modo);
        $("#btnEnviar").text("Guardar");
        CKEDITOR.instances.EventoAgenda_ContenidoEs.setData(data.EventoAgenda.ContenidoEs)
        CKEDITOR.instances.EventoAgenda_ContenidoEn.setData(data.EventoAgenda.ContenidoEn)
        
    }).fail(function () {
        CargarAlertas(frmEvento)
    })

}

function GuardarAgenda() {
    
    $("#EventoAgenda_Idioma").val($("#idiomas").val());

    $("#EventoAgenda_ContenidoEn").val(CKEDITOR.instances.EventoAgenda_ContenidoEn.getData())
    $("#EventoAgenda_ContenidoEs").val(CKEDITOR.instances.EventoAgenda_ContenidoEs.getData())
    
    if (!$("#AgendaForm").valid()) {
        return;
    }

    $.ajax({
        type: 'POST',
        url: '/Evento/GuardarAgenda',
        data: $("#AgendaForm").serialize()
    }).done(function () {
        VaciarForm();
        CargarAgenda();
    })
        .fail()
        .always(function () {
        CargarAlertas(frmEvento);
    })

}

function VaciarForm() {
    var inputFecha = $("#EventoAgenda_Fecha");
    var fecha = inputFecha.val();

    $("#AgendaForm")[0].reset();
    CKEDITOR.instances.EventoAgenda_ContenidoEs.setData("")
    CKEDITOR.instances.EventoAgenda_ContenidoEn.setData("")
    $('select option').attr('selected', false);
    inputFecha.val(fecha);
    $("#Modo").val("ALTA")
    $("#btnEnviar").text("Agregar");
}


function ModalContenidoExtra(idEvento) {

    $("#dialog").load("/Evento/ModalContenidoExtra", { idEvento: idEvento }, function (response, status, xhr) {
        if (status == "success") {
            $("#dialog").modal('show');
        }
        else {
            CargarAlertas(frmEvento);
        }
    })

}


function CambiarImageVideo(value) {

    $("#typeVideo").addClass("hidden");
    $("#typeImg").addClass("hidden");

    if (value == 'imagen') {
        $("#typeImg").removeClass("hidden");
        $("#typeVideo").addClass("hidden");
    } else if (value == 'video') {
        $("#typeImg").addClass("hidden");
        $("#typeVideo").removeClass("hidden");
    }

}

function GuardarContenidoExtra() {
    ;
    if (!ValidarArchivo("EventoContenidoExtra_NombreArchivoImagen", formatosImagenesValidas)) {
        return;
    }

    if (!$("#formContenidoExtra").valid()) {
        return;
    }

    ;

    if ($("#EventoContenidoExtra_UrlVideo").val() == '' &&
        $("#EventoContenidoExtra_NombreArchivoImagen").val() == '') {

        var html = '<p class="text-danger"> El campo es obligatorio </p>'

        var valiForm = $(".validacionContenidoExtraForm");        

        valiForm.empty();
        valiForm.html(html);

        return;
    }

    

    VistaCarga(true)
    $("#EventoContenidoExtra_TipoContenido").val($("#select-contenido").val())
    var formData = new FormData($("#formContenidoExtra")[0]);

    $.ajax({
        type: 'POST',
        url: '/Evento/GuardarContenidoExtra',
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    }).done(function (data) {
        ;
        VaciarInputs();
        CargarTablaContenidoExtra($("#EventoContenidoExtra_EdicionEvento_id").val())
    }).fail()
        .always(function () {
            VistaCarga(false)
            CargarAlertas(frmEvento)
        })
}

function CargarTablaContenidoExtra(idEvento) {

    $.ajax({
        type: 'GET',
        url: '/Evento/ObtenerContenidoExtra',
        data: { idEvento: idEvento }
    }).done(function (data) {

        var html = ''

        data.forEach(function (d) {

            var text;

            if (d.UrlVideo != null) {

                text = '<a target="_blank" href="' + d.UrlVideo + '">' + d.UrlVideo + '</a>'

            } else if (d.NombreArchivoImagen != null) {

                text = d.NombreArchivoImagen

            }


            html += '<div class="row" style="margin-top: 1%"> \
                        <div class="col-md-12"> \
                            <button id="'+ d.Id + '" onclick="EliminarContenidoExtra(this.id)" class="borrarContenido btn btn-sm btn-danger" style="margin-right: 1%;"> \
                                <span style="margin-left: 1%" class="glyphicon glyphicon-remove" aria-hidden="true"></span> \
                            </button> \
                            '+ text + '\
                        </div> \
                    </div> '

        })

        var carga = $("#cargaContenidoExtra");

        carga.empty();
        carga.html(html);

    })

}

function VaciarInputs() {

    $("#imgPicture").attr("src", "/Images/imgNoDisp.png");
    $("#EventoContenidoExtra_UrlVideo").val("");
    $("#EventoContenidoExtra_NombreArchivoImagen").val("");
    $("#EventoContenidoExtra_PictureUpload").val("");
    $(".validacionContenidoExtraForm").empty();

}

function EliminarContenidoExtra(idContenidoExtra) {

    $.ajax({
        type: 'POST',
        url: '/Evento/EliminarContenidoExtra',
        data: { idContenidoExtra: idContenidoExtra }
    }).done(function (data) {

        if (!data.IsEverythingGood) {
            return;
        }

        CargarTablaContenidoExtra($("#EventoContenidoExtra_EdicionEvento_id").val())

    }).always(function () {
        CargarAlertas(frmEvento)
    })

}

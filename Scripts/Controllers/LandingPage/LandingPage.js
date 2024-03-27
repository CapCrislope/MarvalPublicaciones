var frmLandingPage = "LandingPage"
var frmModal = "Modal";
var formatosImagenesValidas = ['jpg', 'jpeg', 'png', 'bmp'];

function InicializarCombosAndCkeditor() {
    ;
    InicializarCKEDITOR("Landing_Header_en");
    InicializarCKEDITOR("Landing_Content_en");  
    InicializarCKEDITOR("Landing_Meta_description_en");

    InicializarCKEDITOR("Landing_Header_es");
    InicializarCKEDITOR("Landing_Content_es");
    InicializarCKEDITOR("Landing_Meta_description_es");

    //-------------------------- COMBOS -------------------------------------
    
    //var areasPracticas = $('#hAreasPracticas' + frmModal).val();
    var areasPracticas = JSON.parse('[' + $("#hAreasPracticas" + frmModal).val() + ']');
    var autores = JSON.parse('[' + $('#hAutores' + frmModal).val() + ']');
    var imagenPosY = $("#hImagenPosY" + frmModal).val();
    var campania = $("#hCampania" + frmModal).val();
    
    
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
        name: "ImagenPosY",
        view: frmModal,
        actionController: "/Articulo/LlenarComboPosImg/",
        cantItems: 1,
        selectValue: imagenPosY
    }).createBasicCombo();

    new Combo({
        name: "Campania",
        view: frmModal,
        actionController: "/LandingPage/LlenarComboCampania/",
        cantItems: 1,
        selectValue: campania
    }).createBasicCombo();
}


function InicializarTablaLandingPage() {
    $.fn.dataTable.ext.errMode = 'none';

    $('#LandingPageTable').on('error.dt', function (e, settings, techNote, message) {
        CargarAlertas(frmLandingPage);
    })

    var oTable = $('#LandingPageTable').dataTable({
        dom: 'lfrtip',
        sAjaxSource: "/LandingPage/LlenarJSONGrillaLandingPage",
        sServerMethod: "POST",
        columnDefs: [{ type: 'fecha', targets: 2 }],
        "aoColumns": [

            {
                data: "Titulo",
                sWidth: "30%",
            },
            {
                data: "Profesionales",
                sWidth: "45%",
            },
            {
                data: "Fecha",
                sWidth: "10%",
            },
            {
                data: "IdLanding",
                sClass: "der",
                orderable: false,
                sWidth: "20%",
                render: function (data, type, full) { return BotoneraLandingPage(full); }
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
            FuncionesBotoneraGrillaLandingPage();
        }
    });
}

function BotoneraLandingPage(full) {
    var html = "";

    if (full.Visible == 1) {
        html += '\
        <button type="button" class="habilitadoDialog btn btn-success btn-xs" data-clientid="' + full.IdLanding + '" title="Habilitado" value="1"> \
            <span class="glyphicon glyphicon-off" aria-hidden="true"></span> \
        </button>';
    }
    else {
        html += '\
        <button type="button" class="habilitadoDialog btn btn-danger btn-xs" data-clientid="' + full.IdLanding + '" title="DesHabilitado" value="0"> \
            <span class="glyphicon glyphicon-off" aria-hidden="true"></span> \
        </button>';
    }

    html += '\
        <button type="button" class="editDialog btn btn-default btn-xs" data-clientid="' + full.IdLanding + '" title="Editar"> \
            <span class="glyphicon glyphicon-edit" aria-hidden="true"></span> \
        </button> \
        <button type="button" id="mat_' + full.IdLanding + '" class="btn btn-default btn-xs" data-toggle="confirmation" data-placement="left" data-singleton="true" data-on-confirm="EliminarLandingPage" data-title="¿Está seguro?" onclick="SelLandingPage(' + full.IdLanding + ');"> \
            <span class="glyphicon glyphicon-remove" aria-hidden="true"> \
            </span> \
        </button>\
        <a role="button" id="' + full.id + '" class="btn btn-default btn-xs" target="_blank" href="' + web_url_landing + full.Slug + '-' + full.IdLanding+ '"> \
            <span class="glyphicon glyphicon-globe" aria-hidden="true"> \
            </span> \
        </a>'

    return html;
}

function FuncionesBotoneraGrillaLandingPage() {
    $('[data-toggle=confirmation]').confirmation();

    $(".editDialog").off().on("click", function () {
        ModalLandingPage($(this).data("clientid"))           
    });

    $('.habilitadoDialog').off().on('click', function () {
        ;
        var button = $(this);
        var clientId = button.data("clientid");
        var Visible = button.attr("value");

        $.post("/LandingPage/Habilitar/", { idLanding: clientId, Visible: Visible })
            .success(function (data) {
                if (data.IsEverythingGood == true) {

                    ReloadTable("LandingPageTable", false);
                    //if (Visible == 1) {
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
                CargarAlertas(frmLandingPage);
            });

        return false;
    });


}


function SelLandingPage(idLanding) {
    $("#idLandingPage").val(idLanding);
};


function EliminarLandingPage() {
    ;
    var idLanding = $("#idLandingPage").val();

    $.post("/LandingPage/Eliminar", { idLanding: idLanding })
        .success(function (data) {
            if (data.IsEverythingGood == true) {
                ReloadTable("LandingPageTable", false);
            }
            else if (data.IsRedirect) {
                //window.location.href = "/Home/Login";
            }
        })
        .always(function () {
            CargarAlertas(frmLandingPage);
        })
}

function AltaLandingPage() {
    ModalLandingPage(null);
}


function ModalLandingPage(IdLanding) {

    ;
    $("#dialog").load("/LandingPage/ModalLandingPage", { IdLanding: IdLanding }, function (response, status, xhr) {

        if (status == "success") {
            $("#dialog").modal('show');
            
        }
        else {
            CargarAlertas(frmLandingPage);
        }
    })
}

function ValidCampania() {
    if (($("#CampaniaCombo").is(":checked") && ($("#hCampaniaModal").val() != "")) || ($("#Landing_NuevaCampania").is(":checked") && ($("#CampaniaTxt").val()!="") )) {
        return true;
    }
    else {
        Danger("El campo campaña es obligatorio.")
        return false;
    }
    
}

function SaveLandingPage() {

    ;
    $("#divFormatoFotoIncorrecto").addClass("hidden");

    if (ValidarArchivo("inputFilePicture", formatosImagenesValidas)) {

        if ($("#fileName_es").val() != "" && $("#fileName_en").val() != "") {
            if (ValidCampania()) {
                $('#Landing_Header_en').val(CKEDITOR.instances.Landing_Header_en.getData());
                $('#Landing_Content_en').val(CKEDITOR.instances.Landing_Content_en.getData());
                $('#Landing_Meta_description_en').val(CKEDITOR.instances.Landing_Meta_description_en.getData());


                $('#Landing_Header_es').val(CKEDITOR.instances.Landing_Header_es.getData());
                $('#Landing_Content_es').val(CKEDITOR.instances.Landing_Content_es.getData());
                $('#Landing_Meta_description_es').val(CKEDITOR.instances.Landing_Meta_description_es.getData());
                
                $("#Landing_Destacado").val($('#Destacado').is(':checked') ? 1 : 0);
                $("#Landing_Priorizar").val($('#Priorizar').is(':checked') ? 1 : 0);

                if ($("#LandingPageForm").valid()) {

                    $("#btnGuardarLanding").button('loading');

                    var formData = new FormData($("#LandingPageForm")[0]);

                    $.ajax({
                        url: '/LandingPage/GuardarLandingPage',
                        type: 'POST',
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false
                    })
                    .success(function (data) {
                        if (data.IsEverythingGood == true) {
                            ReloadTable("LandingPageTable", true);
                            $("#dialog").modal("hide");
                        }
                        else if (data.IsRedirect) {
                            // window.location.href = "/Home/Login";
                        }
                    }).always(function (data) {
                        $("#btnGuardarLanding").button('reset');
                        CargarAlertas(frmModal);
                    });

                }

            }
        }
        else {
            if ($("#fileName_es").val() == "")
                $("#errorFile_es").removeClass("hidden");
            else
                $("#errorFile_en").removeClass("hidden");
        }
    }

        else {
            $("#divFormatoFotoIncorrecto").removeClass("hidden");
        }

        return false;



    }


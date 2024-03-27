var frmCasosDeEstudio = "CasosDeEstudio"
var frmModal = "Modal";
var formatosImagenesValidas = ['jpg', 'jpeg', 'png', 'bmp'];

function InicializarCombosAndCkeditorCasosDeEstudio() {
    ;

    InicializarCKEDITOR("Caso_Header_es");
    InicializarCKEDITOR("Caso_Content_es");
    InicializarCKEDITOR("Caso_Meta_description_es");
    InicializarCKEDITOR("Caso_Introduction_es");
    InicializarCKEDITOR("Caso_Challenge_Title_es");
    InicializarCKEDITOR("Caso_Challenge_Content_es");
    InicializarCKEDITOR("Caso_Solution_Title_es");
    InicializarCKEDITOR("Caso_Solution_Content_es");
    InicializarCKEDITOR("Caso_Result_Title_es");
    InicializarCKEDITOR("Caso_Result_Content_es");

    InicializarCKEDITOR("Caso_Header_en");
    InicializarCKEDITOR("Caso_Content_en");
    InicializarCKEDITOR("Caso_Meta_description_en");
    InicializarCKEDITOR("Caso_Introduction_en");
    InicializarCKEDITOR("Caso_Challenge_Title_en");
    InicializarCKEDITOR("Caso_Challenge_Content_en");
    InicializarCKEDITOR("Caso_Solution_Title_en");
    InicializarCKEDITOR("Caso_Solution_Content_en");
    InicializarCKEDITOR("Caso_Result_Title_en");
    InicializarCKEDITOR("Caso_Result_Content_en");


   
    

    //-------------------------- COMBOS -------------------------------------

    //var areasPracticas = $('#hAreasPracticas' + frmModal).val();
    var areasPracticas = JSON.parse('[' + $("#hAreasPracticas" + frmModal).val() + ']');
    var autores = JSON.parse('[' + $('#hAutores' + frmModal).val() + ']');
    var imagenPosY = $("#hImagenPosY" + frmModal).val();



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


}

function InicializarTablaCasosDeEstudio() {
    $.fn.dataTable.ext.errMode = 'none';

    $('#CasosDeEstudioTable').on('error.dt', function (e, settings, techNote, message) {
        CargarAlertas(frmCasosDeEstudio);
    })

    var oTable = $('#CasosDeEstudioTable').dataTable({
        dom: 'lfrtip',
        sAjaxSource: "/CasosDeEstudio/LlenarJSONGrillaCasosDeEstudio",
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
                data: "IdCaso",
                sClass: "der",
                orderable: false,
                sWidth: "20%",
                render: function (data, type, full) { return BotoneraCasosDeEstudio(full); }
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
            FuncionesBotoneraGrillaCasosDeEstudio();
        }
    });
}

function BotoneraCasosDeEstudio(full) {
    var html = "";

    if (full.Visible == 1) {
        html += '\
        <button type="button" class="habilitadoDialog btn btn-success btn-xs" data-clientid="' + full.IdCaso + '" title="Habilitado" value="1"> \
            <span class="glyphicon glyphicon-off" aria-hidden="true"></span> \
        </button>';
    }
    else {
        html += '\
        <button type="button" class="habilitadoDialog btn btn-danger btn-xs" data-clientid="' + full.IdCaso + '" title="DesHabilitado" value="0"> \
            <span class="glyphicon glyphicon-off" aria-hidden="true"></span> \
        </button>';
    }

    html += '\
        <button type="button" class="editDialog btn btn-default btn-xs" data-clientid="' + full.IdCaso + '" title="Editar"> \
            <span class="glyphicon glyphicon-edit" aria-hidden="true"></span> \
        </button> \
        <button type="button" id="mat_' + full.IdCaso + '" class="btn btn-default btn-xs" data-toggle="confirmation" data-placement="left" data-singleton="true" data-on-confirm="EliminarCasoEstudio" data-title="¿Está seguro?" onclick="SelCasoDeEstudio(' + full.IdCaso + ');"> \
            <span class="glyphicon glyphicon-remove" aria-hidden="true"> \
            </span> \
        </button>\
     <a role="button" id="' + full.IdCaso + '" class="btn btn-default btn-xs" target="_blank" href="' + web_url_casos + full.Slug + '-' + full.IdCaso + '"> \
            <span class="glyphicon glyphicon-globe" aria-hidden="true"> \
            </span> \
        </a>';
   

    return html;
}

function FuncionesBotoneraGrillaCasosDeEstudio() {
    $('[data-toggle=confirmation]').confirmation();

    $(".editDialog").off().on("click", function () {
        ModalCasoDeEstudio($(this).data("clientid"))
    });

    $('.habilitadoDialog').off().on('click', function () {
        ;
        var button = $(this);
        var clientId = button.data("clientid");
        var Visible = button.attr("value");

        $.post("/CasosDeEstudio/Habilitar/", { idCasoEstudio: clientId, Visible: Visible })
            .success(function (data) {
                if (data.IsEverythingGood == true) {

                    ReloadTable("CasosDeEstudioTable", false);
                }
            })
            .always(function () {
                CargarAlertas(frmCasosDeEstudio);
            });

        return false;
    });
}

function AltaCasoDeEstudio() {
    ModalCasoDeEstudio(null);
}


function ModalCasoDeEstudio(IdCaso) {

    ;
    $("#dialog").load("/CasosDeEstudio/ModalCasoDeEstudio", { IdCasoEstudio: IdCaso }, function (response, status, xhr) {

        if (status == "success") {
            $("#dialog").modal('show');

        }
        else {
            CargarAlertas(frmCasosDeEstudio);
        }
    })
}


function SelCasoDeEstudio(idCaso) {
    $("#idCasoDeEstudio").val(idCaso);
};


function EliminarCasoEstudio() {
    ;
    var idCasoEstudio = $("#idCasoDeEstudio").val();

    $.post("/CasosDeEstudio/Eliminar", { idCasoEstudio: idCasoEstudio })
        .success(function (data) {
            if (data.IsEverythingGood == true) {
                ReloadTable("CasosDeEstudioTable", false);
            }
            else if (data.IsRedirect) {
                //window.location.href = "/Home/Login";
            }
        })
        .always(function () {
            CargarAlertas(frmCasosDeEstudio);
        })
}

function SaveCasoDeEstudio() {

    $("#divFormatoFotoIncorrecto").addClass("hidden");

    if (ValidarArchivo("inputFilePicture", formatosImagenesValidas)) {

        if ($("#fileName_es").val() != "" && $("#fileName_en").val() != "") {

            $("#errorFile_es").addClass("hidden");
            $("#errorFile_en").addClass("hidden");

            $("#Caso_Header_es").val(CKEDITOR.instances.Caso_Header_es.getData());
            $("#Caso_Content_es").val(CKEDITOR.instances.Caso_Content_es.getData());
            $("#Caso_Meta_description_es").val(CKEDITOR.instances.Caso_Meta_description_es.getData());
            $("#Caso_Introduction_es").val(CKEDITOR.instances.Caso_Introduction_es.getData());
            $("#Caso_Challenge_Title_es").val(CKEDITOR.instances.Caso_Challenge_Title_es.getData());
            $("#Caso_Challenge_Content_es").val(CKEDITOR.instances.Caso_Challenge_Content_es.getData());
            $("#Caso_Solution_Title_es").val(CKEDITOR.instances.Caso_Solution_Title_es.getData());
            $("#Caso_Solution_Content_es").val(CKEDITOR.instances.Caso_Solution_Content_es.getData());
            $("#Caso_Result_Title_es").val(CKEDITOR.instances.Caso_Result_Title_es.getData());
            $("#Caso_Result_Content_es").val(CKEDITOR.instances.Caso_Result_Content_es.getData());
            $
            $("#Caso_Header_en").val(CKEDITOR.instances.Caso_Header_en.getData());
            $("#Caso_Content_en").val(CKEDITOR.instances.Caso_Content_en.getData());
            $("#Caso_Meta_description_en").val(CKEDITOR.instances.Caso_Meta_description_en.getData());
            $("#Caso_Introduction_en").val(CKEDITOR.instances.Caso_Introduction_en.getData());
            $("#Caso_Challenge_Title_en").val(CKEDITOR.instances.Caso_Challenge_Title_en.getData());
            $("#Caso_Challenge_Content_en").val(CKEDITOR.instances.Caso_Challenge_Content_en.getData());
            $("#Caso_Solution_Title_en").val(CKEDITOR.instances.Caso_Solution_Title_en.getData());
            $("#Caso_Solution_Content_en").val(CKEDITOR.instances.Caso_Solution_Content_en.getData());
            $("#Caso_Result_Title_en").val(CKEDITOR.instances.Caso_Result_Title_en.getData());
            $("#Caso_Result_Content_en").val(CKEDITOR.instances.Caso_Result_Content_en.getData());

            $("#Caso_Destacado").val($('#Destacado').is(':checked') ? 1 : 0);
            $("#Caso_Priorizar").val($('#Priorizar').is(':checked') ? 1 : 0);


            if ($("#CasoDeEstudioForm").valid()) {
                var formData = new FormData($("#CasoDeEstudioForm")[0]);

                    $.ajax({
                        url: '/CasosDeEstudio/GuardarCasoDeEstudio',
                        type: 'POST',
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false
                    })
                        .success(function (data) {
                            if (data.IsEverythingGood == true) {
                                ReloadTable("CasosDeEstudioTable", true);
                                $("#dialog").modal("hide");
                            }
                            else if (data.IsRedirect) {
                                // window.location.href = "/Home/Login";
                            }
                        }).always(function (data) {
                            CargarAlertas(frmModal);
                        });

                }

            
        }
        else {
            if ($("#fileName_es").val() == "")
                $("#errorFile_es").removeClass("hidden");
            else
                $("#errorFile_es").addClass("hidden");

            if ($("#fileName_en").val() == "")
                $("#errorFile_en").removeClass("hidden");
            else
                $("#errorFile_en").addClass("hidden");    
        }
    }

    else {
        $("#divFormatoFotoIncorrecto").removeClass("hidden");
    }

    return false;


}
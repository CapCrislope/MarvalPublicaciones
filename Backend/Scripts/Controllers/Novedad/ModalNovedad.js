var frmModal = "Modal";
var formatosImagenesValidas = ['jpg', 'jpeg', 'png', 'bmp'];

function IniciarCombosModalNovedad(areasPracticas, profesionales, tipo,imagenPosY)
{
    new Combo({
        name: "AreasPracticas",
        view: frmModal,
        actionController: "/AreaPractica/LlenarAreasPracticas/",
        selectValue: areasPracticas
    }).createBasicCombo();

    new Combo({
        name: "Profesionales",
        view: frmModal,
        actionController: "/Profesional/LlenarProfesionales/",
        selectValue: profesionales
    }).createBasicCombo();

    new Combo({
        name: "kind_id",
        view: frmModal,
        actionController: "/Novedad/LlenarTipos/",
        selectValue: tipo,
        cantItems: 1
    }).createBasicCombo();

   
    new Combo({
        name: "ImagenPosY",
        view: frmModal,
        actionController: "/Novedad/LlenarOpcionesPosImg/",
        cantItems: 1,
        selectValue: imagenPosY
    }).createBasicCombo();
    




    return false;
}

function GuardarNovedad() {
    ;
    $("#divFormatoFotoIncorrecto").addClass("hidden");

    if (ValidarArchivo("inputFileImagen", formatosImagenesValidas)) {
        $('#novedad_header_en').val(CKEDITOR.instances.novedad_header_en.getData());
        $('#novedad_detail_en').val(CKEDITOR.instances.novedad_detail_en.getData());
        $('#novedad_header_es').val(CKEDITOR.instances.novedad_header_es.getData());
        $('#novedad_detail_es').val(CKEDITOR.instances.novedad_detail_es.getData());
        $("#novedad_featured").val($('#Destacado').is(':checked') ? 1 : 0);

        if ($("#NovedadForm").valid()) {
            var formData = new FormData($("#NovedadForm")[0]);

            $.ajax({
                url: '/Novedad/GuardarNovedad',
                type: 'POST',
                data: formData,
                cache: false,
                contentType: false,
                processData: false
            })
            .success(function (data) {
                if (data.IsEverythingGood == true) {
                    ReloadTable("TablaNovedad", true);
                    $("#dialog").modal("hide");
                }
                else if (data.IsRedirect) {
                    window.location.href = "/Home/Login";
                }
            }).always(function (data) {
                CargarAlertas(frmModal);
            });
        }
    }
    else {
        $("#divFormatoFotoIncorrecto").removeClass("hidden");
    }

    return false;
}

function BorrarImagenNovedad() {
    BorrarInputFile('inputFileImagen');

    $("#imgPicture").attr("src", "/Images/imgNoDisp.png");
    $("#imgPicture").attr("title", "Imagen no disponible");

    $("#divFormatoFotoIncorrecto").addClass("hidden");
}
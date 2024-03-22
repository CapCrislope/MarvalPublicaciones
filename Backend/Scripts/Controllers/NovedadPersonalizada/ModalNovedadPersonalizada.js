var formatosImagenesValidas = ['jpg', 'jpeg', 'png', 'bmp'];

function IniciarCombosModalNovedadPersonalizada(areasPracticas, autores) {
    ;
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

    return false;
}

function GuardarNovedadPersonalizada() {
    ;
    $("#divFormatoFotoIncorrecto").addClass("hidden");

    if (ValidarArchivo("inputFilePicture", formatosImagenesValidas)) {
        $('#novedadPersonalizada_header_en').val(CKEDITOR.instances.novedadPersonalizada_header_en.getData());
        $('#novedadPersonalizada_meta_description_en').val(CKEDITOR.instances.novedadPersonalizada_meta_description_en.getData());
        $('#novedadPersonalizada_header_es').val(CKEDITOR.instances.novedadPersonalizada_header_es.getData());
        $('#novedadPersonalizada_meta_description_es').val(CKEDITOR.instances.novedadPersonalizada_meta_description_es.getData());

        if ($("#NovedadPersonalizadaForm").valid()) {
            var formData = new FormData($("#NovedadPersonalizadaForm")[0]);

            $.ajax({
                url: '/NovedadPersonalizada/GuardarNovedadPersonalizada',
                type: 'POST',
                data: formData,
                cache: false,
                contentType: false,
                processData: false
            })
            .success(function (data) {
                if (data.IsEverythingGood == true) {
                    ReloadTable("TablaNovedadPersonalizada", true);
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

function BorrarPictureNovedadPersonalizada() {
    ;
    BorrarInputFile('inputFilePicture');

    $("#imgPicture").attr("src", "/Images/imgNoDisp.png");
    $("#imgPicture").attr("title", "Imagen no disponible");

    $("#divFormatoFotoIncorrecto").addClass("hidden");
}


var frmModal = "Modal";
var formatosImagenesValidas = ['jpg', 'jpeg', 'png', 'bmp'];

function IniciarCombosModalSlide(seccion) {
    new Combo({
        name: "section_name",
        view: frmModal,
        actionController: "/Slide/LlenarSecciones/",
        selectValue: seccion,
        cantItems: 1
    }).createBasicCombo();

    return false;
}

function BorrarImagenSlide() {
    BorrarInputFile('inputFileImagen');

    $("#imgPicture").attr("src", "/Images/imgNoDisp.png");

    $("#divFormatoFotoIncorrecto").addClass("hidden");
}

function GuardarSlide() {
    $("#divFormatoFotoIncorrecto").addClass("hidden");

    $('#slide_header_en').val(CKEDITOR.instances.slide_header_en.getData());
    $('#slide_header_es').val(CKEDITOR.instances.slide_header_es.getData());

    if (ValidarArchivo("inputFileImagen", formatosImagenesValidas)) {
        if ($("#SlideForm").valid()) {
            $("#btnGuardarSlide").button('loading');
            var formData = new FormData($("#SlideForm")[0]);

            $.ajax({
                url: '/Slide/GuardarSlide',
                type: 'POST',
                data: formData,
                cache: false,
                contentType: false,
                processData: false
            })
            .success(function (data) {
                if (data.IsEverythingGood == true) {
                    ReloadTable("TablaSlide", true);
                    $("#dialog").modal("hide");
                }
                else if (data.IsRedirect) {
                    window.location.href = "/Home/Login";
                }
            }).always(function (data) {
                $("#btnGuardarSlide").button('reset');
                CargarAlertas(frmModal);
            });
        }
    }
    else {
        $("#divFormatoFotoIncorrecto").removeClass("hidden");
    }

    return false;
}
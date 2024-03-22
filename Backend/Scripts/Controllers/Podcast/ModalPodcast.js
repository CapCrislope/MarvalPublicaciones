var identif = "Modal";
var formatosImagenesValidas = ['jpg', 'jpeg', 'png', 'bmp'];

function IniciarCombosHomePodcast(areasPracticas, autores) {
    new Combo({
        name: "AreasPracticas",
        view: identif,
        actionController: "/AreaPractica/LlenarAreasPracticas/",
        selectValue: areasPracticas
    }).createBasicCombo();

    new Combo({
        name: "Autores",
        view: identif,
        actionController: "/Profesional/LlenarProfesionales/",
        selectValue: autores
    }).createBasicCombo();

    return false;
}

function GuardarPodcast() {
    ;
    if (!$("#PodcastForm").valid()) {
        return;
    }

    $("#btn-guardar").addClass("disabled");

    $("#divFormatoFotoIncorrecto").addClass("hidden");

    if (!ValidarArchivo("inputFilePicture", formatosImagenesValidas)) {
        $("#divFormatoFotoIncorrecto").removeClass("hidden");
        return;
    }

    $('#Podcast_MetaDescription_en').val(CKEDITOR.instances.Podcast_MetaDescription_en.getData());
    $('#Podcast_MetaDescription_es').val(CKEDITOR.instances.Podcast_MetaDescription_es.getData());

    var formData = new FormData($("#PodcastForm")[0]);
    
    $.ajax({
        url: '/Podcast/GuardarPodcast',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    })
        .success(function (data) {
            if (data.IsEverythingGood == true) {
                ReloadTable("TablaPodcast", true);
                $("#dialog").modal("hide");
            }
            else if (data.IsRedirect) {
                window.location.href = "/Home/Login";
            }
            $("#btn-guardar").removeClass("disabled");
        }).always(function (data) {
            CargarAlertas(frmModal);
        });

    return false;
}

function BorrarPicturePodcast() {
    
    BorrarInputFile('inputFilePicture');

    $("#imgPicture").attr("src", "/Images/imgNoDisp.png");
    $("#imgPicture").attr("title", "Imagen no disponible");

    $("#divFormatoFotoIncorrecto").addClass("hidden");
}
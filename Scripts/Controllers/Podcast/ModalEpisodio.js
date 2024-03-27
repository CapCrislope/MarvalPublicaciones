var formatosImagenesValidas = ['jpg', 'jpeg', 'png', 'bmp'];

var identif = "Modal";

function IniciarCombosEpisodios(areasPracticas, autores) {
    new Combo({
        name: "AreasPracticas",
        view: identif,
        actionController: "/AreaPractica/LlenarAreasPracticas/",
        selectValue: areasPracticas
    }).createBasicCombo();

    new Combo({
        name: "Autores",
        view: identif,
        actionController: "/Profesional/LlenarComboSpeakers/",
        selectValue: autores
    }).createBasicCombo();

    return false;
}


function GuardarEpisodio() {
    
    var idPodcast = $("#Episodio_PodcastId").val()
    if (!$("#EpisodioForm").valid()) {
        return;
    }

    $("#divFormatoFotoIncorrecto").addClass("hidden");

    if (!ValidarArchivo("inputFilePicture", formatosImagenesValidas)) {
        $("#divFormatoFotoIncorrecto").removeClass("hidden");
        return;
    }

    var spotify = $("#Episodio_SpotifyLink").val();
    var iTunes = $("#Episodio_ITunesLink").val();

    if ((spotify == "" || spotify == undefined) && (iTunes == "" || iTunes == undefined)) {
        $("#links").html("<p class='text-danger'>Debes ingresar al menos un link</p>");
        return;
    }

    $("#links").empty();

    var formData = new FormData($("#EpisodioForm")[0]);

    $("#btn-guardar-episodio").addClass("disabled")

    $.ajax({
        type: 'POST',
        url: '/Podcast/GuardarEpisodio',
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    }).done(function (data) {
        
        if (data.IsEverythingGood) {
            ReloadTable("TablaEpisodio" + idPodcast, true);
            $("#dialog").modal('hide');
        }
    }).fail()
        .always(function (data) {
            CargarAlertas(frmModal);

        $("#btn-guardar-episodio").removeClass("disabled")
    })

}
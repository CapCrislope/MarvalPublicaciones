function MenuBlack() {
    $(".nav-carrera-container")
        .addClass("nav-carrera-container-black")
}

async function CargarSeccionesModoMarval() {
    await CargarHeaderModoMarval();
    await AnimarHeaderModoMarval();
    CargarMosaicoModoMarval();

}

function CargarHeaderModoMarval() {
    return new Promise((resolve, reject) => {
        $("#HeaderModoMarval").load("/ModoMarval/Header", function (response, status, xhr) {
            if (status == "success") {
                resolve();
            }
        })
    })
}

function CargarMosaicoModoMarval() {

    $("#MosaicoModoMarval").load("/ModoMarval/Mosaico", function (response, status, xhr) {
        if (status == "success") {
            if ($('#MosaicoModoMarval .loadNext').length) {
                document.querySelector("#MosaicoModoMarval .loadNext").dataset.func = "CargarEspaciosModoMarval";
                document.querySelectorAll("#MosaicoModoMarval .loadNext").forEach(el => { obsLoad.observe(el) });
            }
            else
                CargarEspaciosModoMarval();
        }
    });
}

function CargarEspaciosModoMarval() {
    $("#EspaciosModoMarval").load("/ModoMarval/Espacios", function (response, status, xhr) {
        if (status == "success") {
            if ($('#EspaciosModoMarval .loadNext').length) {
                document.querySelector("#EspaciosModoMarval .loadNext").dataset.func = "CargarEvolucionModoMarval";
                document.querySelectorAll("#EspaciosModoMarval .loadNext").forEach(el => { obsLoad.observe(el) });
            }
            else
                CargarEspaciosModoMarval();
        }
    })
}

function CargarEvolucionModoMarval() {
    $("#EvolucionModoMarval").load("/ModoMarval/Evolucion", function (response, status, xhr) {
        if (status == "success") {
            if ($('#EvolucionModoMarval .loadNext').length) {
                document.querySelector("#EvolucionModoMarval .loadNext").dataset.func = "CargarModosModoMarval";
                document.querySelectorAll("#EvolucionModoMarval .loadNext").forEach(el => { obsLoad.observe(el) });
            }
            else
                CargarModosModoMarval();
        }
    })

}

function CargarModosModoMarval() {
    $("#ModosModoMarval").load("/ModoMarval/CarruselModos", function (response, status, xhr) {
        if (status == "success") {
            if ($('#ModosModoMarval .loadNext').length) {
                document.querySelector("#ModosModoMarval .loadNext").dataset.func = "CargarVideosProtagonistasModoMarval";
                document.querySelectorAll("#ModosModoMarval .loadNext").forEach(el => { obsLoad.observe(el) });
            }
            else
                CargarVideosProtagonistasModoMarval();
        }
    })
}

function CargarVideosProtagonistasModoMarval() {
    $("#VideosProtagonistasModoMarval").load("/ModoMarval/VideosProtagonistas", function (response, status, xhr) {
        if (status == "success") {
            if ($('#VideosProtagonistasModoMarval .loadNext').length) {
                document.querySelector("#VideosProtagonistasModoMarval .loadNext").dataset.func = "CargarFooter";
                document.querySelectorAll("#VideosProtagonistasModoMarval .loadNext").forEach(el => { obsLoad.observe(el) });
            }
        }
    })
}

function MostrarVideo() {
    $(".header-card-video").on("click", function () {

        let url = $(this).data("url");

        let nombre = $(this).parent(".card-video-protagonista").find(".nombre span").html();

        $("#dialog-personalizado").load("/ModoMarval/ModalVideoEmbebido", { video: url, nombreProtagonista: nombre }, function (response, status, xhr) {
            if (status == "success") {
                AbrirModalPersonalizado();
            }
        })
    })

}

function ExpandirTodosVideos(j) {
    let container = $(".sub-card-container");

    let vermas = $(j).children(".ver-mas")
    let vermenos = $(j).children(".ver-menos")
    let material = $(j).children(".material-icons");

    if (!container.hasClass("sub-card-container-abierto")) {
        container.addClass("sub-card-container-abierto");

        vermas.addClass("d-none");
        vermenos.removeClass("d-none");
        material.addClass("dar-vuelta")

        return;
    }

    vermas.removeClass("d-none");
    vermenos.addClass("d-none");
    material.removeClass("dar-vuelta")

    container.removeClass("sub-card-container-abierto");

}

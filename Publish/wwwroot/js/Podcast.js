var frmPodcast = 'Podcast';

function CargarPanelEpisodios(nroPag = 1) {

    var object = {
        IdPodcast: $("#hPodcastId").val(),
        NroPag: nroPag
    };

    $("#pnlContenido").load("/Podcasts/ObtenerEpisodios", { q: object }, function (xhr, status, response) {
        if (status == "success") {

        }
    })
}

function ChangePagePagination(nroPag) {
    var esDetalle = $("#hPodcastId").val() ?? false;
    if (esDetalle) {
        CargarPanelEpisodios(nroPag)
    } else {
        BuscarEpisodios(nroPag);
    }
    
    UpTo(".seccion-header");
}

function InicializarCombosBusqueda() {

    var initValueArea = JSON.parse('[' + $('#hAreas' + frmPodcast).val() + ']');

    const promise1 = new Promise((resolve, reject) => {
        new Combo({
            name: "Areas",
            view: frmPodcast,
            actionController: "/AreasPracticas/ObtenerComboAreas/",
            myClass: "combo",
            selectValue: initValueArea,
            cantItems: 1,
            callback: function () {
                refreshScrollbar();
                resolve();
            }
        }).createBasicCombo();
    });

    Promise.all([promise1]).then((values) => {
        validarSearchParams();
    });
}

function CargarBuscador() {
    $("#pnlBuscador").load("/Podcasts/Buscador", function (response, status, xhr) {
        if (status == "success") {

        }
    })
}


function ObtenerNombreProfesional(idProfesional) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: '/Profesionales/ObtenerProfesional',
            data: {
                idProfesional: idProfesional
            },
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            }
        })
    })
}

function BuscarEpisodios(nroPag = 1) {

    const promise = AnimacionBuscar();

    promise.then(async (values) => {
        let inputArea = $("#ddlAreasPodcast + .selectize-control .item").html();
        let inputKey = $("#Palabras").val();
        let inputProfesional = $("#hProfesional" + frmPodcast).val();
        let inputFDesde = $("#FechaDesde").val();
        let inputFHasta = $("#FechaHasta").val();

        if (inputProfesional != '' && inputProfesional != null && inputProfesional != undefined) {
            inputKey = await ObtenerNombreProfesional(inputProfesional);
        }

        let arrDatos = [inputKey ?? '', inputArea ?? '', inputFDesde ?? '', inputFHasta ?? '']
        arrDatos = arrDatos.filter((str) => str !== '');

        let datosBusqueda = arrDatos.join(' - ');

        $("#nroResultados").html('...');

        $("#datosBusqueda").html(datosBusqueda);

        $("#NroPag").val(nroPag);
        $("#pnlContenido").load("Podcasts/ObtenerEpisodios", $("#frmBusqueda" + frmPodcast).serialize(), function (response, status, xhr) {
            if (status == "success") {
                $("#pnlRecientes").html("");
                $("#hProfesional" + frmPodcast).val('');
            }
        });
    });

        

}

function VolverAlBuscador() {
    const promise = AnimacionVolverAlBuscador();
    promise.then((values) => {
        CargarContenidoInicial();
    });
}

function CargarContenidoInicial() {
    $("#pnlRecientes").load("/Podcasts/ContenidoInicial", function (response, status, xhr) {
        if (status == "success") {
            $("#pnlContenido").html("")
        }
    })
}

function validarSearchParams() {

    let doSearch = localStorage.getItem("doSearch");

    if (doSearch != "0" && doSearch != null && doSearch != "") {
        localStorage.setItem("doSearch", 0);
        BuscarEpisodios();
    }
    else {
        CargarContenidoInicial();
    }

}
var frmEventos = 'Eventos';

function CargarBuscador() {
    $("#pnlBuscador").load("/Eventos/Buscador", function (response, status, xhr) {
        if (status == "success") {

        }
    })
}

function InicializarCombosBusqueda() {

    var initValueArea = JSON.parse('[' + $('#hAreas' + frmEventos).val() + ']');
    
    const promise1 = new Promise((resolve, reject) => {
        new Combo({
            name: "Areas",
            view: frmEventos,
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

async function BuscarEventos(nroPag = 1) {

    const promise = AnimacionBuscar();

    $("#pnlEventosRecientes").html("");

    promise.then(async (values) => {
        let inputArea = $("#ddlAreasEventos + .selectize-control .item").html();
        let inputKey = $("#Palabras").val();
        let inputFDesde = $("#FechaDesde").val();
        let inputFHasta = $("#FechaHasta").val();
        let inputProfesional = $("#hProfesional" + frmEventos).val();

        if (inputProfesional != '' && inputProfesional != null && inputProfesional != undefined) {
            inputKey = await ObtenerNombreProfesional(inputProfesional);
        }

        let arrDatos = [inputKey ?? '', inputArea ?? '', inputFDesde ?? '', inputFHasta ?? '']
        arrDatos = arrDatos.filter((str) => str !== '');

        let datosBusqueda = arrDatos.join(' - ');

        $("#nroResultados").html('...');

        $("#datosBusqueda").html(datosBusqueda);

        $("#NroPag").val(nroPag);
        $("#pnlContenido").load("/Eventos/ObtenerEventosPorParams", $("#frmBusqueda" + frmEventos).serialize(), function (response, status, xhr) {
            if (status == "success") {
              $("#hProfesional" + frmEventos).val('');
            }
        });
    });

}

function VolverAlBuscador() {

    const promise = AnimacionVolverAlBuscador();
    $("#pnlContenido").html("");
    promise.then((values) => {
        CargarContenidoInicial();
    });
}

function ChangePagePagination(nroPag) {
    var aux = $("#Identif").val()
    if (aux == "Inicial") {
        CargarContenidoInicial(nroPag);
    } else {
        $("#NroPag").val(nroPag);
        $("#pnlContenido").load("/Eventos/ObtenerEventosPorParams", $("#frmBusqueda" + frmEventos).serialize(), function (response, status, xhr) {
            if (status == "success") {
                $("#hProfesional" + frmEventos).val('');
            }
        });
    }

    //scroll.scrollTo("#pnlContenido", { 'offset': -50 });
    UpTo(".seccion-container");
}

function CargarContenidoInicial(nroPag = 1) {
    $("#NroPag").val(nroPag);

    $("#pnlEventosRecientes").load("/Eventos/ContenidoInicialEventos", { NroPag: nroPag }, function (response, status, xhr) {
        if (status == "success") {

        }
    })
}

function validarSearchParams() {

    let doSearch = localStorage.getItem("doSearch");

    if (doSearch != "0" && doSearch != null && doSearch != "") {
        localStorage.setItem("doSearch", 0);
        BuscarEventos();
    }
    else {
        CargarContenidoInicial();
    }

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

function CargarPanelProfesionalesAlternativo(idEvento) {

    $("#pnl-profesionales-evento").load("/Profesionales/ProfesionalesAlternativoEdicionEventos", { idEvento: idEvento }, function (xhr, response, status) {
        if (status == "success") {

        }
    })

}

function GetPanelAgenda(idEdicionEvento) {
    $("#pnl-agenda-evento").load("/Eventos/GetPanelAgenda", { idEdicionEvento: idEdicionEvento }, function (xhr, status, response) {
        if (status == "success") {
            if (xhr == '') {
                $("#nav-agenda").css("display", "none");
            }
        }
    })
}

function InicializarAgenda(idEdicionEvento) {

    var wDesktop = window.matchMedia('(min-width: 1024px)');

    if (wDesktop.matches) {
        $("#seleccion-dias").css("display", "grid")

        $(".s-dia").on("click", function () {
            $(".s-dia").removeClass("dia-seleccionado-agenda");
            $(this).addClass("dia-seleccionado-agenda");
            GetDetalleAgenda($(this).data("id"))
        })

        return;
    }

    $(".agenda-header form").css("display", "flex")

    ObtenerComboAgenda(idEdicionEvento);
}

function GetDetalleAgenda(idAgenda) {

    idAgenda = idAgenda ?? $("#hFechaAgenda_PanelAgenda").val();

    $("#cont-agenda").load("/Eventos/GetDetalleAgenda", { idAgenda: idAgenda }, function (xhr, status, response) {
        if (status == "success") {

        }
    })
}

function GetContenidoExtra(idEdicionEvento) {
    $("#pnl-contenido-extra").load("/Eventos/GetContenidoExtra", { idEdicionEvento: idEdicionEvento }, function (response, status, xhr) {
        if (status == "success") {
            if (response == '') {
                $("#nav-contextra").css("display", "none");
            }
        }
    })
}



var players = {};
let currentPlayingVideoId = null;

async function ReproducirPausar(event) {
    var iframe = $(event.currentTarget).find("iframe");

    var iframeId = iframe.attr("id");

    if (players[iframeId] != null || players[iframeId] != undefined) {
        return;
    }

    currentPlayingVideoId = iframeId;
    await initializePlayer(iframeId);

}

async function initializePlayer(iframeId) {
    return new Promise((resolve, reject) => {
        players[iframeId] = new YT.Player(iframeId, {
            events: {
                'onReady': function (event) {
                    onPlayerReady(event, iframeId);
                    SetearReproduciendose(iframeId);
                    var player = players[iframeId];
                    player.playVideo();
                    resolve();
                },
                //'onStateChange': function (event) {
                //    onPlayerStateChange(event, iframeId);
                //}
            }
        });
    });
}

function onPlayerReady(event, iframeId) {
    if (!event.target.initializedClickEvent) {
        event.target.initializedClickEvent = true;
        const player = players[iframeId];

        //SetearPausaCuandoSaleDeLaPantalla(iframeId);

        $('#' + iframeId).closest('.video-wrapper').on('click', function () {
            // Pausar el video actual si hay uno reproduciéndose
            if (currentPlayingVideoId && currentPlayingVideoId !== iframeId) {
                const currentPlayer = players[currentPlayingVideoId];
                currentPlayer.pauseVideo();
            }

            // Establece el video actual a este video
            currentPlayingVideoId = iframeId;

            var o = ObtenerReproduciendo(iframeId);

            if (o) {
                player.pauseVideo();
                SetearReproduciendose(iframeId, false)
            } else {
                player.playVideo();
                SetearReproduciendose(iframeId)
            }

        });
    }
}


function SetearReproduciendose(iframeId, r = true){
    $("#" + iframeId).data("reproduciendo", r);
}

function ObtenerReproduciendo(iframeId) {
    return $("#" + iframeId).data("reproduciendo")
}

function ObtenerComboRegistrarse() {
    var initValueArea = JSON.parse('[' + $('#hRegistrarseDetalleEvento').val() + ']');

    const promise1 = new Promise((resolve, reject) => {
        new Combo({
            name: "Registrarse",
            view: "DetalleEvento",
            actionController: "/Eventos/ObtenerComboRegistrarse/",
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

function ObtenerComboAgenda(idEdicionEvento) {
    var initValueArea = JSON.parse('[' + $('#hFechaAgenda_PanelAgenda').val() + ']');


    const promise1 = new Promise((resolve, reject) => {
        new Combo({
            name: "FechaAgenda",
            view: "_PanelAgenda",
            actionController: "/Eventos/ObtenerComboFechaAgenda/",
            myClass: "combo",
            selectValue: initValueArea,
            cantItems: 1,
            search: idEdicionEvento,
            change: GetDetalleAgenda,
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

function AbrirModalDynamicsForEvento(formId, formEventoID) {
    $("#dialog-personalizado").load("/Eventos/ModalInscripcion", { formId: formId, formEventoId: formEventoID }, function (response, status, xhr) {
        if (status == "success") {
            AbrirModalPersonalizado();
        }
    })
}

function CargarFormularioDynamicsForEvento(selector, idForm, readableEventId) {
    
    let formApiBaseUrl = 'https://public-usa.mkt.dynamics.com/api/v1.0/orgs/a91d8d7d-758d-ee11-8172-6045bdd4f42a/eventmanagement';
    let formUrl = 'https://assets-usa.mkt.dynamics.com/a91d8d7d-758d-ee11-8172-6045bdd4f42a/digitalassets/forms/' + idForm;

    const elem = document.querySelector(selector);
    if (elem != undefined) {
        let extensions = {
            'data-readable-event-id': readableEventId
        };
        
        elem.appendChild(d365mktforms.createForm(
            idForm,
            formApiBaseUrl,
            formUrl,
            extensions));
    }
}


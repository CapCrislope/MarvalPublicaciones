function MenuBlack() {
  $(".nav-carrera-container")
    .addClass("nav-carrera-container-black")
}

function CargarHeaderDiversidad() {
    $("#Header").load("/Diversidad/Header", function (response, status, xhr) {
        if (status == "success") {
            if ($('#Header .loadNext').length) {
                document.querySelector("#Header .loadNext").dataset.func = "CargarCulturaDiversidad";
                document.querySelectorAll("#Header .loadNext").forEach(el => { obsLoad.observe(el) });
            }
            else
                CargarCulturaDiversidad();
        }
    })
}

function CargarCulturaDiversidad() {
    $("#Cultura").load("/Diversidad/Cultura", function (response, status, xhr) {
        if (status == "success") {
            if ($('#Cultura .loadNext').length) {
                document.querySelector("#Cultura .loadNext").dataset.func = "CargarIgualdadDiversidad";
                document.querySelectorAll("#Cultura .loadNext").forEach(el => { obsLoad.observe(el) });
            }
            else
                CargarIgualdadDiversidad();
        }
    })
}

function CargarIgualdadDiversidad() {
    $("#Igualdad").load("/Diversidad/Igualdad", function (respnse, status, xhr) {
        if (status == "success") {
            if ($('#Igualdad .loadNext').length) {
                document.querySelector("#Igualdad .loadNext").dataset.func = "CargarModoDiversidad";
                document.querySelectorAll("#Igualdad .loadNext").forEach(el => { obsLoad.observe(el) });
            }
            else
                CargarModoDiversidad();
        }
    })
}

function CargarModoDiversidad() {
    $("#ModoDiversidad").load("/Diversidad/ModoDiversidad", function (response, status, xhr) {
        if (status == "success") {
            if ($('#ModoDiversidad .loadNext').length) {
                document.querySelector("#ModoDiversidad .loadNext").dataset.func = "CargarComiteDiversidad";
                document.querySelectorAll("#ModoDiversidad .loadNext").forEach(el => { obsLoad.observe(el) });
            }
            else
                CargarComiteDiversidad();
        }
    })
}

function CargarComiteDiversidad() {
    $("#ComiteDiversidad").load("/Diversidad/Comite", function (response, status, xhr) {
        if (status == "success") {
            if ($('#ComiteDiversidad .loadNext').length) {
                document.querySelector("#ComiteDiversidad .loadNext").dataset.func = "CargarTripticoDiversidad";
                document.querySelectorAll("#ComiteDiversidad .loadNext").forEach(el => { obsLoad.observe(el) });
            }
            else
                CargarTripticoDiversidad();
        }
    })
}

function CargarTripticoDiversidad() {
    $("#TripticoDiversidad").load("/Diversidad/Triptico", function (response, status, xhr) {
        if (status == "success") {
            if ($('#TripticoDiversidad .loadNext').length) {
                document.querySelector("#TripticoDiversidad .loadNext").dataset.func = "CargarCarruselDiversidad";
                document.querySelectorAll("#TripticoDiversidad .loadNext").forEach(el => { obsLoad.observe(el) });
            }
            else
                CargarCarruselDiversidad();
        }
    })
}

function CargarCarruselDiversidad() {
    $("#CarruselDiversidad").load("/Diversidad/Carrusel", function (response, status, xhr) {
        if (status == "success") {
            if ($('#CarruselDiversidad .loadNext').length) {
                document.querySelector("#CarruselDiversidad .loadNext").dataset.func = "CargarReconocimientosDiversidad";
                document.querySelectorAll("#CarruselDiversidad .loadNext").forEach(el => { obsLoad.observe(el) });
            }
            else
                CargarReconocimientosDiversidad();
        }
    })
}

function CargarReconocimientosDiversidad() {
    $("#ReconocimientosDiversidad").load("/Premios/PanelPremioByDiversidad", function (response, status, xhr) {
        if (status == "success") {
          CargarFooter();
        }
    })
}
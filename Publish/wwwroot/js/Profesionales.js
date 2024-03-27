
var frmProfesionales = 'Profesionales';

function CargarContenidoRelacionado() {

  $("#pnlInsightsRel").load("/Insights/ObtenerInsightsRelPorProfesional", { idProfesional: idProfesional }, function (response, status, xhr) {
    if (status == "success") {
    }
  });

  $("#pnlEventosRel").load("/Eventos/ObtenerEventosRelPorProfesional", { idProfesional: idProfesional }, function (response, status, xhr) {
    if (status == "success") {
    }
  });

  $("#pnlNovedadesRel").load("/Novedades/ObtenerNovedadesRelPorProfesional", { idProfesional: idProfesional }, function (response, status, xhr) {
    if (status == "success") {
    }
  });

  $("#pnlPodcastRel").load("/Podcasts/ObtenerPodcastsRelPorProfesional", { idProfesional: idProfesional }, function (response, status, xhr) {
    if (status == "success") {
    }
  });

}

function CargarBuscador() {
    $("#pnlBuscador").load("/Profesionales/Buscador", function (response, status, xhr) {
        if (status == "success") {

        }
    })
}

function CargarCombosBuscador() {

    var initValueArea = JSON.parse('[' + $('#hAreas' + frmProfesionales).val() + ']');
    var initValuePosicion = JSON.parse('[' + $('#hPosiciones' + frmProfesionales).val() + ']');
    var initValueIdioma = JSON.parse('[' + $('#hIdiomas' + frmProfesionales).val() + ']');

    const promise1 = new Promise((resolve, reject) => {
        new Combo({
            name: "Areas",
            view: frmProfesionales,
            actionController: "/Profesionales/GetAreasPracticas/",
            myClass: "combo",
            selectValue: initValueArea,
            cantItems: 1,
            callback: function () {
                refreshScrollbar();
                resolve();
            }
        }).createBasicCombo();
    });

    const promise2 = new Promise((resolve, reject) => {
        new Combo({
            name: "Posiciones",
            view: frmProfesionales,
            actionController: "/Profesionales/GetPosiciones/",
            myClass: "combo",
            selectValue: initValuePosicion,
            cantItems: 1,
            callback: function () {
                refreshScrollbar();
                resolve();
            }
        }).createBasicCombo();
    });

    const promise3 = new Promise((resolve, reject) => {
        new Combo({
            name: "Idiomas",
            view: frmProfesionales,
            actionController: "/Profesionales/GetIdiomas/",
            myClass: "combo",
            selectValue: initValueIdioma,
            cantItems: 1,
            callback: function () {
                refreshScrollbar();
                resolve();
            }
        }).createBasicCombo();
    });

    

}

function BuscarProfesionales(nroPag = 1) {
    let inputPosiciones = $("#ddlPosicionesProfesionales + .selectize-control .item").html();
    let inputAreas = $("#ddlAreasProfesionales + .selectize-control .item").html();
    let inputIdiomas = $("#ddlIdiomasProfesionales + .selectize-control .item").html();
    let inputKey = $("#Palabras").val();
    let inputInicial = $("#InicialApellido").val();

    let arrDatos = [inputKey ?? '', inputPosiciones ?? '', inputAreas ?? '', inputIdiomas ?? '', inputInicial ?? '']
    arrDatos = arrDatos.filter((str) => str !== '');
    
    if (arrDatos == '') {
        MostrarError("CamposVacios");
        return;
    } else {
        MostrarError("CamposVacios", false)
    }

    if (inputPosiciones
        && !inputAreas
        && !inputIdiomas
        && !inputKey
        && !inputInicial) {
        MostrarError("SeleccionarMasCampos")
        return;
    } else {
        MostrarError("SeleccionarMasCampos", false)
    }

    const promise = AnimacionBuscar();

    promise.then((values) => {
        
        let datosBusqueda = arrDatos.join(' - ');

        $("#nroResultados").html('...');

        $("#datosBusqueda").html(datosBusqueda);

        $("#NroPag").val(nroPag);
        $("#pnlContenido").load("/Profesionales/GetProfesionalesByParams", $("#frmBusqueda" + frmProfesionales).serialize(), function (response, status, xhr) {
            if (status == "success") {

            }
        });
    });
}

function MostrarError(tipoError, mostrar = true) {

    if (mostrar) {
        gsap.to(".error-buscador-profesionales", {
            opacity: 1,
            duration: 0.5
        })

        if (tipoError == "CamposVacios") {
            $("#ErrorCamposVacios").removeClass("d-none");
            $("#ErrorSeleccionarMasCampos").addClass("d-none");
        } else {
            $("#ErrorSeleccionarMasCampos").removeClass("d-none");
            $("#ErrorCamposVacios").addClass("d-none");
        }
    } else {
        gsap.to(".error-buscador-profesionales", {
            opacity: 0,
            duration: 0.5
        })
        $("#ErrorCamposVacios").addClass("d-none");
        $("#ErrorSeleccionarMasCampos").addClass("d-none");
    }
}
function SetearLetra(letra) {
    $("#InicialApellido").val(letra)
}

function VolverAlBuscador() {

    const promise = AnimacionVolverAlBuscador();
    $("#InicialApellido").val("")
    $("#pnlContenido").html("");
}

function ChangePagePagination(nroPag) {
    BuscarProfesionales(nroPag);
    //scroll.scrollTo("#pnlContenido", { 'offset': -50 });
    UpTo("#pnlContenido");
}

function ChangePagePaginationProfesionalesBuscador(nroPag) {
    var palabras = $("#palabras").val();
    $("#pnlContenido").load("/Profesionales/ProfesionalesParaBuscador", { Palabras: palabras, NroPag: nroPag }, function (response, status, xhr) {

        if (status == "success") {

        }

    })
    UpTo(".nav-detalle");
}


function ExpandirProfesionalesAlternativo() {
    let c = $(".container-profesionales-alternativo-expandir-mas");
    let icon = $(".icon-expandir-mas-profesional-alternativo");

    if (!c.hasClass("container-profesionales-alternativo-expandir-mas-abierto")) {
        c.addClass("container-profesionales-alternativo-expandir-mas-abierto");
        icon.find(".ver-todos").addClass("d-none");
        icon.find(".contraer").removeClass("d-none");
        icon.find(".expand_more").addClass("expand_more-abierto");
        return;
    }

    c.removeClass("container-profesionales-alternativo-expandir-mas-abierto");
    icon.find(".ver-todos").removeClass("d-none");
    icon.find(".contraer").addClass("d-none");
    icon.find(".expand_more").removeClass("expand_more-abierto");
}
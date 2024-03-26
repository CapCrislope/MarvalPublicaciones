var frmPremio = 'Premios';
var frmPremioAlternativ = 'PremiosAlternativo';

function InicializarCombosBusqueda() {
    ComboYears();

    new Combo({
        name: "Areas",
        view: frmPremio,
        actionController: "/AreasPracticas/ObtenerComboAreasByPremios",
        myClass: "combo",
        change: ComboYears,
        cantItems: 1,
        callback: function () {
            refreshScrollbar();
        }
    }).createBasicCombo();
    
}

function ComboYears() {

    var idArea = $("#hAreas" + frmPremio).val();
    new Combo({
        name: "Years",
        view: frmPremio,
        actionController: "/Premios/GetYearsByArea",
        myClass: "combo",
        change: ObtenerPremios,
        cantItems: 1,
        search: idArea,
        callback: function () {
            var id = $("#ddlYearsPremios")[0].selectize.search().items[0].id;
            $("#ddlYearsPremios")[0].selectize.setValue(id);
            refreshScrollbar();
            
        }
    }).createBasicCombo();
    
}

function InicializarCombosBusquedaAlternativo(idArea) {
    var initValueTipo = JSON.parse('[' + $('#hYears' + frmPremioAlternativ).val() + ']');

    new Combo({
        name: "Years",
        view: frmPremioAlternativ,    
        actionController: "/Premios/GetYearsByArea",
        search: idArea,
        myClass: "combo",
        /*selectValue: initValueTipo,*/
        cantItems: 1,
        change: ObtenerPremiosAlternativos,
        callback: function () {
            var id = $("#ddlYearsPremiosAlternativo")[0].selectize.search().items[0].id;
            $("#ddlYearsPremiosAlternativo")[0].selectize.setValue(id);
        }
    }).createBasicCombo();
}

function ObtenerPremios(nroPag = 1) {
    $("#NroPag").val(nroPag);

    $(".cards-panel-premios").load("/Premios/GetDatosPanelPremios", $("#frmBusqueda" + frmPremio).serialize(), function (response, status, xhr) {
        if (status == "success") {

        }
    })
    
}

function CargarPanel() {
    $("#pnlContenido").load("/Premios/PanelPremios", function (response, status, xhr) {
        if (status == "success") {
            
        }
    })
}

function ObtenerPremiosAlternativos() {

    var qPremio = {
        Areas: parseInt($("#Areas").val()),
        Year: $(".selectize-input div").data("value")
    }

    $(".cards-panel-premios").load("/Premios/GetDatosPanelPremiosAlternativo", qPremio, function (response, status, xhr) {
        if (status == "success") {

        }
    })

}

function CarruselPremios() {
    const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        autoplay: {
            delay: 5000,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
                slidesPerGroup: 2
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 20,
                slidesPerGroup: 3,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 20,
                slidesPerGroup: 4
            },
        }
    });
}

function ChangePagePagination(nroPag) {
    ObtenerPremios(nroPag);
    UpTo("#pnlContenido");
}

function IrAlDetalle(ruta) {
    window.open(ruta, '_black')
}


function ChangePagePaginationPremiosBuscador(nroPag) {
    var palabras = $("#palabras").val();
    $("#pnlContenido").load("/Premios/PremiosParaBuscador", { Palabras: palabras, NroPag: nroPag }, function (response, status, xhr) {

        if (status == "success") {

        }

    })
    UpTo(".nav-detalle");
}

function AbrirPanelPremiosDiversidad() {
    let panel = $(".container-minimizado-premio-diversidad");
    let verMas = $(".ver-mas-button");
    let verMenos = $(".ver-menos-button");
    if (!panel.hasClass("container-minimizado-premio-diversidad-abierto")) {
        panel.addClass("container-minimizado-premio-diversidad-abierto");
        verMas.addClass("d-none");
        verMenos.removeClass("d-none");
        return;
    }
    panel.removeClass("container-minimizado-premio-diversidad-abierto");
    verMas.removeClass("d-none");
    verMenos.addClass("d-none");
}

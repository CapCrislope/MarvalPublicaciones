function ObtenerHeaderAreasPracticas() {
    $("#pnlHeaderAreasPracticas").load("/AreasPracticas/HeaderAreasPracticas", function (response, status, xhr) {
        if (status == "success") {

        }
    })
}

function ObtenerContenidoAreasPracticas() {
    $("#pnlContenido").load("/AreasPracticas/ObtenerAreasPracticas", function (response, status, xhr) {
        if (status == "success") {

        }
    })
}

function AbrirComboHijos(id) {

    var oPadre = $("#" + id);
    var oAbuelo = oPadre.parent().parent();
    var oHijo = $("#card-hijos-" + id);

    var abierto = oPadre.data("abierto");

    if (!abierto) {

        
        oHijo.css({
            "display": "",
            "max-height": ""
        })

        var totalHeight = 0;
        oAbuelo.find("li").each(function () {
            totalHeight += ($(this).outerHeight(true));
        })

        totalHeight += 70;

        var tl1 = gsap.timeline();

        tl1.to(oHijo,
        {
            duration: 0.5,
            maxHeight: totalHeight,
            opacity: 1,
            onComplete: function () {
                oPadre.data("abierto", true);
            }
        });

        tl1.to(oAbuelo, {
            "max-height": totalHeight,
            height: totalHeight,
            duration: 0.5
        }, "-=0.5")

        return;
    }

    var tl2 = gsap.timeline();

    tl2.to(oHijo,
    {
        duration: 0.2,
        maxHeight: 0,
        opacity: 0,
        onComplete: function () {
            oPadre.data("abierto", false);
            oHijo.css("display", "none");
        }
    });

    tl2.to(oAbuelo, {
        "max-height": "60px",
        duration: 0.2
    }, "-=0.2")

    
}

function IrAlDetalle(id, slug) {
    window.location.href = "/areas-de-practica/" + slug + "-" + id;
}

function GetPanelContactos(idArea) {
    $("#pnlContactos").load("/Profesionales/ProfesionalesAreasDePractica", { idAreaPractica: idArea }, function (response, status, xhr) {
        if (status == "success") {
            if (response == "") {
                $(".nav-contactos").css("display", "none");
            } 
        }
    })
}

function CargarContenidos(idArea) {
    GetPanelPremios(idArea);
    
    
    
    
}

function GetPanelPremios(idArea) {
    $("#pnlReconocimientosRel").load("/Premios/PanelPremiosAlternativoByArea", { idArea: idArea }, function (response, status, xhr) {
        if (status == "success") {
            if (response == "") {
                $(".nav-reconocimientos").css("display", "none");
          } 
            GetPanelInsights(idArea);
          
        }
    })
}

function GetPanelInsights(idArea) {
    $("#pnlInsightsRel").load("/Insights/ObtenerInsightsPorArea?idArea=" + idArea, function (response, status, xhr) {
        if (status == "success") {
            if (response == "") {
                $(".nav-insights").css("display", "none");
            } 
            GetPanelEventos(idArea);
            
        }
    })
}

function GetPanelEventos(idArea) {
    $("#pnlEventosRel").load("/Eventos/ObtenerEventosRelPorArea", { idArea: idArea }, function (response, status, xhr) {
        if (status == "success") {
            GetPanelNovedades(idArea);
        }
    })
}

function GetPanelNovedades(idArea) {
    $("#pnlNovedadesRel").load("/Novedades/ObtenerNovedadesRelPorArea", { idArea: idArea }, function (response, status, xhr) {
        if (status == "success") {
            GetPanelPodcast(idArea);
        }
    })
}

function GetPanelPodcast(idArea) {
    $("#pnlPodcastRel").load("/Podcasts/ObtenerPodcastRelPorArea", { idArea: idArea }, function (response, status, xhr) {
        if (status == "success") {

        }
    })
}

function ChangePagePaginationAreasPracticasBuscador(nroPag) {
    var palabras = $("#palabras").val();
    $("#pnlContenido").load("/AreasPracticas/AreasPracticasParaBuscador", { Palabras: palabras, NroPag: nroPag }, function (response, status, xhr) {

        if (status == "success") {

        }

    })
    UpTo(".nav-detalle");
}

function GetPanelProfesionalesLateralByInternationalDesks(idInternationalDesk) {
    $("#pnlContactos-" + idInternationalDesk).load("/Profesionales/ProfesionalesInternationalDesk", { idInternationalDesk: idInternationalDesk }, function (response, status, xhr) {
        if (status == 'success') {
            AnimarInternationalDeskProfesional(idInternationalDesk)
        }
    })
   
}

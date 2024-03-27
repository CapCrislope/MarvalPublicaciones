
function CargarSliderPrincipal() {
  $("#pnlSliderPrincipal").load("/Home/SliderPrincipal", function (response, status, xhr) {
    if (status == "success") {
    }
  });
}

function CargarPerfilFirma() {
    $("#pnlPerfilFirma").load("/Home/PerfilFirma", function (response, status, xhr) {
        if (status == "success") {
            if ($('#pnlPerfilFirma .loadNext').length) {
                document.querySelector("#pnlPerfilFirma .loadNext").dataset.func = "CargarDestacados";
                document.querySelectorAll("#pnlPerfilFirma .loadNext").forEach(el => { obsLoad.observe(el) });
            }
            else
                CargarDestacados();
        }
    });
}

function CargarDestacados() {
  $("#pnlDestacados").load("/Home/Destacados", function (response, status, xhr) {
    if (status == "success") {
      if ($('#pnlDestacados .loadNext').length) {
        document.querySelector("#pnlDestacados .loadNext").dataset.func = "CargarCarruselInsights";
        document.querySelectorAll("#pnlDestacados .loadNext").forEach(el => { obsLoad.observe(el) });
      }
      else
        CargarCarruselInsights();
    }
  });
}

function CargarCarruselInsights() {
  $("#pnlCarruselInsights").load("/Insights/CarruselInsights", function (response, status, xhr) {
    if (status == "success") {
      if ($('#pnlCarruselInsights .loadNext').length) {
        document.querySelector("#pnlCarruselInsights .loadNext").dataset.func = "CargarEventos";
        document.querySelectorAll("#pnlCarruselInsights .loadNext").forEach(el => { obsLoad.observe(el) });
      }
      else
        CargarEventos();
    }
  });
}

function CargarEventos() {
  $("#pnlEventos").load("/Eventos/PanelGeneral", function (response, status, xhr) {
    if (status == "success") {
      if ($('#pnlEventos .loadNext').length) {
        document.querySelector("#pnlEventos .loadNext").dataset.func = "CargarInstitucional";
        document.querySelectorAll("#pnlEventos .loadNext").forEach(el => { obsLoad.observe(el) });
      }
      else
        CargarInstitucional();
    }
  });
}

function CargarInstitucional() {
  $("#pnlInstitucional").load("/Home/PanelInstitucional", function (response, status, xhr) {
    if (status == "success") {
      if ($('#pnlInstitucional .loadNext').length) {
        document.querySelector("#pnlInstitucional .loadNext").dataset.func = "CargarNovedades";
        document.querySelectorAll("#pnlInstitucional .loadNext").forEach(el => { obsLoad.observe(el) });
      }
      else
        CargarNovedades();
    }
  });
}

function CargarNovedades() {
  $("#pnlNovedades").load("/Novedades/PanelGeneral", function (response, status, xhr) {
    if (status == "success") {
      if ($('#pnlNovedades .loadNext').length) {
        document.querySelector("#pnlNovedades .loadNext").dataset.func = "CargarModoMarval";
        document.querySelectorAll("#pnlNovedades .loadNext").forEach(el => { obsLoad.observe(el) });
      }
      else
        CargarModoMarval();
    }
  });
}

function CargarModoMarval() {
  $("#pnlModoMarval").load("/Home/ModoMarval", function (response, status, xhr) {
    if (status == "success") {
      if ($('#pnlModoMarval .loadNext').length) {
        document.querySelector("#pnlModoMarval .loadNext").dataset.func = "CargarBanner";
        document.querySelectorAll("#pnlModoMarval .loadNext").forEach(el => { obsLoad.observe(el) });
      }
      else
        CargarBanner();
    }
  });
}

function ConfigurarPanelInstitucionalCarrusel() {
    
    const swiper = new Swiper('.swiper-panel-institucional', {
        direction: 'horizontal',
        loop: true,
        allowTouchMove: true,
        effect: "slide",
        autoplay: false,
        slidesPerView: 1,
        breakpoints: {
            // cuando la ventana de visualización es >= 320px
            992: {
                slidesPerView: 1.8
            },
        }
    });
}

function PausarCarrusel() {

    var span = $(".btn-pause-play span");

    var carousel = $("#carouselHome");

    if (span.text() == 'pause_circle') {
        span.text('play_circle')
        carousel.carousel('pause');
    } else {
        span.text('pause_circle')
        carousel.carousel('cycle');
    }

}




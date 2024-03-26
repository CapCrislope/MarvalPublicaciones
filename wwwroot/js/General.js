
//Scripts de uso general
var bodyScrollBar;

var publicKey = '6LeSl1MUAAAAAAxATncj9dwdo13aHMfuBWwzu2yF';
var base_url_path = "https://www.marval.com/";

var mje_emailenviado_es = "¡E-mail enviado!";
var mje_emailenviado_en = "E-mail sent!";

function HandlerLanguage() {

  if (Cookies.get("LangForMarval") === undefined) {
    Cookies.set('LangForMarval', 'es');
  }
  var lang = Cookies.get("LangForMarval");
  $(".setLang[lang='" + lang + "']").addClass("active-lang");

  $(".setLang").on("click", function (event) {

    var lang = $(this).attr("lang");

    $(".active-lang").removeClass("active-lang");
    $(this).addClass("active-lang");
    Cookies.set('LangForMarval', lang);
    setNewLanguage(lang);
    location.reload(true);
  });
}

function GetActiveLang() {
    var lang = Cookies.get("LangForMarval");
    return lang;
}

function AbrirYCerrarNav() {

    CerrarBusquedaNavegador();

    var nav = $(".container-nav-menu");
    abierto = nav.data("abierto") ?? false;

    if (abierto) {
        $(".items-nav-menu").removeClass("items-nav-menu-abierto");
        nav.data("abierto", false);
        setTimeout(function () {
            $(".items-nav-menu").css("display", "none");
        }, 500)

        var submenu = $(".submenu-nav-menu");
        submenu.removeClass("submenu-nav-menu-abierto");
        $(".items-nav-menu ul li a").removeClass("border-bottom-nav");
        $("main").css("max-height", "none");
        submenu.data("abierto", false);
        $(".fondo-oscuro-nav").css("display", "none");

        return;
    }
    $(".items-nav-menu").css("display", "flex").promise().then(a => {
        $(".items-nav-menu").addClass("items-nav-menu-abierto");
        $(".fondo-oscuro-nav").css("display", "block");
        nav.data("abierto", true);
    })
    

}

function CerrarBusquedaNavegador() {
    $("#submenu-buscador-menu").removeClass("submenu-buscador-menu-abierto")
    $("#form-buscador-menu #buscador").val("");
}

function AbrirSubmenuDesktop() {
    $(".items-nav-menu ul li a").hover(function () {

        var submenu = $(".submenu-nav-menu");
        
        submenu.removeClass("submenu-nav-menu-abierto");
        $(".items-nav-menu ul li a").removeClass("border-bottom-nav");
        $(".hijo-container-nav").removeClass("hijo-container-nav-abierto");
        $(".nombre-li-submenu .material-icons").removeClass("girar-180");
        CerrarBusquedaNavegador();
        submenu.data("abierto", false);

        var element = $(this);
        element.addClass("border-bottom-nav");

        var expandir = element.data("expandir") ?? false;
        if (!expandir) return;
        
        var href = $(element.attr("href"));

        href.addClass("submenu-nav-menu-abierto");
        href.data("abierto", true);

    })

    $(".lupa-icon-nav-menu").hover(function () {

        $(".submenu-nav-menu").removeClass("submenu-nav-menu-abierto");

        var contenido = $("#submenu-buscador-menu");

        contenido.addClass("submenu-buscador-menu-abierto")

    })

    $(".container-nav-menu").on("mouseleave", function () {
        var submenu = $(".submenu-nav-menu");

        submenu.removeClass("submenu-nav-menu-abierto");
        $(".items-nav-menu ul li a").removeClass("border-bottom-nav");
        $(".hijo-container-nav").removeClass("hijo-container-nav-abierto");
        $(".nombre-li-submenu .material-icons").removeClass("girar-180");
        CerrarBusquedaNavegador();
        submenu.data("abierto", false);

    })

}

function AbrirSubmenuMobile() {

    $(".items-nav-menu ul li a").on("click", function () {

        var element = $(this);

        var expandir = element.data("expandir") ?? false;
        if (!expandir) return;

        var href = $(element.attr("href"));
        var abierto = href.data("abierto") ?? false;

        var submenu = $(".submenu-nav-menu");
        submenu.removeClass("submenu-nav-menu-abierto");
        $(".items-nav-menu ul li a").removeClass("border-bottom-nav");
        $("main").css("max-height", "none");
        submenu.data("abierto", false);

        if (abierto) return;

        href.addClass("submenu-nav-menu-abierto");
        element.addClass("border-bottom-nav");
        $("main").css("max-height", "100vh");
        href.data("abierto", true);
        UpTo("#viewport");
    })

    $(".lupa-icon-nav-menu, .cerrar-buscador-menu").on("click", function () {

        var contenido = $("#submenu-buscador-menu");

        if (contenido.hasClass("submenu-buscador-menu-abierto")) {
            CerrarBusquedaNavegador();
        } else {
            contenido.addClass("submenu-buscador-menu-abierto")
        }

    })

}

function SetearFuncionesNavegador() {

    if ($(window).width() > 768) {
        AbrirSubmenuDesktop();
    } else {
        AbrirSubmenuMobile();
    }

}

function AbrirHijos(id, elemento) {
    var ul = $(".hijo-container-nav");
    var ulId = $("#hijo-submenu-" + id);
    var abierto = ulId.hasClass("hijo-container-nav-abierto");
    ul.removeClass("hijo-container-nav-abierto");
    $(".nombre-li-submenu .material-icons").removeClass("girar-180");
    if (abierto) {
        return;
    }
    ulId.addClass("hijo-container-nav-abierto");
    $(elemento).addClass("girar-180");
}

function Buscador() {

    var palabra = $("#form-buscador-menu #buscador").val()

    if (palabra == '') {
        return;
    }

    window.location.href = "/buscador?q=" + palabra;

}

function BuscadorNavegador(elemento) {

    elemento = $("#" + elemento)

    if ($(window).width() > 768) {

        $(".texto-del-nav").css("opacity", 0.7);
        elemento.css("opacity", 1);

    } else {
        let destacado = $(".nav-detalle .destacada-nav-detalle");
        let destacadoHTML = $(".nav-detalle .destacada-nav-detalle").html();

        let elementoHTML = elemento.html();

        destacado.html(elementoHTML);
        elemento.html(destacadoHTML);

        $(".nav-detalle").removeClass("nav-detalle-abierto")
    }

}

function BuscadorProfesional(palabras, nroPag = 1) {

    //$("#nroResultados").html("...");

    BuscadorNavegador("buscador-profesionales");

    $("#pnlContenido").load("/Profesionales/ProfesionalesParaBuscador", { Palabras: palabras, NroPag: nroPag }, function (response, status, xhr) {

        if (status == "success") {

        }

    })

}

function BuscadorAreasPracticas(palabras, nroPag = 1) {

    //$("#nroResultados").html("...");
    BuscadorNavegador("buscador-areaspracticas");
    $("#pnlContenido").load("/AreasPracticas/AreasPracticasParaBuscador", { Palabras: palabras, NroPag: nroPag }, function (response, status, xhr) {

        if (status == "success") {

        }

    })
}

function BuscadorPremios(palabras, nroPag = 1) {

    //$("#nroResultados").html("...");
    BuscadorNavegador("buscador-premios");
    $("#pnlContenido").load("/Premios/PremiosParaBuscador", { Palabras: palabras, NroPag: nroPag }, function (response, status, xhr) {

        if (status == "success") {

        }

    })
}

function getEmailSuccefull() {
    if (GetActiveLang() == "es") {
        Success(mje_emailenviado_es);
    } else {
        Success(mje_emailenviado_en);
    }
}

function BuscadorContenido(palabra) {

    //$("#nroResultados").html("...");
    BuscadorNavegador("buscador-contenidos");
    $("#pnlContenido").load("/Home/ContenidoBuscador", { palabra: palabra}, function (response, status, xhr) {

        if (status == "success") {

        }

    })
}


function MaximizarMinimizar(pnl, object) {

    let body = $("#body" + pnl);
    object = $(object);
    let footer = $("#footer" + pnl);
    if (!body.hasClass("maximizar-minimizar-abierto")) {

        $(".maximizar-minimizar").removeClass("maximizar-minimizar-abierto");
        $(".cargar-mas-buscador").removeClass("cargar-mas-buscador-mostrar");
        $(".abrir-cerrar-panel-buscador .material-icons").html("add")

        body.addClass("maximizar-minimizar-abierto");
        object.html("minimize");
        let mostrar = footer.data("mostrar") ?? true;
        if (mostrar) {
            footer.addClass("cargar-mas-buscador-mostrar")
        }
        return;
    }

    body.removeClass("maximizar-minimizar-abierto");
    object.html("add");
    footer.removeClass("cargar-mas-buscador-mostrar")
}

function CargarPanelesContenido(palabras) {

    BuscadorInsights(palabras);
    BuscadorEventos(palabras);
    BuscadorNovedades(palabras);
    BuscadorPodcasts(palabras);

    //Promise.all([BuscadorInsights(palabras), BuscadorEventos(palabras), BuscadorNovedades(palabras), BuscadorPodcasts(palabras)])
    //    .then((values) => {
    //        let cantInsights = parseInt($("#totalCountInsights").html() == '' ? 0 : $("#totalCountInsights").html());
    //        let cantEventos = parseInt($("#totalCountEventos").html() == '' ? 0 : $("#totalCountEventos").html());
    //        let cantNovedades = parseInt($("#totalCountNovedades").html() == '' ? 0 : $("#totalCountNovedades").html());
    //        let cantPodcasts = parseInt($("#totalCountPodcasts").html() == '' ? 0 : $("#totalCountPodcasts").html());

    //        let total = cantInsights + cantEventos + cantNovedades + cantPodcasts;
    //        $("#nroResultados").html(total);
    //    })

}

function BuscadorInsights(palabras) {

    return new Promise((resolve, reject) => {
        let pnl = "Insights";

        let contadorInput = $("#contador" + pnl);
        let contador = parseInt(contadorInput.val()) + 1;
        contadorInput.val(contador);

        $.get("/" + pnl + "/" + pnl + "ParaBuscador", { Palabras: palabras, NroPag: contador }, function (data) {

            if (data != '') {
                $("#section-" + pnl).css("display", "block");
            }

            $(data).appendTo("#pnl" + pnl)
            if (contador < parseInt($("#totalPages" + pnl).val())) {
                $("#footer" + pnl).data("mostrar", true)
            } else {
                $("#footer" + pnl).data("mostrar", false)
                $("#footer" + pnl).removeClass("cargar-mas-buscador-mostrar")
            }

            resolve();
        })
    })
    
}

function BuscadorEventos(palabras) {

    return new Promise((resolve, reject) => {
        let pnl = "Eventos";

        let contadorInput = $("#contador" + pnl);
        let contador = parseInt(contadorInput.val()) + 1;
        contadorInput.val(contador);

        $.get("/" + pnl + "/" + pnl + "ParaBuscador", { Palabras: palabras, NroPag: contador }, function (data) {

            if (data != '') {
                $("#section-" + pnl).css("display", "block");
            }

            $(data).appendTo("#pnl" + pnl)
            if (contador < parseInt($("#totalPages" + pnl).val())) {
                $("#footer" + pnl).data("mostrar", true)
            } else {
                $("#footer" + pnl).data("mostrar", false)
                $("#footer" + pnl).removeClass("cargar-mas-buscador-mostrar")
            }

            resolve();
        })
    })

}

function BuscadorNovedades(palabras) {
    return new Promise((resolve, reject) => {
        let pnl = "Novedades";

        let contadorInput = $("#contador" + pnl);
        let contador = parseInt(contadorInput.val()) + 1;
        contadorInput.val(contador);

        $.get("/" + pnl + "/" + pnl + "ParaBuscador", { Palabras: palabras, NroPag: contador }, function (data) {

            if (data != '') {
                $("#section-" + pnl).css("display", "block");
            }

            $(data).appendTo("#pnl" + pnl)
            if (contador < parseInt($("#totalPages" + pnl).val())) {
                $("#footer" + pnl).data("mostrar", true)
            } else {
                $("#footer" + pnl).data("mostrar", false)
                $("#footer" + pnl).removeClass("cargar-mas-buscador-mostrar")
            }

            resolve();
        })
    })
}

function BuscadorPodcasts(palabras) {

    return new Promise((resolve, reject) => {

        let pnl = "Podcasts";

        let contadorInput = $("#contador" + pnl);
        let contador = parseInt(contadorInput.val()) + 1;
        contadorInput.val(contador);

        $.get("/" + pnl + "/" + pnl + "ParaBuscador", { Palabras: palabras, NroPag: contador }, function (data) {

            if (data != '') {
                $("#section-" + pnl).css("display", "block");
            }

            $(data).appendTo("#pnl" + pnl)
            if (contador < parseInt($("#totalPages" + pnl).val())) {
                $("#footer" + pnl).data("mostrar", true)
            } else {
                $("#footer" + pnl).data("mostrar", false)
                $("#footer" + pnl).removeClass("cargar-mas-buscador-mostrar")
            }

            resolve();
        })

    })

}

function setNewLanguage(lang) {

    var path = window.location.href;
    let inicioLang = path.indexOf("lang=") == -1 ? undefined : path.indexOf("lang=");
    let finLang = path.lastIndexOf("lang=") + 7 == 6 ? undefined : path.lastIndexOf("lang=") + 7; 

    let newPath = path;

    if (inicioLang != undefined
        && finLang != undefined) {
        newPath = path.substring(0, inicioLang);
        //newPath += path.substring(finLang);
    }

    let ultimaLinea = newPath[newPath.length - 1];

    if (ultimaLinea == "/" || ultimaLinea == "&") {
        newPath += "lang=" + lang;
    } else {
        newPath += "&lang=" + lang;
    }

    window.location.href = newPath;



  ////Comprobamos que no estamos en Home
  //if (window.location.pathname != "/") {
  //  //Agregamos el idioma al path
  //  var path = window.location.href;
  //  var langPosition = path.lastIndexOf("lang") + 6;
  //  var hasLang = path.substring(langPosition - 1);
  //  var newLocation = path;

  //  if (hasLang == "es" || hasLang == "en") {
  //    newLocation = path.replace("lang=" + hasLang, "lang=" + lang);
  //  } else {
  //    if (newLocation.substring(newLocation.length - 1) == '/')
  //      newLocation = newLocation.substring(0, newLocation.length - 1);

  //    var anclaPosition = path.lastIndexOf("#");
  //    if (anclaPosition > -1)
  //      newLocation = newLocation.substring(0, anclaPosition);

  //    newLocation += "&lang=" + lang;
  //  }
  //  window.history.pushState({ idioma: lang }, "idioma", newLocation);
  //} else {
  //  var newLocation = window.location.href + "lang=" + lang;
  //  window.history.pushState({ idioma: lang }, "idioma", newLocation);
  //}

}

function IniciarLocomotiveScroll(esHome = false) {
  //Scroll Locomotive
  scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    tablet: { smooth: true },
    smartphone: { smooth: true },
    repeat: false
  });

  if (esHome) {
    scroll.on('scroll', (args) => {
      if (scroll.scroll.instance.scroll.y > 0) {
        $("#logo").removeClass("start");
        $("#menu").removeClass("start");
      } else {
        $("#logo").addClass("start");
        $("#menu").addClass("start");
      }
    });
  }
}

function IniciarScrollTrigger(esHome = false) {

    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(TextPlugin);

    // Smooth scroll setup
    var Scrollbar = window.Scrollbar;

    class ModalPlugin extends Scrollbar.ScrollbarPlugin {
        static pluginName = 'modal';

        static defaultOptions = {
            open: false,
        };

        transformDelta(delta) {
            return this.options.open ? { x: 0, y: 0 } : delta;
        }
    }

    // load the plugin
    Scrollbar.use(ModalPlugin);

    bodyScrollBar = Scrollbar.init(document.body, { damping: 0.1, delegateTo: document, plugins: { modal: { open: false } } });

    bodyScrollBar.setPosition(0, 0);
    bodyScrollBar.track.xAxis.element.remove();

    

  //// How to get them to work together
  ScrollTrigger.scrollerProxy("#viewport", {
    scrollTop(value) {
      if (arguments.length) {
        bodyScrollBar.scrollTop = value;
      }
      return bodyScrollBar.scrollTop;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    }
  });

  var fixedElem = document.getElementById('menu');
    var fixedElem2 = document.getElementById('btnSubir');
    var fixedElem3 = document.getElementById('dialog-personalizado');
    var fixedElem4 = document.getElementById('BtnTest');

  bodyScrollBar.addListener(function (status) {
    var offset = status.offset;
      if (fixedElem != null) {
          fixedElem.style.top = offset.y + 'px';
          fixedElem.style.left = offset.x + 'px';
      }

      if (fixedElem2 != null) {
          fixedElem2.style.top = offset.y + (window.innerHeight - 60) + 'px';
          fixedElem2.style.right = 60 + 'px';
      }

      if (fixedElem3 != null) {
          fixedElem3.style.top = offset.y + 'px';
          fixedElem3.style.left = offset.x + 'px';
      }

      if (fixedElem4 != null) {
          fixedElem4.style.top = offset.y + (window.innerHeight - 60) + 'px';
          fixedElem4.style.left = 20 + 'px';
      }

      let btn = $("#btnSubir");
      let mostrar = btn.data("mostrar") ?? false;

      if (offset.y > 0) {
          if (mostrar) {
              btn.removeClass("d-none").promise().then(a => {
                  btn.addClass("btn-subir-activado")
              })
          }
      } else {
          btn.removeClass("btn-subir-activado")
          setTimeout(function () {
              btn.addClass("d-none")
          }, 500)
      }

    if (esHome) {
      if (offset.y > 0) {
        
        $(".menu").removeClass("start");
      } else {
        
        $(".menu").addClass("start");
      }
    }

  });

  //bodyScrollBar.addListener(ScrollTrigger.update);

  // when your smooth scroller updates, tell ScrollTrigger to update() too. 
  bodyScrollBar.addListener(() => {
    ScrollTrigger.update();
  });

  //ScrollTrigger.addEventListener("refresh", () => bodyScrollBar.update());

  //if (esHome) {
  //  document.addEventListener("scroll", (event) => {
  //    scrollPosition = window.scrollY;

  //    if (scrollPosition > 0) {
  //      $("#logo").removeClass("start");
  //      $("#menu").removeClass("start");
  //    } else {
  //      $("#logo").addClass("start");
  //      $("#menu").addClass("start");
  //    }

  //  });
  //}
}

function IniciarIntersectionObservers() {

  //Animación para aparecer secciones cuando entran al viewport
  obsAnimation = new IntersectionObserver(entries => {
    // Loop over the entries
    entries.forEach(entry => {
      // If the element is visible
      if (entry.isIntersecting) {
        // Add the animation class
        entry.target.classList.add('fadeInUp');
        obsAnimation.unobserve(entry.target);
      }
      else
        return;
    });
  });

  obsLoad = new IntersectionObserver(entries => {
    // Loop over the entries
    entries.forEach(entry => {
      // If the element is visible
      if (entry.isIntersecting) {

        if (entry.target.dataset.func != undefined)
          eval(entry.target.dataset.func)();

        obsLoad.unobserve(entry.target);
      }
    }
    );
  }, { rootMargin: '500px' });
}

const toggleMenuOpen = () => {
  document.body.classList.toggle("open");
  $(".pnlSubmenu").removeClass("show");
  $(".nav-link").addClass("collapsed");
}

function refreshScrollbar() {
  Scrollbar.initAll();
}

function UpTo(identif) {
  //$("html,body").animate({
  //  scrollTop: $(identif).offset().top - 50
  //}, "slow")

  bodyScrollBar.scrollIntoView(document.querySelector(identif), {
    offsetTop: 100,
    offsetLeft: 100
  });
    
}

function CargarBanner() {
  $("#pnlBanner").load("/Home/Banner", function (response, status, xhr) {
    if (status == "success") {
      document.querySelector("#pnlBanner .loadNext").dataset.func = "CargarFooter";
      document.querySelectorAll("#pnlBanner .loadNext").forEach(el => { obsLoad.observe(el) });
    }
  });
}

function CargarFooter() {
  $("#pnlFooter").load("/Home/Footer", function (response, status, xhr) {
    if (status == "success") {

    }
  });
}

function CargarMenu() {
    $("#menu").load("/Home/Menu", function (response, status, xhr) {
        if (status == "success") {

        }
    });
}

/********************** DATEPICKER - (CALENDARIO) ***********************************/

function InicializarDatePickers() {

  if ($(".active-lang").attr("lang") == "es") {
    $.fn.datepicker.defaults.format = "dd/mm/yyyy";
  } else {
    $.fn.datepicker.defaults.format = "mm/dd/yyyy";
  }

  $(".date").datepicker({
    clearBtn: true,
    language: $(".active-lang").attr("lang")
  });
  $('.date').on('change', function () {
    $('.datepicker').hide();
  });

  //Formatea la fecha traida de la base, para que no muestre el tiempo
  $.each($(".date > input"), function (index, datepicker) {
    datepicker.value = datepicker.value.split(' ')[0];
  });
}

/************************************************************************************/

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/************** usado en los btn "ver todos" *****************************/
function goToPage(btn) {

  var value = $(btn).attr("data-value");

  if (value != 0 && value != null) {
    localStorage.setItem("data-value", value);
    localStorage.setItem("data-param", $(btn).attr("data-param"));
  } else {
    localStorage.setItem("data-value", 0);
  }

  localStorage.setItem("doSearch", 1);

  window.location.href = $(btn).attr("data-href");

  return true;
}

function ObtenerSearchParams(frm) {

  var value = localStorage.getItem("data-value");

  if (value != "0" && value != null && value != "") {

    //obtengo por que campo debo buscar
    var param = localStorage.getItem("data-param");

    var iValues = value.split(";");
    var iParams = param.split(";");

    for (var i = 0; i < iValues.length; i++) {
      //seteo el campo
        $("#" + iParams[i] + frm).val(iValues[i]); // #hAreasNovedades
    }

    localStorage.removeItem("data-value");
    localStorage.removeItem("data-param");
    localStorage.removeItem("data-href");
  }
}

/**********************************COMPROBACION VISITANTE ID**************************************************/

function ComprobacionVisitanteId(callback, view) {

  //obtener el visitanteId del localStorage
  // opciones : vacio, tiene visitanteId pero no esta registrado, tiene visitanteId y tiene mail en base
  var id = localStorage.userId;

  $.post("/Home/ComprobacionVisitanteId", { VisitanteId: id })
    .done(function (data) {
        if (data.isEverythingGood == true) {
        debugger;
        // si es landing o evento,
        if (view == 'Insight' || view == 'Evento') {
          ModalRegistro(view, id);
        }
        else {
          if (data.existeVisitante == 0) {
            ModalRegistro(view, null);
          }
          else {
            callback();
          }

        }
      }
    })
    .always(function () {
      //CargarAlertas(frmHome);
    })

}

function ModalRegistro(fromView, id) {

  //$("#dialog").load("/Registro/ModalRegistro", { FromModule: fromView, IdVisitante: id }, function (status) {
  //  if (status != "success") {
  //    $("#dialog").modal('show');
  //  }

  //})

}

function AbrirShare() {
  var el = document.getElementsByClassName("share");
  if (el[0].classList.contains('open')) {
    el[0].classList.remove("open");
  } else {
    el[0].classList.add("open");
  }
}

function AbrirLink(url) {
  window.open(url, "_blank");
}

function CortarParrafos(parrafoClass) {

  return new Promise((resolve, reject) => {
    var pnl = $("." + parrafoClass);

    var text = pnl.html();

    var textSpliteado = [];


    if (window.matchMedia('(min-width: 768px)').matches) {

      textSpliteado = text.split('\n')

    } else {

      text = text.replace(/\n/g, " ");
      text = text.trim();

      var widthLetra = '10px';
      var widthPantalla = pnl.css('width');

      var ejecutar = true;

      do {

        var linea = '';
        var sumatoria = 0;

        for (var i = 0; i < text.length; i++) {
          sumatoria += parseInt(widthLetra);
          if (sumatoria >= parseInt(widthPantalla)) {
            for (var j = linea.length - 1; j >= 0; j--) {
              if (linea[j] == ' ' || linea[j + 1] == ' ') {
                var lineaFiltrada = '';

                for (var k = 0; k < j; k++) {
                  lineaFiltrada += linea[k]
                }
                linea = lineaFiltrada;
                break;
              }
            }
            break;
          }
          linea += text[i];
        }

        textSpliteado.push(linea);
        text = text.replace(linea, "");
        if (text.trim() == '') {
          ejecutar = false;
        }
      } while (ejecutar);

    }

    pnl.html('')

    for (var i = 0; i < textSpliteado.length; i++) {

      var html = '<div class="intro-line">' + textSpliteado[i] + '</div>';

      $(html).appendTo(pnl)

    }
    resolve();
  });

}

function AbrirCerrarNavDetalle() {
    let nav = $(".nav-detalle");
    var abierto = nav.hasClass("nav-detalle-abierto") ?? false;


    if (abierto) {
        nav.removeClass("nav-detalle-abierto")
        return;
    }

    nav.addClass("nav-detalle-abierto")

}

function ActivarBotonSubir() {
    $("#btnSubir").data("mostrar", true);
}

function AbrirModalPersonalizado() {
    let dialog = $("#dialog-personalizado");

    if (!dialog.hasClass("dialog-personalizado-abierto")) {
        dialog.removeClass("d-none").promise().then(a => {
            dialog.addClass("dialog-personalizado-abierto")
            //UpTo('#viewport');
        })
        bodyScrollBar.updatePluginOptions('modal', { open: true });
        return;
    }

    dialog.removeClass("dialog-personalizado-abierto");
    bodyScrollBar.updatePluginOptions('modal', { open: false });
    setTimeout(function () {
        dialog.addClass("d-none");
        dialog.html('');
        //d365mkt = undefined;
    }, 500);

}

function CargarModalSuscripcionNewsletter() {
    $("#dialog-personalizado").load("/Home/ModalFormularioSuscripcionNewsletters", function (response, status, xhr) {
        if (status == "success") {
            AbrirModalPersonalizado();
        }
    })
}

function CargarFormularioDynamics(selector, idForm) {

  let formApiBaseUrl = 'https://public-usa.mkt.dynamics.com/api/v1.0/orgs/a91d8d7d-758d-ee11-8172-6045bdd4f42a/landingpageforms';
  let formUrl = 'https://assets-usa.mkt.dynamics.com/a91d8d7d-758d-ee11-8172-6045bdd4f42a/digitalassets/forms/' + idForm;
  
  const elem = document.querySelector(selector);
  if (elem != undefined) {
    elem.appendChild(d365mktforms.createForm(
      idForm,
      formApiBaseUrl,
      formUrl));
  }
}




//function ObtenerAudio(text) {
//    $.ajax({
//        url: '/Home/ObtenerAudio',
//        method: 'GET',
//        xhrFields: {
//            responseType: 'blob'
//        },
//        data: {
//            text: text
//        },
//        success: function (data) {
//            var blob = new Blob([data], { type: 'audio/mpeg' });
//            var url = window.URL.createObjectURL(blob);
//            var audio = new Audio(url);
//            audio.play();
//        }
//    });

//}
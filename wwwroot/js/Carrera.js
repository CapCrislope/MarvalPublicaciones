async function CargarSecciones() {
    await CargarHeader();
    await CargarCarrusel();
    await CargarProposito();
    await CargarModoMarval();
    await CargarOportunidades();
    await CargarReconocimientos();
    CargarFooter();
}

function InicializarCarruselModoMarval() {

    let sections = gsap.utils.toArray(".card-modo-marval");

    gsap.to("#AnimacionCarruselPin", {
        scrollTrigger: {
            trigger: "#AnimacionCarruselPin",
            pin: true,
            scrub: 0.1,
            start: "bottom bottom",
            end: "+=3000",
            scroller: "#viewport",
            //markers: true
        }
    })

    let restar = 1
    if (window.matchMedia('(min-width: 1024px)').matches) {
        restar = 2;
    }

    let scrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - restar),
        ease: "none",
        scrollTrigger: {
            trigger: "#AnimacionCarruselPin",
            //pin: true,
            scrub: 0.1,
            start: "bottom bottom",
            end: "+=3000",
            scroller: "#viewport",
            //markers: true
        }
    });



}


function AbrirCerrarNav() {

    let links = $(".links-nav-carrera");
    let fondo = $(".fondo-oscuro-nav-carrera");

    if (links.hasClass("links-nav-carrera-abierto")) {
        links.removeClass("links-nav-carrera-abierto");
        setTimeout(function () {
            links.css("display", "none")
        }, 500)
        fondo.removeClass("fondo-oscuro-nav-carrera-abierto")
        return;
    }

    links.css("display", "flex").promise().then(a => {
        links.addClass("links-nav-carrera-abierto");
        fondo.addClass("fondo-oscuro-nav-carrera-abierto")
    })
    
}

function CargarHeader() {
    return new Promise((resolve, reject) => {
        $("#HeaderCarrera").load("/Carrera/Header", function (response, status, xhr) {
            if (status == "success") {
                resolve();
            }
        })
    })
    
}

function SetearImagenFondo() {
    bodyScrollBar = Scrollbar.init(document.body, { damping: 0.1, delegateTo: document, plugins: { disableScroll: { direction: 'x' } } });
    var fixedElem = document.getElementById('imagen-fondo');
    bodyScrollBar.addListener(function (status) {
        var offset = status.offset;
        fixedElem.style.top = offset.y + 'px';
        fixedElem.style.left = offset.x + 'px';
    });
}


function CargarProposito() {
    return new Promise((resolve, reject) => {
        $("#Proposito").load("/Carrera/Proposito", function (response, status, xhr) {
            if (status == 'success') {
                resolve();
            }
        })

    })
}




function CargarCarrusel() {
    return new Promise((resolve, reject) => {
        $("#CarruselCarrera").load("/Carrera/Carrusel", function (response, status, xhr) {
            if (status == "success") {
                resolve();
            }
        })
    })
}

function InicializarCarrusel() {
    
}

function iniciarScrollConRetraso(delay = 1000) {

    //let bodyScrollBar2 = Scrollbar.init(document.body, { damping: 0.1, delegateTo: document, plugins: { disableScroll: { direction: 'x' } } });

    //let start = true;

    //setTimeout(function () {
    //    start = false;
    //}, 500)

    //bodyScrollBar2.addListener(() => {
    //    if (start) {
    //        bodyScrollBar2.setPosition(0, 0);
    //    }
    //});

}

function CargarModoMarval() {
    return new Promise((resolve, reject) => {
        $("#ModoMarval").load("/Carrera/ModoMarval", function (response, status, xhr) {
            if (status == "success") {
                resolve();
            }
        })

    })
}

function CargarOportunidades() {
    return new Promise((resolve, reject) => {
        $("#Oportunidades").load("/Carrera/Oportunidades", function (response, status, xhr) {
            if (status == "success") {
                resolve();
            }
        })
    })
}

function CargarReconocimientos() {
    return new Promise((resolve, reject) => {
        $("#Reconocimientos").load("/Carrera/Reconocimientos", function (response, status, xhr) {
            if (status == "success") {
                resolve();
            }
        })
    })
}


















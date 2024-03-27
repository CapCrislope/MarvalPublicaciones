function AnimarHeaderDiversidad() {


    $(".label-header").css("opacity", 1);
    $(".titulo-header").css("opacity", 1);

    gsap.to(".header-diversidad", {
        onEnter: function () {
            $(".header-diversidad").addClass("header-diversidad-animacion");
        }
    })

    gsap.from(".label-header", {
        x: 150,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    })

    gsap.from(".titulo-header", {
        x: -150,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    })

}

function AnimarCulturaDiversidad() {

    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#Cultura",
            start: "center center",
            end: "bottom+=200 top",
            scrub: 1.5,
            scroller: "#viewport",
            pin: true,
            //markers: true
        }
    })

    var tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".cultura-diversidad",
            start: "bottom bottom",
            end: "bottom+=200 top",
            scrub: 1.5,
            scroller: "#viewport",
            //markers: true,
        }
    })

    if (window.matchMedia('(max-width: 992px)').matches) {
        tl.from(".cultura-diversidad .imagen-fondo", {
            width: "60vw",
            height: "60vw",
            "border-radius": "50%",
            ease: "power1.inOut",
            duration: 1
        })
    } else {
        tl.from(".cultura-diversidad .imagen-fondo", {
            width: "35vw",
            height: "35vw",
            "border-radius": "50%",
            ease: "power1.inOut",
            duration: 1
        })
    }


    tl.from(".cultura-diversidad .texto-frase", {
        y: 200,
        opacity: 0,
        ease: "power1.inOut",
        duration: 1
    }, "-=0.5")

}

function AnimarIgualdad() {

    gsap.from(".header-igualdad .titulo", {
        y: -300,
        opacity: 0,
        ease: "power.inOut",
        scrollTrigger: {
            trigger: ".igualdad-diversidad-container",
            scroller: "#viewport",
            scrub: 1,
            start: "top bottom",
            end: "top center"
        }
    })

    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".body-igualdad",
            scroller: "#viewport",
            toggleActions: "restart none none reverse",
            start: "top 80%"
        }
    })

    document.querySelectorAll(".card-igualdad").forEach(function (element, index) {

        tl.from(element, {
            x: -200,
            opacity: 0,
            duration: 0.7,
            delay: 0.2 * (index % 3)
        }, "-=0.7")

    });


}

function AnimarModoDiversidad() {

    var tl1 = gsap.timeline({
        scrollTrigger: {
            trigger: ".modo-diversidad-container",
            scroller: "#viewport",
            start: "top 80%",
            toggleActions: "restart none none reverse",
            //markers: true
        }
    })

    tl1.from(".primera-panel-card .video", {
        x: -200,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    })

    tl1.from(".primera-panel-card .titulo", {
        x: 200,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    }, "-=1")

    tl1.from(".primera-panel-card .descripcion", {
        x: 200,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    }, "-=0.7")

    var tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".segunda-panel-card",
            scroller: "#viewport",
            start: "top 80%",
            toggleActions: "restart none none reverse",
            //markers: true
        }
    })

    tl2.from(".segunda-panel-card .video", {
        x: 200,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    })

    tl2.from(".segunda-panel-card .titulo", {
        x: -200,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    }, "-=1")

    tl2.from(".segunda-panel-card .descripcion", {
        x: -200,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    }, "-=0.7")


}

function AnimarComiteDiversidad() {

    gsap.to(".header-comite-diversidad .titulo", {
        onComplete: function () {
            $(".header-comite-diversidad .titulo").addClass("titulo-animacion")
        },
        scrollTrigger: {
            trigger: ".header-comite-diversidad",
            scroller: "#viewport",
            start: "top bottom",
            end: "top bottom"
        }
    })

    var tl1 = gsap.timeline({
        scrollTrigger: {
            trigger: ".body-comite-diversidad",
            scroller: "#viewport",
            start: "top bottom",
            toggleActions: "restart none none reverse",
        }
    })

    tl1.from(".primer-articulo .titulo-article", {
        x: 200,
        opacity: 0,
        ease: "power1.inOut",
        duration: 1
    })

    tl1.from(".primer-articulo .texto-article", {
        x: -200,
        opacity: 0,
        ease: "power1.inOut",
        duration: 1
    }, "-=1")

    gsap.from(".segundo-articulo .titulo-article", {
        x: 200,
        opacity: 0,
        ease: "power1.inOut",
        duration: 1,
        scrollTrigger: {
            trigger: ".segundo-articulo",
            scroller: "#viewport",
            start: "top bottom",
            toggleActions: "restart none none reverse",
        }
    })

    var col = 1;
    if (window.matchMedia('(min-width: 992px)').matches) {
        col = 4;
    }

    document.querySelectorAll(".card-comite").forEach(function (element, index) {
        gsap.from(element, {
            scale: 0.6,
            opacity: 0,
            duration: 2,
            ease: "elastic.out(2,1)",
            delay: 0.2 * (index % col),
            scrollTrigger: {
                trigger: element,
                start: "top 90%",
                scroller: "#viewport",
                toggleActions: "restart none none reverse",
            }
        })
    });


}

function AnimarTripticoDiversidad() {
    var col = 1;
    if (window.matchMedia('(min-width: 992px)').matches) {
        col = 3;
    }

    Array.from(document.querySelectorAll(".card-triptico")).reverse().forEach(function (element, index) {
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: element,
                start: "top 90%",
                scroller: "#viewport",
                toggleActions: "restart none none reverse",
            }
        })
        tl.from(element, {
            x: 300,
            opacity: 0,
            duration: 0.8,
            delay: 0.2 * (index % col)
        })
        tl.from(element.querySelector('.body-card-triptico'), {
            y: -300,
            opacity: 0,
            duration: 0.8,
            delay: 0.2 * (index % col)
        }, "-=0.7")
    });


}

function AnimarCarruselDiversidad() {
    var tlHeader = gsap.timeline({
        scrollTrigger: {
            trigger: ".header-carrusel-diversidad",
            scroller: "#viewport",
            start: "top 80%",
            toggleActions: "restart none none reverse",
            //markers: true
        }
    })

    tlHeader.from(".titulo-header-carrusel-diversidad", {
        x: -300,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    })

    tlHeader.from(".descripcion-header-carrusel-diversidad", {
        x: 300,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    }, "-=1")


    let sections = gsap.utils.toArray(".card-carrusel-diversidad");

    if (window.matchMedia('(max-width: 992px)').matches) {
        let end = "+=1300vw";
        let restar = 1.1

        let scrollTween = gsap.to(sections, {
            xPercent: -100 * (sections.length - restar),
            ease: "none",
            scrollTrigger: {
                trigger: ".carrusel-diversidad-container",
                pin: true,
                scrub: 0.1,
                start: "center center",
                end: end,
                scroller: "#viewport",
                //markers: true
            }
        });

        return;
    }

    //gsap.to(".body-carrusel-diversidad", {
    //    scrollTrigger: {
    //        trigger: "#CarruselDiversidad",
    //        scroller: "#viewport",
    //        start: "bottom bottom",
    //        end: "+=200vw",
    //        pin: true
    //    }
    //})

    let end = "+=2000vw";
    let restar = 1.2

    let scrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - restar),
        ease: "none",
        scrollTrigger: {
            trigger: "#CarruselDiversidad",
            pin: true,
            scrub: 0.1,
            start: "bottom bottom",
            end: end,
            scroller: "#viewport",
            //markers: true
        }
    });


    //////////////////////////// CARD 1

    var tlCard1 = gsap.timeline({
        scrollTrigger: {
            trigger: ".card1-diversidad",
            scroller: "#viewport",
            scrub: 2,
            start: "top bottom",
            end: "top top",
            //containerAnimation: scrollTween,
            //markers:true
        }
    })

    tlCard1.from(".card1-diversidad .imagen-card-carrusel-diversidad", {
        y: 500,
        duration: 1,
        ease: "power1.In"
    })

    tlCard1.from(".card1-diversidad .texto-card-carrusel-diversidad", {
        y: -300,
        opacity:0,
        duration: 1,
        ease: "power1.In"
    }, "-=1");

    
    

    //////////////////////////// CARD 2

    var tlCard2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".card2-diversidad",
            scroller: "#viewport",
            scrub: 2,
            start: "top bottom",
            containerAnimation: scrollTween,
            //markers: true
        }
    })

    tlCard2.from(".card2-diversidad .imagen-card-carrusel-diversidad", {
        x: -500,
        y: 500,
        opacity: 0,
        duration: 1
    })
    tlCard2.from(".card2-diversidad .texto-card-carrusel-diversidad", {
        x: -500,
        duration: 1,
        opacity: 0
    }, "-=0.5");

    //////////////////////////// CARD 3

    var tlCard3 = gsap.timeline({
        scrollTrigger: {
            containerAnimation: scrollTween,
            trigger: ".card3-diversidad",
            scroller: "#viewport",
            scrub: 2,
            start: "top bottom",
            end: "top center",
            //markers: true
        }
    })

    tlCard3.from(".card3-diversidad .imagen-card-carrusel-diversidad", {
        x: -500,
        y: -500,
        opacity: 0,
        duration: 1
    })
    tlCard3.from(".card3-diversidad .texto-card-carrusel-diversidad", {
        x: -500,
        duration: 1,
        opacity: 0
    }, "-=0.5");


    //gsap.from(".card-2 .texto-card", {
    //    x: -300,
    //    opacity: 0,
    //    duration: 1,
    //    scrollTrigger: {
    //        trigger: ".carrusel-modos-modomarval",
    //        scroller: "#viewport",
    //        scrub: 1,
    //        start: "bottom 80%",
    //        //containerAnimation: scrollTween
    //    }
    //})

}


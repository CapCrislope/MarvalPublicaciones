function AnimarMenuCarrera() {

    var tl = gsap.timeline();
    tl.from(".logo-marval-nav-carrera", {
        scale: 0.5,
        ease: "back.out(2)",
        duration: 1
    })


    document.querySelectorAll(".links-nav-carrera ul li").forEach(function (element, index) {

        gsap.from(element, {
            x:500,
            duration: 0.7,
            ease: "power1.inOut",
            delay: 0.2 * (index % 4),
        });
    });

    gsap.from(".EsEn", {
        x: 500,
        duration: 0.7,
        ease: "power1.inOut",
        delay: 0.2 * (3 % 4),
    });


}

function AnimarHeaderCarrera() {

    let tl = gsap.timeline();

    tl.from(".logo span", {
        x: -150,
        opacity: 0,
        duration: 0.5,
        ease: "power1.inOut"
    });

    tl.from(".logo img", {
        x: -150,
        duration: 0.5,
        ease: "power1.inOut"
    }, "-=0.4");

    let promise = new Promise((resolve, reject) => {
        tl.from(".boton-ver-oportunidades", {
            x: -150,
            opacity: 0,
            duration: 0.5,
            ease: "power1.inOut",
            onComplete: function () {
                resolve();
            }
        }, "-=0.4")
    })

    Promise.all([promise]).then((values) => {
        let tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: ".header-carrera",
                scroller: "#viewport",
                start: "top top",
                end: "bottom top",
                scrub: true

            }
        });

        tl2.to(".logo span", {
            scale: 2,
            y: -100,
            x: 1000,
            duration: 1,
            opacity: 0
        }, "-=1")

        tl2.to(".logo img", {
            scale: 2,
            x: 300,
            opacity: 0,
            duration: 1
        }, "-=1")

        tl2.to(".boton-ver-oportunidades", {
            scale: 2,
            y: 50,
            x: 1000,
            opacity: 0,
            duration: 1
        }, "-=1")
    });

}

function AnimarCarrusel() {

    let sections = gsap.utils.toArray(".card-carrusel");

    let end = "+=3000vw";
    let restar = 1
    if (window.matchMedia('(min-width: 1024px)').matches) {
        end = "+=5000vw"
        restar = 1.3;
    }

    let scrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - restar),
        ease: "none",
        scrollTrigger: {
            trigger: ".carrusel-carrera-container",
            pin: true,
            scrub: 0.1,
            end: end,
            scroller: "#viewport"
        }
    });


    if (window.matchMedia('(max-width: 992px)').matches) {
        return;
    }



    // *********************************************** CARD 1 *********************************************** //

    let carrusel1 = gsap.timeline({
        scrollTrigger: {
            trigger: ".card-carrusel-1",
            start: "top bottom",
            //end: "top top",
            toggleActions: "restart none none reverse",
            scrub: true,
            //containerAnimation: scrollTween,
            scroller: "#viewport",
            //markers: true
        }
    })

    carrusel1.from(".card-carrusel-1 .imagen-card-carrusel", {
        y: 500,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    })

    carrusel1.from(".card-carrusel-1 .texto-card-carrusel", {
        x: "-150",
        opacity: 0,
        scale:1.1,
        //ease: "none",
        duration: 1
    }, "-=0.5")

    // *********************************************** CARD 2 *********************************************** //

    let carrusel2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".card-carrusel-2",
            start: "left center",
            end: "right center",
            toggleActions: "restart none none reverse",
            scroller: "#viewport",
            containerAnimation: scrollTween,
            scrub: true,
            id: "2",
            //markers: true
        }
    })

    carrusel2.from(".card-carrusel-2 .imagen-card-carrusel", {
        x: 500,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut",
    })

    carrusel2.from(".card-carrusel-2 .texto-card-carrusel", {
        y: 200,
        opacity: 0,
        duration: 0.8,
        ease: "power1.inOut"
    }, "-=0.7")

    // *********************************************** CARD 3 *********************************************** //


    let carrusel3 = gsap.timeline({
        scrollTrigger: {
            trigger: ".card-carrusel-3",
            start: "left right",
            //end: "top center",
            toggleActions: "restart none none reverse",
            scroller: "#viewport",
            scrub: true,
            containerAnimation: scrollTween,
            id: "3",
            //markers: true
        }
    })

    carrusel3.from(".card-carrusel-3 .imagen-card-carrusel", {
        y: -500,
        scale: 0.7,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut",
    })

    carrusel3.from(".card-carrusel-3 .texto-card-carrusel", {
        x: 200,
        //scale: 0.7,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut",
    }, "-=0.5")


    // *********************************************** CARD 4 *********************************************** //


    let carrusel4 = gsap.timeline({
        scrollTrigger: {
            trigger: ".card-carrusel-4",
            start: "left right",
            toggleActions: "restart none none reverse",
            scroller: "#viewport",
            containerAnimation: scrollTween,
            id: "4",
            //markers: true,
            scrub: true
        }
    })

    carrusel4.from(".card-carrusel-4 .imagen-card-carrusel", {
        x: -300,
        //y: -500,
        //scale: 0.7,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut",
    })

    carrusel4.from(".card-carrusel-4 .texto-card-carrusel", {
        x: -300,
        //y: -500,
        //scale: 0.7,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut",
    }, "-=0.3")

    carrusel4.to(".card-carrusel-4 .texto-card-carrusel", {
        x: 200,
        duration: 1,
        ease: "power1.inOut",
    })

    // *********************************************** CARD 5 *********************************************** //

    let carrusel5 = gsap.timeline({
        scrollTrigger: {
            trigger: ".card-carrusel-5",
            start: "left 80%",
            //end: "+=2000px",
            toggleActions: "restart none none reverse",
            scroller: "#viewport",
            containerAnimation: scrollTween,
            id: "5",
            //markers: true,
            scrub: true
        }
    })

    carrusel5.from(".card-carrusel-5 .imagen-card-carrusel", {
        y: 300,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut",
    })

    carrusel5.from(".card-carrusel-5 .texto-card-carrusel", {
        x: -200,
        opacity:0,
        duration: 1
    }, "-=0.7")

    carrusel5.to(".card-carrusel-5 .texto-card-carrusel", {
        scale: 1.1,
        x: 500,
        y:-150,
        duration:1
    })

    carrusel5.to(".card-carrusel-5 .imagen-card-carrusel", {
        x: 50,
        duration: 1
    }, "-=1")

    
}

function AnimarProposito() {

    let yFrom = "-80%"; 
    let yTo = "40%";

    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#Proposito",
            start: "top bottom",
            end: "bottom top",
            toggleActions: "restart none none reverse",
            scrub:true,
            scroller: "#viewport",
            //markers: true
        }
    })

    tl.fromTo(".proposito .imagen-fondo", {
        y: yFrom,
        duration: 2, 
        //ease: "power1.in"
    }, {
        y: yTo,
        duration:2
    })

    var tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: "#Proposito",
            start: "top bottom",
            end: "top top",
            toggleActions: "restart none none reverse",
            scrub: 1,
            scroller: "#viewport",
            //markers: true
        }
    })

    tl2.from(".proposito .texto-proposito", {
        y: 300,
        opacity: 0,
        duration: 2
    });

}

function AnimarModoMarval() {

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".modo-marval-container",
            start: "top bottom",
            //end: "top 60%",
            toggleActions: "restart none none reverse",
            //scrub: true,
            scroller: "#viewport",
            //markers: true
        }
    })

    tl.from(".titulo-modo-marval", {
        
        duration: 0.5,
        opacity: 0,
        x:-100,
        ease: "power1.out"
    })

    tl.from(".boton-modo-marval", {
        
        duration: 0.5,
        opacity: 0,
        x: 100,
        ease: "power1.out"
    }, "-=0.5")

    //tl.from(".carrusel-modo-marval", {
    //    y: 50,
    //    opacity: 0,
    //    ease: "power1.out",
    //    duration:0.5
    //}, "-=0.3")

}

function AnimarReconocimientos() {

    let tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: "#Reconocimientos",
            start: "top 80%",
            //end: "bottom top",
            toggleActions: "restart none none reverse",
            //scrub: true,
            scroller: "#viewport",
        }
    })

    tl2.from(".label-reconocimientos", {
        x: -200,
        opacity: 0,
        ease: "power1.inOut",
        duration: 1
    })

    tl2.from(".titulo-reconocimientos", {
        x: -200,
        opacity: 0,
        ease: "power1.inOut",
        duration: 1
    }, "-=0.7")

    tl2.from(".panel-texto-reconocimientos .imagen-apertura", {
        x: -200,
        opacity: 0,
        ease: "power1.inOut",
        duration: 1
    }, "-=0.8")

    if (window.matchMedia('(max-width: 992px)').matches) {
        return;
    }

    let yFrom = "-100%";
    let yTo = "35%";

    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#Reconocimientos",
            start: "top bottom",
            end: "bottom top",
            toggleActions: "restart none none reverse",
            scrub: true,
            scroller: "#viewport",
            //markers: true
        }
    })

    tl.fromTo(".reconocimientos-carrera .panel-imagen-reconocimiento", {
        y: yFrom,
        duration: 2,
        //ease: "power1.in"
    }, {
        y: yTo,
        duration: 1
    })

    
}

function AnimarOportunidadesCarrera() {
    gsap.from(".titulo-oportunidades", {
        scale: 0.7,
        opacity: 0,
        duration: 2.5,
        ease: "elastic.out(1,0.5)",
        scrollTrigger: {
            trigger: ".oportunidades-carrera-container",
            scroller: "#viewport",
            start: "top 90%",
            toggleActions: "restart none none reverse",
        }
    })

    var col = 1;
    if (window.matchMedia('(min-width: 992px)').matches) {
        col = 3;
    }

    document.querySelectorAll(".card-oportunidades").forEach(function (element, index) {
        gsap.from(element, {
            x: -300,
            opacity: 0,
            duration: 0.7,
            ease: "power1.inOut",
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
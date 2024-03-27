function AnimarHeaderModoMarval() {

    let imagenPrincipal = $(".HeaderModoMarval .imagen-principal");

    $(".HeaderModoMarval .imagen-titulo").css("opacity", 1);

    imagenPrincipal.css("opacity", 1);


    if (window.matchMedia('(max-width: 1024px)').matches) {
        $(".HeaderModoMarval .frase-modomarval").css("opacity", 1);
        imagenPrincipal.css("transform", "translateY(0)");

        var tlMobile = gsap.timeline();

        tlMobile.from(".HeaderModoMarval .imagen-titulo", {
            opacity: 0,
            x: -100,
            duration: 1,
            ease: "power1.inOut"
        })

        tlMobile.from(".HeaderModoMarval .frase-modomarval", {
            opacity: 0,
            x: -100,
            duration: 1,
            ease: "power1.inOut"
        }, "-=0.7")

        tlMobile.from(".HeaderModoMarval .imagen-principal", {
            opacity: 0,
            x: -100,
            duration: 1,
            ease: "power1.inOut"
        }, "-=0.7")
        return;
    }



    let promise = new Promise((resolve, reject) => {
        var tlInicial = gsap.timeline();

        tlInicial.from(".HeaderModoMarval .imagen-principal", {
            y: 200,
            opacity: 0,
            duration: 1,
            ease: "power1.inOut",
            onComplete: function () {
                resolve();
            }
        })

        tlInicial.from(".HeaderModoMarval .imagen-titulo", {
            y: -300,
            opacity: 0,
            duration: 1,
            ease: "power1.inOut"
        }, "-=1")
    })

    Promise.all([promise]).then((values) => {
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".HeaderModoMarval",
                start: "top top",
                end: "+=600",
                scroller: "#viewport",
                pin: true
            }
        })

        var tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: "#HeaderModoMarval",
                start: "top top",
                end: "+=600",
                toggleActions: "restart none none reverse",
                scrub: true,
                scroller: "#viewport",
                //markers: true
            }
        })

        $(".HeaderModoMarval .frase-modomarval").css("opacity", 1);

        tl2.to(".HeaderModoMarval .imagen-principal", {
            y: 0,
            width: "90%",
            duration: 1,
            ease: "power1.inOut"
        })

        tl2.from(".HeaderModoMarval .frase-modomarval", {
            y: 200,
            opacity: 0,
            duration: 1,
            ease: "power1.inOut"
        }, "-=0.5")

        tl2.to(".HeaderModoMarval .img-elipsis", {
            y: -50,
            duration: 1,
            ease: "power1.inOut"
        }, "-=1.5")


    });


    return promise;
}

function AnimarMosaicoModoMarval() {

    document.querySelectorAll(".imagen, .panel-texto").forEach(function (element, index) {
        gsap.from(element, {
            x: -100,
            opacity: 0,
            duration: .5,
            ease: "power1.inOut",
            delay: 0.2 * (index % 2),
            scrollTrigger: {
                trigger: element,
                scroller: "#viewport",
                start: "top 95%",
                toggleActions: "restart none none reverse",
                //markers: true
            }
        })
    });

    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".header-mosaico",
            scroller: "#viewport",
            start: "top bottom",
            end: "+=500",
            toggleActions: "restart none none reverse",
            scrub: true
            //markers: true
        }
    });

    tl.from(".header-mosaico .titulo-header", {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    })

    tl.from(".header-mosaico .copete-header", {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    }, "-=1")


    //if (window.matchMedia('(max-width: 1024px)').matches) {
    //    return;
    //}



    //const angle = 20;
    //const rotateCard = window;

    //const lerp = (start, end, amount) => {
    //    return (1 - amount) * start + amount * end;
    //};

    //const remap = (value, oldMax, newMax) => {
    //    const newValue = ((value + oldMax) * (newMax * 2)) / (oldMax * 2) - newMax;
    //    return Math.min(Math.max(newValue, -newMax), newMax);
    //};

    //const cards = document.querySelectorAll(".card-mosaico");
    //cards.forEach((e) => {
    //    e.addEventListener("mousemove", (event) => {
    //        const rect = e.getBoundingClientRect();
    //        const centerX = (rect.left + rect.right) / 2;
    //        const centerY = (rect.top + rect.bottom) / 2;
    //        const posX = event.pageX - centerX;
    //        const posY = event.pageY - centerY;
    //        const x = remap(posX, rect.width / 2, angle);
    //        const y = remap(posY, rect.height / 2, angle);
    //        e.dataset.rotateX = x;
    //        e.dataset.rotateY = -y;
    //        // Agrega la sombra en dirección opuesta a la posición del mouse
    //        e.style.setProperty("--shadowX", -x + "px");
    //        e.style.setProperty("--shadowY", -y + "px");
    //    });

    //    e.addEventListener("mouseout", (event) => {
    //        e.dataset.rotateX = 0;
    //        e.dataset.rotateY = 0;

    //    });
    //});

    //const update = () => {
    //    cards.forEach((e) => {
    //        let currentX = parseFloat(e.style.getPropertyValue('--rotateY').slice(0, -1));
    //        let currentY = parseFloat(e.style.getPropertyValue('--rotateX').slice(0, -1));
    //        let currentShadowX = parseFloat(e.style.getPropertyValue('--shadowX').slice(0, -2));
    //        let currentShadowY = parseFloat(e.style.getPropertyValue('--shadowY').slice(0, -2));
    //        if (isNaN(currentX)) currentX = 0;
    //        if (isNaN(currentY)) currentY = 0;
    //        if (isNaN(currentShadowX)) currentShadowX = 0;
    //        if (isNaN(currentShadowY)) currentShadowY = 0;
    //        const x = lerp(currentX, e.dataset.rotateX, 0.05);
    //        const y = lerp(currentY, e.dataset.rotateY, 0.05);
    //        const shadowX = lerp(currentShadowX, e.dataset.shadowX, 0.05);
    //        const shadowY = lerp(currentShadowY, e.dataset.shadowY, 0.05);
    //        e.style.setProperty("--rotateY", x + "deg");
    //        e.style.setProperty("--rotateX", y + "deg");
    //    })
    //}
    //setInterval(update, 1000 / 60)




}

function AnimarEspaciosModoMarval() {

    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#EspaciosModoMarval",
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
            trigger: ".espacios-modomarval",
            start: "bottom bottom",
            end: "bottom+=200 top",
            scrub: 1.5,
            scroller: "#viewport",
            //markers: true,
        }
    })

    if (window.matchMedia('(max-width: 992px)').matches) {
        tl.from(".espacios-modomarval .imagen-fondo", {
            width: "60vw",
            height: "60vw",
            "border-radius": "50%",
            ease: "power1.inOut",
            duration: 1
        })
    } else {
        tl.from(".espacios-modomarval .imagen-fondo", {
            width: "35vw",
            height: "35vw",
            "border-radius": "50%",
            ease: "power1.inOut",
            duration: 1
        })
    }


    tl.from(".espacios-modomarval .texto-frase", {
        y: 200,
        opacity: 0,
        ease: "power1.inOut",
        duration: 1
    }, "-=0.5")

}

function AnimarEvolucionModoMarval() {

    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".evolucion-modomarval-container",
            start: "top 80%",
            scroller: "#viewport",
            onEnter: function () {
                $(".titulo-evolucion").removeClass("titulo-evolucion-tapado")
            }
        }
    });

    var col = 2;
    if (window.matchMedia('(min-width: 992px)').matches) {
        col = 4;
    }

    document.querySelectorAll(".card-evolucion").forEach(function (element, index) {
        gsap.from(element, {
            scale: 0.6,
            opacity: 0,
            duration: 2,
            ease: "elastic.out(2,1)",
            delay: 0.2 * (index % col),
            scrollTrigger: {
                trigger: element,
                start: "top 90%",
                scroller: "#viewport"
            }
        })
    });

}

function AnimarCarruselModosModoMarval() {
    let sections = gsap.utils.toArray(".card-modos");

    let end = "+=1300vw";
    let restar = 1
    if (window.matchMedia('(min-width: 1024px)').matches) {
        end = "+=3000vw"
        restar = 1.5;
    }

    let scrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - restar),
        ease: "none",
        scrollTrigger: {
            trigger: ".carrusel-modos-modomarval-container",
            pin: true,
            scrub: 0.1,
            start: "center center",
            end: end,
            scroller: "#viewport"
        }
    });


    if (window.matchMedia('(max-width: 992px)').matches) {
        return;
    }

    //////////////////////////// CARD 1

    gsap.from(".card-1 .imagen-desktop", {
        y: 300,
        opacity: 0,
        duration: 1,
        ease: "power1.Out",
        scrollTrigger: {
            trigger: ".card-1",
            scroller: "#viewport",
            start: "top bottom",
            end: "top top",
            scrub: 2,
            //markers: true
        }
    })

    gsap.from(".card-1 .texto-card", {
        x: -300,
        opacity: 0,
        duration: 1,
        ease: "power1.Out",
        scrollTrigger: {
            trigger: ".card-1",
            scroller: "#viewport",
            start: "top 80%",
            end: "top top",
            scrub: 2,
            //markers: true
        }
    })

    var card1Salida = gsap.timeline({
        scrollTrigger: {
            trigger: ".card-1",
            scroller: "#viewport",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    })

    card1Salida.to(".card-1 .texto-card .titulo", {
        x: 300,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    })

    card1Salida.to(".card-1 .texto-card .descripcion", {
        x: 300,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    }, "-=1")

    //////////////////////////// CARD 2

    gsap.from(".card-2 .imagen-desktop", {
        x: -400,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: ".carrusel-modos-modomarval",
            scroller: "#viewport",
            start: "center 80%",
            scrub: 1,
            //markers:true
        }
    })

    gsap.from(".card-2 .texto-card", {
        x: -300,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: ".carrusel-modos-modomarval",
            scroller: "#viewport",
            scrub: 1,
            start: "bottom 80%",
            //containerAnimation: scrollTween
        }
    })

    var card2Salida = gsap.timeline({
        scrollTrigger: {
            trigger: ".card-2",
            scroller: "#viewport",
            scrub: 1,
            start: "center 30%",
            //markers: true,
            containerAnimation: scrollTween
        }
    })

    //card2Salida.to(".card-2 .texto-card", {
    //    x: -400,
    //    opacity:0,
    //    duration: 1
    //})

    //card2Salida.to(".card-2 .imagen-desktop", {
    //    x: -400,
    //    opacity:0,
    //    duration: 1
    //}, "-=1")

    /////////////////////////////// CARD 3

    gsap.from(".card-3 .imagen-desktop", {
        x: 700,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: ".card-2",
            scroller: "#viewport",
            containerAnimation: scrollTween,
            start: "top bottom",
            scrub: 1,
            //markers: true
        }
    })

    gsap.from(".card-3 .texto-card", {
        y: 500,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: ".card-2",
            scroller: "#viewport",
            containerAnimation: scrollTween,
            scrub: 1,
            start: "top 75%"
        }
    })

    //var card3Salida = gsap.timeline({
    //    scrollTrigger: {
    //        trigger: ".card-3",
    //        scroller: "#viewport",
    //        scrub: 1,
    //        start: "top top",
    //        //markers: true,
    //        containerAnimation: scrollTween
    //    }
    //})

    //card3Salida.to(".card-3 .texto-card", {
    //    x: -400,
    //    opacity: 0,
    //    scale:0.6,
    //    duration: 1
    //})

    //card3Salida.to(".card-3 .imagen-desktop", {
    //    y: -400,
    //    opacity: 0,
    //    duration: 1
    //}, "-=1")

    ////////////////////////// CARD 4


    gsap.from(".card-4 .imagen-desktop", {
        y: -700,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: ".card-2",
            scroller: "#viewport",
            containerAnimation: scrollTween,
            start: "top top",
            scrub: 1,
            //markers: true
        }
    })

    gsap.from(".card-4 .texto-card", {
        x: 500,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: ".card-2",
            scroller: "#viewport",
            containerAnimation: scrollTween,
            scrub: 1,
            start: "top top"
        }
    })

}

function AnimarVideosProtagonistas() {

    var tl1 = gsap.timeline({
        scrollTrigger: {
            trigger: ".header-videos",
            scroller: "#viewport",
            start: "top bottom",
            end: "+=500",
            toggleActions: "restart none none reverse",
            scrub: true
            //markers: true
        }
    });

    tl1.from(".titulo-header-videos", {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    })

    tl1.from(".descricion-header-videos", {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    }, "-=1")


    var col = 1;
    if (window.matchMedia('(min-width: 992px)').matches) {
        col = 4;
    }

    document.querySelectorAll(".card-video-protagonista").forEach(function (element, index) {

        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: element,
                scroller: "#viewport",
                toggleActions: "restart none none reverse",
                start: "top 80%"
            }
        })
        
        tl.from(element, {
            x: -200,
            opacity: 0,
            duration: 0.7,
            delay: 0.2 * (index % col)
        })
        
    });


}
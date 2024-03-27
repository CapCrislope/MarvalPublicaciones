function AnimacionHeaderProbono() {
    $(".nav-header-probono").css("opacity", 1);
    $(".texto-header-probono").css("opacity", 1);
    $(".footer-header-probono").css("opacity", 1);

    gsap.from(".nav-header-probono", {
        y: "-100%",
        duration: 1,
        ease: "power1.Out"
    })

    gsap.from(".texto-header-probono", {
        x: "-100%",
        opacity: 0,
        duration: 1,
        ease: "power1.Out"
    })

    gsap.from(".footer-header-probono", {
        y: "100%",
        duration: 1,
        ease: "power1.Out"
    })


    setTimeout(function () {

        var tl = gsap.timeline({
            scrollTrigger: {
                scroller: "#viewport",
                trigger: ".header-probono",
                start: "top top",
                end: "bottom top",
                pin: true,
                scrub: true
            }
        })

        tl.to(".nav-header-probono", {
            y: "-100%",
            duration: 1,
            ease: "power1.InOut",
            delay: .2
        })

        tl.to(".texto-header-probono", {
            x: -400,
            opacity: 0,
            duration: 1,
            ease: "power1.InOut",
        }, "-=1")

        tl.to(".footer-header-probono", {
            y: "100%",
            duration: 1,
            ease: "power1.InOut",
        }, "-=1")

        tl.to(".imagen-escondida-header-probono", {
            x: "0",
            duration: 1,
            ease: "power1.InOut",
        }, "-=.7")
        
        let tl2 = gsap.timeline({
            scrollTrigger: {
                scroller: "#viewport",
                trigger: ".header-probono",
                start: "bottom bottom",
                end: "bottom top",
                scrub: true,
                //markers: true
            }
        });

        tl2.to(".imagen-escondida-header-probono", {
            y: "40%",
            duration: 1,
            ease: "power1.InOut",
        })

        tl2.to(".imagen-fondo-header-probono", {
            y: "50%",
            duration: 1,
            ease: "power1.InOut",
        }, "-=1")

        CargarHorasTrabajoProbono();

    }, 1000);
    
}

function AnimacionHorasTrabajoProbono() {
    document.querySelectorAll(".estadistica-item-number .number").forEach(function (element, index) {
        gsap.to(element, {
            opacity: 1,
            display: 'block',
            scrollTrigger: {
                trigger: ".body-horas-trabajo-probono",
                scroller: "#viewport",
                //markers: true,
                start: "top 100%",
            }
        });
    });

    var tl = gsap.timeline({
        scrollTrigger: {
            scroller: "#viewport",
            trigger: ".horas-trabajo-probono",
            start: "top bottom",
            end: "top center",
            //scrub: true,
            toggleActions: "restart none none reverse",
            //markers:true
        }
    })

    tl.from(".ejercicio-header-horas-trabajo-probono", {
        y: "-100%",
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    })

    tl.from(".pregunta-header-horas-trabajo-probono", {
        x: "-100%",
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    }, "-=1")

    tl.from(".imagen-body-horas-trabajo-probono", {
        y: "100%",
        duration: 1,
        ease: "power1.inOut"
    }, "-=0.8")

    tl.from(".pregunta-body-horas-trabajo-probono", {
        x: "100%",
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    }, "-=1")

    var tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".horas-trabajo-probono",
            scroller: "#viewport",
            start: "bottom bottom",
            end: "+=4000",
            pin: true,
            scrub: true,
            //markers: true
        }
    });

    tl2.from(".fondo-segundo-panel-body", {
        x: "100%",
        y: "100%",
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    })

    tl2.to(".imagen-body-horas-trabajo-probono", {
        x: "-100%",
        //y: "100%",
        duration: 1,
        opacity: 0,
        ease: "power1.inOut"
    }, "-=0.9")

    tl2.to(".pregunta-body-horas-trabajo-probono", {
        //x: "100%",
        y: "-100%",
        duration: 1,
        opacity: 0,
        ease: "power1.inOut"
    }, "-=0.7")
    
    //var tl3 = gsap.timeline({
    //    scrollTrigger: {
    //        scroller: "#viewport",
    //        trigger: "#HorasTrabajoProbono",
    //        start: "80% bottom",
    //        toggleActions: "restart none none reverse",
    //        //markers:true
    //    }
    //})

    tl2.from(".titulo-header-segundo-panel", {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    })

    tl2.from(".body-segundo-panel ul li", {
        y: "100%",
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    }, "-=0.8")

    //document.querySelectorAll(".body-segundo-panel ul li").forEach(function (element, index) {

    //    tl3.from(element, {
    //        opacity: 0,
    //        scale: "0.8",
    //        duration: 1,
    //        ease: "elastic.out(1,0.3)",
    //        delay: 0.11 * index,
    //    }, "-=1");
    //});

    if (window.matchMedia('(max-width: 992px)').matches) {

        let sections = gsap.utils.toArray(".body-segundo-panel ul li");

        tl2.to(sections, {
            yPercent: -100 * (sections.length - 6),
            ease: "none",
        });

        return;
    }

    
}

function AnimacionCarruselHorasEquipo() {


    gsap.from(".carrusel-horas-equipo-container .imagen-fondo", {
        y: "-70%",
        //ease: "power1.inOut",
        scrollTrigger: {
            scroller: "#viewport",
            trigger: ".carrusel-horas-equipo-container",
            scrub: true,
            start: "top bottom",
            end: "top top",
            //markers: true,
        }
    })

    let col = 4;

    document.querySelectorAll(".card-horas-equipo").forEach(function (element, index) {
        gsap.from(element, {
            x: "-50%",
            opacity: 0,
            duration: .7,
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

    gsap.from(".titulo-header-carrusel-horas-equipo", {
        y: "-100%",
        opacity: 0,
        duration: 1,
        ease: "power1.inOut",
        scrollTrigger: {
            scroller: "#viewport",
            trigger: ".carrusel-horas-equipo-container",
            start: "top 80%",
            //end: "top top",
            //scrub: true,
            toggleActions: "restart none none reverse",
            //markers: true
        }
    })







    let sections = gsap.utils.toArray(".card-horas-equipo");

    let end = "+=1300vw";
    let restar = 1

    if (window.matchMedia('(max-width: 992px)').matches) {
        
        let scrollTween = gsap.to(sections, {
            xPercent: -100 * (sections.length - restar),
            ease: "none",
            scrollTrigger: {
                trigger: ".carrusel-horas-equipo-container",
                pin: true,
                scrub: 0.1,
                start: "center center",
                end: end,
                scroller: "#viewport",
                //markers: true
            }
        });

        gsap.to("#CardCarruselHorasEquipo1 .number", {
            opacity: 1,
            display: 'block',
            scrollTrigger: {
                trigger: "#CardCarruselHorasEquipo1",
                scroller: "#viewport",
                start: "top bottom",
                //containerAnimation: scrollTween,
            }
        });

        document.querySelectorAll(".card-horas-equipo .number").forEach(function (element, index) {
            index += 1;
            if (index != 1) {
                gsap.to("#CardCarruselHorasEquipo" + index + " .number", {
                    opacity: 1,
                    display: 'block',
                    scrollTrigger: {
                        trigger: "#CardCarruselHorasEquipo" + index,
                        scroller: "#viewport",
                        start: "top bottom",
                        containerAnimation: scrollTween,
                    }
                });
            }
            
        });

        return;
    }

    restar = 2.5;

    let scrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - restar),
        ease: "none",
        scrollTrigger: {
            trigger: ".carrusel-horas-equipo-container",
            pin: true,
            scrub: 0.1,
            start: "center center",
            end: end,
            scroller: "#viewport",
            //markers: true
        }
    });

    let sections2 = gsap.utils.toArray(".card-horas-equipo .number");

    gsap.to(sections2, {
        opacity: 1,
        display: 'block',
        scrollTrigger: {
            trigger: ".body-carrusel-horas-equipo",
            scroller: "#viewport",
            //markers: true,
            start: "top 100%",
        }
    });

    //document.querySelectorAll(".card-horas-equipo .number").forEach(function (element, index) {
    //    gsap.to(element, {
    //        opacity: 1,
    //        display: 'block',
    //        scrollTrigger: {
    //            trigger: ".body-carrusel-horas-equipo",
    //            scroller: "#viewport",
    //            //markers: true,
    //            start: "top 100%",
    //        }
    //    });

    //});
    
}

function AnimacionEnQueTrabajamos() {
    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#EnQueTrabajamos",
            start: "center center",
            end: "+=2700",
            scrub: true,
            scroller: "#viewport",
            pin: true,
            //markers: true
        }
    })

    var tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".enquetrabajamos-container",
            start: "bottom bottom",
            end: "bottom+=200 top",
            scrub: 1.5,
            scroller: "#viewport",
            //markers: true,
        }
    })

    if (window.matchMedia('(max-width: 992px)').matches) {
        tl.from(".enquetrabajamos-container .imagen-fondo", {
            width: "60vw",
            height: "60vw",
            "border-radius": "50%",
            ease: "power1.inOut",
            duration: 1
        })
    } else {
        tl.from(".enquetrabajamos-container .imagen-fondo", {
            width: "35vw",
            height: "35vw",
            "border-radius": "50%",
            ease: "power1.inOut",
            duration: 1
        })
    }


    tl.from(".titulo-enquetrabajamos", {
        y: -200,
        opacity: 0,
        ease: "power1.inOut",
        duration: 1
    }, "-=0.5")

    tl.from(".card-ong-enquetrabajamos", {
        x: -200,
        opacity: 0,
        ease: "power1.inOut",
        duration: 1
    }, "-=0.6")

    if (window.matchMedia('(max-width: 992px)').matches) {

        let sections = gsap.utils.toArray(".card-ong-enquetrabajamos");

        tl.to(sections, {
            yPercent: -100 * (sections.length - 3),
            ease: "none",
        });
        
        return;
    }

}

function AnimacionQuienesTrabajamos() {

    gsap.from(".header-quienes-trabajamos .titulo", {
        x: "-100%",
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            scroller: "#viewport",
            trigger: ".quienes-trabajamos-container",
            start: "top bottom",
            toggleActions: "restart none none reverse",
        }
    })

    let sections = gsap.utils.toArray(".card-quienes-trabajamos");
    
    if (window.matchMedia('(max-width: 992px)').matches) {

        let end = "+=1300vw";
        let restar = 0.7;

        let scrollTween = gsap.to(sections, {
            xPercent: -100 * (sections.length - restar),
            ease: "none",
            scrollTrigger: {
                trigger: ".quienes-trabajamos-container",
                pin: true,
                scrub: 0.1,
                start: "top top",
                end: end,
                scroller: "#viewport",
                //markers: true
            }
        });
        
        return;
    }

    

    document.querySelectorAll(".card-quienes-trabajamos").forEach(function (element, index) {
        gsap.from(element, {
            scale: 0.6,
            opacity: 0,
            duration: 2,
            ease: "elastic.out(2,1)",
            delay: 0.2 * (index % 4),
            scrollTrigger: {
                trigger: element,
                start: "top 90%",
                scroller: "#viewport",
                toggleActions: "restart none none reverse",
            }
        })
    });
}

function AnimacionCarruselCuantosClientes() {

    let sections = gsap.utils.toArray(".card-carrusel-cuantos-clientes");

    let end = "+=1500vw";
    let restar = 1.6

    if (window.matchMedia('(max-width: 992px)').matches) {
        restar = 1
    }


    let scrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - restar),
        ease: "none",
        scrollTrigger: {
            trigger: ".carrusel-cuentos-clientes-container",
            pin: true,
            scrub: true,
            start: "center center",
            end: end,
            scroller: "#viewport",
            //markers: true
        }
    });

    if (window.matchMedia('(max-width: 992px)').matches) {
        return;
    }

    var tl1 = gsap.timeline({
        scrollTrigger: {
            scroller: "#viewport",
            trigger: ".carrusel-cuentos-clientes-container",
            scrub: true,
            start: "top bottom",
            end: "top top",
            //markers: true
        }
    })

    tl1.from(".card1-carrusel .body-card-carrusel-cuantos-clientes", {
        x: "-100%",
        opacity: 0,
        duration: 1,
        //ease: "power1.inOut"
    })

    tl1.from(".card1-carrusel .header-card-carrusel-cuantos-clientes", {
        x: "-100%",
        opacity: 0,
        duration: 1,
        //ease: "power1.inOut"
    }, "-=1")

    var tl2 = gsap.timeline({
        scrollTrigger: {
            scroller: "#viewport",
            trigger: ".carrusel-cuentos-clientes-container",
            scrub: true,
            start: "top top",
            end: "+=1000",
            //markers: true
        }
    })

    tl2.to(".card1-carrusel .body-card-carrusel-cuantos-clientes", {
        x: "-100%",
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    })

    tl2.to(".card1-carrusel .header-card-carrusel-cuantos-clientes", {
        x: "-100%",
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    }, "-=1")



    ////////////////// CARD 2 ////////////////////////////////////////////////////////////

    
    var tl3 = gsap.timeline({
        scrollTrigger: {
            scroller: "#viewport",
            trigger: ".carrusel-cuentos-clientes-container",
            scrub: true,
            start: "top 20%",
            end: "+=2000",
            //markers: true
        }
    })

    tl3.from(".card2-carrusel .body-card-carrusel-cuantos-clientes", {
        y: "100%",
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    })

    tl3.from(".card2-carrusel .header-card-carrusel-cuantos-clientes", {
        y: "500px",
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    }, "-=1")


    tl3.to(".card2-carrusel .body-card-carrusel-cuantos-clientes", {
        x: "-100%",
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    })

    tl3.to(".card2-carrusel .header-card-carrusel-cuantos-clientes", {
        x: "-100%",
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    }, "-=1")


    

    
    ////////////////// CARD 3 ////////////////////////////////////////////////////////////

    var tl4 = gsap.timeline({
        scrollTrigger: {
            scroller: "#viewport",
            trigger: ".card3-carrusel",
            scrub: true,
            start: "top bottom",
            end: "top top",
            containerAnimation: scrollTween,
            //markers: true
        }
    })

    tl4.from(".card3-carrusel .body-card-carrusel-cuantos-clientes", {
        x: "100%",
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    })

    tl4.from(".card3-carrusel .header-card-carrusel-cuantos-clientes", {
        x: "100%",
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    }, "-=1")

}
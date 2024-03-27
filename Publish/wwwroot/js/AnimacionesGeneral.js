
function AnimacionDestacados() {

    var tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".destacado-item",
        start: "top 80%",
        end: "top 40%",
        scrub: 0,
        scroller: "#viewport"
        //markers: true
      }
    });
    var tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".destacado-item",
        start: "top 80%",
        end: "top 40%",
        scrub: 0,
        scroller: "#viewport"
        //markers: true
      }
    });

    //Reveal de la imagen izq
    tl1.from(".destacado-item:nth-child(1)", {
      x: -100,
      opacity: 0,
      ease: "power1.inOut",
      duration: 5
    }).from(".destacado-item:nth-child(1) .destacado-item-body", {
      y: 50,
      opacity: 0,
      ease: "power1.inOut",
      duration: 3
    }, "-=2");

    //Reveal de la imagen der
    tl2.from(".destacado-item:nth-child(2)", {
      x: 100,
      opacity: 0,
      ease: "power1.inOut",
      duration: 5
    }).from(".destacado-item:nth-child(2) .destacado-item-body", {
      y: 50,
      opacity: 0,
      ease: "power1.inOut",
      duration: 3
    }, "-=2");

    //scroll de las imagenes
    gsap.to(".destacado-imagen", {
      y: 120,
      ease: "none",
      scrollTrigger: {
        trigger: ".destacado-imagen",
        start: "top 80%",
        // end: "bottom top",
        scrub: 0,
        scroller: "#viewport"
        //markers: true
      },
    });

    //Hover de las imagenes
    document.querySelectorAll(".destacado-item-header").forEach(function (element) {
      var animation = gsap.timeline({ paused: true });
      animation.to(element.firstElementChild, { scale: 1.1, rotate: 2, duration: .25, ease: "power1.inOut" });
      element.addEventListener("mouseenter", function () { animation.play(); });
      element.addEventListener("mouseleave", function () { animation.reverse(); });
    });

}

function AnimacionCarruselInsights() {

    let spaceBetween = 100;

    // Create a media condition that targets viewports 
    const mediaQuery2 = window.matchMedia('(min-width: 1700px)');
    const mediaQuery1 = window.matchMedia('(min-width: 1400px)');

    // Check if the media query is true
    if (mediaQuery2.matches) {
      spaceBetween = 170;
    } else if (mediaQuery1.matches) {
      spaceBetween = 160;
    }

    var swiper = new Swiper(".swiper-container", {
      /*initialSlide: 2,*/
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      spaceBetween: spaceBetween,
      loop: true,
      coverflowEffect: {
        rotate: 20,
        stretch: 0,
        depth: 350,
        modifier: 1,
        slideShadows: true
      },
      //pagination: {
      //el: ".swiper-pagination"
      //}
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    //Reveal contenedor
    gsap.from(".swiper-container", {
      y: -150,
      opacity: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".swiper-container",
        start: "top 80%",
        end: "top 40%",
        scrub: 0,
        scroller: "#viewport"
        //markers: true
      },
    });

    ////Reveal titulo
    //gsap.from("#pnlCarruselInsights-inside .header-left", {
    //  x: -350,
    //  opacity: 0,
    //  ease: "power1.inOut",
    //  scrollTrigger: {
    //    trigger: "#pnlCarruselInsights-inside .header-left",
    //    start: "top 70%",
    //    end: "top 35%",
    //    scrub: 0,
    //    scroller: "#viewport"
    //    //markers: true
    //  },
    //});

    ////Reveal vertodos
    //gsap.from("#pnlCarruselInsights-inside .header-right", {
    //  x: 350,
    //  opacity: 0,
    //  ease: "power1.inOut",
    //  scrollTrigger: {
    //    trigger: "#pnlCarruselInsights-inside .header-right",
    //    start: "top 70%",
    //    end: "top 35%",
    //    scrub: 0,
    //    scroller: "#viewport"
    //    //markers: true
    //  },
    //});

}

function AnimacionPanelEventoHome(identif) {

    gsap.set("#pnlEventos-inside-" + identif + " .header-left", { opacity: 1 });
    gsap.set("#pnlEventos-inside-" + identif + " .header-right", { opacity: 1 });

    var tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: "#pnlEventos-inside-" + identif + " .evento-item",
        start: "top 80%",
        end: "top 20%",
        scrub: 0,
        scroller: "#viewport"
        //markers: true
      }
    });
    var tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: "#pnlEventos-inside-" + identif + " .evento-item",
        start: "top 80%",
        end: "top 20%",
        scrub: 0,
        scroller: "#viewport"
        //markers: true
      }
    });

    //Reveal de la imagen izq
    tl1.from("#pnlEventos-inside-" + identif + " .evento-item:nth-child(1)", {
      x: -100,
      opacity: 0,
      ease: "power1.inOut",
      duration: 5
    }).from("#pnlEventos-inside-" + identif + " .evento-item:nth-child(1) .evento-item-body", {
      y: 50,
      opacity: 0,
      ease: "power1.inOut",
      duration: 3
    }, "-=2");

    //Reveal de la imagen der
    tl2.from("#pnlEventos-inside-" + identif + " .evento-item:nth-child(2)", {
      x: 100,
      opacity: 0,
      ease: "power1.inOut",
      duration: 5
    }).from("#pnlEventos-inside-" + identif + " .evento-item:nth-child(2) .evento-item-body", {
      y: 50,
      opacity: 0,
      ease: "power1.inOut",
      duration: 3
    }, "-=2");

    ////Reveal titulo
    //gsap.from("#pnlEventos-inside-" + identif + " .header-left", {
    //  x: -350,
    //  opacity: 0,
    //  ease: "power1.inOut",
    //  scrollTrigger: {
    //    trigger: "#pnlEventos-inside-" + identif + " .header-left",
    //    start: "top 70%",
    //    end: "top 35%",
    //    scrub: 0,
    //    //markers: true,
    //    scroller: "#viewport"
    //  },
    //});

    ////Reveal vertodos
    //gsap.from("#pnlEventos-inside-" + identif + " .header-right", {
    //  x: 350,
    //  opacity: 0,
    //  ease: "power1.inOut",
    //  scrollTrigger: {
    //    trigger: "#pnlEventos-inside-" + identif + " .header-right",
    //    start: "top 70%",
    //    end: "top 35%",
    //    scrub: 0,
    //    scroller: "#viewport"
    //    //markers: true
    //  },
    //});

}

function AnimarPanelEvento(identif) {
    
    document.querySelectorAll(".card-panel-evento").forEach(function (element, index) {
        gsap.from(element, {
            x: -100,
            opacity: 0,
            duration: 0.5,
            delay: 0.15 * (index % 4),
            scrollTrigger: {
                trigger: element,
                start: "top 95%",
                scroller: "#viewport",
                toggleActions: "restart none none reverse",
                //markers:true
            }
        });
    });

}

function AnimacionPanelInsights(identif) {

    //ScrollTrigger.batch("pnlInsights-inside .card-item", {
    //  interval: .5,
    //  scroller: "#viewport",
    //  //markers: true,
    //  onEnter: batch => {
    //    gsap.from(batch, {
    //      opacity: 0,
    //      x: -50,
    //      duration: 1,
    //      ease: "power4.out",
    //      overwrite: true
    //    });
    //  },
    //  onLeave: batch => {
    //    gsap.set(batch, {
    //      opacity: 1,
    //      x: 50,
    //      duration: 1,
    //      ease: "power4.out",
    //      stagger: 0.25,
    //    });
    //  }
    //});

    gsap.set("#pnlInsights-inside-" + identif + " .header-left", { opacity: 1 });
    gsap.set("#pnlInsights-inside-" + identif + " .header-right", { opacity: 1 });

		//let tl = gsap.timeline({
  //    scrollTrigger: {
  //      trigger: "#pnlInsights-inside-" + identif +" .card-container",
  //      scroller: "#viewport",
  //      scrub: true,
  //      //markers: true,
  //      start: () => "top 80%",
  //      end: "bottom 90%"
  //    }
  //  });

  //  document.querySelectorAll("#pnlInsights-inside-" + identif +" .card-item").forEach(function (element, index) {
  //    tl.from(element, {
  //      x: -50,
  //      opacity: 0,
  //      duration: 2,
  //      ease: "power1.inOut"
  //    }, "-=1")
  //  });


    document.querySelectorAll("#pnlInsights-inside-" + identif +" .card-item").forEach(function (element, index) {
      gsap.from(element, {
        x: -50,
        opacity: 0,
        duration: 0.5,
        ease: "power1.inOut",
        delay: 0.2 * (index % 4),
        scrollTrigger: {
          trigger: element,
          scroller: "#viewport",
          start: "top 95%",
            toggleActions: "restart none none reverse"
        }
      })
    });

    ////Reveal titulo
    //gsap.from("#pnlInsights-inside-" + identif +" .header-left", {
    //  x: -350,
    //  opacity: 0,
    //  ease: "power1.inOut",
    //  scrollTrigger: {
    //    trigger: "#pnlInsights-inside-" + identif +" .header-left",
    //    start: "top 70%",
    //    end: "top 35%",
    //    scrub: 0,
    //    //markers: true,
    //    scroller: "#viewport"
    //  },
    //});

    ////Reveal vertodos
    //gsap.from("#pnlInsights-inside-" + identif +" .header-right", {
    //  x: 350,
    //  opacity: 0,
    //  ease: "power1.inOut",
    //  scrollTrigger: {
    //    trigger: "#pnlInsights-inside-" + identif +" .header-right",
    //    start: "top 70%",
    //    end: "top 35%",
    //    scrub: 0,
    //    scroller: "#viewport"
    //    //markers: true
    //  },
    //});

}

function AnimacionPanelNovedad(identif) {

    ////Reveal contenedor
    //gsap.from(".card-container", {
    //  y: -100,
    //  opacity: 0,
    //  ease: "power1.inOut",
    //  scrollTrigger: {
    //    trigger: ".card-container",
    //    start: "top 80%",
    //    end: "top 40%",
    //    scrub: 0,
    //    scroller: "#viewport"
    //    //markers: true
    //  },
    //});

    //ScrollTrigger.batch(".card-item", {
    //  interval: .5,
    //  batchMax: 3,
    //  start: "top 70%",
    //  scroller: "#viewport",
    //  markers: true,
    //  scrub: 1,
    //  onEnter: batch => {
    //    gsap.from(batch, {
    //      opacity: 0,
    //      x: -50,
    //      duration: 1,
    //      ease: "power4.out",
    //      stagger: 0.25,
    //    });
    //  },
    //  onLeave: batch => {
    //    gsap.to(batch, {
    //      opacity: 1,
    //      x: 50,
    //      duration: 1,
    //      ease: "power4.out",
    //      stagger: 0.25,
    //    });
    //  }
    //});

		//const tl = gsap.timeline({
  //    scrollTrigger: {
  //      trigger: "#pnlNovedades-inside .card-container",
  //      scroller: "#viewport",
  //      scrub: true,
  //      //markers: true,
  //      start: () => "top 80%",
  //      end: "bottom 90%"
  //    }
  //  });

  //  document.querySelectorAll("#pnlNovedades-inside .card-item").forEach(function (element) {
  //    tl.from(element, {
  //      x: -50,
  //      opacity: 0,
  //      duration: 2,
  //      ease: "power1.inOut"
  //    }, '-=1')
  //  });

    document.querySelectorAll("#pnlNovedades-inside-" + identif + " .card-item").forEach(function (element, index) {
        gsap.from(element, {
            x: -50,
            opacity: 0,
            duration: 0.5,
            ease: "power1.inOut",
            delay: 0.2 * (index % 4),
            scrollTrigger: {
              trigger: element,
              scroller: "#viewport",
              start: "top 95%",
              toggleActions: "restart none none reverse"
            }
      })
    });

    ////Reveal titulo
    //gsap.from("#pnlNovedades-inside-" + identif + " .header-left", {
    //  x: -350,
    //  opacity: 0,
    //  ease: "power1.inOut",
    //  scrollTrigger: {
    //    trigger: "#pnlNovedades-inside-" + identif + " .header-left",
    //    start: "top 70%",
    //    end: "top 35%",
    //    scrub: 0,
    //    scroller: "#viewport"
    //    //markers: true
    //  },
    //});

    ////Reveal vertodos
    //gsap.from("#pnlNovedades-inside-" + identif + " .header-right", {
    //  x: 350,
    //  opacity: 0,
    //  ease: "power1.inOut",
    //  scrollTrigger: {
    //    trigger: "#pnlNovedades-inside-" + identif + " .header-right",
    //    start: "top 70%",
    //    end: "top 35%",
    //    scrub: 0,
    //    scroller: "#viewport"
    //    //markers: true
    //  },
    //});

}

let animacionCompleta = false;

function AnimacionPanelInstitucional() {

    //mobile
  let zScale = 300;

  let xMov = "9330px";
  let yMov = "-2610px";

    // Create a media condition that targets viewports at least 768px wide
    const mediaQuery3 = window.matchMedia('(min-width: 992px)')
    const mediaQuery2 = window.matchMedia('(min-width: 768px)')
    const mediaQuery1 = window.matchMedia('(min-width: 576px)')

    var startTl1 = "top top+=100";
    var endTl1 = "+=500"

    var startTl2 = "top top+=100";
    var endTl2 = "+=800";
    var trigger = "#pnlInstitucional"
    var trigger2 = "#pnlInstitucional"

    // Check if the media query is true
    if (mediaQuery3.matches) {
      xMov = "1550vw";
       yMov = "-440vw";
        startTl2 = "center center";
        endTl2 = "+=900";

        startTl1 = "center center";
        endTl1 = "+=350"
    } else if (mediaQuery2.matches) {
      xMov = "12000px";
        yMov = "-3210px";
        endTl1 = "+=400";
    } else if (mediaQuery1.matches) {
      xMov = "11500px";
      yMov = "-3310px";
    } 

    var logoBack = $(".logo-back");

    var tl1 = gsap.timeline({
        scrollTrigger: {
            trigger: trigger,
            scroller: "#viewport",
            scrub: true,
            //markers: true,
            /*pin: true,*/
            start: startTl1,
            end: endTl1,
            

        },
    }).to(".swiper-panel-institucional", {
        duration: 6,
        
    }).from(".swiper-panel-institucional", {
        duration: 4,
        opacity: "0",
        onComplete: function () {
            if (!animacionCompleta) {
                animacionCompleta = true;
                let sections = gsap.utils.toArray(".swiper-slide-institucional");

                let startCarrusel = "top 10%"
                let endCarrusel = "+=1500"
                let restar = 1.45

                if (window.matchMedia('(max-width: 1024px)').matches) {
                    //startCarrusel = "bottom-=60 bottom"
                    endCarrusel = "+=1000"
                    restar = 1
                }

                let scrollTween = gsap.to(sections, {
                    xPercent: -100 * (sections.length - restar),
                    ease: "none",
                    onEnter: function () {
                        //institucional-container-pin
                        //$(".institucional-container").addClass("institucional-container-pin");
                    },
                    scrollTrigger: {
                        trigger: trigger2,
                        pin: true,
                        scrub: 0.1,
                        start: startCarrusel,
                        end: endCarrusel,
                        scroller: "#viewport",
                        //markers: true
                    }
                });
            }
            
        }
    }, "-=4")

    var tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: trigger,
            scroller: "#viewport",
            scrub: true,
            //markers: true,
            pin: true,
            start: startTl2,
            end: endTl2,    
        },
    }).to(".logo-back", {
        scale: zScale,
        x: xMov,
        y: yMov,
        duration: 6,
        ease: "power1.in"
    }).to(".logo-back", {
        display: "none"
    }, "-=4")

    
    
}

function AnimacionPanelModoMarval() {

    gsap.timeline({
      scrollTrigger: {
        trigger: ".modomarval-container",
        scroller: "#viewport",
        scrub: true,
        //markers: true,
        start: () => "top 80%",
        end: "top 10%"
      }
    })
    .from(".modomarval-text", {
      x: -300,
      opacity: 0,
      duration: 4,
      ease: "power1.inOut"
    })
    .from(".modomarval-logo", {
      x: -300,
      opacity: 0,
      duration: 4,
      ease: "power1.inOut"
    }, '-=2')
    .from(".modomarval-button", {
      opacity: 0,
      duration: 4,
      ease: "power1.inOut"
    })
    .from(".modomarval-right", {
      x: 300,
      opacity: 0,
      duration: 6,
      ease: "power1.inOut"
    }, '-=8');

    //scroll de las imagenes
    gsap.to(".modomarval-right img", {
      y: 120,
      ease: "none",
      scrollTrigger: {
        trigger: ".modomarval-right img",
        start: "top 80%",
        scrub: 0,
        scroller: "#viewport"
      },
    });

    //scroll texto
    gsap.to(".modomarval-text", {
      y: -100,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".modomarval-text",
        start: "top 50%",
        scrub: 0,
        scroller: "#viewport"
      },
    });

    //scroll logo
    gsap.to(".modomarval-logo", {
      y: -50,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".modomarval-logo",
        start: "top 50%",
        scrub: 0,
        scroller: "#viewport"
      },
    });

}

function AnimacionSliderPrincipal() {

    document.querySelector('#pnlSliderPrincipal').querySelectorAll('.animate, .animateL').forEach(el => { obsAnimation.observe(el) });

    $(".rampas-slider-container").css("opacity", 1);

    var tlRampas = gsap.timeline();

    tlRampas.from(".rampas-slider-container", {
        y: 300,
        duration: 1.4,
        opacity: 0,
        ease: "power1.easeInOut"
    })

    tlRampas.from(".carousel-indicators", {
        y: 300,
        duration: 1.4,
        opacity: 0,
        ease: "power1.easeInOut"
    }, "-=1.2")


    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".carousel-item.active",
            start: "top top",
            end: "bottom 30%",
            scrub: 0,
            scroller: "#viewport",
            //markers: true
        }
    })


    //Scale del video
    tl.to(".carousel-item.active video", {
      scale: 2,
      opacity: 0,
      duration: 1,
      ease: "none"
    });

    //Scale del titulo
    tl.to(".title-slider-container", {
      scale: 2,
      x: 300,
      y: "-30vh",
      opacity: 0,
      duration: 1,
      ease: "none",
    }, "-=1");

    tl.to(".copete-slider-container", {
        opacity: 0,
        y: "-20vh",
        duration: 1,
        ease: "none",
    }, "-=1")

    tl.to(".boton-slider-container", {
        opacity: 0,
        y: "-15vh",
        duration: 1,
        ease: "none",
    }, "-=1")


}

async function AnimacionBanner() {

    CortarParrafos("banner-text");


    //scroll texto
    gsap.from(".banner-text", {
      y: 50,
      opacity: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#pnlBanner-inside",
        start: "top 80%",
        end: "top 50%",
        scrub: 0,
          scroller: "#viewport",
          //markers:true
      },
    });

    //scroll button
    gsap.from(".banner-button", {
      y: 100,
      opacity: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#pnlBanner-inside",
        start: "top 80%",
        end: "top 50%",
        scrub: 0,
        scroller: "#viewport"
      },
    });

}

function AnimacionBuscar() {

  return new Promise((resolve, reject) => {

      $("#pnlRecientes").hide();
      $("#pnlContenido").show();

      $(".modulo-content").addClass("modulo-content-ocultar");
      $(".modulo-result-content").addClass("modulo-result-content-mostrar");
      resolve();
  });
}

function AnimacionVolverAlBuscador() {

    return new Promise((resolve, reject) => {

        $("#pnlContenido").hide();
        $("#pnlRecientes").show();

        $(".modulo-content").removeClass("modulo-content-ocultar");
        $(".modulo-result-content").removeClass("modulo-result-content-mostrar");

        resolve();
    })
}
    
function AnimacionPanelProfesionales() {

  gsap.set("#pnlProfesionales-inside div:first-child", { opacity: 1 });
  gsap.set(".profesional-item", { opacity: 1 });

  let tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: "#pnlProfesionales-inside",
      start: "top 80%",
      end: "top 40%",
      //scrub: 0,
      scroller: "#viewport",
      //markers: true,
    },
    delay: 0.5
  });

  tl1
    .from("#pnlProfesionales-inside div:first-child", {
      x: 100,
      opacity: 0,
      ease: "power1.inOut",
      duration: 0.7
    })
    .from(".profesional-item", {
      x: 100,
      opacity: 0,
      ease: "power1.inOut",
      duration: 0.7
    }, "-=0.6");

}


async function AnimacionTextoSlideUp(boton = false) {
    var pnl = $(".texto-slide-up");
    
    const promise = CortarParrafos("texto-slide-up");

    promise.then(async (values) => {
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: pnl,
                scroller: "#viewport",
                start: "top 70%",
                end: "top center",
                /*toggleActions: "restart none none reverse",*/
                //markers:true
            }
        })

        tl.from(".intro-line", {
            duration: 1,
            opacity: 0,
            y: 100,
            ease: "power4.out",
            stagger: 0.1,
        })

        if (boton) {
            tl.from(".btn-slide-up", {
                duration: 1,
                opacity: 0,
                y: 100,
                ease: "power4.out",
            }, "-=1")
        }
    });

}

function AnimacionPanelPremios() {

    var elementosaMostrar = 1;

    var mediaQueryTablet = window.matchMedia('(min-width: 768px)');
    var mediaQueryLaptop = window.matchMedia('(min-width: 992px)');
    var mediaQueryLaptopXL = window.matchMedia('(min-width: 1200px)');

    if (mediaQueryLaptopXL.matches) {
        elementosaMostrar = 4;
    } else if (mediaQueryLaptop.matches) {
        elementosaMostrar = 3;
    } else if (mediaQueryTablet.matches) {
        elementosaMostrar = 2;
    }

    document.querySelectorAll(".card-panel-premio").forEach(function (element, index) {
        gsap.from(element, {
            x: -50,
            opacity: 0,
            duration: 0.5,
            ease: "power1.inOut",
            delay: 0.2 * (index % elementosaMostrar),
            scrollTrigger: {
                trigger: element,
                scroller: "#viewport",
                start: "top 80%",
                toggleActions: "restart none none reverse",
                /*markers:true*/
            }
        })
    });
}

function AnimacionDetalleEvento() {


    $(".header-evento-detalle h1").css("opacity", 1);
    $(".header-evento-detalle .img-header-evento-detalle").css("opacity", 1);
    $(".texto-header-evento-detalle").css("opacity", 1);
    $(".header-informacion-evento-detalle").css("opacity", 1);
    $(".nav-detalle").css("opacity", 1);

    gsap.timeline()
    .from(".header-evento-detalle h1", {
        y: 100,
        opacity:0,
        duration:1
    })
    .from(".header-evento-detalle .img-header-evento-detalle", {
        x: 300,
        /*opacity: 0,*/
        duration:1
    }, "-=0.7")
    .from(".texto-header-evento-detalle", {
        y: 100,
        opacity: 0,
        duration:1
    }, "-=1")
    

    var tl = gsap.timeline();

    document.querySelectorAll(".header-informacion-evento-detalle ul li").forEach(function (element, index) {
        tl.from(element, {
            x: -100,
            opacity: 0,
            duration: 0.5,
            ease: "power1.inOut",
            delay: 0.2
        }, "-=0.5")
    });

    gsap.set(".body-evento-detalle", { opacity: 1 });

    gsap.timeline({
        scrollTrigger: {
            trigger: ".body-evento-detalle",
            start: "top 80%",
            end: "top 40%",
            //scrub: 0,
            scroller: "#viewport",
            //markers: true,
            toggleActions: "restart none none reverse",
        }
    })
        .from(".titulo-descripcion-detalle-evento", {
        x: -100,
        opacity: 0,
        duration: 1
    })
    .from(".descricion-evento-detalle", {
        y: 100,
        opacity: 0,
        duration: 1
    }, "-=0.85")
    .from(".citaOriginal-evento-detalle", {
        x: 100,
        scale: 0.9,
        opacity: 0,
        duration: 1
    }, "-=1")
    .from(".body-evento-detalle aside .video-wrapper", {
        x: 100,
        scale: 0.9,
        opacity: 0,
        duration: 1,
    }, "-=1")
    .from(".citaExtra-evento-detalle", {
        x: 100,
        scale: 0.9,
        opacity: 0,
        duration: 1,
    }, "-=0.7")


    

}

function AnimarPanelProfesionalesAlternativo() {

    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".pnl-profesionales-alternativo",
            start: "top 80%",
            scroller: "#viewport",
            toggleActions: "restart none none reverse",
        }
    })
        .from(".titulo-descripcion-oradores", {
        x: -100,
        duration: 0.8,
        opacity:0
    })

    document.querySelectorAll(".profesional-item").forEach(function (element, index) {
        tl.from(element, {
            x: -150,
            opacity: 0,
            duration: 0.5,
            delay: 0.02,
            
        }, "-=0.5")
    });

    var px = parseInt($(".pnl-profesionales-alternativo").css("height"));
    var vh = parseInt(window.innerHeight * 0.8)
    if (px == vh) {
        $(".icon-expandir-mas").css("display", "flex");
        $(".icon-expandir-mas span").on("click", function () {

            var icon = $(".icon-expandir-mas span");

            var expandir = !(icon.hasClass("expand_more"));
            if (expandir) {
                icon.toggleClass('expand_less expand_more');
                icon.html("expand_more")
                $(".pnl-profesionales-alternativo").css("max-height", window.innerHeight * 0.8);
                
            } else {
                icon.toggleClass('expand_more expand_less');
                icon.html("expand_less")
                $(".pnl-profesionales-alternativo").css("max-height", "none");
            }
        })
    }

}

function AnimarPanelAgenda() {

    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".pnl-agenda",
            start: "top 80%",
            toggleActions: "restart none none reverse",
            scroller: "#viewport"
        }
    })
    tl.from(".titulo-agenda-panel", {
        x: -100,
        duration: 1,
        opacity:0
    })
    tl.from("#btn-descargar-agenda", {
        x: -100,
        duration: 1,
        opacity: 0
    }, "-=0.7")
    tl.from(".agenda-header select", {
        x: 100,
        duration: 1,
        opacity:0
    }, "-=0.7")

    var tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".pnl-agenda",
            start: "top 80%",
            toggleActions: "restart none none reverse",
            scroller: "#viewport"
        }
    });

    Array.from(document.querySelectorAll(".s-dia")).reverse().forEach(function (element, index) {
        tl2.from(element, {
            x: 50,
            opacity: 0,
            duration: 0.3,
            ease: "power1.inOut",
            delay: 0.2
        }, "-=0.3");
    });


}

function AnimarDetalleAgenda() {

    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".contenido-agenda",
            start: "top 80%",
            toggleActions: "restart none none reverse",
            scroller: "#viewport"
        }
    })

    document.querySelectorAll(".card-contenido-agenda").forEach(function (element, index) {
        tl.from(element, {
            x: -50,
            opacity: 0,
            duration: 0.2,
            delay: 0.08,
        }, "-=0.2")
    });

}

function AnimarEventoContenidoExtra() {

    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".titulo-left-contenido-extra",
            start: "top 80%",
            scroller: "#viewport",
            toggleActions: "restart none none reverse",
        }
    })
    tl.from(".titulo-left-contenido-extra", {
        x: -100,
        duration: 1,
        opacity:0
    })

    document.querySelectorAll(".card-contenido-extra").forEach(function (element, index) {
        gsap.from(element, {
            scale: 0.8,
            opacity: 0,
            duration: 0.4,
            delay: 0.2 * (index % 2),
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                scroller: "#viewport",
                toggleActions: "restart none none reverse",
            }
        })
    });

}

function AnimarPanelPodcast() {

    $(".card-podcast-animacion").css("opacity", 1);

    var media1024 = window.matchMedia('(max-width: 1024px)');

    var col = 4;
    if (media1024.matches) {
        col = 3;
    }

    document.querySelectorAll(".card-podcast-animacion").forEach(function (element, index) {
        gsap.from(element, {
            x: -100,
            opacity: 0,
            duration: 0.5,
            delay: 0.2 * (index % col),
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "restart none none reverse",
                scroller: "#viewport",
                //markers: true
            }
        });
    });


}

function AnimarPodcastEpisodios() {

    $(".texto-header-podcastEpisodio .aside-header-podcastEpisodio").css("opacity", 1);
    $(".texto-header-podcastEpisodio .titulo-header-podcastEpisodio").css("opacity", 1);
    $(".texto-header-podcastEpisodio .episodios-header-podcastEpisodio").css("opacity", 1);

    var tl = gsap.timeline();

    tl.from(".aside-header-podcastEpisodio", {
        x: -100,
        opacity: 0,
        duration: 1
    })

    tl.from(".titulo-header-podcastEpisodio", {
        x: -100,
        opacity: 0,
        duration: 1
    }, "-=0.7")

    tl.from(".episodios-header-podcastEpisodio", {
        x: -100,
        opacity: 0,
        duration: 1
    }, "-=0.7")

}

function AnimacionPanelPodcastEpisodios() {

    $("#pnl-podcast-episodio-gsap").css("opacity", 1)
    $(".card-episodio-animacion").css("opacity", 1);

    var media992 = window.matchMedia('(min-width: 992px)');

    var col = 1;
    if (media992.matches) {
        col = 4;
    }

    document.querySelectorAll(".card-episodio-animacion").forEach(function (element, index) {
        gsap.from(element, {
            x: -100,
            opacity: 0,
            duration: 0.5,
            delay: 0.2 * (index % col),
            scrollTrigger: {
                trigger: element,
                start: "top 92%",
                toggleActions: "restart none none reverse",
                scroller: "#viewport",
                /*markers: true*/
            }
        });
    });

}

function AnimarDatosPanelPremios() {
    $(".card-panel-premio").css("opacity", 1)

    var media1400 = window.matchMedia('(min-width: 1400px)');
    var media992 = window.matchMedia('(min-width: 992px)');

    var col = 1;

    if (media992.matches) {
        col = 3;
    }

    if (media1400.matches) {
        col = 4;
    }

    document.querySelectorAll(".card-panel-premio").forEach(function (element, index) {
        gsap.from(element, {
            x: -100,
            opacity: 0,
            duration: 0.5,
            delay: 0.2 * (index % col),
            scrollTrigger: {
                trigger: element,
                start: "top 90%",
                toggleActions: "restart none none reverse",
                scroller: "#viewport",
                //markers: true
            }
        });
    });


}

function AnimarDetallePremio() {
    $(".contenido-type").css("opacity", 1)
    $(".contenido-titulo").css("opacity", 1)
    $(".contenido-date").css("opacity", 1)
    $(".contenido-date").css("opacity", 1)
    $(".contenido-description").css("opacity", 1)

    var tl = gsap.timeline();

    tl.from(".contenido-type", {
        y: 50,
        opacity: 0,
        duration: 0.5,
        ease: "power1.inOut",
    })

    tl.from(".contenido-titulo", {
        y: 50,
        opacity: 0,
        duration: 0.5,
        ease: "power1.inOut",
    }, "-=0.3")

    tl.from(".contenido-copete", {
        y: 50,
        opacity: 0,
        duration: 0.5,
        ease: "power1.inOut",
    }, "-=0.4")

    tl.from(".contenido-date", {
        y: 50,
        opacity: 0,
        duration: 0.5,
        ease: "power1.inOut",
    }, "-=0.5")

    tl.from(".contenido-description", {
        y: 50,
        opacity: 0,
        duration: 0.5,
        ease: "power1.inOut",
    }, "-=0.5")
}

function AnimarPerfilFirma() {

    $(".modulo-titulo").css("opacity", 1);
    $(".pfc-animation .header-left").css("opacity", 1);
    $(".pfc-animation .perfil-firma-container-text").css("opacity", 1);

    $(".nh-animation .header-left").css("opacity", 1);
    $(".nh-animation .perfil-firma-container-text").css("opacity", 1);

    gsap.from(".modulo-titulo", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    })

    var tl1 = gsap.timeline({
        scrollTrigger: {
            trigger: ".pfc-animation",
            start: "top 80%",
            scroller: "#viewport",
            toggleActions: "restart none none reverse",
        }
    })

    tl1.from(".pfc-animation .header-left", {
        x: -50,
        opacity: 0,
        duration: 0.7,
        ease: "power1.inOut"
    })

    tl1.from(".pfc-animation .perfil-firma-container-text", {
        y: 50,
        opacity: 0,
        duration: 0.7,
        ease: "power1.inOut"
    }, "-=0.55")

    var tl1 = gsap.timeline({
        scrollTrigger: {
            trigger: ".nh-animation",
            start: "top 80%",
            scroller: "#viewport",
            toggleActions: "restart none none reverse",
        }
    })

    tl1.from(".nh-animation .header-left", {
        x: -50,
        opacity: 0,
        duration: 0.7,
        ease: "power1.inOut"
    })

    tl1.from(".nh-animation .perfil-firma-container-text", {
        y: 50,
        opacity: 0,
        duration: 0.7,
        ease: "power1.inOut"
    }, "-=0.55")


}

function AnimarVinculosInternacionales() {

    $(".modulo-titulo").css("opacity", 1);
    $(".body-varios").css("opacity", 1);


    gsap.from(".modulo-titulo", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    })


    document.querySelectorAll(".titulo-varios").forEach(function (element, index) {
        gsap.from(element, {
            x: -100,
            opacity: 0,
            duration: 0.5,
            
            scrollTrigger: {
                trigger: element,
                start: "top 90%",
                toggleActions: "restart none none reverse",
                scroller: "#viewport",
                //markers: true
            }
        });
    });

    document.querySelectorAll(".descripcion-body-card-varios").forEach(function (element, index) {
        gsap.from(element, {
            y: 100,
            opacity: 0,
            duration: 0.7,

            scrollTrigger: {
                trigger: element,
                start: "top 95%",
                toggleActions: "restart none none reverse",
                scroller: "#viewport",
                //markers: true
            }
        });
    });

    document.querySelectorAll(".imagen-body-card-varios").forEach(function (element, index) {
        gsap.from(element, {
            x: 100,
            opacity: 0,
            duration: 0.7,

            scrollTrigger: {
                trigger: element,
                start: "top 95%",
                toggleActions: "restart none none reverse",
                scroller: "#viewport",
                //markers: true
            }
        });
    });

}

function AnimarInternationalDesk() {

    $(".modulo-titulo").css("opacity", 1);
    $(".body-varios").css("opacity", 1);

    gsap.from(".modulo-titulo", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    })

    document.querySelectorAll(".titulo-varios").forEach(function (element, index) {
        gsap.from(element, {
            x: -100,
            opacity: 0,
            duration: 0.5,
            ease: "power1.inOut",

            scrollTrigger: {
                trigger: element,
                start: "top 90%",
                toggleActions: "restart none none reverse",
                scroller: "#viewport",
                //markers: true
            }
        });
    });

    document.querySelectorAll(".descripcion-body-card-varios").forEach(function (element, index) {
        gsap.from(element, {
            /*x: -100,*/
            opacity: 0,
            duration: 1,
            ease: "power1.inOut",

            scrollTrigger: {
                trigger: element,
                start: "top 90%",
                toggleActions: "restart none none reverse",
                scroller: "#viewport",
                //markers: true
            }
        });
    });

}

function AnimarInternationalDeskProfesional(id) {
    gsap.set("#pnlContactos-" + id + " .animar-pnl-profesionales-lateral .panel-titulo", { opacity: 1 });
    gsap.set("#pnlContactos-" + id + " .profesional-item", { opacity: 1 });

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#pnlContactos-" + id,
            scroller: "#viewport",
            start: "bottom bottom",
            toggleActions: "restart none none reverse",
        }
    })

    tl.from("#pnlContactos-" + id + " .panel-titulo", {
        x: 100,
        opacity: 0,
        duration: 0.5,
        ease: "power1.inOut"
    })

    tl.from("#pnlContactos-" + id + " .profesional-item", {
        x: 100,
        opacity: 0,
        duration: 0.5,
        ease: "power1.inOut"
    }, "-=0.4")
}

function AnimarPremios() {
    $(".modulo-titulo").css("opacity", 1);

    gsap.from(".modulo-titulo", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    })
}

function AnimarVarios() {
    $(".modulo-titulo").css("opacity", 1);
    $(".body-varios").css("opacity", 1);

    gsap.from(".modulo-titulo", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    })

    gsap.from(".descripcion-body-card-varios", {
        
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    })
}

function AnimarPanelBuscador() {

    $(".container-panel-buscador").css("opacity", 1);

    document.querySelectorAll(".card-buscador").forEach(function (element, index) {
        gsap.from(element, {
            x: -100,
            opacity: 0,
            duration: 0.5,
            delay: 0.07 * index
        });
    });


}

function AnimarPremiosDiversidad() {
    gsap.from(".header-panel-premio-diversidad .titulo-header", {
        y: -300,
        opacity: 0,
        scrollTrigger: {
            scroller: "#viewport",
            trigger: ".panel-premio-diversidad-container",
            scrub: true,
            start: "top bottom",
            end: "+=400",
            //markers:true
        }
    })

    var media992 = window.matchMedia('(min-width: 992px)');

    var col = 1;
    if (media992.matches) {
        col = 4;
    }

    document.querySelectorAll(".card-panel-premio-diversidad").forEach(function (element, index) {
        gsap.from(element, {
            x: -100,
            opacity: 0,
            duration: 0.5,
            delay: 0.2 * (index % col),
            scrollTrigger: {
                trigger: element,
                start: "top 92%",
                toggleActions: "restart none none reverse",
                scroller: "#viewport",
                //markers: true
            }
        });
    });
}
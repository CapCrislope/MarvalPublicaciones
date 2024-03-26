
function AnimacionDetalleInsight() {

    gsap.set(".contenido-type", { opacity: 1 });
    gsap.set(".contenido-titulo", { opacity: 1 });
    gsap.set(".contenido-copete", { opacity: 1 });
    gsap.set(".contenido-date", { opacity: 1 });
    gsap.set(".contenido-picture", { opacity: 1 });
    gsap.set(".pnlDescarga-detalle-insights", { opacity: 1 });

    let tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".contenido-article",
        start: "top 80%",
        end: "top 40%",
        //scrub: 0,
        scroller: "#viewport"
        //markers: true
      }
    });

    //Reveal de la imagen izq
    tl1
    .from(".contenido-type", {
      y: 50,
      opacity: 0,
      ease: "power1.inOut",
      duration: 0.7
    }).from(".contenido-titulo", {
      y: 50,
      opacity: 0,
      ease: "power1.inOut",
      duration: 0.7
    }, "-=0.6")
    .from(".contenido-copete", {
      y: 50,
      opacity: 0,
      ease: "power1.inOut",
      duration: 0.7
    }, "-=0.6")
    .from(".contenido-date", {
      y: 50,
      opacity: 0,
      ease: "power1.inOut",
      duration: 0.7
    }, "-=0.6")
    .from(".contenido-picture", {
      y: 50,
      opacity: 0,
      ease: "power1.inOut",
      duration: 0.7
    }, "-=0.6")
    .from(".pnlDescarga-detalle-insights", {
      x: 100,
      opacity: 0,
      ease: "power1.inOut",
      duration: 0.7
    }, "-=0.6");

    let tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".boton-escuchar",
        start: "top 90%",
        end: "top 70%",
        //scrub: 0,
        //markers: true,
        scroller: "#viewport"
      }
    });

    tl2.from(".boton-escuchar", {
        x: -150,
        opacity: 0,
        ease: "power1.inOut",
        duration: 1
    })
        
    //Reveal Descripcion
    tl2.from(".contenido-description", {
      y: 150,
      opacity: 0,
      ease: "power1.inOut",
      duration: 1
    }, "-=0.7")
    .from(".contenido-legal", {
      opacity: 0,
      ease: "power1.inOut",
      duration: 1
    }, "-=0.3");
}

function AnimacionDetalleProfesional() {

  gsap.set(".profesional-detail-identi", { opacity: 1 });
  gsap.set(".profesional-detail-areas", { opacity: 1 });
  gsap.set(".profesional-detail-contacto", { opacity: 1 });
  gsap.set(".profesional-detail-links", { opacity: 1 });
  gsap.set(".profesional-detail-image-container", { opacity: 1 });

  let tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: "#pnlTarjeta",
      start: "top 80%",
      end: "top 40%",
      //scrub: 0,
      scroller: "#viewport"
      //markers: true
    }
  });

  //Reveal de la imagen izq
  tl1
    .from(".profesional-detail-identi", {
      y: 50,
      opacity: 0,
      ease: "power1.inOut",
      duration: 0.7
    }).from(".profesional-detail-areas", {
      y: 50,
      opacity: 0,
      ease: "power1.inOut",
      duration: 0.7
    }, "-=0.6")
    .from(".profesional-detail-contacto", {
      y: 50,
      opacity: 0,
      ease: "power1.inOut",
      duration: 0.7
    }, "-=0.6")
    .from(".profesional-detail-links", {
      y: 50,
      opacity: 0,
      ease: "power1.inOut",
      duration: 0.7
    }, "-=0.6")
    .from(".profesional-detail-image-container", {
      x: 200,
      opacity: 0,
      ease: "power1.Out",
      duration: 1.5
    }, "-=0.6")
    

  let tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: "#pnlBiografia",
      start: "top 90%",
      end: "top 50%",
      //scrub: 0,
      //markers: true,
      scroller: "#viewport"
    }
  });

    tl2.from(".header-left", {
        x: -100,
        opacity: 0,
        ease: "power1.inOut",
        duration: 0.7
    });

  //Reveal Descripcion
  tl2.from(".profesional-detail-biography-text", {
    y: 150,
    opacity: 0,
    ease: "power1.Out",
    duration: 0.7
  }, "-=0.4");
}

function AnimacionDetalleNovedades() {

    gsap.set(".contenido-type", { opacity: 1 });
    gsap.set(".contenido-titulo", { opacity: 1 });
    gsap.set(".contenido-copete", { opacity: 1 });
    gsap.set(".contenido-date", { opacity: 1 });

    let tl1 = gsap.timeline({
        scrollTrigger: {
            trigger: ".contenido-article",
            start: "top 80%",
            end: "top 40%",
            //scrub: 0,
            scroller: "#viewport"
            //markers: true
        }
    });

    //Reveal de la imagen izq
    tl1
        .from(".contenido-type", {
            y: 50,
            opacity: 0,
            ease: "power1.inOut",
            duration: 0.7
        })
        .from(".contenido-titulo", {
            y: 50,
            opacity: 0,
            ease: "power1.inOut",
            duration: 0.7
        }, "-=0.6")
        .from(".contenido-copete", {
            y: 50,
            opacity: 0,
            ease: "power1.inOut",
            duration: 0.7
        }, "-=0.6")
        .from(".contenido-date", {
            y: 50,
            opacity: 0,
            ease: "power1.inOut",
            duration: 0.7
        }, "-=0.6");

    let tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".contenido-description",
            start: "top 100%",
            end: "top 70%",
            //scrub: 0,
            //markers: true,
            scroller: "#viewport"
        }
    });

    //Reveal Descripcion
    tl2.from(".contenido-description", {
        y: 150,
        opacity: 0,
        ease: "power1.inOut",
        duration: 1
    })
}

function AnimacionDetalleArea() {

  gsap.set(".titulo-header-areapractica-detalle", { opacity: 1 });
  gsap.set(".copete-header-areapractica-detalle", { opacity: 1 });
  $(".descripcion-area-practica-detalle").css("opacity", "1");

  let tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".header-detalle",
      start: "top 80%",
      end: "top 40%",
      //scrub: 0,
      scroller: "#viewport"
      //markers: true
    }
  });

  //Reveal de la imagen izq
  tl1
    .from(".titulo-header-areapractica-detalle", {
      y: 50,
      opacity: 0,
      ease: "power1.inOut",
      duration: 0.7
    })
    .from(".copete-header-areapractica-detalle", {
      y: 50,
      opacity: 0,
      ease: "power1.inOut",
      duration: 0.7
    }, "-=0.6")
    

  let tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".descripcion-area-practica-detalle",
      start: "top 100%",
      end: "top 70%",
      //scrub: 0,
      //markers: true,
      scroller: "#viewport"
    }
  });

  //Reveal Descripcion
  tl2.from(".descripcion-area-practica-detalle", {
    y: 150,
    opacity: 0,
    ease: "power1.inOut",
    duration: 1
  })
}

function AnimarNavegadorDetalle() {

    //$(".destacada-nav-detalle").css("opacity", 1)
    //$(".nav-detalle li").css("opacity", 0.7)

    $(".nav-detalle").css("opacity", 1);

    var tl = gsap.timeline();

    tl.from(".destacada-nav-detalle", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power1.Out",
    });

    document.querySelectorAll(".nav-detalle li").forEach(function (element, index) {
        tl.from(element, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power1.Out",
            delay: .07
        }, "-=1");
    });

}


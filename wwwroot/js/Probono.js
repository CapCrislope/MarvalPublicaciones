function MenuBlack() {
    $(".nav-carrera-container")
        .addClass("nav-carrera-container-black")
}

function CargarHeaderProbono() {
    $("#HeaderProbono").load("/Probono/Header", function (response, status, xhr) {
        if (status == "success") {
               
        }
    })
}

function CargarHorasTrabajoProbono() {
    $("#HorasTrabajoProbono").load("/Probono/HorasTrabajo", function (response, status, xhr) {
        if (status == "success") {
            if ($('#HorasTrabajoProbono .loadNext').length) {
                document.querySelector("#HorasTrabajoProbono .loadNext").dataset.func = "CargarCarruselHorasEquipo";
                document.querySelectorAll("#HorasTrabajoProbono .loadNext").forEach(el => { obsLoad.observe(el) });
            }
            else {
                CargarCarruselHorasEquipo();
            }
        }
    })
}

function CargarCarruselHorasEquipo() {
    $("#CarruselHorasEquipo").load("/Probono/CarruselHorasEquipo", function (response, status, xhr) {
        if (status == "success") {
            if ($('#CarruselHorasEquipo .loadNext').length) {
                document.querySelector("#CarruselHorasEquipo .loadNext").dataset.func = "CargarEnQueTrabajamos";
                document.querySelectorAll("#CarruselHorasEquipo .loadNext").forEach(el => { obsLoad.observe(el) });
            }
            else {
                CargarEnQueTrabajamos();
            }
        }
    })
}

function CargarEnQueTrabajamos() {
    $("#EnQueTrabajamos").load("/Probono/EnQueTrabajamos", function (response, status, xhr) {
        if (status == "success") {
            if ($('#EnQueTrabajamos .loadNext').length) {
                document.querySelector("#EnQueTrabajamos .loadNext").dataset.func = "CargarQuienesTrabajamos";
                document.querySelectorAll("#EnQueTrabajamos .loadNext").forEach(el => { obsLoad.observe(el) });
            }
            else {
                CargarQuienesTrabajamos();
            }
        }
    })
}


function CargarQuienesTrabajamos() {
    $("#QuienesTrabajamos").load("/Probono/QuienesTrabajamos", function (response, status, xhr) {
        if (status == "success") {
            if ($('#QuienesTrabajamos .loadNext').length) {
                document.querySelector("#QuienesTrabajamos .loadNext").dataset.func = "CargarCarruselCuentosClientes";
                document.querySelectorAll("#QuienesTrabajamos .loadNext").forEach(el => { obsLoad.observe(el) });
            }
            else {
                CargarCarruselCuentosClientes();
            }
        }
    })
}

function CargarCarruselCuentosClientes() {
    $("#CarruselCuentosClientes").load("/Probono/CarruselCuantosClientes", function (response, status, xhr) {
        if (status == "success") {
            if ($('#CarruselCuentosClientes .loadNext').length) {
                document.querySelector("#CarruselCuentosClientes .loadNext").dataset.func = "CargarFooter";
                document.querySelectorAll("#CarruselCuentosClientes .loadNext").forEach(el => { obsLoad.observe(el) });
            }
            else {
                CargarFooter();
            }
        }
    })
}





function EspacioEjemplo() {
    $("#EspacioEjemplo").load("/Probono/EspacioEjemplo", function (response, status, xhr) {
        if (status == "success") {
            if ($('#QuienesTrabajamos .loadNext').length) {
                document.querySelector("#QuienesTrabajamos .loadNext").dataset.func = "EspacioEjemplo";
                document.querySelectorAll("#QuienesTrabajamos .loadNext").forEach(el => { obsLoad.observe(el) });
            }
            else {
                EspacioEjemplo();
            }
        }
    })
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
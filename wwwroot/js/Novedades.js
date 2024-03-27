var frmNovedades = 'Novedades';

function CargarBuscador() {
    $("#pnlBuscador").load("/Novedades/Buscador", function (response, status, xhr) {
        if (status == "success") {

        }
    })
}

function validarSearchParams() {

    let doSearch = localStorage.getItem("doSearch");

    if (doSearch != "0" && doSearch != null && doSearch != "") {
        localStorage.setItem("doSearch", 0);
        BuscarNovedades();
    }
    else {
        CargarContenidoInicial();
    }

}

function ObtenerNombreDelArea(idArea) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: '/AreasPracticas/ObtenerNombreAreaPractica',
            data: {
                idArea: idArea
            },
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            }
        })
    })
}

async function BuscarNovedades(nroPag = 1) {

    const promise = AnimacionBuscar();

    promise.then(async (values) => {
        let inputKey = $("#Palabras").val();
        let inputFDesde = $("#FechaDesde").val();
        let inputFHasta = $("#FechaHasta").val();
        let inputAreas = $("#hAreas" + frmNovedades).val();
        let inputProfesional = $("#hProfesional" + frmNovedades).val();

        if (inputAreas != '' && inputAreas != null && inputAreas != undefined) {
            inputAreas = await ObtenerNombreDelArea(inputAreas);
        }

        if (inputProfesional != '' && inputProfesional != null && inputProfesional != undefined) {
            inputKey = await ObtenerNombreProfesional(inputProfesional);
        }

        let arrDatos = [inputKey ?? '', inputFDesde ?? '', inputFHasta ?? '', inputAreas ?? '']
        arrDatos = arrDatos.filter((str) => str !== '');

        let datosBusqueda = arrDatos.join(' - ');

        $("#nroResultados").html('...');

        $("#datosBusqueda").html(datosBusqueda);

        $("#NroPag").val(nroPag);
        $("#pnlContenido").load("/Novedades/ObtenerNovedadesPorParams", $("#frmBusqueda" + frmNovedades).serialize(), function (response, status, xhr) {
            if (status == "success") {
                $("#hAreas" + frmNovedades).val('');
                $("#hProfesional" + frmNovedades).val('');
            }
        });
    });
}


function CargarContenidoInicial() {
    $("#NroPag").val(1);

    $("#pnlNovedadessRecientes").load("/Novedades/ContenidoInicialNovedades", function (response, status, xhr) {
        if (status == "success") {

        }
    })
}

function VolverAlBuscador() {

    const promise = AnimacionVolverAlBuscador();
    $("#pnlContenido").html("");
    promise.then((values) => {
        CargarContenidoInicial();
        BorrarElementosNoVisibles();
    });
}

function BorrarElementosNoVisibles() {
    $("#hAreas" + frmNovedades).val("");
}

function ChangePagePagination(nroPag) {
    BuscarNovedades(nroPag);
    //scroll.scrollTo("#pnlContenido", { 'offset': -50 });
    UpTo("#pnlContenido");
}

function ChangePagePaginationNovedadesRecientes(nroPag) {
    UpTo("#pnlContenido");
    $("#pnlNovedadessRecientes").load("/Novedades/ContenidoInicialNovedades", { nroPag: nroPag }, function (response, status, xhr) {
        if (status == "success") {

        }
    })
}

function CargarProfesionales(id) {
    $("#pnlProfesionales").load("/Profesionales/ProfesionalesNovedades", { idNovedad: id }, function (response, status, xhr) {
        if (status == "success") {
        }
    });
}

function CargarNovedadesRelacionadas(id) {
    $("#pnlNovedadesRel").load("/Novedades/ObtenerNovedadesRelPorArea", { idArea: id }, function (response, status, xhr) {
        if (status == "success") {
        }
    });
}

function ObtenerNombreProfesional(idProfesional) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: '/Profesionales/ObtenerProfesional',
      data: {
        idProfesional: idProfesional
      },
      success: function (data) {
        resolve(data);
      },
      error: function (error) {
        reject(error);
      }
    })
  })
}

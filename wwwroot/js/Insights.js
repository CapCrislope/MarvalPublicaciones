var frmInsights = 'Insights';
var audio = undefined;
function CargarBuscador() {
  $("#pnlBuscador").load("/Insights/Buscador", function (response, status, xhr) {
    if (status == "success") {
    }
  });
}

function CargarContenidoInicial() {
  $("#NroPag").val(1);

  $("#pnlArticulosRecientes").load("/Insights/ContenidoInicialInsights", { tipoInsight: 1 }, function (response, status, xhr) {
    if (status == "success") {
      $("#pnlDossiersRecientes").load("/Insights/ContenidoInicialInsights", { tipoInsight: 2 }, function (response, status, xhr) {
        if (status == "success") {
          $("#pnlCasosRecientes").load("/Insights/ContenidoInicialInsights", { tipoInsight: 3 }, function (response, status, xhr) {
            if (status == "success") {
            }
          });
        }
      });
    }
  });

}

function InicializarCombosBusqueda() {

    var initValueArea = JSON.parse('[' + $('#hAreas' + frmInsights).val() + ']');
    var initValueTipo = JSON.parse('[' + $('#hTipo' + frmInsights).val() + ']');

    const promise1 = new Promise((resolve, reject) => {
      new Combo({
        name: "Areas",
        view: frmInsights,
        actionController: "/AreasPracticas/ObtenerComboAreas/",
        myClass: "combo",
        selectValue: initValueArea,
        cantItems: 1,
        callback: function () {
          refreshScrollbar();
          resolve();
        }
      }).createBasicCombo();
    });

    const promise2 = new Promise((resolve, reject) => {
      new Combo({
        name: "Tipo",
        view: frmInsights,
        actionController: "/Insights/ObtenerComboTipo/",
        myClass: "combo",
        selectValue: initValueTipo,
        cantItems: 1,
        callback: function () {
          resolve();
        }
      }).createBasicCombo();
    });


    Promise.all([promise1, promise2]).then((values) => {
      validarSearchParams();
    });
}

function validarSearchParams() {

  let doSearch = localStorage.getItem("doSearch");

  if (doSearch != "0" && doSearch != null && doSearch != "") {
    localStorage.setItem("doSearch", 0);
    BuscarInsights();
  }
  else {
    CargarContenidoInicial();
  }

}

async function BuscarInsights(nroPag = 1) {

    const promise = AnimacionBuscar();

    promise.then(async (values) => {
        let inputArea = $("#ddlAreasInsights + .selectize-control .item").html();
        let inputTipo = $("#ddlTipoInsights + .selectize-control .item").html();
        let inputKey = $("#Palabras").val();
        let inputFDesde = $("#FechaDesde").val();
        let inputFHasta = $("#FechaHasta").val();
        let inputProfesional = $("#hProfesional" + frmInsights).val();

        if (inputProfesional != '' && inputProfesional != null && inputProfesional != undefined) {
            inputKey = await ObtenerNombreProfesional(inputProfesional);
        }

        let arrDatos = [inputKey ?? '', inputArea ?? '', inputTipo ?? '', inputFDesde ?? '', inputFHasta ?? '']
        arrDatos = arrDatos.filter((str) => str !== '');

        let datosBusqueda = arrDatos.join(' - ');

        $("#nroResultados").html('...');

        $("#datosBusqueda").html(datosBusqueda);

        $("#NroPag").val(nroPag);
        $("#pnlContenido").load("/Insights/ObtenerInsightsPorParams", $("#frmBusqueda" + frmInsights).serialize(), function (response, status, xhr) {
          if (status == "success") {
              //$("#hProfesional" + frmInsights).val('');
          }
        });
    });
}

function ChangePagePagination(nroPag) {
    BuscarInsights(nroPag);
    //scroll.scrollTo("#pnlContenido", { 'offset': -50 });
    UpTo("#pnlContenido");
}

function VolverAlBuscador() {

    const promise = AnimacionVolverAlBuscador();
    $("#pnlContenido").html("");
    $("#hProfesional" + frmInsights).val('');
    promise.then((values) => {
      CargarContenidoInicial();
    });
}

function CargarProfesionales(idInsight, tipo) {
  $("#pnlProfesionales").load("/Profesionales/ProfesionalesInsights", { idInsight: idInsight, tipo: tipo },  function (response, status, xhr) {
    if (status == "success") {
    }
  });
}

function CargarInsightsRelacionados(tipo, idArea) {
  $("#pnlInsightsRel").load("/Insights/ObtenerInsightsRelPorArea", { tipoInsight: tipo, idArea: idArea }, function (response, status, xhr) {
    if (status == "success") {
    }
  });
}

function DescargarMaterial() {
  ComprobacionVisitanteId(SendDataUserLanding, 'Insight')
}

function SendDataUserLanding() {

  $("#idVisitante").val(localStorage.userId)

  $.post("/Insights/DescargarMaterial", $("#FormDescarga").serialize())
    .done(function (data) {
      if (data.IsEverythingGood == true) {
        $("#FormDescarga").remove();
        $(".pnlDescarga-detalle-insights").append(data.msj)
      }
    })
    .always(function () {
      CargarAlertas();
    })

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

function ModalDescargaDossier(formId) {
    $("#dialog-personalizado").load("/Insights/ModalDescargaDossier", { formId: formId }, function (response, status, xhr) {
        if (status == "success") {
            AbrirModalPersonalizado();
        }
    })
}


function EscucharInsights(j) {

    let play = $(j).data("play");

    if (play) {
        audio.pause();

        $(j).find(".pause").addClass("d-none");
        $(j).find(".palabra-detener").addClass("d-none");
        
        $(j).find(".headphones").removeClass("d-none");
        $(j).find(".palabra-escuchar").removeClass("d-none");

        $(j).data("play", false);

        return;
    }
    
    $(j).find(".pause").removeClass("d-none");
    $(j).find(".palabra-detener").removeClass("d-none");

    $(j).find(".headphones").addClass("d-none");
    $(j).find(".palabra-escuchar").addClass("d-none");

    $(j).data("play", true);

    if (audio != undefined) {
        if (!audio.ended) {
            audio.play();
            return;
        }
    }
    

    let titulo = $(".contenido-titulo").text().trim() + "."; 
    let copete = $(".contenido-copete").text().trim() + "."; 
    let descripcion = $(".contenido-description").text().trim(); 

    let texto = titulo + "\n" + copete + "\n" + descripcion;

    let boton = $(".boton-escuchar button");
    boton.addClass("desactivado");

    $.ajax({
        url: '/Home/ObtenerAudio',
        method: 'POST',
        xhrFields: {
            responseType: 'blob'
        },
        data: {
            text: texto.trim()
        },
        success: function (data) {

            if (data.size == 0) {
                $(j).find(".pause").addClass("d-none");
                $(j).find(".palabra-detener").addClass("d-none");

                $(j).find(".headphones").removeClass("d-none");
                $(j).find(".palabra-escuchar").removeClass("d-none");

                $(j).data("play", false);
            }

            boton.removeClass("desactivado");

            var blob = new Blob([data], { type: 'audio/mpeg' });
            var url = window.URL.createObjectURL(blob);
            audio = new Audio(url);
            audio.play();

            audio.addEventListener('ended', function () {
                $(j).find(".pause").addClass("d-none");
                $(j).find(".palabra-detener").addClass("d-none");

                $(j).find(".headphones").removeClass("d-none");
                $(j).find(".palabra-escuchar").removeClass("d-none");

                $(j).data("play", false);
            });
        }
    });
}
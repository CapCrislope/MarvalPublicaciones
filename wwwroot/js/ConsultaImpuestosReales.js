
function CargarComboMes() {

    new Combo({
        name: "Mes",
        view: "_ConsultaImpuestosReales",
        actionController: "/Independiente/LlenarComboMesImpuestosRealesConsulta",
        cantItems: 1,
        change: function () {
            ;
            LoadImpuestosRealesPorMes()
        }
    }).createBasicCombo();

}

function LoadImpuestosRealesPorMes() {
    ;
    $('#impuestosPorMes').load('/Independiente/ConsultaImpuestosRealesPorMes/', { IdMes: $("#hMes_ConsultaImpuestosReales").val() }, function (response, status, xhr) {
        if (status == "success") {

        }
    });
}
var frmConsultaPagos = "_ConsultaPagos";

function ComboEjercicio() {

    new Combo({
        name: "Ejercicio",
        view: "_ConsultaPagos",
        actionController: "/Independiente/LlenarComboEjercicio",
        cantItems: 1,
        change: CargarPanelConsultaPagos,
        callback: function () {
            var id = $("#ddlEjercicio_ConsultaPagos")[0].selectize.search().items[0].id;
            $("#ddlEjercicio_ConsultaPagos")[0].selectize.setValue(id);
        }
    }).createBasicCombo();
}

function CargarPanelConsultaPagos() {

    var idProceso = $("#hEjercicio" + frmConsultaPagos).val();

    $('#pnlConsultaPagos').load('/Independiente/ConsultaDePagosDetalle/', { idProcesoParam: idProceso}, function (response, status, xhr) {
        if (status == "success") {
        }
    });

}

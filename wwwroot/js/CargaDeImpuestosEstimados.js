

function ComboMes() {

    new Combo({
        name: "Mes",
        view: "_CargaDeImpuestosEstimados",
        actionController: "/Finanzas/LlenarComboMes",
        cantItems: 1,
    }).createBasicCombo();
}

function ObjPersona() {

    var p = {
        IdPersona: null,
        SaldoInicial : null,
        DistribucionTotal : null,
        ImporteGanancias: null,
        ImporteBienesPersonales: null,
        ImporteSaldoDDJJBienes: null,
        ImporteSaldoDDJJGanancias: null,
        ImporteSaldoDDJJCedular: null,
        ImporteImpuestoCedular: null,
        SaldoParcial : null,
        DistribucionParcial : null
        
    }

    return p;
}


function GetDataSociosExSocios(type) {
    var arr = [];


    $("#ImpuestosEstimadosTable tbody tr[data-type='" + type + "']").each(function (i, val) {

        var item = ObjPersona();

        item.IdPersona = val.id;
        item.SaldoInicial = $("#ImporteSaldoInicial_" + val.id).attr("data-val");
        item.DistribucionTotal = $("#ImporteDistribucionTotal_" + val.id).attr("data-val");
        item.ImporteGanancias = $("#ImporteGanancias_" + val.id).attr("data-val");
        item.ImporteBienesPersonales = $("#ImporteBienesPersonales_" + val.id).attr("data-val");
        item.ImporteSaldoDDJJBienes = $("#ImporteSaldoDDJJBienes_" + val.id).attr("data-val");
        item.ImporteSaldoDDJJGanancias = $("#ImporteSaldoDDJJGanancias_" + val.id).attr("data-val");
        item.ImporteSaldoDDJJCedular = $("#ImporteSaldoDDJJCedular_" + val.id).attr("data-val");
        item.ImporteImpuestoCedular = $("#ImporteImpuestoCedular_" + val.id).attr("data-val");
        item.SaldoParcial = $("#ImporteSaldoParcial_" + val.id).attr("data-val");
        item.DistribucionParcial = $("#ImporteDistribucionParcial_" + val.id).attr("data-val");
        

        arr.push(item)


    })

    return arr;
}


function GuardarImpuestosEstimados() {

    ;

    var data = {
        Socios: GetDataSociosExSocios('Socio'),
        ExSocios: GetDataSociosExSocios('ExSocio'),
        Mes: $("#hMes_CargaDeImpuestosEstimados").val()
    }

    if ($("#ImpuestosEstimadosForm").valid()) {
        $.post('/Finanzas/GuardarImpuestosEstimados', { cvm: data })
            .done(function (data) {
                if (data.isEverythingGood == true) {
                    CargarMenu();
                    CargarEstadoProceso();
                }

            })
            .always(function () {
                CargarAlertas(frmHome);
            })
    }
    else {
        Danger("Debe seleccionar un mes del combo.")
    }

   

}
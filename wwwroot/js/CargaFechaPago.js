
function GuardarFechaPago() {


    if ($("#datepicker").val()!="") {
        $.post('/RRHH/GuardarFechaPago', { fecha: $("#datepicker").val() })
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
        Danger("Debe cargar una fecha.")
    }
 
}
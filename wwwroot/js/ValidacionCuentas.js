function CuentasVerificadas() {

    $.post('/RRHH/CuentasValidadas', { idIteracion: idIteracion})
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
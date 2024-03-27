var frmPremio = "Premios";

function IniciarCombosBusquedaPremio() {
    //hacer 3 combos

    //combo areas
    new Combo({
        name: 'Areas',
        view: frmPremio,
        cantItems: null,
        actionController: '/Premio/LlenarAreas',
        create: false,
    }).createBasicCombo();


    //combo fecha desde
    new Combo({
        name: 'fechaDesde',
        view: frmPremio,
        cantItems: 1,
        actionController: '/Premio/LlenarFechas',
        create: false
    }).createBasicCombo();


    //combo fecha hasta (idem fecha desde)
    new Combo({
        name: 'fechaHasta',
        view: frmPremio,
        cantItems: 1,
        actionController: '/Premio/LlenarFechas',
        create: false
    }).createBasicCombo();
}

function BuscarPremio() {
    if ($("#frmBusquedaPremio").valid()) {
        ;
        ReloadTable("TablaPremio");
    }
}

function LimpiarFormBusquedaPremio() {
    $("#frmBusquedaPremio > input").val("");

    ;
    var $select = $('#ddlAreasPremios').selectize();
    $select[0].selectize.clear();

    $select = $('#ddlfechaDesdePremios').selectize();
    $select[0].selectize.clear();

    $select = $('#ddlfechaHastaPremios').selectize();
    $select[0].selectize.clear();

    $("#Diversidad").attr("checked", false)
}
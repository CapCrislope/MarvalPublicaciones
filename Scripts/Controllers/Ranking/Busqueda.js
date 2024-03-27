var frmReconocimientos = "Reconocimientos";

function IniciarCombosBusqueda() {
    //hacer 3 combos

    //combo areas
    new Combo({
        name: 'Areas',
        view: frmReconocimientos,
        cantItems: null,
        actionController: '/Ranking/LlenarAreas',
        create: false,
    }).createBasicCombo();


    //combo fecha desde
    new Combo({
        name: 'fechaDesde',
        view: frmReconocimientos,
        cantItems: 1,
        actionController: '/Ranking/LlenarFechas',
        create: false
    }).createBasicCombo();


    //combo fecha hasta (idem fecha desde)
    new Combo({
        name: 'fechaHasta',
        view: frmReconocimientos,
        cantItems: 1,
        actionController: '/Ranking/LlenarFechas',
        create: false
    }).createBasicCombo();
}

function BuscarRanking() {
    ;
    if ($("#formBusquedaRanking").valid()) {
        ;
        ReloadTable("TablaRanking");
    }
}

function LimpiarFormBusquedaRanking() {
    $("#formBusquedaRanking > input").val("");

    ;
    var $select = $('#ddlAreasReconocimientos').selectize();
    $select[0].selectize.clear();

    $select = $('#ddlfechaDesdeReconocimientos').selectize();
    $select[0].selectize.clear();

    $select = $('#ddlfechaHastaReconocimientos').selectize();
    $select[0].selectize.clear();

    $("#Diversidad").attr("checked", false);
}
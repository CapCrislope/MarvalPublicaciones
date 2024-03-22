var frmModal = "Modal";
var formatosImagenesValidas = ['jpg', 'jpeg', 'png', 'bmp'];
function GuardarVinculosInternacionales() {
    $('#vinculosInternacionales_description_es').val(CKEDITOR.instances.vinculosInternacionales_description_es.getData());
    $('#vinculosInternacionales_description_en').val(CKEDITOR.instances.vinculosInternacionales_description_en.getData());
    $("#divFormatoFotoIncorrecto").addClass("hidden");
    var archivosValidos = true;
    if (!ValidarArchivo("inputFileVinculosInternacionales", formatosImagenesValidas)) {
        archivosValidos = false;
        $("#divFormatoFotoIncorrecto").removeClass("hidden");
    }

    if ($('#VinculosInternacionalesForm').valid() && archivosValidos) {
        var formData = new FormData($("#VinculosInternacionalesForm")[0]);

        $.ajax({
            url: '/VinculosInternacionales/Guardar',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false
        })
        .success(function (data) {
            if (data.IsEverythingGood == true) {
                ReloadTable("TablaVinculosInternacionales", true);
                $('#dialog').modal('hide');
            }
        }).always(function (data) {
            CargarAlertas(frmModal);
        });

    }
};
function loadTiposVinculos() {
    var value = $("#hTiposVinculos").val();

    new Combo({
        name: "Tipos",
        view: "Vinculos",
        cantItems: 1,
        actionController: "/VinculosInternacionales/GetComboVinculos",
        //actionControllerSelect: "/VinculosInternacionales/GetSelectedComboVinculos",
        selectValue: (value != null && value != "" && value != undefined)? value : null
    }).createBasicCombo();
}


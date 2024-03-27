var frmModal = "Modal";
function GuardarMarvalNews() {
    if ($('#MarvalNewsForm').valid()) {
        var formData = new FormData($("#MarvalNewsForm")[0]);

        $.ajax({
            url: '/MarvalNews/Guardar',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false
        })
        .success(function (data) {
            if (data.IsEverythingGood == true) {
                ReloadTable("TablaMarvalNews", true);
                $('#dialog').modal('hide');
            }
        }).always(function (data) {
            CargarAlertas(frmModal);
        });

    }
};

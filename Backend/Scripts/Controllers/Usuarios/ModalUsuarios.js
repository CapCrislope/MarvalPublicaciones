var frmModal = "Modal";
function GuardarUsuarios() {
    ;
    if ($('#UsuariosForm').valid()) {
        var formData = new FormData($("#UsuariosForm")[0]);

        $.ajax({
            url: '/Usuarios/Guardar',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false
        })
        .success(function (data) {
            if (data.IsEverythingGood == true) {
                ReloadTable("TablaUsuarios", true);
                $('#dialog').modal('hide');
            }
        }).always(function (data) {
            CargarAlertas(frmModal);
        });

    }
};

var frmModalReconocimientos = "ModalReconocimientos";
var formatosImagenesValidas = ['jpg', 'jpeg', 'png', 'bmp'];

function CargarComboAreasModal() {

    ;
    var areasSel = JSON.parse('[' + $("#hAreas" + frmModalReconocimientos).val() + ']');

    //combo areas
    new Combo({
        name: 'Areas',
        view: frmModalReconocimientos,
        actionController: '/Ranking/LlenarAreas',
        selectValue: areasSel
    }).createBasicCombo();
}



function GuardarDatos(callback) {
    ;

    if (ValidarArchivo("inputFilePicture", formatosImagenesValidas)) {
        $("#MjeErrorImagen").addClass("hidden");

        $("#Ranking_Description_Es").val(CKEDITOR.instances.Ranking_Description_Es.getData());
        $("#Ranking_Description_En").val(CKEDITOR.instances.Ranking_Description_En.getData());

        if ($("#frm" + frmModalReconocimientos).valid()) {

            var formData = new FormData($("#frm" + frmModalReconocimientos)[0]);

            $.ajax({
                'type': 'POST',
                'url': "/Ranking/Guardar",
                'data': formData,
                cache: false,
                contentType: false,
                processData: false
            })
            .success(function (data) {
                if (data.IsEverythingGood) {
                    callback(data.Id);

                } else if (data.IsRedirect) {
                    window.location.href = "/Home/Login";
                };
            })
            .always(function () {
                CargarAlertas(frmModalReconocimientos);

                $("#dialog").modal('hide');
            });
        }
    }
};

function AltaRankingModal(id) {
    //Actualizamos el ID
    $("#hId" + frmModalReconocimientos).val(id);

    //Cambiamos a Modo Edicion
    $("#hModo" + frmModalReconocimientos).val("EDICION");

    ReloadTable("TablaRanking");

}

function ModificarRanking(id) {
    ReloadTable("TablaRanking");
}
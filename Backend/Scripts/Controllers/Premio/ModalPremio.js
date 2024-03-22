var frmModalPremio = "ModalPremios";
var formatosImagenesValidas = ['jpg', 'jpeg', 'png', 'bmp'];

function CargarComboAreasModalPremio() {

    ;
    var areasSel = JSON.parse('[' + $("#hAreas" + frmModalPremio).val() + ']');

    //combo areas
    new Combo({
        name: 'Areas',
        view: frmModalPremio,
        actionController: '/Premio/LlenarAreas',
        selectValue: areasSel
    }).createBasicCombo();
}



function GuardarDatosPremio(callback) {
    ;

    if (ValidarArchivo("inputFilePicture", formatosImagenesValidas)) {

        $("#MjeErrorImagen").addClass("hidden");

        $("#Premio_Description_Es").val(CKEDITOR.instances.Premio_Description_Es.getData());
        $("#Premio_Description_En").val(CKEDITOR.instances.Premio_Description_En.getData());

        if ($("#frm" + frmModalPremio).valid()) {

            var formData = new FormData($("#frmModalPremios")[0]);


            $.ajax({
                'type': 'POST',
                'url': "/Premio/Guardar",
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
                CargarAlertas(frmModalPremio);

                $("#dialog").modal("hide");
            });
        };
    } else {
        ;
        $("#MjeErrorImagen").removeClass("hidden");
    };
};
;
function AltaPremioModal(id) {
    //Actualizamos el ID
    $("#hId" + frmModalPremio).val(id);

    //Cambiamos a Modo Edicion
    $("#hModo" + frmModalPremio).val("EDICION");

    ReloadTable("TablaPremio");

}

function ModificarPremio(id) {
    ReloadTable("TablaPremio");
}

function BorrarImagenPremio() {
    BorrarInputFile('inputFilePicture');

    $("#imgPicture").attr("src", "/Images/imgNoDisp.png");
    $("#imgPicture").attr("title", "Imagen no disponible");

    $("#divFormatoFotoIncorrecto").addClass("hidden");
}
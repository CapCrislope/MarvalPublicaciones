var frmModalNews = "ModalNewsletters";
var formatosImagenesValidas = ['jpg', 'jpeg', 'png', 'bmp'];


function GuardarDatosNewsletter(callback) {
    ;
    if (ValidarArchivo("inputFilePicture", formatosImagenesValidas)) {
        if ($("#frm" + frmModalNews).valid()) {

            var frmData = new FormData($("#frmModalNewsletters")[0]);

            for(var par of frmData.entries()) {
                console.log(par[0] + ', value: ' + par[1]);
            }

            $.ajax({
                'type': 'POST',
                'url': "/Newsletters/SaveData",
                'data': frmData,
                cache: false,
                contentType: false,
                processData: false
            })
            .success(function (data) {
                if (data.IsEveryThingGood) {

                    callback(data.Id);
                    ReloadTable("Tabla" + frmNews, false);

                } else if (data.IsRedirect) {
                    window.location.href = "/Home/Login";
                }
            })
            .always(function () {
                $("#dialog").modal('hide');
                CargarAlertas(frmNews);
            });

        }
    } else {
        $("#MjeErrorImagen").removeClass("hidden");
    }
}

function AltaNewsletterModal(id){
    //Actualizamos el ID
    $("#hId" + frmModalNews).val(id);

    //Cambiamos a Modo Edicion
    $("#hModo" + frmModalNews).val("EDICION");

    ReloadTable("Tabla" + frmNews);

}

function ModificarNewsletter(id){
    //Sin Implementacion. Es solo a fin de compatibilidad como Callback de GuardarDatosNewsletter
}

function CargarComboAreasModalNewsletter() {

    var areasSel = JSON.parse('[' + $("#hAreas" + frmModalNews).val() + ']');

    new Combo({
        name: "Areas",
        view: frmModalNews,
        actionController: "/Newsletters/LlenarComboArea",
        selectValue: areasSel,
        cantItems: 1
    }).createBasicCombo();
}

function BorrarImagenNewsletter() {
    BorrarInputFile('inputFilePicture');

    $("#imgPicture").attr("src", "/Images/imgNoDisp.png");
    $("#imgPicture").attr("title", "Imagen no disponible");

    $("#divFormatoFotoIncorrecto").addClass("hidden");
}
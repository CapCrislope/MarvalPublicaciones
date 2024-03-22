var formatoArchivosValidos = ['pdf'];

function IniciarCombosModalPublicacionExterna(areasPracticas, autores, tipo) {
    ;
    new Combo({
        name: "AreasPracticas",
        view: frmModal,
        actionController: "/AreaPractica/LlenarAreasPracticas/",
        selectValue: areasPracticas
    }).createBasicCombo();

    new Combo({
        name: "Autores",
        view: frmModal,
        actionController: "/Profesional/LlenarProfesionales/",
        selectValue: autores
    }).createBasicCombo();

    new Combo({
        name: "Tipo",
        view: frmModal,
        actionController: "/PublicacionExterna/LlenarTiposPublicacionesExternas/",
        selectValue: tipo,
        cantItems: 1
    }).createBasicCombo();

    return false;
}

function GuardarPublicacionExterna() {
    ;

    //var archivosValidos = true;
    //$("#divFormatoPDFEsIncorrecto").addClass("hidden");
    //$("#divFormatoPDFEnIncorrecto").addClass("hidden");

    //if (!ValidarArchivo("inputFilePDFEs", formatoArchivosValidos)) {
    //    $("#divFormatoPDFEsIncorrecto").removeClass("hidden");
    //    archivosValidos = false;
    //}

    //if (!ValidarArchivo("inputFilePDFEn", formatoArchivosValidos)) {
    //    $("#divFormatoPDFEnIncorrecto").removeClass("hidden");
    //    archivosValidos = false;
    //}

    //if(archivosValidos)
    //{
        $('#publicacionExterna_header_en').val(CKEDITOR.instances.publicacionExterna_header_en.getData());
        $('#publicacionExterna_content_en').val(CKEDITOR.instances.publicacionExterna_content_en.getData());
        $('#publicacionExterna_header_es').val(CKEDITOR.instances.publicacionExterna_header_es.getData());
        $('#publicacionExterna_content_es').val(CKEDITOR.instances.publicacionExterna_content_es.getData());

        if ($("#PublicacionExternaForm").valid()) {
            var formData = new FormData($("#PublicacionExternaForm")[0]);

            $.ajax({
                url: '/PublicacionExterna/GuardarPublicacionExterna',
                type: 'POST',
                data: formData,
                cache: false,
                contentType: false,
                processData: false
            })
            .success(function (data) {
                if (data.IsEverythingGood) {
                    ReloadTable("TablaPublicacionExterna", true);
                    $("#dialog").modal("hide");
                }
                else if (data.IsRedirect) {
                    window.location.href = "/Home/Login";
                }
            }).always(function (data) {
                CargarAlertas(frmModal);
            });
        }
    //}

    return false;
}
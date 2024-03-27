var frmVarios = "Varios";

$('.tbs').on('click', function () {
    var info = $(this).data('info');

    switch (info) {
        case 'menuContacto': CargarContenidoTab("Contacto");
            break;
        case 'menuOportunidades': CargarContenidoTab("Oportunidades");
            break;
        case 'menuPerfilDelEstudio': CargarContenidoTab("PerfilDeEstudio");
            break;
        case 'menuProbono': CargarContenidoTab("Probono");
            break;
        case 'menuDoingBusiness': CargarContenidoTab("DoingBusiness");
            break;
        case 'menuBrochure': CargarContenidoTab("Brochure");
            break;
        case 'menuPaneles': CargarContenidoTab("Paneles");
            break;
        case 'menuAvisoLegal': CargarContenidoTab("AvisoLegal");
            break;
        case 'menuHistoria': CargarContenidoTab("Historia");
            break;
        case 'menuTextosMeta': CargarContenidoTab("TextosMeta");
            break;

        default: break;
    }
});

function CargarContenidoTab(action)
{
    $('#menuVarios').load('/Varios/' + action, function (response, status, xhr) {
        if (status != "success") {
            CargarAlertas(frmVarios);
        }
    });
}

function LimpiardoingBusinessEN() {
    BorrarInputFile('inputFileDoingBusinessEN');
    $("#divLinkDoingBusinessEn").addClass("hidden");
}

function LimpiardoingBusinessES() {
    BorrarInputFile('inputFileDoingBusinessES');
    $("#divLinkDoingBusinessEs").addClass("hidden");
}

function LimpiarBrochureES() {
    BorrarInputFile('inputFileBrochureES');
    $("#divLinkBrochureEs").addClass("hidden");
}

function LimpiarBrochureEN() {
    BorrarInputFile('inputFileBrochureEN');
    $("#divLinkBrochureEn").addClass("hidden");
}



function GuardarHistoria() {
    $('#historia_es').val(CKEDITOR.instances.historia_es.getData());
    $('#historia_en').val(CKEDITOR.instances.historia_en.getData());
    if ($("#HistoriaForm").valid()) {
        $.post("/Varios/GuardarHistoria/", $("#HistoriaForm").serialize())
            .always(function (data) {
                CargarAlertas(frmVarios);
            });
    }
    return false;
}

function GuardarTabContacto() {
    ;
    if ($("#TabContactoForm").valid()) {
        ;
        $.post("/Varios/GuardarTabContacto/", $("#TabContactoForm").serialize())
            .always(function (data) {
                CargarAlertas(frmVarios);
            });
    }
    return false;
}

function GuardarTabOportunidades() {
    ;
    //var ckEditorsValidos = true;
    $("#validOportunidadesES").addClass("hidden");
    $("#validOportunidadesEN").addClass("hidden");
    $('#jovenes_es').val(CKEDITOR.instances.jovenes_es.getData());
    $('#jovenes_en').val(CKEDITOR.instances.jovenes_en.getData());
    $('#panel_oportunidades_es').val(CKEDITOR.instances.panel_oportunidades_es.getData());
    $('#panel_oportunidades_en').val(CKEDITOR.instances.panel_oportunidades_en.getData());


    //if ($("#panel_oportunidades_es").val().length >= 255) {
    //    $("#validOportunidadesES").removeClass("hidden");
    //    ckEditorsValidos = false;
    //}

    //if ($("#panel_oportunidades_en").val().length >= 255) {
    //    $("#validOportunidadesEN").removeClass("hidden");
    //    ckEditorsValidos = false;
    //}

    if ($("#OportunidadesForm").valid()) {

        var formData = new FormData($("#OportunidadesForm")[0]);

        $.ajax({
            url: '/Varios/GuardarTabOportunidades/',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false
        })
        .always(function (data) {
            CargarAlertas(frmVarios);
        });
    }

    return false;
}

function GuardarTabDoingBusiness() {
    if ($("#DoingBusinessForm").valid()) {
        var formData = new FormData($("#DoingBusinessForm")[0]);

        $.ajax({
            url: '/Varios/GuardarTabDoingBusiness',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false
        })
        .success(function (data) {
            CargarContenidoTab("DoingBusiness");
        }).always(function (data) {
            CargarAlertas(frmVarios);
        });
    }

    return false;
}

function GuardarTabPerfilDeEstudio() {
    $('#company_profile_es').val(CKEDITOR.instances.company_profile_es.getData());
    $('#company_profile_en').val(CKEDITOR.instances.company_profile_en.getData());

    //var textLimit = 5;
    //var str = CKEDITOR.instances.company_profile_es.getData();
    //if (str.length >= textLimit) {
    //    Danger("El campo Perfil de estudio (es) debe tener un máximo de 255 caracteres");
    //}


    if ($("#PerfilDeEstudioForm").valid()) {
        $.post("/Varios/GuardarTabPerfilDeEstudio/", $("#PerfilDeEstudioForm").serialize())
            .always(function (data) {
                CargarAlertas(frmVarios);
            });
    }
    return false;
}

function GuardarTabProbono() {
    $('#probono_es').val(CKEDITOR.instances.probono_es.getData());
    $('#probono_en').val(CKEDITOR.instances.probono_en.getData());

    if ($("#ProbonoForm").valid()) {
        $.post("/Varios/GuardarTabProbono/", $("#ProbonoForm").serialize())
            .always(function (data) {
                CargarAlertas(frmVarios);
            });
    }
    return false;
}

function GuardarTabBrochure() {
    $('#brochure_txt_es').val(CKEDITOR.instances.brochure_txt_es.getData());
    $('#brochure_txt_en').val(CKEDITOR.instances.brochure_txt_en.getData());

    if ($("#BrochureForm").valid()) {
        var formData = new FormData($("#BrochureForm")[0]);

        $.ajax({
            url: '/Varios/GuardarTabBrochure',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false
        })
        .success(function (data) {
            CargarContenidoTab("Brochure");
        })
        .always(function (data) {
            CargarAlertas(frmVarios);
        });
    }

    return false;
}

function GuardarTabPaneles() {
    if ($("#PanelesForm").valid()) {
        $.post("/Varios/GuardarTabPaneles/", $("#PanelesForm").serialize())
            .error(function (data) {
                ;
                CargarContenidoTab("Paneles");
            })
            .always(function (data) {
                ;
                CargarAlertas(frmVarios);
            });
    }
    return false;
}

function GuardarTabAvisoLegal() {
    ;
    // $("#validAvisoLegal").addClass("hidden");
    $('#legal_es').val(CKEDITOR.instances.legal_es.getData());
    $('#legal_en').val(CKEDITOR.instances.legal_en.getData());

    //if ($("#legal_es").length < 255) {
    if ($("#AvisoLegalForm").valid()) {
        $.post("/Varios/GuardarTabAvisoLegal/", $("#AvisoLegalForm").serialize())
            .error(function (data) {
                ;
                // $('#menuVarios').load('/Varios/Brochure');
            })
            .always(function (data) {
                ;
                CargarAlertas(frmVarios);
            });
    }
    //}
    //else {
    //    $("#validAvisoLegal").removeClass("hidden");
    //}
    return false;
}

function GuardarTextosMeta() {

    if ($("#TextosMetaForm").valid()) {
        ;
        $.post("/Varios/GuardarTabTextosMeta/", $("#TextosMetaForm").serialize())
            .always(function (data) {
                CargarAlertas(frmVarios);
            });
    }
    return false;
}



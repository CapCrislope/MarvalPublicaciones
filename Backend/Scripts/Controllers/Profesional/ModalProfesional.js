var formatosImagenesValidas = ['jpg', 'jpeg', 'png', 'bmp'];
var formatosVCardValidos = ['vcf'];

function IniciarCombosModalProfesional(areasPracticas, idiomas, rol) {
    new Combo({
        name: "AreasPracticas",
        view: frmModal,
        actionController: "/AreaPractica/LlenarAreasPracticas/",
        selectValue: areasPracticas
    }).createBasicCombo();

    new Combo({
        name: "Idiomas",
        view: frmModal,
        actionController: "/Profesional/LlenarIdiomas/",
        selectValue: idiomas
    }).createBasicCombo();

    new Combo({
        name: "Rol",
        view: frmModal,
        actionController: "/Profesional/LlenarRoles/",
        selectValue: rol,
        cantItems: 1,
        change: function () {
            ;
            if ($('#hRolModal').val() == "external") {
                $("#profesional_initials").val("external").attr("value", "external")
                $("#profesional_initials").prop('disabled', true);
                $("#profesional_Empresa").prop('disabled', false);
                $("#profesional_Cargo").prop('disabled', false);
                $("#profesional_LinkPersonal").prop('disabled', false);
            }
            else {
                ;
                $("#profesional_initials").val("").attr("value", "")
                $("#profesional_Empresa").val("").attr("value", "")
                $("#profesional_Cargo").val("").attr("value", "")
                $("#profesional_LinkPersonal").val("").attr("value", "")

                $("#profesional_initials").prop('disabled', false);
                $("#profesional_Empresa").prop('disabled', true);
                $("#profesional_Cargo").prop('disabled', true);
                $("#profesional_LinkPersonal").prop('disabled', true);
            }
        },
    }).createBasicCombo();
}

function GuardarProfesional() {
    var archivosValidos = true;
    $("#divFormatoVCardIncorrecto").addClass("hidden");
    $("#divFormatoFotoIncorrecto").addClass("hidden");

    $('#profesional_cv_en').val(CKEDITOR.instances.profesional_cv_en.getData());
    $('#profesional_cv_es').val(CKEDITOR.instances.profesional_cv_es.getData());

    if (!ValidarArchivo("inputFileVCard", formatosVCardValidos)) {
        archivosValidos = false;
        $("#divFormatoVCardIncorrecto").removeClass("hidden");
    }

    if (!ValidarArchivo("inputFilePicture", formatosImagenesValidas)) {
        archivosValidos = false;
        $("#divFormatoFotoIncorrecto").removeClass("hidden");
    }
   
    if ($("#ProfesionalForm").valid() && archivosValidos) {
         $("#profesional_initials").prop('disabled', false);
        var formData = new FormData($("#ProfesionalForm")[0]);
        $("#profesional_initials").prop('disabled', true);
        $.ajax({
            url: '/Profesional/GuardarProfesional',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false
        })
        .success(function (data) {
            if (data.IsEverythingGood == true) {
                ReloadTable("TablaProfesional", true);
                $("#dialog").modal("hide");
            }
            else if (data.IsRedirect) {
                window.location.href = "/Home/Login";
            }
        }).always(function (data) {
            CargarAlertas(frmModal);
        });
    }

    return false;
}

function BorrarFormularioProfesional()
{
    //PROPERTIES
    $("#DatePickerFechaIngreso")[0].value = "";
    $("#profesional_last_name").val("");
    $("#profesional_first_name").val("");
    $("#profesional_email").val("");
    $("#profesional_phone").val("");
    $("#profesional_entry_date").val("");
    $("#profesional_initials").val("");
    $("#profesional_view_order").val("");
    $("#profesional_picture").val("");

    //CKEDITORS
    CKEDITOR.instances.profesional_cv_en.setData("");
    CKEDITOR.instances.profesional_cv_es.setData("");
    $("#profesional_cv_en").val("");
    $("#profesional_cv_es").val("");

    //COMBOS
    $("#hAreasPracticas" + frmModal).val("");
    $("#hRol" + frmModal).val("");
    $("#hIdiomas" + frmModal).val("");
    $('#ddlAreasPracticas' + frmModal)[0].selectize.clear();
    $('#ddlIdiomas' + frmModal)[0].selectize.clear();
    $('#ddlRol' + frmModal)[0].selectize.clear();

    //INPUTFILES
    BorrarInputFile("inputFileVCard");
    BorrarPictureProfesional();

    //RADIOBUTTONS
    $('input[type="radio"]').prop("checked", false);
}

function BorrarPictureProfesional()
{
    BorrarInputFile('inputFilePicture');

    //Reseteamos la Imagen a "Imagen no disponible".
    $("#imgPicture").attr("src", "/Images/imgNoDisp.png");
}
function IniciarCombosModalAreaPractica(categoriaPadreID, responsables) {
    new Combo({
        name: "parent_id",
        view: frmModal,
        actionController: "/AreaPractica/LlenarAreasPracticas/",
        cantItems: 1,
        selectValue: categoriaPadreID
    }).createBasicCombo();

    new Combo({
        name: "Responsables",
        view: frmModal,
        actionController: "/AreaPractica/LlenarResponsables/",
        selectValue: responsables
    }).createBasicCombo();

    return false;
}

function GuardarAreaPractica()
{
    $("#divDescripcionRequerida").addClass("hidden");
    $('#areaPractica_description_es').val(CKEDITOR.instances.areaPractica_description_es.getData());
    $('#areaPractica_description_en').val(CKEDITOR.instances.areaPractica_description_en.getData());
    $('#areaPractica_Header_es').val(CKEDITOR.instances.areaPractica_Header_es.getData());
    $('#areaPractica_Header_en').val(CKEDITOR.instances.areaPractica_Header_en.getData());
    $('#areaPractica_premio_es').val(CKEDITOR.instances.areaPractica_premio_es.getData());
    $('#areaPractica_premio_en').val(CKEDITOR.instances.areaPractica_premio_en.getData());

    

    if ($("#areaPractica_description_es").val() != "") {
        var formDataArray = $("#AreaPracticaForm").serializeArray();

        // Objeto donde almacenar los datos del formulario
        var formDataObject = {};

        // Iterar sobre el array y construir el objeto
        $.each(formDataArray, function (index, field) {
            formDataObject[field.name] = field.value;
        });

        var itemObject = [];
        var errores = false;

        $.each($(".items-modal"), function (index, field) {
            var iObject = {}
            $(field).find("textarea").each(function (index, textarea) {
                var fieldName = $(this).attr('name');
                var fieldValue = $(this).val();
                $(this).parent().find("span").addClass("d-none");
                if (fieldValue == "" && fieldName == "Item_es") {

                    $(this).parent().find("span").removeClass("d-none");
                    errores = true;
                }

                iObject[fieldName] = fieldValue;
            });
            itemObject.push(iObject)
        })

        if (errores) {
            return;
        }

        $.ajax({
            type: 'POST',
            url: '/AreaPractica/GuardarAreaPractica/',
            data: {
                areaPracticaVM: formDataObject,
                Items: itemObject
            },
            success: function (data) {
                if (data.IsEverythingGood == true) {
                    ReloadTable("TablaAreaPractica", true);
                    $("#dialog").modal("hide");
                }
                else if (data.IsRedirect) {
                    window.location.href = "/Home/Login";
                }

                CargarAlertas(frmModal);
            },
            fail: function (data) {
                CargarAlertas(frmModal);
            }
        })
    }
    else
    {
        $("#divDescripcionRequerida").removeClass("hidden");
    }

    return false;
}


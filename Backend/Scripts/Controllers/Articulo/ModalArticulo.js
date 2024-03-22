var formatosImagenesValidas = ['jpg', 'jpeg', 'png', 'bmp'];
var frmModalArticulo = "ModalArticulo";

function IniciarCombosModalArticulo(areasPracticas, autores, imagenPosY, tags) {
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
        name: "ImagenPosY",
        view: frmModal,
        actionController: "/Articulo/LlenarComboPosImg/",
        cantItems: 1,
        selectValue: imagenPosY
    }).createBasicCombo();

    new Combo({
        name: "Tags",
        view: frmModal,
        actionController: "/Articulo/LlenarTags",
        selectValue: tags
    }).createBasicCombo();

    return false;
}

function GuardarArticulo() {
    ;
    $("#divFormatoFotoIncorrecto").addClass("hidden");

    if (ValidarArchivo("inputFilePicture", formatosImagenesValidas)) {
        $('#articulo_header_en').val(CKEDITOR.instances.articulo_header_en.getData());
        $('#articulo_content_en').val(CKEDITOR.instances.articulo_content_en.getData());
        $('#articulo_meta_description_en').val(CKEDITOR.instances.articulo_meta_description_en.getData());
        $('#articulo_header_es').val(CKEDITOR.instances.articulo_header_es.getData());
        $('#articulo_content_es').val(CKEDITOR.instances.articulo_content_es.getData());
        $('#articulo_meta_description_es').val(CKEDITOR.instances.articulo_meta_description_es.getData());
        $("#articulo_featured").val($('#Destacado').is(':checked') ? 1 : 0);
        $("#articulo_priorizar").val($('#Priorizar').is(':checked') ? 1 : 0);
        
        //if($("#articulo_ImagenPosY").val($('#hImagenPosYModal').val()==null)){
        //    $('#hImagenPosYModal').val('center');
        //}



        if ($("#ArticuloForm").valid()) {
            var formData = new FormData($("#ArticuloForm")[0]);

            $.ajax({
                url: '/Articulo/GuardarArticulo',
                type: 'POST',
                data: formData,
                cache: false,
                contentType: false,
                processData: false
            })
            .success(function (data) {
                if (data.IsEverythingGood == true) {
                    ReloadTable("TablaArticulo", true);
                    $("#dialog").modal("hide");
                }
                else if (data.IsRedirect) {
                    window.location.href = "/Home/Login";
                }
            }).always(function (data) {
                CargarAlertas(frmModal);
            });
        }
    }
    else
    {
        $("#divFormatoFotoIncorrecto").removeClass("hidden");
    }  

    return false;
}

function BorrarPictureArticulo()
{
    BorrarInputFile('inputFilePicture');

    $("#imgPicture").attr("src", "/Images/imgNoDisp.png");
    $("#imgPicture").attr("title", "Imagen no disponible");

    $("#divFormatoFotoIncorrecto").addClass("hidden");
}

function CrearTag() {
    var tagES = $("#tag_es").val();
    var tagEN = $("#tag_en").val();

    if (tagES == "" || tagEN == "") {
        $("#divTagValidation span").html("Es obligatorio cargar el tag en los 2 idiomas.");
        $("#divTagValidation").show();
        return false;
    }
    else
        $("#divTagValidation").hide();

    if (tagES.length > 150 || tagEN.length > 150) {
        $("#divTagValidation span").html("El tag no puede tener mas de 150 caracteres.");
        $("#divTagValidation").show();
        return false;
    }
    else
        $("#divTagValidation").hide();


    var selTags = JSON.parse('[' + $("#hTags" + frmModal).val() + ']');

    $.post("/Articulo/CrearTag", { tag_es: tagES, tag_en: tagEN  })
    .success(function (data) {
        if (data.IsEverythingGood == true) {

            new Combo({
                name: "Tags",
                view: frmModal,
                actionController: "/Articulo/LlenarTags",
                selectValue: selTags
            }).createBasicCombo();

            $("#tag_es").val('');
            $("#tag_en").val('');
        }
    })
    .always(function () {
        CargarAlertas(frmModal);
    })
}
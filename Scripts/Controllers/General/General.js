//----------------------------------------Ingreso Masivo -----------------------------------------//

function ModalImportar(modo) {
    ;
    $("#dialog").load("/Importar/ModalImportar/", { modo: modo }, function (response, status, xhr) {
        if (status == "success") {
            //$("#hIdRelacion").val(idNewsletter);
            $('#dialog').modal('show');
        } else {
            CargarAlertas(frmHome);
        }
    });
};

//-------------------------------------------------------------------------------------------------//

function ReloadTable(id, resetPagination) {
    var oTable = $('#' + id).DataTable();
    oTable.ajax.reload(null, resetPagination);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////CKEDITOR/////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function InicializarCKEDITOR(idTextArea)
{
    CKEDITOR.config.allowedContent = true;
    CKEDITOR.config.pasteFromWordRemoveFontStyles = true;
    CKEDITOR.config.pasteFromWordRemoveStyles = true;

    if (CKEDITOR.instances == null)
        CKEDITOR.instances = []

    if (CKEDITOR.instances[idTextArea] == null)
        CKEDITOR.replace(idTextArea);
    else {
        CKEDITOR.instances = [];
        CKEDITOR.replace(idTextArea);
    }
}

$(document).ready(function () {
    $.fn.modal.Constructor.prototype.enforceFocus = function () {
        $(document)
            .off('focusin.bs.modal') // guard against infinite focus loop
            .on('focusin.bs.modal', $.proxy(function (e) {
                if (
                    this.$element[0] !== e.target && !this.$element.has(e.target).length
                    // CKEditor compatibility fix start.
                    && !$(e.target).closest('.cke_dialog, .cke').length
                    // CKEditor compatibility fix end.
                ) {
                    this.$element.trigger('focus');
                }
            }, this));
    };
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////DATEPICKER////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function InicializarDatePickers()
{
    $.fn.datepicker.defaults.format = "dd/mm/yyyy";
    $(".date").datepicker({
        clearBtn: true,
        language: "es"
    });
    $('.date').on('change', function () {
        $('.datepicker').hide();
    });

    //Formatea la fecha traida de la base, para que no muestre el tiempo
    $.each($(".input-group.date > input"), function (index, datepicker) {
        datepicker.value = datepicker.value.split(' ')[0];
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////INPUT FILE////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//inputFileID: El Id del TextBoxFor que bindea con la property "[NombrePropiedad]Upload" del modelo.
function SetNameFile(inputFileID) {
    ;
    var inicio = $('#' + inputFileID).val().lastIndexOf('\\') + 1;
    var final = $('#' + inputFileID).val().length;

    var fileName = $('#' + inputFileID).val().substring(inicio, final);

    $(".input-sm", $('#' + inputFileID).closest('.input-group')).val(fileName);
}

//inputFileID: El Id del TextBoxFor que bindea con la property "[NombrePropiedad]Upload" del modelo.
function BorrarInputFile(inputFileID) {
    var $input = $('#' + inputFileID);
    $input.wrap('<form>').closest('form').get(0).reset();
    $input.unwrap();

    $(".input-sm", $('#' + inputFileID).closest('.input-group')).val("");
}

//idControl: El id del EditorFor que tiene el nombre del archivo y no el archivo en sí ([Property]Upload).
//extValidos: Un array con el formato ["jpg","jpeg"] con las extensiones válidas del archivo.
function ValidarArchivo(idControl, extValidos) {
    ;
    var ok = true;
    var archivo = $('#' + idControl + '').val();

    if (archivo.length > 0) {
        return ExtensionValida(archivo, extValidos);
    }

    return ok;
};

function ExtensionValida(archivo, extValidos)
{
    ;
    var extension = archivo.substr((archivo.lastIndexOf('.') + 1));
    //var extension = archivo.split('.')[1];
    var valido = $.inArray(extension.toLowerCase().trim(), extValidos);

    if (valido < 0) return false;
    else return true;
}

function readURL(input, imagecontainer) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#' + imagecontainer).attr('src', e.target.result);

            var image = new Image();
            image.src = e.target.result;

            image.onload = function () {
                if (this.height > this.width)
                    $('#h' + imagecontainer + 'Vertical').val('True');
                else
                    $('#h' + imagecontainer + 'Vertical').val('False');
            };
        }

        reader.readAsDataURL(input.files[0]);
    }
}
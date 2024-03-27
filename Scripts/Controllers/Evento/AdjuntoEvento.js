

function formatFileSize(bytes) {
    if (typeof bytes !== 'number') {
        return '';
    }
    if (bytes >= 1000000000) {
        return (bytes / 1000000000).toFixed(2) + ' GB';
    }
    if (bytes >= 1000000) {
        return (bytes / 1000000).toFixed(2) + ' MB';
    }
    return (bytes / 1000).toFixed(2) + ' KB';
}


function GetVideoAdjunto() {
        var IdEdicionEvento = $("#IdEdicionEvento").val();
    $.post("/Evento/ObtenerAdjuntoEvento", { IdEdicionEvento: IdEdicionEvento })
        .success(function (data) {
            
            if (data.adjunto!=null) {
                $('<div id="rowAdj_' + data.adjunto.IdEdicionEvento + '" class="row">\
            <div class="col-md-1" style="width:0%;">\
                <button type="button" id="eliminarDocumento_' + data.adjunto.IdEdicionEvento + '" class="btn btn-default btn-xs" data-toggle="confirmation" data-placement="left" data-singleton="true" data-on-confirm="EliminarVideoEvento" data-title="¿Está seguro?" onclick="SelVideo(' + data.adjunto.IdEdicionEvento + ')"; > \
                    <span class="glyphicon glyphicon-remove" aria-hidden="true"></span> \
                </button>\
             </div>\
                 <div class="col-md-11">'+ data.adjunto.NombreOriginal + '</div>\
         </div>').appendTo('#ContentAdjuntos');


                $('[data-toggle=confirmation]').confirmation();
            }
           
            });
}



function SelVideo(id) {
    $("#IdDelete").val(id);
}

function EliminarVideoEvento() {
    //event.preventDefault();
    var IdEdicionEvento = $("#IdDelete").val();
    $.post("/Evento/EliminarVideoEvento", { IdEdicionEvento: IdEdicionEvento })
        .success(function (data) {
            if (data.IsEverythingGood == true) {
                $('#rowAdj_' + IdEdicionEvento + '').remove();
            }
            CargarAlertas(frmEvento);
        });

    return false;
};

function InicializarFileUpload() {
    $('#fileupload').fileupload({
        dataType: 'json',
        url: '/Evento/UploadVideoEvento/' + { adjunto: $("#FormVideoEvento").serialize() },
        add: function (e, data) {
            //e.stopPropagation();
            $('.progress .progress-bar').css('width', 0 + '%');
            $('.progressText').html('');


            $("#pnlFile").show();

            $('.fileinput-button').addClass('disabled');

            $('.file_name').html(data.files[0].name);
            $('.file_size').html(formatFileSize(data.files[0].size));

            $('#botonera').html('<button class="btn btn-primary start" type="submit"><i class="glyphicon glyphicon-upload"></i>&nbsp;<span>Subir Archivo</span></button> \
                                         <button class="btn btn-warning cancel" type="reset"><i class="glyphicon glyphicon-ban-circle"></i>&nbsp;<span>Cancelar</span></button>');

            $('.cancel').click(function () {
                $('.fileinput-button').removeClass('disabled');
                $("#pnlFile").hide();
                $('.progress .progress-bar').css('width', 0 + '%');
                $('.progressText').html('');
            });

            $('.start').click(function () {
                data.submit();
            });
        },
        fail: function (e, data) {
            $('.progress .progress-bar').css('width', 0 + '%');
            $('.progressText').html('');
        },
        done: function (e, data) {

            $('.start').hide();
            $('.cancel').hide();
            $('.fileinput-button').removeClass('disabled');
            $('.fileinput-button').addClass('disabled');

            $("#ContentAdjuntos").html("");
            GetVideoAdjunto();
            CargarAlertas(frmEvento);

            $('[data-toggle=confirmation]').confirmation();
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('.progress .progress-bar').css('width', progress + '%');
            $('.progressText').html(progress + '% Completo');
        }
    });
    GetVideoAdjunto();
}
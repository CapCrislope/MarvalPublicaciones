var frmOfertaLaboral = "OfertaLaboral";
var frmModal = "Modal";


function IniciarTablaOfertasLaborales() {
    $.fn.dataTable.ext.errMode = 'none';

    $('#OfertaLabTable').on('error.dt', function (e, settings, techNote, message) {
        CargarAlertas(frmOfertaLaboral);
    })

    var oTable = $('#OfertaLabTable').dataTable({
        dom: 'lfrtip',
        sAjaxSource: "/OfertaLaboral/LlenarJSONGrillaOfertaLaboral",
        sServerMethod: "POST",
        "aoColumns": [

            {
                data: "Titulo_ES",
                sWidth: "45%",
            },
            {
                data: "IdOferta",
                sWidth: "10%",
                sClass: "der",
                orderable: false,
                sWidth: "10%",
                render: function (data, type, full) { return BotoneraGrillaOfertaLab(full,data); }
            }
        ],
        bAutoWidth: false,
        pageLength: 50,
        language: {
            select: {
                rows: ". %d filas seleccionadas"
            }
        },
        fnDrawCallback: function (oSettings) {
            FuncionesBotoneraGrillaOfertaLaboral();
        }
    });
}


function BotoneraGrillaOfertaLab(full) {
    ;
    
    var html = "";

   
    html += '\
        <button type="button" class="habilitar btn ' + ((full.Habilitado) ? 'btn-success' : 'btn-danger') +' btn-xs" data-id="' + full.IdOferta + '" title="Habilitar" data-habilitar="' + full.Habilitado +'"> \
            <span class="glyphicon glyphicon-off" aria-hidden="true"></span> \
        </button>';
    html += '\
        <button type="button" class="editDialog btn btn-default btn-xs" data-id="' + full.IdOferta + '" title="Editar"> \
            <span class="glyphicon glyphicon-edit" aria-hidden="true"></span> \
        </button>' ;
    html += '<button type="button" id="mat_' + full.IdOferta + '"  class="btn btn-default btn-xs" data-toggle="confirmation" data-placement="left" data-singleton="true" data-on-confirm="EliminarOferta" data-title="¿Está seguro?" onclick="SelOferta(' + full.IdOferta + ');"> \
            <span class="glyphicon glyphicon-remove" aria-hidden="true"> \
            </span> \
        </button>';
    
    return html;

}

function FuncionesBotoneraGrillaOfertaLaboral(idOferta) {
    ;

    $('[data-toggle=confirmation]').confirmation();

    $('.habilitar').off().click(function () {
        
        $.post('/OfertaLaboral/HabilitarOferta', { IdOferta: $(this).attr("data-id"), Habilitado: $(this).attr("data-habilitar") })
            .success(function (data) {
                if (data.IsEverythingGood == true) {

                    ReloadTable('OfertaLabTable',true);
                }
            })
            .always(function () {
                CargarAlertas(frmOfertaLaboral);
            });

    })


    $(".editDialog").off().on("click", function () {
        ModalOfertaLaboral($(this).attr("data-id"));
    });

    return false;

    
}

function SelOferta(idOferta) {
    ;
    $("#idOferta").val(idOferta);
}

function EliminarOferta(IdOferta) {

    var idOferta = $("#idOferta").val();


    $.post("/OfertaLaboral/EliminarOferta", { IdOferta: idOferta })
        .success(function (data) {
            if (data.IsEverythingGood == true) {
                ReloadTable("OfertaLabTable", false);
            }
            
        })
        .always(function () {
            CargarAlertas(frmOfertaLaboral);
        })

    ;

}

//-------------MODAL ------------------------------

function ModalOfertaLaboral(IdOferta) {
    ;
    $("#dialog").load("/OfertaLaboral/ModalOfertaLaboral", { IdOferta: IdOferta }, function (response, status, xhr) {

        if (status == "success") {
            $("#dialog").modal('show');
            if (IdOferta == null)
                $("#FechaAlta").datepicker("update", new Date());
        }
        else {
            CargarAlertas(frmOfertaLaboral);
        }
    })

}

function AltaOfertaLaboral() {
    ;
    ModalOfertaLaboral(null);
}

function GuardarOfertaLaboral() {
    ;
    $('#OfertaLaboral_Descripcion_ES').val(CKEDITOR.instances.OfertaLaboral_Descripcion_ES.getData());
    $('#OfertaLaboral_Descripcion_EN').val(CKEDITOR.instances.OfertaLaboral_Descripcion_EN.getData());
    
    if ($("#OfertaLaboralForm").valid()) {
        $.post("/OfertaLaboral/GuardarOferta", $("#OfertaLaboralForm").serialize())
            .success(function (data) {
                if (data.IsEverythingGood == true) {
                    ReloadTable("OfertaLabTable", true);
                    $("#dialog").modal("hide");
                    CargarAlertas(frmOfertaLaboral);

                }
               
            })
            .always(function (data) {
                CargarAlertas(frmModal);
            });
    }
   
}

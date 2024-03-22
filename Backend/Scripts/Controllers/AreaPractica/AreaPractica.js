var frmAreaPractica = "AreaPractica";
var frmModal = "Modal";
var frmCombo = "Combo";

function ModalAreaPractica(idAreaPractica) {
    $("#dialog").load("/AreaPractica/ModalAreaPractica", { idAreaPractica: idAreaPractica}, function (response, status, xhr) {
        if (status == "success") {
            $("#dialog").modal('show');
        }
        else
            CargarAlertas(frmAreaPractica);
    });
}

function IniciarTablaAreaPractica() {
    $.fn.dataTable.ext.errMode = 'none';

    $('#TablaAreaPractica').on('error.dt', function (e, settings, techNote, message) {
        CargarAlertas(frmAreaPractica);
    })

    var oTable = $('#TablaAreaPractica').dataTable({
        dom: 'lfrtip',
        order: [[0, "asc"]],
        sAjaxSource: "/AreaPractica/LlenarJSONGrillaAreaPractica",
        sServerMethod: "POST",
        "aoColumns": [
        {
            data: "name_es",
            sWidth: "30%"
        },
        {
            data: "AreaPracticaPadreNombre",
            sWidth: "15%",
            render: function (data, type, full) { return data || ""; }
        },
        {
            data: "id",
            sClass: "der",
            orderable: false,
            sWidth: "10%",
            render: function (data, type, full) { return BotoneraGrillaAreaPractica(data) }
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
            FuncionesBotoneraGrillaAreaPractica();
        }
    });
}

function BotoneraGrillaAreaPractica(data) {
    return '\
        <button type="button" class="editDialog btn btn-default btn-xs" data-clientid="' + data + '" title="Editar"> \
            <span class="glyphicon glyphicon-edit" aria-hidden="true"></span> \
        </button> \
        <button type="button" id="mat_' + data + '" class="btn btn-default btn-xs" data-toggle="confirmation" data-placement="left" data-singleton="true" data-on-confirm="EliminarAreaPractica" data-title="¿Está seguro?" onclick="SelAreaPractica(' + data + ');"> \
            <span class="glyphicon glyphicon-remove" aria-hidden="true"> \
            </span> \
        </button>';
}

function EliminarAreaPractica() {
    var idAreaPractica = $("#hIdAreaPractica").val();

    $.post("/AreaPractica/EliminarAreaPractica", { idAreaPractica: idAreaPractica })
      .success(function (data) {
          if (data.IsEverythingGood == true) {
              ReloadTable("TablaAreaPractica", false);
          }
          else if (data.IsRedirect) {
              window.location.href = "/Home/Login";
          }
      })
      .always(function () {
          CargarAlertas(frmAreaPractica);
      })
};

function SelAreaPractica(idAreaPractica) {
    $("#hIdAreaPractica").val(idAreaPractica);
};

function FuncionesBotoneraGrillaAreaPractica() {
    $('[data-toggle=confirmation]').confirmation();

    $(".editDialog").off().on("click", function () {
        ModalAreaPractica($(this).data("clientid"), function () {
            IniciarCombosModalAreaPractica($("#hparent_id" + frmModal).val(), JSON.parse('[' + $("#hResponsables" + frmModal).val() + ']'));
        });
    });
}

function AltaAreaPractica()
{
    ModalAreaPractica(null, function () {
        IniciarCombosModalAreaPractica();
    });
}

function ModalAreaPractica(idAreaPractica, callback)
{
    $("#dialog").load("/AreaPractica/ModalAreaPractica", { idAreaPractica: idAreaPractica }, function (response, status, xhr) {
        if (status == "success") {
            $("#dialog").modal('show');

            if (callback)
                callback();
        }
        else {
            CargarAlertas(frmAreaPractica);
        }
    });
}

function AgregarItem() {
    $("#ItemsVacio").hide();
    $.ajax({
        type: 'GET',
        url: '/AreaPractica/AgregarItem',
        success: function (data) {
            $(data).appendTo("#BodyModalItems");
        }
    })
}

function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
}


function BorrarItem(obj) {
    
    $(obj).parent().parent().remove();

    if ($(".items-modal").length == 0) {
        $("#ItemsVacio").show();
    }
}
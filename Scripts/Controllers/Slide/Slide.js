var frmSlide = "Slide";
var frmModal = "Modal";
var frmCombo = "Combo";

function IniciarTablaSlide() {
    $.fn.dataTable.ext.errMode = 'none';

    $('#TablaSlide').on('error.dt', function (e, settings, techNote, message) {
        CargarAlertas(frmSlide);
    })

    var oTable = $('#TablaSlide').dataTable({
        dom: 'Lfrtip',
        sAjaxSource: "/Slide/LlenarJSONGrillaSlide",
        sServerMethod: "POST",
        "aoColumns": [
        {
            data: "section_name",
            sWidth: "22%"
        },
        {
            data: "title_es",
            sWidth: "45%",
        },
        {
            data: "Orden",
            sWidth: "8%"
        },
        {
            data: "panel_color",
            sWidth: "15%"
        },
        {
            data: "id",
            sWidth: "10%",
            sClass: "der",
            orderable: false,
            sWidth: "10%",
            render: function (data, type, full) { return BotoneraGrillaSlide(full); }
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
            FuncionesBotoneraGrillaSlide();
        }
    });
}

function BotoneraGrillaSlide(full) {
    var html = "";

    html += '\
        <button type="button" class="editDialog btn btn-default btn-xs" data-clientid="' + full.id + '" title="Editar"> \
            <span class="glyphicon glyphicon-edit" aria-hidden="true"></span> \
        </button> \
        <button type="button" id="mat_' + full.id + '" class="btn btn-default btn-xs" data-toggle="confirmation" data-placement="left" data-singleton="true" data-on-confirm="EliminarSlide" data-title="¿Está seguro?" onclick="SelSlide(' + full.id + ');"> \
            <span class="glyphicon glyphicon-remove" aria-hidden="true"> \
            </span> \
        </button>'

    return html;
}

function EliminarSlide() {
    var idSlide = $("#hIdSlide").val();

    $.post("/Slide/EliminarSlide", { idSlide: idSlide })
      .success(function (data) {
          if (data.IsEverythingGood == true) {
              ReloadTable("TablaSlide", false);
          }
          else if (data.IsRedirect) {
              window.location.href = "/Home/Login";
          }
      })
      .always(function () {
          CargarAlertas(frmSlide);
      })
};

function SelSlide(idSlide) {
    $("#hIdSlide").val(idSlide);
};

function FuncionesBotoneraGrillaSlide() {
    $('[data-toggle=confirmation]').confirmation();

    $(".editDialog").off().on("click", function () {
        ModalSlide($(this).data("clientid"), function () {
            IniciarCombosModalSlide($("#hsection_name" + frmModal).val());

            if ($("#slide_panel_color").val() != "")
                SetColorByHidden();
            else
                SetColorByInput();
        });
    });
}

function AltaSlide() {
    ModalSlide(null, function () {
        IniciarCombosModalSlide();
        SetColorByInput();
    });
}

function ModalSlide(idSlide, callback) {
    $("#dialog").load("/Slide/ModalSlide", { idSlide: idSlide }, function (response, status, xhr) {
        if (status == "success") {
            $("#dialog").modal('show');

            if (callback)
                callback();
        }
        else {
            CargarAlertas(frmSlide);
        }
    });
}

function SetColorByInput() {
    $("#slide_panel_color").val($("#inputColor").val());
}

function SetColorByHidden() {
    $("#inputColor").val($("#slide_panel_color").val());
}
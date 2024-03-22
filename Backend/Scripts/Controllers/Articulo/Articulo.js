var frmArticulo = "Articulo";
var frmModal = "Modal";
var frmHome = "Home";
var frmCombo = "Combo";

function IniciarCombosHomeArticulo()
{
    new Combo({
        name: "AreaPractica",
        view: frmArticulo,
        actionController: "/AreaPractica/LlenarAreasPracticas/",
    }).createBasicCombo();

    new Combo({
        name: "Autor",
        view: frmArticulo,
        actionController: "/Profesional/LlenarProfesionales/",
    }).createBasicCombo();


    return false;
}

function FiltrosBusquedaArticulo()
{
    if ($("#filstrosBusquedaArticulo").hasClass("shown")) {
        $("#filstrosBusquedaArticulo").slideUp(400);
        $("#filstrosBusquedaArticulo").removeClass("shown");
        $("span", $(".desplegableFiltros")).removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
    }
    else {
        $("#filstrosBusquedaArticulo").slideDown(400);
        $("#filstrosBusquedaArticulo").addClass("shown");
        $("span", $(".desplegableFiltros")).removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
    }
}

function ModalArticulo(idArticulo) {
    $("#dialog").load("/Articulo/ModalArticulo", { idArticulo: idArticulo }, function (response, status, xhr) {
        if (status == "success") {
            $("#dialog").modal('show');
        }
        else
            CargarAlertas(frmArticulo);
    });
}

function LimpiarFormBusquedaArticulo()
{
    $("#hAreaPractica" + frmArticulo).val("");
    $("#hAutor" + frmArticulo).val("");
    $('#ddlAreaPractica' + frmArticulo)[0].selectize.clear();
    $('#ddlAutor' + frmArticulo)[0].selectize.clear();
    $("#busqueda_Texto").val("");
    $("#busqueda_FechaDesde").val("");
    $("#busqueda_FechaHasta").val("");
}

function BuscarArticulos() {
    if ($("#BusquedaArticuloForm").valid()) {
        ReloadTable("TablaArticulo");
    }
}

function IniciarTablaArticulo() {
    $.fn.dataTable.ext.errMode = 'none';

    $('#TablaArticulo').on('error.dt', function (e, settings, techNote, message) {
        CargarAlertas(frmArticulo);
    })

    var oTable = $('#TablaArticulo').dataTable({
        dom: 'Blfrtip',
        buttons: [
            {
                text: '<span class="iconoExcel" aria-hidden="true" title="Exportar a Excel"></span>',
                className: 'btn btn-default btn-sm btn-imagen space1',
                action: function (e, dt, node, config) {
                    ExportarExcelCompletoArticulos();
                }
            },
        ],
        order: [[2, "desc"]],
        columnDefs: [{ type: 'fecha', targets: 2 }],
        sAjaxSource: "/Articulo/LlenarJSONGrillaArticulo",
        sServerMethod: "POST",
        "aoColumns": [
        {
            data: "title_es",
            sWidth: "30%"
        },
        {
            data: "Autores",
            sWidth: "30%",
        },
        {
            data: "pub_date",
            sWidth: "10%",
            render: function (data, type, full) { return full.pub_date || ""; }
        },
        {
            data: "featured",
            sWidth: "6%",
            render: function (data, type, full) { return full.featured ? "Sí" : "No";}
        }, {
            data: "priorizar",
            sWidth: "6%",
            render: function (data, type, full) { return full.priorizar ? "Sí" : "No"; }
        }
        ,
        {
            data: "id",
            sWidth: "16%",
            sClass: "der",
            orderable: false,
            sWidth: "10%",
            render: function (data, type, full) { return BotoneraGrillaArticulo(full); }
        }
        ],
        bAutoWidth: false,
        bProcessing: true,
        pageLength: 50,
        language: {
            select: {
                rows: ". %d filas seleccionadas"
            }
        },
        fnDrawCallback: function (oSettings) {
            FuncionesBotoneraGrillaArticulo();
        },
        fnServerData: function (sSource, aoData, fnCallback) {
            $.ajax({
                "dataType": 'json',
                "type": "POST",
                "url": sSource,
                "data": $("#BusquedaArticuloForm").serialize(),
                "success": fnCallback
            })
        }
    });
}

function ExportarExcelCompletoArticulos() {
    if ($("#TablaArticulo td.dataTables_empty").length == 0) {
        $.post("/Articulo/GenerarExcelCompletoArticulos", $("#BusquedaArticuloForm").serialize())
         .success(function (data) {
             if (data.IsEverythingGood == true) {
                 window.location = "/Articulo/ExportarExcelCompleto?token=" + data.Token;
             }
         })
        .always(function () {
            CargarAlertas(frmArticulo);
        })
    }
    else
    {
        Danger("Debe haber, por lo menos, 1 registro en la grilla.");
    }
}

function BotoneraGrillaArticulo(full) {
    var html = "";

    if (full.visible == 1)
    {
        html += '\
        <button type="button" class="habilitadoDialog btn btn-success btn-xs" data-clientid="' + full.id + '" title="Habilitado" value="0"> \
            <span class="glyphicon glyphicon-off" aria-hidden="true"></span> \
        </button>';
    }
    else
    {
        html += '\
        <button type="button" class="habilitadoDialog btn btn-danger btn-xs" data-clientid="' + full.id + '" title="DesHabilitado" value="1"> \
            <span class="glyphicon glyphicon-off" aria-hidden="true"></span> \
        </button>';
    }

    html += '\
        <button type="button" class="editDialog btn btn-default btn-xs" data-clientid="' + full.id + '" title="Editar"> \
            <span class="glyphicon glyphicon-edit" aria-hidden="true"></span> \
        </button> \
        <button type="button" id="mat_' + full.id + '" class="btn btn-default btn-xs" data-toggle="confirmation" data-placement="left" data-singleton="true" data-on-confirm="EliminarArticulo" data-title="¿Está seguro?" onclick="SelArticulo(' + full.id + ');"> \
            <span class="glyphicon glyphicon-remove" aria-hidden="true"> \
            </span> \
        </button>\
        <a role="button" id="' + full.id + '" class="btn btn-default btn-xs" target="_blank" href="' + base_web_url + full.slug + '"> \
            <span class="glyphicon glyphicon-globe" aria-hidden="true"> \
            </span> \
        </a>'

    return html;
}

function EliminarArticulo() {
    var idArticulo = $("#hIdArticulo").val();

    $.post("/Articulo/EliminarArticulo", { idArticulo: idArticulo })
      .success(function (data) {
          if (data.IsEverythingGood == true) {
              ReloadTable("TablaArticulo", false);
          }
          else if (data.IsRedirect) {
              window.location.href = "/Home/Login";
          }
      })
      .always(function () {
          CargarAlertas(frmArticulo);
      })
};

function SelArticulo(idArticulo) {
    $("#hIdArticulo").val(idArticulo);
};

function FuncionesBotoneraGrillaArticulo() {
    $('[data-toggle=confirmation]').confirmation();

    $('.dt-button').removeClass("dt-button");
    $('.dt-buttons').addClass("space1");

    $(".editDialog").off().on("click", function () {
        ModalArticulo($(this).data("clientid"), function () {
            IniciarCombosModalArticulo(JSON.parse('[' + $("#hAreasPracticas" + frmModal).val() + ']'),
                JSON.parse('[' + $("#hAutores" + frmModal).val() + ']'),
                $("#hImagenPosY" + frmModal).val(), JSON.parse('[' + $("#hTags" + frmModal).val() + ']'));
        });
    });

    $('.habilitadoDialog').off().on('click', function () {
        var button = $(this);
        var clientId = button.data("clientid");
        var habilitado = button.attr("value");

        $.post("/Articulo/HabilitarArticulo/", { idArticulo: clientId, habilitado: habilitado })
            .success(function (data) {
                if (data.IsEverythingGood == true) {
                    if (habilitado == 1) {
                        button.attr("value", 0);
                        button.removeClass("btn-danger");
                        button.addClass("btn-success");
                    }
                    else {
                        button.attr("value", 1);
                        button.removeClass("btn-success");
                        button.addClass("btn-danger");
                    }
                }
            })
            .always(function () {
                CargarAlertas(frmArticulo);
            });

        return false;
    });
}

function AltaArticulo()
{
    ModalArticulo(null, function () {
        IniciarCombosModalArticulo();
    });
}

function ModalArticulo(idArticulo, callback)
{
    $("#dialog").load("/Articulo/ModalArticulo", { idArticulo: idArticulo }, function (response, status, xhr) {
        if (status == "success") {
            $("#dialog").modal('show');

            if (callback)
                callback();
        }
        else {
            CargarAlertas(frmArticulo);
        }
    });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////GENERAL////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

function CargarFormularioCV(modo) {
    switch (modo) {
        case "Datos":
            $("#TituloModal").html("Datos");
            AbrirDatosModal();
            $("#lnkDatos").tab('show');
            break;
        case "Experiencia":
            $("#TituloModal").html("Experiencia");
            AbrirExperienciaModal();
            $("#lnkExperiencia").tab('show');
            break;
        case "Educacion":
            $("#TituloModal").html("Educacion");
            AbrirEducacionModal();
            $("#lnkEducacion").tab('show');
            break;
        case "Entrevistas":
            $("#TituloModal").html("Entrevistas");
            AbrirEntrevistaModal();
            $("#lnkEntrevistas").tab('show');
            break;
    }
}

function CargarContenidoModalCV(modo, callback)
{
    $("#pnlDialogCVBaseBody").load("/CV/Modal" + modo, { idCV: $("#hidCVBase").val() }, function (response, status, xhr) {
        if (status == "success") {
            if (callback)
                callback();
        }
        else
        {
            CargarAlertas(frmModal)
        }
    })
}

function SlideDesplegable(divId) {
    if ($("#" + divId).hasClass("shown")) {
        $("#" + divId).slideUp(400);
        $("#" + divId).removeClass("shown");
        $("span", $(".desplegable")).removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
    }
    else {
        $("#" + divId).slideDown(400);
        $("#" + divId).addClass("shown");
        $("span", $(".desplegable")).removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////Datos//////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

function AbrirDatosModal() {
    CargarContenidoModalCV("Datos");
}

function GuardarDatos()
{
    SaveDatos(function (data) {
        //Actualizamos el id de cv general para las tabs.
        $("#hidCVBase").val(data.idCV);

        //Actualizamos el id del modelo de datos para una posible edición.
        $("#datos_id").val(data.idCV);

        //El modo del modal cambia a Edición luego del alta.
        $("#modo").val("EDICION");

        //Cambiamos la función del submit del formulario de datos a la función de edición.
        $("#DatosForm").off("submit").on("submit", EditarDatos);

        //Habilitamos las otras tabs.
        $("#tabCV > ul.nav-tabs > li.disabled").removeClass("disabled");

        //Agregamos el botón de exportación de PDF del formulario de datos.
        $("#btnGuardarModalDatos").after('<button type="button" class="btn btn-default" style="margin-left:10px;" onclick="ExportarPDF(' + data.idCV + ')">PDF</button>');

        //Recargamos la grilla de la home.
        ReloadTable("TablaCV");
    });

    return false;
}

function EditarDatos()
{
    SaveDatos(function () { ReloadTable("TablaCV"); });

    return false;
}

function SaveDatos(callback) {
    if ($("#DatosForm").valid()) {
        $.post("/CV/GuardarDatos/", $("#DatosForm").serialize())
        .success(function (data) {
            if (data.IsEverythingGood) {
                if (callback)
                    callback(data);
            }
            else if (data.IsRedirect) {
                window.location.href = "/Home/Login";
            }
        })
        .always(function (data) {
            CargarAlertas(frmModal);
        });
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////Experiencia///////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

function AbrirExperienciaModal() {
    CargarContenidoModalCV("Experiencia");
}

function IniciarTablaExperiencia()
{
    $.fn.dataTable.ext.errMode = 'none';

    $('#TablaExperiencia').on('error.dt', function (e, settings, techNote, message) {
        CargarAlertas(frmModal);
    })

    var oTable = $('#TablaExperiencia').dataTable({
        dom: 'lfrtip',
        columnDefs: [{ type: 'fecha', targets: 0 }],
        sAjaxSource: "/CV/LlenarJSONGrillaExperiencia",
        sServerMethod: "POST",
        "aoColumns": [
        {
            data: null,
            sWidth: "30%",
            mRender: function (data, type, row)
            {
                var date = row.date_from.substr(0, 10) + " - ";
                date += (row.date_to != null) ? row.date_to.substr(0, 10) : "";
                return date;
            }
        },
        {
            data: "company",
            sWidth: "30%",
        },
        {
            data: "charge",
            sWidth: "30%",
        },
        {
            data: "id",
            sWidth: "10%",
            sClass: "der",
            orderable: false,
            sWidth: "10%",
            render: function (data, type, full) { return BotoneraGrillaExperiencia(full); }
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
            FuncionesBotoneraGrillaExperiencia();
        },
        fnServerParams: function (aoData) {
            aoData.push({ "name": "idCV", "value": $("#experiencia_cv_id").val() });
        }
    });
}

function BotoneraGrillaExperiencia(full) {
    var html = "";

    html += '\
        <button type="button" class="editDialogModal btn btn-default btn-xs" data-clientid="' + full.id + '" title="Editar"> \
            <span class="glyphicon glyphicon-edit" aria-hidden="true"></span> \
        </button>';

    return html;
}

function FuncionesBotoneraGrillaExperiencia() {
    $(".editDialogModal").off().on("click", function () {
        $('#btnCancelarEdicion').removeClass("hidden");     
        PopularExperiencia($(this).data("clientid"));
    });
}

function GuardarExperiencia()
{
    if ($("#ExperienciaForm").valid()) {
        $.post("/CV/GuardarExperiencia/", $("#ExperienciaForm").serialize())
        .success(function (data) {
            if (data.IsEverythingGood) {
                ReloadTable('TablaExperiencia', false);
                LimpiarFormExperiencia();
            }
            else if (data.IsRedirect) {
                window.location.href = "/Home/Login";
            }
        })
        .always(function (data) {
            CargarAlertas(frmModal);
        });
    }
}

function LimpiarFormExperiencia()
{
    $('#modo').val("ALTA");
    $("#experiencia_id").val(0);
    $("#experiencia_company").val("");
    $("#experiencia_charge").val("");
    $("#experiencia_location").val("");
    $("#experiencia_description").val("");
    $("#experiencia_date_from").val("");
    $("#experiencia_date_to").val("");

    $('#btnCancelarEdicion').addClass("hidden");
}

function PopularExperiencia(idExperiencia)
{
    //Si el panel de alta no está a la vista, lo mostramos.
    if (!$("#panelFormExperiencia").hasClass("shown"))
    {
        SlideDesplegable('panelFormExperiencia');
    }

    $.get("/CV/GetExperienciaByID/", { idExperiencia: idExperiencia })
    .done(function (data) {
        if (data.IsEverythingGood) {
            $('#modo').val("EDICION");
            $("#experiencia_id").val(data.Experiencia.id);
            $("#experiencia_cv_id").val(data.Experiencia.cv_id);
            $("#experiencia_company").val(data.Experiencia.company);
            $("#experiencia_charge").val(data.Experiencia.charge);
            $("#experiencia_location").val(data.Experiencia.location);
            $("#experiencia_description").val(data.Experiencia.description);
            $("#experiencia_date_from").val(data.Experiencia.date_from.substr(0, 10));
            $("#experiencia_date_to").val(data.Experiencia.date_to.substr(0, 10));
        }
        else {
            CargarAlertas(frmModal);
            return null;
        }
    })
    .fail(function () {
        CargarAlertas(frmModal);
        return null;
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////Educación////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

function AbrirEducacionModal() {
    CargarContenidoModalCV("Educacion");
}

function IniciarTablaEducacion() {
    $.fn.dataTable.ext.errMode = 'none';

    $('#TablaEducacion').on('error.dt', function (e, settings, techNote, message) {
        CargarAlertas(frmModal);
    })

    var oTable = $('#TablaEducacion').dataTable({
        dom: 'lfrtip',
        columnDefs: [{ type: 'fecha', targets: 0 }],
        sAjaxSource: "/CV/LlenarJSONGrillaEducacion",
        sServerMethod: "POST",
        "aoColumns": [
        {
            data: null,
            sWidth: "30%",
            mRender: function (data, type, row) {
                var date = row.entry_date.substr(0, 10) + " - ";
                date += (row.end_date != null) ? row.end_date.substr(0, 10) : "";
                return date;
            }
        },
        {
            data: "institute",
            sWidth: "30%",
        },
        {
            data: "title",
            sWidth: "30%",
        },
        {
            data: "id",
            sWidth: "10%",
            sClass: "der",
            orderable: false,
            sWidth: "10%",
            render: function (data, type, full) { return BotoneraGrillaEducacion(full); }
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
            FuncionesBotoneraGrillaEducacion();
        },
        fnServerParams: function (aoData) {
            aoData.push({ "name": "idCV", "value": $("#educacion_cv_id").val() });
        }
    });
}

function BotoneraGrillaEducacion(full) {
    var html = "";

    html += '\
        <button type="button" class="editDialogModal btn btn-default btn-xs" data-clientid="' + full.id + '" title="Editar"> \
            <span class="glyphicon glyphicon-edit" aria-hidden="true"></span> \
        </button>';

    return html;
}

function FuncionesBotoneraGrillaEducacion() {
    $(".editDialogModal").off().on("click", function () {
        $('#btnCancelarEdicion').removeClass("hidden");
        PopularEducacion($(this).data("clientid"));
    });
}

function GuardarEducacion() {
    if ($("#EducacionForm").valid()) {
        $.post("/CV/GuardarEducacion/", $("#EducacionForm").serialize())
        .success(function (data) {
            if (data.IsEverythingGood) {
                ReloadTable('TablaEducacion', false);
                LimpiarFormEducacion();
            }
            else if (data.IsRedirect) {
                window.location.href = "/Home/Login";
            }
        })
        .always(function (data) {
            CargarAlertas(frmModal);
        });
    }
}

function LimpiarFormEducacion() {
    $('#modo').val("ALTA");
    $("#educacion_id").val(0);
    $("#educacion_institute").val("");
    $("#educacion_title").val("");
    $("#educacion_comments").val("");
    $("#educacion_entry_date").val("");
    $("#educacion_end_date").val("");

    $('#btnCancelarEdicion').addClass("hidden");
}

function PopularEducacion(idEducacion) {
    //Si el panel de alta no está a la vista, lo mostramos.
    if (!$("#panelFormEducacion").hasClass("shown")) {
        SlideDesplegable('panelFormEducacion');
    }

    $.get("/CV/GetEducacionByID/", { idEducacion: idEducacion })
    .done(function (data) {
        if (data.IsEverythingGood) {
            $('#modo').val("EDICION");
            $("#educacion_id").val(data.Educacion.id);
            $("#educacion_cv_id").val(data.Educacion.cv_id);
            $("#educacion_institute").val(data.Educacion.institute);
            $("#educacion_title").val(data.Educacion.title);
            $("#educacion_comments").val(data.Educacion.comments);
            $("#educacion_entry_date").val(data.Educacion.entry_date.substr(0, 10));
            $("#educacion_end_date").val(data.Educacion.end_date.substr(0, 10));
        }
        else {
            CargarAlertas(frmModal);
        }
    })
    .fail(function () {
        CargarAlertas(frmModal);
    });
}


/////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////Entrevistas///////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

function AbrirEntrevistaModal() {
    CargarContenidoModalCV("Entrevista");
}

function IniciarTablaEntrevista() {
    $.fn.dataTable.ext.errMode = 'none';

    $('#TablaEntrevista').on('error.dt', function (e, settings, techNote, message) {
        CargarAlertas(frmModal);
    })

    var oTable = $('#TablaEntrevista').dataTable({
        dom: 'lfrtip',
        columnDefs: [{ type: 'fecha', targets: 0 }],
        sAjaxSource: "/CV/LlenarJSONGrillaEntrevista",
        sServerMethod: "POST",
        "aoColumns": [
        {
            data: "date",
            sWidth: "90%",
            mRender: function (data, type, row) {
                return data.substr(0, 10);
            }
        },
        {
            data: "id",
            sWidth: "10%",
            sClass: "der",
            orderable: false,
            sWidth: "10%",
            render: function (data, type, full) { return BotoneraGrillaEntrevista(full); }
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
            FuncionesBotoneraGrillaEntrevista();
        },
        fnServerParams: function (aoData) {
            aoData.push({ "name": "idCV", "value": $("#entrevista_cv_id").val() });
        }
    });
}

function BotoneraGrillaEntrevista(full) {
    var html = "";

    html += '\
        <button type="button" class="editDialogModal btn btn-default btn-xs" data-clientid="' + full.id + '" title="Editar"> \
            <span class="glyphicon glyphicon-edit" aria-hidden="true"></span> \
        </button>';

    return html;
}

function FuncionesBotoneraGrillaEntrevista() {
    $(".editDialogModal").off().on("click", function () {
        $('#btnCancelarEdicion').removeClass("hidden");
        PopularEntrevista($(this).data("clientid"));
    });
}

function GuardarEntrevista() {
    if ($("#EntrevistaForm").valid()) {
        $.post("/CV/GuardarEntrevista/", $("#EntrevistaForm").serialize())
        .success(function (data) {
            if (data.IsEverythingGood) {
                ReloadTable('TablaEntrevista', false);
                LimpiarFormEntrevista();
            }
            else if (data.IsRedirect) {
                window.location.href = "/Home/Login";
            }
        })
        .always(function (data) {
            CargarAlertas(frmModal);
        });
    }
}

function LimpiarFormEntrevista() {
    $('#modo').val("ALTA");
    $("#entrevista_id").val(0);
    $("#entrevista_comments").val("");
    $("#entrevista_date").val("");

    $('#btnCancelarEdicion').addClass("hidden");
}

function PopularEntrevista(idEntrevista) {
    //Si el panel de alta no está a la vista, lo mostramos.
    if (!$("#panelFormEntrevista").hasClass("shown")) {
        SlideDesplegable('panelFormEntrevista');
    }

    $.get("/CV/GetEntrevistaByID/", { idEntrevista: idEntrevista })
    .done(function (data) {
        if (data.IsEverythingGood) {
            $('#modo').val("EDICION");
            $("#entrevista_id").val(data.entrevista.id);
            $("#entrevista_cv_id").val(data.entrevista.cv_id);
            $("#entrevista_comments").val(data.entrevista.comments);
            $("#entrevista_date").val(data.entrevista.date.substr(0, 10));
        }
        else {
            CargarAlertas(frmModal);
        }
    })
    .fail(function () {
        CargarAlertas(frmModal);
    });
}
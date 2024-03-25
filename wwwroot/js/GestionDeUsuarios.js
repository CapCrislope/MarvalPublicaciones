
var frmGestionDeUsuarios = "GestionDeUsuarios";

function InicializarTablaUsuarios() {

    $.fn.dataTable.ext.errMode = 'none';

    $('#TablaUsuarios').on('error.dt', function (e, settings, techNote, message) {
        CargarAlertas(frmPortada);
    });

    var oTable = $('#TablaUsuarios').dataTable({
        bProcessing: true,
        sAjaxSource: "/SocioAdm/LlenarJSONGrillaUsuarios",
        sServerMethod: "POST",
        dom: 'lfrtip',

        "aoColumns": [
            {
                data: "NombreApellido",
                sWidth: "15%",
            },
            {
                data: "RolStr",
                sWidth: "15%",
            },
            {

                sWidth: "10%",
                sClass: "der",
                orderable: false,
                render: function (data, type, full) { return BotoneraUsuarios(full); }
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
            FunctionsBotoneraUsuarios();
        }
    });

}

function InicializarCombosGestionUsuarios() {

    new Combo({
        name: "Usuario",
        view: "_GestionDeUsuarios",
        actionController: "/SocioAdm/LlenarComboPersonas",
        //actionControllerSelect: "/SocioAdm/GetNombrePersona",
        valueField: "Id",
        labelField: "Descripcion",
        cantItems: 1
    }).createSearchCombo();

    new Combo({
        name: "Rol",
        view: "_GestionDeUsuarios",
        actionController: "/SocioAdm/LlenarComboRoles",
        cantItems: 1
    }).createBasicCombo();
}

function AltaRolUsuario() {

    if ($("#formUsuarioRol").valid()) {

        $.post("/SocioAdm/AltaRolUsuario", $("#formUsuarioRol").serialize())
            .done(function (data) {
                ;
                if (data.isEverythingGood == true) {
                    ReloadTable("TablaUsuarios", false);
                }
            })
            .always(function () {
                CargarAlertas(frmGestionDeUsuarios)
            })

    }
}

function BotoneraUsuarios(full) {
    ;
    html = "";
    html += BtnEliminar(full.IdUsuario);

    return html;
}

function Sel(id) {
    ;
    $("#idUsuario").val(id);
}

function FunctionsBotoneraUsuarios() {
    InitializeConfirmationPop(DeleteRegistro);
}

function DeleteRegistro() {

    var idUsuario = $("#idUsuario").val();


    $.post('/SocioAdm/DeleteRegistro', { IdUsuario: idUsuario })
        .done(function (data) {
            if (data.isEverythingGood == true) {
                ReloadTable("TablaUsuarios", false);
            }

        })
        .always(function () {
            CargarAlertas(frmGestionDeUsuarios);
        })
}


//----------------------------------------------------------------------------------------------------------





var frmPortada = "Portada";
var frmModal = "Modal";
//var frmHome = "_Home";

function setActive(btn) {
    if (btn != null && btn != undefined) {
        $("[role='presentation'].active").removeClass("active");
        $(btn).closest("[role='presentation']").addClass("active");
    }
}


/*----DatePicker---*/
function InicializarDatePickers() {

    $.fn.datepicker.defaults.format = "dd/mm/yyyy";

    $(".date").datepicker({
        clearBtn: true,
        language: 'es',
        //   dateFormat: 'dd/mm/yyyy'
    });

    $('.date').on('change', function () {
        $('.datepicker').hide();

    });
}
//inputFileID: El Id del TextBoxFor que bindea con la property "[NombrePropiedad]Upload" del modelo.
function SetNameFile(inputFileID) {
    ;
    var inicio = $('#' + inputFileID).val().lastIndexOf('\\') + 1;
    var final = $('#' + inputFileID).val().length;

    var fileName = $('#' + inputFileID).val().substring(inicio, final);

    $(".input-sm", $('#' + inputFileID).closest('.input-group')).val(fileName);
}

function InitializeConfirmationPop(callback, options) {

    $('[data-toggle="confirmation"]').confirmation({
        rootSelector: '[data-toggle="confirmation"]',
        onConfirm: callback,
        singleton: true,
        popout: true,
        placement: "left",
        title: "¿Está seguro?",
        btnOkLabel: "Si",
        btnOkIconClass: "fas fa-check",
        btnCancelLabel: "No",
        btnCancelIconClass: "fas fa-times",

    });
}


function ChangeValueCheckBox() {
    $('input[type="checkbox"]').on('change', function () {
        ;
        if ($(this).is(':checked')) {
            $(this).attr('value', 'true');
        } else {
            $(this).attr('value', 'false');
        }

    });
}


function CargarLogin() {

    $('#pnlPrincipal').load('/Home/Login/', function (response, status, xhr) {
        if (status == "success") {
        }
    });

}

function CargarHome() {

    $('#pnlPrincipal').load('/Home/Home/', function (response, status, xhr) {
        if (status == "success") {
        }
    });

}


function CargarMenu() {
    $('#menuPnl').load('/Home/Menu/', function (response, status, xhr) {
        if (status == "success") {

            if ($("#btnEstadoProceso").length > 0)
                CargarEstadoProceso();
            else
                CargarPortada();
        }
    });
}

function CargarPortada() {

    $('#pnlContenido').load('/Home/Portada/', function (response, status, xhr) {
        if (status == "success") {

        }
    });

}



function CargarGestionUsuarios(btn) {

    $('#pnlContenido').load('/SocioAdm/GestionUsuarios/', function (response, status, xhr) {
        if (status == "success") {
            setActive(btn);
        }
    });

}

function CargarEstadoProceso(btn) {

    $('#pnlContenido').load('/Home/EstadoProceso/', function (response, status, xhr) {
        if (status == "success") {
            setActive(btn);
        }
    });

}


function CargarDefinicionTipoProceso(btn) {

    $('#pnlContenido').load('/Finanzas/DefinicionTipoProceso/', function (response, status, xhr) {
        if (status == "success") {
            setActive(btn);
        }
    });

}


function CargaDeImportes(btn) {

    $('#pnlContenido').load('/Finanzas/CargaDeImportes/', function (response, status, xhr) {
        if (status == "success") {
            setActive(btn);
        }
    });

}


function CargarValidacionImportes(btn) {

    $('#pnlContenido').load('/SocioADM/CargaValidacionImportes/', function (response, status, xhr) {
        if (status == "success") {
            setActive(btn);
        }
    });

}

function CargarEnvioAuditores(btn) {

    $('#pnlContenido').load('/RRHH/EnvioAuditores/', function (response, status, xhr) {
        if (status == "success") {
            setActive(btn);
        }
    });

}



function CargarBonosYRetiros(btn) {

    $('#pnlContenido').load('/RRHH/CargaBonosYRetiros/', function (response, status, xhr) {
        if (status == "success") {
            setActive(btn);
        }
    });

}


function CargarValidacionCalculosIniciales(btn) {

    $('#pnlContenido').load('/Finanzas/ValidacionCalculosIniciales/', function (response, status, xhr) {
        if (status == "success") {
            setActive(btn);
        }
    });

}

function CargarValidacionADMCalculosIniciales(btn) {

    $('#pnlContenido').load('/SocioADM/ValidacionADMCalculosIniciales/', function (response, status, xhr) {
        if (status == "success") {
            setActive(btn);
        }
    });

}

function CargarBorradorImpuestosEstimados(btn) {

    $('#pnlContenido').load('/Independiente/CargarBorradorImpuestosEstimados/', function (response, status, xhr) {
        if (status == "success") {
            setActive(btn);
        }
    });

}

function CargarImpuestosEstimados(btn) {

    $('#pnlContenido').load('/Finanzas/CargaImpuestosEstimados/', function (response, status, xhr) {
        if (status == "success") {
            setActive(btn);
        }
    });

}

function CargarValidacionImportesIteracion(btn) {

    $('#pnlContenido').load('/SocioADM/ValidacionImportesIteracion/', function (response, status, xhr) {
        if (status == "success") {
            setActive(btn);
        }
    });
}

function CargarDeValorDistribucionIteracion(btn) {

    $('#pnlContenido').load('/Finanzas/CargaDeValorDistribucionIteracion/', function (response, status, xhr) {
        if (status == "success") {
            setActive(btn);
        }
    });
}

function CargaDeGastosViajes(btn) {

    $('#pnlContenido').load('/RRHH/CargaDeGastosViajes/', function (response, status, xhr) {
        if (status == "success") {
            setActive(btn);
        }
    });

}

function CargaRetenciones(btn) {

    $('#pnlContenido').load('/RRHH/CargaDeRetenciones/', function (response, status, xhr) {
        if (status == "success") {
            setActive(btn);
        }
    });

}

function CargaFechaPago(btn) {
    $('#pnlContenido').load('/RRHH/CargaFechaPago/', function (response, status, xhr) {
        if (status == "success") {
            setActive(btn);
        }
    });
}

function CargarValidacionDistribucion(btn) {

    $('#pnlContenido').load('/Finanzas/ValidacionDistribucion/', function (response, status, xhr) {
        if (status == "success") {
            setActive(btn);
        }
    });
}

function CargaValidacionCuentas(btn) {
    $('#pnlContenido').load('/RRHH/ValidacionCuentas/', function (response, status, xhr) {
        if (status == "success") {
            setActive(btn);
        }
    });
}

function CargaInformacionCuentas(btn) {
    $('#pnlContenido').load('/Independiente/CargaInformacionCuentas/', function (response, status, xhr) {
        if (status == "success") {
            setActive(btn);
        }
    });
}

function CargaNroConstanciaPago(btn) {
    $('#pnlContenido').load('/RRHH/CargaNroConstanciaPago/', function (response, status, xhr) {
        if (status == "success") {
            setActive(btn);
        }
    });
}

function CargaGeneracionDocsPagos(btn) {
    $('#pnlContenido').load('/RRHH/CargaGeneracionDocsPagos/', function (response, status, xhr) {
        if (status == "success") {
            setActive(btn);
        }
    });
}

function CargarPagosAdeudados(btn) {
    $('#pnlContenido').load('/Independiente/CargarPagosAdeudados/', function (response, status, xhr) {
        if (status == "success") {
            setActive(btn);
        }
    });
}

function ConsultaDePagos(btn) {
    $('#pnlContenido').load('/Independiente/ConsultaDePagos/', function (response, status, xhr) {
        if (status == "success") {
            setActive(btn);
        }
    });
}

function CargarImpuestosReales(btn) {
    $('#pnlContenido').load('/Independiente/CargaDeImpuestosReales/', function (response, status, xhr) {
        if (status == "success") {
            setActive(btn);
        }
    });
}

function CargarConsultaImpuestosReales(btn) {
    $('#pnlContenido').load('/Independiente/ConsultaDeImpuestosReales/', function (response, status, xhr) {
        if (status == "success") {
            setActive(btn);
        }
    });
}

function CargarAvanceDistribucion(btn) {
    $('#pnlContenido').load('/Independiente/CargarAvanceDistribucion/', function (response, status, xhr) {
        if (status == "success") {
            setActive(btn);
        }
    });
}

function CargaAjustesEjercicio(btn) {
    $('#pnlContenido').load('/Finanzas/CargaAjustesEjercicio/', function (response, status, xhr) {
        if (status == "success") {
            setActive(btn);
        }
    });
}

function CargarValidacionAjustesEjercicio(btn) {
    $('#pnlContenido').load('/SocioAdm/ValidacionAjustesEjercicio/', function (response, status, xhr) {
        if (status == "success") {
            setActive(btn);
        }
    });
}

function CargarDescargaRecibos(btn) {
    $('#pnlContenido').load('/Independiente/CargaDescargaRecibos/', function (response, status, xhr) {
        if (status == "success") {
            setActive(btn);
        }
    });
}

function CargarModalFirmarRecibo(idImportePagoSocios) {
    $("#dialog").load("/Independiente/ModalFirmarRecibo", { idImportePagoSocios: idImportePagoSocios }, function (response, status, xhr) {

        if (status == "success") {
            ;
            $("#dialog").modal('show');
        }
        else {
            CargarAlertas(frmHome);
        }
    })
}

function FirmarConforme() {
    let frm = $("#FrmFirmarRecibo");

    if (!frm.valid()) {
        return;
    }

    $.ajax({
        type: 'POST',
        url: '/Independiente/FirmarRecibo',
        data: frm.serialize(),
        success: function (data) {
            if (data.isEverythingGood) {

                if (data.logInStatus) {
                    $("#dialog").modal('hide');
                    CargarDescargaRecibos();
                }
                else {
                    $("#divCredencialesIncorrectas").removeClass("d-none");
                }
            }
        }
    })

}

function CargarPlanDePagosImpuestos(btn) {
    $('#pnlContenido').load('/Independiente/PlanDePagosImpuestos/', function (response, status, xhr) {
        if (status == "success") {
            setActive(btn);
        }
    });
}

function CargarReporteDistribuciones(btn) {
    $('#pnlContenido').load('/Independiente/ReporteDistribuciones/', function (response, status, xhr) {
        if (status == "success") {
            setActive(btn);
        }
    });
}

function CargarReporteParaInformacionContable(btn) {
    $('#pnlContenido').load('/Independiente/ReporteParaInformacionContableContainer', function (response, status, xhr) {
        if (status == "success") {
            setActive(btn);
        }
    });
}

function CargarTablaReporteParaInformacionContable() {

    $("#TablaReportesInformacionContable").load("/Independiente/TablaReporteParaInformacionContable", { idIteracion: $("#hEjercicio_ConsultaPagos").val() }, function (response, status, xhr) {
        if (status == "success") {

        }
    })

}

function ReporteParaInformacionContable() {
    new Combo({
        name: "Ejercicio",
        view: "_ConsultaPagos",
        actionController: "/Independiente/CargarComboReporteParaInformacionContable",
        cantItems: 1,
        change: CargarTablaReporteParaInformacionContable,
        callback: function () {
            var id = $("#ddlEjercicio_ConsultaPagos")[0].selectize.search().items[0].id;
            $("#ddlEjercicio_ConsultaPagos")[0].selectize.setValue(id);
        }
    }).createBasicCombo();
}

function DescargarExcelReporteParaInformacionContable() {
    window.open("/Independiente/GenerarExcelTablaReporteParaInformacionContable?idIteracion=" + $("#hEjercicio_ConsultaPagos").val(), "_blank")

}

function ReloadTable(id, resetPagination) {
    var oTable = $('#' + id).DataTable();
    oTable.ajax.reload(null, resetPagination);
}


function Botonera(full) {
    html = "";
    html += BtnEliminar(full.id);
    html += BtnAddItem(full.id);

    return html;
}

function BtnEliminar(data) {
    return '<button type="button" id="mat_' + data + '" class="btn btn-secondary btn-xs ml-1" data-toggle="confirmation" data-placement="left" data-singleton="true" data-on-confirm="" data-title="¿Está seguro?" onclick="Sel(' + data + ');" > \
            <span class="fa fa-trash" aria-hidden="true"></span> \
            </span> \
        </button>';
}

function BtnAddItem(data) {
    return '<button type="button" class="addItem btn btn-success btn-xs ml-1" data-id="' + data + '" title="Agregar item"> \
                <span class="fa fa-check fa-1" aria-hidden="true"></span> \
            </button>';
}

function BtnEditar(data) {
    return '<button type="button" class="editar btn btn-light btn-xs ml-1" data-id="' + data + '" title="Editar"> \
                <span class="far fa-edit fa-1" aria-hidden="true"></span> \
            </button>';
}


function CargarBanners(banners) {

    //;

    var htmlBanners = "";

    banners.forEach(function (banner, index) {

        htmlBanners += '<div class="alert alert-dismissible banner bannerYellow"> \
                            <button type="button" class="close" data-dismiss="alert" >&times;</button> \
                            <img src="/Images/lamp.png" class="imgLamp" /> \
                            <div style="padding-left: 50px;"><strong>'+ banner + '</strong></div></div>';
    });

    $("#pnlBanners").html(htmlBanners);

    if (banners.length > 0)
        $("#divBanners").show();
    else
        $("#divBanners").hide();

}


function DescargaRecibo(btn) {
    ;
    var id = btn.dataset.id;
    var idIteracion = btn.dataset.iteracion;
    var pago = btn.dataset.pagoenpesos;

    $.post('/Independiente/GenerarRecibo', { IdSocio: id, IdIteracion: idIteracion, PagoEnPesos: pago })
        .done(function (data) {
            if (data.isEverythingGood == true) {


            }

        })
        .always(function () {
            CargarAlertas(frmHome);
        })

}

function exportarExcel() {

    // Obtener la tabla de datos
    var tabla = document.getElementById('ImpuestosAcumuladosTable');

    // Convertir la tabla a un arreglo de arreglos
    var datos = [];

    for (var i = 0; i < tabla.rows.length; i++) {
        var fila = tabla.rows[i];
        var filaDatos = [];
        for (var j = 0; j < fila.cells.length; j++) {
            filaDatos.push(fila.cells[j].innerText);
        }
        datos.push(filaDatos);
    }

    // Enviar los datos al servidor
    fetch('/Independiente/GenerarExcelTablaReporteParaDistribucion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
        .then(response => response.blob())
        .then(blob => {
            // Crear un enlace de descarga y hacer clic en él para descargar el archivo
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = url;
            a.download = 'ReporteDistribuciones.xlsx'; // Nombre del archivo Excel
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        })
        .catch(error => {
            console.error('Error al exportar la tabla a Excel:', error);
        });
};




function comboTipoCuenta(view, tipoCuenta,callback) {
    ;
    var selected;
    if (tipoCuenta == null) {
        selected = JSON.parse('[' + $('#hIdTipoCuenta' + view).val() + ']');
    }
    else {
        selected = JSON.parse('[' + $('#hIdTipoCuenta' + tipoCuenta + '' + view).val() + ']');
        //selected = ('[' + JSON.stringify($('#hIdTipoCuenta' + tipoCuenta + '' + view).val()) + ']')
    }
   // var selected = ('[' + JSON.stringify($('#hIdTipoCuenta' + tipoCuenta + view).val()) + ']')
    new Combo({
        name: (tipoCuenta == null ? "IdTipoCuenta" : "IdTipoCuenta" + tipoCuenta),
        view: view,
        actionController: "/Independiente/LlenarComboTipoCuenta",
        cantItems: 1,
        selectValue: selected
    }).createBasicCombo();

    if (callback != null) {
        callback("_ModalInfoSocio","Dolares",null)
    }
}

function comboBanco(tipoCuenta,callback) {

    var selected = JSON.parse('[' + $('#hBanco' + tipoCuenta + '_ModalInfoSocio').val() + ']');

    new Combo({
        name: ("Banco" + tipoCuenta),
        view: "_ModalInfoSocio",
        actionController: "/Independiente/LlenarComboBanco",
        cantItems: 1,
        selectValue: selected,
        change: ResetInputsCuentas
    }).createBasicCombo();

    if (callback != null) {
        callback("Dolares",null)
    }
}

function ResetInputsCuentas() {
    ;

    var PIdBanco = $("#hBancoPesos_ModalInfoSocio").val();
    var DIdBanco = $("#hBancoDolares_ModalInfoSocio").val();

    if (PIdBanco == 1) {
        $("#PCbu").val("");
        $("#PCbu").prop("disabled", true);
        $("#PNroCuenta").prop("disabled", false);
    } else {
        $("#PNroCuenta").val("");
        $("#PNroCuenta").prop("disabled", true);
        $("#PCbu").prop("disabled", false);
    }

    if (DIdBanco == 1) {
        $("#DCbu").val("");
        $("#DCbu").prop("disabled", true);
        $("#DNroCuenta").prop("disabled", false);
    } else {
        $("#DNroCuenta").val("");
        $("#DNroCuenta").prop("disabled", true);
        $("#DCbu").prop("disabled", false);
    }

}

function comboSocios() {
    var selUsuario = $('#hUsuario_ModalInfoSocio').val()
    new Combo({
        name: "Usuario",
        view: "_ModalInfoSocio",
        actionController: "/Independiente/LlenarComboSocios",
        actionControllerSelect: "/Independiente/LlenarComboSocios",
        valueField: "Id",
        labelField: "Descripcion",
        cantItems: 1,
        selectValue: selUsuario,
    }).createSearchCombo();
}


function modalInfoCuentaMarval() {

    $("#dialog").load("/Independiente/ModalInfoCuentaMarval", function (response, status, xhr) {

        if (status == "success") {
            ;
            $("#dialog").modal('show');

        }
        else {
            CargarAlertas(frmHome);
        }
    })
}

function guardarInfoCuentaMarval() {

    if ($("#FormInfoCuentaMarval").valid()) {

        $.post('/Independiente/GuardarInfoCuentaMarval', $("#FormInfoCuentaMarval").serialize())
            .done(function (data) {
                if (data.isEverythingGood == true) {
                    
                    $("#dialog").modal('hide');
                    ReloadTable("InformacionMarvalTable", false)
                }

            })
            .always(function () {
                CargarAlertas(frmHome);
            })
    }
    else {

    }
}


function InicializarTablaInfoCuentaMarval() {
    $.fn.dataTable.ext.errMode = 'none';

    $('#InformacionMarvalTable').on('error.dt', function (e, settings, techNote, message) {
        CargarAlertas(frmHome);
    });

    var oTable = $('#InformacionMarvalTable').dataTable({
        bProcessing: true,
        sAjaxSource: "/Independiente/LlenarGrillaInfoCuentaMarval",
        sServerMethod: "POST",
        sDom: 't',

        "aoColumns": [
            {
                data: "NroConvenioGG",
                sWidth: "15%",
                orderable: false,
                render: function (data, type, full) {
                    if (data == null) {
                        return 0
                    }
                    else {
                        return data
                    }
                }
            },
            {
                data: "NroConvenioGO",
                sWidth: "15%",
                orderable: false,
                render: function (data, type, full) {
                    if (data == null) {
                        return 0
                    }
                    else {
                        return data
                    }
                }
            },
            {
                data: "Cuit",
                sWidth: "15%",
                orderable: false,
                render: function (data, type, full) {
                    if (data == null) {
                        return 0
                    }
                    else {
                        return data
                    }
                }
            },
            {
                data: "TipoCuenta",
                sWidth: "15%",
                orderable: false,
                render: function (data, type, full) {
                    if (data == null) {
                        return "-"
                    }
                    else {
                        return data
                    }
                }

            },
            {
                data: "NroCuenta",
                sWidth: "15%",
                orderable: false,
                render: function (data, type, full) {
                    if (data == null) {
                        return "-"
                    }
                    else {
                        return data
                    }
                }
            },
            {
                data: "CodigoConcepto",
                sWidth: "15%",
                orderable: false,
                render: function (data, type, full) {
                    if (data == null) {
                        return 0
                    }
                    else {
                        return data
                    }
                }
            },
            {

                sWidth: "10%",
                sClass: "der",
                orderable: false,
                render: function (data, type, full) {
                    if ($("#modoAcceso").val() == "RRHH")
                    return botoneraInfoCuentaMarval(full);
                }
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
            if ($("#modoAcceso").val() == "RRHH")
            functionsInfoCuentaMarval();
        }
    });

}


function botoneraInfoCuentaMarval(full) {
    html = '';
    html += '<button type="button" class="editarInfoCuentaMarval btn btn-light btn-xs ml-1" data-id="' + full.IdInfoCuentaMarval+'" title="Editar"> \
                <span class="far fa-edit fa-1" aria-hidden="true"></span> \
            </button>';

    return html;
}

function functionsInfoCuentaMarval() {

    $(".editarInfoCuentaMarval").off().on("click", function () {
        ;
        modalInfoCuentaMarval()
    });
}



function altaSocio() {
    modalSocioInfo(null)
}

function modalSocioInfo(id) {

    $("#dialog").load("/Independiente/ModalInfoSocio", { IdSocio: id }, function (response, status, xhr) {

        if (status == "success") {
            ;
            $("#dialog").modal('show');

        }
        else {
            CargarAlertas(frmHome);
        }
    })
}


function guardarInfoCuentasSocio() {

    if ($("#FormInfoSocioMarval").valid()) {
        ;

        var PIdBanco = $("#hBancoPesos_ModalInfoSocio").val();
        var DIdBanco = $("#hBancoDolares_ModalInfoSocio").val();
        var PNroCuenta = $("#PNroCuenta").val();
        var DNroCuenta = $("#DNroCuenta").val();
        var PCbu = $("#PCbu").val();
        var DCbu = $("#DCbu").val();
        var DTipoCuenta = $("#hIdTipoCuentaDolares_ModalInfoSocio").val();

      if ((PIdBanco == 1 && PNroCuenta != "") || (PIdBanco == 2 && PCbu != "")) 
      {
          if ((DIdBanco == 0 && DTipoCuenta == 0 && DNroCuenta == "" && DCbu == "") || (DIdBanco == 1 && DTipoCuenta != 0 && DNroCuenta != "") || (DIdBanco == 2 && DTipoCuenta != 0 && DCbu != "")) {
              $.post('/Independiente/GuardarDatosCuentaSocio', $("#FormInfoSocioMarval").serialize())
                  .done(function (data) {
                      if (data.isEverythingGood == true) {
                          $("#dialog").modal('hide');
                          ReloadTable("InformacionSociosTable", false)
                      }
                  })
                  .always(function () {
                      CargarAlertas(frmHome);
                  })
          }
          else {
             Danger("Los campos para la cuenta en dólares están incompletos.");
          }
      } else
            Danger("Debe cargar al menos el número de cuenta o CBU para una cuenta en pesos.");
    }
    else {

    }
}

//function getDataForm() {
//    var data = {
//        Modo: $("#Modo").val(),
//        IdSocio: $("#IdSocio").val(),
//        IdUsuario: $("#hUsuario_ModalInfoSocio").val(),
//        Legajo: $("#Legajo").val(),
//        NombreSocio:$("#NombreSocio").val(),
//        Cuil: $("#Cuil").val(),
//        Email:$("#Email").val(),
//        CuentaDolares:getDataCuenta("Dolares"),
//        CuentaPesos: getDataCuenta("Pesos")
//    }

//    return data;
//}

//function getDataCuenta(tipoCuenta) {
//    ;
//   var data = {
//       IdBanco: parseInt($("#hBanco" + tipoCuenta+"_ModalInfoSocio").val()),
//       TipoCuenta: parseInt($("#hIdTipoCuenta" + tipoCuenta +"_ModalInfoSocio").val()),
//       NroCuenta: $("#InfoCuenta" + tipoCuenta + "_NroCuenta").val(),
//       Cbu: $("#InfoCuenta" + tipoCuenta + "_Cbu").val()
//    }

//    return data;
//}


function InicializarTablaInfoSocios() {
    $.fn.dataTable.ext.errMode = 'none';

    $('#InformacionSociosTable').on('error.dt', function (e, settings, techNote, message) {
        CargarAlertas(frmHome);
    });

    var oTable = $('#InformacionSociosTable').dataTable({
        bProcessing: true,
        sAjaxSource: "/Independiente/LlenarGrillaInfoSociosCuentas",
        sServerMethod: "POST",
        dom: 'lfrtip',

        "aoColumns": [
            {
                data: "IdUsuario",
                sWidth: "5%",

            },
            {
                data: "Legajo",
                sWidth: "5%",

            },
            {
                data: "NombreSocio",
                sWidth: "15%",

            },
            {
                data: "Email",
                sWidth: "20%",

            },
            {
                data: "Cuil",
                sWidth: "9%",

            },
            {
               // data: "CuentaPesos",
                sWidth: "20%",
                render: function (data, type, full) {
                    if (full.PIdBanco == 1) {
                        if (full.PTipoCuenta == 1) {
                            return 'CA ' + full.PNroCuenta
                        }
                        else {
                            return 'CC ' + full.PNroCuenta
                        }
                    } else {
                        return 'CBU ' + full.PCbu
                    }

                }

            },
            {
               // data: "CuentaDolares",
                sWidth: "20%",
                render: function (data, type, full) {
                  switch (full.DIdBanco) {
                    case 1:
                      if (full.DTipoCuenta == 1) {
                        return 'CA ' + full.DNroCuenta
                      }
                      else {
                        return 'CC ' + full.DNroCuenta
                      }
                      break;
                    case 2:
                      return 'CBU ' + full.DCbu
                      break;
                    default:
                      return '';
                      break;
                  }
                }
            },
            {

                sWidth: "6%",
                sClass: "der",
                orderable: false,
                render: function (data, type, full) {
                    if ($("#modoAcceso").val() == "RRHH")
                    return botoneraInfoSociosMarval(full);
                }
            }
        ],
        bAutoWidth: false,
        pageLength: 50,
        language: {
            select: {
                rows: ". %d filas seleccionadas"
            }
        },
        //fnServerData: function (sSource, aoData, fnCallback) {
        //    $.ajax({
        //        "dataType": 'json',
        //        "type": "POST",
        //        "url": sSource,
        //        "data": $("#FormBoletin").serialize(),
        //        "success": fnCallback
        //    })
        //},

        fnDrawCallback: function (oSettings) {
            if ($("#modoAcceso").val() == "RRHH")
                functionsInfoSociosMarval();
        }
    });

}

function botoneraInfoSociosMarval(full) {
    html = "";
    html += BtnEditar(full.IdInfoCuentaSocio);
    html += BtnEliminar(full.IdInfoCuentaSocio);

    return html;
}

function functionsInfoSociosMarval() {
    $(".editar").off().on("click", function () {
        ;
        modalSocioInfo($(this).attr("data-id"))
    });
    ;
    InitializeConfirmationPop(deleteRegistro);
}


function Sel(id) {
    $("#idUsuario").val(id);
}

function deleteRegistro() {
    var idInfoCuentaSocio = $("#idUsuario").val();


    $.post('/Independiente/DeleteInfoSocio', { IdInfoCuentaSocio: idInfoCuentaSocio })
        .done(function (data) {
            if (data.isEverythingGood == true) {
                ReloadTable("InformacionSociosTable", false);
            }

        })
        .always(function () {
            CargarAlertas(frmHome);
        })
}
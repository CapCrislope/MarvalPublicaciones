function PrepararEmail(tabla) {
    var rowData = $('#Table' + tabla).DataTable().rows({ selected: true }).nodes().to$();
    var copyData = rowData.clone();
    $(".nodata", copyData).remove();
    var htmlData = "<style>table, th, td  {border: solid 1px #000000; border-collapse: collapse;} th, td { padding: 5px; font-family: arial; font-size: 11px}</style><table>";
    $.each(copyData, function (index, value) {
        htmlData = htmlData + "<tr>" + value.innerHTML + "</tr>";
    });
    htmlData = htmlData + "</table>"

    $("#dialog").load("/Busqueda/ModalEmail", function (response, status, xhr) {
        if (status == "success") {
            $('#Contenido').val(escape(htmlData));
            $("#dialog").modal('show');
        } else {
            CargarAlertas(frmHome);
        }
    });
}

function EnviarEmail() {
    if ($('#frmEmail').valid()) {
        //event.preventDefault ? event.preventDefault() : (event.returnValue = false);

        $.post("/Busqueda/EnviarEmail", $("#frmEmail").serialize())
          .success(function (data) {

              if (data.IsEverythingGood == true) {
                  $("#dialog").modal('hide');
                  CargarAlertas(frmHome);
              }
              else if (data.IsEverythingGood == false) {
                  CargarAlertas(frmEmail);
              }
          });

        return false;
    }
}

function GetIdEjemplares(tabla) {
    var arr = $('#Table' + tabla).DataTable().rows({ selected: true }).nodes().to$();

    var sel = jQuery.map(arr, function (a) {
        return $('.checkbox', a).data('clientid');
    });

    //$('#hSel' + Tabla).val(JSON.stringify(sel));
    return JSON.stringify(sel);
}

function GetIdEjemplaresPagina(tabla) {
    var arr = $('#Table' + tabla).DataTable().rows({ page: 'current', selected: true }).nodes().to$();

    var sel = jQuery.map(arr, function (a) {
        return $('.checkbox', a).data('clientid');
    });

    //$('#hSel' + Tabla).val(JSON.stringify(sel));
    return JSON.stringify(sel);
}

function CheckAllLibros() {
    if ($("#chkAllLibros").is(':checked')) {

        //Seleccionar todos
        var oTable = $('#TableLibros').dataTable();
        var arr = $('input', oTable.fnGetNodes());

        arr.prop('checked', true);

        //var sel = jQuery.map(arr, function (a) {
        //    return parseInt(a.attributes["data-clientid"].value);
        //});

        //$('#hSelLibros').val(JSON.stringify(sel));

        $('#TableLibros').DataTable().rows().select();
    }
    else {

        //Deseleccionar todos
        var oTable = $('#TableLibros').dataTable();
        var arr = $('input', oTable.fnGetNodes());

        arr.prop('checked', false);

        //$('#hSelLibros').val('[]');

        $('#TableLibros').DataTable().rows().deselect();
    }

}

function CheckAllRevistas() {
    if ($("#chkAllRevistas").is(':checked')) {

        //Seleccionar todos
        var oTable = $('#TableRevistas').dataTable();
        var arr = $('input', oTable.fnGetNodes());

        arr.prop('checked', true);

        //var sel = jQuery.map(arr, function (a) {
        //    return parseInt(a.attributes["data-clientid"].value);
        //});

        //$('#hSelRevistas').val(JSON.stringify(sel));

        $('#TableRevistas').DataTable().rows().select();
    }
    else {

        //Deseleccionar todos
        var oTable = $('#TableRevistas').dataTable();
        var arr = $('input', oTable.fnGetNodes());

        arr.prop('checked', false);

        //$('#hSelRevistas').val('[]');

        $('#TableRevistas').DataTable().rows().deselect();
    }
}

function ModalGuardarBusqueda(table) {
    $("#dialog").load("/Busqueda/ModalGuardar", function (response, status, xhr) {
        if (status == "success") {
            $('#Tabla').val(table);
            $('#SelEjemplares').val(GetIdEjemplares(table));
            $("#dialog").modal('show');
        } else {
            CargarAlertas(frmHome);
        }
    });
}

function GuardarBusqueda() {
    if ($('#frmGuardarBusqueda').valid()) {
        //event.preventDefault ? event.preventDefault() : (event.returnValue = false);

        //var Tabla = $('#Tabla').val();
        //$('#SelEjemplares').val($('#hSel' + Tabla).val());

        $.post("/Busqueda/Guardar", $("#frmGuardarBusqueda").serialize())
          .success(function (data) {

              if (data.IsEverythingGood == true) {
                  $("#dialog").modal('hide');
                  CargarAlertas(frmHome);
              }
              else if (data.IsEverythingGood == false) {
                  CargarAlertas(frmGuardarBusqueda);
              }
          });

        return false;
    }
}
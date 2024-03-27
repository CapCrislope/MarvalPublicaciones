
var initialCantTabs = 5;
/*var mostrarTabsPaginas = initialCantTabs;*/

function generatePagination(currentPage, totalPages, pnlPagination, fnChangePage) {

  var initialTab = currentPage - 2;
  if (initialTab < 1)
    initialTab = 1;

  var paginationHtml = '';

  if (totalPages > 0) {

    paginationHtml += '<nav aria-label="Page navigation" style="text-align: center">\
                                  <ul class="pagination">\
                                      <li aria-label="Previous" onclick="'+ fnChangePage + '(' + (currentPage - 1) + ')">\
                                          <span aria-hidden="true" class="material-icons '+ (currentPage == 1 ? 'invisible' : '') + '">west</span>\
                                      </li>';

    if (initialTab > 1)
      paginationHtml += '<li onclick="' + fnChangePage + '(1)" ><span class="sin-borde bold">1</span></li><li><span class="sin-borde bold" style="pointer-events: none;">...</span></li>';


    for (var i = initialTab; i <= (initialTab + initialCantTabs - 1); i++) {
        if (i <= totalPages )
          paginationHtml += '<li ' + (currentPage != i ? 'onclick="' + fnChangePage + '(' + i + ')"' : '') + ' ' + (currentPage == i ? 'class="active"' : '') + '  ><span class="sin-borde bold">' + i + '</span></li>';

    }

    if (currentPage + 2 < totalPages)
      paginationHtml += '<li><span class="sin-borde bold" style="pointer-events: none;">...</span></li><li onclick="' + fnChangePage + '(' + totalPages + ')" ><span class="sin-borde bold">' + totalPages +'</span></li>';


    paginationHtml += '<li aria-label="Next" onclick="' + fnChangePage + '(' + (currentPage + 1) + ')">\
                              <span aria-hidden="true" class="material-icons '+ (currentPage == totalPages ? 'invisible' : '') + '">east</span>\
                          </li></ul></nav>';

  }

  if ($("#" + pnlPagination).length)
    $("#" + pnlPagination).html(paginationHtml);

}



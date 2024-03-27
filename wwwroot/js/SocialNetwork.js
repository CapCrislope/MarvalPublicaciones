/******************** SHARE ON SOCIAL NETWORK ***************************/
function sharedOnTwitter(UrlBase, title, route) {
    var url = 'https://twitter.com/intent/tweet?text=' + title + '&url=' + UrlBase + route + '&via=marvalofarrell';

    url += '&lang=' + $(".active-lang").attr("lang");

    window.open(url, '', 'toolbar=0, status=0, width=650, height=480');
}

function sharedOnGoogle(UrlBase, route) {

    var url = 'https://plus.google.com/share?';

    url += 'hl=' + $(".active-lang").attr("lang");
    url += '&url=' + UrlBase + route;

    window.open(url, '', 'toolbar=0, status=0, width=650, height=480');
}

function shareOnLinkedin(UrlBase, title, route) {
    var texto = $('.item-detail').text();
    var copete = texto;
    var link = 'https://www.linkedin.com/shareArticle?mini=true';

    link += '&url=' + UrlBase + route + '&title=' + title + '&summary=' + copete + '&source=' + UrlBase + route;
    window.open(link, '', 'toolbar=0, status=0, width=650, height=480');
}

function sharedOnFacebook(UrlBase, UrlDetalle, Titulo, Copete) {

  var url = 'https://www.facebook.com/dialog/feed?app_id=174236369612240&link=';

  url += UrlBase + UrlDetalle + '&name=' + Titulo + '&description='+ Copete +'&redirect_uri='+ UrlBase;

  window.open(url, '', 'toolbar=0, status=0, width=650, height=480');
}

function shareOnWhatsApp(UrlBase, title, route) {
    
    var link = 'https://api.whatsapp.com/send?text=';

    var idioma = '';

    var value = "; " + document.cookie;
    var parts = value.split("; " + "LangForMarval" + "=");
    if (parts.length == 2) idioma = parts.pop().split(";").shift();

    var mensaje = ''

    switch (idioma) {
        case 'es':
            mensaje = "Mira este contenido de marval.com"
            break;

        case 'en':
            mensaje = "Check out this content from marval.com"
            break;

        default:
            break;
    }
        

    var fullMessage = mensaje + '\n' + UrlBase + route;
    link += encodeURIComponent(fullMessage);

    window.open(link, '', 'toolbar=0, status=0, width=650, height=480');
}



function openModalShareWithEmail(title, route, itemId, tipo) {

    $("#dialog-personalizado").load("/Home/ModalCompartirPorEmail", function (data, status) {
        if (status == "success") {
            $("#title-item-share").html(title);

            var header = $(".contenido-copete").html();

            $("#body-item-share").html(header);

            var link = $("#link-item-share");

            link.html(base_url_path + route);
            link.attr("href", route);
            
            //recupero el Id del Item
            $("#IdItem").val(itemId);

            //seteo tipo de item a compartir
            $("#Tipo").val(tipo);

            AbrirModalPersonalizado();
            
        }
    })
}

function CompartirPorEmail() {
    if (!$("#modalEmail").valid()) {
        return;
    }

    $("#Subject").val($("#title-item-share").html());

    $("#Contenido").val($("#body-item-share").html() + ('\n\t\n\t\n\t' + $("#link-item-share").html()));

    let captchaResponse = grecaptcha.getResponse();

    let boton = $(".boton-enviar");

    boton.addClass("desactivado")

    $.ajax({
        type: 'POST',
        url: '/Home/CompartirPorEmail',
        data: {
            Destinatarios: $("#Destinatarios").val(),
            Nombre: $("#Nombre").val(),
            Remitente: $("#Remitente").val(),
            Comentario: $("#Comentario").val(),
            IdItem: $("#IdItem").val(),
            Tipo: $("#Tipo").val(),
            Subject: $("#Subject").val(),
            Contenido: $("#Contenido").val(),
            captcha: captchaResponse
        },
        success: function (data) {
            boton.removeClass("desactivado")
            
            if (!data.success) {
                grecaptcha.reset();
                let text = $("#texto-error");
                text.html(data.msj)
                text.removeClass("d-none");
                return;
            }
            AbrirModalEmailEnviado();
            //AbrirModalPersonalizado();
        }
    })

}


function AbrirModalEmailEnviado() {
    let modal = $(".email-enviado");

    if (!modal.hasClass("email-enviado-abierto")) {

        $(".modal-personalizado").addClass("modal-personalizado-cerrado");
        setTimeout(function () {
            $(".modal-personalizado").addClass("d-none");
        }, 500)

        modal.removeClass("d-none").promise().then(a => {
          modal.addClass("email-enviado-abierto");
          UpTo('#viewport');
        })

        return;
    }

    modal.removeClass("email-enviado-abierto")

    let dialog = $("#dialog-personalizado");
    dialog.removeClass("dialog-personalizado-abierto");
    setTimeout(function () {
        dialog.addClass("d-none");
        dialog.html('');
    }, 500);


}
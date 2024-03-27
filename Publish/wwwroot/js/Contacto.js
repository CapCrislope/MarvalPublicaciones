function IniciarGoogleMapsAPI() {
    var srcAttr = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB5o7oRCosIzS4vI0KR26UWzxl__SoASRU&callback=CargarBSMapa&language=es';

    var srcElement = document.createElement('script')

    srcElement.src = srcAttr;

    document.getElementsByTagName('head')[0].appendChild(srcElement);
}

function CargarBSMapa() {
    var uluru = { lat: -34.5974749, lng: -58.3720103 };
    var map = new google.maps.Map(document.getElementById('bs-mapa'), {
        zoom: 15,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}
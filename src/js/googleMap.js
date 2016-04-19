/**
 * Добавить в HTML нижеследующую строку непесредственно перед закрывающим тегом </body>
 *    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&amp;language=en"></script>
 *
 * Следующей строкой в HTML вызвать этот скрипт. Например:
 *    <script src="js/googleMap.js"></script>
 */

(function () {
  var mapHtmlElement = document.getElementById("map");

  function initialize() {
    var myLatLng = new google.maps.LatLng(59.9335688,30.330815); //St.Petersburg

    var map = new google.maps.Map(mapHtmlElement, {
      center: myLatLng,
      scrollwheel: false,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      //disableDefaultUI: true
    });

    /*var iconMarker = "img/map-marker.svg";

    var marker = new google.maps.Marker({
      position: myLatLng,
      title: "Sedona",
      icon: iconMarker
    });

    marker.setMap(map);*/
  }

  if (mapHtmlElement) {
    google.maps.event.addDomListener(window, 'load', initialize);
  }
}());


function mainLoop(first)
{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            if (first === 1) {
                map.setView([position.coords.latitude, position.coords.longitude]);
            }
            document.getElementById("position").innerHTML = position.coords.latitude + " " + position.coords.longitude + " (accuracy " + position.coords.accuracy + ")";
            var ajax = new XMLHttpRequest();
            ajax.onreadystatechange = function() {
                if (ajax.readyState == 4 && ajax.status == 200) {
                    response=JSON.parse(ajax.responseText);
                    document.getElementById("distance").innerHTML=response.distance;
                    document.getElementById("bearing").innerHTML=response.bearing;
                    document.getElementById("hint").innerHTML=response.hint;
                    redraw_map(response.points);
                    make_sound(response.distance);
                }
            }
            ajax.open("POST", "/?route=position", true);
            ajax.send(JSON.stringify( {longitude: position.coords.longitude, latitude: position.coords.latitude, accuracy: position.coords.accuracy} ));
            setTimeout('mainLoop(0)', 5000);
        }, function (error) { alert ('Fucking whoops, refresh and pray it doesnt happen again');}, {enableHighAccuracy:true, maximumAge: 5000});
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function redraw_map(point_array) {
    markers.clearLayers();
    for(i=0;i<point_array.length;i++){
        var LamMarker = new L.marker([point_array[i].latitude, point_array[i].longitude]).bindPopup("id:"+point_array[i].id+"<br>"+point_array[i].name+"<br> acc:"+point_array[i].accuracy).openPopup();
        markers.addLayer(LamMarker);
    }


}

function make_sound(distance) {
    var context = new (window.AudioContext || window.webkitAudioContext)();
    var osc = context.createOscillator(); // instantiate an oscillator
    osc.type = 'sine'; // this is the default - also square, sawtooth, triangle
    osc.frequency.value = 4000 - distance; // Hz
    osc.connect(context.destination); // connect it to the destination
    osc.start(); // start the oscillator
    osc.stop(context.currentTime + 1); // stop 2 seconds after the current time
}

var map = L.map('map');
var markers = L.layerGroup();
map.addLayer(markers);
map.setView([0,0], 15);
L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(map);


mainLoop(1);
let place = JSON.parse(localStorage.getItem("place"))

let placeName = ''
let report = ''
// const lat = 32.0750224
// const lng = 34.7749395 
let lat = ''
let lng = ''

const setLastPlace = (place) => {
    placeName = place['google_name']
    report = place['live_population']['live_report']
    lat = place['location']['lat']
    lng = place['location']['lng']
}

setLastPlace(place)

var manIcon = L.icon({
    iconUrl: '/static/img/placeholder.png',
    // shadowUrl: 'leaf-shadow.png',

    iconSize:     [50, 50], // size of the icon
    // shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 55], // point of the icon which will correspond to marker's location
    // shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [4, -49] // point from which the popup should open relative to the iconAnchor
});


var mymap = L.map('mapid');
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 30,
    id: 'mapbox/streets-v11',
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

const addMarker = () => {
    mymap.setView([lat, lng], 16)
    var marker = L.marker([lat, lng], {icon: manIcon}).addTo(mymap);
    marker.bindPopup(`<b>${placeName}</b><br><i class="fas fa-users" style="padding: 6px; padding-right:0;"></i>${report}`).openPopup(); 
}

addMarker()




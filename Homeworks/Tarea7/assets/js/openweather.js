let lat, lon;
const apiKey = "15b824eb183f26622400a5b8b84dbebc"; // Reemplaza con tu API key personal

function cargarClima() {
    if (!lat || !lon) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`;

    $.getJSON(url, function (data) {
        $("#lug").text(data.name);
        $("#tem").text(data.main.temp);
        $("#hum").text(data.main.humidity);
        $("#vie").text(data.wind.speed);
        $('img#tiempoIcon').attr('src', `https://openweathermap.org/img/w/${data.weather[0].icon}.png`);
        $('img#tiempoIcon').attr('alt', data.weather[0].description);
    });
}

$(document).ready(function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            cargarClima();
        }, function (error) {
            console.error('Error fetching data:', error);
            alert("No se pudo obtener la ubicación.");
        });
    } else {
        alert("Geolocalización no soportada por este navegador.");
    }

    $("#tblw").click(function () {
        cargarClima();
    });
});
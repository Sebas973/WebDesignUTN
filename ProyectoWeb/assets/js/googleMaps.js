
let map;

// Coordenadas del destino (ejemplo: Parroquia de San Isidro)
const destino = { lat: 10.080037, lng: -84.192374 };

async function initMap() {
    // Intentar obtener la ubicación del usuario
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const origen = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            map = new google.maps.Map(document.getElementById("map"), {
                zoom: 14,
                center: origen,
                mapId: "226b17618f1322597574c765"
            });

            // Marcadores
            new google.maps.marker.AdvancedMarkerElement({
                position: origen,
                map: map,
                title: "Tú"
            });

            new google.maps.marker.AdvancedMarkerElement({
                position: destino,
                map: map,
                title: "Empresa"
            });

            // Direcciones
            const directionsService = new google.maps.DirectionsService();
            const directionsRenderer = new google.maps.DirectionsRenderer();
            directionsRenderer.setMap(map);

            const request = {
                origin: origen,
                destination: destino,
                travelMode: google.maps.TravelMode.DRIVING
            };

            directionsService.route(request, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsRenderer.setDirections(result);
                } else {
                    alert("No se pudo trazar la ruta: " + status);
                }
            });

        }, () => {
            alert("No se pudo obtener tu ubicación.");
        });
    } else {
        alert("Tu navegador no soporta geolocalización.");
    }
}

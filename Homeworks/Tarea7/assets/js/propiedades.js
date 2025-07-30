async function cargarPropiedades() {
    try {
        let datosPropiedades = document.getElementById("datosPropiedades");

        const listaPropiedades = await getJsonApi("https://si0sgs.github.io/EstateAgency/datos/propiedades.json");

        listaPropiedades.propiedades.forEach(function (propiedad) {
            let propiedadCard = `
        <div class="col-md-4">
          <div class="card-box-a card-shadow">
            <div class="img-box-a">
              <img src="${propiedad.imagen}" alt="" class="img-a img-fluid">
            </div>
            <div class="card-overlay">
              <div class="card-overlay-a-content">
                <div class="card-header-a">
                  <h2 class="card-title-a">
                    <a href="#">${propiedad.clasificacion}</a>
                  </h2>
                  <p class="link-a">${propiedad.descripcion}</p>
                </div>
                <div class="card-body-a">
                  <div class="price-box d-flex">
                    <span class="price-a">${propiedad.tipo} | $ ${propiedad.precio}</span>
                  </div>
                </div>
                <div class="card-footer-a">
                  <ul class="card-info d-flex justify-content-around">
                    <li>
                      <h4 class="card-info-title">Area</h4>
                      <span>${propiedad.detalle.area}m<sup>2</sup></span>
                    </li>
                    <li>
                      <h4 class="card-info-title">Rooms</h4>
                      <span>${propiedad.detalle.rooms}</span>
                    </li>
                    <li>
                      <h4 class="card-info-title">Floors</h4>
                      <span>${propiedad.detalle.floors}</span>
                    </li>
                    <li>
                      <h4 class="card-info-title">Garages</h4>
                      <span>${propiedad.detalle.garages}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>`;

            let div = document.createElement("div");
            div.innerHTML = propiedadCard;
            datosPropiedades.appendChild(div.firstElementChild);
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function getJsonApi(url) {

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const arrayJson = await response.json();

        return arrayJson;

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

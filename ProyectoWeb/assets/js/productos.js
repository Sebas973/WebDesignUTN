function cargarProductos() {
    const url = `https://restcountries.com/v3.1/all?fields=name,cca3`;

    $.getJSON(url, function (data) {
        $.each(data, function (index, producto) {
            const cardHTML = `
            <div class="col">
                <div class="card h-100 shadow-sm">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.titulo}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                    </div>
                </div>
            </div>
            `;
            $('#productContainer').append(cardHTML);
        })
    });

}
function cargarProductos() {
    const url = `https://sebas973.github.io/WebDesignUTN/ProyectoWeb/assets/json/Productos.json`;

    $.getJSON(url, function (data) {
        $.each(data, function (index, producto) {
            const cardHTML = `
            <div class="col">
                <div class="card h-100 shadow-sm">
                    <img src="${producto.imagen}" class="card-img-top img-fluid" style="height:200px; object-fit:cover;" alt="${producto.titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.titulo}</h5>
                        <p class="card-text">${producto.texto}</p>
                    </div>
                </div>
            </div>
            `;
            $('#productContainer').append(cardHTML);
        })
    });
}
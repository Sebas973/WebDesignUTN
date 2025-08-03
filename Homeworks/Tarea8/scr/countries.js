function cargarCountries() {
    const url = `https://restcountries.com/v3.1/all?fields=name,cca3`;

    const nacionalidadGuardada = localStorage.getItem('nacionalidad') || 'CRI';

    $.getJSON(url, function (data) {
        $.each(data, function (index, country) {
            $('#nacionalidad').append(
                $('<option>', {
                    text: country.name.common,
                    value: country.cca3,
                    selected: country.cca3 === nacionalidadGuardada
                })
            );
        })
    });

}

async function getDescuentoRegion(cca3) {

    const url = `https://restcountries.com/v3.1/alpha?codes=${cca3}`;
    let descuento = 0;
    let region = "";

    try {

        await $.getJSON(url).done(function (data) {
            region = data[0]?.region;

            if (region === 'Americas' || region === 'Europe') descuento = 0.10;
            else if (region === 'Africa') descuento = 0.05;
        });

        return {region, descuento}

    } catch (error) {
        console.error("Error obteniendo región del país", error);
        alert("No se pudo obtener información de la región.");
    }
}
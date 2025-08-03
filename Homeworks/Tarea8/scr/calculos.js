var guardado = false;
var fechasValidas = false;

function MensajeTipoSeguro() {
    const select = document.getElementById("seguro");
    const selectedOption = select.options[select.selectedIndex].id;

    let mensaje = "";

    switch (selectedOption) {
        case "PBO":
            mensaje = `Protección Básica Obligatoria (PBO)\n` +
                `Cubre daños al vehículo rentado y daños a vehículos terceros involucrados en un accidente de tránsito.\n` +
                `Costo de alquiler diario: $5.45 por día.`;

            break;
        case "PED":
            mensaje = `Protección Extendida de Daños (PED)\n` +
                `Cubre la Protección Básica Obligatoria (PBO) más daños a propiedades de terceros, incendio e inundaciones.\n` +
                `Costo de alquiler diario: $9.50 por día.`;
            break;
        case "PGM":
            mensaje = `Protección Gasto Médicos (PGM)\n` +
                `Cubre la Protección Extendida de Daños (PED) más gastos médicos para los ocupantes del vehículo.\n` +
                `Costo de alquiler diario: $11.25 por día.`;
            break;
    }

    alert(mensaje);
}

function llenarDias() {
    const fechaInicio = new Date($('#fechaRetiro').val());
    const fechaFin = new Date($('#fechadevolucion').val());

    const diferenciaMs = fechaFin - fechaInicio;
    const dias = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));

    if (fechaInicio > fechaFin) {
        $('input[name="fechadevolucion"]').val('');
        $('input[name="dias"]').val(0);
        alert("La fecha final debe ser mayor a la fecha de inicio.");
        return;
    }

    if (isNaN(dias) || dias < 3 || dias > 365) {
        $('input[name="fechadevolucion"]').val('');
        $('input[name="dias"]').val(0);
        alert("La cantidad de días debe estar entre 3 y 365.");
        return;
    }

    $('input[name="dias"]').val(dias);
    fechasValidas = true;

}

async function calcularCotizacion() {
    if (!guardado) {
        alert('Por favor guarde antes de calcular la cotizacion');
        return;
    }

    const vehiculo = parseFloat($('#tipoVehiculo').val());
    const seguro = parseFloat($('#seguro').val());
    const cca3 = $('#nacionalidad').val();
    const dias = parseInt($('input[name="dias"]').val());

    let tarifaDiaria = vehiculo + seguro;
    let descuentoDuracion = 0;


    if (dias > 30 && dias < 120) descuentoDuracion = 0.15;
    else if (dias >= 120) descuentoDuracion = 0.25;

    const tarifaConDuracion = tarifaDiaria * (1 - descuentoDuracion);
    $('#td').val('$' + tarifaConDuracion.toFixed(2));

    const descuentoRegion = await getDescuentoRegion(cca3);

    const region = descuentoRegion.region;

    const totalBruto = tarifaConDuracion * dias;
    const totalFinal = totalBruto * (1 - descuentoRegion.descuento);
    $('input[name="totalPagar"]').val('$' + totalFinal.toFixed(2));

    const cotizacionGuardada = JSON.parse(localStorage.getItem('cotizacion'));

    cotizacionGuardada.tarifaDiaria = tarifaConDuracion.toFixed(2);
    cotizacionGuardada.region = region;
    cotizacionGuardada.descuentoDuracion = descuentoDuracion;
    cotizacionGuardada.descuentoRegion = descuentoRegion.descuento;
    cotizacionGuardada.totalPagar = totalFinal.toFixed(2);

    localStorage.setItem('cotizacion', JSON.stringify(cotizacionGuardada));

    guardado = false;

    mostrarResumen(cotizacionGuardada);
}

function mostrarResumen(data) {
    $('#resumenCotizacion').html(`
    <h4>Resumen de Cotización</h4>
    <p><strong>Fecha Retiro:</strong> ${data.fechaInicio}</p>
    <p><strong>Fecha Devolución:</strong> ${data.fechaFin}</p>
    <p><strong>Días de Alquiler:</strong> ${data.dias}</p>
    <p><strong>Tarifa Diaria (con descuento duración):</strong> $${data.tarifaDiaria}</p>
    <p><strong>Descuento por Duración:</strong> ${data.descuentoDuracion}%</p>
    <p><strong>Región:</strong> ${data.region}</p>
    <p><strong>Descuento por Región:</strong> ${data.descuentoRegion}%</p>
    <p><strong>Total a Pagar:</strong> $${data.totalPagar}</p>
  `);
}

function mostrarUltimaCotizacion() {
    const cotizacionGuardada = JSON.parse(localStorage.getItem('cotizacion') || '');

    if (cotizacionGuardada) {
        $('#fechaRetiro').val(cotizacionGuardada.fechaInicio);
        $('#fechadevolucion').val(cotizacionGuardada.fechaFin);
        $('#tipoVehiculo').val(cotizacionGuardada.vehiculo);
        $('#seguro').val(cotizacionGuardada.seguro);
        $('input[name="dias"]').val(cotizacionGuardada.dias);
        $('#td').val('$' + cotizacionGuardada.tarifaDiaria);
        $('input[name="totalPagar"]').val('$' + cotizacionGuardada.totalPagar);
        fechasValidas = true;
        mostrarResumen(cotizacionGuardada);
    }
}

function guardarCotizacion() {
    if (!fechasValidas) {
        alert('Por favor seleccione fechas validas');
        return;
    }

    const cotizacion = {
        fechaInicio: $('#fechaRetiro').val(),
        fechaFin: $('#fechadevolucion').val(),
        vehiculo: $('#tipoVehiculo').val(),
        seguro: $('#seguro').val(),
        nacionalidad: $('#nacionalidad').val(),
        dias: $('input[name="dias"]').val(),
        tarifaDiaria: 0,
        region: 0,
        descuentoDuracion: 0,
        descuentoRegion: 0,
        totalPagar: 0
    };

    localStorage.setItem('cotizacion', JSON.stringify(cotizacion));
    localStorage.setItem('nacionalidad', cotizacion.nacionalidad);

    $('#td').val('$' + 0);
    $('input[name="totalPagar"]').val('$' + 0);

    guardado = true;

    alert("Cotización guardada correctamente.");
}
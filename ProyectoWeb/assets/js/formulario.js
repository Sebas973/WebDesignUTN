function guardarFormulario() {

    const formulario = {
        nombre: $('input[name="nombreCompleto"]').val(),
        email: $('input[name="email"]').val(),
        fechaNacimiento: new Date($('input[name="fechaNacimiento"]').val()),
        rangoIngreso: $('input[name="rangoIngreso"]').val(),
        genero: $('input[name="inlineRadioOptions"]').val(),
        edad: $('#edad').val(),
        gradoAcademico: $('input[name="inlineRadioOptions"]').val()
    };

    localStorage.setItem('formulario', JSON.stringify(formulario));

    alert("formulario guardado correctamente.");
}

function mostrarUltimoFormulario() {
    const formularioGuardado = JSON.parse(localStorage.getItem('formulario') || '');

    if (formularioGuardado) {
        $('input[name="nombreCompleto"]').val(formularioGuardado.nombre);
        $('input[name="email"]').val(formularioGuardado.email);
        $('input[name="fechaNacimiento"]').val(formularioGuardado.fechaNacimiento);
        $('input[name="rangoIngreso"]').val(formularioGuardado.rangoIngreso);
        $('input[name="inlineRadioOptions"]').val(formularioGuardado.genero);
        $('#edad').val(formularioGuardado.edad);
        $('input[name="totalPagar"]').val('$' + cotizacionGuardada.totalPagar);
    }
}
    
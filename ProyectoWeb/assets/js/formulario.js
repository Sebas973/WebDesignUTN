function guardarFormulario() {

    const gradoAcademicoSeleccionado = [];
    $('input[name="gradoAcademico"]:checked').each(function () {
        gradoAcademicoSeleccionado.push($(this).val());
    });

    const formulario = {
        nombre: $('input[name="nombreCompleto"]').val(),
        email: $('input[name="email"]').val(),
        fechaNacimiento: $('input[name="fechaNacimiento"]').val(),
        rangoIngreso: $('input[name="rangoIngreso"]').val(),
        genero: $('input[name="inlineRadioOptions"]:checked').val(),
        edad: $('#edad').text(),
        gradoAcademico: gradoAcademicoSeleccionado
    };

    localStorage.setItem('formulario', JSON.stringify(formulario));
    alert("Formulario guardado correctamente.");
}

function mostrarUltimoFormulario() {
    const datos = localStorage.getItem('formulario');
    if (!datos) return;

    const formulario = JSON.parse(datos);

    $('input[name="nombreCompleto"]').val(formulario.nombre);
    $('input[name="email"]').val(formulario.email);
    $('input[name="fechaNacimiento"]').val(formulario.fechaNacimiento);
    $('input[name="rangoIngreso"]').val(formulario.rangoIngreso);
    $('input[name="inlineRadioOptions"][value="' + formulario.genero + '"]').prop('checked', true);
    $('#edad').text(formulario.edad);

    // Cargar los checkboxes seleccionados
    if (formulario.gradoAcademico && formulario.gradoAcademico.length > 0) {
        formulario.gradoAcademico.forEach(function (valor) {
            $('input[name="gradoAcademico"][value="' + valor + '"]').prop('checked', true);
        });
    }
}

function calcularEdad(){
    const fecha = new Date($(this).val());
    const hoy = new Date();
    let edad = hoy.getFullYear() - fecha.getFullYear();
    const mes = hoy.getMonth() - fecha.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
        edad--;
    }
    $('#edad').val(edad);
}

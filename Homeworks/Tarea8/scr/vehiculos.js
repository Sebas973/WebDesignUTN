function mostrarTodo() {
    const select = document.getElementById("tipoVehiculo");
    const selectedOption = select.options[select.selectedIndex].id;

    switch (selectedOption) {
        case "COM":
            $('img#imgVista').attr('src', `images/Compacto1.png`);
            $("#infTCar").text("KIA PICANTO, Año 2016");
            $('img#img1').attr('src', `images/Compacto1.png`);
            $('img#img2').attr('src', `images/Compacto2.png`);
            $('img#img3').attr('src', `images/Compacto3.png`);
            break;
        case "MED":
            $('img#imgVista').attr('src', `images/Mediano1.png`);
            $("#infTCar").text("HONDA CITY CAR, Año 2017");
            $('img#img1').attr('src', `images/Mediano1.png`);
            $('img#img2').attr('src', `images/Mediano2.png`);
            $('img#img3').attr('src', `images/Mediano3.png`);
            break;
        case "4WD":
            $('img#imgVista').attr('src', `images/TodoTerreno1.png`);
            $("#infTCar").text("TOYOTA FJ CRUISER, Año 2016 ");
            $('img#img1').attr('src', `images/TodoTerreno1.png`);
            $('img#img2').attr('src', `images/TodoTerreno2.png`);
            $('img#img3').attr('src', `images/TodoTerreno3.png`);
            break;
        case "FAM":
            $('img#imgVista').attr('src', `images/Familiar1.png`);
            $("#infTCar").text("TOYOTA SIENNA, Año 2018");
            $('img#img1').attr('src', `images/Familiar1.png`);
            $('img#img2').attr('src', `images/Familiar2.png`);
            $('img#img3').attr('src', `images/Familiar3.png`);
            break;
    }
}

function mostrarImagen(imageNumber) {
    const select = document.getElementById("tipoVehiculo");
    const selectedOption = select.options[select.selectedIndex].id;

    switch (selectedOption) {
        case "COM":
            $('img#imgVista').attr('src', `images/Compacto${imageNumber}.png`);
            switch (imageNumber) {
                case 1:
                    $("#infTCar").text("KIA PICANTO, Año 2016");
                    break;
                case 2:
                    $("#infTCar").text("FORD FIESTA ST, Año 2015");
                    break;
                case 3:
                    $("#infTCar").text("PEUGEOT 308, Año 2018");
                    break;
            }
            break;
        case "MED":
            $('img#imgVista').attr('src', `images/Mediano${imageNumber}.png`);
            switch (imageNumber) {
                case 1:
                    $("#infTCar").text("HONDA CITY CAR, Año 2017");
                    break;
                case 2:
                    $("#infTCar").text("MERCEDES SLS, Año 2015");
                    break;
                case 3:
                    $("#infTCar").text("FORD FIESTA ST, Año 2016");
                    break;
            }
            break;
        case "4WD":
            $('img#imgVista').attr('src', `images/TodoTerreno${imageNumber}.png`);
            switch (imageNumber) {
                case 1:
                    $("#infTCar").text("TOYOTA FJ CRUISER, Año 2016 ");
                    break;
                case 2:
                    $("#infTCar").text("TOYOTA Prado, Año 2018");
                    break;
                case 3:
                    $("#infTCar").text("NISSAN JUKE, Año 2017");
                    break;
            }
            break;
        case "FAM":
            $('img#imgVista').attr('src', `images/Familiar${imageNumber}.png`);
            switch (imageNumber) {
                case 1:
                    $("#infTCar").text("TOYOTA SIENNA, Año 2018");
                    break;
                case 2:
                    $("#infTCar").text("DODGE GRAND CARAVANE, Año 2015");
                    break;
                case 3:
                    $("#infTCar").text("HYUNDAI ELANTRA, Año 2016");
                    break;
            }
            break;
    }
}
// Variable global
var zona="";

/**
 * Cuando inicia la pagina
 */
$(document).ready(function () {
    var datos = JSON.parse(localStorage.getItem('datos'));
    if (datos.name != null) {
        $("#name").addClass("border border-info rounded-3 text-white p-2");
        $("#name").text(datos.name);
    }
    zona = datos.zone;
    console.log(datos.zone);
    getPerfil(datos.id);
    getOrdenes(datos.zone);
});

/**
 * cerrar sesion
 */
$("#close").click(function () {
    localStorage.clear();
    localStorage.removeItem('datos');
    window.location.href = "../index.html";
});


/**
 * consultar perfil del coordinador
 * @param {*} idUser 
 */
function getPerfil(idUser) {
    $.ajax({
        url: 'http://localhost:8080/api/user/' + idUser,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (user) {
            let row = $("<tr>");
            row.append($("<td>").text(user.identification));
            row.append($("<td>").text(user.name));
            row.append($("<td>").text(user.email));
            if (user.type == "COORD" || user.type == "coordinador") {
                row.append($("<td>").text("Coordinador de Zona"));
            }
            row.append($("<td>").text(user.zone));
            $("#infoPerfil").append(row);
        },
        error: function (result) {
            var row = $("<tr>");
            row.append($("<td colspan='5' class='fw-bolder text-uppercase'>").text("no se encontro el perfil"));
            $("#infoPerfil").append(row);
        }
    }).fail( function() {
        alert("Hubo un error en la aplicación, intentelo más tarde.");
    });
}

/**
 * Obtener las ordenes por zona
 * @param {*} zona 
 */
function getOrdenes(zona) {
    $.ajax({
        url: 'http://localhost:8080/api/order/zona/' + zona,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (order) {
            console.log(order.length)
            $("#infoOrdenes").empty();
            if (order.length == 0) {
                let row = $("<tr>");
                row.append($("<td colspan='7' class='fw-bolder text-uppercase'>").text("no hay ordenes"));
                $("#infoOrdenes").append(row);
            } else {
                order.forEach(element => {
                    console.log(element.salesMan.email);
                    let row = $("<tr>");
                    row.append($("<td>").text(element.salesMan.identification));
                    row.append($("<td>").text(element.salesMan.name));
                    row.append($("<td>").text(element.salesMan.email));
                    row.append($("<td>").text(element.registerDay.split("T")[0]));
                    row.append($("<td>").text(element.id));
                    row.append($("<td>").text(element.status));
                    row.append($("<td class='px-0'><i class='bi bi-pen' title='Editar Orden' onclick='editarOrden("+element.id+")' style='color: #17D7A0; font-size: 22px;;'></i>"
                                    +"<button class='btn btn-primary py-1 px-4 ms-2' onclick='verDetalle(" + element.id + ")'>Ver Detalle</button>"));
                    $("#infoOrdenes").append(row);
                });
            }
        },
        error: function (result) {
            var row = $("<tr>");
            row.append($("<td colspan='7' class='fw-bolder text-uppercase'>").text("no se pudo consultar las ordenes"));
            $("#infoOrdenes").append(row);
        }
    }).fail( function() {
        alert("Hubo un error en la aplicación, intentelo más tarde.");
    });
}

/**
 * Editar orden 
 * @param {*} idOrder 
 */
function editarOrden(idOrder){
    $.ajax({
        url: 'http://localhost:8080/api/order/' + idOrder,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (order) {
            $("#infoEditar").empty();
            let row = $("<tr>");
            row.append($("<td>").text(order.registerDay.split("T")[0]));
            row.append($("<td>").text(order.id));
            row.append($("<td>").text(order.status));
            row.append($("<td><select id='statusO' class='form-select text-dark border border-primary' style='background-color: #ccc;'>"
                                +"<option value='Aprobada'>Aprobada</option>"
                                +"<option value='Rechazada'>Rechazada</option>"
                                +"</select>"));
            row.append($("<td><button class='btn btn-primary px-5' onclick='updateEstado("+idOrder+")'>Guardar</button>"));                 
            $("#infoEditar").append(row);
        },
        error: function (result) {
            var row = $("<tr>");
            row.append($("<td colspan='5' class='fw-bolder text-uppercase'>").text("no se pudo editar la orden"));
            $("#infoEditar").append(row);
        }
    }).fail( function() {
        alert("Hubo un error en la aplicación, intentelo más tarde.");
    });
    $("#editarOrdenM").modal("show");
}

/**
 * Actualizar estado de la orden
 * @param {*} idOrder 
 */
function updateEstado(idOrder){
    $.ajax({
        url: 'http://localhost:8080/api/order/update',
        data: JSON.stringify({
            "id": idOrder,
            "status": $("#statusO").val()
        }),
        type: 'PUT',
        contentType: 'application/json',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            alert("SU ORDEN CAMBIO A ESTADO "+respuesta.status);
            $("#editarOrdenM").modal("hide");
            getOrdenes(zona);
        },
        error: function (result){
            alert("ERROR AL CAMBIAR EL ESTADO DE LA ORDEN");
        }
    }).fail( function() {
        alert("Hubo un error en la aplicación, intentelo más tarde.");
    });
}

/**
 * Ver detalle de la orden
 * @param {*} idOrder 
 */
function verDetalle(idOrder) {
    $.ajax({
        url: 'http://localhost:8080/api/order/' + idOrder,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (order) {
            $("#listaProductos").empty();           
            let p = order.products;
            let q = order.quantities;         
            for(const [key, value] of Object.entries(p)){
                let row = $("<tr>");
                row.append($("<td>").text(p[key].id));
                row.append($("<td>").text(p[key].brand));
                row.append($("<td>").text(p[key].procesor));
                row.append($("<td>").text(p[key].os));
                row.append($("<td>").text(p[key].description));
                row.append($("<td>").text(p[key].price));
                row.append($("<td>").text(q[key]));
                row.append($("<td>").text(p[key].quantity));
                row.append($("<td>").append("<img src='" + p[key].photography + "' alt='pc' width='100%' height='50px'>"));
                $("#listaProductos").append(row);
            }
        },
        error: function (result) {
            var row = $("<tr>");
            row.append($("<td colspan='9' class='fw-bolder text-uppercase'>").text("no se encontro la orden"));
            $("#listaProductos").append(row);
        }
    }).fail( function() {
        alert("Hubo un error en la aplicación, intentelo más tarde.");
    });
    $("#registrarOrden").modal("show");
}

// 28/12/21 10:00 FERNANDA GAITAN 

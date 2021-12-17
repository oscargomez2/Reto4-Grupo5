/**
 * funcion para borrar un producto
 * @param {*} id 
 */
function borrarProducto(id) {
    $.ajax({
        url: 'http://localhost:8080/api/clone/' + id,
        type: 'DELETE',
        contentType: 'application/json',
        dataType: 'json',
        success: function (clone) {
            //console.log(respuesta);
            alert("Producto borrado correctamente");
        },
        /*error: function (result) {
            alert('Error: Ver log para detalles.');
            console.log(result);
        },*/

    });
}
/************************************************************************************************************/

/**
 * funcion para consultar los productos
 */
function consultarProductos() {
    $.ajax({
        url: 'http://localhost:8080/api/clone/all',
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (clone) {
            //console.log(respuesta);
            $("#infoProductos").empty();
            if(user.length==0){
                var row = $("<tr>");
                row.append($("<td colspan='10' class='fw-bolder text-uppercase'>").text("NO hay registros en la base de datos"));
                $("#infoProductos").append(row);
            }else{
                for (i = 0; i < clone.length; i++) {
                    var row = $("<tr>");
                    row.append($("<td>").text(clone[i].brand));
                    row.append($("<td>").text(clone[i].processor));
                    row.append($("<td>").text(clone[i].os));
                    row.append($("<td>").text(clone[i].description));
                    row.append($("<td>").text(clone[i].memory));
                    row.append($("<td>").text(clone[i].hardDrive));
                    if (clone[i].availability == "true") {
                        row.append($("<td>").text("Si"));
                    } else {
                        row.append($("<td>").text("No"));
                    }
                    row.append($("<td>").text(clone[i].price));
                    row.append($("<td>").text(clone[i].quantity));
                    row.append($("<td class='px-0 py-2'> <button class='btn btn-danger mx-2' onclick='borrarProducto(" + user[i].id + ")'>Borrar</button>"
                        + "<button class='btn btn-warning text-white' onclick='editarProducto(" + user[i].id + ")'>Editar</button>"));
                    $("#infoProductos").append(row);
                }
            }
        },
        /*error: function (result) {
            alert('Error: Ver log para detalles.');
            console.log(result);
        },*/

    });
}
/***************************************************************************************************************************/
/**
 * Cuando inicia la pagina
 */
$(document).ready(function () {

    $('#btnActualizar').attr('style', 'display: none !important');
    $('#btnActualizarClone').attr('style', 'display: none !important');
    //$("#user").empty();
    var datosUser = localStorage.getItem('datos');
    datosUser = JSON.parse(datosUser);
    var idUser = datosUser.id;
    var nombre = datosUser.name;
    console.log(nombre);
    $("#nameUser").text(nombre);
    consultarUsers();
    consultarProductos();
    //$("#name").text(idUser);
    //getPerfil(idUser);
});

/**
 * cerrar sesion
 */
$("#close").click(function () {
    localStorage.removeItem('datos');
    window.location.href = "../index.html";
});

/**
 * funcion cuando el modal de usuarios se cierra
 */
$("#exampleModalToggle2").on('hidden.bs.modal', function () {
    //alert("Esta accion se ejecuta al cerrar el modal");
    $('#btnRegistrar').attr('style', 'display: block !important');
    $('#btnActualizar').attr('style', 'display: none !important');
    $(':input').val('');
    consultarUsers();
});
/****************************************************************************************************************/

/**
 * funcion cuando el modal de productos se cierra
 */
$("#exampleModalToggle3").on('hidden.bs.modal', function () {
    //alert("Esta accion se ejecuta al cerrar el modal");
    $('#btnRegistrarClone').attr('style', 'display: block !important');
    $('#btnActualizarClone').attr('style', 'display: none !important');
    $(':input').val('');
    consultarProductos();
});
/****************************************************************************************************************/

/**
 * Funcion para consultar los usuarios
 */
function consultarUsers() {
    $.ajax({
        url: 'http://localhost:8080/api/user/all',
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (user) {
            //console.log(respuesta);
            $("#infoUsers").empty();
            if (user.length == 0) {
                var row = $("<tr>");
                row.append($("<td colspan='9' class='fw-bolder text-uppercase'>").text("NO hay registros en la base de datos"));
                $("#infoUsers").append(row);
            } else {

                for (i = 0; i < user.length; i++) {

                    var row = $("<tr>");
                    row.append($("<td>").text(user[i].identification));
                    row.append($("<td>").text(user[i].name));
                    row.append($("<td>").text(user[i].address));
                    row.append($("<td>").text(user[i].cellPhone));
                    row.append($("<td>").text(user[i].email));
                    row.append($("<td>").text(user[i].password));
                    row.append($("<td>").text(user[i].zone));
                    if (user[i].type == "COORD" || user[i].type == "coordinador") {
                        row.append($("<td>").text("Coordinador"));
                    } else if (user[i].type == "ASE" || user[i].type == "asesor") {
                        row.append($("<td>").text("Asesor"));
                    } else if (user[i].type == "ADM" || user[i].type == "administrador") {
                        row.append($("<td>").text("Administrador"));
                    }
                    row.append($("<td><button class='btn btn-danger me-2' onclick='borrarUser(" + user[i].id + ")'>Borrar</button>"
                        + "<button class='btn btn-warning text-white' onclick='editarUser(" + user[i].id + ")'>Editar</button>"));
                    $("#infoUsers").append(row);


                }


            }

        },
        /*error: function (result) {
            alert('Error: Ver log para detalles.');
            console.log(result);
        },*/

    }).fail(function () {
        alert("Hubo un error en la aplicación, intentelo más tarde.");
    });
}
/********************************************************************************************************************/

/**
 * funcion para borrar un usuario
 * @param {*} id 
 */
function borrarUser(id) {
    $.ajax({
        url: 'http://localhost:8080/api/user/' + id,
        type: 'DELETE',
        contentType: 'application/json',
        dataType: 'json',
        success: function (clone) {
            //console.log(respuesta);
            alert("Usuario borrado correctamente");
            consultarUsers();

        },
        /*error: function (result) {
            alert('Error: Ver log para detalles.');
            console.log(result);
        },*/

    }).fail(function () {
        alert("Hubo un error en la aplicación, intentelo más tarde.");
    });
}
/*************************************************************************************************************/

/**
 * funcion para consultar un user por id
 * @param {*} id 
 */
function editarUser(id) {
    $.ajax({
        url: 'http://localhost:8080/api/user/' + id,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (user) {
            console.log(user);
            $('#btnRegistrar').attr('style', 'display: none !important');
            $('#btnLogin').attr('style', 'display: none !important');
            $('#btnActualizar').attr('style', 'display: block !important');
            $("#id").val(user.id);
            $("#cedula").val(user.identification);
            $("#nombre").val(user.name);
            $("#cumpleaños").val(user.birthtDay.split('T')[0]);
            $("#mesnacimiento").val(user.monthBirthtDay);
            $("#direccion").val(user.address);
            $("#celular").val(user.cellPhone);
            $("#email").val(user.email);
            $("#contraseña").val(user.password);
            $("#zona").val(user.zone);
            $("#tipo").val(user.type);
            $("#exampleModalToggle2").modal("show");
            //actualizarUser(user);

            //alert("Usuario borrado correctamente");
            //consultarUsers();

        },
        /*error: function (result) {
            alert('Error: Ver log para detalles.');
            console.log(result);
        },*/

    }).fail(function () {
        alert("Hubo un error en la aplicación, intentelo más tarde.");
    });
}
/********************************************************************************************************************/

/**
 * funcion para actualizar un user
 */
function actualizarUser() {
    var Id = $.trim($("#id").val());
    var Identificacion = $.trim($("#cedula").val());
    var Nombre = $.trim($("#nombre").val());
    var Cumpleaños = $.trim($("#cumpleaños").val());
    var MesN = $.trim($("#mesnacimiento").val());
    var Direccion = $.trim($("#direccion").val());
    var Celular = $.trim($("#celular").val());
    var Email = $.trim($("#email").val());
    var Password = $.trim($("#contraseña").val());
    var Zona = $.trim($("#zona").val());
    var Tipo = $.trim($("#tipo").val());
    if (Id == "" || Identificacion == "" || Nombre == "" || Direccion == "" || Celular == "" || Email == "" || Password == "" || Zona == "" || Tipo == "" || Cumpleaños == "" || MesN == "") {
        alert("Todos los campos son obligatorios");
        /*Nombre.Style("border-bottom: 1px solid grey");*/
        /*$("#nombre").css("border", "1px solid red");
        /*$("#validar").modal("show");*/
    } else {
        $.ajax({
            url: 'http://localhost:8080/api/user/update',
            data: JSON.stringify({
                "id": Id,
                "identification": Identificacion,
                "name": Nombre,
                "birthtDay": Cumpleaños,
                "monthBirthtDay": MesN,
                "address": Direccion,
                "cellPhone": Celular,
                "email": Email,
                "password": Password,
                "zone": Zona,
                "type": Tipo
            }),
            type: 'PUT',
            contentType: 'application/json',
            dataType: 'json',
            success: function (respuesta) {
                console.log(respuesta);
                alert("Usuario actualizado");
                $("#exampleModalToggle2").modal("hide");
                $(':input').val('');
                $('#btnRegistrar').attr('style', 'display: block !important');
                $('#btnActualizar').attr('style', 'display: none !important');
            }
        }).fail(function () {
            alert("Hubo un error en la aplicación, intentelo más tarde.");
        });
    }
}
/********************************************************************************************************************/

/**
 * Registrar un usuario
 */
$("#btnRegistrar").click(function () {
    var Id = $.trim($("#id").val());
    var Identificacion = $.trim($("#cedula").val());
    var Nombre = $.trim($("#nombre").val());
    var Cumpleaños = $.trim($("#cumpleaños").val());
    var MesN = $.trim($("#mesnacimiento").val());
    var Direccion = $.trim($("#direccion").val());
    var Celular = $.trim($("#celular").val());
    var Email = $.trim($("#email").val());
    var Password = $.trim($("#contraseña").val());
    var Zona = $.trim($("#zona").val());
    var Tipo = $.trim($("#tipo").val());
    if (Id == "" || Identificacion == "" || Nombre == "" || Direccion == "" || Celular == "" || Email == "" || Password == "" || Zona == "" || Tipo == "" || Tipo == null || Cumpleaños == "" || MesN == "") {
        alert("Todos los campos son obligatorios");
        /*Nombre.Style("border-bottom: 1px solid grey");*/
        /*$("#nombre").css("border", "1px solid red");
        /*$("#validar").modal("show");*/
    } else {
        $.ajax({
            url: 'http://localhost:8080/api/user/' + Id,
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            success: function (user) {
                if (user.id == null) {
                    $.ajax({
                        url: 'http://localhost:8080/api/user/new',
                        data: JSON.stringify({
                            "id": Id,
                            "identification": Identificacion,
                            "name": Nombre,
                            "birthtDay": Cumpleaños,
                            "monthBirthtDay": MesN,
                            "address": Direccion,
                            "cellPhone": Celular,
                            "email": Email,
                            "password": Password,
                            "zone": Zona,
                            "type": Tipo
                        }),
                        type: 'POST',
                        contentType: 'application/json',
                        dataType: 'json',
                        //error: function (result) { alert('Error: Ver log para detalles.'); console.log(result); },
                        success: function (respuesta) {
                            console.log(respuesta);
                            if (respuesta.id == null) {
                                alert("No fue posible crear la cuenta.")
                                //$("#nombre").focus();
                                //$("#email").focus();
                            } else {
                                alert('Cuenta creada de forma correcta.');
                                //$("#exampleModalToggle2").modal("hide");
                                $(':input').val('');
                                $("#id").focus();
                                //consultarUsers();
                            }
                        }
                    }).fail(function () {
                        alert("Hubo un error en la aplicación, intentelo más tarde.");
                    });
                } else {
                    alert("El id del usuario ya existe, por favor intente con uno diferente");
                }
            }
        }).fail(function () {
            alert("Hubo un error en la aplicación, intentelo más tarde.");
        });

    }
});
/**********************************************************************************************************************/


//==================================================== PRODUCTOS ====================================================

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
            if (clone.length == 0) {
                var row = $("<tr>");
                row.append($("<td colspan='11' class='fw-bolder text-uppercase'>").text("NO hay registros en la base de datos"));
                $("#infoProductos").append(row);
            } else {
                for (i = 0; i < clone.length; i++) {
                    var row = $("<tr>");
                    row.append($("<td>").text(clone[i].brand));
                    row.append($("<td>").text(clone[i].procesor));
                    row.append($("<td>").text(clone[i].os));
                    row.append($("<td>").text(clone[i].description));
                    row.append($("<td>").text(clone[i].memory));
                    row.append($("<td>").text(clone[i].hardDrive));
                    if (clone[i].availability == true || clone[i].availability == "si") {
                        row.append($("<td>").text("Si"));
                    } else if (clone[i].availability == false || clone[i].availability == "no") {
                        row.append($("<td>").text("No"));
                    }
                    row.append($("<td>").text(clone[i].price));
                    row.append($("<td>").text(clone[i].quantity));
                    row.append($("<td>").append("<img src='" + clone[i].photography + "' alt='pc' width='100%' height='50px'>"));
                    row.append($("<td><button class='btn btn-danger me-2' onclick='borrarProducto(" + clone[i].id + ")'>Borrar</button>"
                        + "<button class='btn btn-warning text-white' onclick='editarProducto(" + clone[i].id + ")'>Editar</button>"));
                    $("#infoProductos").append(row);
                }
            }
        },
        /*error: function (result) {
            alert('Error: Ver log para detalles.');
            console.log(result);
        },*/

    }).fail(function () {
        alert("Hubo un error en la aplicación, intentelo más tarde.");
    });
}
/***************************************************************************************************************************/

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
            consultarProductos();
        },
        /*error: function (result) {
            alert('Error: Ver log para detalles.');
            console.log(result);
        },*/

    }).fail(function () {
        alert("Hubo un error en la aplicación, intentelo más tarde.");
    });
}
/************************************************************************************************************/

/**
 * funcion para consultar un producto por id
 * @param {*} id 
 */
function editarProducto(id) {
    $.ajax({
        url: 'http://localhost:8080/api/clone/' + id,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (clone) {
            console.log(clone);
            $('#btnRegistrarClone').attr('style', 'display: none !important');

            $('#btnActualizarClone').attr('style', 'display: block !important');
            $("#idClone").val(clone.id);
            $("#marca").val(clone.brand);
            $("#procesador").val(clone.procesor);
            $("#os").val(clone.os);
            $("#descripcion").val(clone.description);
            $("#memoria").val(clone.memory);
            $("#almacenamiento").val(clone.hardDrive);
            if (clone.availability == true) {
                $("#stock").val("true");
            } else if (clone.availability == false) {
                $("#stock").val("false");
            }

            $("#precio").val(clone.price);
            $("#cantidad").val(clone.quantity);
            $("#foto").val(clone.photography);
            $("#exampleModalToggle3").modal("show");
            //actualizarUser(user);

            //alert("Usuario borrado correctamente");
            //consultarUsers();

        },
        /*error: function (result) {
            alert('Error: Ver log para detalles.');
            console.log(result);
        },*/

    }).fail(function () {
        alert("Hubo un error en la aplicación, intentelo más tarde.");
    });
}
/********************************************************************************************************************/

/**
 * funcion para actualizar un user
 */
function actualizarProducto() {
    var id = $.trim($("#idClone").val());
    var marca = $.trim($("#marca").val());
    var procesador = $.trim($("#procesador").val());
    var os = $.trim($("#os").val());
    var descripcion = $.trim($("#descripcion").val());
    var memoria = $.trim($("#memoria").val());
    var almacenamiento = $.trim($("#almacenamiento").val());
    var stock = $.trim($("#stock").val());
    var precio = $.trim($("#precio").val());
    var cantidad = $.trim($("#cantidad").val());
    var foto = $.trim($("#foto").val());
    if (id == "" || marca == "" || procesador == "" || os == "" || descripcion == "" || memoria == "" || almacenamiento == "" || stock == "" || precio == "" || cantidad == "" || foto == "") {
        alert("Todos los campos son obligatorios");
        /*Nombre.Style("border-bottom: 1px solid grey");*/
        /*$("#nombre").css("border", "1px solid red");
        /*$("#validar").modal("show");*/
    } else {
        $.ajax({
            url: 'http://localhost:8080/api/clone/update',
            data: JSON.stringify({
                "id": id,
                "brand": marca,
                "procesor": procesador,
                "os": os,
                "description": descripcion,
                "memory": memoria,
                "hardDrive": almacenamiento,
                "availability": stock,
                "price": precio,
                "quantity": cantidad,
                "photography": foto
            }),
            type: 'PUT',
            contentType: 'application/json',
            dataType: 'json',
            //error: function (result) { alert('Error: Ver log para detalles.'); console.log(result); },
            success: function (respuesta) {
                console.log(respuesta);
                alert("Producto actualizado");
                $("#exampleModalToggle3").modal("hide");
                $(':input').val('');
                $('#btnRegistrarClone').attr('style', 'display: block !important');
                $('#btnActualizarClone').attr('style', 'display: none !important');
            }
        }).fail(function () {
            alert("Hubo un error en la aplicación, intentelo más tarde.");
        });
    }
}
/********************************************************************************************************************/

/**
 * Registrar un producto
 */
$("#btnRegistrarClone").click(function () {
    var id = $.trim($("#idClone").val());
    var marca = $.trim($("#marca").val());
    var procesador = $.trim($("#procesador").val());
    var os = $.trim($("#os").val());
    var descripcion = $.trim($("#descripcion").val());
    var memoria = $.trim($("#memoria").val());
    var almacenamiento = $.trim($("#almacenamiento").val());
    var stock = $.trim($("#stock").val());
    var precio = $.trim($("#precio").val());
    var cantidad = $.trim($("#cantidad").val());
    var foto = $.trim($("#foto").val());
    if (id == "" || marca == "" || procesador == "" || os == "" || descripcion == "" || memoria == "" || almacenamiento == "" || stock == "" || precio == "" || cantidad == "" || foto == "") {
        alert("Todos los campos son obligatorios");
        /*Nombre.Style("border-bottom: 1px solid grey");*/
        /*$("#nombre").css("border", "1px solid red");
        /*$("#validar").modal("show");*/
    } else {
        $.ajax({
            url: 'http://localhost:8080/api/clone/'+id,
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            success: function (clone) {
                if(clone==null){
                    $.ajax({
                        url: 'http://localhost:8080/api/clone/new',
                        data: JSON.stringify({
                            "id": id,
                            "brand": marca,
                            "procesor": procesador,
                            "os": os,
                            "description": descripcion,
                            "memory": memoria,
                            "hardDrive": almacenamiento,
                            "availability": stock,
                            "price": precio,
                            "quantity": cantidad,
                            "photography": foto
                        }),
                        type: 'POST',
                        contentType: 'application/json',
                        dataType: 'json',
                        //error: function (result) { alert('Error: Ver log para detalles.'); console.log(result); },
                        success: function (respuesta) {
                            console.log(respuesta);
                            alert("Producto Registrado");
                            $(':input').val('');
                            $("#idClone").focus();
                            $("#exampleModalToggle2").modal("hide");
                        }
                    }).fail(function () {
                        alert("Hubo un error en la aplicación, intentelo más tarde.");
                    });
                }else{
                    alert("El id del producto ya está registrado, cambielo e intente de nuevo");
                }
                
            }
        }).fail(function () {
            alert("Hubo un error en la aplicación, intentelo más tarde.");
        });

    }
});
/**********************************************************************************************************************/
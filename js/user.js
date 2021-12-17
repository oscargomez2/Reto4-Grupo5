/**
 * funcion cuando el modal se cierra
 */
$("#exampleModalToggle2").on('hidden.bs.modal', function () {
    //alert("Esta accion se ejecuta al cerrar el modal");
    consultarUsers();
});
/****************************************************************************************************************/

/**
 * Registrar un usuario
 */
$("#btnRegistrar").click(function () {
    var Id = $.trim($("#id").val());
    var Identificacion = $.trim($("#cedula").val());
    var Nombre = $.trim($("#nombre").val());
    var Direccion = $.trim($("#direccion").val());
    var Celular = $.trim($("#celular").val());
    var Email = $.trim($("#email").val());
    var Password = $.trim($("#password").val());
    var Zona = $.trim($("#zona").val());
    var Tipo = $.trim($("#tipo").val());
    if (Id == "" || Identificacion == "" || Nombre == "" || Direccion == "" || Celular == "" || Email == "" || Password == "" || Zona == "" || Tipo == "") {
        alert("Todos los campos son obligatorios");
        /*Nombre.Style("border-bottom: 1px solid grey");*/
        /*$("#nombre").css("border", "1px solid red");
        /*$("#validar").modal("show");*/
    } else {
        $.ajax({
            url: 'http://localhost:8080/api/user/new',
            data: JSON.stringify({
                "id": Id,
                "identification": Identificacion,
                "name": Nombre,
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
                    $(':input').val('')
                    $("#id").focus();
                    //consultarUsers();
                }              
            }
        }).fail( function() {
            alert("Hubo un error en la aplicación, intentelo más tarde.");
        });
    }
});
/**********************************************************************************************************************/

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
            for (i = 0; i < user.length; i++) {

                var row = $("<tr>");
                row.append($("<td>").text(user[i].identification));
                row.append($("<td>").text(user[i].name));
                row.append($("<td>").text(user[i].address));
                row.append($("<td>").text(user[i].cellPhone));
                row.append($("<td>").text(user[i].email));
                row.append($("<td>").text(user[i].password));
                row.append($("<td>").text(user[i].zone));
                row.append($("<td class='px-0 py-2'> <button class='btn btn-danger mx-2' onclick='borrarUser(" + user[i].id + ")'>Borrar</button>"
                    + "<button class='btn btn-warning text-white' onclick='editarUser(" + user[i].id + ")'>Editar</button>"));
                $("#infoUsers").append(row);
            };
        },
        /*error: function (result) {
            alert('Error: Ver log para detalles.');
            console.log(result);
        },*/

    }).fail( function() {
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

    }).fail( function() {
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
            $("#direccion").val(user.address);
            $("#celular").val(user.cellPhone);
            $("#email").val(user.email);
            $("#password").val(user.password);
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

    }).fail( function() {
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
    var Direccion = $.trim($("#direccion").val());
    var Celular = $.trim($("#celular").val());
    var Email = $.trim($("#email").val());
    var Password = $.trim($("#password").val());
    var Zona = $.trim($("#zona").val());
    var Tipo = $.trim($("#tipo").val());
    if (Id == "" || Identificacion == "" || Nombre == "" || Direccion == "" || Celular == "" || Email == "" || Password == "" || Zona == "" || Tipo == "") {
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
            //error: function (result) { alert('Error: Ver log para detalles.'); console.log(result); },
            success: function (respuesta) {
                console.log(respuesta);
                alert("Usuario actualizado");
                $("#exampleModalToggle2").modal("hide");
                $(':input').val('');
                $('#btnRegistrar').attr('style', 'display: block !important');
                $('#btnLogin').attr('style', 'display: block !important');
                $('#btnActualizar').attr('style', 'display: none !important');                
            }
        }).fail( function() {
            alert("Hubo un error en la aplicación, intentelo más tarde.");
        });
    }
}
/********************************************************************************************************************/

/**
 * cuando se abre la pagina
 */
$(document).ready(function () {
    $('#btnActualizar').attr('style', 'display: none !important');
    consultarUsers()
});





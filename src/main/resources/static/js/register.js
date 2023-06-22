$(document).ready(function () {
  $("#Id").focus();
});

var endpoint = "http://localhost:8080/api/user";

function newUser() {
  debugger;
  let user = {
    name: $("#Name").val(),
    email: $("#Email").val(),
    password: $("#Password").val(),
  };

  if (validarRegister()) {
    $.ajax({
      type: "POST",
      contentType: "application/json",
      dataType: "JSON",
      data: JSON.stringify(user),

      url: endpoint + "/new",

      success: function (response) {
        console.log(response);
        $("#mensajesNew").html(
          '<div class="alert alert-success" role="alert"> Usuario registrado con exito! Ya puedes <a id="LinkRegister" style="text-decoration:none; Color:#29ceb8; text-transform: capitalize;" href="#"> Iniciar Sesion</a></div>'
        );
        $("#mensajesNew").show(300);
        limpiar();
      },

      error: function (jqXHR, textStatus, errorThrown) {
        $("#mensajesNew").html(
          '<div class="alert alert-danger" role="alert"> Lo sentimos ha ocurrido un error!</div>'
        );
        $("#mensajesNew").show(300);
        console.log("No Se guardo correctamente");
      },
    });
  }
}

function ValidateEmail(valor) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return valor.match(mailformat);
}

function validaesVacio(dato) {
  return !dato.trim().length;
}

function validarRegister() {
  //obtiene valores
  let name = $("#Name").val();
  let email = $("#Email").val();
  let pass1 = $("#Password").val();
  let pass2 = $("#Password2").val();
  let errores = "";
  $("#mensajesNew").html("");
  let mensajesNew = $("#mensajesNew")

  //valida que los campos no sean vacios
  if (validaesVacio(name)) {
    errores =
    '<div class="alert alert-danger" role="alert"> Por favor ingresa tu usuario!</div>';
    $("#Name").focus();
    mensajesNew.html(errores)
    return false;
  } else if (validaesVacio(email)) {
    errores =
    '<div class="alert alert-danger" role="alert"> Por favor ingresa tu email!</div>';
    mensajesNew.html(errores)
    
    $("#Email").focus();
    return false;
  } else if (!ValidateEmail(email)) {
    errores =
    '<div class="alert alert-danger" role="alert"> Por favor ingresa un correo electronico valido!</div>';
    mensajesNew.html(errores)
    $("#Email").focus();
    return false;
  } else if (validaesVacio(pass1)) {
    errores =
    '<div class="alert alert-danger" role="alert"> Por favor ingresa tu contraseña!</div>';
    mensajesNew.html(errores)
    $("#Password").focus();
    return false;
  } else if (validaesVacio(pass2)) {
    errores =
      '<div class="alert alert-danger" role="alert"> Por favor confirma tu contraseña!</div>';
    $("#mensajesNew").html(errores);
    $("#mensajesNew").show(500);
    $("#Password2").focus();
    return false;
  } else if (pass1 != pass2) {
    errores =
      '<div class="alert alert-danger" role="alert"> Las contraseñas no coinciden!</div>';
    $("#mensajesNew").html(errores);
    $("#mensajesNew").show(500);

    return false;
  } else {
    $("#mensajesNew").html("");
    $("#mensajesNew").hide(500);
    return true;
  }

  return true;
}

function alertaUser() {
  let texto =
    'Usuario creado con exito, ya puedes <a id="LinkRegister" class="alert-link" style=" color: red;"> Iniciar Sesion</a>';
  $("#alertaUser").html(texto);
  $("#alertaUser").show();
}

function limpiar() {
  $("#Name").val(""),
    $("#Email").val(""),
    $("#Password").val(""),
    $("#Password2").val("");

}

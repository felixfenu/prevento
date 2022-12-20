
let f = document.getElementById("formu");

f.addEventListener("submit", function(event){

    event.preventDefault();

    let name = document.getElementById("name").value;
    if (name==""){
        alert("completar el campo nombre");
        // aca corta con el retun
        return;
    }

    let surname = document.getElementById("surname").value;
    if (surname==""){
        alert("completar el campo apellido");
        // aca corta con el retun
        return;
    }

    let password = document.getElementById("password").value;
    if (password==""){
        alert("completar el campo contraseña");
        // aca corta con el retun
        return;
    }

    let email = document.getElementById("email").value;
    if (email==""){
        alert("completar el campo email");
        // aca corta con el retun
        return;
    }

    let country = document.getElementById("country").value;
    if (country==""){
        alert("completar el campo pais");
        // aca corta con el retun
        return;
    }

    let adress = document.getElementById("adress").value;
    if (adress==""){
        alert("completar el campo direccion");
        // aca corta con el retun
        return;
    }

    f.submit();

    
})



let f = document.getElementById("formu");

f.addEventListener("submit", function(event){

    event.preventDefault();

    // listo
    let name = document.getElementById("name").value;
    if (name==""){
        alert("completar el campo nombre");
        // aca corta con el retun
        return;
    }

    // listo
    let price = document.getElementById("price").value;
    if (price==""){
        alert("completar el campo precio");
        // aca corta con el retun
        return;
    }

    let description = document.getElementById("description").value;
    if (description==""){
        alert("completar el campo descripcion");
        // aca corta con el retun
        return;
    }

    f.submit();

    
})

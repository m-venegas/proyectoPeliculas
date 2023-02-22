let cinematheque = JSON.parse (localStorage.getItem("cinematheque")) || []
let inputCode = document.getElementById("codMovie")
let inputTittle = document.getElementById("tittleMovie")
let inputDescription = document.getElementById("descriptionMovie")
let body = document.getElementById("bodyTable");

class Movie {
    constructor(code, tittle, description){
        this.code = code;
        this.tittle = tittle;
        this.description = description
    }
}

//Agregar movie a la cinematheque
function addMovie(){

    if(!inputCode.value || !inputTittle.value || !inputDescription.value){
        swal({
            title: "Ingrese Información!",
            icon: "warning"
          });
 
    }else{ 
       verify=verifyMovie(inputTittle.value);
       if(verify){
        swal({
            title: "Ya existe la película!",
            icon: "warning"
          });
 
       }else{
        cinematheque.push(new Movie(inputCode.value, inputTittle.value.toUpperCase(), inputDescription.value.toUpperCase()))
        swal("Buen Trabajo!", "Película guardada con exito!", "success");
        localStorage.setItem("cinecinematheque", JSON.stringify(cinematheque));
        updateCinematheque()
    }  
}
}

function verifyMovie(inputTittle){
    let verify= cinematheque.find(function(movie){
        return movie.inputTittle.toLowerCase() === inputTittle.toLowerCase()
    })
    if(verify){
        return true
    }else{
        return false
    }
}

function updateCinematheque(){
    inputCode.value=""
    inputTittle.value=""
    inputDescription.value=""
    cinematheque=JSON.parse (localStorage.getItem("cinematheque"));
}

/* Esta funcion recibe arreglo como parametro(lo vamos a utilizar en el futuro, cuando estemos filtrando la tabla o haciendo la busqueda*/



function loadTable(array){
    /*vamos hacer un recorrido de cada elemento de la cinematheque y x cada elemento de la cinematheque crear una fila en la tabla*/


    array.forEach(function(element, index) {
        //creamos fila
        let row=document.createElement("tr");
        //creamos clase a la lista
        row.classList="text-center";
        //creo una variable y uso baptips y dentro de ellos voy a crear toda la estructura HTML de la tabla
        //givens=sinonimo de date
        let givens= `
        <td> ${element.code}</td>
        <td> ${element.tittle}</td>
        <td> ${element.description}</td>
        `;

        //Poner dentro de row los datos (givens)
        row.innerHTML = givens;

        //cada vez que creo una fila (hijo)se la envio al cuerpo tabla
        body.apendchild(row);       
    });
}

loadTable(cinematheque);

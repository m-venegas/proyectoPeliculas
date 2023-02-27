let cinematheque = []
let inputCode = document.getElementById("codMovie")
let inputTitle = document.getElementById("titleMovie")
let inputDescription = document.getElementById("descriptionMovie")
let bodyTableMovies = document.getElementById("bodyTable");
let formCRUDMovieDOM = document.getElementById("formCRUDMovie");
let categoryOptionsDOM = document.getElementById("categoryOptions");

class Movie {
    constructor(code, title, description, category){
        this.code = code;
        this.title = title;
        this.description = description;
        this.category = category;
        this.publish = true;
    }
}

const storageCinema = localStorage.getItem("cinematheque")
if(storageCinema){
    cinematheque = JSON.parse(storageCinema) 
}

//Agregar movie a la cinematheque
function addMovie(){

    if(!inputCode.value || !inputTitle.value || !inputDescription.value || !categoryOptionsDOM.value){
        swal({
            title: "Ingrese Información!",
            icon: "warning"
          });
 
    }else{ 
       verify=verifyMovie(inputTitle.value);
       if(verify){
        swal({
            title: "Ya existe la película!",
            icon: "warning"
          });
 
       }else{
        const movieCode = inputCode.value.toUpperCase()
        const movieTitle = inputTitle.value.toUpperCase()
        const movieDescription = inputDescription.value.toUpperCase()
        const movieCategory = categoryOptionsDOM.value.toUpperCase()
        cinematheque.push(new Movie(movieCode, movieTitle, movieDescription, movieCategory))
        swal("Buen Trabajo!", "Película guardada con exito!", "success");
        localStorage.setItem("cinematheque", JSON.stringify(cinematheque));
        formCRUDMovieDOM.reset()
    }  
    }
    loadTable(cinematheque);
}

function verifyMovie(inputTitle){
    let verify= cinematheque.find(function(movie){
        return movie.title.toLowerCase() === inputTitle.toLowerCase()
    })
    if(verify){
        return true
    }else{
        return false
    }
}

/*Esta funcion recibe arreglo como parametro(lo vamos a utilizar en el futuro, cuando estemos filtrando la tabla o haciendo la busqueda*/


function loadTable(array){
    bodyTableMovies.innerHTML = "";
    /*vamos hacer un recorrido de cada elemento de la cinematheque y x cada elemento de la cinematheque crear una fila en la tabla*/
    array.forEach((movie, i) => {
            //creamos fila
            let row=document.createElement("tr");
            //creamos clase a la lista
            row.classList=["text-center"];
            //creo una variable y uso baptips y dentro de ellos voy a crear toda la estructura HTML de la tabla
            //givens=sinonimo de date
            let givens= `
            <td> ${i+1}</td>
            <td> ${movie.title}</td>
            <td> ${movie.category}</td>
            <td> ${movie.description}</td>
            <td> ${movie.publish ? "Si" : "No" }</td>
            <td>
            <button class="btn btn-secondary">Editar</button>
            <button class="btn btn-danger">Borrar</button>
            </td>
            `;

            //Poner dentro de row los datos (givens)
            row.innerHTML = givens;

            //cada vez que creo una fila (hijo)se la envio al cuerpo tabla
            console.log(row)
            bodyTableMovies.appendChild(row);       

        });
}

loadTable(cinematheque);

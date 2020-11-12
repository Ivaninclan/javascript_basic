//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articuloCarrito = []

cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregas un curso pulsando "agregar al carrito" jaja saludos
    listaCursos.addEventListener('click', agregarCurso);
    //Eliminar un solo curso 
    carrito.addEventListener('click', eliminarCurso);
    //Eliminar todos los cursos del carrito
    vaciarCarrito.addEventListener('click', () => {
        articuloCarrito = [] //resetea el arreglo
        limpiarHTML() // Elimina el html
    })
}



// Funciones
function agregarCurso(e){
    e.preventDefault(); //Omite la funcion  que tiene el boton
    if( e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
    
}

//Eliminar cursos
function eliminarCurso(e){
    console.log(e.target.classList)
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id')
        //eliminar del arreglo de articuloCarrito usando el data-id
        articuloCarrito = articuloCarrito.filter(curso => curso.id !== cursoId)
        carritoHTML() //iterar sobre el mismo carrito

    }
}

// lee el contenido del html y extrae la informacion del curso 
function leerDatosCurso(curso){
    //console.log(curso);

    //crear un objeto con el contenido
    const infoCursos = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1

    }

    //console.log(infoCursos);
    const existe = articuloCarrito.some( (curso) => curso.id === infoCursos.id)
    if (existe) {
        // Actualizar la cantidad del carrito
        const cursos = articuloCarrito.map( (curso) => {
            if (curso.id === infoCursos.id){
                curso.cantidad++
                return curso //Retorna la informacion actualizada
            } else {
                return curso //Retorna los obj que NO existian 
            }
        })
        articuloCarrito = [...cursos]
    }else{
        //Agregar el curso al carrito
        articuloCarrito = [...articuloCarrito, infoCursos]
    }
    console.log(existe)

    carritoHTML();
}
// mostrar el carrito de compras en el html 
function carritoHTML(){
    //limpiar carrito
    limpiarHTML();

    //Recorrer el carrito y generar el html
    articuloCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso
        const row = document.createElement('tr')
        row.innerHTML = `
        <td><img src="${imagen}" width="100"></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `
    // agregar el html del carrito al tbody
    contenedorCarrito.appendChild(row)
    })
}
// Eliminar elementos del carrito
function limpiarHTML(){
    //contenedorCarrito.innerHTML = '';
    while (contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

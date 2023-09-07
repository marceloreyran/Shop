    //Variables
    const carrito = document.querySelector('#carrito');
    const contendorCarrito = document.querySelector('#lista-carrito tbody');
    const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
    const listaCursos = document.querySelector('#lista-cursos');
    let articulosCarrito = [];



    cargarEvenListeners();
    function cargarEvenListeners(){

        //Cuando agregas un curso presionando 'Agregar curso'
        listaCursos.addEventListener('click', agregarCurso);

        //Elimina cursos del carrito 
        carrito.addEventListener('click', eliminarCurso);

        //Vaciar carrito 
        vaciarCarritoBtn.addEventListener('click', () => {
           articulosCarrito = []; //reseteamos el arreglo 
                
            limpiarHTML(); //Eliminamos todo el HTML
              })
};


    //Funciones 

    function agregarCurso(e){
        //Sirve para prevenir que cuando no hay un enlace la pagina se mueva hacia arriba
        e.preventDefault()
        if(e.target.classList.contains('agregar-carrito')){
            const cursoSeleccionado = e.target.parentElement.parentElement;
            leerDatosCurso(cursoSeleccionado);
        }
    };

    //Elimina curso del carrito 

    function eliminarCurso(e){
        console.log(e.target.classList);
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo del carrito por data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
        carritoHTML();// Iterar sobre el carrito y mostrar su HMTL
    }

    //Lee el contenido del hmtl al que le dimos click y extrae la información del curso
    function leerDatosCurso(curso) {
        //console.log(curso);

        //Crear un objeto con el contenido del curso actual
        const infoCurso = {   
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
        }

                    //Revisa si un elemento ya exite en el carrito
        const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);

         if(existe){
          //Actualizamos la cantidad
             const cursos = articulosCarrito.map( curso => {
                 if( curso.id === infoCurso.id){
                     curso.cantidad++;
                     return curso; //retorna el objeto actualizado 
                 }else{
                     return curso; //retorna los objetos que no son los duplicados 
                 }
             });
             articulosCarrito = [...cursos];
             } else {
                articulosCarrito = [...articulosCarrito, infoCurso];
            }
             

        //Agregar elementos al arreglo del carrito

         console.log(articulosCarrito);
         carritoHTML(); 
    };


    //Muestra el carrito de compras en el HTML

    function carritoHTML(){

        //Limpiar el HTML
            limpiarHTML();
        //Recorre el carrito y genera el HTML
        articulosCarrito.forEach( curso => {
            const {imagen, titulo, precio, cantidad, id } = curso;
            const row = document.createElement('tr');
            row.innerHTML =  `
            <td>
            <img src="${imagen}" width="130">
            </td>
            <td>${titulo} </td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
             `;

            //Agrega el HMTL del carrito en el tbody
            contendorCarrito.appendChild(row);
        })
    }

    //Elimina los cursos del tbody

    function limpiarHTML () {
        //contendorCarrito.innerHTML = '';

        while(contendorCarrito.firstChild){
            contendorCarrito.removeChild(contendorCarrito.firstChild)
        }
    }
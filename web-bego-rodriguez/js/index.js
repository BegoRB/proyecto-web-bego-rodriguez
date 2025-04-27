/* _______________________________ *\
 * Archivo principal del JS
 * - Asignar estado / prioridad
 * - Gestión de tareas (crear, editar, eliminar)
 * - Animaciones de planetas
 * - Manejo de eventos para interacciones visuales
 * - Carga dinámica de contenido (home y detalles)
\* _______________________________ */

if (document.querySelector('.select-estado')) {

/*
 * Cambia los estilos del botón según el estado seleccionado
 * Aplica a elementos con clase .select-estado
 *
 * @param {Event} e Evento de cambio
 */
  function handleEstadoChange(e) {
    if (e.target.classList.contains('select-estado')) {
        const selectedValue = e.target.value;

        //Colore segun estado
        if (selectedValue === "en-curso") {
            e.target.style.backgroundColor = '#dff1ff';
            e.target.style.color = '#00576f';
        } else if (selectedValue === "finalizado") {
            e.target.style.backgroundColor = '#c9ffd9';
            e.target.style.color = '#0c441d';
        } else {
            e.target.style.backgroundColor = '#ffddf4';
            e.target.style.color = '#440c26';
        }
    }
  }
    // Evento global para cuando se añadan nuevos selects
  document.addEventListener('change', handleEstadoChange);
}

// Evento para cambiar color según: (urge / no-urge)
/*
Cambia los estilos del botón según la prioridad seleccionada.
 * Funciona igual que el de estado, pero para .select-prioridad
 *
 * @param {Event} e Evento de cambio
 */
if (document.querySelector('.select-prioridad')) {
  function handlePrioridadChange(e) {
    if (e.target.classList.contains('select-prioridad')) {
        const selectedValue = e.target.value;

        if (selectedValue === "urge") {
            e.target.style.backgroundColor = '#ffc6d5';
            e.target.style.color = '#660b23';
        } else if (selectedValue === "no-urge") {
            e.target.style.backgroundColor = '#f1f1f1';
            e.target.style.color = '#535252';
        }
    }
  }
    // Evento global para cuando se añadan nuevos selects
  document.addEventListener('change', handlePrioridadChange);
}

// Evento para íconos de: editar o eliminar
/*
 * Edita o borra una tarea según el icono clicado.
 * Usa closest para evitar errores y mantener los cambios aislados.
 *
 * @param {Event} e Evento de click
 */
if (document.querySelector('.icono-editar')) {
  function handleClickEditarBorrar(e) {

    const targetEditar = e.target.closest(".icono-editar");
    const targetDelete = e.target.closest(".icono-delete");

    // 1. Editar tarea al hacer click en editar
    if (targetEditar) {
      const contenedor = targetEditar.closest(".tabla__cell.primera");
      const celda = contenedor.querySelector(".descr");
      const iconoEditar = targetEditar.querySelector("img");
      const iconoDelete = contenedor.querySelector(".icono-delete");

      // Activar/desactivar edición
      if (celda.contentEditable === "true") {
        celda.contentEditable = "false";
        iconoEditar.src = "/galeria/icono-editar.png";
        iconoDelete.style.visibility = "hidden";
      } else {
        celda.contentEditable = "true";
        celda.focus();
        iconoEditar.src = "/galeria/tick.png";
        iconoDelete.style.visibility = "visible";
      }
    }

    // 2. Eliminar fila (click en icono delete)
    if (targetDelete) {
      const fila = targetDelete.closest("tr");
      if (fila) {
        fila.remove();
      }
    }
  }

  document.addEventListener("click", handleClickEditarBorrar);
}


// Mostrar/Esconder menú de edición de título
/*
 * Alternar visibilidad del menú
 * Solo se muestra el menú del contenedor.
 *
 * @param {Event} e Evento de clic
 */
if (document.querySelector('.tabla__conf-menu')) {

  function handleClickDesplegarLista(e) {
    if (e.target.classList.contains("tabla__conf-menu")) {
        const contenedor = e.target.closest(".tabla__conf");
        const lista = contenedor.querySelector(".primera-conf-lista");
        if (lista) {
            lista.classList.toggle("visible");
        }
    }
  }
  document.addEventListener("click", handleClickDesplegarLista);
}


// Editar o eliminar título de tabla
/*
 * Edita el título de la tabla o elimina la tabla completa.
 * T / F por si se clica en el botón "editar" o "borrar".
 *
 * @param {Event} e Evento de click
 */
if (document.querySelector('.ieditar')) {
  function handleClickEditarTitulo(e) {

    if (e.target.classList.contains("editar")) {
        const contenedor = e.target.closest("th");
        const celda = contenedor.querySelector(".primera-descr");
        const iconoEditar = e.target.querySelector(".ieditar");

        if (celda.contentEditable === "true") {
            celda.contentEditable = "false";
            iconoEditar.src = "/galeria/icono-editar.png";
        } else {
            celda.contentEditable = "true";
            celda.focus();
            iconoEditar.src = "/galeria/tick.png";
        }
    }
    // Borrar tabla completa
    if (e.target.classList.contains("borrar")) {
        const contenedor = e.target.closest(".tareas__principal--contenedor-tabla");
        if (contenedor) {
            contenedor.remove();
        }
    }
  }
  document.addEventListener("click", handleClickEditarTitulo);
}




// Añadir nueva fila de tarea con estructura inicial predefinida
/*
 * Añade una nueva tarea al hacer click en el botón "+ Añadir tarea".
 * Se usa para todas las tablas que tengan el botón.
 *
 * @param {HTML} tabla Tabla HTML que contiene el botón
 */
if (document.querySelector('.add-tarea')) {
  function agregarEventoAddTarea(id) {
    const boton = document.querySelector(`#tabla-${id} .add-tarea`);

    boton.addEventListener('click', () => {
        const tabla = boton.closest('table');
        const tBody = tabla.querySelector('.tabla__body');

        // Crear nueva fila con la misma estructura que la nuestra
        const nuevaFila = document.createElement('tr');
        nuevaFila.classList.add('tabla__row');

        nuevaFila.innerHTML = `
          <td class="tabla__cell primera">
            <div class="tabla__cell editar">
              <button class="icono-delete" aria-label="Eliminar">
                <picture>
                  <source src="/galeria/icono-delete.webp" type="image/webp">
                  <source src="/galeria/icono-delete.png" type="image/png">
                  <img src="/galeria/icono-delete.png" alt="Icono eliminar" loading="lazy">
                </picture>
              </button>
              <button class="icono-editar" aria-label="Editar">
                <picture>
                  <source src="/galeria/icono-editar.webp" type="image/webp">
                  <source src="/galeria/icono-editar.png" type="image/png">
                  <img src="/galeria/icono-editar.png" alt="Icono editar" loading="lazy">
                </picture>
              </button>
            </div>
            <input type="text" class="tabla__cell descr" placeholder="Nombre tarea">                  
          </td>
          <td class="tabla__cell segunda">
            <select class="btn btn--priority select-estado">
              <option value="en-curso" selected>En Curso</option>
              <option value="pendiente">Pendiente</option>
              <option value="finalizado">Finalizado</option>
            </select>
          </td>
          <td class="tabla__cell segunda">
            <select class="btn btn--priority select-prioridad">
              <option value="urge">Urgente</option>
              <option value="no-urge" selected>No urgente</option>
            </select>
          </td>
          <td class="tabla__cell segunda">
            <input type="date" class="tabla__cell fecha input-fecha">
          </td>
        `;

        tBody.appendChild(nuevaFila);
      });

  }
  agregarEventoAddTarea(1);


  // EJETUCAMOS
}



// Evento para crear una tabla completa nueva con nuestra estructura base

if (document.querySelector('#newTarea')) {
  const newTareaBtn = document.getElementById('newTarea');
  if (newTareaBtn) {
      newTareaBtn.addEventListener('click', handleNuevaTabla);
  }

  function handleNuevaTabla() {
      const contenedorTablas = document.querySelector('.tareas__principal--contenedor');
      const tables_length = document.querySelectorAll('.tareas__principal--contenedor-tabla').length + 1;
      console.log(tables_length)
      const nuevaTabla = document.createElement('div');
      nuevaTabla.classList.add('tareas__principal--contenedor-tabla');
      nuevaTabla.id = `tabla-${tables_length}`;
      // Contenido HTML de tabla nueva
      nuevaTabla.innerHTML =
      `<div class="icono-tarea">
          <picture>
            <source src="/galeria/icono.webp" type="image/webp">
            <source src="/galeria/icono.png" type="image/jpeg">
            <img class="icono-tarea__img" src="/galeria/icono.png" alt="Icono tarea" loading="lazy">
          </picture>
        </div>

        <table class="tabla">
          <thead>
            <tr>
              <th class="tabla__header primera">                    
                <span class="tabla__header primera-descr">Corregir bug en el inicio de sesión</span>
                <div class="tabla__conf">
                 <picture>
                    <source srcset="/galeria/flecha.webp" type="image/webp">
                    <source srcset="/galeria/flecha.jpg" type="image/jpeg">
                    <img src="/galeria/flecha.jpg" class="tabla__conf-menu icono" alt="Editar título" loading="lazy">
                  </picture>
                  <ul class="primera-conf-lista">
                    <li class="tabla__conf-item editar">
                      <button class="tabla__conf-item editar" aria-label="Editar nombre">
                        <picture>
                          <source src="/galeria/icono-editar.webp" type="image/webp">
                          <source src="/galeria/icono-editar.png" type="image/jpeg">
                          <img src="/galeria/icono-editar.png" class="tabla__conf icono ieditar" alt="Icono editar" loading="lazy">
                        </picture>
                        Editar nombre
                      </button>
                    </li>
                    <li class="tabla__conf-item borrar">
                      <button class="tabla__conf-item borrar" aria-label="Borrar tarea">
                        <picture>
                          <source src="/galeria/icono-delete.webp" type="image/webp">
                          <source src="/galeria/icono-delete.png" type="image/jpeg">
                          <img src="/galeria/icono-delete.png" class="tabla__conf icono" alt="Icono borrar" loading="lazy">
                        </picture>
                        Borrar tarea
                      </button>
                    </li>
                  </ul>
                </div>
              </th>
              <th class="tabla__header segunda">Estado</th>
              <th class="tabla__header segunda">Tipo</th>
              <th class="tabla__header segunda">Entrega</th>
            </tr>
          </thead>
          <tbody class="tabla__body">
            <tr class="tabla__row">
              <td class="tabla__cell primera">
                <div class="tabla__cell editar">
                  <button class="icono-delete" aria-label="Eliminar">
                    <picture>
                      <source src="/galeria/icono-delete.webp" type="image/webp">
                      <source src="/galeria/icono-delete.png" type="image/jpeg">
                      <img src="/galeria/icono-delete.png" alt="Icono eliminar" loading="lazy">
                    </picture>
                  </button>
                  <button class="icono-editar" aria-label="Editar">
                    <picture>
                      <source src="/galeria/icono-editar.webp" type="image/webp">
                      <source src="/galeria/icono-editar.png" type="image/jpeg">
                      <img src="/galeria/icono-editar.png" alt="Icono editar" loading="lazy">
                    </picture>
                  </button>
                </div>
                <input type="text" class="tabla__cell descr" placeholder="Nombre tarea">                  
              </td>
              <td class="tabla__cell segunda">
                <select class="btn btn--priority select-estado">
                  <option value="en-curso" selected>En Curso</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="finalizado">Finalizado</option>
                </select>
              </td>
              <td class="tabla__cell segunda">
                <select class="btn btn--priority select-prioridad">
                  <option value="urge">Urgente</option>
                  <option value="no-urge" selected>No urgente</option>
                </select>
              </td>
              <td class="tabla__cell segunda">
                <input type="date" class="tabla__cell fecha input-fecha">
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="tabla__row">
              <td colspan="4" class="tabla__cell-foot--btn">
                <button class="add-tarea" type="button">+ Añadir tarea</button>
              </td>
            </tr>
          </tfoot>
        </table>
      `;

      contenedorTablas.appendChild(nuevaTabla);

      agregarEventoAddTarea(tables_length);
  }

}


//Crear una nueva tarea en la sección del card
if (document.querySelector('#btnAdd')) {
  const addTareaBtn = document.getElementById('btnAdd');

  if (addTareaBtn) {
    addTareaBtn.addEventListener('click', handleAddTaskCard);
  }

  function handleAddTaskCard() {
    const contenedorTareas = document.querySelector('.card__tasks');

    const nuevaTarea = document.createElement('div');
    nuevaTarea.classList.add('task');

    nuevaTarea.innerHTML = `
      <input type="checkbox" class="task__checkbox" />
      <div class="task__text">
        Nueva tarea
      </div>
    `;

    contenedorTareas.appendChild(nuevaTarea);
  }
}





//Animaciones para transormar los ejes de cada planeta
/**
 * Animación de planetas en órbita usando transform.
 * Cada planeta rota a una velocidad a partir de un ángulo.
 */
if (document.querySelector('.espacio')) {

  let distanciaDelSol;

  // !!MEDIA QUERIES!! para pantalla pequeñas
  function actualizarDistancia() {
    if (window.matchMedia("(max-width: 768px)").matches) {
      distanciaDelSol = 150;
    } else {
      distanciaDelSol = 280;
    }
  }

  actualizarDistancia();

    // PLANETA A


  let anguloPlanetA = 250; 

  function animarA() {
    const planetA = document.querySelector('.planet-a');

    // Incrementar el ángulo para el movimiento
    https://dev.to/josephciullo/supercharge-your-web-animations-optimize-requestanimationframe-like-a-pro-22i5
    // Girar 360° en 20 segundos (60FPS POR S) => 360/20s = 18 / 60fps = 0.3¿?
    anguloPlanetA += 0.3; 

    // Cálculo posición del planeta con senos y cosenos
    /*REFERENCIA COS SIN : 
    https://stackoverflow.com/questions/32078052/using-math-pi-how-to-set-my-own-value-of-angles-in-each-element
    https://www.youtube.com/watch?v=ZnZHdta97K4&ab_channel=FlippingPhysics
    https://www.adammarcwilliams.co.uk/animating-javascript-trigonometry/
    */
    const x = Math.cos(anguloPlanetA * Math.PI / 180) * distanciaDelSol; 
    const z = Math.sin(anguloPlanetA * Math.PI / 180) * distanciaDelSol; 

    // Aplicar 3D
    planetA.style.transform = `translateX(${x}px) translateZ(${z}px)`;

    // Animación
    requestAnimationFrame(animarA);
  }

  animarA(); // Iniciar anim.


  // PLANETA B
  const planetDos = document.querySelector('.planet-b');
  let anguloPlanetB = 0; 

  function animarB() {

    anguloPlanetB += 0.3;

    const x = Math.cos(anguloPlanetB * Math.PI / 180) * distanciaDelSol;
    const z = Math.sin(anguloPlanetB * Math.PI / 180) * distanciaDelSol; 

    planetDos.style.transform = `translateX(${x}px) translateZ(${z}px)`;

    requestAnimationFrame(animarB);
  }

  animarB();

  // PLANETA B
  const planetC = document.querySelector('.planet-c');
  let anguloPlanetC = 100; 

  function animarC() {

    anguloPlanetC += 0.3;

    const x = Math.cos(anguloPlanetC * Math.PI / 180) * distanciaDelSol;
    const z = Math.sin(anguloPlanetC * Math.PI / 180) * distanciaDelSol; 

    planetC.style.transform = `translateX(${x}px) translateZ(${z}px)`;

    requestAnimationFrame(animarC);
  }

  animarC();



  const planetD = document.querySelector('.planet-d');
  let anguloPlanetD = 320; 

  function animarD() {

    anguloPlanetD += 0.3;


    const x = Math.cos(anguloPlanetD * Math.PI / 180) * distanciaDelSol;
    const z = Math.sin(anguloPlanetD * Math.PI / 180) * distanciaDelSol; 

    planetD.style.transform = `translateX(${x}px) translateZ(${z}px)`;

    requestAnimationFrame(animarD);
  }

  animarD();
}


//PROBLEMA : Quiero 2 eventos en el mismo click, no funciona
//QUEREMOS QUE SE MUESTRE LA CARD SIMPLE + MAIN CARD (luego) AL HACER CLICK EN EL PLANETA 
// DA ERROR AL HACER CLICK EN LA CARD I SE CIERRA SI APRETO EN LA MISMA CARD 
//SOLUCIÓN : Card simple con mouseover/muouseout para cerrar
//SOLUCIÓN : Main card con click


//PROBAMOS CON VISIBILITY PERO NO DEJA HACER LA TRANSICION ANIMADA, ASI QUE USAMOS OPACITY
// Click en el planeta para mostrar las tarjetas
/*
 * Muestra / oculta una tarjeta al hacer hover sobre un planeta.
 * La tarjeta se hace visible.
 *
 * @param {Event} mouseover/mouseout
 */
if (document.querySelector('.card__simple')) {
 
  function handleHoverPlaneta(e) {
    const planeta = e.target.closest(".planet");
    const tarjeta = planeta.querySelector(".card__simple");
    tarjeta.classList.add("visible");
  }
  function handleHoverOutPlaneta(e) {
    const planeta = e.target.closest(".planet");
    const tarjeta = planeta.querySelector(".card__simple");
    tarjeta.classList.remove("visible");
  }
  document.addEventListener("mouseover", handleHoverPlaneta);
  document.addEventListener("mouseout", handleHoverOutPlaneta);

  // Mostrar tarjeta al hacer click sobre un planeta
  /*
   * Muestra la tarjeta principal al hacer click sobre un planeta.
   * Transforma el sistema solar desplazandose.
   *
   * @param {Event} e Evento de click
   */
  function activarClickPlaneta() {
    document.addEventListener("click", function(e) {
        const cardMain = document.querySelector(".card__main");
        const sistema = document.querySelector(".sistema");


        if (window.matchMedia("(min-width: 768px)").matches) {
          cardMain.classList.add("visible");
          sistema.style.transform = "translate(-250px, 0px)";

        } else {
          cardMain.classList.add("visible");
        }

    });
  }
  activarClickPlaneta();

  // Cerrar la tarjeta principal
  /*
   * Cierra la tarjeta principal al hacer click en el icono de cerrar.
   *
   * @param {Event} e Evento de click
   */
  function handleCerrarCard(e) {
    const closeIcon = e.target.closest(".card__cerrar");
    if (closeIcon) {
        const cardMain = closeIcon.closest(".card__main");
        const sistema = document.querySelector(".sistema");
        if (cardMain) {
            cardMain.classList.remove("visible"); 
            sistema.style.transform = "translate(0px, 0px)";
        }
    }
  }
  document.addEventListener("click", handleCerrarCard);
}





// Scroll para modificar frame para movers con el Sol (profundidad)
if (document.querySelector('.frame')) {
  function posicionHandler() {
    const frame = document.querySelector('.frame--first');
    const vertical = window.scrollY;
    
    if (window.matchMedia("(min-width: 480px)").matches) {
      if (vertical >= 510 && vertical <= 865) {
          frame.style.zIndex = "-1";
      } else {
          frame.style.zIndex = "2";
      }
    } else {
      if (vertical >= 500 && vertical <= 1100) {
        frame.style.zIndex = "-1";
      } else {
          frame.style.zIndex = "2";
      }
    }
  }

  window.addEventListener('scroll', posicionHandler);

  function posicionBHandler() {
    const framed = document.querySelector('.frame--prioridades');
    const vertical = window.scrollY;

    if (vertical >= 1400 && vertical <= 1700) {
        framed.style.zIndex = "-1";
    } else {
        framed.style.zIndex = "2";
    }
  }

  window.addEventListener('scroll', posicionBHandler);
  // Mostrar tarea Urgente al final del scroll
  function alejarHandler() {
    const elementos = document.querySelectorAll('.frame__element--out');
    const vertical = window.scrollY;

    // Mostrar/ocultar elementos flotantes
    elementos.forEach(function(elem) {
      if (window.matchMedia("(min-width: 480px)").matches) {
        if (vertical <= 1720) {
          elem.style.opacity = "1"; 
        } else {
          elem.style.opacity = "0"; 
        }
      } 
      else {
        if (vertical <= 1900) {
          elem.style.opacity = "1";  
        } else {
          elem.style.opacity = "0"; 
        }
      }
    });


    const fijo = document.querySelector('.frame__element--fixed');
    const yaExiste = fijo.querySelector('.elem-urgent');

    // Insertar video cuando se llega a altura determinada
    if (vertical >= 1700) {
        if (!yaExiste) {
          const contenedor = document.createElement('div');
          contenedor.classList.add('elem-urgent');
          contenedor.innerHTML = `
          <video autoplay loop muted>
              <source src="/galeria/planetas/planeta-rojo.webm" type="video/webm"/>
              <source src="/galeria/planetas/planeta-rojo.mp4" type="video/mp4"/>
          </video>
          </div>`;
          fijo.appendChild(contenedor);
          requestAnimationFrame(() => contenedor.style.opacity = "1");
        }
      } else {
        if (yaExiste) {
          fijo.removeChild(yaExiste);
        }
      }
  }

  window.addEventListener('scroll', alejarHandler);

  //Para saber posición en consola
  window.onscroll = function() {
    posicionHandler();
    console.log("Vertical: " + window.scrollY);
    console.log("Horizontal: " + window.scrollX);
  };
}



// Pestañas para ver contenido (Sol, Planeta, Urgente)
/*
 * Carga contenido HTML en el contenedor #content.
 * Utiliza la API fetch para traer los datos desde archivos externos.
 * @url contenido-pestanas/sol.html
        contenido-pestanas/planeta.html
        contenido-pestanas/urgente.html
 */
if (document.querySelector('#content')) {

  // Cargar HTML externo en el contenedor
  function cargarHtmlHandler(filename) {
    fetch(filename)
      .then(response => response.text())
      .then(data => {
        document.getElementById('content').innerHTML = data;
      })
      .catch(error => console.error('Error al cargar el contenido:', error));
  }
  


  const itemUrgente = document.querySelector('.item-pestana--urgente');
  const itemSol = document.querySelector('.item-pestana--sol');
  const itemPlaneta = document.querySelector('.item-pestana--planeta');

  function reseteoOpacity() {
    itemUrgente.style.opacity = "0";
    itemSol.style.opacity = "0";
    itemPlaneta.style.opacity = "0";
  }

  // Eventos para los botones de pestañas
  document.getElementById('btnSol').addEventListener('click', () => {
    reseteoOpacity();
    cargarHtmlHandler('/contenido-pestanas/sol.html');
    itemSol.style.opacity = "1";
  });
  
  document.getElementById('btnPlaneta').addEventListener('click', () => {
    reseteoOpacity();
    cargarHtmlHandler('/contenido-pestanas/planeta.html');
    itemPlaneta.style.opacity = "1";
  });
  
  document.getElementById('btnUrge').addEventListener('click', () => {
    reseteoOpacity();
    cargarHtmlHandler('/contenido-pestanas/urgente.html');
    itemUrgente.style.opacity = "1";
  });
  
}

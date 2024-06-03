import {
    consolaBtn,
    atributos_btn,
    portadaBtn,
    nombreBtn,
    arma1Btn,
    arma2Btn,
    habilidades_btn,
} from "./inicializador.js";
import { cap_primera } from "./../helpers.js";
import Personaje from "../personajes/personajesModelos.js";
import { Formulario } from "./UImodels.js";
import { coleccion_personajes } from "../colecciones/coleccionPersonajes.js";

/**
 * Muestra u oculta el contenedor de direccionales arriba y abajo.
 */
export function mostrar_direccionales_arriba_abajo() {
    if (ELEMENTOS.contenedorArribaAbajo.style.display === "flex") {
        ELEMENTOS.contenedorArribaAbajo.style.display = "none";
    } else {
        ELEMENTOS.contenedorArribaAbajo.style.display = "flex";
    }
}

/**
 * Cambia el contenido de la pagina para reflejar los cambios en el personaje seleccionado.
 * @param {Personaje} personaje - El personaje a mostrar.
 */
export function mostrar_personaje(personaje, cambiar_consola = false) {
    // * Atributos
    for (const atributo in atributos_btn) {
        // Boton del atributo
        const boton = document.querySelector(`#${atributo}Btn`);
        // Es span que muestra el valor
        const span = boton.children[1].children[0];

        // Actualiza el valor del span
        span.textContent = personaje.atributos[atributo];
    }

    // * Portada
    const portada = portadaBtn.childNodes[0];
    portada.src = personaje.portada;

    // * Descripción
    if (cambiar_consola) contenido_consola(personaje.descripcion);

    // * Nombre
    nombreBtn.children[0].textContent = personaje.nombre.toUpperCase();

    // * Arma 1
    arma1Btn[0].children[0].src = personaje.arma1.icono; // Icono
    arma1Btn[1].children[0].textContent = cap_primera(personaje.arma1.nombre); // Nombre

    // * Arma 2
    arma2Btn[0].children[0].src = personaje.arma2.icono; // Icono
    arma2Btn[1].children[0].textContent = cap_primera(personaje.arma2.nombre); // Nombre

    // * Equipamientos
    for (const habilidad in habilidades_btn) {
        const span = habilidades_btn[habilidad].children[0];

        span.textContent = personaje[habilidad].nombre.toUpperCase();
    }
}

/**
 * Cambia el contenido de la consola.
 * @param {string} texto - El nuevo texto.
 */
export function contenido_consola(texto) {
    // Convierte a string y capitaliza la primera letra.
    consolaBtn.innerHTML = cap_primera(String(texto));
}

/**
 * Condiciona un formulario para diferentes tipos de ingresos.
 * @param {Formulario} form - El formulario a condicionar.
 * @param {Function} func - La nuevo funcion de ingreso a ejecutar.
 */
export function condicionar_formulario(form, func) {
    // TODO: Completar la función para condicionar formulario
}

// /**
//  * ? Condiciona un determinado formulario (cambia su nombre, funcion de ingreso, etc.).
//  * @param {Personaje} personaje - El personaje sobre el cual se van a realizar cambios.
//  * @param {Formulario} formulario - El formulario que se quiere condicionar.
//  * @param {string} modo - El nuevo del formulario (comando, habilidad, nombre).
//  * @param {boolean} actualizar - Indica si se debe actualizar el personaje.
//  */
// function condicionar_formulario(personaje, formulario, modo, actualizar = false) {
//     let nueva_funcion = () => { }
//     let nuevo_titulo = "Ingrese "
//     switch (modo) {
//         case "comando":
//             nueva_funcion = ingresar_comandos
//             nuevo_titulo += "el comando"
//             break;
//         case "nombre":
//             nueva_funcion = personaje.cambiar_nombre
//             nuevo_titulo += "el nombre"
//         // TODO: Lógica para cambio de habilidades
//         // TODO: Lógica para cambio en la experiencia
//         default:
//             break;
//     }

//     formulario.Funcion_ingreso = (input) => {
//         nueva_funcion(input)

//         // Muestra los nuevos cambios
//         mostrar_personaje(personaje)
//         cambiarModo()
//     }
//     formulario.cambiar_encabezado = nuevo_titulo
// }

/**
 * Cambia un personaje por otro.
 * @param {Personaje} actual - El personaje a cambiar.
 * @param {string} nuevo - El nombre del nuevo.
 * @param {string} tipo - El tipo del personaje (esbirro o avatar)
 */
export function cambiar_personaje(actual, nuevo, tipo) {
    // Obtiene el objeto con la información del nuevo personaje.
    const obj_nuevo_pers = coleccion_personajes[tipo][nuevo];
    // Usa el metodo para actualizar la instancia del personaje que se quiere cambiar.
    actual.actualizar(obj_nuevo_pers);
}

import {
    consolaBtn,
    atributos_btn,
    portadaBtn,
    nombreBtn,
    arma1Btn,
    arma2Btn,
    habilidades_btn,
} from "./inicializador.js";
import { cap_primera, quitar_acentos } from "./../helpers.js";
import Personaje from "../personajes/personajesModelos.js";
import { Formulario } from "./UImodels.js";
import { coleccion_personajes } from "../colecciones/coleccionPersonajes.js";
import { cambiar_modo } from "../juego.js";
import { coleccion_habilidades } from "../colecciones/coleccionHabilidades.js";

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
 * @param {Personaje} personaje - El personaje sobre el cual se van a realizar cambios.
 * @param {string} modo - El modo del formulario (comando, habilidad, nombre).
 * @param {number} slot - (Si es una habilidad) El slot de habilidad que se quiere cambiar.
 */
export function condicionar_formulario(form, personaje, modo, slot = 1) {
    let nueva_funcion;

    switch (modo) {
        case "nombre":
            form.encabezado = "nombre";
            nueva_funcion = (nombre) => (personaje.nombre = nombre);
            break;
        case "comando":
            form.encabezado = "comando";
            // TODO: Agregar comandos handler
            break;
        case "habilidad":
            form.encabezado = "habilidad";
            nueva_funcion = (nombre) =>
                personaje[`habilidad${slot}`].actualizar(
                    cambiar_habilidad(nombre)
                );
            break;
        default:
            break;
    }

    form.funcion_ingreso = (str) => {
        nueva_funcion(str); // Ejecuta la nueva función de ingreso.

        form.mostrar_ocultar(); // Oculta el modal.

        mostrar_personaje(personaje); // Muestra los cambios en el personaje.

        cambiar_modo(); // Cambia a modo "jugar".
    };
}

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

// TODO: Función para pasar de avatar a esbirros
export function mostrar_esbirros() {}

/**
 *
 * @param {string} nombre - El nombre de la nueva habilidad.
 * @returns {Object} El objeto con la información de la nueva habilidad.
 */
export function cambiar_habilidad(nombre) {
    const habi_nombre = quitar_acentos(nombre).toLowerCase(); // Filtra el nombre
    const habi_nueva = coleccion_habilidades[habi_nombre]; // Accede al objeto

    if (habi_nueva) return habi_nueva;
}

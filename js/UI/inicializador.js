// ! Este archivo es usado para acceder a todos los elementos del DOM creados con HTML.

import { atributos_personajes } from "./../helpers.js";

// * Top
/**
 * Contiene el botón que manipula el modo de juego.
 * @const {HTMLButtonElement}
 */
const editarBtn = document.querySelector("#editarBtn");
/**
 * Contiene el botón de la portada.
 * @const {HTMLButtonElement}
 */
const portadaBtn = document.querySelector("#portadaBtn");
/**
 * Contiene el botón de la experiencia.
 * @const {HTMLButtonElement}
 */
const expBtn = document.querySelector("#experienciaBtn");
/**
 * Contiene el botón que abre la mochila.
 * @const {HTMLButtonElement}
 */
const mochilaBtn = document.querySelector("#mochilaBtn");
/**
 * Contiene el botón que muestra la lista de esbirros.
 * @const {HTMLButtonElement}
 */
const esbirrosBtn = document.querySelector("#esbirrosBtn");
/**
 * Contiene el botón de la consola.
 * @const {HTMLButtonElement}
 */
const consolaBtn = document.querySelector("#consolaBtn");
/**
 * Contiene el botón que cambia el nombre del personaje.
 * @const {HTMLButtonElement}
 */
const nombreBtn = document.querySelector("#nombreBtn");

// * Direccionales
/**
 * Contiene los botones arriba y abajo usados principalmente para modificar atributos.
 * @const {HTMLElement}
 */
const contenedorArribaAbajo = document.querySelector("#btnMasMenos");
/**
 * Contiene el botón arriba usado principalmente para modificar atributos.
 * @const {HTMLButtonElement}
 */
const arribaBtn = document.querySelector("#arribaBtn");
/**
 * Contiene el botón abajo usado principalmente para modificar atributos.
 * @const {HTMLButtonElement}
 */
const abajoBtn = document.querySelector("#abajoBtn");
/**
 * Contiene el botón que cambia hacia el personaje anterior.
 * @const {HTMLButtonElement}
 */
const izquierdaBtn = document.querySelector("#izquierdaBtn");
/**
 * Contiene el botón que cambia hacie el siguiente personaje.
 * @const {HTMLButtonElement}
 */
const derechaBtn = document.querySelector("#derechaBtn");

// * Bot
/**
 * Contiene los botones de los atributos.
 * @const {HTMLButtonElement}
 */
const atributos_btn = {};
for (const atributo in atributos_personajes) {
    const btn = document.querySelector(`#${atributo}Btn`);
    atributos_btn[atributo] = btn;
}
/**
 * Contiene el botón que cambia el equipo actual.
 * @const {HTMLButtonElement}
 */
const equipos_btn = {};
for (let i = 1; i <= 3; i++) {
    const btn = document.querySelector(`#equipo${i}Btn`);
    equipos_btn[`equipo${i}`] = btn;
}
/**
 * Contiene el botón que realiza la acción del turno actual.
 * @const {HTMLButtonElement}
 */
const accionBtn = document.querySelector("#accionBtn");
/**
 * Contiene el botón que abre el menú de opciones.
 */
const arma1Btn = [document.querySelector("#arma1ImgBtn"), document.querySelector("#arma1TxtBtn")]
/**
 * Contiene el botón que abre el menú de opciones.
 */
const arma2Btn = [document.querySelector("#arma2ImgBtn"), document.querySelector("#arma2TxtBtn")]
/**
 * Contiene el botón que abre el menú de opciones.
 * @const {HTMLButtonElement}
 */
const habilidades_btn = {};
for (let i = 1; i <= 3; i++) {
    const btn = document.querySelector(`#habilidad${i}Btn`);
    habilidades_btn[`habilidad${i}Btn`] = btn;
}



export const ELEMENTOS = {
    // * Top
    editarBtn,
    portadaBtn,
    expBtn,
    mochilaBtn,
    esbirrosBtn,
    consolaBtn,
    nombreBtn,
    // * Direccionales
    contenedorArribaAbajo,
    arribaBtn,
    abajoBtn,
    izquierdaBtn,
    derechaBtn,
    // * Bot
    atributos_btn,
    equipos_btn,
    accionBtn,
    arma1Btn,
    arma2Btn,
    habilidades_btn,
};

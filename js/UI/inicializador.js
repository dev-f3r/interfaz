// ! Este archivo es usado para acceder a todos los elementos del DOM creados con HTML.
import { atributos_personajes } from "./../helpers.js";
import ElementoHTML from "./UImodels.js";

const MAIN = document.querySelector("#main");
ElementoHTML.padre = MAIN;

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
 * Contiene el texto de la experiencia.
 * @const {HTMLElement}
 */
const expTxt = document.querySelector("#experienciaTxt");
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
const arma1Btn = [
    document.querySelector("#arma1ImgBtn"),
    document.querySelector("#arma1TxtBtn"),
];
/**
 * Contiene el botón que abre el menú de opciones.
 */
const arma2Btn = [
    document.querySelector("#arma2ImgBtn"),
    document.querySelector("#arma2TxtBtn"),
];
/**
 * Contiene el botón que abre el menú de opciones.
 * @const {HTMLButtonElement}
 */
const habilidades_btn = {};
for (let i = 1; i <= 3; i++) {
    const btn = document.querySelector(`#habilidad${i}Btn`);
    habilidades_btn[`habilidad${i}`] = btn;
}

export const ELEMENTOS = {
    main: MAIN,
    // * Top
    editar_btn: new ElementoHTML({ elemento: editarBtn }),
    portada_btn: new ElementoHTML({ elemento: portadaBtn }),
    exp_btn: new ElementoHTML({ elemento: expBtn }),
    exp_txt: new ElementoHTML({ elemento: expTxt }),
    mochila_btn: new ElementoHTML({ elemento: mochilaBtn }),
    esbirros_btn: new ElementoHTML({ elemento: esbirrosBtn }),
    consola_btn: new ElementoHTML({ elemento: consolaBtn }),
    nombre_btn: new ElementoHTML({ elemento: nombreBtn }),
    // * Direccionales
    contenedorArribaAbajo, // Excepción
    arriba_btn: new ElementoHTML({ elemento: arribaBtn }),
    abajo_btn: new ElementoHTML({ elemento: abajoBtn }),
    izquierda_btn: new ElementoHTML({ elemento: izquierdaBtn }),
    derecha_btn: new ElementoHTML({ elemento: derechaBtn }),
    // * Bot
    accion_btn: new ElementoHTML({ elemento: accionBtn }),
    // Atributos
    ataque_btn: new ElementoHTML({ elemento: atributos_btn.ataque }),
    esquiva_btn: new ElementoHTML({ elemento: atributos_btn.esquiva }),
    bloqueo_btn: new ElementoHTML({ elemento: atributos_btn.bloqueo }),
    velocidad_btn: new ElementoHTML({ elemento: atributos_btn.velocidad }),
    vida_btn: new ElementoHTML({ elemento: atributos_btn.vida }),
    poder_btn: new ElementoHTML({ elemento: atributos_btn.poder }),
    // Equipamiento
    equipo1_btn: new ElementoHTML({ elemento: equipos_btn.equipo1 }),
    equipo2_btn: new ElementoHTML({ elemento: equipos_btn.equipo2 }),
    equipo3_btn: new ElementoHTML({ elemento: equipos_btn.equipo3 }),
    // Habilidades
    habilidad1_btn: new ElementoHTML({ elemento: habilidades_btn.habilidad1 }),
    habilidad2_btn: new ElementoHTML({ elemento: habilidades_btn.habilidad2 }),
    habilidad3_btn: new ElementoHTML({ elemento: habilidades_btn.habilidad3 }),
    // Armas
    arma1_btn: [
        new ElementoHTML({ elemento: arma1Btn[0] }),
        new ElementoHTML({ elemento: arma1Btn[1] }),
    ],
    arma2_btn: [
        new ElementoHTML({ elemento: arma2Btn[0] }),
        new ElementoHTML({ elemento: arma2Btn[1] }),
    ],
};

import { Modelos } from "./personajes/main.js";
const { Personaje } = Modelos;

import { ELEMENTOS } from "./UI/inicializador.js";
import { mostrar_personaje } from "./UI/UIcontrollers.js";

/**
 * Modo de la interfaz.
 */
export let UI_modo = "jugar";

/**
 * Obtiene el modo de la interfaz.
 * @returns Modo de la interfaz.
 */
export function obtener_modo() {
    return UI_modo;
}

/**
 * Cambia el modo de la interfaz.
 * @param {string} modo - Modo de la interfaz.
 * @param {string} especificar - Seleccionar un modo especifico.
 */
export function cambiar_modo(especificar = "") {
    // Si no se especifica un modo, lo cambia dinamicamente
    if (!especificar) {
        if (UI_modo === "jugar") {
            UI_modo = "editar";
        } else UI_modo = "jugar";
    }
    // Caso contrario, lo cambia especificamente
    else UI_modo = especificar;

    // Cambia la imagen del boton editar
    if (obtener_modo() === "jugar")
        ELEMENTOS.editar_btn.elemento.children[0].src = "img/editar.png";
    else ELEMENTOS.editar_btn.elemento.children[0].src = "img/guardar.png";

    // TODO: Cada vez que se cambia de modo, se debe cerrar todo
    // TODO: En modo editar se debe mostrar la experiencia actual
}

/**
 * Contiene todos las instancias de los personajes
 * @const {Personaje[]}
 */
export const personajes = [
    new Personaje({
        nombre: "bienvenido",
        portada: "img/logo-meeple-combat.png",
        descripcion: "consola",
    }),
    new Personaje({
        nombre: "esbirro 1",
        atributos: {
            ataque: 10,
            esquiva: 10,
            bloqueo: 12,
            poder: 11,
            vida: 12,
            velocidad: 8,
        },
        descripcion: "lsadkjfañlskdfj",
    }),
    new Personaje({
        nombre: "esbirro 2",
    }),
    new Personaje({
        nombre: "esbirro 3",
    }),
    new Personaje({
        nombre: "esbirro 4",
    }),
    new Personaje({
        nombre: "esbirro 5",
    }),
];

/**
 * Indica el indice del personaje seleccionado
 * @var {number}
 */
export let indice_personaje = 0;
/**
 * Contiene el indice de ultimo esbirro seleccionado
 * @var {number}
 */
export let indice_esbirro = 1;

mostrar_personaje(personajes[1], true);

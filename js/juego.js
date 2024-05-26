import { Personaje } from "./personajes/personajesModelos.js";

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
    if (!especificar) {
        if (UI_modo === "jugar") {
            UI_modo = "editar";
        } else UI_modo = "jugar";
    } else UI_modo = especificar;

    // TODO: Cada vez que se cambia de modo, se debe cerrar todo
    // TODO: En modo editar se debe mostrar la experiencia actual
}

export const personajes = [
    new Personaje({
        nombre: "bienvenido",
        portada: "img/logo-meeple-combat.png",
        descripcion: "consola",
    }),
    new Personaje({
        nombre: "esbirro 1",
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

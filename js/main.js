import "./UI/main.js";
import { mochila, obtener_exp, personajes } from "./juego.js";

// TODO: Asegurarce de guardar vida_actual y poder_actual.
/**
 * Guarda el estado actual de la lista de personajes y la experiencia.
 */
function guardar_estado_personajes() {
    const JSON_personajes = JSON.stringify(personajes);
    localStorage.setItem("lista_personajes", JSON_personajes);
    localStorage.setItem("exp", obtener_exp());
}

/**
 * Guarda el estado actual de la mochila.
 */
function guardar_estado_mochila() {
    const JSON_mochila = JSON.stringify(mochila);
    localStorage.setItem("mochila", JSON_mochila);
}

/**
 * Carga el estado actual de la lista de personajes y la experiencia.
 * @returns {Object} El estado actual de la lista de personajes y la experiencia.
 */
export function cargar_estado_personajes() {
    const JSON_personajes = localStorage.getItem("lista_personajes");

    const lista_personajes = JSON.parse(JSON_personajes) || null;

    if (lista_personajes) {
        return lista_personajes;
    }

    return lista_personajes ? lista_personajes : [];
}

/**
 * Carga el estado actual de la mochila.
 * @returns {number} El estado actual de la mochila.
 */
export function cargar_estado_exp() {
    const exp = localStorage.getItem("exp");
    return exp ? Number(exp) : 0;
}

/**
 * Carga el estado actual de la mochila.
 * @returns {Object} El estado actual de la mochila.
 */
export function cargar_estado_mochila() {
    const JSON_mochila = localStorage.getItem("mochila");
    return JSON_mochila ? JSON.parse(JSON_mochila) : {};
}

// ? Guarda el estado del juego en localStorage cada 1.5 segundos.
setInterval(() => {
    guardar_estado_personajes();
    guardar_estado_mochila();
}, 1500);

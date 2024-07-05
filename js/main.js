import "./UI/main.js";
import { personajes } from "./juego.js";
import Personaje from "./personajes/personajesModelos.js";

// FIXME: Guardar unicamente los nombres de las armas, habilidades e items.
/**
 * Serializa un objeto para su posterior uso.
 * @param {Object} obj - El objeto a serializar.
 * @returns {Object} El objeto serializado.
 */
function serializar_objeto(obj) {
    const salida = {};

    for (const key in obj) {
        if (key.startsWith("_")) {
            const key_serializada = key.slice(1);

            if (typeof obj[key] === "object") {
                if (key_serializada === "atributos") {
                    salida[key_serializada] = obj[key];
                } else salida[key_serializada] = serializar_objeto(obj[key]);
            } else {
                salida[key_serializada] = obj[key];
            }
        }
    }

    return salida;
}

function guardar_estado_personajes() {
    const personajes_serializados = personajes.map((pers) =>
        serializar_objeto(pers)
    );
    const JSON_personajes = JSON.stringify(personajes_serializados);
    localStorage.setItem("lista_personajes", JSON_personajes);
}

// FIXME: Usar el metodo para actualizar cada personaje.
export function cargar_estado_personajes() {
    const JSON_personajes = localStorage.getItem("lista_personajes");

    const lista_personajes = JSON.parse(JSON_personajes) || null;

    if (lista_personajes) {
        return lista_personajes.map((pers) => new Personaje(pers));
    }

    return [];
}

setInterval(() => {
    guardar_estado_personajes();
}, 1000);

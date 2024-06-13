import { Modelos } from "./personajes/main.js";
const { Personaje } = Modelos;
import { ELEMENTOS } from "./UI/inicializador.js";
import { elementos_mostrados, ocultar_elementos } from "./UI/main.js";
import {
    contenido_consola,
    limpiar_consola,
    mostrar_personaje,
} from "./UI/UIcontrollers.js";

/**
 * Modo de la interfaz.
 */
let UI_modo = "jugar";
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
 * Contiene la experiencia actual
 * @var {number}
 */
let exp = 0;
/**
 * Obtiene la experiencia actual.
 * @returns {number} Experiencia actual.
 */
export function obtener_exp() {
    return exp;
}
/**
 * Modifica la experiencia actual.
 * @param {boolean} accion - Indica si se debe aumentar o disminuir la experiencia.
 * @param {number} valor - El valor a aumentar o disminuir.
 */
export function modificar_exp(accion, valor) {
    if (accion) exp += valor;
    else exp -= valor;
}

/**
 * Contiene los indices de los personajes.
 * @type {{personaje:number, avatar:number, esbirro:number}}
 */
export const indice_personajes = {
    personaje: 0,
    avatar: 0,
    esbirro: 1,
};

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

    // Reestaura la consola y oculta todos los elementos.
    limpiar_consola(false);
    // TODO: En modo editar se debe mostrar la experiencia actual
}
/**
 * Obtiene el personaje seleccionado
 * @returns {{i:number, pers: Personaje}} - Objeto con el indice (i) y el personaje seleccionado (pers)
 */
export function obtener_personaje() {
    return {
        i: indice_personajes.personaje,
        pers: personajes[indice_personajes.personaje],
    };
}

mostrar_personaje(personajes[0], true);

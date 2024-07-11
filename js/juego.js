import {
    cargar_estado_exp,
    cargar_estado_mochila,
    cargar_estado_personajes,
} from "./main.js";
import { Modelos } from "./personajes/main.js";
const { Personaje } = Modelos;
import { ELEMENTOS } from "./UI/inicializador.js";
import {
    limpiar_consola,
    limpiar_UI,
    mostrar_personaje,
} from "./UI/UIcontrollers.js";
import { Mochila } from "./UI/UImodels.js";

/**
 * Modo de la interfaz (`jugar` o `editar`).
 * @type {string}
 * @var
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
        portada: "img/e1.png",
    }),
    new Personaje({
        nombre: "esbirro 2",
        portada: "img/e2.png",
    }),
    new Personaje({
        nombre: "esbirro 3",
        portada: "img/e3.png",
    }),
    new Personaje({
        nombre: "esbirro 4",
        portada: "img/e4.png",
    }),
    new Personaje({
        nombre: "esbirro 5",
        portada: "img/e5.png",
    }),
];

const datos = cargar_estado_personajes(); // Carga los datos del localStorage.

// Si existen actualiza la lista de personajes.
if (datos.length > 0) {
    for (let i = 0; i < personajes.length; i++) {
        const personaje = personajes[i];
        personaje.actualizar(datos[i]);
    }
}

/**
 * Contiene la mochila del jugador.
 * @const {Mochila}
 */
export const mochila = new Mochila(cargar_estado_mochila());

/**
 * Contiene la experiencia actual
 * @var {number}
 */
let exp = cargar_estado_exp();
/**
 * Obtiene la experiencia actual.
 * @returns {number} Experiencia actual.
 */
export function obtener_exp() {
    return exp;
}

/**
 * Modifica la experiencia actual.
 * @param {number} valor - El valor a aumentar o disminuir.
 * @param {boolean} reemplazar - Indica si se debe reemplazar la experiencia actual.
 */
export function modificar_exp(valor, reemplazar = false) {
    if (reemplazar) exp = valor;
    else exp += valor;
}

/**
 * Contiene los indices de los personajes.
 * @type {{actual:number, avatar:number, esbirro:number}}
 */
export const indice_personajes = {
    actual: 0,
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
 * @param {string} especificar - Seleccionar un modo especifico.
 * @param {boolean} limpiar - Limpiar la consola y el UI.
 */
export function cambiar_modo(especificar = "", limpiar = false) {
    // Si no se especifica un modo, lo cambia dinamicamente
    if (!especificar) {
        if (UI_modo === "jugar") {
            UI_modo = "editar";
        } else UI_modo = "jugar";
    }
    // Caso contrario, lo cambia especificamente
    else UI_modo = especificar;

    // Cambia la imagen del boton editar
    if (obtener_modo() === "jugar") {
        ELEMENTOS.editar_btn.elemento.children[0].src = "img/editar.png"; // Cambia el icono.
        ELEMENTOS.exp_txt.mostrar_ocultar(false); // Oculta el indicador de exp.
    } else {
        ELEMENTOS.editar_btn.elemento.children[0].src = "img/guardar.png"; // Cambio el icono.
        ELEMENTOS.exp_txt.mostrar_ocultar(true); // Muestra el indicador de exp.
    }

    // Reestaura la consola y oculta todos los elementos.
    if (limpiar) {
        limpiar_UI();
        limpiar_consola(false);
    }
}
/**
 * Obtiene el personaje seleccionado
 * @returns {{i:number, pers: Personaje}} - Objeto con el indice (i) y el personaje seleccionado (pers)
 */
export function obtener_personaje() {
    return {
        i: indice_personajes.actual,
        pers: personajes[indice_personajes.actual],
    };
}

mostrar_personaje(personajes[0], true);

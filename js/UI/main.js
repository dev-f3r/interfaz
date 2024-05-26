import ElementoHTML from "./UImodels.js";
import { ELEMENTOS } from "./inicializador.js";
import { lista_modales } from "./UIhelpers.js";

/**
 * Modo de la interfaz.
 */
let UI_modo = "jugar";
/**
 * Obtiene el modo de la interfaz.
 * @returns Modo de la interfaz.
 */
function obtener_modo() {
    return UI_modo;
}

/**
 * Cambia el modo de la interfaz.
 * @param {string} modo - Modo de la interfaz.
 * @param {string} especificar - Seleccionar un modo especifico.
 */
function cambiar_modo(especificar = "") {
    if (!especificar) {
        if (UI_modo === "jugar") {
            UI_modo = "editar";
        } else UI_modo = "jugar";
    } else UI_modo = especificar;

    // TODO: Cada vez que se cambia de modo, se debe cerrar todo
}

// Agrega los modales al main.
for (const modal in lista_modales) {
    main.appendChild(lista_modales[modal].elemento);
}

// TODO: Asignar eventos para mostrar los modales
// Evento boton editar
ELEMENTOS.editar_btn.evento_click = () => {
    cambiar_modo();
    // * Cambia la imagen
    if (obtener_modo() === "jugar")
        ELEMENTOS.editar_btn.elemento.children[0].src = "img/editar.png";
    else ELEMENTOS.editar_btn.elemento.children[0].src = "img/guardar.png";
};
// Evento portada
ELEMENTOS.portada_btn.evento_click = () => {
    if (obtener_modo() === "editar") {
        lista_modales.avatares.mostrar_ocultar();
    }
};

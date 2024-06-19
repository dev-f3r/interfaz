import { BotonModal, Formulario, Modal } from "./UImodels.js";
import { colecciones } from "../colecciones/main.js";

/**
 * Máximo de botones generales que puede contener un modal.
 */
const MAXIMO_BOTONES_MODAL = 12;

/**
 * Crea una lista con los botones a partir de una lista con nombres de objetos.
 * Estos botones pueden estar mostrados u ocultos.
 * @param {Object.<string, Object>} coleccion - La colección en la que se basa la lista de nombres.
 * @param {string} propiedad - La propiedad de los objetos de la colección donde esta el nombre del icono.
 * @param {number} maximo - El máximo de botones visibles.
 * @param {string} terminacion - La expresión en la que termina el icono.
 * @returns {BotonModal[]} Una lista con los botones creados.
 */
export function armar_lista_botones_modal(
    coleccion,
    propiedad,
    maximo,
    terminacion = ""
) {
    const lista = Object.keys(coleccion); // Obtiene la lista de nombres de objetos.
    return lista
        .filter(
            (nombre) => nombre !== "nuevo_avatar" && nombre !== "nuevo_esbirro"
        ) // Excluye "nuevo_avatar" y "nuevo_esbirro"
        .map((nombre, i) => {
            const objeto = coleccion[nombre]; // Extrae el objeto de la colección.
            const nombre_obj = objeto[propiedad].match(/\/([a-z]+?)\.png/)[1]; // Obtiene el nombre del icono.

            const mostrar = i <= maximo - 1 ? true : false; // Visivilidad según el maximo.

            return new BotonModal({
                id: `${nombre_obj}_btn`,
                clases: ["item-modal"],
                mostrar,
                ruta_icono: `img/${nombre_obj + terminacion}.png`,
            });
        });
}

/**
 * Crea una lista con los botones a partir de una lista con nombres de objetos
 * @param {Object.<string, Object>} coleccion - La colección en la que se basa la lista de nombres.
 * @param {number} maximo - El máximo de botones visibles.
 * @returns {BotonModal[]} Una lista con los botones creados.
 */
function armar_lista_btns_modal_equipo(coleccion, maximo) {
    return Object.entries(coleccion)
        .filter(([key, obj]) => key !== "nada") // Excluye "nada".
        .map(([key, obj], i) => {
            const mostrar = i <= maximo - 1 ? true : false; // Visivilidad según el maximo.
            return new BotonModal({
                id: `${key}_btn`,
                mostrar,
                ruta_icono: obj.icono,
            });
        });
}

/**
 * Contiene las listas de botones para cada modal
 */
const botones_modal = {
    avatares: {
        normales: armar_lista_botones_modal(
            colecciones.personajes.avatares,
            "portada",
            MAXIMO_BOTONES_MODAL,
            "ico"
        ),
        especial: new BotonModal({
            id: "nuevopj_btn",
            mostrar: true,
            ruta_icono: "img/nuevopjico.png",
        }),
    },
    esbirros: {
        normales: armar_lista_botones_modal(
            colecciones.personajes.esbirros,
            "portada",
            MAXIMO_BOTONES_MODAL,
            "ico"
        ),
        especial: new BotonModal({
            id: "nuevoesbirro_btn",
            mostrar: true,
            ruta_icono: "img/nuevopjico.png",
        }),
    },
    armas_marciales: {
        normales: armar_lista_botones_modal(
            colecciones.armas.armas_marciales,
            "icono",
            MAXIMO_BOTONES_MODAL
        ),
        especial: new BotonModal({
            id: "salvajes_btn",
            mostrar: true,
            ruta_icono: "img/salvajes.png",
        }),
    },
    armas_naturales: {
        normales: armar_lista_botones_modal(
            colecciones.armas.armas_naturales,
            "icono",
            MAXIMO_BOTONES_MODAL
        ),
        especial: new BotonModal({
            id: "marciales_btn",
            clases: ["item-modal"],
            mostrar: true,
            ruta_icono: "img/marciales.png",
        }),
    },
    equipos: {
        normales: armar_lista_btns_modal_equipo(
            colecciones.equipos,
            MAXIMO_BOTONES_MODAL
        ),
        // TODO: El boton especial debe reestaurar el slot de equipamiento seleccionado.
        especial: new BotonModal({
            mostrar: true,
        }),
    },
};

/**
 * Objeto con los modales creados.
 */
export const lista_modales = {
    avatares: new Modal({
        titulo: "avatares",
        id: "modal_avatares",
        maximo_botones: MAXIMO_BOTONES_MODAL,
        btn_especial: botones_modal.avatares.especial,
        btn_grales: botones_modal.avatares.normales,
    }),
    esbirros: new Modal({
        titulo: "esbirros",
        id: "modal_esbirros",
        maximo_botones: MAXIMO_BOTONES_MODAL,
        btn_especial: botones_modal.esbirros.especial,
        btn_grales: botones_modal.esbirros.normales,
    }),
    armas_marciales: new Modal({
        titulo: "armas marciales",
        id: "modal_armas_marciales",
        maximo_botones: MAXIMO_BOTONES_MODAL,
        btn_especial: botones_modal.armas_marciales.especial,
        btn_grales: botones_modal.armas_marciales.normales,
    }),
    armas_naturales: new Modal({
        titulo: "armas naturales",
        id: "modal_armas_naturales",
        maximo_botones: MAXIMO_BOTONES_MODAL,
        btn_especial: botones_modal.armas_naturales.especial,
        btn_grales: botones_modal.armas_naturales.normales,
    }),
    equipos: new Modal({
        titulo: "equipos",
        id: "modal_equipos",
        maximo_botones: MAXIMO_BOTONES_MODAL,
        btn_especial: botones_modal.equipos.especial,
        btn_grales: botones_modal.equipos.normales,
    }),
    // TODO: Modal mochila
};
/**
 * Instancia del formulario.
 * @const {Formulario}
 */
export const formulario = new Formulario({});

import { ELEMENTOS } from "./inicializador.js";
import { BotonModal } from "./UImodels.js";
import { colecciones } from "../colecciones/main.js";

/**
 * ? Muestra u oculta el contenedor de direccionales arriba y abajo.
 */
export function mostrar_direccionales_arriba_abajo() {
    if (ELEMENTOS.contenedorArribaAbajo.style.display === "flex") {
        ELEMENTOS.contenedorArribaAbajo.style.display = "none";
    } else {
        ELEMENTOS.contenedorArribaAbajo.style.display = "flex";
    }
}

/**
 * ? Crea una lista con los botones a partir de una lista con nombres de objetos.
 * ? Estos botones pueden estar mostrados u ocultos.
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

    return lista.map((nombre, i) => {
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
    // TODO: Implementar lo siguiente
    // * Botones para modal armas:
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
            // funcionClick: () => {
            //     ocultar_modales();
            //     mostrar_modal(modales.armas_naturales);
            // },
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
            // funcionClick: () => {
            //     ocultar_modales;
            //     mostrar_modal(modales.armas_marciales);
            // },
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
    equipos: {
        normales: armar_lista_botones_modal(
            colecciones.equipos,
            "icono",
            MAXIMO_BOTONES_MODAL
        ),
        // TODO: El boton especial debe reestaurar el slot de equipamiento seleccionado.
        especial: new BotonModal({
            mostrar: true,
        }),
    },
};

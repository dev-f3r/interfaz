import { ELEMENTOS } from "./inicializador.js";
import { BotonModal } from "./UImodels.js";

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
 * @param {string[]} lista - La lista con nombres de objetos.
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

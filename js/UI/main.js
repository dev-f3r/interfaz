import ElementoHTML from "./UImodels.js";
import { ELEMENTOS } from "./inicializador.js";
import { lista_modales } from "./UIhelpers.js";

/**
 * Modo de la interfaz.
 */
let UI_modo = "jugar";

/**
 * Cambia el modo de la interfaz.
 * @param {string} modo - Modo de la interfaz.
 * @param {string} especificar - Seleccionar un modo especifico.
 */
function cambiar_modo(modo, especificar = "") {
    if (!especificar) {
        if (modo === "jugar") modo = "editar";
        else modo = "jugar";
    } else modo = especificar;

    // TODO: Cada vez que se cambia de modo, se debe cerrar todo
}

// Elemento principal de la interfaz
const main = document.querySelector("#main");
ElementoHTML.padre = main;

// Elementos UI ya creados con HTML
const elementos_UI_principales = {};
for (const elemento in ELEMENTOS) {
    if (elemento === "contenedorArribaAbajo") continue;
    // Excepción para los botones de atributos, habilidades y equipos
    if (
        elemento === "atributos_btn" ||
        elemento === "habilidades_btn" ||
        elemento === "equipos_btn"
    ) {
        for (const key in ELEMENTOS[elemento]) {
            elementos_UI_principales[key] = new ElementoHTML({
                elemento: ELEMENTOS[elemento][key],
            });
        }
    }
    // Excepción para los botones de arma
    else if (elemento === "arma1Btn" || elemento === "arma2Btn") {
        const arreglo = [
            // Arma 1
            new ElementoHTML({ elemento: ELEMENTOS[elemento][0] }),
            // Arma 2
            new ElementoHTML({ elemento: ELEMENTOS[elemento][1] }),
        ];

        elementos_UI_principales[elemento] = arreglo;
    }
    // Resto de los elementos
    else {
        elementos_UI_principales[elemento] = new ElementoHTML({
            elemento: ELEMENTOS[elemento],
        });
    }
}

// Agrega los modales al main.
for (const modal in lista_modales) {
    main.appendChild(lista_modales[modal].elemento);
}


// TODO: Asignar eventos para mostrar los modales

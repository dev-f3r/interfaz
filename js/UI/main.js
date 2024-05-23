import ElementoHTML from "./UImodels.js";
import { ELEMENTOS } from "./inicializador.js";

// Elemnto principal de la interfaz
const main = document.querySelector("#main");
ElementoHTML.padre = main;

// Create an instance of ElementoHTML using the button element
const instancias = {};
for (const elemento in ELEMENTOS) {
    // Excepción para el contenedor de los direccionales arriba y abajo
    if (elemento === "contenedorArribaAbajo")
        instancias[elemento] = new ElementoHTML({
            elemento: ELEMENTOS[elemento],
            tipo_display: "flex",
            evento_click: () => {},
        });
    // Excepción para los botones de atributos, habilidades y equipos
    else if (
        elemento === "atributos_btn" ||
        elemento === "habilidades_btn" ||
        elemento === "equipos_btn"
    ) {
        for (const key in ELEMENTOS[elemento]) {
            instancias[key] = new ElementoHTML({
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

        instancias[elemento] = arreglo;
    }
    // Resto de los elementos
    else
        instancias[elemento] = new ElementoHTML({
            elemento: ELEMENTOS[elemento],
        });
}

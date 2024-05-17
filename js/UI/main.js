import ElementoHTML from "./UImodels.js";
import { ELEMENTOS } from "./UIelements.js";

// Access the main element from index.html
const main = document.querySelector("#main");

// Set the padre class variable
ElementoHTML.padre = main;


// Create an instance of ElementoHTML using the button element
const instancias = {};
for (const elemento in ELEMENTOS) {
    if (elemento === "contenedorArribaAbajo") instancias[elemento] = new ElementoHTML({ elemento: ELEMENTOS[elemento], tipo_display: "flex", evento_click: () => {} });
    else instancias[elemento] = new ElementoHTML({ elemento: ELEMENTOS[elemento] });
}
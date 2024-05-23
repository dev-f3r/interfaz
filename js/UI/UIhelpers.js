import { ELEMENTOS } from "./inicializador.js";

/**
 * ? Muestra u oculta el contenedor de direccionales arriba y abajo.
 */
export function mostrar_direccionales_arriba_abajo() {
    if(ELEMENTOS.contenedorArribaAbajo.style.display === "flex") {
        ELEMENTOS.contenedorArribaAbajo.style.display = "none";
    } else {
        ELEMENTOS.contenedorArribaAbajo.style.display = "flex";
    }
}
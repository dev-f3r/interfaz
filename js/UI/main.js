import { ELEMENTOS } from "./inicializador.js";
import { lista_modales } from "./UIhelpers.js";
import { cambiar_modo, obtener_modo } from "../juego.js";

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
// TODO: Los botones cerrar de los modales, ademas de ocultar el modal deben cambiar el modo a "jugar"

import { Modal } from "./UImodels.js";
import { ELEMENTOS } from "./inicializador.js";
import { lista_modales } from "./UIhelpers.js";
import { cambiar_modo, obtener_modo } from "../juego.js";

// Agrega los modales al main.
for (const modal in lista_modales) {
    main.appendChild(lista_modales[modal].elemento);
}

// Evento boton editar
ELEMENTOS.editar_btn.evento_click = () => {
    cambiar_modo();
};

// Agrega el cambio de modo al boton cerrar de cada modal
Modal.evento_btn_cerrar = () => {
    cambiar_modo();
};
// Evento portada
ELEMENTOS.portada_btn.evento_click = () => {
    if (obtener_modo() === "editar") {
        lista_modales.avatares.mostrar_ocultar();
    }
};
// TODO: Los botones cerrar de los modales, ademas de ocultar el modal deben cambiar el modo a "jugar"

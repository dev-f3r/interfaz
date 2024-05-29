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
    // TODO: Debe desplegar el modal avatares o el modal esbirros
    // Despliega el modal avatares si esta en modo "editar"
    if (obtener_modo() === "editar") {
        lista_modales.avatares.mostrar_ocultar();
    }
};

// Evento btn arma 1
ELEMENTOS.arma1_btn.forEach((boton) => {
    boton.evento_click = () => {
        if (obtener_modo() === "editar")
            lista_modales.armas_marciales.mostrar_ocultar();
    };
});
// Evento btn arma 2
ELEMENTOS.arma2_btn.forEach((boton) => {
    boton.evento_click = () => {
        if (obtener_modo() === "editar")
            lista_modales.armas_marciales.mostrar_ocultar();
    };
});

// TODO: El boton especial del modal armas marciales debe desplegar el modal armas naturales
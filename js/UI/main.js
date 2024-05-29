import { Modal } from "./UImodels.js";
import { ELEMENTOS } from "./inicializador.js";
import { lista_modales } from "./UIhelpers.js";
import { cambiar_modo, obtener_modo } from "../juego.js";

// Agrega los modales al main.
for (const modal in lista_modales) {
    main.appendChild(lista_modales[modal].elemento);
}

// Agrega el cambio de modo al boton cerrar de cada modal
Modal.evento_btn_cerrar = () => {
    cambiar_modo();
};

// Evento btn editar
ELEMENTOS.editar_btn.evento_click = () => {
    cambiar_modo();
};
// Evento btns armas
ELEMENTOS.portada_btn.evento_click = () => {
    // TODO: Debe desplegar el modal avatares o el modal esbirros
    // Despliega el modal avatares si esta en modo "editar"
    if (obtener_modo() === "editar") {
        lista_modales.avatares.mostrar_ocultar();
    }
};
// Evento btns armas
for (let i = 1; i <= 2; i++) {
    ELEMENTOS[`arma${i}_btn`].forEach((boton) => {
        boton.evento_click = () => {
            if (obtener_modo() === "editar")
                lista_modales.armas_marciales.mostrar_ocultar();
        };
    });
}
// Evento btns equipamiento
for (let i = 1; i <= 3; i++) {
    ELEMENTOS[`equipo${i}_btn`].evento_click = () => {
        if (obtener_modo() === "editar")
            lista_modales.equipos.mostrar_ocultar();
    };
}
// TODO: El boton especial del modal armas marciales debe desplegar el modal armas naturales
// TODO: Evento nombre
// TODO: Evento consola
// TODO: Evento exp

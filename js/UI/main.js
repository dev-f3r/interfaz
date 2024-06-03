import { Modal } from "./UImodels.js";
import { ELEMENTOS, MAIN } from "./inicializador.js";
import { lista_modales, formulario } from "./UIhelpers.js";
import { cambiar_modo, obtener_modo } from "../juego.js";

// Agrega los modales al main.
for (const modal in lista_modales) {
    MAIN.appendChild(lista_modales[modal].elemento);
}
// Agrega el formulario al main
MAIN.appendChild(formulario.elemento);

// Agrega el cambio de modo al boton cerrar de cada modal
Modal.evento_btn_cerrar = () => {
    cambiar_modo();
};
// El boton especial del modal armas marciales debe desplegar el modal armas naturales
lista_modales.armas_marciales.btn_especial.evento_click = () => {
    lista_modales.armas_marciales.mostrar_ocultar(); // Oculta el modal armas marciales
    lista_modales.armas_naturales.mostrar_ocultar(); // Despliega el modal armas naturales
};
// El boton especial del modal armas naturales debe desplegar el modal armas marciales
lista_modales.armas_naturales.btn_especial.evento_click = () => {
    lista_modales.armas_naturales.mostrar_ocultar(); // Oculta el modal armas naturales
    lista_modales.armas_marciales.mostrar_ocultar(); // Despliega el modal armas marciales
};

// Evento portada
ELEMENTOS.portada_btn.evento_click = () => {
    // TODO: Debe desplegar el modal avatares o el modal esbirros
    // Despliega el modal avatares si esta en modo "editar"
    if (obtener_modo() === "editar") {
        lista_modales.avatares.mostrar_ocultar();
    }
};
// TODO: Evento exp
// Evento btn editar
ELEMENTOS.editar_btn.evento_click = () => {
    cambiar_modo();
};
// TODO: Evento nombre
// TODO: Evento esbirro
// TODO: Evento consola
// TODO: Evento atributos
// Evento btns equipamiento
for (let i = 1; i <= 3; i++) {
    ELEMENTOS[`equipo${i}_btn`].evento_click = () => {
        if (obtener_modo() === "editar")
            lista_modales.equipos.mostrar_ocultar();
    };
}
// TODO: Evento accion
// Evento btns armas
for (let i = 1; i <= 2; i++) {
    ELEMENTOS[`arma${i}_btn`].forEach((boton) => {
        boton.evento_click = () => {
            if (obtener_modo() === "editar")
                lista_modales.armas_marciales.mostrar_ocultar();
        };
    });
}
// TODO: Evento habilidades
// TODO: Evento para condicionar formulario
// ? Ejemplo:
// formulario.nombre = "test";
// formulario.funcion_ingreso = () => console.log(formulario._input.value);
// formulario.mostrar_ocultar();

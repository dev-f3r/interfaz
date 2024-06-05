import { Modal } from "./UImodels.js";
import { ELEMENTOS, MAIN } from "./inicializador.js";
import { lista_modales, formulario } from "./UIhelpers.js";
import { cambiar_modo, obtener_modo, obtener_personaje } from "../juego.js";
import {
    cambiar_personaje,
    condicionar_formulario,
    contenido_consola,
    mostrar_personaje,
} from "./UIcontrollers.js";

// * AGREGADO DE ELEMENTOS Y CONFIGURACIONES.
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
// Los botones del modal avatares deben cambiar al personaje seleccionado.
lista_modales.avatares.btn_grales.forEach((btn) => {
    // Cambia el evento click de cada boton el en modal.
    btn.evento_click = () => {
        // Obtiene el personaje actual.
        const pers_actual = obtener_personaje();
        // Obtiene el nombre del nuevo personaje.
        const nombre_pers_nuevo = btn.id.slice(0, -4);

        // Si el personaje actual es un esbirro.
        if (pers_actual.i > 0) {
            // Cambia el personaje a un esbirro con el nuevo nombre.
            cambiar_personaje(pers_actual.pers, nombre_pers_nuevo, "esbirros");
        } else {
            // Cambia el personaje a un avatar con el nuevo nombre.
            cambiar_personaje(pers_actual.pers, nombre_pers_nuevo, "avatares");
        }

        // Muestra el nuevo personaje y su descripción por consola.
        mostrar_personaje(pers_actual.pers, true);

        // Cierra el modal.
        lista_modales.avatares.btn_cerrar.elemento.click();
    };
});
// TODO: Los botones del modal esbirros deben cambiar al personaje seleccionado.
// TODO: Los botones del modal armas deben cambiar el arma del personaje seleccionado.
// TODO: Los botones del modal de equipamiento deben cambiar el slot del personaje seleccionado.
// TODO: El boton especial del modal de avatares y esbirros debe crear un nuevo personaje.
// TODO: El boton especial del modal de equipamiento debe reestaurar el slot especificado.

// * EVENTOS.
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
// Evento btn nombre
ELEMENTOS.nombre_btn.evento_click = () => {
    const pers_actual = obtener_personaje();
    // Si esta en modo "editar" condiciona el formulario para cambio de nombre de personaje.
    if (obtener_modo() === "editar") {
        condicionar_formulario(formulario, pers_actual.pers, "nombre"); // Condiciona el formulario.
        formulario.mostrar_ocultar(); // Muestra el formulario.
    }
    // De lo contrario muestra la descripción del personaje.
    else {
        contenido_consola(obtener_personaje().pers.descripcion); // Cambia el contenido de la consola.
    }
};
// TODO: Evento esbirro
// TODO: Evento consola
// TODO: Evento atributos
for (let i = 1; i <= 3; i++) {
    // Evento btns equipamiento
    ELEMENTOS[`equipo${i}_btn`].evento_click = () => {
        // Si esta en modo "editar" muestra el modal de equipamiento.
        if (obtener_modo() === "editar")
            lista_modales.equipos.mostrar_ocultar();
        // De lo contrario muestra la descripción del slot.
        else
            contenido_consola(
                obtener_personaje().pers[`equipo${i}`].descripcion
            );
    };

    // Evento habilidades
    ELEMENTOS[`habilidad${i}_btn`].evento_click = () => {
        const pers_actual = obtener_personaje();
        // Si esta en modo "editar" condiciona el formulario para cambio de habilidad.
        if (obtener_modo() === "editar") {
            condicionar_formulario(
                formulario,
                pers_actual.pers,
                "habilidad",
                i
            );
            formulario.mostrar_ocultar();
        }
        // De lo contrario muestra la descripción de la habilidad.
        else {
            contenido_consola(pers_actual.pers[`habilidad${i}`].descripcion);
        }
    };
}
// TODO: Evento accion
// Evento btns armas
for (let i = 1; i <= 2; i++) {
    ELEMENTOS[`arma${i}_btn`].forEach((boton) => {
        boton.evento_click = () => {
            // Si esta en modo "editar" muestra el modal armas marciales.
            if (obtener_modo() === "editar")
                lista_modales.armas_marciales.mostrar_ocultar();
            // De lo contrario muestra la descripción del arma.
            else
                contenido_consola(
                    obtener_personaje().pers[`arma${i}`].descripcion
                );
        };
    });
}
// TODO: Evento habilidades

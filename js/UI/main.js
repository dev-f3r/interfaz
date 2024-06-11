import ElementoHTML, { Modal } from "./UImodels.js";
import { ELEMENTOS, MAIN } from "./inicializador.js";
import { lista_modales, formulario } from "./UIhelpers.js";
import { cambiar_modo, obtener_modo, obtener_personaje } from "../juego.js";
import {
    cambiar_personaje,
    condicionar_direccionales_arriba_abajo,
    condicionar_formulario,
    contenido_consola,
    limpiar_consola,
    mostrar_atributo,
    mostrar_personaje,
} from "./UIcontrollers.js";
import { atributos_personajes } from "../helpers.js";

// * VARIABLES.
/**
 * Arma seleccionada
 * @type {number}
 * @var
 */
let slot_arma = 1;

// FIXME: Solo se debe permitir un solo elemento mostrado.
/**
 * Contiene los elementos que se estan mostrando.
 * @type {ElementoHTML[]}
 * @const
 */
export const elementos_mostrados = [];

// * HELPERS.
/**
 * Obtiene el slot de la arma seleccionada.
 * @returns {number} Slot de la arma seleccionada.
 */
export function obtener_slot_arma() {
    return slot_arma;
}

/**
 * Oculta elementos que se estan mostrando.
 * @param {ElementoHTML[]} elementos - Lista con los elementos a ocultar.
 */
export function ocultar_elementos(elementos) {
    /**
     * @type {ElementoHTML}
     */
    let elemento = elementos.pop();
    while (elemento) {
        elemento.mostrar_ocultar(false);
        elemento = elementos.pop();
    }
}

/**
 * Muestra elementos que NO se estan mostrando.
 * @param {ElementoHTML[]} elementos - Lista con los elementos a mostrar.
 */
export function mostrar_elementos(elementos) {
    /**
     * @type {ElementoHTML}
     */
    let elemento = elementos.pop();
    while (elemento) {
        elemento.mostrar_ocultar(true);
        elementos_mostrados.push(elemento);

        elemento = elementos.pop();
    }
}

// * AGREGADO DE ELEMENTOS Y CONFIGURACIONES.
// El contenedor de direccionales arriba/abajo por default tiene display="flex".
ELEMENTOS.cnt_arriba_abajo.tipo_display = "flex";
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
    ocultar_elementos([lista_modales.armas_marciales]); // Oculta el modal armas marciales
    mostrar_elementos([lista_modales.armas_naturales]); // Despliega el modal armas naturales
};
// El boton especial del modal armas naturales debe desplegar el modal armas marciales
lista_modales.armas_naturales.btn_especial.evento_click = () => {
    ocultar_elementos([lista_modales.armas_naturales]); // Oculta el modal armas naturales
    mostrar_elementos([lista_modales.armas_marciales]); // Despliega el modal armas marciales
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
// Los botones del modal armas marciales y armas naturales deben cambiar el arma en el slot seleccionado del personaje seleccionado.
lista_modales.armas_marciales.btn_grales
    .concat(lista_modales.armas_naturales.btn_grales)
    .forEach((btn) => {
        // Cambia el evento click de cada boton el en modal.
        btn.evento_click = () => {
            // Obtiene el personaje actual.
            const pers_actual = obtener_personaje();
            // Obtiene el nombre del nuevo arma.
            const nombre_arma_nuevo = btn.id.slice(0, -4);

            // Cambia el arma del personaje seleccionado.
            pers_actual.pers.conf_arma(obtener_slot_arma(), nombre_arma_nuevo);

            // Muestra los cambios.
            mostrar_personaje(pers_actual.pers);

            // Cierra ambos modales.
            ocultar_elementos([lista_modales.armas_marciales, lista_modales.armas_naturales]);

            // Cambia a modo "jugar".
            cambiar_modo();
        };
    });
// TODO: Los botones del modal de equipamiento deben cambiar el slot del personaje seleccionado.
// TODO: El boton especial del modal de avatares y esbirros debe crear un nuevo personaje.
// TODO: El boton especial del modal de equipamiento debe reestaurar el slot especificado.

// * EVENTOS.
// Evento portada
ELEMENTOS.portada_btn.evento_click = () => {
    // TODO: Logica para desplegar modal de esbirros.
    // Despliega el modal avatares si esta en modo "editar"
    if (obtener_modo() === "editar") {
        mostrar_elementos([lista_modales.avatares]); 
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
        mostrar_elementos([formulario]); // Muestra el formulario.
    }
    // De lo contrario muestra la descripción del personaje.
    else {
        contenido_consola(obtener_personaje().pers.descripcion); // Cambia el contenido de la consola.
    }
};
// TODO: Evento esbirro
// Evento consola.
ELEMENTOS.consola_btn.evento_click = () => limpiar_consola(true);
// Evento atributos.
// FIXME: Cuando cambio de atributo los direccionales no deben desaparecer.
for (const atributo in atributos_personajes) {
    ELEMENTOS[`${atributo}_btn`].evento_click = () => {
        const pers_actual = obtener_personaje();

        mostrar_atributo(pers_actual.pers, atributo);
        // Si esta en modo "editar" muestra los direccionales arriba y abajo.
        if (obtener_modo() === "editar") {
            condicionar_direccionales_arriba_abajo(
                pers_actual.pers,
                atributo,
                true
            );
            mostrar_elementos([ELEMENTOS.cnt_arriba_abajo]);
        } else if (
            atributo === "vida" ||
            (atributo === "poder" && obtener_modo() === "jugar")
        ) {
            condicionar_direccionales_arriba_abajo(
                pers_actual.pers,
                atributo,
                true
            );
            mostrar_elementos([ELEMENTOS.cnt_arriba_abajo]);
        }
    };
}

for (let i = 1; i <= 3; i++) {
    // Evento btns equipamiento
    ELEMENTOS[`equipo${i}_btn`].evento_click = () => {
        // Si esta en modo "editar" muestra el modal de equipamiento.
        if (obtener_modo() === "editar") mostrar_elementos(lista_modales.equipos);
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
            mostrar_elementos([formulario]);
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
            if (obtener_modo() === "editar") {
                mostrar_elementos([lista_modales.armas_marciales]); // Muestra el modal.
                slot_arma = i; // Cambia el slot de arma seleccionada.
            }
            // De lo contrario muestra la descripción del arma.
            else
                contenido_consola(
                    obtener_personaje().pers[`arma${i}`].descripcion
                );
        };
    });
}

import { Modal } from "./UImodels.js";
import { ELEMENTOS, MAIN } from "./inicializador.js";
import { lista_modales, formulario } from "./UIhelpers.js";
import {
    cambiar_modo,
    obtener_exp,
    obtener_modo,
    obtener_personaje,
} from "../juego.js";
import {
    cambiar_personaje,
    condicionar_direccionales_arriba_abajo,
    condicionar_formulario,
    contenido_consola,
    crear_nuevo_pj,
    limpiar_consola,
    mostrar_atributo,
    mostrar_atributo_actual,
    cambiar_mostrado,
    mostrar_esbirros,
    mostrar_personaje,
    navegar_esbirros,
    limpiar_UI,
    condicionar_accion,
    señalar_arma,
    señalar_atributo,
    señalar_habilidad,
} from "./UIcontrollers.js";
import { atributos_simple } from "../helpers.js";

// * VARIABLES.
/**
 * Arma seleccionada
 * @type {number}
 * @var
 */
let slot_arma = 1;

/**
 * Equipo seleccionado
 * @type {number}
 * @var
 */
let slot_equipo = 1;

/**
 * Slot de la habilidad seleccionada
 * @type {number}
 * @var
 */
let slot_habilidad = 1;

// * HELPERS.
/**
 * Obtiene el slot de la arma seleccionada.
 * @returns {number} Slot de la arma seleccionada.
 */
export function obtener_slot_arma() {
    return slot_arma;
}

/**
 * Obtiene el slot del equipo seleccionado.
 * @returns {number} Slot del equipo seleccionado.
 */
export function obtener_slot_equipo() {
    return slot_equipo;
}

/**
 * Obtiene el slot de la habilidad seleccionada.
 * @returns {number} Slot de la habilidad seleccionada.
 */
export function obtener_slot_habilidad() {
    return slot_habilidad;
}

// * AGREGADO DE ELEMENTOS.
// Agrega los modales al main.
for (const modal in lista_modales) {
    MAIN.appendChild(lista_modales[modal].elemento);
}
// Agrega el formulario al main
MAIN.appendChild(formulario.elemento);

// * CONFIGURACIONES.
// El indicador de experiencia tiene por default display="flex".
ELEMENTOS.exp_txt.tipo_display = "flex";
// Agrega el cambio de modo al boton cerrar de cada modal
Modal.evento_btn_cerrar = () => {
    limpiar_UI();
    cambiar_modo("jugar");
};
// El contenedor de direccionales arriba/abajo por default tiene display="flex".
ELEMENTOS.cnt_arriba_abajo.tipo_display = "flex";
// Desactiva el evento click del contenedor de direccionales arriba/abajo.
ELEMENTOS.cnt_arriba_abajo.desactivar_evento_click();
// El boton especial del modal armas marciales debe desplegar el modal armas naturales
lista_modales.armas_marciales.btn_especial.evento_click = () => {
    cambiar_mostrado([lista_modales.armas_naturales]);
};
// El boton especial del modal armas naturales debe desplegar el modal armas marciales
lista_modales.armas_naturales.btn_especial.evento_click = () => {
    cambiar_mostrado([lista_modales.armas_marciales]);
};
// Los botones del modal avatares deben cambiar al personaje seleccionado.
lista_modales.avatares.btn_grales
    .concat(lista_modales.esbirros.btn_grales)
    .forEach((btn) => {
        // Cambia el evento click de cada boton el en modal.
        btn.evento_click = () => {
            // Obtiene el personaje actual.
            const pers_actual = obtener_personaje();
            // Obtiene el nombre del nuevo personaje.
            const nombre_pers_nuevo = btn.id.slice(0, -4);

            // Si el personaje actual es un esbirro.
            if (pers_actual.i > 0) {
                // Cambia el personaje a un esbirro con el nuevo nombre.
                cambiar_personaje(
                    pers_actual.pers,
                    nombre_pers_nuevo,
                    "esbirros"
                );
            } else {
                // Cambia el personaje a un avatar con el nuevo nombre.
                cambiar_personaje(
                    pers_actual.pers,
                    nombre_pers_nuevo,
                    "avatares"
                );
            }

            // Muestra el nuevo personaje y su descripción por consola.
            mostrar_personaje(pers_actual.pers, true);

            // Cierra el modal correspondiente.
            if (lista_modales.avatares.mostrar)
                lista_modales.avatares.btn_cerrar.elemento.click();
            else lista_modales.esbirros.btn_cerrar.elemento.click();
        };
    });
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

            // Cierra el modal correspondiente.
            if (lista_modales.armas_marciales.mostrar)
                lista_modales.armas_marciales.btn_cerrar.elemento.click();
            else lista_modales.armas_naturales.btn_cerrar.elemento.click();
        };
    });
// Los botones del modal de equipamiento cambian un slot de equipamiento del personaje seleccionado.
lista_modales.equipos.btn_grales.forEach((btn) => {
    btn.evento_click = () => {
        const pers_actual = obtener_personaje();
        const nombre_equipo_nuevo = btn.id.slice(0, -4);

        pers_actual.pers.conf_equipamiento(
            obtener_slot_equipo(),
            nombre_equipo_nuevo
        );

        mostrar_personaje(pers_actual.pers, false);
        lista_modales.equipos.btn_cerrar.elemento.click();
    };
});
// El boton especial del modal de avatares crea un nuevo personaje.
lista_modales.avatares.btn_especial.evento_click = () => {
    const pers_actual = obtener_personaje();
    crear_nuevo_pj(pers_actual.pers, true);
};
// El boton especial del modal de esbirros crea un nuevo personaje.
lista_modales.esbirros.btn_especial.evento_click = () => {
    const pers_actual = obtener_personaje();
    crear_nuevo_pj(pers_actual.pers, false);
};
// El boton especial del modal de equipamiento restaura el slot especificado.
lista_modales.equipos.btn_especial.evento_click = () => {
    const pers_actual = obtener_personaje(); // Obtiene el personaje actual
    pers_actual.pers.conf_equipamiento(obtener_slot_equipo(), "nada"); // Configura el equipamiento del personaje actual a "nada" para el espacio de equipamiento seleccionado
    lista_modales.equipos.btn_cerrar.elemento.click(); // Oculta el modal y cambia a modo "jugar".
    mostrar_personaje(pers_actual.pers); // Muestra la información actualizada del personaje
};

// * EVENTOS.
// Evento portada
ELEMENTOS.portada_btn.evento_click = () => {
    // Despliega el modal avatares si esta en modo "editar"
    if (obtener_modo() === "editar") {
        // Si se trata de un esbirro, despliega el modal de esbirros.
        if (obtener_personaje().i > 0)
            cambiar_mostrado([lista_modales.esbirros]);
        // De lo contrario despliega el modal avatares.
        else cambiar_mostrado([lista_modales.avatares]);
    }
    // De lo contrario.
    else {
        // Si se trata de un esbirro, muestra los botones de direccionales.
        if (obtener_personaje().i > 0 && !ELEMENTOS.izquierda_btn.mostrar) {
            cambiar_mostrado([ELEMENTOS.izquierda_btn, ELEMENTOS.derecha_btn]);
        }
        // Los oculta.
        else {
            ELEMENTOS.izquierda_btn.mostrar_ocultar(false);
            ELEMENTOS.derecha_btn.mostrar_ocultar(false);
        }
    }
};
// Evento exp
ELEMENTOS.exp_btn.evento_click = () => {
    // Si se trata del modo "editar"
    // condiciona el formulario para modificar la experiencia.
    if (obtener_modo() === "editar") {
        const pers_actual = obtener_personaje();
        // Condicionar formulario
        condicionar_formulario(formulario, pers_actual.pers, "exp");
        // Mostrar formulario
        cambiar_mostrado([formulario]);
    }
    // De lo contrario muestra la experiencia actual.
    else contenido_consola(`Experiencia: ${obtener_exp()}`, true);
};
// Evento btn editar
ELEMENTOS.editar_btn.evento_click = () => {
    cambiar_modo("", true);
};
// Evento btn nombre
ELEMENTOS.nombre_btn.evento_click = () => {
    const pers_actual = obtener_personaje();
    // Si esta en modo "editar" condiciona el formulario para cambio de nombre de personaje.
    if (obtener_modo() === "editar") {
        condicionar_formulario(formulario, pers_actual.pers, "nombre"); // Condiciona el formulario.
        cambiar_mostrado([formulario]); // Muestra el formulario.
    }
    // De lo contrario muestra la descripción del personaje.
    else {
        contenido_consola(obtener_personaje().pers.descripcion, true); // Cambia el contenido de la consola.
    }
};
// Evento esbirro
ELEMENTOS.esbirros_btn.evento_click = () => {
    mostrar_esbirros(obtener_personaje().i);
    cambiar_modo("jugar", true);
};
// Evento consola.
ELEMENTOS.consola_btn.evento_click = () => {
    // Si esta en modo "editar" condiciona el formulario para ingreso de comandos.
    if (obtener_modo() === "editar") {
        const pers_actual = obtener_personaje(); // Obtiene el personaje actual.
        condicionar_formulario(formulario, pers_actual.pers, "comando"); // Condiciona el formulario.
        cambiar_mostrado([formulario]); // Muestra el formulario.
    }
    // De lo contrario limpia consola.
    else limpiar_consola(true);
};
// Evento direccionales izquierda/derecha.
ELEMENTOS.izquierda_btn.evento_click = () =>
    navegar_esbirros(obtener_personaje().i, "izquierda");
ELEMENTOS.derecha_btn.evento_click = () =>
    navegar_esbirros(obtener_personaje().i, "derecha");

// Evento atributos.
for (const atributo in atributos_simple) {
    ELEMENTOS[`${atributo}_btn`].evento_click = () => {
        // TODO: Señalar atributo.
        señalar_atributo(atributo, false);
        // TODO: Eliminar seña de arma y habilidad.
        señalar_arma(1, true);
        señalar_habilidad(1, true);

        const pers_actual = obtener_personaje(); // Obtiene el personaje actual.

        condicionar_accion({
            pers: pers_actual.pers,
            objeto: "atributo",
            atributo,
        });

        // Si esta en modo "editar" muestra los direccionales arriba y abajo.
        if (obtener_modo() === "editar") {
            condicionar_direccionales_arriba_abajo(
                pers_actual.pers,
                atributo,
                true
            ); // Condiciona para edición de atributos simple.
            mostrar_atributo(pers_actual.pers, atributo, true); // Muestra el valor del atributo simple.
            cambiar_mostrado([ELEMENTOS.cnt_arriba_abajo]); // Muestra los direccionales arriba y abajo.
        }
        // Caso contrario, si esta en modo jugar y se trata de los atributos vida y poder (vida_actual, poder_actual).
        else if (
            (atributo === "vida" || atributo === "poder") &&
            obtener_modo() === "jugar"
        ) {
            condicionar_direccionales_arriba_abajo(
                pers_actual.pers,
                atributo,
                false
            ); // Condiciona para edición de vida_actual y poder_actual.
            cambiar_mostrado([ELEMENTOS.cnt_arriba_abajo]); // Muestra los direccionales arriba y abajo.
            mostrar_atributo_actual(pers_actual.pers, atributo); // Muestra el valor de vida_actual y poder_actual.
        }
        // De lo contrario oculta los direccionales arriba y abajo.
        else {
            // ELEMENTOS.cnt_arriba_abajo.mostrar_ocultar(false); // Oculta los direccionales arriba y abajo.
            mostrar_atributo(pers_actual.pers, atributo, true); // Muestra el valor del atributo simple.
        }
    };
}

for (let i = 1; i <= 3; i++) {
    // Evento btns equipamiento
    ELEMENTOS[`equipo${i}_btn`].evento_click = () => {
        // Cambia el slot de equipo seleccionado.
        slot_equipo = i;

        // Si esta en modo "editar" muestra el modal de equipamiento.
        if (obtener_modo() === "editar")
            cambiar_mostrado([lista_modales.equipos]);
        // De lo contrario muestra la descripción del slot.
        else
            contenido_consola(
                obtener_personaje().pers[`equipo${i}`].descripcion,
                true
            );
    };

    // Evento habilidades
    ELEMENTOS[`habilidad${i}_btn`].evento_click = () => {
        // Cambia el slot de habilidad seleccionada.
        slot_habilidad = i;
        // TODO: Señalar habilidad.
        señalar_habilidad(i, false);
        // TODO: Eliminar seña de atributo.
        señalar_atributo("ataque", true);

        const pers_actual = obtener_personaje();

        condicionar_accion({
            pers: pers_actual.pers,
            objeto: "habilidad",
            s_arma: obtener_slot_arma(),
            s_habilidad: i,
        });

        // Si esta en modo "editar" condiciona el formulario para cambio de habilidad.
        if (obtener_modo() === "editar") {
            condicionar_formulario(
                formulario,
                pers_actual.pers,
                "habilidad",
                i
            );
            cambiar_mostrado([formulario]);
        }
        // De lo contrario muestra la descripción de la habilidad.
        else {
            contenido_consola(
                pers_actual.pers[`habilidad${i}`].descripcion,
                true
            );
        }
    };
}

// Evento accion.

// Evento btns armas
for (let i = 1; i <= 2; i++) {
    ELEMENTOS[`arma${i}_btn`].forEach((boton) => {
        boton.evento_click = () => {
            // TODO: Señalar arma.
            señalar_arma(i, false);
            // TODO: Eliminar seña de atributo.
            señalar_atributo("ataque", true);
            señalar_habilidad(1, true);

            const pers_actual = obtener_personaje();

            condicionar_accion({
                pers: pers_actual.pers,
                objeto: "arma",
                s_arma: obtener_slot_arma(),
            });
            // Si esta en modo "editar" muestra el modal armas marciales.
            if (obtener_modo() === "editar") {
                cambiar_mostrado([lista_modales.armas_marciales]); // Muestra el modal.
                slot_arma = i; // Cambia el slot de arma seleccionada.
            }
            // De lo contrario muestra la descripción del arma.
            else
                contenido_consola(
                    obtener_personaje().pers[`arma${i}`].descripcion,
                    true
                );
        };
    });
}

import {
    consolaBtn,
    atributos_btn,
    portadaBtn,
    nombreBtn,
    arma1Btn,
    arma2Btn,
    habilidades_btn,
    ELEMENTOS,
} from "./inicializador.js";
import ElementoHTML, { Formulario } from "./UImodels.js";

import { cap_primera, quitar_acentos } from "./../helpers.js";

import Personaje from "../personajes/personajesModelos.js";
import { coleccion_personajes } from "../colecciones/coleccionPersonajes.js";
import { coleccion_habilidades } from "../colecciones/coleccionHabilidades.js";

import {
    cambiar_modo,
    indice_personajes,
    modificar_exp,
    obtener_exp,
    obtener_personaje,
    personajes,
} from "../juego.js";
import { formulario, lista_modales } from "./UIhelpers.js";

/**
 * Contiene el elemento que se esta mostrando.
 * @type {ElementoHTML[]}
 * @const
 */
export let elemento_mostrado = [];

/**
 * Cambia el/los elementos mostrados por otro/otros.
 * @param {ElementoHTML[]} list_ocultos - La lista con los elementos que se desean mostrar.
 */
export function cambiar_mostrado(list_ocultos) {
    limpiar_UI(); // Oculta los actuales.

    let oculto = list_ocultos.pop(); // Extrae uno de los ocultos.
    while (oculto) {
        oculto.mostrar_ocultar(true); // Lo muestra.
        elemento_mostrado.push(oculto); // Lo guarda.
        oculto = list_ocultos.pop(); // Extrae el siguiente.
    }
}

// TODO: Reemplazar todas las llamadas del metodo `mostrar_ocultar` por esta función.
/**
 * Oculta los elementos que se estan mostrando.
 */
export function limpiar_UI() {
    // Oculta y elimina actuales.
    if (elemento_mostrado.length > 0) {
        let mostrado = elemento_mostrado.pop(); // Extrae un elemento.
        while (mostrado) {
            mostrado.mostrar_ocultar(false); // Lo oculta.
            mostrado = elemento_mostrado.pop(); // Extrae el siguiente
        }
    }
}

/**
 * Muestra un elemento y oculta los demas.
 * @param {ElementoHTML[]} oculto - El elemento que se quiere mostrar.
 */
export function mostrar_elemento(oculto) {
    /**
     * Elemento que se esta mostrando.
     * @type {ElementoHTML}
     */
    const mostrado = elemento_mostrado.pop();

    if (mostrado === undefined) {
        if (oculto instanceof Array) {
            for (const el of oculto) el.mostrar_ocultar(true);
        } else oculto.mostrar_ocultar(true);
        elemento_mostrado.push(oculto);
    } else {
        if (mostrado instanceof Array) {
            for (const el of mostrado) el.mostrar_ocultar(false);
        } else mostrado.mostrar_ocultar(false);

        if (oculto instanceof Array) {
            for (const el of oculto) el.mostrar_ocultar(true);
        } else oculto.mostrar_ocultar(true);
        elemento_mostrado.push(oculto);
    }
}

/**
 * Condiciona los direccionales arriba y abajo
 * @param {Personaje} personaje - El personaje actual.
 * @param {string} atributo - El nombre del atributo.
 * @param {boolean} modo - El modo de direccionamiento (true: full, false: actual).
 */
export function condicionar_direccionales_arriba_abajo(
    personaje,
    atributo,
    modo
) {
    // Obtiene los botones de direccionamiento.
    const [arriba, abajo] = [ELEMENTOS.arriba_btn, ELEMENTOS.abajo_btn];

    // Funcion general para condicionar los direccionales.
    const general = () => {
        mostrar_personaje(personaje);
        modo
            ? mostrar_atributo(personaje, atributo)
            : mostrar_atributo_actual(personaje, atributo);
    };

    // Evento direccional arriba
    const evento_arriba = () => {
        let salida;
        // Si se trata de un atributo simple.
        if (modo) {
            // Guarda el resultado de la operación.
            salida = personaje.modificar_atributo(atributo, true);
        }
        // Si se trata de vida_actual o poder_actual.
        else personaje.modificar_atributo_actual(atributo, true);

        general();

        // Si la operación resulto fallida, significa que no hubo exp suficiente.
        if (!salida) contenido_consola("Experiencia insuficiente.");
    };
    // Evento direccional abajo
    const evento_abajo = () => {
        modo
            ? // `true` se trata de un atributo simple.
              personaje.modificar_atributo(atributo, false)
            : // `false` se trata o de vida_actual o de poder_actual.
              personaje.modificar_atributo_actual(atributo, false);
        general();
    };

    // Asigna los nuevos eventos.
    arriba.evento_click = evento_arriba;
    abajo.evento_click = evento_abajo;
}

/**
 * Cambia el contenido de la pagina para reflejar los cambios en el personaje seleccionado.
 * @param {Personaje} personaje - El personaje a mostrar.
 */
export function mostrar_personaje(personaje, cambiar_consola = false) {
    // * Experiencia
    ELEMENTOS.exp_txt.elemento.textContent = obtener_exp();

    // * Atributos
    for (const atributo in atributos_btn) {
        // Boton del atributo
        const boton = document.querySelector(`#${atributo}Btn`);
        // Es span que muestra el valor
        const span = boton.children[1].children[0];

        let contenido = "";
        // Si se trata de vida o poder, muestra la vida_actual y poder_actual.
        if (atributo === "vida" || atributo === "poder")
            contenido = personaje.atributos[`${atributo}_actual`];
        // Caso contrario el atributo simple.
        else contenido = personaje.ttal_atributo(atributo);

        // Actualiza el valor del span
        span.textContent = contenido;
    }

    // * Portada
    const portada = portadaBtn.childNodes[0];
    portada.src = personaje.portada;

    // * Descripción
    if (cambiar_consola) contenido_consola(personaje.descripcion);

    // * Nombre
    nombreBtn.children[0].textContent = personaje.nombre.toUpperCase();

    // * Arma 1
    arma1Btn[0].children[0].src = personaje.arma1.icono; // Icono
    arma1Btn[1].children[0].textContent = cap_primera(personaje.arma1.nombre); // Nombre

    // * Arma 2
    arma2Btn[0].children[0].src = personaje.arma2.icono; // Icono
    arma2Btn[1].children[0].textContent = cap_primera(personaje.arma2.nombre); // Nombre

    // * Habilidades
    for (const habilidad in habilidades_btn) {
        const span = habilidades_btn[habilidad].children[0];

        span.textContent = personaje[habilidad].nombre.toUpperCase();
    }

    // * Equipamiento
    for (let i = 1; i <= 3; i++) {
        /**
         * @type {HTMLElement[]}
         */
        const el = ELEMENTOS[`equipo${i}_btn`].elemento.children;

        el[0].children[0].src = personaje[`equipo${i}`].icono;
        el[1].children[0].textContent = personaje[`equipo${i}`].nivel;
    }
}

/**
 * Cambia el contenido de la consola.
 * @param {string} texto - El nuevo texto.
 */
export function contenido_consola(texto) {
    // Convierte a string y capitaliza la primera letra.
    consolaBtn.innerHTML = cap_primera(String(texto));
}

/**
 * Condiciona un formulario para diferentes tipos de ingresos.
 * @param {Formulario} form - El formulario a condicionar.
 * @param {Personaje} personaje - El personaje sobre el cual se van a realizar cambios.
 * @param {string} modo - El modo del formulario (comando, habilidad, nombre).
 * @param {number} slot - (Si es una habilidad) El slot de habilidad que se quiere cambiar.
 */
export function condicionar_formulario(form, personaje, modo, slot = 1) {
    let nueva_funcion;
    let tipo = "text";
    switch (modo) {
        case "nombre":
            form.encabezado = "nombre";
            // Función para cambio de nombre.
            nueva_funcion = (nombre) => (personaje.nombre = nombre);
            break;
        case "comando":
            form.encabezado = "comando";
            // Función para ingreso de comandos.
            nueva_funcion = (text) => comandos(text);
            break;
        case "habilidad":
            form.encabezado = "habilidad";
            // Función para cambio de habilidades.
            nueva_funcion = (nombre) =>
                personaje[`habilidad${slot}`].actualizar(
                    cambiar_habilidad(nombre)
                );
            break;
        case "exp":
            form.encabezado = "experiencia";
            // Función para modificar la experiencia.
            nueva_funcion = (valor) => modificar_exp(Number(valor));
            tipo = "number";
        default:
            break;
    }

    form.tipo_formulario = tipo;

    form.funcion_ingreso = (str) => {
        nueva_funcion(str); // Ejecuta la nueva función de ingreso.

        // ocultar_elementos([form]); // Oculta el modal.
        form.mostrar_ocultar(false);

        mostrar_personaje(personaje); // Muestra los cambios en el personaje.

        cambiar_modo(); // Cambia a modo "jugar".
    };
}

/**
 * Cambia un personaje por otro.
 * @param {Personaje} actual - El personaje a cambiar.
 * @param {string} nuevo - El nombre del nuevo.
 * @param {string} tipo - El tipo del personaje (`esbirros` o `avatares`)
 */
export function cambiar_personaje(actual, nuevo, tipo) {
    // Obtiene el objeto con la información del nuevo personaje.
    const obj_nuevo_pers = coleccion_personajes[tipo][nuevo];
    // Usa el metodo para actualizar la instancia del personaje que se quiere cambiar.
    actual.actualizar(obj_nuevo_pers);
}

/**
 * Muestra los esbirros ó el personaje principal.
 * @param {number} indice - El indice del personaje actual.
 */
export function mostrar_esbirros(indice = 0) {
    limpiar_UI(); // Oculta los actuales.
    cambiar_modo("jugar"); // Cambia a modo "jugar".

    // Si se trata de un esbirro.
    if (indice > 0) indice_personajes.actual = 0;
    // Si se trata de el personaje principal.
    else indice_personajes.actual = indice_personajes.esbirro;

    // Cambia el personaje actual.
    mostrar_personaje(personajes[indice_personajes.actual], true);
}

/**
 * Navega entre los esbirros.
 * @param {number} indice - El indice del personaje actual.
 * @param {string} direccion - La dirección a la que se quiere navegar.
 */
export function navegar_esbirros(indice, direccion) {
    switch (direccion) {
        case "izquierda":
            // Excepción para el primer esbirro.
            if (indice === 1) indice_personajes.esbirro = personajes.length - 1;
            else indice_personajes.esbirro--;
            break;
        case "derecha":
            // Excepción para el ultimo esbirro.
            if (indice === personajes.length - 1) indice_personajes.esbirro = 1;
            else indice_personajes.esbirro++;
            break;
        default:
            break;
    }

    indice_personajes.actual = indice_personajes.esbirro; // Actualiza el indice del esbirro actual.
    mostrar_personaje(personajes[indice_personajes.actual], true); // Muestra el personaje.
}

/**
 *
 * @param {string} nombre - El nombre de la nueva habilidad.
 * @returns {Object} El objeto con la información de la nueva habilidad.
 */
export function cambiar_habilidad(nombre) {
    const habi_nombre = quitar_acentos(nombre).toLowerCase(); // Filtra el nombre
    const habi_nueva = coleccion_habilidades[habi_nombre]; // Accede al objeto

    if (habi_nueva) return habi_nueva;
}

/**
 * Muestra el valor de un atributo.
 * @param {Personaje} personaje - El personaje actual.
 * @param {string} atributo - El nombre del atributo a mostrar.
 */
export function mostrar_atributo(personaje, atributo) {
    const valor = personaje.ttal_atributo(atributo);
    contenido_consola(`${cap_primera(atributo)}: ${valor}`);
}

/**
 * Muestra el valor de un atributo actual.
 * @param {Personaje} personaje - El personaje actual.
 * @param {string} atributo - El nombre del atributo a mostrar (vida o poder).
 */
export function mostrar_atributo_actual(personaje, atributo) {
    const valor = personaje.ttal_atributo(atributo);
    contenido_consola(
        `${cap_primera(atributo)}: ${
            personaje.atributos[atributo + "_actual"]
        }/${valor}`
    );
}

/**
 * Limpia la consola y oculta todos los elementos que se estan mostrando.
 * @param {boolean} cambio_modo - Indica si se debe cambiar a modo "jugar".
 */
export function limpiar_consola(cambio_modo = false) {
    contenido_consola("consola"); // Reestaura el texto mostrado

    if (cambio_modo) cambiar_modo("jugar"); // Cambia a modo "jugar".
}

/**
 * Administrador de comandos del juego.
 * @param {string} comando - El comando a procesar.
 */
export function comandos(comando = "") {
    const pers_actual = obtener_personaje(); // Obtiene el personaje actual.

    // Si el comando es el nombre de un personaje de la colección.
    // Realiza un cambio de personaje.
    if (
        coleccion_personajes.avatares[comando] ||
        coleccion_personajes.esbirros[comando]
    ) {
        const tipo = coleccion_personajes.avatares[comando]
            ? "avatares"
            : "esbirros";
        cambiar_personaje(pers_actual.pers, comando, tipo);
    }
}

/**
 *
 * @param {Personaje} personaje - El personaje actual.
 * @param {boolean} opcion - Opcion del boton `true`: avatar y `false`: esbirro.
 */
export function crear_nuevo_pj(personaje, opcion) {
    cambiar_personaje(
        personaje,
        opcion ? "nuevo_avatar" : "nuevo_esbirro",
        opcion ? "avatares" : "esbirros"
    ); // Cambia el personaje actual.

    modificar_exp(200, true); // Reemplaza el exp por 200.
    mostrar_personaje(personaje, false); // Muestra los cambios.
    cambiar_modo("jugar", true); // Cambia a modo "jugar".
}

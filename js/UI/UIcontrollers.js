import {
    consolaBtn,
    atributos_btn,
    portadaBtn,
    nombreBtn,
    arma1Btn,
    arma2Btn,
    habilidades_btn,
    ELEMENTOS,
    input_imagen,
} from "./inicializador.js";
import ElementoHTML, { Formulario } from "./UImodels.js";

import {
    atributos_simple,
    cap_primera,
    dado,
    quitar_acentos,
} from "./../helpers.js";

import Personaje from "../personajes/personajesModelos.js";
import { coleccion_personajes } from "../colecciones/coleccionPersonajes.js";
import { coleccion_habilidades } from "../colecciones/coleccionHabilidades.js";

import {
    cambiar_modo,
    indice_personajes,
    mochila,
    modificar_exp,
    obtener_exp,
    obtener_personaje,
    personajes,
} from "../juego.js";
import Arma from "../personajes/armasModelos.js";
import Habilidad from "../personajes/habilidadesModelo.js";
import { coleccion_equipos } from "../colecciones/coleccionEquipamiento.js";
// import { accion_arma, accion_atributo, accion_full } from "./../personajes/personajesUtils.js";

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
        mostrar_personaje(personaje, false);
        modo
            ? mostrar_atributo(personaje, atributo, false)
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

        // Si la operación resulto fallida y es modo "full", significa que no hubo exp suficiente.
        if (!salida && modo) contenido_consola("Experiencia insuficiente.");
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
 * @param {boolean} limpiar - Opción para limpiar el UI.
 */
export function contenido_consola(texto, limpiar = false) {
    // Convierte a string y capitaliza la primera letra.
    consolaBtn.innerHTML = String(texto);
    if (limpiar) limpiar_UI();
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
            break;
        case "item":
            form.encabezado = "item";
            // Función para modificar los items de la mochila.
            nueva_funcion = (valor) => mochila.cambiar_item(valor, slot);
            break;
        default:
            break;
    }

    form.tipo_formulario = tipo;

    form.funcion_ingreso = (str) => {
        nueva_funcion(str); // Ejecuta la nueva función de ingreso.

        form.mostrar_ocultar(false); // Oculta el modal.

        mostrar_personaje(personaje); // Muestra los cambios en el personaje.

        cambiar_modo("jugar"); // Cambia a modo "jugar".
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
 * @param {boolean} limpiar - Indica si se debe limpiar la consola.
 */
export function mostrar_atributo(personaje, atributo, limpiar = false) {
    const valor = personaje.ttal_atributo(atributo);
    contenido_consola(`${cap_primera(atributo)}: ${valor}`, limpiar);
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
    const personaje_actual = obtener_personaje();
    /**
     * @type {Personaje}
     */
    const pers_actual = personaje_actual.pers;
    /**
     * @type {number}
     */
    const indice_personaje_actual = personaje_actual.i;

    // Si el comando es el nombre de un personaje de la colección.
    // Realiza un cambio de personaje.
    if (
        coleccion_personajes.avatares[comando] ||
        coleccion_personajes.esbirros[comando]
    ) {
        const tipo = coleccion_personajes.avatares[comando]
            ? "avatares"
            : "esbirros";
        cambiar_personaje(pers_actual, comando, tipo);
    }
    // Comando para cambiar la portada de un personaje por una imagen cualquiera.
    if (comando === ".imagen") input_imagen.click();
    // Rellena la vida y poder actual del personaje
    if (comando === "/full") {
        pers_actual.actualizar_atributos_actuales();
        mostrar_personaje(pers_actual);
    }
    // Reestaura todos los personajes.
    if (comando === "/reload") {
        personajes.forEach((personaje, index) => {
            if (index === 0)
                personaje.reestaurar(
                    "bienvenido",
                    "consola",
                    "img/logo-meeple-combat.png"
                );
            else
                personaje.reestaurar(
                    `esbirro ${index}`,
                    "sin descripción.",
                    `img/e${index}.png`
                );
        });
    }
    // Reencarna el personaje en otro de forma aleatoria.
    if (comando === "/reencarnar") {
        const lista_avatares = Object.keys(coleccion_personajes.avatares);
        const lista_esbirros = Object.keys(coleccion_personajes.esbirros);

        let indice_reencarnacion =
            indice_personaje_actual === 0
                ? Math.floor(Math.random() * lista_avatares.length)
                : Math.floor(Math.random() * lista_esbirros.length);

        let personaje_nuevo =
            indice_personaje_actual === 0
                ? lista_avatares[indice_reencarnacion]
                : lista_esbirros[indice_reencarnacion];

        cambiar_personaje(
            pers_actual,
            personaje_nuevo,
            indice_personaje_actual === 0 ? "avatares" : "esbirros"
        );
    }
    // Lotea de forma aleatoria un item de equipamiento.
    if (comando === "/loot") {
        const lista_equipos = Object.keys(coleccion_equipos);
        const item =
            lista_equipos[Math.floor(Math.random * lista_equipos.length)];

        contenido_consola(`Loot = ${coleccion_equipos[item].nombre}`);
    }
    // Cambia las armas del personaje.
    if (comando === "/licantropo") {
        pers_actual.conf_arma(1, "mordisco");
        pers_actual.conf_arma(2, "garras");

        mostrar_personaje(pers_actual);
    }
    // Muestra la version del juego.
    if (comando === "/version") {
        contenido_consola("VERSION 2.5.0 A");
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

/**
 * Condiciona el boton de acción.
 * @param {Object} pars - El objeto con los parametros de la función.
 * @param {Personaje} pars.pers - El personaje actual.
 * @param {Number} pars.s_arma - El slot de el arma seleccionada.
 * @param {Number} pars.s_habilidad - El slot de el habilidad seleccionada.
 * @param {string} pars.atributo - El nombre del atributo seleccionado.
 */
export function condicionar_accion({
    pers,
    objeto,
    s_arma,
    s_habilidad,
    atributo,
}) {
    cambiar_btn_accion("atacar");

    let evento = () => {};

    switch (objeto) {
        case "atributo":
            switch (atributo) {
                case "ataque":
                    cambiar_btn_accion("atacar");
                    break;
                case "esquiva":
                    cambiar_btn_accion("esquivar");
                    break;
                case "bloqueo":
                    cambiar_btn_accion("bloquear");
                    break;
                case "velocidad":
                    cambiar_btn_accion("correr");
                    break;
                default:
                    cambiar_btn_accion("accion");
                    break;
            }

            evento = () => accion_atributo(pers, atributo);

            break;
        case "arma":
            // Condicionar para armas.
            evento = () => accion_arma(pers, s_arma);
            break;
        case "habilidad":
            // Condicionar para habilidad.
            evento = () => accion_full(pers, s_arma, s_habilidad);
            break;
        default:
            break;
    }

    ELEMENTOS.accion_btn.evento_click = () => {
        limpiar_UI();
        evento();
    };
}

/**
 * Cambia el texto del boton acción.
 * @param {string} txt - El nuevo texto.
 */
function cambiar_btn_accion(txt) {
    ELEMENTOS.accion_btn.elemento.children[0].textContent = txt.toUpperCase();
}

/**
 * Realiza una accion combinada con un arma y una habilidad.
 * @param {Personaje} pers - El personaje actual.
 * @param {number} s_arma - El slot del arma seleccionada.
 * @param {number} s_habilidad - El slot del habilidad seleccionada.
 */
export function accion_full(pers, s_arma, s_habilidad) {
    const val_dado = dado();
    /**
     * @type {Arma}
     */
    const arma = pers[`arma${s_arma}`];
    /**
     * @type {Habilidad}
     */
    const habilidad = pers[`habilidad${s_habilidad}`];
    if (pers.atributos.poder_actual < habilidad.coste) {
        contenido_consola("Poder insuficiente.");
    } else {
        let text = evaluar_dado({
            header: `Lanzas ${cap_primera(habilidad.nombre)} con ${cap_primera(
                arma.nombre
            )}`,
            val_dado,
            val_obj: arma.danno * habilidad.coste * pers.atributos.ataque,
            tail: "Daño base",
        });

        contenido_consola(text);

        // Si el arma es mecanomagica se reduce el poder.
        if (arma.tipo === "mecanomagica") {
            pers.modificar_atributo_actual("poder", false, arma.coste);
        }

        // Decrementa el poder en base al coste de la habilidad
        pers.modificar_atributo_actual("poder", false, habilidad.coste);
        mostrar_personaje(pers, false);
    }
}

/**
 * Realiza una accion con un arma.
 * @param {Personaje} pers - El personaje actual.
 * @param {number} s_arma - El slot del arma seleccionada.
 */
export function accion_arma(pers, s_arma) {
    const val_dado = dado();
    /**
     * @type {Arma}
     */
    const arma = pers[`arma${s_arma}`];

    let text = evaluar_dado({
        header: `Ataque con ${cap_primera(arma.nombre)}`,
        val_dado,
        val_obj: arma.danno + pers.atributos.ataque,
        tail: "Daño base",
    });

    contenido_consola(text);

    // Si el arma es mecanomagica se reduce el poder.
    if (arma.tipo === "mecanomagica") {
        pers.modificar_atributo_actual("poder", false, arma.coste);
        mostrar_personaje(pers, false);
    }
}

/**
 * Realiza una acción con un atributo.
 * @param {Personaje} pers - El personaje actual.
 * @param {string} atributo - El atributo seleccionado.
 */
export function accion_atributo(pers, atributo) {
    // Obtiene el valor del dado.
    const val_dado = dado();

    // Inicializa el texto que se mostrará en la consola.
    let text = "";

    // Crea un objeto con los parámetros necesarios para evaluar el dado.
    const params = { val_dado, val_obj: pers.atributos[atributo] };

    // Evalúa el resultado del dado según el atributo seleccionado.
    switch (atributo) {
        case "ataque":
            text = evaluar_dado({
                header: "Ataque limpio",
                ...params,
                tail: "Daño base",
            });
            break;
        case "esquiva":
            text = evaluar_dado({
                header: "Esquiva",
                ...params,
            });
            break;
        case "bloqueo":
            text = evaluar_dado({
                header: "Bloqueo",
                ...params,
            });
            break;
        case "velocidad":
            text = evaluar_dado({
                header: "Corre",
                ...params,
            });
            break;
        default:
            text = evaluar_dado({
                header: "Tirada limpia",
                ...params,
            });
            break;
    }

    // Muestra el texto en la consola.
    contenido_consola(text);
}

/**
 * Evalúa el resultado de un dado y devuelve un mensaje formateado.
 *
 * @param {object} params - Objeto con los parámetros necesarios.
 * @param {string} params.header - Texto que se muestra antes del resultado del dado.
 * @param {number} params.val_dado - Valor obtenido en la tirada del dado.
 * @param {number} params.val_obj - Valor del objeto relacionado con la tirada.
 * @param {string} [params.tail] - Texto que se muestra después del resultado del dado.
 *
 * @returns {string} Mensaje formateado con el resultado de la tirada.
 */
function evaluar_dado({ header, val_dado, val_obj, tail }) {
    // Critico.
    if (val_dado === 20)
        return `${header}<br>¡CRITICO!<br>${
            tail ? `${tail} ${Math.floor(val_obj * 2)}` : ""
        }`;
    // Errada.
    else if (val_dado === 1)
        return `${header}<br>¡PIFIA!<br>${tail ? tail + " 0" : ""}`;
    // Basico.
    else
        return `${header}<br>${val_dado + val_obj}<br>${
            tail ? `${tail} ${Math.floor(val_obj)}` : ""
        }`;
}

/**
 * Señala un elemento
 * @param {HTMLElement} elemento - El elemento a señalar.
 */
function señalar(elemento) {
    elemento.style.textDecoration = "underline";
}

/**
 * Quita la seña de un elemento.
 * @param {HTMLElement} elemento - El elemento a eliminar el señal.
 */
function eliminar_seña(elemento) {
    elemento.style.textDecoration = "none";
}

/**
 * Señala el atributo seleccionado.
 * @param {string} nombre - El nombre del atributo.
 * @param {boolean} eliminar - Opción para ocultar todas las señas.
 */
export function señalar_atributo(nombre, eliminar = false) {
    for (const atributo in atributos_simple) {
        /**
         * @type {ElementoHTML}
         */
        const elemento =
            ELEMENTOS[`${atributo}_btn`].elemento.children[1].children[0];

        if (eliminar) eliminar_seña(elemento);
        else {
            if (atributo === nombre) señalar(elemento);
            else eliminar_seña(elemento);
        }
    }
}

/**
 * Señala la arma seleccionada.
 * @param {number} slot - El slot de la arma.
 * @param {boolean} eliminar - Opción para ocultar todas las señas.
}
 */
export function señalar_arma(slot, eliminar = false) {
    for (let i = 1; i <= 2; i++) {
        /**
         * @type {ElementoHTML}
         */
        const elemento = ELEMENTOS[`arma${i}_btn`][1].elemento.children[0];

        if (eliminar) eliminar_seña(elemento);
        else {
            if (i === slot) señalar(elemento);
            else eliminar_seña(elemento);
        }
    }
}

/**
 * Señala la habilidad seleccionada.
 * @param {number} slot - El slot de la habilidad.
 * @param {boolean} eliminar - Opción para ocultar todas las señas.
 */
export function señalar_habilidad(slot, eliminar = false) {
    for (let i = 1; i <= 3; i++) {
        /**
         * @type {ElementoHTML}
         */
        const elemento = ELEMENTOS[`habilidad${i}_btn`].elemento.children[0];

        if (eliminar) eliminar_seña(elemento);
        else {
            if (i === slot) señalar(elemento);
            else eliminar_seña(elemento);
        }
    }
}

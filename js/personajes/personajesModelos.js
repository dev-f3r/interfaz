import {
    EntidadBase,
    cp_atr_full,
    quitar_acentos,
    val_experiencia,
} from "../helpers.js";
import { modificar_exp, obtener_exp, personajes } from "../juego.js";
import { colecciones } from "./../colecciones/main.js";
import Arma from "./armasModelos.js";
import Equipo from "./equipamientoModelos.js";
import Habilidad from "./habilidadesModelo.js";

/**
 * Clase que representa un personaje (avatar o esbirro).
 * @class
 */
export default class Personaje extends EntidadBase {
    _arma1;
    _arma2;

    _equipo1;
    _equipo2;
    _equipo3;

    _habilidad1;
    _habilidad2;
    _habilidad3;

    /**
     * Constructor de la clase Personaje.
     * @constructor
     * @param {object} props - El objeto con las propiedades del personaje.
     * @param {string} props.nombre - El nombre del personaje
     * @param {string} props.portada - La ruta de la portada del personaje.
     * @param {string} props.descripcion - La descripción del personaje.
     * @param {Object.<string,number>} props.atributos - Los atributos del personaje.
     * @param {Arma} props.arma1 - El arma en el slot 1 del personaje.
     * @param {Arma} props.arma2 - El arma en el slot 2 del personaje.
     * @param {Equipo} props.equipo1 - El equipo en el slot 1 del personaje.
     * @param {Equipo} props.equipo2 - El equipo en el slot 2 del personaje.
     * @param {Equipo} props.equipo3 - El equipo en el slot 3 del personaje.
     * @param {Habilidad} props.habilidad1 - La habilidad en el slot 1 del personaje.
     * @param {Habilidad} props.habilidad2 - La habilidad en el slot 2 del personaje.
     * @param {Habilidad} props.habilidad3 - La habilidad en el slot 3 del personaje.
     */
    constructor({
        nombre = "",
        portada = "img/nada.png",
        descripcion = "sin descripción.",

        atributos = cp_atr_full(),

        arma1 = new Arma({ nombre: "arma 1" }),
        arma2 = new Arma({ nombre: "arma 2" }),

        equipo1 = new Equipo({ nombre: "equipo 1" }),
        equipo2 = new Equipo({ nombre: "equipo 2" }),
        equipo3 = new Equipo({ nombre: "equipo 3" }),

        habilidad1 = new Habilidad({ nombre: "habilidad 1" }),
        habilidad2 = new Habilidad({ nombre: "habilidad 2" }),
        habilidad3 = new Habilidad({ nombre: "habilidad 3" }),
    }) {
        super({ nombre, descripcion, portada, atributos });

        this._arma1 = arma1;
        this._arma2 = arma2;

        this._equipo1 = equipo1;
        this._equipo2 = equipo2;
        this._equipo3 = equipo3;

        this._habilidad1 = habilidad1;
        this._habilidad2 = habilidad2;
        this._habilidad3 = habilidad3;
    }

    /**
     * Cambia las propiedades (nombre, descripción, portada, atributos, habilidades y armas)
     * del personaje por otras
     * @param {object} props - El objeto con las nuevas propiedades.
     */
    actualizar = (props) => {
        super.actualizar(props);

        // * Habilidades
        this.conf_habilidad(1, props.habilidad1);
        this.conf_habilidad(2, props.habilidad2);
        this.conf_habilidad(3, props.habilidad3);

        // * Armas
        this.conf_arma(1, props.arma1);
        this.conf_arma(2, props.arma2);

        this.actualizar_atributos_actuales(); // Actualiza los atributos actuales.
    };

    /**
     * Cambia el arma de un determinado slot.
     * @param {number} slot - El slot del arma a cambiar.
     * @param {string} nombre - El nombre de la nueva arma.
     */
    conf_arma = (slot, nombre) => {
        // Verifica si el arma esta en la colección de naturales o marciales
        const nueva = colecciones.armas.armas_naturales[nombre]
            ? colecciones.armas.armas_naturales[nombre]
            : colecciones.armas.armas_marciales[nombre];

        this[`arma${slot}`].actualizar(nueva); // La actualiza por la nueva
    };

    /**
     * Cambia el equipo de un determinado slot.
     * @param {number} slot - El slot del equipo a cambiar.
     * @param {string} nombre - El nombre de la nueva equipo.
     */
    conf_equipamiento = (slot, nombre) => {
        const nueva = colecciones.equipos[nombre]; // Obtiene el objeto nuevo.
        this[`equipo${slot}`].actualizar(nueva); // Actualiza el slot de equipamiento correspondiente.

        this.actualizar_atributos_actuales(); // Actualiza los atributos actuales.
    };

    /**
     * Cambia la habilidad de un determinado slot.
     * @param {number} slot - El slot de la habilidad a cambiar.
     * @param {string} nombre - El nombre de la nueva habilidad.
     */
    conf_habilidad = (slot, nombre) => {
        const nueva = colecciones.habilidades[quitar_acentos(nombre)];

        this[`habilidad${slot}`].actualizar(nueva);
    };

    /**
     * Entrega el valor de un atributo (ataque, vida, etc) mas el de los equipos.
     * @param {string} nombre - El nombre del atributo.
     * @returns {number} El resultado de la suma.
     */
    ttal_atributo = (nombre) => {
        return (
            this.atributos[nombre] +
            this._equipo1.atributos[nombre] +
            this._equipo2.atributos[nombre] +
            this._equipo3.atributos[nombre]
        );
    };

    /**
     * Incrementa o decrementa el valor de un atributo.
     * @param {string} atributo - El nombre del atributo.
     * @param {boolean} accion - `true` para incrementar, `false` para decrementar.
     */
    modificar_atributo = (atributo, accion) => {
        /**
         * El costo de experiencia del atributo.
         * @type {number}
         */
        let costo = val_experiencia[atributo];
        /**
         * El valor actual del atributo.
         * @type {number}
         */
        const val_atri = this.atributos[atributo];
        /**
         * El valor actual de la experiencia.
         * @type {number}
         */
        const exp = obtener_exp();

        // Si se trata de un incremento.
        if (accion) {
            // Calcula el costo de exp a decrementar.
            costo = (val_atri === 0 ? 1 : val_atri + 1) * costo;

            // ! Excepción.
            if (atributo === "vida" || atributo === "poder") costo = 1;

            // Verifica que el exp sea suficiente.
            if (costo <= exp) {
                // Incrementa el atributo.
                this.atributos[atributo]++;
                // Decrementa la exp.
                modificar_exp(-costo);
            } else {
                // TODO: Debe mostrar por consola si la experiencia no es suficiente.
            }
        }
        // Si se trata de un decremento.
        else {
            // Calcula el costo de exp a incrementar.
            costo = val_atri * costo;

            // ! Excepción.
            if (atributo === "vida" || atributo === "poder") costo = 1;

            // Si el atributo es positivo.
            if (val_atri > 0) {
                // Decrementa el atributo.
                this.atributos[atributo]--;
                // Incrementa la experiencia.
                modificar_exp(costo);
            }
        }
    };

    /**
     * Incrementa o decrementa el valor de la vida o poder actual.
     * @param {string} atributo - El nombre del atributo.
     * @param {boolean} accion - `true` para incrementar, `false` para decrementar.
     */
    modificar_atributo_actual = (atributo, accion) => {
        // TODO: Completar logica para que el atr actual varie en un rango [0, ttal_atr(atributo)]
        const val_atri = this.atributos[`${atributo}_actual`];

        // Incremento.
        if (accion && val_atri < this.ttal_atributo(atributo))
            this.atributos[`${atributo}_actual`]++;
        // Decremento
        else if (!accion && val_atri > 0)
            this.atributos[`${atributo}_actual`]--;
    };

    /**
     * Actualiza los atributos de vida y poder ACTUAL.
     */
    actualizar_atributos_actuales = () => {
        // Actualiza los atributos de vida y poder ACTUAL.
        this.atributos.vida_actual = this.ttal_atributo("vida");
        this.atributos.poder_actual = this.ttal_atributo("poder");
    };

    // TODO: Metodo para ataquar
    ataquar = (objeto, slot = 1) => {
        console.log(objeto, slot);
    };

    get arma1() {
        return this._arma1;
    }
    get arma2() {
        return this._arma2;
    }
    get equipo1() {
        return this._equipo1;
    }
    get equipo2() {
        return this._equipo2;
    }
    get equipo3() {
        return this._equipo3;
    }
    get habilidad1() {
        return this._habilidad1;
    }
    get habilidad2() {
        return this._habilidad2;
    }
    get habilidad3() {
        return this._habilidad3;
    }
}

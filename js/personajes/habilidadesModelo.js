import { EntidadBase } from "../helpers.js";

/**
 * Clase que representa una habilidad.
 * @class
 */
export default class Habilidad extends EntidadBase {
    _coste;
    /**
     * Constructor de la clase Habilidad.
     * @constructor
     * @param {Object} props - Objeto con las propiedades de la habilidad.
     * @param {string} props.nombre - El nombre de la habilidad.
     * @param {string} props.descripcion - La descripción de la habilidad.
     * @param {number} props.coste - El costo de uso de la habilidad.
     */
    constructor({ nombre = "", descripcion = "sin descripción.", coste = 0 }) {
        super({ nombre, descripcion });
        this._coste = coste;
    }

    // ! Reescribo el metodo
    /**
     * Actualiza las propiedades de una habilidad por las de otra
     * @param {Object} nueva - El objeto que contiene las nuevas propiedades.
     */
    actualizar = (nueva) => {
        Object.assign(this, nueva);
    };

    get coste() {
        return this._coste;
    }
    /**
     * Cambia el coste de la habilidad.
     * @param {number} valor - El nuevo valor del coste.
     */
    set coste(valor) {
        this._coste = valor;
    }
}

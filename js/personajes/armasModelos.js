import { EntidadBase } from "../helpers.js";

/**
 * Clase que representa un arma.
 * @class
 */
export default class Arma extends EntidadBase {
    /**
     * @type {number}
     */
    _danno;
    /**
     * @type {string}
     */
    _tipo;
    /**
     * @type {number}
     */
    _coste;
    /**
     * Constructor de la clase Arma.
     * @constructor
     * @param {Object} props - El objeto con las propiedades del arma.
     * @param {string} props.nombre - El nombre del arma.
     * @param {string} props.icono - La ruta del icono.
     * @param {number} props.danno - El multiplicador de daño del arma.
     * @param {string} props.descripcion - La descripción del arma.
     */
    constructor({
        nombre = "nada",
        icono = "img/nada.png",
        danno = 0,
        descripcion = "sin descripción.",
        tipo = "",
        coste = 0,
    }) {
        super({ nombre, icono, descripcion });
        this._danno = danno;
        this._tipo = tipo;
        this._coste = coste;
    }

    // ! Reescribo el metodo
    /**
     * Actualiza las propiedades del arma por otras
     * @param {Object} nueva - El objeto con las nuevas propiedades.
     */
    actualizar = (nueva) => {
        Object.assign(this, nueva);
    };

    get tipo() {
        return this._tipo;
    }
    get danno() {
        return this._danno;
    }
    get coste() {
        return this._coste;
    }

    /**
     * @param {string} tipo - El tipo del arma.
     */
    set tipo(tipo) {
        this._tipo = tipo;
    }
    /**
     * @param {number} danno - El multiplicador de daño del arma.
     */
    set danno(danno) {
        this._danno = danno;
    }
    /**
     * @param {number} coste - El coste del arma.
     */
    set coste(coste) {
        this._coste = coste;
    }
}

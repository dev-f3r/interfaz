import { EntidadBase } from "../helpers.js";

/**
 * Clase que representa un arma.
 * @class
 */
export default class Arma extends EntidadBase {
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
    }) {
        super({ nombre, icono, descripcion });
        this.danno = danno;
    }

    // ! Reescribo el metodo
    /**
     * Actualiza las propiedades del arma por otras
     * @param {Object} nueva - El objeto con las nuevas propiedades.
     */
    actualizar = (nueva) => {
        Object.assign(this, nueva);
    };

    ataquar = () => console.log("Ataque con arma");
}

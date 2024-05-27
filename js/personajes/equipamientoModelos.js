import { EntidadBase, atributos_personajes } from "../helpers.js";

// TODO: Testear la clase Equipo
export default class Equipo extends EntidadBase {
    /**
     * Constructor de la clase Equipo
     * @constructor
     * @param {string} nombre - El nombre del equipo.
     * @param {string} icono - El icono del equipo.
     * @param {string} descripcion - La descripción.
     * @param {object} atributos - Los atributos. Ej: ataque, vida, etc.
     */
    constructor({
        nombre = "",
        icono = "img/nada.png",
        descripcion = "sin descripción.",

        atributos = atributos_personajes,
    }) {
        super({ nombre, icono, descripcion, atributos });
    }

    // ! Reescribo el metodo
    /**
     * ? Actualiza las propiedades del equipo por otras.
     * @param {Object} nuevo - El objeto con las nuevas propiedades
     */
    actualizar = (nuevo) => {
        super.actualizar(nuevo);
    };
}

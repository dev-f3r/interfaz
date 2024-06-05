import { EntidadBase, copia_atr_default } from "../helpers.js";

export default class Equipo extends EntidadBase {
    /**
     * Constructor de la clase Equipo
     * @param {Object} props. - Los atributos del equipo.
     * @param {string} props.nombre - El nombre del equipo.
     * @param {string} props.icono - El icono del equipo.
     * @param {string} props.descripcion - La descripción.
     * @param {object} props.atributos - Los atributos. Ej: ataque, vida, etc.
     */
    constructor({
        nombre = "",
        icono = "img/nada.png",
        descripcion = "sin descripción.",

        atributos = copia_atr_default(),
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

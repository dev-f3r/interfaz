import { EntidadBase, atributos_personajes } from "../helpers.js";
import { colecciones } from "./../colecciones/main.js";
import Arma from "./armasModelos.js";
import Equipo from "./equipamientoModelos.js";
import Habilidad from "./habilidadesModelo.js";

// TODO: Testear la clase Personaje
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

        atributos = atributos_personajes,

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
        this.ConfigurarArma(1, props.arma1);
        this.ConfigurarArma(2, props.arma2);
    };

    /**
     * Cambia el arma de un determinado slot.
     * @param {number} slot - El slot del arma a cambiar.
     * @param {string} nombre - El nombre de la nueva arma.
     */
    conf_arma = (slot, nombre) => {
        // Verifica si el arma esta en la colección de naturales o marciales
        const nueva = armas_naturales[nombre]
            ? armas_naturales[nombre]
            : armas_marciales[nombre];

        this[`arma${slot}`].actualizar(nueva); // La actualiza por la nueva
    };

    /**
     * Cambia el equipo de un determinado slot.
     * @param {number} slot - El slot del equipo a cambiar.
     * @param {string} nombre - El nombre de la nueva equipo.
     */
    conf_equipamiento = (slot, nombre) => {
        console.log(slot, nombre);
        // TODO: Completar logica para cambio de equipamiento.
    };

    /**
     * Cambia la habilidad de un determinado slot.
     * @param {number} slot - El slot de la habilidad a cambiar.
     * @param {string} nombre - El nombre de la nueva habilidad.
     */
    conf_habilidad = (slot, nombre) => {
        const nueva = colecciones.habilidades[quitarAcentos(nombre)];

        this[`habilidad${slot}`].actualizar(nueva);
    };

    /**
     * Entrega el valor total de un atributo (ataque, vida, etc)
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

    // TODO: Metodo para ataquar
    ataquar = (objeto, slot=1) => {
        console.log(objeto, slot)
    };
}

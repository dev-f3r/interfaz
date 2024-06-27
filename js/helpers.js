/**
 * Genera un numero aleatorio entre 1 y 20.
 * @returns {number} El numero aleatorio.
 */
export function dado() {
    return Math.ceil(Math.random() * 20 + 0);
}

/**
 * Contiene el costo de experiencia de cada atributo.
 * @type {Object}
 * @const
 */
export const val_experiencia = {
    ataque: 3,
    esquiva: 3,
    bloqueo: 3,
    velocidad: 6,
    vida: 1,
    poder: 1,
};

/**
 * Atributos base de una entidad cualquiera.
 * @type {Object}
 * @const
 */
export const atributos_simple = {
    ataque: 0,
    esquiva: 0,
    bloqueo: 0,
    velocidad: 0,
    vida: 0,
    poder: 0,
};
/**
 * Crea una copia de los atributos base de una entidad cualquiera.
 * @returns {Object} Atributos base de una entidad cualquiera.
 */
export function cp_atr_simple() {
    return JSON.parse(JSON.stringify(atributos_simple));
}

/**
 * Atributos completos para un personaje.
 * @type {Object}
 * @const
 */
export const atributos_full = {
    ...atributos_simple,
    vida_actual: 0,
    poder_actual: 0,
};
/**
 * Crea una copia de los atributos completos para un personaje.
 * @returns {Object} Atributos completos para un personaje.
 */
export function cp_atr_full() {
    return JSON.parse(JSON.stringify(atributos_full));
}

/**
 * Quita cualquier tipo de acentuación.
 * @param {string} text - El texto a modificar.
 * @returns {string} El texto sin acentos.
 */
export function quitar_acentos(text) {
    return text
        .normalize("NFD") // Descopone caracteres acentuados en su caracter base y su acento.
        .replace(/[\u0300-\u036f]/g, ""); // Elimina los acentos.
}

/**
 * Capitaliza la primera letra de un string.
 * @param {string} texto - El string que se va a capitalizar.
 * @returns {string} - El string con la primera letra en mayúscula.
 */
export function cap_primera(texto) {
    // Verifica si el texto está vacío o es nulo y devuelve el mismo texto sin cambios
    if (!texto) {
        return texto;
    }

    // Capitaliza la primera letra del texto y la concatena con el resto del texto en minúsculas
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

/**
 * Elimina los espacios en una cadena de texto.
 * @param {string} texto - El texto con espacios.
 * @returns {string} El texto si espacios.
 */
export function quitar_espacios(texto) {
    return texto
        .split(" ") // Crea un arreglo usando como separador los espacios.
        .join(""); // Une el arreglo en un string.
}

/**
 * Clase con propiedades basicas de uso general.
 * @class
 */
export class EntidadBase {
    _nombre;
    _descripcion;
    _icono;
    _portada;
    /**
     * @type {Object}
     */
    _atributos;
    /**
     * @constructor
     * @param {Object} props - Las propiedades de la entidad.
     * @param {string} props.nombre - El nombre
     * @param {string} props.descripcion - La descripción.
     * @param {string} props.icono - La ruta del iconó.
     * @param {string} props.portada - La ruta de la portada.
     * @param {Object} props.atributos - Los atributos de la entidad. Ej: Ataque, vida, etc.
     */
    constructor({
        nombre = "nada",
        descripcion = "Sin descripción.",
        icono = "img/nada.png",
        portada = "img/nada.png",
        atributos = cp_atr_simple(),
    }) {
        this._nombre = nombre;
        this._descripcion = descripcion;
        this._icono = icono;
        this._portada = portada;
        this._atributos = atributos;
    }

    /**
     * Cambia las propiedades actuales por otras.
     * @param {Object} nuevo - El objeto con las nuevas propiedades.
     */
    actualizar(nuevo) {
        // * Propiedades generales
        this._nombre = nuevo.nombre;
        this._descripcion = nuevo.descripcion;
        this._portada = nuevo.portada;

        // * atributos
        for (const nombre in atributos_simple) {
            this._atributos[nombre] = nuevo[nombre];
        }
    }

    get nombre() {
        return this._nombre;
    }
    get descripcion() {
        return this._descripcion;
    }
    get icono() {
        return this._icono;
    }
    get portada() {
        return this._portada;
    }
    get atributos() {
        return this._atributos;
    }

    /**
     * Cambia el nombre de la entidad.
     * @param {string} nuevo - El nuevo nombre.
     */
    set nombre(nuevo) {
        this._nombre = nuevo;
    }
    /**
     * Cambia la descripción de la entidad.
     * @param {string} nueva - La nueva descripción.
     */
    set descripcion(nueva) {
        this._descripcion = nueva;
    }
    /**
     * Cambia el icono de la entidad.
     * @param {string} nuevo - La nueva ruta del icono.
     */
    set icono(nuevo) {
        this._icono = nuevo;
    }
    /**
     * Cambia la portada de la entidad.
     * @param {string} nueva - La nueva ruta de la portada.
     */
    set portada(nueva) {
        this._portada = nueva;
    }
    /**
     * Cambia los atributos de la entidad.
     * @param {Object} obj - El objeto con los nuevos atributos.
     */
    set atributos(obj) {
        for (const nombre in atributos_simple) {
            this._atributos[nombre] = obj[nombre];
        }
    }
}

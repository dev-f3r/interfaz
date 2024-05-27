export const atributos_personajes = {
    ataque: 0,
    esquiva: 0,
    bloqueo: 0,
    velocidad: 0,
    vida: 0,
    poder: 0,
};

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
 * ? Clase con propiedades basicas de uso general.
 * @class
 */
export class EntidadBase {
    _nombre;
    _descripcion;
    _icono;
    _portada;
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
        atributos = atributos_default,
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
        for (const nombre in atributos_default) {
            this._atributos[nombre] = nuevo[nombre];
        }
    }

    // TODO: Descartar
    cambiar_nombre = (nuevo) => {
        this._nombre = nuevo;
    };

    get nombre() {
        return this._nombre;
    }
    get descripcion() {
        return this._descripcion;
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
        for (const nombre in atributos_default) {
            this._atributos[nombre] = obj[nombre];
        }
    }
}

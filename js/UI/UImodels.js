/**
 * ? Superclase que representa un elemento HTML.
 */
export default class ElementoHTML {
    static padre = document.createElement("div");
    _id;
    _clases;
    _mostrar;
    _tipo_display;
    _evento_click;

    _elemento;

    /**
     * Constructor de la clase ElementoHTML. Crea un elemento HTML básico.
     * @param {object} opciones - Objeto que contiene las opciones para el elemento HTML.
     * @param {HTMLElement} opciones.elemento - elemento HTML.
     * @param {string} opciones.id="" - El identificador del elemento.
     * @param {string[]} opciones.clases=[] - Las clases CSS del elemento.
     * @param {boolean} opciones.mostrar=false - Indica si el elemento debe mostrarse (true: visible, false: oculto).
     * @param {string} opciones.tipo_display="block" - El tipo de display que tomará si decide mostrarse.
     * @param {Function} opciones.funcionClick=()=>{} - La función que se ejecutará cuando se haga clic en el elemento.
     */
    constructor({
        elemento = document.createElement("div"),
        id = "",
        clases = [],
        mostrar = false,
        tipo_display = "block",
        evento_click = () => console.log("click"),
    }) {
        this._elemento = elemento;
        this._evento_click = evento_click;
        this._mostrar = mostrar;

        // Si el elemento ya existe, es decir se quiere acceder
        if (this._verificar(elemento)) {
            this._id = elemento.id;
            this._clases = elemento.classList;
            // Obtiene el estilo de forma forzada
            const tipo_display_actual = window
                .getComputedStyle(this._elemento)
                .getPropertyValue("display");
            if (tipo_display_actual !== "none")
                this._tipo_display = tipo_display_actual;
            else this._tipo_display = tipo_display;

            this._elemento.addEventListener("click", this._evento_click);
        }
        // De lo contrario no existe y se deasea crear
        else {
            this._id = id;
            this._clases = clases;
            this._tipo_display = tipo_display;

            // this.construir(this._elemento)
        }

        // this.evento_click = () => console.log(this._id);
    }

    /**
     * Verifica si el elemento existe en el DOM.
     * @param {HTMLElement} el - El elemento HTML a verificar.
     * @returns {boolean} True si el elemento existe en el DOM, false en caso contrario.
     */
    _verificar(el) {
        return ElementoHTML.padre.contains(el);
    }

    /**
     * Arma el botón HTML con sus propiedades y contenido.
     * @param {HTMLElement} el - El elemento HTML a armar.
     */
    construir(el) {
        el.id = this._id;
        el.classList.add(...this._clases);
        el.style.display = this._mostrar ? this._tipo_display : "none";
        el.addEventListener("click", this._evento_click);
    }

    /**
     * Muestra u oculta el elemento estableciendo su estilo de visualización a `this._tipo_display`.
     * @param {boolean} ocultar - Indica si se debe ocultar o mostrar el elemento.
     */
    mostrar_ocultar(ocultar = false) {
        // Lo oculta solo si se especifica
        if (ocultar) {
            this._mostrar = false;
            this._elemento.style.display = "none";
        }
        // De lo contrario se muestra o se oculta dependiendo del estado actual
        else {
            // Lo oculta
            if (this._mostrar) {
                this._mostrar = false;
                this._elemento.style.display = "none";
            }
            // Lo muestra
            else {
                this._mostrar = true;
                this._elemento.style.display = this._tipo_display;
            }
        }
    }

    // ? Metodos getter para acceder a campos privados
    get tipo_display() {
        return this._tipo_display;
    }
    get clases() {
        return this._clases;
    }
    get mostar() {
        return this._mostrar;
    }
    get id() {
        return this._id;
    }
    get elemento() {
        return this._elemento;
    }
    get evento_click() {
        return this._evento_click;
    }

    // Metodos setter para campos privados
    /**
     * Asigna el tipo de display al elemento.
     * @param {string} tipo_display - El tipo de display a asignar.
     */
    set tipo_display(tipo_display) {
        this._tipo_display = tipo_display;
    }
    /**
     * Asigna las clases CSS al elemento.
     * @param {string[]} clases - Las clases CSS a asignar.
     */
    set clases(clases) {
        this._clases = clases;
    }
    /**
     * Asigna un nuevo elemento HTML al elemento.
     * @param {HTMLElement} nuevo - El nuevo elemento HTML.
     */
    set mostar(mostrar) {
        this._mostrar = mostrar;
    }
    /**
     * Asigna un nuevo identificador al elemento.
     * @param {string} id - El nuevo identificador.
     */
    set id(id) {
        this._id = id;
    }
    /**
     * Asigna un nuevo evento al elemento.
     * @param {Function} nuevo - El nuevo evento a asignar.
     */
    set evento_click(nuevo) {
        // TODO: Implementar, de ser necesario
        // var element = document.getElementById("yourElementId");
        // var clone = element.cloneNode(true);
        // element.parentNode.replaceChild(clone, element);

        // Elimina el evento anterior
        this._elemento.removeEventListener("click", this._evento_click);

        // Asigna el nuevo evento
        this._evento_click = nuevo;
        this._elemento.addEventListener("click", nuevo);
    }
}

export class BotonModal extends ElementoHTML {
    _icono;
    /**
     * Constructor de la clase Boton. Crea un botón HTML.
     * @param {object} opciones - Objeto que contiene las opciones para el botón.
     * @param {HTMLElement} opciones.elemento - elemento HTML.
     * @param {string} opciones.id="" - El identificador del botón.
     * @param {string[]} opciones.clases=[] - Las clases CSS del botón.
     * @param {boolean} opciones.mostrar=false - Indica si el botón debe mostrarse (true: visible, false: oculto).
     * @param {string} opciones.tipo_display="block" - El tipo de display que tomará si decide mostrarse.
     * @param {Function} opciones.evento_click=()=>{} - La función que se ejecutará cuando se haga clic en el botón.
     */
    constructor({
        elemento = document.createElement("button"),
        id = "",
        clases = [],
        mostrar = false,
        tipo_display = "block",
        evento_click = () => console.log("click"),
        ruta_icono = "img/nada.png",
    }) {
        super({
            elemento,
            id,
            clases,
            mostrar,
            tipo_display,
            evento_click,
        });

        this._icono = document.createElement("img");
        this._icono.src = ruta_icono;

        this.construir(this._elemento);
        this._elemento.appendChild(this._icono);
    }
}

// TODO: Clase para modales
// TODO: Clase para formulario

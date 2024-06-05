/**
 * Superclase que representa un elemento HTML.
 * @class
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
        }
    }

    /**
     * Desactiva los eventos del elemento.
     */
    desactivar_evento_click() {
        this._elemento.removeEventListener("click", this._evento_click);
        this.evento_click = () => {};
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
    mostrar_ocultar(opcion = "") {
        // Si se especifica el parametro opcion
        if (opcion) {
            switch (opcion) {
                case "mostrar":
                    this._mostrar = true;
                    this._elemento.style.display = this._tipo_display;
                    break;
                case "ocultar":
                    this._mostrar = false;
                    this._elemento.style.display = "none";
                default:
                    break;
            }
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
    get mostrar() {
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
    set mostrar(mostrar) {
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
        // ! Implementar, de ser necesario
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

/**
 * Clase que representa un botón.
 * @class
 */
export class BotonModal extends ElementoHTML {
    _icono;
    /**
     * Constructor de la clase Boton. Crea un botón HTML.
     * @param {object} opciones - Objeto que contiene las opciones para el botón.
     * @param {HTMLElement} opciones.elemento - El boton HTML.
     * @param {string} opciones.id - El identificador del botón.
     * @param {string[]} opciones.clases - Las clases CSS del botón.
     * @param {boolean} opciones.mostrar - Indica si el botón debe mostrarse (true: visible, false: oculto).
     * @param {string} opciones.tipo_display - El tipo de display que tomará si decide mostrarse.
     * @param {Function} opciones.evento_click - La función que se ejecutará cuando se haga clic en el botón.
     * @param {string} opciones.ruta_icono - La ruta del icono.
     */
    constructor({
        elemento = document.createElement("button"),
        id = "boton_modal_default",
        clases = ["item-modal"],
        mostrar = false,
        tipo_display = "block",
        evento_click = () => console.log("BotonModal"),
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
        this._icono.id = `${id}_ico`;
        this._icono.src = ruta_icono;

        this.construir(this._elemento);
    }

    construir(el) {
        super.construir(el);
        this._elemento.appendChild(this._icono);
    }

    get icono() {
        return this._icono;
    }
}

/**
 * Clase que representa un modal (ventana emergente con un menú de opciones).
 * @class
 */
export class Modal extends ElementoHTML {
    /**
     * @type {HTMLElement}
     */
    _titulo;

    /**
     * @type {number}
     */
    _maximo_botones;

    /**
     * @type {BotonModal[]}
     */
    _btn_grales;
    /**
     * @type {BotonModal}
     */
    _btn_cerrar;
    /**
     * @type {BotonModal}
     */
    _btn_especial;
    /**
     * @type {BotonModal}
     */
    _btn_atras;
    /**
     * @type {BotonModal}
     */
    _btn_adelante;

    // Usado para asignarle a todos los btn cerrar de todos los modales la funcion `cambiar_modo()`
    static evento_btn_cerrar = () => console.log("cerrar");

    /**
     * @type {BotonModal[][]}
     */
    _vistas = [];
    /**
     * @type {number}
     */
    _index_vista = 0;

    /**
     * Constructor de la clase Modal. Crea un modal con la estructura básica.
     * @param {object} opciones - Objeto que contiene las opciones para el modal.
     * @param {HTMLElement} opciones.elemento - El elemento HTML donde se creará el modal.
     * @param {string} opciones.titulo - El título del modal.
     * @param {string} opciones.id - El identificador del modal.
     * @param {string[]} opciones.clases - Clases CSS para aplicar estilos al modal.
     * @param {boolean} opciones.mostrar - Indica si el modal debe mostrarse inicialmente (true: visible, false: oculto).
     * @param {string} opciones.tipo_display - El tipo de display que tomará en caso de mostrarse.
     * @param {number} opciones.maximo_botones - Número máximo de botones generales permitidos (sin contar navegación ni botón especial).
     * @param {BotonModal[]} opciones.btn_grales - Arreglo con los botones generales del modal.
     * @param {Boton} opciones.btn_especial - Botón con una acción especial dentro del modal.
     */
    constructor({
        elemento = document.createElement("div"),
        titulo = "modal",
        id = "modal_default",
        clases = ["modal"],
        mostrar = false,
        tipo_display = "grid",
        maximo_botones = 12,

        btn_grales = [],
        btn_especial = new BotonModal({ mostrar: true }),
    } = {}) {
        super({
            elemento,
            id,
            clases,
            mostrar,
            tipo_display,
            evento_click: () => console.log("Click modal"),
        });

        this._titulo = titulo;
        this._maximo_botones = maximo_botones;
        this._btn_grales = btn_grales;
        this._btn_especial = btn_especial;

        // Construye el modal
        this.construir(this._elemento);
        // Desactiva el evento default del modal.
        this.desactivar_evento_click();
    }

    /**
     * Construye el elemento HTML del título del modal.
     * @param {HTMLElement} el - El elemento HTML donde se generará el título.
     */
    construir(el) {
        super.construir(el);

        this._construir_titulo(el); // Agrega el titulo.

        this._construir_btn_cerrar(el); // Agrega el boton para cerrar el modal.

        this._construir_btn_grales(el); // Agrega los botones generales.

        this._construir_btn_navegacion(el); // Agrega los botones de navegación.

        this._construir_vistas(this._btn_grales, this._maximo_botones); // Crea las vistas ó secciones del modal.
    }

    /**
     * Genera el elemento HTML para el título del modal.
     * @param {HTMLDivElement} el - El elemento HTML donde se generará el título.
     */
    _construir_titulo(el) {
        const div_titulo = document.createElement("div");
        const span_titulo = document.createElement("span");

        div_titulo.classList.add("item-modal");
        span_titulo.classList.add("texto");

        span_titulo.textContent = this._titulo.toUpperCase();

        div_titulo.appendChild(span_titulo);

        el.appendChild(div_titulo);
    }

    /**
     * Crea el botón de cerrar del modal.
     * @param {HTMLElement} el - El elemento HTML donde se creará el botón de cerrar.
     */
    _construir_btn_cerrar(el) {
        this._btn_cerrar = new BotonModal({
            id: `${this.id}_cerrar_btn`,
            mostrar: true,
            ruta_icono: "img/cerrar.png",
            evento_click: () => {
                this.mostrar_ocultar();
                Modal.evento_btn_cerrar();
            },
        });

        el.appendChild(this._btn_cerrar.elemento);
    }

    /**
     * Crea botones generales adicionales en caso de ser necesario para mantener un diseño equilibrado.
     * @param {HTMLElement} el - El elemento HTML donde se crearán los botones.
     */
    _construir_btn_grales(el) {
        const maximo = this._maximo_botones;
        const longitud = this._btn_grales.length;

        let restantes = 0;
        // Si la longitud de los botones es menor al maximo por vista
        // Ej: 9 < 12: restantes = 3
        if (longitud < maximo) {
            restantes = maximo - longitud;
        }
        // Si la longitud de los botones es mayor y no es multiplo del maximo por vista
        // Ej: 13 > 12 && 13 % 12 = 1: restantes = 11
        else if (longitud > maximo && longitud % maximo !== 0) {
            const resto = longitud % maximo;
            restantes = maximo - resto;
        }

        if (longitud !== maximo) {
            for (let i = 0; i < restantes; i++) {
                this._btn_grales.push(
                    new BotonModal({
                        nombre: "nada", // Nombre
                        clases: ["item-modal"], // Clases
                        mostrar: longitud < maximo ? true : false, // Mostrar?
                    })
                );
            }
        }

        // Recorre los botones generales y los agrega al elemento
        this._btn_grales.forEach((boton) => {
            el.appendChild(boton.elemento);
        });
    }

    /**
     * Crea las _vistas a partir de los botones generales.
     * @param {BotonModal[]} botones - Arreglo con los botones generales del modal.
     * @param {number} tamaño - Número de botones por vista.
     */
    _construir_vistas(botones, tamaño) {
        // Divide el arreglo con los botones de partes de longitud `tamaño`
        for (let i = 0; i < botones.length; i += tamaño) {
            this._vistas.push(botones.slice(i, i + tamaño));
        }
    }

    /**
     * Construye los controles del modal.
     * @param {HTMLElement} el - El elemento HTML donde se crearán los controles.
     */
    _construir_btn_navegacion(el) {
        // Navegación
        this._btn_atras = new BotonModal({
            id: `${this.id}_atras_btn`,
            mostrar: true,
            ruta_icono: "img/atras.png",
            evento_click: () => this._cambiar_vista("atras"),
        });
        this._btn_adelante = new BotonModal({
            id: `${this.id}_adelante_btn`,
            mostrar: true,
            ruta_icono: "img/adelante.png",
            evento_click: () => this._cambiar_vista("adelante"),
        });

        // Agregar elementos al modal
        el.appendChild(this._btn_atras.elemento);
        el.appendChild(this._btn_especial.elemento);
        el.appendChild(this._btn_adelante.elemento);
    }

    /**
     * Incrementa la propiedad _index_vista
     */
    _vista_derecha = () => {
        if (this._index_vista < this._vistas.length - 1) {
            this._index_vista++;
        } else {
            this._index_vista = 0;
        }
    };
    /**
     * Decrementa la propiedad _index_vista
     */
    _vista_izquierda = () => {
        if (this._index_vista > 0) {
            this._index_vista--;
        } else {
            this._index_vista = this._vistas.length - 1;
        }
    };

    /**
     * Cambia a la vista siguiente o anterior.
     * @param {String} accion - La direccion a donde cambiar.
     */
    _cambiar_vista = (accion) => {
        // No hace nada si solo hay una vista.
        if (this._vistas.length <= 1) return;

        switch (accion) {
            case "adelante":
                this._vista_derecha();
                break;
            case "atras":
                this._vista_izquierda();
                break;
            default:
                console.error("_cambiar_vista: Accion no reconocida", accion);
                break;
        }

        this._mostrar_vista(this._index_vista); // Muestra la vista requerida.
        this._ocultar_vistas(this._index_vista); // Oculta las demas a excepción de la actual.
    };

    /**
     * Muestra los botones de una vista.
     * @param {BotonModal[]} vista - Vista a mostrar.
     */
    _mostrar_vista(index) {
        // Recorre la vista y oculta cada botón.
        this._vistas[index].forEach((boton) => boton.mostrar_ocultar());
    }

    /**
     * Oculta las _vistas que no sean la actual.
     * @param {number} ignorar - Índice de la vista que se debe ignorar.
     */
    _ocultar_vistas(ignorar) {
        for (let i = 0; i < this._vistas.length; i++) {
            const vista = this._vistas[i];
            if (i != ignorar) {
                this._ocultar_vista(vista);
            }
        }
    }

    /**
     * Oculta los botones de una vista.
     * @param {BotonModal[]} vista - Vista a ocultar.
     */
    _ocultar_vista(vista) {
        vista.forEach((boton) => boton.mostrar_ocultar());
    }

    // Reescribo el metodo para reestaurar la vista a la default
    /**
     * Muestra u oculta el elemento estableciendo su estilo de visualización a `this._tipo_display`.
     * @param {string} opcion - Indica si se debe "ocultar" o "mostrar" el elemento.
     */
    mostrar_ocultar(opcion) {
        super.mostrar_ocultar(opcion);

        // Reestablece la vista mostrada a la primera.
        if (!this._vistas[0][0].mostrar) {
            this._index_vista = 0;
            this._mostrar_vista(this._index_vista);
            this._ocultar_vistas(this._index_vista);
        }
    }

    get btn_especial() {
        return this._btn_especial;
    }
    get btn_grales() {
        return this._btn_grales;
    }
    get btn_cerrar() {
        return this._btn_cerrar;
    }
}

/**
 * Clase que representa un formulario.
 * @class
 */
export class Formulario extends ElementoHTML {
    /**
     * @type {Function}
     */
    _funcion_ingreso;
    /**
     * @type {Function}
     */
    _evento_input;
    /**
     * @type {Function}
     */
    _evento_btn;
    /**
     * @type {HTMLElement}
     */
    _encabezado;
    /**
     * @type {HTMLElement}
     */
    _input;
    /**
     * @type {HTMLElement}
     */
    _boton;
    /**
     * @type {string}
     */
    _nombre;

    /**
     * Constructor de la clase Formulario. Crea un formulario para ingreso de comandos, nombres, habilidades, etc.
     * @param {object} opciones - Objeto que contiene las opciones para el formulario.
     * @param {string} opciones.nombre - Nombre del formulario.
     * @param {string[]} opciones.clases - Clases CSS para aplicar estilos.
     * @param {boolean} opciones.mostrar - Indica si el formulario debe mostrarse inicialmente (true: visible, false: oculto).
     * @param {string} opciones.tipo_display - El tipo de display que tomará en caso de mostrarse.
     * @param {HTMLElement} opciones.hijo - El elemento hijo del formulario.
     * @param {HTMLElement} opciones.elemento - El contenedor del formulario.
     * @param {Function} opciones.funcion_ingreso - La función que se ejecuta al ingresar texto.
     * @param {Function} opciones.nombre - El nombre del formulario.
     */
    constructor({
        elemento = document.createElement("div"),
        id = "formulario",
        clases = ["contenedor-input"],
        mostrar = false,
        tipo_display = "flex",
        evento_click = () => console.log("formulario"),
        funcion_ingreso = () => {},
        nombre = "",
    }) {
        super({
            elemento,
            id,
            clases,
            mostrar,
            tipo_display,
            evento_click,
        });
        this._funcion_ingreso = funcion_ingreso;

        this._encabezado = document.createElement("span");
        this._input = document.createElement("input");
        this._boton = document.createElement("button");
        this._nombre = nombre;

        // Construye el formulario
        this.construir(this._elemento);
        // Añade los eventos a sus hijos (usando el setter).
        this.funcion_ingreso = funcion_ingreso;
        // Desactiva su evento click
        this.desactivar_evento_click();
    }

    // ! Reescribo el metodo
    /**
     * Construye el formulario
     * @param {HTMLElement} el - El elemento HTML donde se creará el formulario.
     */
    construir(el) {
        super.construir(el);
        // Contenido de hijos
        this._encabezado.textContent = `Ingrese ${this._nombre}`;
        this._boton.textContent = "Ingresar";

        // Clases de hijos
        this._encabezado.classList.add("input-label");
        this._input.classList.add("comandos-input");
        this._boton.classList.add("input-button");

        // Ids & nombres de hijos
        this._input.id = `${this._nombre}_valor`;
        this._input.name = `${this._nombre}_input`;

        // Configuraciones generales del elemento principal
        this._elemento.id = `contenedor_input_${this._nombre}`;

        // Añade los elementos
        this._elemento.appendChild(this._encabezado);
        this._elemento.appendChild(this._input);
        this._elemento.appendChild(this._boton);
    }

    get funcion_ingreso() {
        return this._funcion_ingreso;
    }
    get encabezado() {
        return this._encabezado;
    }
    get nombre() {
        return this._nombre;
    }
    /**
     * Establece el handler para el ingreso de texto.
     * @param {Function} nueva - La función que se ejecutara a la hora de ingresar texto.
     */
    set funcion_ingreso(nueva) {
        // Cambia la funcion de ingreso.
        this._funcion_ingreso = nueva;

        // Remueve los eventos actuales.
        this._input.removeEventListener("keydown", this._evento_input);
        this._boton.removeEventListener("click", this._evento_btn);

        // Evento para la tecla "enter".
        this._evento_input = (event) => {
            if (event.key === "Enter") {
                this._funcion_ingreso(this._input.value);
            }
        };
        // Evento del boton de ingreso.
        this._evento_btn = () => {
            this._funcion_ingreso(this._input.value);
        };

        // Agrega los eventos nuevos.
        this._input.addEventListener("keydown", this._evento_input);
        this._boton.addEventListener("click", this._evento_btn);
    }
    /**
     * Cambia el encabezado del formulario.
     * @param {string} nuevo - El nuevo encabezado.
     */
    set encabezado(nuevo) {
        this._encabezado.textContent = `Ingrese ${nuevo}`;
    }
    /**
     * Cambia el nombre del formulario.
     * @param {string} nuevo - El nuevo nombre.
     */
    set nombre(nuevo) {
        this._nombre = nuevo;
        this.encabezado = this._nombre;
    }
}

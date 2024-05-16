import ElementoHTML from "./UI.js"
const main = document.querySelector("#main")
ElementoHTML.padre = main
let modo = "jugar"


const btn_editar = new ElementoHTML({ elemento: document.querySelector("#editarBtn") })


// TODO: Agregar los modales
// const modal_prueba = new ElementoHTML({
//     id: "modal_personajes",
//     clases: ["modal"],
//     mostrar: false,
//     tipo_display: "grid",
// })

// main.appendChild(modal_prueba.elemento)

// btn_editar.evento_click = () => modal_prueba.mostrar_ocultar(false)
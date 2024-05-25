const armas_marciales = {
    "punno": {
        nombre: "puño",
        icono: "img/punno.png",
        danno: 0.75,
        coste: 1,
        tipo: "",
        descripcion: "Arma natural <br> 1 Acción / 75% de ataque como daño físico"
    },
    "patada": {
        nombre: "patada",
        icono: "img/patada.png",
        danno: 1,
        coste: 1,
        tipo: "",
        descripcion: "Arma natural <br> 2 Acciones / 100% de ataque como daño físico"
    },
    "daga": {
        nombre: "daga",
        icono: "img/daga.png",
        danno: 1,
        coste: 1,
        tipo: "",
        descripcion: "Arma a una mano <br> 1 Acción / 100% de ataque como daño físico"
    },
    "espada": {
        nombre: "espada",
        icono: "img/espada.png",
        danno: 1.5,
        coste: 1,
        tipo: "",
        descripcion: "Arma a dos manos <br> 2 Acciones / 150% de ataque como daño físico"
    },
    "arco": {
        nombre: "arco",
        icono: "img/arco.png",
        danno: 1.75,
        coste: 1,
        tipo: "",
        descripcion: "Arma a distancia <br> 3 casilleros x ataque / 3 Acciones / 175% de ataque como daño físico"
    },
    "arrojadiza": {
        nombre: "arrojadiza",
        icono: "img/arrojadiza.png",
        danno: 0.75,
        coste: 1,
        tipo: "",
        descripcion: "Arma arrojadiza <br> 3 casillero x ataque / 2 Acciones / 75% de ataque como daño físico"
    },
    "escudo": {
        nombre: "escudo",
        icono: "img/escudo.png",
        danno: 0.5,
        coste: 1,
        tipo: "",
        descripcion: "Escudo <br> Permite bloquear ataques fuera de turno / 1 Accion / 50% de ataque como daño físico"
    },
    "magia": {
        nombre: "palma",
        icono: "img/magia.png",
        danno: 1,
        coste: 1,
        tipo: "",
        descripcion: "Arma a distancia <br> 1 casillero x ataque / 1 Acción / 100% de ataque como daño mágico"
    },
    "varita": {
        nombre: "varita",
        icono: "img/varita.png",
        danno: 1,
        coste: 1,
        tipo: "",
        descripcion: "Arma a distancia <br> 3 casilleros x ataque / 1 Accion / 100% de ataque como daño mágico"
    },
    "baculo": {
        nombre: "baculo",
        icono: "img/baculo.png",
        danno: 1.5,
        coste: 1,
        tipo: "",
        descripcion: "Arma a distancia <br> 2 casilleros x ataque / 2 Acciones / 150% de ataque como daño mágico"
    },
    "runa": {
        nombre: "runa",
        icono: "img/runa.png",
        danno: 0.75,
        coste: 1,
        tipo: "",
        descripcion: "Arma a distancia <br> 3 casilleros x ataque / 2 Acciones / 75% de ataque como daño mágico"
    },
    "totem": {
        nombre: "totem",
        icono: "img/totem.png",
        danno: 1,
        coste: 1,
        tipo: "",
        descripcion: "Arma a distancia <br> 2 casilleros x ataque / 2 Acciones / 100% de ataque como daño mágico"
    },
    "hojaruna": {
        nombre: "hoja runa",
        icono: "img/hojaruna.png",
        danno: 1,
        coste: 1,
        tipo: "",
        descripcion: "Arma mixta <br> 1 casillero x ataque / 2 Acciones / 100% de ataque como daño físico o mágico"
    },
}

const armas_naturales = {
    "mordisco": {
        nombre: "mordisco",
        icono: "img/mordisco.png",
        danno: 1.5,
        coste: 1,
        tipo: "",
        descripcion: "Mordisco <br> / 2 Acciones / 150% de ataque como daño físico"
    },
    "garras": {
        nombre: "garras",
        icono: "img/garras.png",
        danno: 1,
        coste: 1,
        tipo: "",
        descripcion: "Garras <br> / 1 Accion / 100% de ataque como daño físico"
    },
    "aliento": {
        nombre: "aliento",
        icono: "img/aliento.png",
        danno: 2.5,
        coste: 1,
        tipo: "",
        descripcion: "ALIENTO <br> Arma a distancia / 3 Acciones <br> 250% de ataque como daño mágico <br> Disperción máxima 1 casillero x punto de ataque"
    },
    "pinzas": {
        nombre: "pinzas",
        icono: "img/pinzas.png",
        danno: 1.75,
        coste: 1,
        tipo: "",
        descripcion: "PINZAS <br> Arma cuerpo a cuerpo / 2 Acciones <br> 175% de ataque como daño físico"
    },
    "mente": {
        nombre: "mente",
        icono: "img/mente.png",
        danno: 1,
        coste: 1,
        tipo: "",
        descripcion: "MENTE <br> Arma a distancia / 2 Acciones <br> 100% de ataque como daño mágico. <br> Distancia máxima 2 casillero x punto de ataque"
    },
    "ramas": {
        nombre: "ramas",
        icono: "img/ramas.png",
        danno: 1.25,
        coste: 1,
        tipo: "",
        descripcion: "RAMAS <br> Arma cuerpo a cuerpo / 2 Acciones <br> 125% de ataque como daño físico"
    },
    "hojas": {
        nombre: "hojas",
        icono: "img/hojas.png",
        danno: 1.25,
        coste: 1,
        tipo: "",
        descripcion: "HOJAS <br> Arma mixta / 2 Acciones <br> 125% de ataque como daño físico o mágico. <br> Distancia máxima 2 casillero x punto de ataque "
    },
    "esporas": {
        nombre: "esporas",
        icono: "img/esporas.png",
        danno: 1.75,
        coste: 1,
        tipo: "",
        descripcion: "ESPORAS <br> Arma a distancia / 2 Acciones <br> 175% de ataque como daño mágico. <br> Distancia máxima 1 casillero x punto de ataque"
    },
    "alas": {
        nombre: "alas",
        icono: "img/alas.png",
        danno: 2,
        coste: 1,
        tipo: "",
        descripcion: "ALAS <br> Arma a distancia / 3 Acciones <br> 200% de ataque como daño mágico. <br> Distancia máxima de 2 casillero x punto de ataque"
    },
    "mirada": {
        nombre: "mirada",
        icono: "img/mirada.png",
        danno: 1.5,
        coste: 1,
        tipo: "",
        descripcion: "MIRADA <br> Arma a distancia / 2 Acciones <br> 150% de ataque como daño mágico. <br> Distancia máxima de 1 casilleros x punto de ataque"
    },
    "cuernos": {
        nombre: "cuernos",
        icono: "img/cuernos.png",
        danno: 2.5,
        coste: 1,
        tipo: "",
        descripcion: "CUERNOS <br> Arma mixta / 3 Acciones <br> 250% de ataque como daño físco o mágico. <br> Distancia máxima de hechizos 1 casillero x punto de ataque"
    },
    "cascos": {
        nombre: "cascos",
        icono: "img/cascos.png",
        danno: 1.25,
        coste: 1,
        tipo: "",
        descripcion: "CASCOS <br> Arma cuerpo a cuerpo / 2 Acciones <br> 125% de ataque como daño físico"
    },
    "tentaculos": {
        nombre: "tentaculos",
        icono: "img/tentaculos.png",
        danno: 1.25,
        coste: 1,
        tipo: "",
        descripcion: "TENTACULOS <br> Arma mixta cuerpo a cuerpo / 2 Acciones <br> 125% de ataque como daño mágico o físico"
    },
    "cola": {
        nombre: "cola",
        icono: "img/cola.png",
        danno: 1.25,
        coste: 1,
        tipo: "",
        descripcion: "COLA <br> Arma mixta cuerpo a cuerpo / 2 Acciones <br> 125% de ataque como daño mágico o físico"
    },
    "pico": {
        nombre: "pico",
        icono: "img/pico.png",
        danno: 1.25,
        coste: 1,
        tipo: "",
        descripcion: "PICO <br> Arma cuerpo a cuerpo / 2 Acciones <br> 125% de ataque como daño físico"
    },
    "espinas": {
        nombre: "espinas",
        icono: "img/espinas.png",
        danno: 0.75,
        coste: 1,
        tipo: "",
        descripcion: "ESPINAS <br> Arma mixta cuerpo a cuerpo / 1 Acciones <br> 75% de ataque como daño mágico o físico"
    },
    "lengua": {
        nombre: "lengua",
        icono: "img/lengua.png",
        danno: 1.5,
        coste: 1,
        tipo: "",
        descripcion: "LENGUA <br> Arma mixta cuerpo a cuerpo / 2 Acciones <br> 150% de ataque como daño mágico o físico"
    },
    "aguijon": {
        nombre: "aguijon",
        icono: "img/aguijon.png",
        danno: 2.75,
        coste: 1,
        tipo: "",
        descripcion: "AGUIJON <br> Arma mixta cuerpo a cuerpo / 3 Acciones <br> 275% de ataque como daño mágico o físico"
    },
    "aleta": {
        nombre: "aleta",
        icono: "img/aleta.png",
        danno: 2,
        coste: 1,
        tipo: "",
        descripcion: "ALETA <br> Arma mixta cuerpo a cuerpo / 2 Acciones <br> 200% de ataque como daño mágico o físico"
    },
    "antenas": {
        nombre: "antenas",
        icono: "img/antenas.png",
        danno: 1.25,
        coste: 1,
        tipo: "",
        descripcion: "ANTENAS <br> Arma a distancia / 2 Acciones <br> 125% de ataque como daño mágico o físico <br> distancia máxima 1 casillero x punto de ataque"
    },
    "glandula": {
        nombre: "glandula",
        icono: "img/glandula.png",
        danno: 1.25,
        coste: 1,
        tipo: "",
        descripcion: "GLANDULA <br> Arma mixta cuerpo a cuerpo / 2 Acciones <br> 125% de ataque como daño mágico o físico"
    },
    "raices": {
        nombre: "raices",
        icono: "img/raices.png",
        danno: 1.25,
        coste: 1,
        tipo: "",
        descripcion: "RAICES <br> Arma mixta cuerpo a cuerpo / 2 Acciones <br> 125% de ataque como daño mágico o físico"
    },
    "flores": {
        nombre: "flores",
        icono: "img/flores.png",
        danno: 1.25,
        coste: 1,
        tipo: "",
        descripcion: "FLORES <br> Arma mixta / 2 Acciones <br> 125% de ataque como daño mágico o físico <br> distancia máxima 1 casillero x punto de ataque"
    },
    "frutos": {
        nombre: "frutos",
        icono: "img/frutos.png",
        danno: 1.75,
        coste: 1,
        tipo: "",
        descripcion: "FRUTOS <br> Arma mixta cuerpo a cuerpo / 2 Acciones <br> 175% de ataque como daño mágico o físico <br> distancia máxima 1 casillero x punto de ataque"
    },
}

const armas_ocultas = {
    "fusil": {
        nombre: "fusil",
        icono: "img/fusil.png",
        danno: 2,
        coste: 3,
        tipo: "mecanomagica",
        descripcion: "FUSIL <br> Arma Tecnomágica / 2 Acciones <br> 200% de ataque como daño físico (poder por disparo 3) <br> distancia máxima 3 casillero x punto de ataque"
    },
    "granada": {
        nombre: "granada",
        icono: "img/granada.png",
        danno: 3,
        coste: 6,
        tipo: "mecanomagica",
        descripcion: "GRANADA <br> Arma Tecnomágica  / 3 Acciones <br> 300% de ataque como daño físico en el lugar de impacto y la mitad de este en los casilleros adyacentes (poder por lanzamiento 6) <br> distancia máxima 3 casillero x punto de ataque"
    }
}

export const coleccion_armas = {
    armas_marciales,
    armas_naturales,
    armas_ocultas,
}
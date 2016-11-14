"use strict";

const obterElementos = require("./obterElementos.js");
const Elevador = require("./Elevador.js");

var container = obterElementos(".container")[0]; 
var botoes = obterElementos("button", container);

window.elevador = new Elevador(
    container,
    obterElementos(".andar", container),
    obterElementos(".elevador", container)[0]
);

// Acoplar eventos
botoes.forEach(botao => {
    if (botao.classList.contains("subir")) {
        botao.addEventListener("click", e => elevador.subir(botao.parentElement));
    } else if (botao.classList.contains("descer")) {
        botao.addEventListener("click", e => elevador.descer(botao.parentElement));
    }
});

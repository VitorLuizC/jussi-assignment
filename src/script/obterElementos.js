"use strict";

/**
 * Obtém elementos do container pelo seletores CSS.
 * @param {string} seletores - Seletores CSS.
 * @param {Document|Element} [container = document] - DOM ou elemento de onde os seletores serão obtidos.
 * @returns {Array<Element>}
 */
function obterElementos(seletores, container = document) {
    var elementos = [];

    for (let elemento of container.querySelectorAll(seletores)) {
        elementos.push(elemento);
    }

    return elementos;
}

module.exports = obterElementos;

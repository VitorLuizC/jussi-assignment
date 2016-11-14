"use strict";

/**
 * @param {Array<Object>} lista
 * @param {Function} callback
 * @returns {Array<Object>}
 */
function remover(lista, callback) {
    let index = lista.findIndex(callback);
    lista.splice(index, 1);
    return lista;
}

class Elevador {
    /**
     * Representação do Elevador com suas funções.
     * @param {HTMLElement} container - Container que contém o elevador e seus andares.
     * @param {Array<HTMLElement>} andares - Array com os elementos dos andares.
     * @param {HTMLElement} elevador - Elemento do elevador.
     * @constructor
     */
    constructor(container, andares, elevador) {
        this.container = container;
        this.andares = andares;
        this.elevador = elevador;

        // Estado do elevador, se parado, em movimento, aberto e etc
        this.estado = "parado";

        // Posição e orientação atuais
        this.atual = {
            andar: this.andares[0],
            direcao: "subir"
        };

        // Próximos andares
        this.solicitados = [];
    }

    /**
     * @param {HTMLElement} andar - andar para o qual o elevador se move.
     */
    subir(andar) {
        this.solicitar(andar, "subir");
    }

    /**
     * @param {HTMLElement} andar - andar para o qual o elevador se move.
     */
    descer(andar) {
        this.solicitar(andar, "descer");
    }

    /**
     * Move o elevador até o andar especificado.
     * @param {HTMLElement} andar - andar para o qual o elevador se move.
     * @param {string} direcao - "subir" ou "descer" são direções possíveis do elevador.
     */
    solicitar(andar, direcao) {
        // Não repetir itens nas solicitações
        if (this.solicitados.findIndex(solicitado => solicitado.andar === andar && solicitado.direcao === direcao) !== -1) {
            return;
        }

        this.solicitados.push({ andar: andar, direcao: direcao });

        if (this.atual.andar === andar && this.estado !== "movendo") {
            // Abro as portas do andar atual
            this.abrirPortas(() => {
                // Removo o item da fila de solicitados
                this.solicitados = remover(this.solicitados, _ => _.andar === andar && _.direcao === direcao);
                this.estado = "parado";
            });
        } else {
            this.estado = "movendo";
            this.mover(this.andares.indexOf(andar), () => {
                this.solicitados = remover(this.solicitados, _ => _.andar === andar && _.direcao === direcao);
                this.estado = "parado";

                this.abrirPortas(() => {
                    var proximo = this.solicitados.pop();
                    if (proximo instanceof Object) {
                        this.solicitar(proximo.andar, proximo.direcao);
                    }
                });
            });
        }

        // Reordenar a lista
        this.solicitados.sort((a, b) => {
            const index = solicitacao => this.andares.indexOf(solicitacao.andar);
            const subir = solicitacao => solicitacao.direcao === "subir";

            if (subir(a) && subir(b)) {
                if (index(a) < index(b)) {
                    return -1;
                }
                return 1;
            } else if (subir(a) && !subir(b)) {
                return -1;
            } else if (!subir(a) && subir(b)) {
                return 1;
            } else {
                if (index(a) > index(b)) {
                    return -1;
                }
                return 1;
            }
        });
    }

    /**
     * Move para o andar especificado levando em consideração o andar atual.
     * @param {number} andar
     * @param {Function} depois - Callback executado depois de mover.
     */
    mover(andar, depois) {
        const duracao = 3000;
        var altura = this.container.scrollHeight;
        var quantidade = this.andares.length;

        var transicao = -(altura / quantidade * andar) + "px";

        this.estado = "movendo";

        this.elevador.style.transform = `translateY(${transicao})`;
        this.elevador.style.transition = `transform ${duracao / 1000}s ease`;

        setTimeout(() => {
            this.estado = "parado";
            depois();
        }, duracao);
    }

    /**
     * Abre as portas do elevador.
     * @param {Function} depois - Callback executado depois da abertura das portas.
     */
    abrirPortas(depois) {
        const duracao = 5000;

        this.elevador.classList.add("aberto");
        this.estado = "aberto";

        if (this._abrirPortasTimeout) {
            clearTimeout(this._abrirPortasTimeout);
        }

        this._abrirPortasTimeout = setTimeout(() => {
            this.elevador.classList.remove("aberto");
            depois();
        }, duracao);
    }
}

module.exports = Elevador;

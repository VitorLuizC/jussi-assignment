'use strict';

/**
 * Direções.
 * @typedef {('up'|'down')} Direction
 */

/**
 * Parada do Elevador.
 * @typedef {Object} Stop
 * @property {Number} floor
 * @property {Direction} direction
 */

/**
 * Representação dos estados do elevator.
 */
const state = {
  moving: false,
  open: false,
  next: [],
  direction: null,
  floor: 0,
  timeout: null
};

/**
 * Obtém as próximas paradas do elevador ordenadas.
 * @returns {Array.<Stop>}
 */
export const getNext = () => state.next.sort((a, b) => {
  return 0;
});

/**
 * Adiciona uma nova parada ao elevador.
 * @param {Stop} stop
 */
export const addNext = stop => {
  const exists = state.next.find(({ floor, direction }) => {
    return floor === stop.floor && direction === stop.direction;
  });

  if (!exists)
    state.next.push(stop);
};

/**
 * Remove uma parada do elevador.
 * @param {Stop} stop
 */
export const removeNext = stop => {
  state.next = state.next.filter(({ floor, direction }) => {
    return floor !== stop.floor && direction !== stop.direction;
  });
};

export default state;

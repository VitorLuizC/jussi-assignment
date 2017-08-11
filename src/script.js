'use strict';

/**
 * Obtém os elementos através de um seletor, opcionalmente de um elemento pai.
 * @param {string} selector 
 * @param {Element} [parent]
 * @returns {Array.<Element>}
 */
const getElements = (selector, parent = document) => {
  return [...parent.querySelectorAll(selector)];
};

/**
 * Representação dos estados do elevator.
 * @type {{ element: Element, open: Boolean, next: Array.<({ direction: ('top'|'bottom'), floor: Number })> }}
 */
const elevator = {
  element: null,
  open: false,
  next: [],
  direction: null,
  floor: 0
};

const setup = () => {
  elevator.element = getElements('[data-id="elevator"]')[0];

  const floors = getElements('.floor-block');

  floors.forEach(floor => {
    const number = floor.getAttribute('data-number');
    const [ up ] = getElements('[data-action="go-up"]', floor);
    const [ down ] = getElements('[data-action="go-down"]', floor);

    if (up) up.addEventListener('click', () => {
      elevator.next.push({ floor: +number, direction: 'up' });
      updateUI();
    });

    if (down) down.addEventListener('click', () => {
      elevator.next.push({ floor: +number, direction: 'down' });
      updateUI();
    });
  });

  updateUI();
}

const updateUI = () => {
  // const shouldOpen = elevator.open && !elevator.element.classList.contains('-open');

  // if (shouldOpen) {
  //   elevator.classList.add('-open');
  //   setTimeout(() => {
  //     elevator.open = false;
  //     updateUI();
  //   }, 1000);
  // }

  
};

window.addEventListener('load', setup);

/**
 * Array filter.
 * @typedef {function(T, number, Array.<T>): boolean} Filter
 */

const items = ['Vitor', 'Lucas', 'Wilker'];

/**
 * Merge **N** array filters into a single one.
 * @example
 * [1, 2, 3, 4, 5].filter(
 *   mergeFilters(
 *     n => n > 1,
 *     n => n !== 5
 *   )
 * )
 * @param {...Filter} filters
 * @returns {Filter}
 * @template T
 */
function mergeFilters(...filters) {
  return (...args) => {
    filters.every(filter => filter(...args));
  };
}

[1, 2, 3, 4, 5].filter(
  mergeFilters(
    n => n > 1,
    n => n !== 5
  )
)

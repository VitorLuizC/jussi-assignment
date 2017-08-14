'use strict';

import state, { addNext, getNext, removeNext } from './store';

/**
 * Anexa os eventos do elevador e faz a primeira atualização da UI.
 * @returns {Undefined}
 */
const setup = () => {
  const floors = [...document.querySelectorAll('.floor-block')];

  floors.forEach(floor => {
    const number = floor.getAttribute('data-number');
    const up = floor.querySelector('[data-action="go-up"]');
    const down = floor.querySelector('[data-action="go-down"]');

    if (up) up.addEventListener('click', () => {
      addNext({
        floor: +number,
        direction: 'top'
      });

      updateUI();
    });

    if (down) down.addEventListener('click', () => {
      addNext({
        floor: +number,
        direction: 'down'
      });

      updateUI();
    });
  });

  updateUI();
};

/**
 * Atualiza a UI usando o estado do elevador.
 * @returns {Void}
 */
const updateUI = () => {
  const elevator = document.querySelector('[data-id="elevator"]');
  const floors = [...document.querySelectorAll('.floor-block')];

  elevator.classList.toggle('-open', state.open);

  if (!state.open && state.next.length > 0) {
    const [ next ] = getNext();
    const diference = Math.abs(state.floor - next.floor);

    state.open = false;
    state.moving = true;
    state.direction = next.direction;
    state.timeout = setTimeout(() => {
      state.floor = next.floor;
      state.open = true;
      state.moving = false;
      removeNext(next);
      updateUI();
      state.timeout = setTimeout(() => {
        state.open = false
        state.timeout = null;
        updateUI();
      }, 3000);
    }, diference * 1000);
    elevator.style.transform = `translateY(-${(next.floor * 120) + 120}px)`;
    elevator.style.transitionDuration = `${diference}s`;
    console.log(diference);
  }


  console.log(state);
};

window.addEventListener('load', setup);

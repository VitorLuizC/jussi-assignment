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
    const up = floor.querySelector('[data-action="up"]');
    const down = floor.querySelector('[data-action="down"]');

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
 * @returns {Undefined}
 */
const updateUI = () => {
  const elevator = document.querySelector('[data-id="elevator"]');
  const floors = [...document.querySelectorAll('.floor-block')];
  const [ next ] = getNext();

  console.log(JSON.stringify(getNext(), null, 1));

  elevator.classList.toggle('-open', state.open);

  const goNext = !state.open && state.next.length > 0 && state.timeout === null
  const isNext = next && (next.floor === state.floor && state.direction === next.direction)

  const closeDoors = () => {
    state.timeout = setTimeout(() => {
      state.open = false;
      state.timeout = null;
      updateUI();
    }, 3000);
  }

  if (state.open && isNext) {
    clearTimeout(state.timeout);
    removeNext(next);
    closeDoors();
  }

  if (goNext) {
    const [ next ] = getNext();
    const diference = Math.abs(state.floor - next.floor);

    elevator.style.transform = `translateY(-${(next.floor * 120) + 120}px)`;
    elevator.style.transition = `transform ${diference}s ease`;

    state.open = false;
    state.moving = true;
    state.direction = next.direction;
    state.timeout = setTimeout(() => {
      state.floor = next.floor;
      state.open = true;
      state.moving = false;
      removeNext(next);
      closeDoors();
      updateUI();
    }, diference * 1000);
  }
};

window.addEventListener('load', setup);

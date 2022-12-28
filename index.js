import { checkClick, checkKey } from './scripts/calc.js';
import { toggleModal } from './scripts/modal.js';

const keyPad = document.getElementById('keys');
const openModalBtn = document.getElementById('open-modal');
const closeModalBtn = document.getElementById('close-modal');

keyPad.addEventListener('click', checkClick);
window.addEventListener('keydown', checkKey);
openModalBtn.addEventListener('click', toggleModal);
closeModalBtn.addEventListener('click', toggleModal);

import keyboardData from '../keyboard-symbols.json' assert {type: "json"};
import App from './App.js';
import Keyboard from './Keyboard.js';

App.createStructure(keyboardData);

document.addEventListener('keydown', (event) => {
  const downKey = document.querySelector(`.keyboard__key[data-key="${event.code}"]`);
  downKey.classList.add('key_active');

  if (event.ctrlKey || event.altKey) Keyboard.altCtrl(event);
});

document.addEventListener('keyup', (event) => {
  const downKey = document.querySelector(`.keyboard__key[data-key="${event.code}"]`);
  downKey.classList.remove('key_active');
});

const keyboard = document.querySelector('.keyboard');

keyboard.addEventListener('mousedown', (event) => {
  const { target } = event;
  if (target.classList.contains('keyboard__key')) target.classList.add('key_active');
});

keyboard.addEventListener('mouseup', (event) => {
  const { target } = event;
  if (target.classList.contains('keyboard__key')) target.classList.remove('key_active');
});

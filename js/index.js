import keyboardData from '../keyboard-symbols.json' assert {type: "json"};
import App from './App.js';
import Keyboard from './Keyboard.js';

App.createStructure(keyboardData);

let capsLockPressed = false;

document.addEventListener('keydown', (event) => {
  const downKey = document.querySelector(`.keyboard__key[data-key="${event.code}"]`);
  downKey.classList.toggle('key_active');
  if (event.ctrlKey || event.altKey) Keyboard.altCtrl(capsLockPressed, event);
  else if (event.shiftKey) Keyboard.shift(capsLockPressed, 'keydown');
  else if (event.code === 'CapsLock') {
    capsLockPressed = capsLockPressed ? capsLockPressed = false : capsLockPressed = true;
    Keyboard.capsLock(capsLockPressed);
  }
});

document.addEventListener('keyup', (event) => {
  if (event.code !== 'CapsLock') {
    const downKey = document.querySelector(`.keyboard__key[data-key="${event.code}"]`);
    downKey.classList.remove('key_active');
    if (event.key === 'Shift') Keyboard.shift(capsLockPressed, 'keyup');
  }
});

const keyboard = document.querySelector('.keyboard');

keyboard.addEventListener('mousedown', (event) => {
  const { target } = event;
  if (target.classList.contains('keyboard__key')) target.classList.toggle('key_active');
});

keyboard.addEventListener('mouseup', (event) => {
  const { target } = event;
  if (target.dataset.key !== 'CapsLock') {
    if (target.classList.contains('keyboard__key')) target.classList.remove('key_active');
  }
});

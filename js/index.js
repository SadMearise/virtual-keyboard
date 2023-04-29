import keyboardData from '../keyboard-symbols.json' assert {type: "json"};
import App from './App.js';
import Keyboard from './Keyboard.js';

App.createStructure(keyboardData);

let capsLockPressed = false;

document.addEventListener('keydown', (event) => {
  const downKey = document.querySelector(`.keyboard__key[data-key="${event.code}"]`);
  downKey.classList.toggle('key_active');
  if (event.ctrlKey || event.altKey) Keyboard.altCtrl(capsLockPressed, event);
  else if (event.shiftKey) Keyboard.shift(capsLockPressed, 'buttondown');
  else if (event.code === 'CapsLock') {
    capsLockPressed = capsLockPressed ? capsLockPressed = false : capsLockPressed = true;
    Keyboard.capsLock(capsLockPressed);
  }
});

document.addEventListener('keyup', (event) => {
  if (event.code !== 'CapsLock') {
    const downKey = document.querySelector(`.keyboard__key[data-key="${event.code}"]`);
    downKey.classList.remove('key_active');
    if (event.key === 'Shift') Keyboard.shift(capsLockPressed, 'buttonup');
  }
});

const keyboard = document.querySelector('.keyboard');

// Добавь обработчик для CapsLock.
keyboard.addEventListener('mousedown', (event) => {
  const { target } = event;
  const keyData = target.dataset.key;

  if (target.classList.contains('keyboard__key')) target.classList.toggle('key_active');

  if (keyData === 'ShiftLeft' || keyData === 'ShiftRight') Keyboard.shift(capsLockPressed, 'buttondown');
  else if (keyData === 'CapsLock') {
    capsLockPressed = capsLockPressed ? capsLockPressed = false : capsLockPressed = true;
    Keyboard.capsLock(capsLockPressed);
  }
});

keyboard.addEventListener('mouseup', (event) => {
  const { target } = event;
  const keyData = target.dataset.key;

  if (target.dataset.key !== 'CapsLock') {
    if (target.classList.contains('keyboard__key')) target.classList.remove('key_active');

    if (keyData === 'ShiftLeft' || keyData === 'ShiftRight') Keyboard.shift(capsLockPressed, 'buttonup');
  }
});

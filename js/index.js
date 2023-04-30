import keyboardData from '../keyboard-symbols.json' assert {type: "json"};
import App from './App.js';
import Keyboard from './Keyboard.js';
import replacer from './functions.js';

App.createStructure(keyboardData);

const keyboard = document.querySelector('.keyboard');
const textarea = document.querySelector('.text-area');
let capsLockPressed = false;
let charToPrint;

const focusHandler = () => textarea.focus();
document.addEventListener('keydown', focusHandler);
document.addEventListener('mousedown', focusHandler);

// 1) пофиксить баг с игнором первого символа
// 2) сделать асинхронность
textarea.addEventListener('keydown', (event) => {
  const { code } = event;
  const downKey = document.querySelector(`.keyboard__key[data-key="${code}"]`);

  if (code === 'CapsLock') downKey.classList.toggle('key_active');
  else downKey.classList.add('key_active');

  if (code === 'ControlLeft' || code === 'AltLeft' || code === 'ControlRight' || code === 'AltRight') {
    charToPrint = '';
    Keyboard.altCtrl(capsLockPressed, event);
  } else if (code === 'ShiftLeft' || code === 'ShiftRight') {
    charToPrint = '';
    Keyboard.shift(capsLockPressed, 'buttondown');
  } else if (code === 'Backspace') {
    charToPrint = '';
    Keyboard.backspace(event);
  } else if (code === 'Delete') {
    charToPrint = '';
    Keyboard.delete(event);
  } else if (code === 'CapsLock') {
    charToPrint = '';
    capsLockPressed = capsLockPressed ? capsLockPressed = false : capsLockPressed = true;
    Keyboard.capsLock(capsLockPressed);
  } else if (code === 'Enter') {
    charToPrint = '\n';
  } else if (code === 'Space') {
    charToPrint = ' ';
  } else if (code === 'Tab') {
    charToPrint = '\t';
  } else {
    charToPrint = downKey.innerHTML;
  }

  replacer(event, charToPrint);
});

textarea.addEventListener('keyup', (event) => {
  const { code, key } = event;
  if (code !== 'CapsLock') {
    const downKey = document.querySelector(`.keyboard__key[data-key="${code}"]`);
    downKey.classList.remove('key_active');

    if (key === 'Shift') Keyboard.shift(capsLockPressed, 'buttonup');
  }
});

keyboard.addEventListener('mousedown', (event) => {
  const { target } = event;
  // добавить обработчик клавиш
  if (target.classList.contains('keyboard__key')) {
    const keyData = target.dataset.key;

    target.classList.toggle('key_active');

    if (keyData === 'ShiftLeft' || keyData === 'ShiftRight') Keyboard.shift(capsLockPressed, 'buttondown');
    else if (keyData === 'CapsLock') {
      capsLockPressed = capsLockPressed ? capsLockPressed = false : capsLockPressed = true;
      Keyboard.capsLock(capsLockPressed);
    }

    // textarea.dispatchEvent(
    //   new KeyboardEvent(
    //     'keydown',
    //     {
    //       key: target.innerHTML,
    //       code: keyData,
    //     },
    //   ),
    // );
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

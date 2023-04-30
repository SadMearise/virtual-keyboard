import App from './App.js';
import Keyboard from './Keyboard.js';
import replacer from './functions.js';

const response = await fetch('../keyboard-symbols.json');
const keyboardData = await response.json();

App.createStructure(keyboardData);

const keyboard = document.querySelector('.keyboard');
const textarea = document.querySelector('.text-area');
let capsLockPressed = false;
let charToPrint;

setInterval(() => {
  textarea.focus();
}, 0);

textarea.addEventListener('keydown', (event) => {
  const { code } = event;
  const downKey = document.querySelector(`.keyboard__key[data-key="${code}"]`);

  if (downKey === null) return;
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
  } else if (code === 'MetaLeft') {
    charToPrint = '';
  } else {
    charToPrint = downKey.innerHTML;
  }

  event.preventDefault();

  replacer(event, charToPrint);
});

textarea.addEventListener('keyup', (event) => {
  const { code, key } = event;
  if (code !== 'CapsLock') {
    const downKey = document.querySelector(`.keyboard__key[data-key="${code}"]`);
    if (downKey === null) return;
    downKey.classList.remove('key_active');

    if (key === 'Shift') Keyboard.shift(capsLockPressed, 'buttonup');
  }
});

const mouseHandler = (event, eventName) => {
  const { target } = event;

  if (target.classList.contains('keyboard__key')) {
    const keyData = target.dataset.key;

    textarea.dispatchEvent(
      new KeyboardEvent(
        eventName,
        {
          key: target.innerHTML,
          code: keyData,
        },
      ),
    );
  }
};

keyboard.addEventListener('mousedown', (event) => mouseHandler(event, 'keydown'));
keyboard.addEventListener('mouseup', (event) => mouseHandler(event, 'keyup'));

import App from './App.js';
import Keyboard from './Keyboard.js';
import * as functions from './functions.js';

(async () => {
  const keyboardData = await functions.getData();
  App.createStructure(keyboardData);

  const keyboard = document.querySelector('.keyboard');
  const textarea = document.querySelector('.text-area');
  let capsLockPressed = false;
  let charToPrint;

  document.addEventListener('keydown', (event) => {
    textarea.focus();
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
      Keyboard.backspace();
    } else if (code === 'Delete') {
      charToPrint = '';
      Keyboard.delete();
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
    functions.replacer(textarea, charToPrint);
  });

  document.addEventListener('keyup', (event) => {
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

      textarea.focus();
      textarea.dispatchEvent(
        new KeyboardEvent(
          eventName,
          {
            key: target.innerHTML,
            code: keyData,
            bubbles: true,
          },
        ),
      );
    }
  };

  keyboard.addEventListener('mousedown', (event) => mouseHandler(event, 'keydown'));
  keyboard.addEventListener('mouseup', (event) => mouseHandler(event, 'keyup'));
})();

import App from './App.js';
import Keyboard from './Keyboard.js';
import * as functions from './functions.js';

(async () => {
  const keyboardData = await functions.getData();
  App.createStructure(keyboardData);

  const keyboard = document.querySelector('.keyboard');
  const textarea = document.querySelector('.text-area');
  const keyboardKeys = document.querySelectorAll('.keyboard__key');
  let capsLockPressed = false;
  let charToPrint;

  document.addEventListener('keydown', (event) => {
    textarea.focus();
    const { code } = event;
    const downKey = document.querySelector(`.keyboard__key[data-key="${code}"]`);

    if (downKey === null) return;
    if (code === 'CapsLock') {
      downKey.classList.toggle('key_active_color');
      downKey.classList.toggle('key_active');
    } else downKey.classList.add('key_active', 'key_active_color');

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
      if (downKey.innerHTML === '&lt;') charToPrint = '<';
      else if (downKey.innerHTML === '&gt;') charToPrint = '>';
      else if (downKey.innerHTML === '&amp;') charToPrint = '&';
    }

    event.preventDefault();
    functions.replacer(textarea, charToPrint);
  });

  document.addEventListener('keyup', (event) => {
    const { code, key } = event;
    if (code !== 'CapsLock') {
      const downKey = document.querySelector(`.keyboard__key[data-key="${code}"]`);
      if (downKey === null) return;
      downKey.classList.remove('key_active', 'key_active_color');

      if (key === 'Shift') Keyboard.shift(capsLockPressed, 'buttonup');
    }
  });

  keyboardKeys.forEach((element) => {
    element.addEventListener('mouseover', (event) => {
      const { target } = event;
      const keyData = target.dataset.key;

      if (keyData !== 'CapsLock') target.classList.add('key_active_color');
    });

    element.addEventListener('mouseout', (event) => {
      const { target } = event;
      const keyData = target.dataset.key;

      if (keyData !== 'CapsLock') target.classList.remove('key_active', 'key_active_color');
    });
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

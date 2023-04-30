import App from './App.js';

export default class Keyboard {
  static async init(type) {
    const keyboardRows = document.querySelectorAll('.keyboard__row');
    const response = await fetch('../keyboard-symbols.json');
    const keyboardData = await response.json();

    keyboardRows.forEach((row, rowIndex) => {
      const keyboardKeys = row.querySelectorAll('.keyboard__key');
      const keyboardRowData = keyboardData[`row${rowIndex + 1}`];

      keyboardKeys.forEach((key, keyIndex) => {
        const keyElement = key;

        const keyboardKeyData = keyboardRowData[`key${keyIndex + 1}`];
        const { language } = keyboardKeyData;

        const currentLanguage = App.getLocalStorage('language');

        keyElement.innerText = language[currentLanguage][type];
      });
    });
  }

  static altCtrl(capsLockState, event) {
    if (event.ctrlKey && event.altKey) {
      if (App.getLocalStorage('language') === 'ru') {
        App.setLocalStorage('language', 'en');
      } else {
        App.setLocalStorage('language', 'ru');
      }

      if (capsLockState) {
        this.init('upperCase');
      } else {
        this.init('lowerCase');
      }
    }
  }

  static capsLock(capsLockState) {
    if (capsLockState) {
      this.init('upperCase');
    } else {
      this.init('lowerCase');
    }
  }

  static shift(capsLockState, listener) {
    if (capsLockState) {
      if (listener === 'buttondown') {
        this.init('lowerCase');
      } else {
        this.init('shift');
      }
    } else if (!capsLockState) {
      if (listener === 'buttondown') {
        this.init('shift');
      } else {
        this.init('lowerCase');
      }
    }
  }

  static backspace(event) {
    const { target } = event;
    const start = target.selectionStart;
    const end = target.selectionEnd;
    const oldValue = target.value;

    if (start !== 0) {
      const newValue = `${oldValue.slice(0, start !== end ? start : start - 1)}${oldValue.slice(end)}`;
      target.value = newValue;

      target.selectionStart = start !== end ? start : start - 1;
      target.selectionEnd = target.selectionStart;
    }
  }

  static delete(event) {
    const { target } = event;
    const start = target.selectionStart;
    const end = target.selectionEnd;
    const oldValue = target.value;

    if (oldValue.length > end) {
      const newValue = `${oldValue.slice(0, start)}${oldValue.slice(end + 1)}`;
      target.value = newValue;
      target.selectionStart = start;
      target.selectionEnd = target.selectionStart;
    }
  }
}

import App from './App.js';
import { getData } from './functions.js';

export default class Keyboard {
  static async init(type) {
    const keyboardRows = document.querySelectorAll('.keyboard__row');
    const keyboardData = await getData();

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

  static backspace() {
    const textarea = document.querySelector('.text-area');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const oldValue = textarea.value;

    if (start !== 0) {
      const newValue = `${oldValue.slice(0, start !== end ? start : start - 1)}${oldValue.slice(end)}`;
      textarea.value = newValue;

      textarea.selectionStart = start !== end ? start : start - 1;
      textarea.selectionEnd = textarea.selectionStart;
    }
  }

  static delete() {
    const textarea = document.querySelector('.text-area');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const oldValue = textarea.value;

    if (oldValue.length > end) {
      const newValue = `${oldValue.slice(0, start)}${oldValue.slice(end + 1)}`;
      textarea.value = newValue;
      textarea.selectionStart = start;
      textarea.selectionEnd = textarea.selectionStart;
    }
  }
}

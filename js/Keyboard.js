import keyboardData from '../keyboard-symbols.json' assert {type: "json"};
import App from './App.js';

export default class Keyboard {
  static init(type) {
    const keyboardRows = document.querySelectorAll('.keyboard__row');

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

    event.preventDefault();
  }

  static capsLock(capsLockState) {
    if (capsLockState) {
      this.init('upperCase');
    } else {
      this.init('lowerCase');
    }
  }

  static shift(capsLockState, event) {
    if (capsLockState) {
      if (event === 'buttondown') {
        this.init('lowerCase');
      } else {
        this.init('shift');
      }
    } else if (!capsLockState) {
      if (event === 'buttondown') {
        this.init('shift');
      } else {
        this.init('lowerCase');
      }
    }
  }
}

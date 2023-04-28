import keyboardData from '../keyboard-symbols.json' assert {type: "json"};
import App from './App.js';

export default class Keyboard {
  static init(event) {
    const keyboardRows = document.querySelectorAll('.keyboard__row');

    keyboardRows.forEach((row, rowIndex) => {
      const keyboardKeys = row.querySelectorAll('.keyboard__key');
      const keyboardRowData = keyboardData[`row${rowIndex + 1}`];

      keyboardKeys.forEach((key, keyIndex) => {
        const keyElement = key;

        const keyboardKeyData = keyboardRowData[`key${keyIndex + 1}`];
        const { language } = keyboardKeyData;

        if (event === 'language') {
          const currentLanguage = App.getLocalStorage('language');
          keyElement.innerText = language[currentLanguage].lowerCase;
        }
      });
    });
  }

  static altCtrl(event) {
    if (event.ctrlKey && event.altKey) {
      if (App.getLocalStorage('language') === 'ru') {
        App.setLocalStorage('language', 'en');
      } else {
        App.setLocalStorage('language', 'ru');
      }
      this.init('language');
    }

    event.preventDefault();
  }
}

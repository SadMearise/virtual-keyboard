export default class App {
  static setLocalStorage(item, list) {
    localStorage.setItem(item, JSON.stringify(list));
  }

  static getLocalStorage(item) {
    return JSON.parse(localStorage.getItem(item));
  }

  static createStructure(keyboardData) {
    const fragment = document.createDocumentFragment();

    const main = document.createElement('main');
    main.classList.add('wrapper');
    main.classList.add('container');
    fragment.append(main);

    const app = document.createElement('div');
    app.classList.add('app');
    main.append(app);

    const title = document.createElement('h1');
    title.classList.add('app__title');
    title.innerText = 'Virtual Keyboard';
    app.append(title);

    const textarea = document.createElement('textarea');
    textarea.classList.add('app__text-area');
    textarea.classList.add('text-area');
    app.append(textarea);

    const keyboard = document.createElement('div');
    keyboard.classList.add('app__keyboard');
    keyboard.classList.add('keyboard');
    app.append(keyboard);

    let localStorageLanguage = this.getLocalStorage('language');
    if (!localStorageLanguage) {
      this.setLocalStorage('language', 'ru');
      localStorageLanguage = this.getLocalStorage('language');
    }

    const keyboardLength = Object.keys(keyboardData).length;
    for (let i = 0; i < keyboardLength; i += 1) {
      const row = document.createElement('div');
      row.classList.add('keyboard__row');
      keyboard.append(row);

      const keyboardRow = keyboardData[`row${i + 1}`];
      const keyboardRowLength = Object.keys(keyboardRow).length;

      for (let j = 0; j < keyboardRowLength; j += 1) {
        const key = document.createElement('div');

        const keyboardKey = keyboardRow[`key${j + 1}`];
        const { classes, language, dataAttribute } = keyboardKey;
        const classesLength = Object.keys(classes).length;

        for (let k = 0; k < classesLength; k += 1) {
          key.classList.add(classes[k]);
        }
        key.innerText = language[localStorageLanguage].lowerCase;

        key.setAttribute('data-key', dataAttribute);
        row.append(key);
      }
    }

    const description = document.createElement('div');
    description.classList.add('app__description');
    description.classList.add('description');

    const paragraph1 = document.createElement('p');
    const paragraph2 = document.createElement('p');
    paragraph1.classList.add('description__text');
    paragraph1.innerText = 'Клавиатура создана в операционной системе Windows';
    paragraph2.classList.add('description__text');
    paragraph2.innerText = 'Для переключения языка комбинация: левыe ctrl + alt';
    description.append(paragraph1);
    description.append(paragraph2);

    app.append(description);

    document.body.prepend(main);
  }
}

export default class App {
  static setLocalStorage(item, list) {
    localStorage.setItem(item, JSON.stringify(list));
  }

  static getLocalStorage(item) {
    return JSON.parse(localStorage.getItem(item));
  }

  static createStructure(keyboardData) {
    const fragment = document.createDocumentFragment();

    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    fragment.append(wrapper);

    const main = document.createElement('main');
    main.classList.add('main', 'container');
    wrapper.append(main);

    const app = document.createElement('div');
    app.classList.add('app');
    main.append(app);

    const title = document.createElement('h1');
    title.classList.add('app__title');
    title.innerText = 'Virtual Keyboard';
    app.append(title);

    const textarea = document.createElement('textarea');
    textarea.classList.add('app__text-area', 'text-area');
    textarea.setAttribute('placeholder', 'Рассказывай всё как следует, не торопись...');
    textarea.setAttribute('rows', '7');
    textarea.setAttribute('cols', '30');
    app.append(textarea);

    const keyboard = document.createElement('div');
    keyboard.classList.add('app__keyboard', 'keyboard');
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
    description.classList.add('app__description', 'description');

    const paragraph1 = document.createElement('p');
    const paragraph2 = document.createElement('p');
    paragraph1.classList.add('description__text');
    paragraph1.innerText = 'Клавиатура создана в операционной системе Windows';
    paragraph2.classList.add('description__text');
    paragraph2.innerText = 'Для переключения языка комбинация: левыe ctrl + alt';
    description.append(paragraph1);
    description.append(paragraph2);

    app.append(description);

    const footer = document.createElement('footer');
    footer.classList.add('footer', 'container');

    const copy = document.createElement('div');
    copy.classList.add('footer__copy');
    copy.innerText = '© SadMearise';
    footer.append(copy);

    wrapper.append(footer);
    document.body.prepend(fragment);
  }
}

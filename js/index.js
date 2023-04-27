class Keyboard {
  static async getSymbols() {
    const result = await fetch('../keyboard-symbols.json');
    const data = await result.json();
    return data;
  }

  static async createStructure() {
    const fragment = document.createDocumentFragment();

    const main = document.createElement('main');
    main.classList.add('wrapper');
    main.classList.add('container');
    fragment.append(main);

    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');
    main.append(keyboard);

    const title = document.createElement('h1');
    title.classList.add('keyboard__title');
    title.innerText = 'Virtual Keyboard';
    keyboard.append(title);

    const textarea = document.createElement('textarea');
    textarea.classList.add('keyboard__text-area');
    keyboard.append(textarea);

    const body = document.createElement('div');
    body.classList.add('keyboard__body');
    keyboard.append(body);
    const keyboardSymbols = await this.getSymbols();

    for (let i = 0; i < 5; i += 1) {
      const row = document.createElement('div');
      row.classList.add('keyboard__row');
      body.append(row);

      const keyboardRow = keyboardSymbols[`row${i + 1}`];
      const objectLength = Object.keys(keyboardRow).length;

      for (let j = 0; j < objectLength; j += 1) {
        const key = document.createElement('div');

        const keyboardKey = keyboardRow[`key${j + 1}`];
        const { classes, language } = keyboardKey;
        const objectClassesLength = Object.keys(classes).length;

        for (let x = 0; x < objectClassesLength; x += 1) {
          key.classList.add(classes[x]);
        }

        key.innerText = language.ru.lowerCase;
        row.append(key);
      }
    }

    document.body.prepend(main);
  }
}

Keyboard.createStructure();

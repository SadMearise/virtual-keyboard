import keyboardSymbols from '../keyboard-symbols.json' assert {type: "json"};

class App {
  constructor(keyboardData) {
    this.keyboardData = keyboardData;
  }

  createStructure() {
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

    const keyboardLength = Object.keys(this.keyboardData).length;
    for (let i = 0; i < keyboardLength; i += 1) {
      const row = document.createElement('div');
      row.classList.add('keyboard__row');
      keyboard.append(row);

      const keyboardRow = this.keyboardData[`row${i + 1}`];
      const keyboardRowLength = Object.keys(keyboardRow).length;

      for (let j = 0; j < keyboardRowLength; j += 1) {
        const key = document.createElement('div');

        const keyboardKey = keyboardRow[`key${j + 1}`];
        const { classes, language } = keyboardKey;
        const classesLength = Object.keys(classes).length;

        for (let k = 0; k < classesLength; k += 1) {
          key.classList.add(classes[k]);
        }

        key.innerText = language.ru.lowerCase;
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

const app = new App(keyboardSymbols);
app.createStructure();

document.addEventListener('keydown', (event) => {
  console.log(event.code);
});

const arr = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete',
  'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
  'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
  'ControlLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'];

console.log(arr);

export default function replacer(event, charToPrint) {
  const { target } = event;
  const start = target.selectionStart;
  const end = target.selectionEnd;
  const oldValue = target.value;

  console.log('replacer', start, end, oldValue);
  const newValue = `${oldValue.slice(0, start)}${charToPrint}${oldValue.slice(end)}`;

  target.value = newValue;

  target.selectionStart = start + charToPrint.length;
  target.selectionEnd = target.selectionStart;

  event.preventDefault();
}

// 1)
// добавить проверку
// functions.js:7 Uncaught TypeError: Cannot read properties of undefined (reading 'slice')
//     at replacer (functions.js:7:32)
//     at HTMLDocument.<anonymous> (index.js:46:3)

export default function replacer(event, charToPrint) {
  const { target } = event;
  const start = target.selectionStart;
  const end = target.selectionEnd;
  const oldValue = target.value;

  const newValue = `${oldValue.slice(0, start)}${charToPrint}${oldValue.slice(end)}`;
  target.value = newValue;

  target.selectionStart = start + charToPrint.length;
  target.selectionEnd = target.selectionStart;

  event.preventDefault();
}

export function replacer(element, charToPrint) {
  const textarea = element;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const oldValue = textarea.value;

  const newValue = `${oldValue.slice(0, start)}${charToPrint}${oldValue.slice(end)}`;
  textarea.value = newValue;

  textarea.selectionStart = start + charToPrint.length;
  textarea.selectionEnd = textarea.selectionStart;
}

export async function getData() {
  const response = await fetch('../keyboard-symbols.json');
  const keyboardData = await response.json();
  return keyboardData;
}

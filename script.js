const card = document.querySelector('.card-inner');
const textInput = document.getElementById('card-text');
const fontSelect = document.getElementById('font-family');
const colorPicker = document.getElementById('text-color');
const fontSizeSelect = document.getElementById('font-size');
const addTextButton = document.getElementById('add-text-button');
const undoButton = document.getElementById('undo');
const redoButton = document.getElementById('redo');

let textElements = [];
let undoStack = [];
let redoStack = [];

addTextButton.addEventListener('click', () => {
    const text = textInput.value.trim(); // Trim leading/trailing whitespace

  // Check if text is empty after trimming
  if (text === '') {
    return; // Do nothing if empty text
  }

    const newTextElement = document.createElement('div');
    newTextElement.className = 'text-element';
    newTextElement.style.fontFamily = fontSelect.value;
    newTextElement.style.color = colorPicker.value;
    newTextElement.style.fontSize = `${fontSizeSelect.value}px`;
    newTextElement.innerText = text;

    card.appendChild(newTextElement);
    textElements.push(newTextElement);
    undoStack.push({ action: 'add', element: newTextElement });
    redoStack = [];

    textInput.value = '';
});

undoButton.addEventListener('click', () => {
    if (undoStack.length === 0) return;

    const lastAction = undoStack.pop();
    if (lastAction.action === 'add') {
        card.removeChild(lastAction.element);
        textElements = textElements.filter(el => el !== lastAction.element);
    }

    redoStack.push(lastAction);
});

redoButton.addEventListener('click', () => {
    if (redoStack.length === 0) return;

    const lastAction = redoStack.pop();
    if (lastAction.action === 'add') {
        card.appendChild(lastAction.element);
        textElements.push(lastAction.element);
    }

    undoStack.push(lastAction);
});

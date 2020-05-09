import { SEARCH_INPUT as textArea, CONTAINER } from './constants'

export const enButtons = [['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '&#8592'],
                    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'],
                    ['CapsLk', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
                    ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '&#9650', 'Shift'],
                    ['Ctrl', 'ru/en', 'Alt', ' ', 'Alt', 'Сtrl', '&#9668', '&#9660', '&#9658'] ];

export const ruButtons = [['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '&#8592'],
                    ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '&#92;', 'Del'],
                    ['CapsLk', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
                    ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '&#9650', 'Shift'],
                    ['Ctrl', 'ru/en', 'Alt', ' ', 'Alt', 'Ctrl', '&#9668', '&#9660', '&#9658']];

const ruShift = [['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', '&#8592'],
                    ['Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'Del'],
                    ['CapsLk', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter'],
                    ['Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '&#9650', 'Shift'],
                    ['Ctrl', 'ru/en', 'Alt', ' ', 'Alt', 'Ctrl', '&#9668', '&#9660', '&#9658']];

const enShift = [['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '&#8592'],
                    ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Del'],
                    ['CapsLk', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter'],
                    ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '&#9650', 'Shift'],
                    ['Ctrl', 'ru/en', 'Alt', ' ', 'Alt', 'Ctrl', '&#9668', '&#9660', '&#9658']];

const keyCode = [['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
                    ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete'],
                    ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
                    ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
                    ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight']]

const special = ['Backspace', 'Tab', 'Delete', 'CapsLock', 'Enter', 'ShiftLeft', 'ArrowUp', 'ShiftRight', 'ControlLeft', 
                'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];

let capsLock = false;
let shift = false;

export const createMarkup = () => {
    const keyboard = document.createElement('div');
    keyboard.className = "keyboard";
    CONTAINER.append(keyboard);
}

export const createButtons = (arr) => { 
    for(let i = 0; i < arr.length; i+=1) {
        const row = document.createElement('div');
        row.className = "keyboard__row";
        for(let j = 0; j < arr[i].length; j+=1) {
            const button = document.createElement('div');
            button.className = "keyboard__button";
            button.id = keyCode[i][j];
            button.innerHTML = arr[i][j];
            row.append(button);
        }
        document.querySelector('.keyboard').append(row);
    }
}

const printSymbols = id => {
    const buttons = document.querySelectorAll('.keyboard__button');
    buttons.forEach((btn) => {
        if(btn.id === id) {  
            textArea.setRangeText(btn.innerHTML, textArea.selectionStart, textArea.selectionEnd, "end");
            textArea.focus(); 
        }
    })
}

const isSpecial = (code) => {
    return special.includes(code);
}

const handleTab = () => {
    textArea.setRangeText('    ', textArea.selectionStart, textArea.selectionEnd, "end");
}

const handleSpace = () => {
    textArea.setRangeText(' ', textArea.selectionStart, textArea.selectionEnd, "end");
}

const handleBackspace = () => {
    if(textArea.selectionStart && textArea.selectionStart===textArea.selectionEnd) {
        textArea.setRangeText('', textArea.selectionStart-1, textArea.selectionEnd);
    }
    else if(textArea.selectionStart!==textArea.selectionEnd) {
        textArea.setRangeText('', textArea.selectionStart, textArea.selectionEnd);
    }
}

const handleDelete = () => {
    textArea.setRangeText('', textArea.selectionStart, textArea.selectionEnd+1, 'end');
    textArea.focus();
}

const handleCapsLock = () => {
    const buttons = document.querySelectorAll('.keyboard__button');
    buttons.forEach((btn) => {
        const button = btn;
        if(btn.innerHTML.length === 1) {
            if(shift) {
                if(capsLock) {
                    button.innerHTML = button.innerHTML.toUpperCase();
                }
                else {
                    button.innerHTML = button.innerHTML.toLowerCase();
                }
            }
            else if(capsLock) {
                    button.innerHTML = button.innerHTML.toLowerCase();
                }
                else {
                    button.innerHTML = button.innerHTML.toUpperCase();
                }
        }
    });
    capsLock = !capsLock;
}

const handleArrowLeft = () => {
    if(textArea.selectionStart) {
        textArea.selectionStart -= 1;
        textArea.selectionEnd = textArea.selectionStart;
    }
}

const handleArrowRight = () => {
    textArea.selectionStart += 1;
    textArea.selectionEnd += 1;
}

const showAnimation = code => {
    const buttons = document.querySelectorAll('.keyboard__button');
    buttons.forEach((btn) => {
        if(btn.id === code) {
            btn.classList.toggle('pressed');
        }
    })
    textArea.focus();
}

const replaceKeyboard = arr => {
    const rows = document.querySelectorAll('.keyboard__row');
    rows.forEach((row) => {
        row.remove();
    })

    if(capsLock) {
        if(shift) {
            createButtons(localStorage.getItem('lang') === 'en' ? enButtons : ruButtons);
            handleCapsLock();
            shift = !shift;
            capsLock = !capsLock;
        }
        else {
            createButtons(arr);
            shift = !shift;
            capsLock = !capsLock;
            handleCapsLock();
        }
    }
    else {
        if(shift) {
            createButtons(localStorage.getItem('lang') === 'en' ? enButtons : ruButtons);
        }
        else {
            createButtons(arr);
        }
        shift = !shift;
    }
}

const changeLanguage = () => { 
    const rows = document.querySelectorAll('.keyboard__row');
    rows.forEach((row)=>{
        row.remove();
    })
    
    if (localStorage.getItem('lang') === 'ru') {
        createButtons(enButtons);
        localStorage.setItem('lang','en');
    }
    else {
        createButtons(ruButtons);
        localStorage.setItem('lang','ru');
    }
    if(capsLock) {
        capsLock = !capsLock;
        handleCapsLock();
    }
    if(shift) {
        shift = !shift;
        replaceKeyboard(localStorage.getItem('lang') === 'en' ? enShift : ruShift);
    }
}

export const handleVirtualKeyboard = () => {
    const keyboard = document.querySelector('.keyboard');
    keyboard.addEventListener("mousedown", (event) => {
        textArea.focus();
        const {id} = event.target;
        if(id === "Tab") {
            handleTab();
        }
        else if(id === "MetaLeft") {
            changeLanguage();
        }
        else if(id === "ShiftLeft" || id === "ShiftRight") {
            replaceKeyboard(localStorage.getItem('lang') === 'en' ? enShift : ruShift);
        }
        else if(id === "Space") {
            handleSpace();
        }
        else if(id === "Backspace") {
            handleBackspace();
        }
        else if(id === "Delete") {
            handleDelete();
        }
        else if(id === "CapsLock") {
            handleCapsLock();
        }
        else if(id === 'ArrowUp' || id === 'ArrowDown') {
            printSymbols(id);
        }
        else if(id === 'ArrowLeft') {
            handleArrowLeft();
        }
        else if(id === 'ArrowRight') {
            handleArrowRight();
        }
        if(isSpecial(id)) {
            textArea.focus();
            console.log(textArea.selectionStart, textArea.selectionEnd);
        }
        else {
            printSymbols(id);
        }
        showAnimation(id);
        textArea.focus();
    })

    keyboard.addEventListener("mouseup", (event) => {
        const buttons = document.querySelectorAll('.keyboard__button');
        const {id} = event.target;
        buttons.forEach((btn) => {
            if(btn.id === id) { 
                btn.classList.toggle('pressed');
            }
        })
    })
};

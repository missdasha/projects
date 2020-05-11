import { SEARCH_INPUT as textArea, CONTAINER, enButtons, ruButtons, ruShift, enShift, keyCode, special, META_LEFT, SHIFT_LEFT, 
SHIFT_RIGHT, TAB, BACKSPACE, DELETE, CAPSLOCK, ARROW_LEFT, ARROW_RIGHT, SPACE}  from './constants';

let capsLock = false;
let shift = false;

export const createMarkup = () => {
    const keyboard = document.createElement('div');
    keyboard.className = "keyboard";
    CONTAINER.append(keyboard);
}

export const createButtons = arr => { 
    arr.forEach((line, lineInd) => {
        const row = document.createElement('div');
        row.className = "keyboard__row";
        line.forEach((elem, elemInd) => {
            const button = document.createElement('div');
            button.className = "keyboard__button";
            button.id = keyCode[lineInd][elemInd];
            button.innerHTML = arr[lineInd][elemInd];
            row.append(button);
        });
        document.querySelector('.keyboard').append(row);
    }); 
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

export const isSpecial = code => special.includes(code);

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
    textArea.selectionEnd = textArea.selectionStart;
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
        event.preventDefault();
        const {id} = event.target;
        if(id === TAB) {
            handleTab();
        }
        else if(id === META_LEFT) {
            changeLanguage();
        }
        else if(id === SHIFT_LEFT || id === SHIFT_RIGHT) {
            replaceKeyboard(localStorage.getItem('lang') === 'en' ? enShift : ruShift);
        }
        else if(id === SPACE) {
            handleSpace();
        }
        else if(id === BACKSPACE) {
            handleBackspace();
        }
        else if(id === DELETE) {
            handleDelete();
        }
        else if(id === CAPSLOCK) {
            handleCapsLock();
        }
        else if(id === ARROW_LEFT) {
            handleArrowLeft();
        }
        else if(id === ARROW_RIGHT) {
            handleArrowRight();
        }
        if(isSpecial(id)) {
            textArea.focus();
        }
        else {
            printSymbols(id);
        }
        showAnimation(id);
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

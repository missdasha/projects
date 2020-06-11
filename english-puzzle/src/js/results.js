import  {GAME, RESULTS, DONT_KNOW, KNOW} from './constants'

const showResults = (pageWords, phrasesGiveUp) => {
    GAME.classList.add('none');
    RESULTS.classList.remove('none');
    const audio = `<div class="hint__dynamic"><img src="img/icons8-dynamic.png"></div>`;
    pageWords.forEach((phrase, ind) => {
        if (phrasesGiveUp.includes(ind)) {
            DONT_KNOW.insertAdjacentHTML('beforeend', `<div>${audio}${pageWords[ind].textExample.slice(0, -1).replace('<b>', '').replace('</b>', '')}</div>`);
        }
        else {
            KNOW.insertAdjacentHTML('beforeend', `<div>${audio}${pageWords[ind].textExample.slice(0, -1).replace('<b>', '').replace('</b>', '')}</div>`);
        }
    });
}

export default showResults;
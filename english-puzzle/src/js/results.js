import  {GAME, RESULTS, DONT_KNOW, KNOW, PHRASES, PICTURE, PICTURES_PATH} from './constants'

const showResults = (pageWords, phrasesGiveUp, pictureInfo) => {
    GAME.classList.add('none');
    RESULTS.classList.remove('none');
    const path = `${PICTURES_PATH}${pictureInfo.cutSrc}`;
    PICTURE.insertAdjacentHTML('beforeend', `<a href="${path}" target="_blank"><img src="${path}"></a>`);
    PICTURE.insertAdjacentHTML('beforeend', `<p>${pictureInfo.author} - ${pictureInfo.name}(${pictureInfo.year})</p>`);
    const audio = `<div class="hint__dynamic"><img src="img/icons8-dynamic.png"></div>`;
    pageWords.forEach((phrase, ind) => {
        const sentence = phrase.textExample.slice(0, -1).replace('<b>', '').replace('</b>', '');
        const translation = phrase.textExampleTranslate;
        if (phrasesGiveUp.includes(ind)) {
            DONT_KNOW.insertAdjacentHTML('beforeend', `<div data-audio="${phrase.audioExample}">${audio}<p>${sentence}<br>${translation}</p></div>`);
        }
        else {
            KNOW.insertAdjacentHTML('beforeend', `<div data-audio="${phrase.audioExample}">${audio}<p>${sentence}<br>${translation}</p></div>`);
        }
    });
    phrasesGiveUp.splice(0);
}

PHRASES.addEventListener('click', event => {
    if (event.target.tagName === 'P' || event.target.className !== 'hint__dynamic' || event.target.tagName !== 'IMG') {
        const element = event.target.closest('[data-audio]');
        if (element.firstChild !== null) {
            const dynamic = element.firstChild;
            dynamic.classList.add('active');
            const path = element.getAttribute('data-audio');
            const audio = new Audio(`https://raw.githubusercontent.com/missdasha/rslang-data/master/${path}`);
            audio.play();
            audio.addEventListener('ended', () => dynamic.classList.remove('active'));
        }
    }
})
export default showResults;
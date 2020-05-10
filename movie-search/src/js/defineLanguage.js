import {REGEX_EN, REGEX_RU} from './constants';

export const isRuLang = name => REGEX_RU.test(name);
export const isEnLang = name => REGEX_EN.test(name);
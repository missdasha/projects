export const isRuLang = name => /(^[А-я\s]+)(?!.*[A-z])$/.test(name);
export const isEnLang = name => /(^[A-z0-9\s]+)(?!.*[А-я])$/.test(name);
import '../css/style.css';
import '../css/style.scss';
// const images = require.context("../img", false, /\.(png|jpe?g|svg)$/);
import {
  moduleOne
} from './moduleOne';

const helloArr = require('./moduleOne.js');



class TestClass {
  constructor() {
    const msg = "Using ES2015+ syntax";
    console.log(msg);
  }
}

// eslint-disable-next-line no-unused-vars
const test = new TestClass();


// Пример массива
console.log(helloArr);

/* пример подключения модуля */
const mod = moduleOne(2, 3);

console.log(mod);


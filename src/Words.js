import wordBank from './word-bank.txt';

export const boardDefault = [
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
];

export const generateWordSet = async() => {
    let wordSet;

    await fetch(wordBank)
        .then((response) => response.text())
        .then((result) => {
            const wordArr = result.split('\n')
            wordSet = new Set(wordArr)
        });
        return { wordSet };
};

export const getNewWord = async() => {
    let newWord;

    await fetch(wordBank)
        .then((response) => response.text())
        .then((result) => {
            const wordArr = result.split('\n')
            newWord = wordArr[ Math.floor(Math.random() * wordArr.length) ].toUpperCase()
        })
        return newWord;
};
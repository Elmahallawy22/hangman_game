let letterString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let letterArray = Array.from(letterString);
let theLetters = document.querySelector('.theLetter');

letterArray.forEach((item) => {
    let span = document.createElement('span');
    span.classList.add('box');
    let spanText = document.createTextNode(item);
    span.append(spanText);
    theLetters.append(span);
});

let words = {
    people: ['youssef', 'Mohamed', "Ali", 'Eslam', 'Ahmed', 'Habiba', 'Eman'],
    programming: ['JavaScript', 'Java', 'Kotlin', 'Python', 'php', 'Dart', 'Swift'],
    countery: ['Egypt', 'Usa', 'England', 'France', 'Russia', 'German', 'Palsitene'],
    city: ['Cairo', 'Alxindaria', 'El Mansoura', 'Tanta', 'Banha', 'El mahalh', 'Asuit', 'Aswan']
}

let wordsKeys = Object.keys(words);
let properityNumber = Math.floor(Math.random() * wordsKeys.length);
let properityName = wordsKeys[properityNumber]
let properityValue = words[properityName];
let wordNumber = Math.floor(Math.random() * properityValue.length)
let wordName = properityValue[wordNumber];

document.querySelector('.category span').innerHTML = properityName;
let list = [];
let guess = document.querySelector('.letter-guess')
let wordNameArray = Array.from(wordName);
let count = 0;
wordNameArray.forEach((letter, index) => {
    let span = document.createElement('span');
    span.classList.add('guess-box')
    if (letter === ' ') {
        span.innerHTML = '-';
        list.push(1);
        span.classList.add('dashed');
    }
    if (index === count)  span.innerHTML = letter.toUpperCase();
    for (let i = index + 1; i < wordNameArray.length; i++) {
        if (letter === wordNameArray[i]) {
            list.push(2);
            break;
        }
    }
    guess.append(span);
})

let spans = document.querySelectorAll('.letter-guess span')
let game = document.querySelector('.hangman-game');
let worngCount = 0;
let trueCount = 0;
document.addEventListener('click', (e) => {
    let status = false;
    if (e.target.classList.contains('box')) {
        e.target.classList.add('clicked');
        let letterChosen = e.target.innerHTML.toLowerCase();
        let word = Array.from(wordName.toLowerCase());
        word.forEach((item, index) => {
            if (item === letterChosen) {
                status = true;
                spans[index].innerHTML = item.toUpperCase();
            }
        })
        if (status !== true) {
            worngCount++;
            game.classList.add(`worng${worngCount}`)
        }
        if (worngCount === 8) {
            theLetters.classList.add('finished');
            tofinished();
        }
        if (status === true) {
            trueCount++;
            if (trueCount === wordName.length - list.length - 1) {
                theLetters.classList.add('finished');
                success(worngCount);
            }
        }
    }
});

function tofinished() {
    let alert = document.createElement('div');
    alert.classList.add('alert-finish')
    let alertText = document.createTextNode(`GAME OVER.. \n The Word is :  `);
    alert.append(alertText);
    let alertSpan = document.createElement('span');
    alertSpan.style.color = 'red';
    alertSpan.innerHTML =wordName;
    alert.append(alertSpan)
    document.body.append(alert);
}
function success(s) {
    let alert = document.createElement('div');
    alert.classList.add('alert-seccess')
    if (s < 3) alert.innerHTML = 'Excellent';
    else if (s >= 3 && s < 6) alert.innerHTML = 'Good';
    else if (s >= 6) alert.innerHTML = 'Poor';
    document.body.append(alert);
}
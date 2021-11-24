document.getElementById('play').addEventListener('click', startGame);

function startGame() {
    // importa il value selezionato e assegna alla variabile gameMode la difficoltà
    const gameMode = getSelectValue();

    // creare la griglia in base alla difficolta selezionata
    const numberOfSquares = gameModeSquares(gameMode);
    let generatedNumbers = generateSquaresNumbers(numberOfSquares);

    // generare i numeri rappresentanti le bombe
    const numberOfBombs = 16;
    const bombNumbers = generateBombs(gameMode);
    console.log(bombNumbers);

    // Per ogni numero nell'array, creo una cella e la appendo al grid container
    let scoreCounter = 0;
    const mainGrid = document.getElementById('grid');
    mainGrid.innerHTML = '';
    for(let i = 0; i < generatedNumbers.length; i++) {
        const thisNumber = generatedNumbers[i];
        const newGeneratedSquare = generateGridItem(thisNumber, gameMode);
        // Attacco l'evento allo square
        newGeneratedSquare.addEventListener('click', handleSquareClick);
        
        // Aggiungo l'elemento alla griglia
        mainGrid.appendChild(newGeneratedSquare);
    }

    // rendo la griglia pronta visibile dopo cliccato play
    mainGrid.classList.add('active');

    // SPECIFIC FUNCTIONS

    // al click su un quadrato aggiungo il colore azzurro o rosso
    // se è un quadrato bomba aggiungo il rosso altrimenti l'azzurro
    function handleSquareClick() {
        if (bombNumbers.includes(parseInt(this.querySelector('span').innerHTML))) {
            this.classList.add('square-bomb');

            // aggiunge la scritta hai perso quando clicchi su un quadrato bomba
            const mainDiv = document.querySelector('main');
            const newh2 = document.createElement('h2');
            newh2.innerHTML = `<h2>Hai perso il tuo punteggio è ${scoreCounter}</h2>`;

            mainDiv.appendChild(newh2);
        }
        else {
            this.classList.add('square-active');
            scoreCounter++;
        }
    }

    // genera un array di numeri casuali in un intervallo basato sulla difficolta scelta
    function generateBombs(str) {
        const array = [];
        let max;
        if (str === 'easy') {
            max = 100;
        }
        else if (str === 'medium') {
            max = 81;
        }
        else if (str === 'hard') {
            max = 49;
        }
        while(array.length < numberOfBombs) {
            let randomNumber = getRndInteger(1, max);
            if(!array.includes(randomNumber)) {
                array.push(randomNumber);
            }
        }
        return array;
    }
}

// FUNCTIONS

// importa la difficoltà selezionata
function getSelectValue() {
    let selectedValue = document.getElementById("difficulty").value;
    return selectedValue;
}

// assegna il numero dei quadrati in base alla difficoltà
function gameModeSquares(str) {
    if (str === 'easy') {
        return 100;
    }
    else if (str === 'medium') {
        return 81;
    }
    else if (str === 'hard') {
        return 49;
    }
}

// Creare un elemento della griglia con grandezza basata sulla difficoltà
function generateGridItem(number, str) {
    const newSquare = document.createElement('div');
    newSquare.classList.add('square');

    if (str === 'easy') {
        newSquare.classList.add('square-easy');
    }
    else if (str === 'medium') {
        newSquare.classList.add('square-medium');
    }
    else if (str === 'hard') {
        newSquare.classList.add('square-hard');
    }
    
    newSquare.innerHTML = `<span>${number}</span>`; 

    return newSquare;
}

// Genera un array con quantityOfNumbers numero di elementi
function generateSquaresNumbers (quantityOfNumbers) {
    const numbersArray = [];
    let i = 0;
    while(i < quantityOfNumbers) {
        numbersArray[i] = i+1;
        i++;
    }

    return numbersArray;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
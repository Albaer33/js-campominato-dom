document.getElementById('play').addEventListener('click', startGame);

function startGame() {
    // importa il value selezionato e assegna alla variabile gameMode la difficoltà
    const gameMode = getSelectValue();

    // creare la griglia in base alla difficolta selezionata
    const numberOfSquares = gameModeSquares(gameMode);
    let generatedNumbers = generateSquaresNumbers(numberOfSquares);

    // Per ogni numero nell'array, creo una cella e la appendo al grid container
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
}

// FUNCTIONS

// importa la difficoltà selezionata
function getSelectValue()
{
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

// al click su un quadrato aggiungo active e il colore
function handleSquareClick() {
    this.classList.add('active');
    const thisSquareNumber = parseInt( this.querySelector('span').textContent );
    this.classList.add('square-active');
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

// Genera un array con x numeri unici
function generateSquaresNumbers (quantityOfNumbers) {
    const numbersArray = [];
    while(numbersArray.length < quantityOfNumbers) {
        const randomNumber = getRndInteger(1, quantityOfNumbers);
        // Se il numero random non è gia presente in numbersArray lo pusho
        if( !numbersArray.includes(randomNumber) ) {
            numbersArray.push(randomNumber);
        }
    }

    return numbersArray;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
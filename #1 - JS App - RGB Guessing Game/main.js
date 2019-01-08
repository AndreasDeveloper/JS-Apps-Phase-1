// Array of random colors
let numberOfSquares = 6;
let colors = [];

// Picked Color - Goal
let pickedColor;

// DOM Elements
const squares = document.querySelectorAll('.square');
const rgbSpan = document.querySelector('#colorDisplay');
const message = document.querySelector('#message');
const h1 = document.querySelector('h1');
const reset = document.querySelector('.reset');
const modeBtn = document.querySelectorAll('.mode');

// Event Listener - Reseting the app
reset.addEventListener('click', () => {
    resetFun();
}); 

// Function - Change colors to the "winner" color
const changeColors = (color) => {
    // Loop trough squares  
    squares.forEach(el => {
        // Change each color to match set color
        el.style.backgroundColor = color;
    })
};

// Randomizing Color from colors array
const randomColor = () => {
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

// Generates Random Colors
const generateRandomColors = (num) => {
    // Create array
    let arr = [];
    // Add num random colors to array
    for (let i = 0; i < num; i++) {
        // Get random color and push it to the array
        arr.push(genRandomColor());
    }
    // Return the array
    return arr;
}

// Generates RGB colors
const genRandomColor = () => {
    // Generates number from 0 to 255 (Red) - RGB
    const r = Math.floor(Math.random() * 256); // 256 because of flooring
    // Generates number from 0 to 255 (Green) - RGB
    const g = Math.floor(Math.random() * 256);
    // Generates number from 0 to 255 (Blue) - RGB
    const b = Math.floor(Math.random() * 256);

    // Returning RGB
    return `rgb(${r}, ${g}, ${b})`;
}

const resetFun = () => {
    // Generate new random colors
    colors = generateRandomColors(numberOfSquares);
    // Pick new random color from array colors
    pickedColor = randomColor();
    // Change color display to match picked color
    rgbSpan.textContent = pickedColor;
    // Change colors of the squares
    for (let i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = 'block';
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = 'none';
        }
    }

    // Resets Background for div
    h1.style.backgroundColor = 'steelblue';
    reset.textContent = 'New Colors'
    message.textContent = '';
};

// Setting up mode buttons (easy/hard)
const setupModeButtons = () => {
    // Event Listener - Difficulty (Easy / Hard)
    for (let i = 0; i < modeBtn.length; i++) {
        modeBtn[i].addEventListener('click', () => {
            modeBtn[0].classList.remove('selected');
            modeBtn[1].classList.remove('selected');
            modeBtn[i].classList.add('selected');

            if (modeBtn[i].textContent === 'Easy') {
                numberOfSquares = 3;
            } else {
                numberOfSquares = 6;
            }
            resetFun();
        });
    }
};

// Setting up squares
const setupSquares = () => {
    // Gives each square a color - CONTROLLER
    for (let i = 0; i < squares.length; i++) {
        // Event Listener - Clicking the color
        squares[i].addEventListener('click', function() {
            let clickedColor = this.style.backgroundColor;

            if (clickedColor === pickedColor) {
                message.textContent = 'Correct!';
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
                reset.textContent = 'Try Again?';
            } else {
                this.style.backgroundColor = '#232323';
                message.textContent = 'Try Again';
            }
        });
    }
};

/* - INIT Function - */ 
const init = () => {
    setupModeButtons();
    setupSquares();
    resetFun();
};


// Initalization Function | MUST BE BELOW INIT FUNCTION EXPRESSION. HOISTING!
init();
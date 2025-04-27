// Calculator Logic
const calcInput = document.getElementById('calcInput');
const calcHistory = document.getElementById('calcHistory');
const standardToggle = document.getElementById('standardToggle');
const scientificToggle = document.getElementById('scientificToggle');
const scientificButtons = document.getElementById('scientificButtons');
const chatMessages = document.getElementById('chatMessages');
const chatInputField = document.getElementById('chatInputField');
const sendMessageBtn = document.getElementById('sendMessageBtn');

let currentInput = '0';
let previousInput = '';
let calculationOperator = '';
let resetInput = false;

// Toggle between standard and scientific calculator
standardToggle.addEventListener('click', () => {
    standardToggle.classList.add('active');
    scientificToggle.classList.remove('active');
    scientificButtons.style.display = 'none';
});

scientificToggle.addEventListener('click', () => {
    scientificToggle.classList.add('active');
    standardToggle.classList.remove('active');
    scientificButtons.style.display = 'grid';
});

// Add event listeners to calculator buttons
document.querySelectorAll('.calculator-buttons .calc-btn, .scientific-buttons .calc-btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        
        if (!isNaN(value) || value === '.') {
            handleNumber(value);
        } else if (['+', '-', '×', '÷', '%'].includes(value)) {
            handleOperator(value);
        } else if (value === '=') {
            handleEquals();
        } else if (value === 'C') {
            clearCalculator();
        } else if (value === 'CE') {
            clearEntry();
        } else if (['sin', 'cos', 'tan', 'log', 'ln', 'π', 'e', '√', 'x²', 'x^y', '(', ')', '|x|', 'n!', '1/x'].includes(value)) {
            handleScientificFunction(value);
        }
        
        updateCalculatorDisplay();
    });
});

function handleNumber(value) {
    if (currentInput === '0' || resetInput) {
        currentInput = value === '.' ? '0.' : value;
        resetInput = false;
    } else {
        // Prevent multiple decimal points
        if (value === '.' && currentInput.includes('.')) return;
        currentInput += value;
    }
}

function handleOperator(value) {
    if (calculationOperator && !resetInput) {
        handleEquals();
    }
    previousInput = currentInput;
    calculationOperator = value;
    resetInput = true;
    calcHistory.textContent = `${previousInput} ${calculationOperator}`;
}

function handleEquals() {
    if (!calculationOperator || resetInput) return;
    
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    let result;
    switch (calculationOperator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
    }
    
    calcHistory.textContent = `${previousInput} ${calculationOperator} ${currentInput} =`;
    currentInput = result.toString();
    calculationOperator = '';
    resetInput = true;
}

function handleScientificFunction(value) {
    const num = parseFloat(currentInput);
    
    switch (value) {
        case 'sin':
            currentInput = Math.sin(num * Math.PI / 180).toString();
            break;
        case 'cos':
            currentInput = Math.cos(num * Math.PI / 180).toString();
            break;
        case 'tan':
            currentInput = Math.tan(num * Math.PI / 180).toString();
            break;
        case 'log':
            currentInput = Math.log10(num).toString();
            break;
        case 'ln':
            currentInput = Math.log(num).toString();
            break;
        case 'π':
            currentInput = Math.PI.toString();
            break;
        case 'e':
            currentInput = Math.E.toString();
            break;
        case '√':
            currentInput = Math.sqrt(num).toString();
            break;
        case 'x²':
            currentInput = (num * num).toString();
            break;
        case '1/x':
            currentInput = (1 / num).toString();
            break;
        case '|x|':
            currentInput = Math.abs(num).toString();
            break;
        case 'n!':
            currentInput = factorial(num).toString();
            break;
    }
    
    resetInput = true;
}

function factorial(n) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

function clearCalculator() {
    currentInput = '0';
    previousInput = '';
    calculationOperator = '';
    calcHistory.textContent = '';
}

function clearEntry() {
    currentInput = '0';
}

function updateCalculatorDisplay() {
    calcInput.textContent = currentInput;
}

// Chat Interface Logic
sendMessageBtn.addEventListener('click', sendMessage);
chatInputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = chatInputField.value.trim();
    if (!message) return;
    
    // Add user message
    appendMessage(message, 'user');
    
    // Clear input field
    chatInputField.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        // Sample AI responses based on basic patterns
        let response;
        
        if (message.toLowerCase().includes('ciao') || 
            message.toLowerCase().includes('salve') || 
            message.toLowerCase().includes('buongiorno')) {
            response = "Ciao! Come posso aiutarti con i tuoi calcoli oggi?";
        } 
        else if (message.toLowerCase().includes('grazie')) {
            response = "Di niente! Sono qui per aiutarti con qualsiasi calcolo o domanda matematica.";
        }
        else if (message.toLowerCase().includes('calcola') || 
                /[\d+\-*\/=]/.test(message)) {
            response = "Ho elaborato il tuo calcolo. Puoi vedere il risultato sulla calcolatrice, oppure posso spiegarti i passaggi se hai bisogno.";
        }
        else if (message.toLowerCase().includes('mutuo') || 
                message.toLowerCase().includes('prestito') || 
                message.toLowerCase().includes('finanziamento')) {
            response = "Per calcolare le rate del mutuo, ho bisog

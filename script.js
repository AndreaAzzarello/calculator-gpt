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
            response = "Per calcolare le rate del mutuo, ho bisogno delle seguenti informazioni: importo del prestito, tasso di interesse annuale e durata del mutuo in anni. Posso aiutarti con questi calcoli?";
        }
        else if (message.toLowerCase().includes('bmi') || 
                message.toLowerCase().includes('indice di massa') || 
                message.toLowerCase().includes('peso forma')) {
            response = "Per calcolare il tuo BMI (Indice di Massa Corporea), ho bisogno del tuo peso in kg e della tua altezza in cm. Vuoi procedere con questo calcolo?";
        }
        else if (message.toLowerCase().includes('statistica') || 
                message.toLowerCase().includes('media') || 
                message.toLowerCase().includes('mediana') ||
                message.toLowerCase().includes('deviazione standard')) {
            response = "Posso aiutarti con calcoli statistici come media, mediana, moda e deviazione standard. Quali dati vuoi analizzare?";
        }
        else if (message.toLowerCase().includes('geometria') || 
                message.toLowerCase().includes('area') || 
                message.toLowerCase().includes('volume') ||
                message.toLowerCase().includes('perimetro')) {
            response = "Sono in grado di calcolare area, perimetro e volume di varie figure geometriche. Quale figura geometrica ti interessa?";
        }
        else if (message.toLowerCase().includes('conversione') || 
                message.toLowerCase().includes('converti')) {
            response = "Posso aiutarti con la conversione di unità. Specifichi quali unità vuoi convertire (lunghezza, peso, temperatura, ecc.) e i valori.";
        }
        else {
            response = "Posso aiutarti con calcoli matematici, finanziari, statistici, geometrici o conversioni di unità. Come posso assisterti nello specifico?";
        }
        
        // Process any calculation in the message
        processCalculation(message);
        
        // Add bot response
        appendMessage(response, 'bot');
    }, 800);
}

function processCalculation(message) {
    // Basic calculation parser
    try {
        // Extract mathematical expressions like "2+2" or "calcola 5*3"
        const mathRegex = /(\d+[\+\-\*\/]\d+)/g;
        const matches = message.match(mathRegex);
        
        if (matches && matches.length > 0) {
            // Extract the first math expression
            let expr = matches[0];
            
            // Convert × and ÷ to * and / for JavaScript eval
            expr = expr.replace(/×/g, '*').replace(/÷/g, '/');
            
            // Calculate and display result
            const result = eval(expr);
            
            // Update calculator display
            previousInput = expr;
            currentInput = result.toString();
            calcHistory.textContent = `${expr} =`;
            updateCalculatorDisplay();
        }
    } catch (error) {
        console.error("Errore nel processare il calcolo:", error);
    }
}

function appendMessage(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageDiv.textContent = content;
    chatMessages.appendChild(messageDiv);
    
    // Auto-scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Initialize calculator display
updateCalculatorDisplay();

// Handle dropdown menu for mobile
const calculatorCards = document.querySelectorAll('.calculator-card');
calculatorCards.forEach(card => {
    card.addEventListener('click', () => {
        // Here you would handle switching between different calculator types
        const calculatorType = card.querySelector('h3').textContent;
        alert(`Hai selezionato la calcolatrice: ${calculatorType}`);
    });
});


// Chiudi il dropdown se si clicca all'esterno
document.addEventListener('click', function(event) {
    if (!event.target.matches('.dropdown-button')) {
        if (dropdownContent.classList.contains('show')) {
            dropdownContent.classList.remove('show');
        }
    }
});
// Gestione del dropdown menu tramite click
document.addEventListener('DOMContentLoaded', function() {
    const dropdownButton = document.querySelector('.dropdown-button');
    const dropdownContent = document.querySelector('.dropdown-content');

    // Aggiungi event listener per il click sul pulsante
    dropdownButton.addEventListener('click', function(event) {
        // Previeni comportamenti predefiniti
        event.preventDefault();
        event.stopPropagation();
        
        // Mostra/nascondi il menu
        dropdownContent.classList.toggle('show');
    });

    // Chiudi il dropdown se si clicca all'esterno
    document.addEventListener('click', function(event) {
        if (!event.target.matches('.dropdown-button') && !dropdownButton.contains(event.target)) {
            if (dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show');
            }
        }
    });
});

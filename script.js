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
// Gestione delle diverse calcolatrici
document.addEventListener('DOMContentLoaded', function() {
    // Riferimenti alle calcolatrici
    const standardScientificCalculator = document.getElementById('standardScientificCalculator');
    const financialCalculator = document.getElementById('financialCalculator');
    const conversionCalculator = document.getElementById('conversionCalculator');
    const healthCalculator = document.getElementById('healthCalculator');
    const geometryCalculator = document.getElementById('geometryCalculator');
    
    // Riferimento al dropdown e ai link
    const dropdownButton = document.querySelector('.dropdown-button');
    const dropdownContent = document.querySelector('.dropdown-content');
    const dropdownLinks = dropdownContent.querySelectorAll('a');
    
    // Gestore per il click sul pulsante dropdown
    dropdownButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        dropdownContent.classList.toggle('show');
    });
    
    // Gestore per chiudere il dropdown quando si clicca fuori
    document.addEventListener('click', function(e) {
        if (!dropdownButton.contains(e.target)) {
            dropdownContent.classList.remove('show');
        }
    });
    
    // Funzione per nascondere tutte le calcolatrici
    function hideAllCalculators() {
        standardScientificCalculator.style.display = 'none';
        financialCalculator.style.display = 'none';
        conversionCalculator.style.display = 'none';
        healthCalculator.style.display = 'none';
        geometryCalculator.style.display = 'none';
    }
    
    // Gestore per la selezione del tipo di calcolatrice
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const calculatorType = this.textContent.trim();
            
            // Nascondi tutte le calcolatrici
            hideAllCalculators();
            
            // Aggiorna il testo del pulsante dropdown
            dropdownButton.textContent = calculatorType;
            dropdownButton.appendChild(document.createElement('span')).textContent = " ▼";
            
            // Mostra la calcolatrice selezionata
            switch(calculatorType) {
                case 'Standard':
                    standardScientificCalculator.style.display = 'block';
                    standardToggle.click(); // Imposta modalità standard
                    break;
                case 'Scientifica':
                    standardScientificCalculator.style.display = 'block';
                    scientificToggle.click(); // Imposta modalità scientifica
                    break;
                case 'Finanziaria':
                    financialCalculator.style.display = 'block';
                    break;
                case 'Conversione':
                    conversionCalculator.style.display = 'block';
                    populateConversionUnits('length'); // Imposta unità di default
                    break;
                case 'Salute & Fitness':
                    healthCalculator.style.display = 'block';
                    break;
                case 'Geometria':
                    geometryCalculator.style.display = 'block';
                    updateGeometryInputs('square'); // Imposta figura di default
                    break;
            }
            
            // Chiudi il dropdown
            dropdownContent.classList.remove('show');
        });
    });
    
    // ------------------------
    // Calcolatrice Finanziaria
    // ------------------------
    const calculateFinancialBtn = document.getElementById('calculateFinancial');
    if (calculateFinancialBtn) {
        calculateFinancialBtn.addEventListener('click', function() {
            const loanAmount = parseFloat(document.getElementById('loanAmount').value);
            const interestRate = parseFloat(document.getElementById('interestRate').value) / 100 / 12; // tasso mensile
            const loanTerm = parseInt(document.getElementById('loanTerm').value) * 12; // mesi totali
            
            // Formula rata mutuo
            const monthlyPayment = loanAmount * interestRate * Math.pow(1 + interestRate, loanTerm) / 
                                  (Math.pow(1 + interestRate, loanTerm) - 1);
            
            const totalAmount = monthlyPayment * loanTerm;
            const totalInterest = totalAmount - loanAmount;
            
            // Aggiorna i risultati
            document.getElementById('monthlyPayment').textContent = `€${monthlyPayment.toFixed(2)}`;
            document.getElementById('totalInterest').textContent = `€${totalInterest.toFixed(2)}`;
            document.getElementById('totalAmount').textContent = `€${totalAmount.toFixed(2)}`;
        });
    }
    
    // ------------------------
    // Calcolatrice Conversione
    // ------------------------
    const conversionTypeSelect = document.getElementById('conversionType');
    const calculateConversionBtn = document.getElementById('calculateConversion');
    
    // Funzione per popolare le unità di conversione in base al tipo
    function populateConversionUnits(type) {
        const fromUnitSelect = document.getElementById('fromUnit');
        const toUnitSelect = document.getElementById('toUnit');
        
        // Svuota le opzioni esistenti
        fromUnitSelect.innerHTML = '';
        toUnitSelect.innerHTML = '';
        
        let units = [];
        
        switch(type) {
            case 'length':
                units = [
                    { value: 'meters', label: 'Metri' },
                    { value: 'kilometers', label: 'Chilometri' },
                    { value: 'centimeters', label: 'Centimetri' },
                    { value: 'feet', label: 'Piedi' },
                    { value: 'inches', label: 'Pollici' }
                ];
                break;
            case 'weight':
                units = [
                    { value: 'kilograms', label: 'Chilogrammi' },
                    { value: 'grams', label: 'Grammi' },
                    { value: 'pounds', label: 'Libbre' },
                    { value: 'ounces', label: 'Once' }
                ];
                break;
            case 'temperature':
                units = [
                    { value: 'celsius', label: 'Celsius' },
                    { value: 'fahrenheit', label: 'Fahrenheit' },
                    { value: 'kelvin', label: 'Kelvin' }
                ];
                break;
            case 'area':
                units = [
                    { value: 'squareMeters', label: 'Metri quadrati' },
                    { value: 'squareKilometers', label: 'Chilometri quadrati' },
                    { value: 'hectares', label: 'Ettari' },
                    { value: 'squareFeet', label: 'Piedi quadrati' },
                    { value: 'acres', label: 'Acri' }
                ];
                break;
        }
        
        // Aggiungi le opzioni ad entrambi i selettori
        units.forEach(unit => {
            const fromOption = document.createElement('option');
            fromOption.value = unit.value;
            fromOption.textContent = unit.label;
            fromUnitSelect.appendChild(fromOption);
            
            const toOption = document.createElement('option');
            toOption.value = unit.value;
            toOption.textContent = unit.label;
            toUnitSelect.appendChild(toOption);
        });
        
        // Imposta opzioni diverse come default per rendere più chiara la conversione
        if (units.length > 1) {
            toUnitSelect.selectedIndex = 1;
        }
    }
    
    // Aggiorna le unità quando cambia il tipo di conversione
    if (conversionTypeSelect) {
        conversionTypeSelect.addEventListener('change', function() {
            populateConversionUnits(this.value);
        });
    }
    
    // Esegui la conversione
    if (calculateConversionBtn) {
        calculateConversionBtn.addEventListener('click', function() {
            const inputValue = parseFloat(document.getElementById('conversionInput').value);
            const fromUnit = document.getElementById('fromUnit').value;
            const toUnit = document.getElementById('toUnit').value;
            const conversionType = document.getElementById('conversionType').value;
            
            let result;
            
            // Converti prima in unità standard, poi nell'unità di destinazione
            let standardValue;
            
            switch(conversionType) {
                case 'length':
                    // Converti in metri (unità standard)
                    switch(fromUnit) {
                        case 'meters': standardValue = inputValue; break;
                        case 'kilometers': standardValue = inputValue * 1000; break;
                        case 'centimeters': standardValue = inputValue / 100; break;
                        case 'feet': standardValue = inputValue * 0.3048; break;
                        case 'inches': standardValue = inputValue * 0.0254; break;
                    }
                    
                    // Converti da metri all'unità di destinazione
                    switch(toUnit) {
                        case 'meters': result = standardValue; break;
                        case 'kilometers': result = standardValue / 1000; break;
                        case 'centimeters': result = standardValue * 100; break;
                        case 'feet': result = standardValue / 0.3048; break;
                        case 'inches': result = standardValue / 0.0254; break;
                    }
                    break;
                    
                case 'weight':
                    // Implementa conversioni di peso
                    break;
                    
                case 'temperature':
                    // Le conversioni di temperatura sono particolari
                    if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
                        result = (inputValue * 9/5) + 32;
                    } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
                        result = (inputValue - 32) * 5/9;
                    } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
                        result = inputValue + 273.15;
                    } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
                        result = inputValue - 273.15;
                    } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
                        result = (inputValue - 32) * 5/9 + 273.15;
                    } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
                        result = (inputValue - 273.15) * 9/5 + 32;
                    } else {
                        result = inputValue; // stessa unità
                    }
                    break;
                    
                case 'area':
                    // Implementa conversioni di area
                    break;
            }
            
            document.getElementById('conversionResult').value = result.toFixed(4);
        });
    }
    
    // -----------------------
    // Calcolatrice Salute
    // -----------------------
    const calculateHealthBtn = document.getElementById('calculateHealth');
    if (calculateHealthBtn) {
        calculateHealthBtn.addEventListener('click', function() {
            const weight = parseFloat(document.getElementById('weight').value);
            const height = parseFloat(document.getElementById('height').value) / 100; // converti in metri
            const age = parseInt(document.getElementById('age').value);
            const gender = document.getElementById('gender').value;
            
            // Calcola BMI
            const bmi = weight / (height * height);
            
            // Determina categoria BMI
            let category;
            if (bmi < 18.5) {
                category = "Sottopeso";
            } else if (bmi < 25) {
                category = "Normopeso";
            } else if (bmi < 30) {
                category = "Sovrappeso";
            } else {
                category = "Obesità";
            }
            
            // Calcola metabolismo basale (formula di Harris-Benedict)
            let bmr;
            if (gender === 'male') {
                bmr = 88.362 + (13.397 * weight) + (4.799 * height * 100) - (5.677 * age);
            } else {
                bmr = 447.593 + (9.247 * weight) + (3.098 * height * 100) - (4.330 * age);
            }
            
            // Aggiorna i risultati
            document.getElementById('bmiResult').textContent = bmi.toFixed(1);
            document.getElementById('bmiCategory').textContent = category;
            document.getElementById('caloriesResult').textContent = Math.round(bmr) + " kcal";
        });
    }
    
    // -----------------------
    // Calcolatrice Geometria
    // -----------------------
    const shapeTypeSelect = document.getElementById('shapeType');
    const calculateGeometryBtn = document.getElementById('calculateGeometry');
    
    // Funzione per aggiornare i campi di input in base alla figura geometrica
    function updateGeometryInputs(shape) {
        const geometryInputs = document.querySelector('.geometry-inputs');
        
        // Svuota i campi esistenti
        geometryInputs.innerHTML = '';
        
        // Crea i campi appropriati per il tipo di figura
        switch(shape) {
            case 'square':
                geometryInputs.innerHTML = `
                    <div class="geometry-input-group">
                        <label for="squareSide">Lato (cm)</label>
                        <input type="number" id="squareSide" value="10">
                    </div>
                `;
                break;
                
            case 'rectangle':
                geometryInputs.innerHTML = `
                    <div class="geometry-input-group">
                        <label for="rectangleWidth">Larghezza (cm)</label>
                        <input type="number" id="rectangleWidth" value="10">
                    </div>
                    <div class="geometry-input-group">
                        <label for="rectangleHeight">Altezza (cm)</label>
                        <input type="number" id="rectangleHeight" value="5">
                    </div>
                `;
                break;
                
            case 'circle':
                geometryInputs.innerHTML = `
                    <div class="geometry-input-group">
                        <label for="circleRadius">Raggio (cm)</label>
                        <input type="number" id="circleRadius" value="5">
                    </div>
                `;
                break;
                
            case 'triangle':
                geometryInputs.innerHTML = `
                    <div class="geometry-input-group">
                        <label for="triangleBase">Base (cm)</label>
                        <input type="number" id="triangleBase" value="10">
                    </div>
                    <div class="geometry-input-group">
                        <label for="triangleHeight">Altezza (cm)</label>
                        <input type="number" id="triangleHeight" value="8">
                    </div>
                    <div class="geometry-input-group">
                        <label for="triangleSide1">Lato 1 (cm)</label>
                        <input type="number" id="triangleSide1" value="6">
                    </div>
                    <div class="geometry-input-group">
                        <label for="triangleSide2">Lato 2 (cm)</label>
                        <input type="number" id="triangleSide2" value="8">
                    </div>
                `;
                break;
        }
    }
    
    // Aggiorna i campi quando cambia il tipo di figura
    if (shapeTypeSelect) {
        shapeTypeSelect.addEventListener('change', function() {
            updateGeometryInputs(this.value);
        });
    }
    
    // Esegui i calcoli geometrici
    if (calculateGeometryBtn) {
        calculateGeometryBtn.addEventListener('click', function() {
            const shapeType = document.getElementById('shapeType').value;
            let area, perimeter;
            
            switch(shapeType) {
                case 'square':
                    const side = parseFloat(document.getElementById('squareSide').value);
                    area = side * side;
                    perimeter = 4 * side;
                    break;
                    
                case 'rectangle':
                    const width = parseFloat(document.getElementById('rectangleWidth').value);
                    const height = parseFloat(document.getElementById('rectangleHeight').value);
                    area = width * height;
                    perimeter = 2 * (width + height);
                    break;
                    
                case 'circle':
                    const radius = parseFloat(document.getElementById('circleRadius').value);
                    area = Math.PI * radius * radius;
                    perimeter = 2 * Math.PI * radius; // circonferenza
                    break;
                    
                case 'triangle':
                    const base = parseFloat(document.getElementById('triangleBase').value);
                    const triangleHeight = parseFloat(document.getElementById('triangleHeight').value);
                    const side1 = parseFloat(document.getElementById('triangleSide1').value);
                    const side2 = parseFloat(document.getElementById('triangleSide2').value);
                    area = (base * triangleHeight) / 2;
                    perimeter = base + side1 + side2;
                    break;
            }
            
            // Aggiorna i risultati
            document.getElementById('areaResult').textContent = `${area.toFixed(2)} cm²`;
            
            if (shapeType === 'circle') {
                document.getElementById('perimeterResult').textContent = `${perimeter.toFixed(2)} cm (circonferenza)`;
            } else {
                document.getElementById('perimeterResult').textContent = `${perimeter.toFixed(2)} cm`;
            }
        });
    }
    
    // Mostra la calcolatrice standard all'inizio
    standardScientificCalculator.style.display = 'block';
});

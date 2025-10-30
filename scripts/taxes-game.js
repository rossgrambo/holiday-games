/* Taxes Game Logic */

class TaxesGame {
    constructor() {
        this.difficulty = null;
        this.gameStartTime = null;
        this.fieldsCompleted = 0;
        this.totalFields = 0;
        this.requiredFields = [];
        this.editableWords = [];
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        // Difficulty selection
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectDifficulty(e.target.closest('.difficulty-btn').dataset.difficulty);
            });
        });
        
        // Game controls
        document.getElementById('submit-btn').addEventListener('click', () => this.submitForm());
        document.getElementById('back-to-difficulty').addEventListener('click', () => this.backToDifficulty());
        document.getElementById('restart-btn').addEventListener('click', () => this.restartGame());
        document.getElementById('difficulty-btn').addEventListener('click', () => this.backToDifficulty());
        
        // Track secret difficulty unlock
        this.clickCount = 0;
        document.addEventListener('click', () => {
            this.clickCount++;
            if (this.clickCount >= 10) {
                this.unlockCrazyDifficulty();
            }
        });
    }
    
    selectDifficulty(difficulty) {
        this.difficulty = difficulty;
        this.gameStartTime = Date.now();
        this.setupGameForDifficulty();
        this.showScreen('game-screen');
        this.updateProgress();
    }
    
    setupGameForDifficulty() {
        this.requiredFields = [];
        this.editableWords = [];
        this.fieldsCompleted = 0;
        
        // Reset all fields to default state
        this.resetAllFields();
        
        switch(this.difficulty) {
            case 'toddler':
                this.setupToddlerMode();
                break;
            case 'child':
                this.setupChildMode();
                break;
            case 'adult':
                this.setupAdultMode();
                break;
            case 'crazy':
                this.setupCrazyMode();
                break;
        }
        
        this.totalFields = this.requiredFields.length + this.editableWords.length;
        this.setupInputListeners();
    }
    
    resetAllFields() {
        // Remove crazy mode class
        document.body.classList.remove('crazy-mode');
        
        // Show all static text, hide all inputs
        document.querySelectorAll('.static-text').forEach(el => el.classList.remove('hidden'));
        document.querySelectorAll('input').forEach(el => {
            el.classList.add('hidden');
            el.classList.remove('filled');
            el.value = '';
        });
        
        // Reset editable words
        document.querySelectorAll('.editable-word').forEach(word => {
            word.classList.remove('replaced');
            word.innerHTML = word.dataset.original || word.innerHTML;
        });
    }
    
    setupToddlerMode() {
        // Only name field is editable
        this.showInputField('employee-name');
        this.requiredFields = ['employee-name-input'];
    }
    
    setupChildMode() {
        // Name and wages
        this.showInputField('employee-name');
        this.showInputField('wages');
        this.requiredFields = ['employee-name-input', 'wages-input'];
    }
    
    setupAdultMode() {
        // Standard tax form fields plus common additional income and deductions
        const fields = [
            'employee-name', 'employee-address', 'wages', 'federal-tax',
            'ss-wages', 'ss-tax', 'medicare-wages', 'medicare-tax',
            'business-income', 'interest-income', 'dividend-income', 'retirement-dist',
            'mortgage-interest', 'charitable-contrib', 'medical-expenses', 'education-credits',
            'state', 'state-wages', 'state-tax'
        ];
        
        fields.forEach(field => this.showInputField(field));
        this.requiredFields = fields.map(field => field + '-input');
    }
    
    setupCrazyMode() {
        // Show crazy-only sections
        document.body.classList.add('crazy-mode');
        
        // All fields plus editable words including exotic tax situations
        const fields = [
            'employee-name', 'employee-address', 'employer-name', 'employer-address',
            'employer-ein', 'wages', 'federal-tax', 'ss-wages', 'ss-tax',
            'medicare-wages', 'medicare-tax', 'business-income', 'interest-income', 
            'dividend-income', 'retirement-dist', 'mortgage-interest', 'charitable-contrib',
            'medical-expenses', 'education-credits', 'foreign-balance', 'foreign-country',
            'foreign-tax', 'amt-adjustments', 'tentative-amt', 'amt-foreign-credit',
            'section179', 'bonus-depreciation', 'like-kind-basis', 'passive-loss',
            'state', 'state-wages', 'state-tax'
        ];
        
        fields.forEach(field => this.showInputField(field));
        this.requiredFields = fields.map(field => field + '-input');
        
        // Make words editable
        this.setupEditableWords();
    }
    
    showInputField(fieldId) {
        const staticElement = document.getElementById(fieldId);
        const inputElement = document.getElementById(fieldId + '-input');
        
        if (staticElement && inputElement) {
            staticElement.classList.add('hidden');
            inputElement.classList.remove('hidden');
            
            // Clear the input value completely - no placeholder for added challenge
            inputElement.value = '';
            inputElement.placeholder = '';
        }
    }
    
    getDefaultValue(fieldId) {
        const defaults = {
            'employee-name': '',
            'employee-address': '',
            'employer-name': 'Holiday Games Inc.',
            'employer-address': '456 Business Ave, Corporate City, ST 67890',
            'employer-ein': '12-3456789',
            'wages': '$45,000.00',
            'federal-tax': '$6,750.00',
            'ss-wages': '$45,000.00',
            'ss-tax': '$2,790.00',
            'medicare-wages': '$45,000.00',
            'medicare-tax': '$652.50',
            'state': 'CA',
            'state-wages': '$45,000.00',
            'state-tax': '$2,250.00'
        };
        
        return this.difficulty === 'toddler' || this.difficulty === 'child' ? 
               (fieldId === 'employee-name' ? '' : defaults[fieldId]) : 
               (fieldId === 'employee-name' || fieldId === 'employee-address' ? '' : defaults[fieldId]);
    }
    
    setupEditableWords() {
        const editableWords = document.querySelectorAll('.editable-word');
        
        editableWords.forEach((word, index) => {
            // Store original text
            word.dataset.original = word.innerHTML;
            
            // Create input element
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'word-input';
            input.placeholder = word.innerHTML;
            input.dataset.wordIndex = index;
            
            // Replace word with input
            word.innerHTML = '';
            word.appendChild(input);
            word.classList.add('replaced');
            
            this.editableWords.push(input);
            
            // Add event listener
            input.addEventListener('input', () => this.checkWordCompletion(input));
        });
    }
    
    setupInputListeners() {
        // Main field inputs
        this.requiredFields.forEach(fieldId => {
            const input = document.getElementById(fieldId);
            if (input) {
                input.addEventListener('input', () => this.checkFieldCompletion(input));
            }
        });
        
        // Word inputs are already set up in setupEditableWords
    }
    
    checkFieldCompletion(input) {
        const wasFilled = input.classList.contains('filled');
        const isFilled = input.value.trim() !== '';
        
        if (isFilled && !wasFilled) {
            input.classList.add('filled', 'field-completed');
            this.fieldsCompleted++;
            setTimeout(() => input.classList.remove('field-completed'), 300);
        } else if (!isFilled && wasFilled) {
            input.classList.remove('filled');
            this.fieldsCompleted--;
        }
        
        this.updateProgress();
    }
    
    checkWordCompletion(input) {
        const wasFilled = input.dataset.filled === 'true';
        const isFilled = input.value.trim() !== '';
        
        if (isFilled && !wasFilled) {
            input.dataset.filled = 'true';
            this.fieldsCompleted++;
        } else if (!isFilled && wasFilled) {
            input.dataset.filled = 'false';
            this.fieldsCompleted--;
        }
        
        this.updateProgress();
    }
    
    updateProgress() {
        document.getElementById('completed-count').textContent = this.fieldsCompleted;
        document.getElementById('total-count').textContent = this.totalFields;
        
        const submitBtn = document.getElementById('submit-btn');
        if (this.fieldsCompleted === this.totalFields && this.totalFields > 0) {
            submitBtn.disabled = false;
            submitBtn.style.animation = 'completionPulse 1s ease infinite';
        } else {
            submitBtn.disabled = true;
            submitBtn.style.animation = '';
        }
    }
    
    submitForm() {
        if (this.fieldsCompleted !== this.totalFields) {
            return;
        }
        
        const gameTime = Math.floor((Date.now() - this.gameStartTime) / 1000);
        
        // Show completion screen
        document.getElementById('final-completed').textContent = this.fieldsCompleted;
        document.getElementById('final-total').textContent = this.totalFields;
        document.getElementById('final-time').textContent = gameTime;
        document.getElementById('final-difficulty').textContent = this.getDifficultyName();
        document.getElementById('accuracy-rate').textContent = '100%';
        
        // Custom messages based on difficulty and time
        let message = this.getCompletionMessage(gameTime);
        document.getElementById('game-over-message').textContent = message;
        
        this.showScreen('game-over-screen');
        
        // Unlock crazy mode if not already unlocked
        if (this.difficulty === 'adult' && gameTime < 30) {
            this.unlockCrazyDifficulty();
        }
    }
    
    getCompletionMessage(gameTime) {
        const messages = {
            toddler: [
                "Great job! You wrote your name! 🎉",
                "Fantastic! The IRS is proud of you! 📝",
                "You're ready for kindergarten taxes! 🎒"
            ],
            child: [
                "Excellent work! You're getting the hang of this! 💪",
                "Nice job! You've mastered the basics! ⭐",
                "Way to go! Time for more challenging forms! 🚀"
            ],
            adult: [
                gameTime < 60 ? "Lightning fast! You're a tax professional! ⚡" :
                gameTime < 120 ? "Great job! You've conquered the standard form! 👍" :
                "Well done! Slow and steady wins the race! 🐢"
            ],
            crazy: [
                gameTime < 300 ? "IMPOSSIBLE! You're a tax wizard! 🧙‍♂️" :
                gameTime < 600 ? "Incredible! You survived the chaos! 🎯" :
                "Amazing perseverance! You never gave up! 💪"
            ]
        };
        
        const difficultyMessages = messages[this.difficulty];
        return Array.isArray(difficultyMessages) ? 
               difficultyMessages[Math.floor(Math.random() * difficultyMessages.length)] :
               difficultyMessages;
    }
    
    getDifficultyName() {
        const names = {
            toddler: 'Toddler',
            child: 'Child',
            adult: 'Adult',
            crazy: 'CRAZY'
        };
        return names[this.difficulty] || 'Unknown';
    }
    
    unlockCrazyDifficulty() {
        const crazyBtn = document.getElementById('crazy-btn');
        if (crazyBtn && crazyBtn.classList.contains('hidden')) {
            crazyBtn.classList.remove('hidden');
            crazyBtn.classList.add('revealed');
        }
    }
    
    restartGame() {
        this.selectDifficulty(this.difficulty);
    }
    
    backToDifficulty() {
        this.showScreen('difficulty-screen');
        this.difficulty = null;
    }
    
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.add('hidden');
        });
        document.getElementById(screenId).classList.remove('hidden');
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.taxesGame = new TaxesGame();
    
    // Add some fun easter eggs
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up, Up, Down, Down, Left, Right, Left, Right, B, A
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.length === konamiSequence.length && 
            konamiCode.every((code, index) => code === konamiSequence[index])) {
            window.taxesGame.unlockCrazyDifficulty();
            alert('🎮 Konami Code activated! CRAZY mode unlocked!');
            konamiCode = [];
        }
    });
});
/* Main Application JavaScript */

// Global reward function that games can call when user wins
function reward(gameName, score = 0, difficulty = 'normal') {
    console.log(`${holidayResources.getConsoleVictoryMessage()} You conquered ${gameName}!`);
    
    // Show victory animation/message
    showRewardModal(gameName, score, difficulty);
    
    // Store achievement
    storeAchievement(gameName, score, difficulty);
    
    // Play celebration sound/vibration if available
    celebrateVictory();
}

function showRewardModal(gameName, score, difficulty) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'reward-modal';
    modal.innerHTML = `
        <div class="reward-content">
            <div class="reward-animation">${holidayResources.getRewardEmoji()}</div>
            <h2>${holidayResources.getRewardTitle()}</h2>
            <p>${holidayResources.getRewardMessage(gameName)}</p>
            ${score > 0 ? `<p>${holidayResources.getScoreLabel()}: <strong>${score}</strong></p>` : ''}
            <p>${holidayResources.getDifficultyLabel()}: <strong>${difficulty}</strong></p>
            <button class="reward-btn" onclick="closeRewardModal()">${holidayResources.getContinueButtonText()}</button>
            <button class="reward-btn secondary" onclick="window.location.href='../index.html'">${holidayResources.getReturnButtonText()}</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Auto-close after 10 seconds
    setTimeout(() => {
        if (document.querySelector('.reward-modal')) {
            closeRewardModal();
        }
    }, 10000);
}

function closeRewardModal() {
    const modal = document.querySelector('.reward-modal');
    if (modal) {
        modal.remove();
    }
}

function storeAchievement(gameName, score, difficulty) {
    try {
        const storageKey = holidayResources.getAchievementsStorageKey();
        const achievements = JSON.parse(localStorage.getItem(storageKey) || '[]');
        achievements.push({
            game: gameName,
            score: score,
            difficulty: difficulty,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem(storageKey, JSON.stringify(achievements));
    } catch (e) {
        console.log('Could not store achievement:', e);
    }
}

function celebrateVictory() {
    // Haptic feedback for mobile devices
    if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
    }
    
    // Play a simple celebration sound if audio context is available
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        console.log('Audio celebration not available');
    }
}

// Utility functions for touch handling
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

function preventDefaultTouchBehavior() {
    // Prevent default touch behaviors like scrolling, zooming
    document.addEventListener('touchstart', function(e) {
        if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT') {
            e.preventDefault();
        }
    }, { passive: false });
    
    document.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, { passive: false });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (isTouchDevice()) {
        document.body.classList.add('touch-device');
    }
});
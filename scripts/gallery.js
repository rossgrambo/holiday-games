/* Gallery Page Functionality */

document.addEventListener('DOMContentLoaded', function() {
    const gameCards = document.querySelectorAll('.game-card[data-game]');
    
    gameCards.forEach(card => {
        const playBtn = card.querySelector('.play-btn');
        const gameName = card.dataset.game;
        
        // Handle card click and play button click
        const handleGameSelect = () => {
            if (!playBtn.disabled) {
                navigateToGame(gameName);
            }
        };
        
        card.addEventListener('click', handleGameSelect);
        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            handleGameSelect();
        });
        
        // Touch feedback
        card.addEventListener('touchstart', () => {
            card.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', () => {
            card.style.transform = '';
        });
    });
});

function navigateToGame(gameName) {
    // Navigate to the specific game page
    switch(gameName) {
        case 'run':
            window.location.href = 'games/run.html';
            break;
        case 'jump':
            window.location.href = 'games/jump.html';
            break;
        case 'taxes':
            window.location.href = 'games/taxes.html';
            break;
        default:
            console.log(`Game ${gameName} not implemented yet`);
    }
}
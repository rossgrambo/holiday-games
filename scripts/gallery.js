/* Gallery Page Functionality */

document.addEventListener('DOMContentLoaded', function() {
    // Apply color theme
    holidayResources.applyColorTheme();
    
    // Populate holiday-specific content
    document.getElementById('page-title').textContent = holidayResources.getGalleryTitle().replace(/[^\w\s]/g, '') + ' - Gallery';
    document.getElementById('gallery-title').textContent = holidayResources.getGalleryTitle();
    document.getElementById('gallery-subtitle').textContent = holidayResources.getGallerySubtitle();
    
    document.getElementById('run-game-icon').textContent = holidayResources.getRunGameIcon();
    document.getElementById('run-game-title').textContent = holidayResources.getRunGameTitle().replace(/[^\w\s!]/g, '');
    document.getElementById('run-game-desc').textContent = holidayResources.getRunGameDescription();
    
    document.getElementById('jump-game-icon').textContent = holidayResources.getJumpGameIcon();
    document.getElementById('jump-game-title').textContent = holidayResources.getJumpGameTitle().replace(/[^\w\s!]/g, '');
    document.getElementById('jump-game-desc').textContent = holidayResources.getJumpGameDescription();
    
    document.getElementById('taxes-game-icon').textContent = holidayResources.getTaxesGameIcon();
    document.getElementById('taxes-game-title').textContent = holidayResources.getTaxesGameTitle().replace(/[^\w\s]/g, '');
    document.getElementById('taxes-game-desc').textContent = holidayResources.getTaxesGameDescription();
    
    document.getElementById('coming-soon-icon').textContent = holidayResources.getComingSoonIcon();
    document.getElementById('coming-soon-title').textContent = holidayResources.getComingSoonTitle();
    document.getElementById('coming-soon-desc').textContent = holidayResources.getComingSoonDescription();
    
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
/* Run Game JavaScript */

class RunGame {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.gameState = 'difficulty'; // difficulty, playing, paused, gameOver
        this.difficulty = null;
        this.gameLoop = null;
        
        // Game settings based on difficulty
        this.difficulties = {
            toddler: {
                playerDownSpeed: 3,
                playerSideSpeed: 1.5,
                zombieSpeed: 2.5,
                obstacleCount: 15,
                goalDistance: 1000,
                name: 'Toddler'
            },
            child: {
                playerDownSpeed: 5,
                playerSideSpeed: 2,
                zombieSpeed: 4,
                obstacleCount: 25,
                goalDistance: 1500,
                name: 'Child'
            },
            adult: {
                playerDownSpeed: 7,
                playerSideSpeed: 3,
                zombieSpeed: 5.5,
                obstacleCount: 50,
                goalDistance: 2000,
                name: 'Adult'
            },
            crazy: {
                playerDownSpeed: 10,
                playerSideSpeed: 4,
                zombieSpeed: 8,
                obstacleCount: 100,
                goalDistance: 3000,
                name: 'CRAZY'
            }
        };
        
        // Game objects
        this.player = {
            x: 0, // Always centered horizontally
            y: 0, // Always centered vertically
            width: 30,
            height: 40,
            stunned: false,
            stunnedTime: 0
        };
        
        this.zombie = {
            x: 0,
            y: -300, // Start much higher above player for orientation time
            width: 35,
            height: 45
        };
        
        this.camera = {
            x: 0,
            y: 0
        };
        
        this.obstacles = [];
        this.hitObstacles = new Set(); // Track which obstacles were hit
        
        // Game state
        this.distance = 0;
        this.gameTime = 0;
        this.lastTime = 0;
        
        // Input handling
        this.keys = {
            left: false,
            right: false
        };
        
        this.init();
    }
    
    init() {
        this.setupCanvas();
        this.setupControls();
        this.setupDifficultySelection();
        this.showScreen('difficulty');
    }
    
    setupCanvas() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    setupControls() {
        const leftControl = document.getElementById('left-control');
        const rightControl = document.getElementById('right-control');
        
        // Touch controls
        leftControl.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.keys.left = true;
            leftControl.classList.add('active');
        });
        
        leftControl.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.keys.left = false;
            leftControl.classList.remove('active');
        });
        
        rightControl.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.keys.right = true;
            rightControl.classList.add('active');
        });
        
        rightControl.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.keys.right = false;
            rightControl.classList.remove('active');
        });
        
        // Mouse controls (backup)
        leftControl.addEventListener('mousedown', () => {
            this.keys.left = true;
            leftControl.classList.add('active');
        });
        
        leftControl.addEventListener('mouseup', () => {
            this.keys.left = false;
            leftControl.classList.remove('active');
        });
        
        rightControl.addEventListener('mousedown', () => {
            this.keys.right = true;
            rightControl.classList.add('active');
        });
        
        rightControl.addEventListener('mouseup', () => {
            this.keys.right = false;
            rightControl.classList.remove('active');
        });
        
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
                this.keys.left = true;
            }
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
                this.keys.right = true;
            }
        });
        
        document.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
                this.keys.left = false;
            }
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
                this.keys.right = false;
            }
        });
        
        // Pause button
        document.getElementById('pause-btn').addEventListener('click', () => {
            this.togglePause();
        });
        
        // Game over buttons
        document.getElementById('restart-btn').addEventListener('click', () => {
            this.startGame(this.difficulty);
        });
        
        document.getElementById('difficulty-btn').addEventListener('click', () => {
            this.showScreen('difficulty');
        });
    }
    
    setupDifficultySelection() {
        const difficultyBtns = document.querySelectorAll('.difficulty-btn');
        const crazyRevealArea = document.getElementById('crazy-reveal');
        const crazyBtn = document.getElementById('crazy-btn');
        
        difficultyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const difficulty = btn.dataset.difficulty;
                
                // Special handling for CRAZY button
                if (difficulty === 'crazy' && btn.classList.contains('hidden')) {
                    // Reveal CRAZY mode
                    btn.classList.remove('hidden');
                    btn.classList.add('revealed');
                    return;
                }
                
                if (difficulty && !btn.classList.contains('hidden')) {
                    this.startGame(difficulty);
                }
            });
        });
    }
    
    startGame(difficulty) {
        this.difficulty = difficulty;
        this.gameState = 'playing';
        
        // Stop falling sprites during gameplay
        if (window.fallingSprites) {
            window.fallingSprites.stop();
        }
        
        // Reset game state
        this.distance = 0;
        this.gameTime = 0;
        this.lastTime = performance.now();
        
        // Reset player
        this.player.stunned = false;
        this.player.stunnedTime = 0;
        
        // Reset camera - start higher up for orientation time
        this.camera.x = 0;
        this.camera.y = -200; // Start player higher up
        
        // Reset zombie
        this.zombie.x = 0;
        this.zombie.y = -500; // Start zombie much higher above player
        
        // Generate obstacles
        this.generateObstacles();
        this.hitObstacles.clear();
        
        this.showScreen('game');
        this.gameLoop = requestAnimationFrame((time) => this.update(time));
    }
    
    generateObstacles() {
        this.obstacles = [];
        const settings = this.difficulties[this.difficulty];
        const goalDistance = settings.goalDistance;
        
        // Generate random obstacles along the path (after orientation area)
        for (let i = 0; i < settings.obstacleCount; i++) {
            const obstacle = {
                x: (Math.random() - 0.5) * 800, // Random X position (2x wider area)
                y: Math.random() * goalDistance + 200, // Start obstacles after orientation area
                width: 25 + Math.random() * 15,
                height: 25 + Math.random() * 15,
                type: Math.floor(Math.random() * 3), // 0: tombstone, 1: rock, 2: tree
                id: i
            };
            this.obstacles.push(obstacle);
        }
        
        // Add goal line (2x wider)
        this.obstacles.push({
            x: -400,
            y: goalDistance,
            width: 800,
            height: 20,
            type: 'goal',
            id: 'goal'
        });
        
        // Add boundary fences
        const fenceHeight = goalDistance + 500;
        this.obstacles.push({
            x: -420,
            y: -600,
            width: 20,
            height: fenceHeight,
            type: 'fence',
            id: 'leftFence'
        });
        
        this.obstacles.push({
            x: 400,
            y: -600,
            width: 20,
            height: fenceHeight,
            type: 'fence',
            id: 'rightFence'
        });
    }
    
    update(currentTime) {
        if (this.gameState !== 'playing') return;
        
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;
        this.gameTime += deltaTime;
        
        this.updatePlayer(deltaTime);
        this.updateZombie(deltaTime);
        this.updateCamera();
        this.checkCollisions();
        this.updateUI();
        this.render();
        
        // Check win/lose conditions
        if (this.distance >= this.difficulties[this.difficulty].goalDistance) {
            this.winGame();
        } else if (this.zombie.y >= this.camera.y) {
            this.loseGame(holidayResources.getRunDefeatMessage());
        }
        
        this.gameLoop = requestAnimationFrame((time) => this.update(time));
    }
    
    updatePlayer(deltaTime) {
        const settings = this.difficulties[this.difficulty];
        
        // Handle stunning
        if (this.player.stunned) {
            this.player.stunnedTime -= deltaTime;
            if (this.player.stunnedTime <= 0) {
                this.player.stunned = false;
            }
            return; // No movement while stunned
        }
        
        // Movement with boundary checking
        let moveSpeed = settings.playerDownSpeed;
        const moveAmount = settings.playerSideSpeed * deltaTime * 60;
        
        if (this.keys.left) {
            const newX = this.camera.x - moveAmount;
            // Check left boundary (fence at x: -420, player width buffer)
            if (newX > -380) {
                this.camera.x = newX;
            }
            moveSpeed = settings.playerSideSpeed;
        }
        
        if (this.keys.right) {
            const newX = this.camera.x + moveAmount;
            // Check right boundary (fence at x: 400, player width buffer)
            if (newX < 370) {
                this.camera.x = newX;
            }
            moveSpeed = settings.playerSideSpeed;
        }
        
        // Always move down
        this.camera.y += moveSpeed * deltaTime * 60;
        this.distance = Math.max(0, this.camera.y);
    }
    
    updateZombie(deltaTime) {
        const settings = this.difficulties[this.difficulty];
        
        // Zombie follows player but moves at constant speed
        this.zombie.y += settings.zombieSpeed * deltaTime * 60;
        
        // Zombie's x position is always directly above the player
        this.zombie.x = this.camera.x;
    }
    
    updateCamera() {
        // Player is always centered
        this.player.x = this.canvas.width / 2;
        this.player.y = this.canvas.height / 2;
    }
    
    checkCollisions() {
        const playerWorldX = this.camera.x;
        const playerWorldY = this.camera.y;
        
        this.obstacles.forEach(obstacle => {
            if (this.hitObstacles.has(obstacle.id)) return;
            
            // Check collision with player
            if (playerWorldX < obstacle.x + obstacle.width &&
                playerWorldX + this.player.width > obstacle.x &&
                playerWorldY < obstacle.y + obstacle.height &&
                playerWorldY + this.player.height > obstacle.y) {
                
                if (obstacle.type === 'goal') {
                    this.winGame();
                } else if (obstacle.type === 'fence') {
                    // Fence blocks movement but doesn't stun
                    // Movement blocking is handled in updatePlayer
                } else {
                    // Hit obstacle - stun player
                    this.player.stunned = true;
                    this.player.stunnedTime = 1; // 1 second stun
                    this.hitObstacles.add(obstacle.id);
                }
            }
        });
    }
    
    updateUI() {
        document.getElementById('distance').textContent = Math.floor(this.distance);
        
        const settings = this.difficulties[this.difficulty];
        let currentSpeed = this.keys.left || this.keys.right ? 
            settings.playerSideSpeed : settings.playerDownSpeed;
        document.getElementById('speed').textContent = currentSpeed;
        
        // Show zombie warning when close
        const zombieDistance = this.camera.y - this.zombie.y;
        const warning = document.getElementById('zombie-warning');
        if (zombieDistance < 150) {
            warning.classList.add('active');
        } else {
            warning.classList.remove('active');
        }
    }
    
    render() {
        // Clear canvas with gradient background
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#2d1b69');
        gradient.addColorStop(0.5, '#11998e');
        gradient.addColorStop(1, '#38a169');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Render obstacles
        this.obstacles.forEach(obstacle => {
            const screenX = this.canvas.width / 2 + (obstacle.x - this.camera.x);
            const screenY = this.canvas.height / 2 + (obstacle.y - this.camera.y);
            
            // Only render if on screen
            if (screenX > -obstacle.width && screenX < this.canvas.width &&
                screenY > -obstacle.height && screenY < this.canvas.height) {
                
                this.renderObstacle(obstacle, screenX, screenY);
            }
        });
        
        // Render zombie
        const zombieScreenX = this.canvas.width / 2 + (this.zombie.x - this.camera.x);
        const zombieScreenY = this.canvas.height / 2 + (this.zombie.y - this.camera.y);
        this.renderZombie(zombieScreenX, zombieScreenY);
        
        // Render player
        this.renderPlayer();
    }
    
    renderObstacle(obstacle, x, y) {
        this.ctx.save();
        
        if (obstacle.type === 'goal') {
            // Goal line - finish line
            this.ctx.fillStyle = '#FFD700';
            this.ctx.fillRect(x, y, obstacle.width, obstacle.height);
            this.ctx.fillStyle = '#000';
            this.ctx.font = '20px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('FINISH', x + obstacle.width / 2, y + 15);
        } else if (obstacle.type === 'fence') {
            // Boundary fence
            this.ctx.fillStyle = '#8B4513';
            this.ctx.fillRect(x, y, obstacle.width, obstacle.height);
            // Add fence pattern
            this.ctx.fillStyle = '#654321';
            for (let i = 0; i < obstacle.height; i += 40) {
                this.ctx.fillRect(x + 2, y + i, obstacle.width - 4, 4);
            }
        } else {
            // Regular obstacles
            const isHit = this.hitObstacles.has(obstacle.id);
            
            if (obstacle.type === 0) {
                // Tombstone
                this.ctx.fillStyle = isHit ? '#666' : '#888';
                this.ctx.fillRect(x, y, obstacle.width, obstacle.height);
                this.ctx.fillStyle = isHit ? '#444' : '#666';
                this.ctx.fillRect(x + 5, y + 5, obstacle.width - 10, obstacle.height - 15);
            } else if (obstacle.type === 1) {
                // Rock
                this.ctx.fillStyle = isHit ? '#555' : '#777';
                this.ctx.beginPath();
                this.ctx.arc(x + obstacle.width / 2, y + obstacle.height / 2, 
                    obstacle.width / 2, 0, Math.PI * 2);
                this.ctx.fill();
            } else {
                // Tree
                this.ctx.fillStyle = isHit ? '#2d5016' : '#4a7c59';
                this.ctx.fillRect(x + obstacle.width / 2 - 3, y + obstacle.height - 10, 6, 10);
                this.ctx.fillStyle = isHit ? '#1a3009' : '#2d5016';
                this.ctx.beginPath();
                this.ctx.arc(x + obstacle.width / 2, y + obstacle.height / 2, 
                    obstacle.width / 2, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
        
        this.ctx.restore();
    }
    
    renderZombie(x, y) {
        this.ctx.save();
        
        // Zombie body
        this.ctx.fillStyle = '#4a5d23';
        this.ctx.fillRect(x, y + 10, this.zombie.width, this.zombie.height - 10);
        
        // Zombie head
        this.ctx.fillStyle = '#6b7c32';
        this.ctx.beginPath();
        this.ctx.arc(x + this.zombie.width / 2, y + 8, 8, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Zombie eyes
        this.ctx.fillStyle = '#ff0000';
        this.ctx.fillRect(x + this.zombie.width / 2 - 6, y + 5, 2, 2);
        this.ctx.fillRect(x + this.zombie.width / 2 + 4, y + 5, 2, 2);
        
        this.ctx.restore();
    }
    
    renderPlayer() {
        this.ctx.save();
        
        const x = this.player.x;
        const y = this.player.y;
        
        // Flash red if stunned
        if (this.player.stunned && Math.floor(this.gameTime * 10) % 2) {
            this.ctx.globalAlpha = 0.5;
            this.ctx.fillStyle = '#ff0000';
            this.ctx.fillRect(x - 5, y - 5, this.player.width + 10, this.player.height + 10);
        }
        
        // Player body
        this.ctx.fillStyle = '#4169e1';
        this.ctx.fillRect(x, y + 10, this.player.width, this.player.height - 10);
        
        // Player head
        this.ctx.fillStyle = '#fdbcb4';
        this.ctx.beginPath();
        this.ctx.arc(x + this.player.width / 2, y + 8, 8, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Player eyes
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(x + this.player.width / 2 - 4, y + 6, 2, 2);
        this.ctx.fillRect(x + this.player.width / 2 + 2, y + 6, 2, 2);
        
        this.ctx.restore();
    }
    
    winGame() {
        this.gameState = 'gameOver';
        cancelAnimationFrame(this.gameLoop);
        
        // Resume falling sprites
        if (window.fallingSprites) {
            window.fallingSprites.start();
        }
        
        const settings = this.difficulties[this.difficulty];
        document.getElementById('game-over-title').textContent = 'Victory!';
        document.getElementById('game-over-message').textContent = holidayResources.getRunVictoryMessage();
        document.getElementById('final-distance').textContent = Math.floor(this.distance);
        document.getElementById('final-time').textContent = Math.floor(this.gameTime);
        document.getElementById('final-difficulty').textContent = settings.name;
        
        this.showScreen('game-over');
        
        // Call the global reward function
        if (typeof reward === 'function') {
            reward('Run!', Math.floor(this.distance), settings.name);
        }
    }
    
    loseGame(message) {
        this.gameState = 'gameOver';
        cancelAnimationFrame(this.gameLoop);
        
        // Resume falling sprites
        if (window.fallingSprites) {
            window.fallingSprites.start();
        }
        
        const settings = this.difficulties[this.difficulty];
        document.getElementById('game-over-title').textContent = 'Game Over!';
        document.getElementById('game-over-message').textContent = message;
        document.getElementById('final-distance').textContent = Math.floor(this.distance);
        document.getElementById('final-time').textContent = Math.floor(this.gameTime);
        document.getElementById('final-difficulty').textContent = settings.name;
        
        this.showScreen('game-over');
    }
    
    togglePause() {
        if (this.gameState === 'playing') {
            this.gameState = 'paused';
            cancelAnimationFrame(this.gameLoop);
            document.getElementById('pause-btn').textContent = '▶️';
        } else if (this.gameState === 'paused') {
            this.gameState = 'playing';
            this.lastTime = performance.now();
            this.gameLoop = requestAnimationFrame((time) => this.update(time));
            document.getElementById('pause-btn').textContent = '⏸️';
        }
    }
    
    showScreen(screenName) {
        const screens = ['difficulty-screen', 'game-screen', 'game-over-screen'];
        screens.forEach(screen => {
            document.getElementById(screen).classList.add('hidden');
        });
        
        if (screenName === 'difficulty') {
            document.getElementById('difficulty-screen').classList.remove('hidden');
            // Hide CRAZY button again so it needs to be revealed each time
            const crazyBtn = document.getElementById('crazy-btn');
            crazyBtn.classList.add('hidden');
            crazyBtn.classList.remove('revealed');
        } else if (screenName === 'game') {
            document.getElementById('game-screen').classList.remove('hidden');
        } else if (screenName === 'game-over') {
            document.getElementById('game-over-screen').classList.remove('hidden');
        }
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Apply color theme
    holidayResources.applyColorTheme();
    
    // Populate holiday-specific content
    document.getElementById('page-title').textContent = holidayResources.getRunGameTitle().replace(/[^\w\s!]/g, '');
    document.getElementById('run-title').textContent = holidayResources.getRunGameTitle();
    document.getElementById('run-description').textContent = holidayResources.getRunGameDescription();
    document.getElementById('zombie-warning').textContent = holidayResources.getRunGameWarning();
    
    const icons = holidayResources.getDifficultyIcons();
    document.getElementById('diff-easy-icon').textContent = icons.easy;
    document.getElementById('diff-medium-icon').textContent = icons.medium;
    document.getElementById('diff-hard-icon').textContent = icons.hard;
    document.getElementById('diff-crazy-icon').textContent = icons.crazy;
    
    const diffNames = holidayResources.getRunDifficultyNames();
    const diffDescs = holidayResources.getRunDifficultyDescriptions();
    document.getElementById('run-diff-easy-name').textContent = diffNames.easy;
    document.getElementById('run-diff-easy-desc').textContent = diffDescs.easy;
    document.getElementById('run-diff-medium-name').textContent = diffNames.medium;
    document.getElementById('run-diff-medium-desc').textContent = diffDescs.medium;
    document.getElementById('run-diff-hard-name').textContent = diffNames.hard;
    document.getElementById('run-diff-hard-desc').textContent = diffDescs.hard;
    document.getElementById('run-diff-crazy-name').textContent = diffNames.crazy;
    document.getElementById('run-diff-crazy-desc').textContent = diffDescs.crazy;
    
    const game = new RunGame();
    
    // Prevent default touch behaviors for game area
    preventDefaultTouchBehavior();
});
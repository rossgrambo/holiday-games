/* Jump Game JavaScript */

class JumpGame {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.gameState = 'difficulty'; // difficulty, playing, paused, gameOver
        this.difficulty = null;
        this.gameLoop = null;
        
        // Game settings based on difficulty
        this.difficulties = {
            toddler: {
                gameSpeed: 3,
                obstacleSpawnRate: 5, // seconds between obstacles (much closer for slow speed)
                obstacleSpeed: 500, // pixels per second
                goalDistance: 5000,
                name: 'Toddler'
            },
            child: {
                gameSpeed: 4,
                obstacleSpawnRate: 3.0,
                obstacleSpeed: 500,
                goalDistance: 6000,
                name: 'Child'
            },
            adult: {
                gameSpeed: 5,
                obstacleSpawnRate: 1.5,
                obstacleSpeed: 700,
                goalDistance: 6000,
                name: 'Adult'
            },
            crazy: {
                gameSpeed: 7,
                obstacleSpawnRate: 0.1,
                obstacleSpeed: 1100,
                goalDistance: 6000,
                name: 'CRAZY'
            }
        };
        
        // Game objects
        this.player = {
            x: 600, // 4x position
            y: 0,
            width: 160, // 4x bigger
            height: 200, // 4x bigger
            isJumping: false,
            jumpVelocity: 0,
            groundY: 0,
            jumpPower: -1800, // 4x bigger jump power
            baseGravity: 4800, // 4x bigger base gravity
            gravity: 4800 // Will be scaled based on game speed
        };
        
        this.ground = {
            y: 0,
            height: 200 // 4x bigger
        };
        
        this.obstacles = [];
        this.lastObstacleTime = 0;
        this.nextObstacleDelay = 0;
        
        // Game state
        this.distance = 0;
        this.gameTime = 0;
        this.lastTime = 0;
        this.obstaclesJumped = 0;
        
        // Input handling
        this.isJumpPressed = false;
        this.instructionShown = true;
        
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
        
        // Update ground and player positions for better vertical centering
        // Position ground higher to center gameplay better while keeping sky
        this.ground.y = this.canvas.height * 0.75; // Position at 75% down for better centering
        this.player.groundY = this.ground.y - this.player.height;
        if (!this.player.isJumping) {
            this.player.y = this.player.groundY;
        }
    }
    
    setupControls() {
        const jumpControl = document.getElementById('jump-control');
        
        // Touch controls
        jumpControl.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.startJump();
        });
        
        jumpControl.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.endJump();
        });
        
        // Mouse controls (backup)
        jumpControl.addEventListener('mousedown', (e) => {
            e.preventDefault();
            this.startJump();
        });
        
        jumpControl.addEventListener('mouseup', (e) => {
            e.preventDefault();
            this.endJump();
        });
        
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
                e.preventDefault();
                this.startJump();
            }
        });
        
        document.addEventListener('keyup', (e) => {
            if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
                e.preventDefault();
                this.endJump();
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
    
    startJump() {
        if (this.gameState !== 'playing') return;
        
        this.isJumpPressed = true;
        const jumpControl = document.getElementById('jump-control');
        jumpControl.classList.add('active');
        
        // Only jump if on ground
        if (!this.player.isJumping) {
            this.player.isJumping = true;
            this.player.jumpVelocity = this.player.jumpPower;
            
            // Show instruction after first jump
            if (this.instructionShown) {
                this.instructionShown = false;
                const instruction = document.getElementById('jump-instruction');
                if (instruction) {
                    instruction.classList.add('hidden');
                }
            }
        }
    }
    
    endJump() {
        this.isJumpPressed = false;
        const jumpControl = document.getElementById('jump-control');
        jumpControl.classList.remove('active');
        
        // Allow for shorter jumps by reducing upward velocity
        if (this.player.isJumping && this.player.jumpVelocity < -100) {
            this.player.jumpVelocity = -100;
        }
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
        this.obstaclesJumped = 0;
        this.lastTime = performance.now();
        this.lastObstacleTime = 0;
        this.instructionShown = true;
        
        // Scale gravity based on game speed for better jump feel
        // Lower gravity (longer jumps) for slower game speeds
        const settings = this.difficulties[this.difficulty];
        this.player.gravity = this.player.baseGravity * (settings.gameSpeed / 7);
        
        // Reset player
        this.player.isJumping = false;
        this.player.jumpVelocity = 0;
        this.player.y = this.player.groundY;
        
        // Clear obstacles
        this.obstacles = [];
        this.scheduleNextObstacle();
        
        // Show instruction
        const instruction = document.getElementById('jump-instruction');
        if (instruction) {
            instruction.textContent = holidayResources.getJumpInstruction();
            instruction.classList.remove('hidden');
        }
        
        this.showScreen('game');
        this.gameLoop = requestAnimationFrame((time) => this.update(time));
    }
    
    scheduleNextObstacle() {
        const settings = this.difficulties[this.difficulty];
        // Add some randomness to obstacle spacing
        const baseDelay = settings.obstacleSpawnRate;
        const randomVariation = (Math.random() - 0.5) * baseDelay * 0.4; // ±20% variation
        this.nextObstacleDelay = Math.max(0.8, baseDelay + randomVariation);
    }
    
    update(currentTime) {
        if (this.gameState !== 'playing') return;
        
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;
        this.gameTime += deltaTime;
        
        this.updatePlayer(deltaTime);
        this.updateObstacles(deltaTime);
        this.spawnObstacles();
        this.checkCollisions();
        this.updateUI();
        this.render();
        
        // Check win condition
        if (this.distance >= this.difficulties[this.difficulty].goalDistance) {
            this.winGame();
        }
        
        this.gameLoop = requestAnimationFrame((time) => this.update(time));
    }
    
    updatePlayer(deltaTime) {
        // Apply gravity and update jump
        if (this.player.isJumping) {
            this.player.jumpVelocity += this.player.gravity * deltaTime;
            this.player.y += this.player.jumpVelocity * deltaTime;
            
            // Check if landed
            if (this.player.y >= this.player.groundY) {
                this.player.y = this.player.groundY;
                this.player.isJumping = false;
                this.player.jumpVelocity = 0;
            }
        }
        
        // Update distance based on game speed
        const settings = this.difficulties[this.difficulty];
        this.distance += settings.gameSpeed * deltaTime * 60;
    }
    
    updateObstacles(deltaTime) {
        const settings = this.difficulties[this.difficulty];
        
        // Move obstacles
        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            const obstacle = this.obstacles[i];
            obstacle.x -= settings.obstacleSpeed * deltaTime;
            
            // Remove obstacles that are off screen
            if (obstacle.x + obstacle.width < 0) {
                // If obstacle passed player without collision, count it as jumped
                if (!obstacle.hit) {
                    this.obstaclesJumped++;
                }
                this.obstacles.splice(i, 1);
            }
        }
    }
    
    spawnObstacles() {
        if (this.gameTime - this.lastObstacleTime >= this.nextObstacleDelay) {
            this.createObstacle();
            this.lastObstacleTime = this.gameTime;
            this.scheduleNextObstacle();
        }
    }
    
    createObstacle() {
        // 25% chance to create a double pumpkin
        const isDoublePumpkin = Math.random() < 0.25;
        
        if (isDoublePumpkin) {
            // Create double pumpkin - two pumpkins side by side
            const baseWidth = 140 + Math.random() * 60;
            const baseHeight = 140 + Math.random() * 60;
            const spacing = 10; // Small gap between pumpkins
            
            // First pumpkin
            const obstacle1 = {
                x: this.canvas.width,
                y: this.ground.y - 160, // Sit on ground (4x bigger)
                width: baseWidth,
                height: baseHeight,
                hit: false,
                type: Math.floor(Math.random() * 3), // Different jack-o'-lantern styles
                id: Date.now(),
                isDoublePumpkin: true,
                pumpkinIndex: 0
            };
            
            // Second pumpkin (right next to the first)
            const obstacle2 = {
                x: this.canvas.width + baseWidth + spacing,
                y: this.ground.y - 160,
                width: baseWidth,
                height: baseHeight,
                hit: false,
                type: Math.floor(Math.random() * 3),
                id: Date.now() + 1,
                isDoublePumpkin: true,
                pumpkinIndex: 1
            };
            
            this.obstacles.push(obstacle1);
            this.obstacles.push(obstacle2);
        } else {
            // Create a single jack-o'-lantern obstacle
            const obstacle = {
                x: this.canvas.width,
                y: this.ground.y - 160, // Sit on ground (4x bigger)
                width: 140 + Math.random() * 60, // Random size (4x bigger)
                height: 140 + Math.random() * 60, // 4x bigger
                hit: false,
                type: Math.floor(Math.random() * 3), // Different jack-o'-lantern styles
                id: Date.now(),
                isDoublePumpkin: false
            };
            
            this.obstacles.push(obstacle);
        }
    }
    
    checkCollisions() {
        const playerLeft = this.player.x;
        const playerRight = this.player.x + this.player.width;
        const playerTop = this.player.y;
        const playerBottom = this.player.y + this.player.height;
        
        this.obstacles.forEach(obstacle => {
            if (obstacle.hit) return;
            
            // Use half-size hitbox for more forgiving collision detection
            const hitboxWidth = obstacle.width * 0.5;
            const hitboxHeight = obstacle.height * 0.5;
            const hitboxOffsetX = (obstacle.width - hitboxWidth) / 2;
            const hitboxOffsetY = (obstacle.height - hitboxHeight) / 2;
            
            const obstacleLeft = obstacle.x + hitboxOffsetX;
            const obstacleRight = obstacle.x + hitboxOffsetX + hitboxWidth;
            const obstacleTop = obstacle.y + hitboxOffsetY;
            const obstacleBottom = obstacle.y + hitboxOffsetY + hitboxHeight;
            
            // Check collision
            if (playerRight > obstacleLeft &&
                playerLeft < obstacleRight &&
                playerBottom > obstacleTop &&
                playerTop < obstacleBottom) {
                
                obstacle.hit = true;
                this.loseGame(holidayResources.getJumpDefeatMessage());
            }
        });
    }
    
    updateUI() {
        document.getElementById('distance').textContent = Math.floor(this.distance);
        
        const settings = this.difficulties[this.difficulty];
        document.getElementById('speed').textContent = settings.gameSpeed;
    }
    
    render() {
        // Clear canvas with gradient background
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(0.5, '#16213e');
        gradient.addColorStop(1, '#0f172a');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw ground
        this.renderGround();
        
        // Draw obstacles
        this.obstacles.forEach(obstacle => {
            this.renderObstacle(obstacle);
        });
        
        // Draw player
        this.renderPlayer();
        
        // Draw stars/moon for atmosphere
        this.renderBackground();
    }
    
    renderBackground() {
        // Draw some stars (4x bigger)
        this.ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 20; i++) {
            const x = (i * 400 + this.distance * 0.4) % this.canvas.width; // 4x spacing
            const y = (i * 148) % (this.canvas.height * 0.6); // 4x spacing
            this.ctx.beginPath();
            this.ctx.arc(x, y, 4, 0, Math.PI * 2); // 4x bigger
            this.ctx.fill();
        }
        
        // Draw moon (4x bigger)
        const moonX = this.canvas.width - 400; // 4x position
        const moonY = 320; // 4x position
        this.ctx.fillStyle = '#f7f7f7';
        this.ctx.beginPath();
        this.ctx.arc(moonX, moonY, 120, 0, Math.PI * 2); // 4x bigger
        this.ctx.fill();
        
        // Moon craters (4x bigger)
        this.ctx.fillStyle = '#e0e0e0';
        this.ctx.beginPath();
        this.ctx.arc(moonX - 32, moonY - 32, 20, 0, Math.PI * 2); // 4x bigger
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(moonX + 24, moonY + 16, 12, 0, Math.PI * 2); // 4x bigger
        this.ctx.fill();
    }
    
    renderGround() {
        // Draw extended ground to fill bottom area
        const groundHeight = this.canvas.height - this.ground.y;
        this.ctx.fillStyle = '#2d5016';
        this.ctx.fillRect(0, this.ground.y, this.canvas.width, groundHeight);
        
        // Draw grass texture (4x bigger)
        this.ctx.fillStyle = '#4a7c59';
        for (let x = 0; x < this.canvas.width; x += 40) { // 4x spacing
            const grassX = (x - (this.distance * 8) % 40); // 4x movement
            this.ctx.fillRect(grassX, this.ground.y, 8, 32); // 4x bigger grass
        }
    }
    
    renderObstacle(obstacle) {
        this.ctx.save();
        
        const x = obstacle.x;
        const y = obstacle.y;
        
        // Jack-o'-lantern body
        if (obstacle.type === 0) {
            this.ctx.fillStyle = '#ff6b35';
        } else if (obstacle.type === 1) {
            this.ctx.fillStyle = '#ff8c42';
        } else {
            this.ctx.fillStyle = '#ff9500';
        }
        
        // Main pumpkin shape
        this.ctx.beginPath();
        this.ctx.ellipse(x + obstacle.width/2, y + obstacle.height/2, 
                         obstacle.width/2, obstacle.height/2, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Pumpkin ridges (4x bigger)
        this.ctx.strokeStyle = '#e55a00';
        this.ctx.lineWidth = 8; // 4x bigger
        this.ctx.beginPath();
        this.ctx.moveTo(x + obstacle.width * 0.2, y);
        this.ctx.lineTo(x + obstacle.width * 0.2, y + obstacle.height);
        this.ctx.moveTo(x + obstacle.width * 0.5, y);
        this.ctx.lineTo(x + obstacle.width * 0.5, y + obstacle.height);
        this.ctx.moveTo(x + obstacle.width * 0.8, y);
        this.ctx.lineTo(x + obstacle.width * 0.8, y + obstacle.height);
        this.ctx.stroke();
        
        // Face - eyes
        this.ctx.fillStyle = '#000000';
        const eyeSize = obstacle.width * 0.15;
        this.ctx.beginPath();
        this.ctx.ellipse(x + obstacle.width * 0.3, y + obstacle.height * 0.4, 
                         eyeSize, eyeSize, 0, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.ellipse(x + obstacle.width * 0.7, y + obstacle.height * 0.4, 
                         eyeSize, eyeSize, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Face - mouth
        this.ctx.beginPath();
        this.ctx.arc(x + obstacle.width/2, y + obstacle.height * 0.7, 
                     obstacle.width * 0.2, 0, Math.PI);
        this.ctx.fill();
        
        // Stem (4x bigger)
        this.ctx.fillStyle = '#4a7c59';
        this.ctx.fillRect(x + obstacle.width/2 - 12, y - 32, 24, 32); // 4x bigger
        
        this.ctx.restore();
    }
    
    renderPlayer() {
        this.ctx.save();
        
        const x = this.player.x;
        const y = this.player.y;
        
        // Skeleton body
        this.ctx.fillStyle = '#f7f7f7';
        
        // Head (skull) - 4x bigger
        this.ctx.beginPath();
        this.ctx.arc(x + this.player.width/2, y + 48, 40, 0, Math.PI * 2); // 4x bigger
        this.ctx.fill();
        
        // Body (ribcage) - 4x bigger
        this.ctx.fillRect(x + this.player.width/2 - 32, y + 72, 64, 100); // 4x bigger
        
        // Arms - 4x bigger
        this.ctx.fillRect(x + this.player.width/2 - 60, y + 80, 32, 12); // 4x bigger
        this.ctx.fillRect(x + this.player.width/2 + 28, y + 80, 32, 12); // 4x bigger
        
        // Legs - 4x bigger
        this.ctx.fillRect(x + this.player.width/2 - 24, y + 160, 12, 40); // 4x bigger
        this.ctx.fillRect(x + this.player.width/2 + 12, y + 160, 12, 40); // 4x bigger
        
        // Eye sockets (4x bigger)
        this.ctx.fillStyle = '#000000';
        this.ctx.beginPath();
        this.ctx.arc(x + this.player.width/2 - 16, y + 40, 8, 0, Math.PI * 2); // 4x bigger
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(x + this.player.width/2 + 16, y + 40, 8, 0, Math.PI * 2); // 4x bigger
        this.ctx.fill();
        
        // Rib lines (4x bigger)
        this.ctx.strokeStyle = '#cccccc';
        this.ctx.lineWidth = 4; // 4x bigger
        for (let i = 0; i < 4; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(x + this.player.width/2 - 24, y + 88 + i * 16); // 4x bigger
            this.ctx.lineTo(x + this.player.width/2 + 24, y + 88 + i * 16); // 4x bigger
            this.ctx.stroke();
        }
        
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
        document.getElementById('game-over-message').textContent = holidayResources.getJumpVictoryMessage();
        document.getElementById('final-distance').textContent = Math.floor(this.distance);
        document.getElementById('final-time').textContent = Math.floor(this.gameTime);
        document.getElementById('final-difficulty').textContent = settings.name;
        document.getElementById('final-jumps').textContent = this.obstaclesJumped;
        
        this.showScreen('game-over');
        
        // Call the global reward function
        if (typeof reward === 'function') {
            reward('Jump!', Math.floor(this.distance), settings.name);
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
        document.getElementById('final-jumps').textContent = this.obstaclesJumped;
        
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
    document.getElementById('page-title').textContent = holidayResources.getJumpGameTitle().replace(/[^\w\s!]/g, '');
    document.getElementById('jump-title').textContent = holidayResources.getJumpGameTitle();
    document.getElementById('jump-description').textContent = holidayResources.getJumpGameDescription();
    document.getElementById('jump-instruction').textContent = holidayResources.getJumpInstruction();
    
    const icons = holidayResources.getDifficultyIcons();
    document.getElementById('diff-easy-icon').textContent = icons.easy;
    document.getElementById('diff-medium-icon').textContent = icons.medium;
    document.getElementById('diff-hard-icon').textContent = icons.hard;
    document.getElementById('diff-crazy-icon').textContent = icons.crazy;
    
    const diffNames = holidayResources.getJumpDifficultyNames();
    const diffDescs = holidayResources.getJumpDifficultyDescriptions();
    document.getElementById('jump-diff-easy-name').textContent = diffNames.easy;
    document.getElementById('jump-diff-easy-desc').textContent = diffDescs.easy;
    document.getElementById('jump-diff-medium-name').textContent = diffNames.medium;
    document.getElementById('jump-diff-medium-desc').textContent = diffDescs.medium;
    document.getElementById('jump-diff-hard-name').textContent = diffNames.hard;
    document.getElementById('jump-diff-hard-desc').textContent = diffDescs.hard;
    document.getElementById('jump-diff-crazy-name').textContent = diffNames.crazy;
    document.getElementById('jump-diff-crazy-desc').textContent = diffDescs.crazy;
    
    const game = new JumpGame();
    
    // Prevent default touch behaviors for game area
    preventDefaultTouchBehavior();
});
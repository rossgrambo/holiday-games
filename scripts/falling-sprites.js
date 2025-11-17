/**
 * Falling Sprites Animation
 * Creates skulls and pumpkins that are thrown up from the bottom of the screen and fall back down
 */

class FallingSprites {
    constructor() {
        // Configuration variables - easily editable
        this.config = {
            spawnRate: 1000,        // milliseconds between spawns
            gravity: 0.1,           // gravity strength
            spriteSize: 100,         // size in pixels
            initialVelocityY: -7,   // upward velocity when thrown
            initialVelocityX: 2,    // horizontal velocity range (-2 to +2)
            fadeOutTime: 400,       // fade out duration in ms
            maxSprites: 20          // maximum sprites on screen
        };

        this.sprites = [];
        this.container = null;
        this.spawnTimer = null;
        this.animationId = null;
        this.isRunning = false;

        this.init();
    }

    init() {
        // Create container for sprites
        this.container = document.createElement('div');
        this.container.id = 'falling-sprites-container';
        this.container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1000;
            overflow: hidden;
        `;
        document.body.appendChild(this.container);

        this.start();
    }

    createSprite() {
        // Remove oldest sprites if we have too many
        if (this.sprites.length >= this.config.maxSprites) {
            const oldestSprite = this.sprites.shift();
            if (oldestSprite.element && oldestSprite.element.parentNode) {
                oldestSprite.element.parentNode.removeChild(oldestSprite.element);
            }
        }

        const spriteType = Math.random() < 0.5 ? 'skull' : 'pumpkin';
        const spriteElement = document.createElement('img');
        
        // Calculate relative path to sprites folder based on current HTML file location
        // Check if we're in a subdirectory by looking at the current HTML file path
        const currentPath = window.location.pathname;
        const inSubdirectory = currentPath.includes('/games/');
        const pathPrefix = inSubdirectory ? '../' : '';
        spriteElement.src = `${pathPrefix}sprites/${spriteType}.png`;
        spriteElement.style.cssText = `
            position: absolute;
            width: ${this.config.spriteSize}px;
            height: ${this.config.spriteSize}px;
            pointer-events: none;
            transition: opacity ${this.config.fadeOutTime}ms ease-out;
        `;

        // Random horizontal position
        const startX = Math.random() * (window.innerWidth - this.config.spriteSize);
        const startY = window.innerHeight;

        // Random velocities
        const velocityX = (Math.random() - 0.5) * this.config.initialVelocityX * 2;
        const velocityY = this.config.initialVelocityY + (Math.random() - 0.5) * 2;

        const sprite = {
            element: spriteElement,
            x: startX,
            y: startY,
            velocityX: velocityX,
            velocityY: velocityY,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 4,
            fadeStarted: false
        };

        spriteElement.style.left = sprite.x + 'px';
        spriteElement.style.bottom = '0px';
        spriteElement.style.transform = `rotate(${sprite.rotation}deg)`;
        
        this.container.appendChild(spriteElement);
        this.sprites.push(sprite);
    }

    updateSprites() {
        for (let i = this.sprites.length - 1; i >= 0; i--) {
            const sprite = this.sprites[i];
            
            // Update physics
            sprite.velocityY += this.config.gravity;
            sprite.x += sprite.velocityX;
            sprite.y += sprite.velocityY;
            sprite.rotation += sprite.rotationSpeed;

            // Update position
            sprite.element.style.left = sprite.x + 'px';
            sprite.element.style.bottom = (window.innerHeight - sprite.y) + 'px';
            sprite.element.style.transform = `rotate(${sprite.rotation}deg)`;

            // Start fading when sprite reaches peak and starts falling
            if (sprite.velocityY > 0 && !sprite.fadeStarted) {
                sprite.fadeStarted = true;
                sprite.element.style.opacity = '0';
            }

            // Remove sprite only when it falls completely off screen
            if (sprite.y > window.innerHeight + this.config.spriteSize) {
                if (sprite.element.parentNode) {
                    sprite.element.parentNode.removeChild(sprite.element);
                }
                this.sprites.splice(i, 1);
            }

            // Remove sprite if it goes too far horizontally
            if (sprite.x < -this.config.spriteSize || sprite.x > window.innerWidth + this.config.spriteSize) {
                if (sprite.element.parentNode) {
                    sprite.element.parentNode.removeChild(sprite.element);
                }
                this.sprites.splice(i, 1);
            }
        }
    }

    animate() {
        if (!this.isRunning) return;
        
        this.updateSprites();
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        
        // Start spawning sprites
        this.spawnTimer = setInterval(() => {
            if (this.isRunning) {
                this.createSprite();
            }
        }, this.config.spawnRate);

        // Start animation loop
        this.animate();
    }

    stop() {
        this.isRunning = false;
        
        if (this.spawnTimer) {
            clearInterval(this.spawnTimer);
            this.spawnTimer = null;
        }
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }

        // Clear all sprites
        this.sprites.forEach(sprite => {
            if (sprite.element && sprite.element.parentNode) {
                sprite.element.parentNode.removeChild(sprite.element);
            }
        });
        this.sprites = [];
    }

    // Methods to update configuration
    setSpawnRate(rate) {
        this.config.spawnRate = rate;
        if (this.isRunning) {
            clearInterval(this.spawnTimer);
            this.spawnTimer = setInterval(() => {
                if (this.isRunning) {
                    this.createSprite();
                }
            }, this.config.spawnRate);
        }
    }

    setGravity(gravity) {
        this.config.gravity = gravity;
    }

    setSpriteSize(size) {
        this.config.spriteSize = size;
    }

    // Get current configuration
    getConfig() {
        return { ...this.config };
    }
}

// Initialize the falling sprites when the page loads
let fallingSprites = null;

document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure the page is fully loaded
    setTimeout(() => {
        fallingSprites = new FallingSprites();
    }, 500);
});

// Cleanup when page is unloaded
window.addEventListener('beforeunload', function() {
    if (fallingSprites) {
        fallingSprites.stop();
    }
});

// Pause/resume based on page visibility
document.addEventListener('visibilitychange', function() {
    if (fallingSprites) {
        if (document.hidden) {
            fallingSprites.stop();
        } else {
            fallingSprites.start();
        }
    }
});
/**
 * Utility functions for arcade games
 */

// Audio management
const AudioManager = {
    sounds: {},
    
    // Load a sound file
    loadSound: function(name, url) {
        this.sounds[name] = new Audio(url);
        return this.sounds[name];
    },
    
    // Play a sound
    playSound: function(name) {
        if (this.sounds[name]) {
            this.sounds[name].currentTime = 0;
            this.sounds[name].play();
        }
    },
    
    // Stop a sound
    stopSound: function(name) {
        if (this.sounds[name]) {
            this.sounds[name].pause();
            this.sounds[name].currentTime = 0;
        }
    }
};

// High score management
const ScoreManager = {
    // Save a high score for a specific game
    saveHighScore: function(gameName, score) {
        const currentHighScore = this.getHighScore(gameName);
        if (score > currentHighScore) {
            localStorage.setItem(`${gameName}HighScore`, score);
            return true;
        }
        return false;
    },
    
    // Get high score for a specific game
    getHighScore: function(gameName) {
        return parseInt(localStorage.getItem(`${gameName}HighScore`)) || 0;
    },
    
    // Reset high score for a specific game
    resetHighScore: function(gameName) {
        localStorage.removeItem(`${gameName}HighScore`);
    },
    
    // Get all high scores
    getAllHighScores: function() {
        const highScores = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.endsWith('HighScore')) {
                const gameName = key.replace('HighScore', '');
                highScores[gameName] = parseInt(localStorage.getItem(key));
            }
        }
        return highScores;
    }
};

// Animation frame management
const AnimationManager = {
    requestId: null,
    
    // Start animation loop
    startAnimation: function(callback) {
        const animate = () => {
            this.requestId = requestAnimationFrame(animate);
            callback();
        };
        animate();
    },
    
    // Stop animation loop
    stopAnimation: function() {
        if (this.requestId) {
            cancelAnimationFrame(this.requestId);
            this.requestId = null;
        }
    }
};

// Input management
const InputManager = {
    keys: {},
    
    // Initialize keyboard input
    init: function() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
        });
        
        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
    },
    
    // Check if a key is pressed
    isKeyPressed: function(keyCode) {
        return this.keys[keyCode] === true;
    },
    
    // Reset all keys
    resetKeys: function() {
        this.keys = {};
    }
};

// Export utilities
const GameUtils = {
    AudioManager,
    ScoreManager,
    AnimationManager,
    InputManager
};
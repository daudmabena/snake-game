// Tetris Game Implementation

// Game constants
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const COLORS = [
    'transparent',
    '#00f0f0', // I piece - cyan
    '#f0f000', // O piece - yellow
    '#a000f0', // T piece - purple
    '#00f000', // S piece - green
    '#f00000', // Z piece - red
    '#0000f0', // J piece - blue
    '#f0a000'  // L piece - orange
];

// Tetromino shapes
const SHAPES = [
    [], // Empty shape for index alignment
    [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], // I
    [[2, 2], [2, 2]], // O
    [[0, 3, 0], [3, 3, 3], [0, 0, 0]], // T
    [[0, 4, 4], [4, 4, 0], [0, 0, 0]], // S
    [[5, 5, 0], [0, 5, 5], [0, 0, 0]], // Z
    [[6, 0, 0], [6, 6, 6], [0, 0, 0]], // J
    [[0, 0, 7], [7, 7, 7], [0, 0, 0]]  // L
];

// Game variables
let canvas, ctx;
let nextPieceCanvas, nextPieceCtx;
let gameBoard;
let currentPiece, nextPiece;
let score = 0;
let highScore = 0;
let level = 1;
let lines = 0;
let gameInterval;
let isPaused = false;
let gameOver = false;
let dropStart;
let gameSpeed = 1000; // Initial speed in ms

// DOM elements
let scoreElement, highScoreElement, levelElement, linesElement;
let startBtn, pauseBtn, resetBtn;

// Initialize the game
function init() {
    // Get DOM elements
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    nextPieceCanvas = document.getElementById('nextPieceCanvas');
    nextPieceCtx = nextPieceCanvas.getContext('2d');
    
    scoreElement = document.getElementById('score');
    highScoreElement = document.getElementById('highScore');
    levelElement = document.getElementById('level');
    linesElement = document.getElementById('lines');
    
    startBtn = document.getElementById('startBtn');
    pauseBtn = document.getElementById('pauseBtn');
    resetBtn = document.getElementById('resetBtn');
    
    // Set canvas dimensions based on block size
    canvas.width = COLS * BLOCK_SIZE;
    canvas.height = ROWS * BLOCK_SIZE;
    
    // Load high score from localStorage
    highScore = getHighScore('tetris') || 0;
    highScoreElement.textContent = highScore;
    
    // Initialize game board
    createBoard();
    
    // Add event listeners
    document.addEventListener('keydown', handleKeyPress);
    startBtn.addEventListener('click', startGame);
    pauseBtn.addEventListener('click', togglePause);
    resetBtn.addEventListener('click', resetGame);
    
    // Draw initial board
    drawBoard();
    
    // Show game instructions
    ctx.fillStyle = '#333';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Press Start to Play', canvas.width / 2, canvas.height / 2);
}

// Create empty game board
function createBoard() {
    gameBoard = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

// Draw the game board
function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the grid
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            drawBlock(col, row, gameBoard[row][col]);
        }
    }
    
    // Draw the current piece if game is active
    if (currentPiece && !gameOver) {
        drawPiece();
    }
    
    // Draw game over message if game is over
    if (gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 30);
        ctx.font = '20px Arial';
        ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 10);
        ctx.fillText('Press Reset to Play Again', canvas.width / 2, canvas.height / 2 + 50);
    }
}

// Draw a single block
function drawBlock(x, y, colorIndex) {
    const color = COLORS[colorIndex];
    if (color === 'transparent') return;
    
    ctx.fillStyle = color;
    ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    
    ctx.strokeStyle = '#222';
    ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    
    // Add 3D effect
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.moveTo(x * BLOCK_SIZE, y * BLOCK_SIZE);
    ctx.lineTo((x + 1) * BLOCK_SIZE, y * BLOCK_SIZE);
    ctx.lineTo(x * BLOCK_SIZE, (y + 1) * BLOCK_SIZE);
    ctx.fill();
}

// Draw the current piece
function drawPiece() {
    // Placeholder for tetris piece drawing logic
    // Will be implemented in the full version
}

// Generate a new random piece
function generatePiece() {
    // Placeholder for piece generation logic
    // Will be implemented in the full version
}

// Move the current piece
function movePiece(direction) {
    // Placeholder for piece movement logic
    // Will be implemented in the full version
}

// Rotate the current piece
function rotatePiece() {
    // Placeholder for piece rotation logic
    // Will be implemented in the full version
}

// Check for collision
function checkCollision() {
    // Placeholder for collision detection logic
    // Will be implemented in the full version
    return false;
}

// Lock the piece in place and check for completed lines
function lockPiece() {
    // Placeholder for piece locking and line clearing logic
    // Will be implemented in the full version
}

// Clear completed lines and update score
function clearLines() {
    // Placeholder for line clearing logic
    // Will be implemented in the full version
}

// Update the game state
function update() {
    // Placeholder for game update logic
    // Will be implemented in the full version
}

// Handle keyboard input
function handleKeyPress(e) {
    if (gameOver || !currentPiece) return;
    
    switch(e.keyCode) {
        case 37: // Left arrow
            movePiece('left');
            break;
        case 38: // Up arrow
            rotatePiece();
            break;
        case 39: // Right arrow
            movePiece('right');
            break;
        case 40: // Down arrow
            movePiece('down');
            break;
        case 32: // Space bar - hard drop
            // Placeholder for hard drop logic
            break;
        case 80: // P key - pause
            togglePause();
            break;
    }
}

// Start the game
function startGame() {
    if (gameInterval || gameOver) return;
    
    resetGame();
    generatePiece();
    nextPiece = generatePiece();
    dropStart = Date.now();
    gameInterval = setInterval(update, gameSpeed);
    
    startBtn.disabled = true;
    pauseBtn.disabled = false;
}

// Toggle pause state
function togglePause() {
    if (gameOver) return;
    
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
    
    if (isPaused) {
        clearInterval(gameInterval);
        gameInterval = null;
        
        // Show pause message
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
    } else {
        dropStart = Date.now();
        gameInterval = setInterval(update, gameSpeed);
    }
}

// Reset the game
function resetGame() {
    clearInterval(gameInterval);
    gameInterval = null;
    
    createBoard();
    score = 0;
    level = 1;
    lines = 0;
    gameSpeed = 1000;
    gameOver = false;
    isPaused = false;
    
    scoreElement.textContent = score;
    levelElement.textContent = level;
    linesElement.textContent = lines;
    
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Pause';
    
    drawBoard();
}

// Update the score and check for level up
function updateScore(clearedLines) {
    // Placeholder for score update logic
    // Will be implemented in the full version
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', init);
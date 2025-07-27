// Pong Game Implementation

// Game constants
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;
const BALL_RADIUS = 8;
const PADDLE_SPEED = 8;

// Game variables
let canvas, ctx;
let playerPaddle, computerPaddle, ball;
let playerScore = 0;
let computerScore = 0;
let highScore = 0;
let gameInterval;
let isPaused = false;
let gameOver = false;
let difficulty = 'medium';

// DOM elements
let playerScoreElement, computerScoreElement, highScoreElement;
let startBtn, pauseBtn, resetBtn, difficultySelect;

// Initialize the game
function init() {
    // Get DOM elements
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    
    playerScoreElement = document.getElementById('playerScore');
    computerScoreElement = document.getElementById('computerScore');
    highScoreElement = document.getElementById('highScore');
    
    startBtn = document.getElementById('startBtn');
    pauseBtn = document.getElementById('pauseBtn');
    resetBtn = document.getElementById('resetBtn');
    difficultySelect = document.getElementById('difficultySelect');
    
    // Load high score from localStorage
    highScore = getHighScore('pong') || 0;
    highScoreElement.textContent = highScore;
    
    // Initialize game objects
    resetGameObjects();
    
    // Add event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keydown', handleKeyPress);
    startBtn.addEventListener('click', startGame);
    pauseBtn.addEventListener('click', togglePause);
    resetBtn.addEventListener('click', resetGame);
    difficultySelect.addEventListener('change', changeDifficulty);
    
    // Draw initial board
    draw();
    
    // Show game instructions
    ctx.fillStyle = '#333';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Press Start to Play', canvas.width / 2, canvas.height / 2);
}

// Reset game objects to initial state
function resetGameObjects() {
    playerPaddle = {
        x: 20,
        y: canvas.height / 2 - PADDLE_HEIGHT / 2,
        width: PADDLE_WIDTH,
        height: PADDLE_HEIGHT,
        dy: 0
    };
    
    computerPaddle = {
        x: canvas.width - 20 - PADDLE_WIDTH,
        y: canvas.height / 2 - PADDLE_HEIGHT / 2,
        width: PADDLE_WIDTH,
        height: PADDLE_HEIGHT,
        dy: 0
    };
    
    ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: BALL_RADIUS,
        dx: 5,
        dy: 3
    };
}

// Draw the game elements
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the net
    drawNet();
    
    // Draw paddles
    drawPaddle(playerPaddle);
    drawPaddle(computerPaddle);
    
    // Draw the ball
    drawBall();
    
    // Draw game over message if game is over
    if (gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 30);
        
        const winner = playerScore >= 10 ? 'You Win!' : 'Computer Wins!';
        ctx.fillText(winner, canvas.width / 2, canvas.height / 2 + 10);
        
        ctx.font = '20px Arial';
        ctx.fillText('Press Reset to Play Again', canvas.width / 2, canvas.height / 2 + 50);
    }
}

// Draw the center net
function drawNet() {
    ctx.beginPath();
    ctx.setLineDash([5, 15]);
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = 'white';
    ctx.stroke();
    ctx.setLineDash([]);
}

// Draw a paddle
function drawPaddle(paddle) {
    ctx.fillStyle = 'white';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// Draw the ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

// Update the game state
function update() {
    if (isPaused || gameOver) return;
    
    // Move the player paddle
    playerPaddle.y += playerPaddle.dy;
    
    // Keep the player paddle within the canvas
    if (playerPaddle.y < 0) {
        playerPaddle.y = 0;
    } else if (playerPaddle.y + playerPaddle.height > canvas.height) {
        playerPaddle.y = canvas.height - playerPaddle.height;
    }
    
    // Move the computer paddle based on difficulty
    moveComputerPaddle();
    
    // Move the ball
    ball.x += ball.dx;
    ball.y += ball.dy;
    
    // Ball collision with top and bottom walls
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy;
    }
    
    // Ball collision with paddles
    if (checkPaddleCollision()) {
        // Reverse ball direction and slightly increase speed
        ball.dx = -ball.dx * 1.05;
        
        // Adjust ball angle based on where it hit the paddle
        // This will be implemented in the full version
    }
    
    // Ball goes out of bounds
    if (ball.x - ball.radius < 0) {
        // Computer scores
        computerScore++;
        computerScoreElement.textContent = computerScore;
        resetBall();
        
        if (computerScore >= 10) {
            endGame();
        }
    } else if (ball.x + ball.radius > canvas.width) {
        // Player scores
        playerScore++;
        playerScoreElement.textContent = playerScore;
        
        // Update high score if needed
        if (playerScore > highScore) {
            highScore = playerScore;
            highScoreElement.textContent = highScore;
            saveHighScore('pong', highScore);
        }
        
        resetBall();
        
        if (playerScore >= 10) {
            endGame();
        }
    }
    
    // Draw the updated game state
    draw();
}

// Move the computer paddle based on difficulty
function moveComputerPaddle() {
    // Placeholder for computer AI logic
    // Will be implemented in the full version
}

// Check for collision between the ball and paddles
function checkPaddleCollision() {
    // Placeholder for collision detection logic
    // Will be implemented in the full version
    return false;
}

// Reset the ball to the center after scoring
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = -ball.dx;
    ball.dy = Math.random() * 6 - 3; // Random vertical direction
}

// Handle mouse movement for paddle control
function handleMouseMove(e) {
    if (gameOver || !gameInterval) return;
    
    const relativeY = e.clientY - canvas.getBoundingClientRect().top;
    playerPaddle.y = relativeY - playerPaddle.height / 2;
    
    // Keep the paddle within the canvas
    if (playerPaddle.y < 0) {
        playerPaddle.y = 0;
    } else if (playerPaddle.y + playerPaddle.height > canvas.height) {
        playerPaddle.y = canvas.height - playerPaddle.height;
    }
}

// Handle keyboard input
function handleKeyPress(e) {
    if (gameOver || !gameInterval) return;
    
    switch(e.keyCode) {
        case 38: // Up arrow
            playerPaddle.dy = -PADDLE_SPEED;
            break;
        case 40: // Down arrow
            playerPaddle.dy = PADDLE_SPEED;
            break;
        case 80: // P key - pause
            togglePause();
            break;
    }
}

// Handle key release
document.addEventListener('keyup', function(e) {
    if (e.keyCode === 38 || e.keyCode === 40) {
        playerPaddle.dy = 0;
    }
});

// Start the game
function startGame() {
    if (gameInterval || gameOver) return;
    
    resetGame();
    gameInterval = setInterval(update, 16); // ~60fps
    
    startBtn.disabled = true;
    pauseBtn.disabled = false;
}

// Toggle pause state
function togglePause() {
    if (gameOver) return;
    
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
    
    if (isPaused) {
        // Show pause message
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
    }
}

// Reset the game
function resetGame() {
    clearInterval(gameInterval);
    gameInterval = null;
    
    playerScore = 0;
    computerScore = 0;
    gameOver = false;
    isPaused = false;
    
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
    
    resetGameObjects();
    
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Pause';
    
    draw();
}

// End the game
function endGame() {
    gameOver = true;
    clearInterval(gameInterval);
    gameInterval = null;
    
    startBtn.disabled = true;
    pauseBtn.disabled = true;
}

// Change difficulty level
function changeDifficulty() {
    difficulty = difficultySelect.value;
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', init);
document.addEventListener('DOMContentLoaded', () => {
    // Get canvas and context
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    
    // Game variables
    const gridSize = 20;
    const gridWidth = canvas.width / gridSize;
    const gridHeight = canvas.height / gridSize;
    
    let snake = [];
    let food = {};
    let direction = 'right';
    let nextDirection = 'right';
    let score = 0;
    let highScore = GameUtils.ScoreManager.getHighScore('snake');
    let gameSpeed = 150; // milliseconds
    let gameInterval;
    let gameRunning = false;
    
    // DOM elements
    const scoreElement = document.getElementById('score');
    const highScoreElement = document.getElementById('highScore');
    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    // Initialize high score display
    highScoreElement.textContent = highScore;
    
    // Initialize game
    function initGame() {
        // Create snake
        snake = [
            {x: 5, y: 10},
            {x: 4, y: 10},
            {x: 3, y: 10}
        ];
        
        // Set initial direction
        direction = 'right';
        nextDirection = 'right';
        
        // Reset score
        score = 0;
        scoreElement.textContent = score;
        
        // Generate food
        generateFood();
        
        // Draw initial state
        draw();
    }
    
    // Generate food at random position
    function generateFood() {
        // Generate random coordinates
        let foodX = Math.floor(Math.random() * gridWidth);
        let foodY = Math.floor(Math.random() * gridHeight);
        
        // Check if food is on snake
        const isOnSnake = snake.some(segment => segment.x === foodX && segment.y === foodY);
        
        // If food is on snake, generate again
        if (isOnSnake) {
            generateFood();
        } else {
            food = {x: foodX, y: foodY};
        }
    }
    
    // Draw game elements
    function draw() {
        // Clear canvas
        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw snake
        snake.forEach((segment, index) => {
            // Head is a different color
            if (index === 0) {
                ctx.fillStyle = '#4CAF50'; // Green head
            } else {
                ctx.fillStyle = '#8BC34A'; // Lighter green body
            }
            
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
            
            // Add a border to make segments distinct
            ctx.strokeStyle = '#222';
            ctx.strokeRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        });
        
        // Draw food
        ctx.fillStyle = '#FF5722'; // Orange food
        ctx.beginPath();
        const centerX = food.x * gridSize + gridSize / 2;
        const centerY = food.y * gridSize + gridSize / 2;
        const radius = gridSize / 2;
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    // Move snake
    function moveSnake() {
        // Update direction based on nextDirection
        direction = nextDirection;
        
        // Create new head based on direction
        const head = {...snake[0]};
        
        switch (direction) {
            case 'up':
                head.y -= 1;
                break;
            case 'down':
                head.y += 1;
                break;
            case 'left':
                head.x -= 1;
                break;
            case 'right':
                head.x += 1;
                break;
        }
        
        // Check for collisions
        if (checkCollision(head)) {
            gameOver();
            return;
        }
        
        // Add new head to snake
        snake.unshift(head);
        
        // Check if snake ate food
        if (head.x === food.x && head.y === food.y) {
            // Increase score
            score += 10;
            scoreElement.textContent = score;
            
            // Update high score if needed
            if (score > highScore) {
                highScore = score;
                highScoreElement.textContent = highScore;
                GameUtils.ScoreManager.saveHighScore('snake', highScore);
            }
            
            // Generate new food
            generateFood();
            
            // Increase speed slightly
            if (gameSpeed > 50) {
                gameSpeed -= 5;
                clearInterval(gameInterval);
                gameInterval = setInterval(gameLoop, gameSpeed);
            }
        } else {
            // Remove tail if snake didn't eat food
            snake.pop();
        }
    }
    
    // Check for collisions
    function checkCollision(head) {
        // Check wall collision
        if (head.x < 0 || head.x >= gridWidth || head.y < 0 || head.y >= gridHeight) {
            return true;
        }
        
        // Check self collision (skip the last segment as it will be removed)
        for (let i = 0; i < snake.length - 1; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                return true;
            }
        }
        
        return false;
    }
    
    // Game over
    function gameOver() {
        clearInterval(gameInterval);
        gameRunning = false;
        startBtn.textContent = 'Start Game';
        
        // Display game over message
        ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = '30px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 30);
        
        ctx.font = '20px Arial';
        ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 10);
        ctx.fillText('Press Start to play again', canvas.width / 2, canvas.height / 2 + 50);
    }
    
    // Game loop
    function gameLoop() {
        moveSnake();
        draw();
    }
    
    // Start game
    function startGame() {
        if (!gameRunning) {
            initGame();
            gameRunning = true;
            startBtn.textContent = 'Pause';
            gameInterval = setInterval(gameLoop, gameSpeed);
        } else {
            // Pause game
            clearInterval(gameInterval);
            gameRunning = false;
            startBtn.textContent = 'Resume';
            
            // Display pause message
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.font = '30px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText('Game Paused', canvas.width / 2, canvas.height / 2);
        }
    }
    
    // Reset game
    function resetGame() {
        clearInterval(gameInterval);
        gameRunning = false;
        startBtn.textContent = 'Start Game';
        gameSpeed = 150;
        initGame();
    }
    
    // Event listeners
    startBtn.addEventListener('click', startGame);
    resetBtn.addEventListener('click', resetGame);
    
    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        // Prevent default action for arrow keys
        if ([37, 38, 39, 40].includes(e.keyCode)) {
            e.preventDefault();
        }
        
        // Update direction based on key press
        // Prevent 180-degree turns
        switch (e.keyCode) {
            case 38: // Up arrow
                if (direction !== 'down') nextDirection = 'up';
                break;
            case 40: // Down arrow
                if (direction !== 'up') nextDirection = 'down';
                break;
            case 37: // Left arrow
                if (direction !== 'right') nextDirection = 'left';
                break;
            case 39: // Right arrow
                if (direction !== 'left') nextDirection = 'right';
                break;
        }
    });
    
    // Initialize game on load
    initGame();
});
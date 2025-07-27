# Arcade Games Hub

A collection of classic arcade games implemented using HTML5 Canvas, CSS, and JavaScript.

## Games Included

### Snake Game
- Control the snake, eat food, and avoid hitting walls or yourself
- Score tracking with local storage for high score
- Gradually increasing difficulty as your score grows
- Pause/Resume functionality

### Coming Soon
- Tetris
- Pong
- And more!

## Features

- Responsive design that works on desktop and mobile devices
- Score tracking with local storage for high scores
- Game hub interface to select different games
- Shared utilities for audio, animation, and input handling

## How to Play

1. Open `index.html` in your web browser to access the game hub
2. Select a game from the hub
3. Each game has its own instructions and controls
4. Try to beat your high score in each game!

## Implementation Details

The project uses the following technologies:

- **HTML5 Canvas** for rendering the games
- **CSS3** for styling the interface
- **JavaScript** for game logic
- **Local Storage API** for saving high scores

## Project Structure

```
arcade-games/
├── index.html         # Hub/launcher
├── assets/            # Shared images, sounds, fonts
├── styles/
│   └── main.css       # Common styles
├── scripts/
│   └── utils.js       # Shared helpers (audio, storage, etc.)
├── games/
│   ├── snake/
│   │   ├── snake.html
│   │   └── snake.js
│   ├── tetris/        # Coming soon
│   └── pong/          # Coming soon
└── leaderboard.json   # Optional local storage for scores
```
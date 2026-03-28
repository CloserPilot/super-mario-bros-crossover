import GameStateManager from './managers/GameStateManager.js';
import ButtonManager from './managers/ButtonManager.js';
import StatManager from './managers/StatManager.js';
import ScreenManager from './managers/ScreenManager.js';
import EventManager from './managers/EventManager.js';
import SoundManager from './managers/SoundManager.js';
import GraphicsManager from './managers/GraphicsManager.js';
import LevelManager from './managers/LevelManager.js';
import LevelDataManager from './managers/LevelDataManager.js';
import MessageBoxManager from './managers/MessageBoxManager.js';
import TextManager from './managers/TextManager.js';
import TutorialManager from './managers/TutorialManager.js';

class SuperMarioBrosCrossover {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Instantiate managers
        this.gameStateManager = GameStateManager;
        this.buttonManager = ButtonManager;
        this.statManager = StatManager;
        this.screenManager = ScreenManager;
        this.eventManager = EventManager;
        this.soundManager = SoundManager;
        this.graphicsManager = GraphicsManager;
        this.levelManager = LevelManager;
        this.levelDataManager = LevelDataManager;
        this.messageBoxManager = MessageBoxManager;
        this.textManager = TextManager;
        this.tutorialManager = TutorialManager;

        this.lastTime = 0;
    }

    async init() {
        console.log('Initializing Super Mario Bros. Crossover');

        // Initialize managers
        this.gameStateManager.initiate(this);
        this.buttonManager.initiate(this);
        this.statManager.initiate(this);
        this.screenManager.initiate(this);
        this.eventManager.initiate(this);
        this.soundManager.initiate(this);
        this.graphicsManager.initiate(this);
        this.levelManager.initiate(this);
        this.levelDataManager.initiate(this);
        this.messageBoxManager.initiate(this);
        this.textManager.initiate(this);
        this.tutorialManager.initiate(this);

        // Load initial level
        const initialLevelID = '1-1';
        await this.levelDataManager.loadLevelData(initialLevelID);
        this.levelManager.loadNewLevel(initialLevelID);

        this.startGameLoop(0);
    }

    startGameLoop(timestamp) {
        const dt = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        this.update(dt || 0);
        this.draw();

        requestAnimationFrame(this.startGameLoop.bind(this));
    }

    update(dt) {
        this.screenManager.update(dt);
    }

    draw() {
        this.screenManager.draw(this.ctx);
    }
}

// Entry point
window.onload = () => {
    const game = new SuperMarioBrosCrossover();
    game.init();
};

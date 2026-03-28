import MainManager from './MainManager.js';
import Level from '../Level.js';

class LevelManager extends MainManager {
    constructor() {
        super();
        if (LevelManager.instance) {
            return LevelManager.instance;
        }
        LevelManager.instance = this;
        this.newAreaStatsArr = [];
    }

    initiate(game) {
        super.initiate(game);
    }

    createLevel(levelID) {
        this.game.statManager.currentLevelID = levelID;
        this.game.gameStateManager.lockGameState = false;

        if (this.game.statManager.newLev) {
            // For now, we'll skip character selection and directly initiate the level
            this.initiateLevel();
        } else {
            this.initiateLevel();
        }
    }

    initiateLevel() {
        const level = new Level(this.game.statManager.currentLevelID, this.game.levelDataManager.currentLevelData, this.newAreaStatsArr, this.game.statManager.newLev);
        this.game.level = level; // Store the level reference in the game
        // The original ActionScript code adds the level to the display list.
        // In our JavaScript version, the ScreenManager will handle rendering.
    }
    
    loadNewLevel(levelID) {
        this.game.statManager.resetLevelStats();
        this.newAreaStatsArr = [];
        this.game.statManager.newLev = true;
        this.createLevel(levelID);
    }
}

export default new LevelManager();

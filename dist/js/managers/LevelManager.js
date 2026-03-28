import MainManager from './MainManager.js';

class LevelManager extends MainManager {
    constructor() {
        super();
        if (LevelManager.instance) {
            return LevelManager.instance;
        }
        LevelManager.instance = this;
    }

    initiate(game) {
        super.initiate(game);
    }

    loadLevel(level) {
        console.log(`Loading level: ${level}`);
    }
}

export default new LevelManager();

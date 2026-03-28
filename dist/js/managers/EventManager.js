import MainManager from './MainManager.js';
import GameScreen from '../screens/GameScreen.js';

class EventManager extends MainManager {
    constructor() {
        super();
        if (EventManager.instance) {
            return EventManager.instance;
        }
        EventManager.instance = this;
    }

    initiate(game) {
        super.initiate(game);
    }

    startGame() {
        this.game.screenManager.changeScreen(new GameScreen());
    }
}

export default new EventManager();

import MainManager from './MainManager.js';

class TutorialManager extends MainManager {
    constructor() {
        super();
        if (TutorialManager.instance) {
            return TutorialManager.instance;
        }
        TutorialManager.instance = this;
    }

    initiate(game) {
        super.initiate(game);
    }
}

export default new TutorialManager();

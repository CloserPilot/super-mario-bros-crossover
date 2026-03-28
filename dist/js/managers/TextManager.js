import MainManager from './MainManager.js';

class TextManager extends MainManager {
    constructor() {
        super();
        if (TextManager.instance) {
            return TextManager.instance;
        }
        TextManager.instance = this;
    }

    initiate(game) {
        super.initiate(game);
    }
}

export default new TextManager();

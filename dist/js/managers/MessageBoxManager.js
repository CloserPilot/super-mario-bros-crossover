import MainManager from './MainManager.js';

class MessageBoxManager extends MainManager {
    constructor() {
        super();
        if (MessageBoxManager.instance) {
            return MessageBoxManager.instance;
        }
        MessageBoxManager.instance = this;
    }

    initiate(game) {
        super.initiate(game);
    }
}

export default new MessageBoxManager();

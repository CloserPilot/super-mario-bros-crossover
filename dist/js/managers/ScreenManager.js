import MainManager from './MainManager.js';

class ScreenManager extends MainManager {
    constructor() {
        super();
        if (ScreenManager.instance) {
            return ScreenManager.instance;
        }
        ScreenManager.instance = this;

        this.currentScreen = null;
    }

    initiate(game) {
        super.initiate(game);
        // We'll set the initial screen in the main.js file for now
    }

    changeScreen(newScreen) {
        if (this.currentScreen) {
            this.currentScreen.destroy();
        }
        this.currentScreen = newScreen;
        this.currentScreen.initiate(this.game);
    }
    
    update(dt) {
        if (this.currentScreen) {
            this.currentScreen.update(dt);
        }
    }

    draw(ctx) {
        if (this.currentScreen) {
            this.currentScreen.draw(ctx);
        }
    }
}

export default new ScreenManager();

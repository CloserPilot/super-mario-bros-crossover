import MainManager from './MainManager.js';

class ScreenManager extends MainManager {
    constructor() {
        super();
        if (ScreenManager.instance) {
            return ScreenManager.instance;
        }
        ScreenManager.instance = this;

        this.currentScreen = null;
        this.isLoading = false;
        this.resourcesToLoad = 0;
        this.loadedResources = 0;
    }

    initiate(game) {
        super.initiate(game);
    }

    changeScreen(newScreen) {
        if (this.currentScreen) {
            this.currentScreen.destroy();
        }

        this.currentScreen = newScreen;
        this.isLoading = true;
        this.resourcesToLoad = 0;
        this.loadedResources = 0;

        this.currentScreen.initiate(this.game);

        // If no resources to load, finish loading immediately
        if (this.resourcesToLoad === 0) {
            this.finishLoading();
        }
    }

    resourceLoaded() {
        this.loadedResources++;
        if (this.loadedResources >= this.resourcesToLoad) {
            this.finishLoading();
        }
    }

    finishLoading() {
        this.isLoading = false;
    }

    addResource() {
        this.resourcesToLoad++;
    }

    update(dt) {
        if (this.isLoading) return;
        if (this.currentScreen) {
            this.currentScreen.update(dt);
        }
    }

    draw(ctx) {
        if (this.isLoading) {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
            ctx.fillStyle = 'white';
            ctx.font = '20px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`Loading... (${this.loadedResources}/${this.resourcesToLoad})`, this.game.canvas.width / 2, this.game.canvas.height / 2);
            ctx.textAlign = 'left';
            return;
        }

        if (this.currentScreen) {
            this.currentScreen.draw(ctx);
        }
    }
}

export default new ScreenManager();

export default class MainManager {
    constructor() {
        if (this.constructor === MainManager) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.initiated = false;
    }

    initiate(game) {
        if (this.initiated) {
            throw new Error("This manager has already been initiated.");
        }
        this.initiated = true;
        this.game = game;
        this.gsMngr = game.gameStateManager;
        this.btnMngr = game.buttonManager;
        this.statMngr = game.statManager;
        this.scrnMngr = game.screenManager;
        this.sndMngr = game.soundManager;
        this.eventMngr = game.eventManager;
        this.msgBxMngr = game.messageBoxManager;
        this.txtMngr = game.textManager;
        this.tutMngr = game.tutorialManager;
        this.grMngr = game.graphicsManager;
        this.lvlMngr = game.levelManager;
    }

    clearLevelRefs() {
        this.level = null;
        this.player = null;
    }

    updateLevelRefs() {
        this.level = this.game.level;
        this.player = this.level.player;
    }
}

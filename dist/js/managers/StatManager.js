import MainManager from './MainManager.js';

class StatManager extends MainManager {
    constructor() {
        super();
        if (StatManager.instance) {
            return StatManager.instance;
        }
        StatManager.instance = this;

        this.lives = 3;
        this.score = 0;
        this.coins = 0;
        this.upgrades = [];
    }

    initiate(game) {
        super.initiate(game);
    }

    addUpgrade(upgrade) {
        this.upgrades.push(upgrade);
    }

    hasUpgrade(upgrade) {
        return this.upgrades.includes(upgrade);
    }

    removeUpgrade(upgrade) {
        const index = this.upgrades.indexOf(upgrade);
        if (index > -1) {
            this.upgrades.splice(index, 1);
        }
    }
}

export default new StatManager();

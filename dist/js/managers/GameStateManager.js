import MainManager from './MainManager.js';
import GameStates from '../data/GameStates.js';

export default class GameStateManager extends MainManager {
    constructor() {
        super();
        if (GameStateManager.instance) {
            return GameStateManager.instance;
        }
        GameStateManager.instance = this;

        this._gameState = null;
        this.lockGameState = false;
    }

    initiate(game) {
        super.initiate(game);
        this.gameState = GameStates.LOADING;
    }

    get gameState() {
        return this._gameState;
    }

    set gameState(gs) {
        if (this.lockGameState) {
            console.log(`GameState locked: ${this._gameState}`);
            return;
        }

        const lastGameState = this._gameState;
        this._gameState = gs;

        console.log(`New game state: ${this._gameState}, Last game state: ${lastGameState}`);

        if (this._gameState !== GameStates.PLAY) {
            // Assuming statMngr has a stopTmrs method
            if (this.statMngr) {
                // this.statMngr.stopTmrs();
            }
        } else {
            // Assuming statMngr has a startTmrs method
            if (this.statMngr) {
                // this.statMngr.startTmrs();
            }
        }
    }
}

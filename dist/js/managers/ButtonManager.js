import MainManager from './MainManager.js';
import GameStates from '../data/GameStates.js';

class ButtonManager extends MainManager {
    constructor() {
        super();
        if (ButtonManager.instance) {
            return ButtonManager.instance;
        }
        ButtonManager.instance = this;

        // Button states
        this.lftBtn = false;
        this.rhtBtn = false;
        this.upBtn = false;
        this.dwnBtn = false;
        this.jmpBtn = false;
        this.atkBtn = false;
        this.spcBtn = false;
        this.selBtn = false;
        this.pseBtn = false;

        // Default key mappings using event.key
        this.keyMap = new Map([
            ['ArrowLeft', 'left'],
            ['ArrowRight', 'right'],
            ['ArrowUp', 'up'],
            ['ArrowDown', 'down'],
            ['z', 'jump'],
            ['x', 'attack'],
            ['c', 'special'],
            ['a', 'select'],
            ['Enter', 'pause'],
        ]);

        this.debugKeyMap = new Map([
            ['p', 'addUpgrade'],
            ['q', 'changeCharacter'],
            [']', 'changeCharSkin'],
            ['\\', 'changeMapSkin'],
            ['[', 'changeInterfaceSkin'],
            ['`', 'changeMusicType'],
            [';', 'swapFlashPalette'],
            ["'", 'changeGbPalette'],
            ['i', 'toggleInvincibility'],
            ['/', 'maxAmmo'],
            ['f', 'toggleFullScreen'],
            ['=', 'nextFrame'],
            ['-', 'pauseGameLoop'],
            ['9', 'toggleScreenScroll'],
        ]);

        this.setButtons = false; // Flag for when remapping controls
    }

    initiate(game) {
        super.initiate(game);
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        window.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    handleKeyDown(e) {
        const gameState = this.gsMngr.gameState;

        // TODO: Add logic for active message boxes

        const action = this.keyMap.get(e.key);
        if (action) {
            this.processActionDown(action);
        }

        const debugAction = this.debugKeyMap.get(e.key.toLowerCase());
        if (debugAction) {
            // Assuming a global DEBUG_MODE flag exists
            // if (GameSettings.DEBUG_MODE) {
                this.processDebugAction(debugAction);
            // }
        }
    }

    handleKeyUp(e) {
        const action = this.keyMap.get(e.key);
        if (action) {
            this.processActionUp(action);
        }
    }

    processActionDown(action) {
        switch (action) {
            case 'left': this.lftBtn = true; break;
            case 'right': this.rhtBtn = true; break;
            case 'up': this.upBtn = true; break;
            case 'down': this.dwnBtn = true; break;
            case 'jump': this.jmpBtn = true; break;
            case 'attack': this.atkBtn = true; break;
            case 'special': this.spcBtn = true; break;
            case 'select': this.selBtn = true; break;
            case 'pause': 
                this.pseBtn = true;
                if (this.gsMngr.gameState === GameStates.PLAY) {
                    console.log('Pausing game...'); // Placeholder for eventMngr.pauseGame()
                }
                break;
        }
        // More logic will go here to pass button presses to the player/menus
    }

    processActionUp(action) {
        switch (action) {
            case 'left': this.lftBtn = false; break;
            case 'right': this.rhtBtn = false; break;
            case 'up': this.upBtn = false; break;
            case 'down': this.dwnBtn = false; break;
            case 'jump': this.jmpBtn = false; break;
            case 'attack': this.atkBtn = false; break;
            case 'special': this.spcBtn = false; break;
            case 'select': this.selBtn = false; break;
            case 'pause': this.pseBtn = false; break;
        }
        // More logic will go here to pass button releases to the player/menus
    }

    processDebugAction(action) {
        if (this.gsMngr.gameState !== GameStates.PLAY) return;

        console.log(`Executing debug action: ${action}`);
        // Placeholders for debug functionalities
        switch (action) {
            case 'addUpgrade': break; 
            case 'changeCharacter': break;
            // ... and so on for all debug commands
        }
    }    

    // TODO: Add methods for remapping controls (setButtonKeyCode, writeNewButtons, etc.)

}

export default new ButtonManager();

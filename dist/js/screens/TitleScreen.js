import GameStates from '../data/GameStates.js';
import SoundNames from '../data/SoundNames.js';
import ImageNames from '../data/ImageNames.js';

export default class TitleScreen {
    initiate(game) {
        this.game = game;
        this.game.gameStateManager.gameState = GameStates.TITLE_SCREEN;

        this.game.graphicsManager.loadImage(ImageNames.TITLE_LOGO, 'dist/img/title-logo.png');
    }

    update(dt) {
        // On enter press, start the game
        if (this.game.buttonManager.pseBtn) {
            this.game.soundManager.playSound(SoundNames.PAUSE);
            this.game.eventManager.startGame();
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);

        const titleLogo = this.game.graphicsManager.getImage(ImageNames.TITLE_LOGO);
        if (titleLogo) {
            ctx.drawImage(titleLogo, this.game.canvas.width / 2 - titleLogo.width / 2, 100);
        } else {
            ctx.fillStyle = 'white';
            ctx.font = '32px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Super Mario Bros. Crossover', this.game.canvas.width / 2, 150);
        }

        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Press Enter to Start', this.game.canvas.width / 2, 300);
        ctx.textAlign = 'left';
    }

    destroy() {
        // Clean up any resources used by this screen
    }
}

import GameStates from '../data/GameStates.js';

export default class BlackScreen {
    initiate(game, nextScreen) {
        this.game = game;
        this.nextScreen = nextScreen;
        this.game.gameStateManager.gameState = GameStates.BLACK_SCREEN;
        this.timer = 0;
    }

    update(dt) {
        this.timer += dt;
        if (this.timer > 1) { // Stay on black screen for 1 second
            this.game.screenManager.changeScreen(this.nextScreen);
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    }

    destroy() {}
}

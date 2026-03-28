import GameStates from '../data/GameStates.js';

export default class GameScreen {
    initiate(game) {
        this.game = game;
        this.game.gameStateManager.gameState = GameStates.PLAY;
        this.game.statManager.startNewLevel();
    }

    update(dt) {
        this.game.statManager.calcTimeLeft();
    }

    draw(ctx) {
        ctx.fillStyle = '#5c94fc'; // Blue sky color
        ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);

        // Draw some ground
        ctx.fillStyle = '#e08020';
        ctx.fillRect(0, 400, this.game.canvas.width, 80);

        this.drawUI(ctx);
    }

    drawUI(ctx) {
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        
        // Top Row Stats
        ctx.fillText('MARIO', 50, 40);
        ctx.fillText('WORLD', 240, 40);
        ctx.fillText('TIME', 350, 40);
        ctx.fillText(String(this.game.statManager.score).padStart(6, '0'), 50, 60);
        ctx.fillText(`* ${String(this.game.statManager.coins).padStart(2, '0')}`, 150, 60);
        ctx.fillText('1-1', 245, 60);
        ctx.fillText(String(Math.ceil(this.game.statManager.timeLeft)).padStart(3, '0'), 350, 60);

        ctx.font = '14px Arial';
        ctx.fillText(`Lives: ${this.game.statManager.lives}`, 50, 450);
    }

    destroy() {
        // Clean up any resources used by this screen
    }
}

export default class Level {
    constructor(levelID, levelData, areaStatsArr, newLev) {
        console.log('Level created:', { levelID, levelData, areaStatsArr, newLev });
        this.levelID = levelID;
        this.levelData = levelData;
        this.areaStatsArr = areaStatsArr;
        this.newLev = newLev;
        this.TILE_SIZE = 16;

        // Simulate the passage of time, this is handled by the game loop
        this.dt = 1 / 60;

        this.initiate();
    }

    initiate() {
        console.log('Initiating level...');
        // The original ActionScript code adds the level to the display list.
        // In our JavaScript version, the ScreenManager will handle rendering.
    }

    update(dt) {
        // TODO: Implement the level update logic
    }

    draw(ctx) {
        if (!this.levelData || !this.levelData.map) {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.fillStyle = 'white';
            ctx.font = '20px Arial';
            ctx.fillText('Error: Level data not loaded!', 20, 40);
            return;
        }

        ctx.fillStyle = 'blue';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        for (let row = 0; row < this.levelData.map.length; row++) {
            for (let col = 0; col < this.levelData.map[row].length; col++) {
                const tile = this.levelData.map[row][col];
                if (tile !== '0') {
                    ctx.fillStyle = 'red';
                    ctx.fillRect(col * this.TILE_SIZE, row * this.TILE_SIZE, this.TILE_SIZE, this.TILE_SIZE);
                }
            }
        }

        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText('Level: ' + this.levelID, 20, 40);
    }
}

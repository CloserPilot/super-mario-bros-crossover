import MainManager from './MainManager.js';

class GraphicsManager extends MainManager {
    constructor() {
        super();
        if (GraphicsManager.instance) {
            return GraphicsManager.instance;
        }
        GraphicsManager.instance = this;

        this.images = {};
    }

    initiate(game) {
        super.initiate(game);
    }

    loadImage(imageName, imageUrl) {
        const image = new Image();
        image.onload = () => {
            this.images[imageName] = image;
            this.game.screenManager.resourceLoaded();
        };
        image.onerror = (error) => {
            console.error(`Error loading image: ${imageName} from ${imageUrl}`);
            // We should still count this as a loaded resource to avoid getting stuck
            this.game.screenManager.resourceLoaded();
        };
        image.src = imageUrl;
    }

    getImage(imageName) {
        return this.images[imageName];
    }
}

export default new GraphicsManager();

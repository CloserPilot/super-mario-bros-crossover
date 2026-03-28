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
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
                this.images[imageName] = image;
                resolve(image);
            };
            image.onerror = (error) => {
                console.error(`Error loading image: ${imageName} from ${imageUrl}`);
                reject(error);
            };
            image.src = imageUrl;
        });
    }

    getImage(imageName) {
        return this.images[imageName];
    }
}

export default new GraphicsManager();

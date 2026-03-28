import MainManager from './MainManager.js';

class LevelDataManager extends MainManager {
    constructor() {
        super();
        if (LevelDataManager.instance) {
            return LevelDataManager.instance;
        }
        LevelDataManager.instance = this;
        this.levelDataXml = null;
        this.currentLevelData = null;
    }

    initiate(game) {
        super.initiate(game);
    }

    async loadLevelData(levelID) {
        if (!this.levelDataXml) {
            try {
                const response = await fetch('../assets/documents/levelDataSmb.xml');
                const xmlText = await response.text();
                const parser = new DOMParser();
                this.levelDataXml = parser.parseFromString(xmlText, 'application/xml');
            } catch (error) {
                console.error('Error loading level data:', error);
                return null;
            }
        }

        this.currentLevelData = this.parseLevelData(levelID);
        return this.currentLevelData;
    }

    parseLevelData(levelID) {
        const levelNode = this.levelDataXml.querySelector(`LEVEL[ID="${levelID}"]`);
        if (!levelNode) {
            return null;
        }

        const areaNode = levelNode.querySelector('AREA[ID="a"]'); // Start with area 'a'
        if (!areaNode) {
            return null;
        }

        const mapNode = areaNode.querySelector('MAP');
        if (!mapNode) {
            return null;
        }

        const mapData = mapNode.textContent.split('],').map(row => row.replace(/[\n\r]/g, '').split(','));

        return {
            id: levelID,
            time: parseInt(levelNode.getAttribute('TIME')),
            mainArea: levelNode.getAttribute('MAIN_AREA'),
            hwArea: levelNode.getAttribute('HW_AREA'),
            lockedCheckpoint: levelNode.getAttribute('LOCKED_CP') === 'True',
            map: mapData
        };
    }
}

export default new LevelDataManager();

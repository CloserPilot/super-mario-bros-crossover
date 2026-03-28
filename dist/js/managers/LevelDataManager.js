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
                // Correct path relative to index.html in the root
                const response = await fetch('assets/documents/levelDataSmb.xml');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const xmlText = await response.text();
                const parser = new DOMParser();
                this.levelDataXml = parser.parseFromString(xmlText, 'application/xml');
                console.log("Level data XML loaded and parsed.");
            } catch (error) {
                console.error('Error loading level data XML:', error);
                return null;
            }
        }

        this.currentLevelData = this.parseLevelData(levelID);
        if(!this.currentLevelData) {
            console.error(`Could not parse level data for ID: ${levelID}`);
        }
        return this.currentLevelData;
    }

    parseLevelData(levelID) {
        const levelNode = this.levelDataXml.querySelector(`LEVEL[ID="${levelID}"]`);
        if (!levelNode) {
            console.error(`Level with ID ${levelID} not found in XML.`);
            return null;
        }

        const mainAreaID = levelNode.getAttribute('MAIN_AREA');
        const areaNode = levelNode.querySelector(`AREA[ID="${mainAreaID}"]`);
        if (!areaNode) {
            console.error(`Main area "${mainAreaID}" not found for level ${levelID}.`);
            return null;
        }

        const mapNode = areaNode.querySelector('MAP');
        if (!mapNode) {
            console.error(`MAP not found for area "${mainAreaID}" in level ${levelID}.`);
            return null;
        }
        
        // Improved map parsing
        const mapText = mapNode.textContent.trim();
        const mapRows = mapText.split('],');
        const mapData = mapRows.map(row => 
            row.replace(/[\r\n\[\]]/g, '').split(',').filter(cell => cell)
        );

        console.log(`Successfully parsed map for level ${levelID}.`);

        return {
            id: levelID,
            time: parseInt(levelNode.getAttribute('TIME')),
            mainArea: mainAreaID,
            hwArea: levelNode.getAttribute('HW_AREA'),
            lockedCheckpoint: levelNode.getAttribute('LOCKED_CP') === 'True',
            map: mapData
        };
    }
}

export default new LevelDataManager();

console.log("Debug main.js running");

async function run() {
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) {
        console.error("Canvas not found!");
        return;
    }
    const ctx = canvas.getContext('2d');

    try {
        console.log("Fetching XML...");
        const response = await fetch('assets/documents/levelDataSmb.xml');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const xmlText = await response.text();
        console.log("XML fetched.");

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'application/xml');

        const parserError = xmlDoc.querySelector('parsererror');
        if (parserError) {
            console.error('Error parsing XML:', parserError.textContent);
            throw new Error('XML parsing error');
        }
        console.log("XML parsed.");

        const levelNode = xmlDoc.querySelector('LEVEL[ID="1-1"]');
        if (!levelNode) {
            throw new Error("Level 1-1 not found");
        }
        console.log("Level 1-1 node found.");
        
        const areaNode = levelNode.querySelector('AREA[ID="a"]');
        const mapNode = areaNode.querySelector('MAP');
        const mapText = mapNode.textContent.trim();
        const mapRows = mapText.split('],');
        const mapData = mapRows.map(row => 
            row.replace(/[\r\n\[\]]/g, '').split(',').filter(cell => cell)
        );
        console.log("Map data parsed from XML.");

        // Draw the map
        ctx.fillStyle = '#5c94fc'; // Blue sky color
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const TILE_SIZE = 16;
        for (let row = 0; row < mapData.length; row++) {
            for (let col = 0; col < mapData[row].length; col++) {
                const tile = mapData[row][col];
                if (tile && tile !== '0') {
                    let color = 'gray'; // Default color for unknown tiles
                    if (tile.includes('ground')) {
                        color = '#E57373'; // A reddish color for ground
                    } else if (tile.includes('brick')) {
                        color = '#A1887F'; // A brownish color for bricks
                    } else if (tile.includes('itemBlock')) {
                        color = '#FFB74D'; // An orange color for item blocks
                    }
                    ctx.fillStyle = color;
                    ctx.fillRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                }
            }
        }
        console.log("Map drawn.");

    } catch (error) {
        console.error("An error occurred:", error);
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText(error.message, 10, 50);
    }
}

window.onload = run;

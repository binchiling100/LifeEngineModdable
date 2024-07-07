const CellHolder = require("./CellHolder");
class CustomCellManager {
	constructor() {
		this.customCells = [];
	}

	getCustomCell(ID) {
		return this.customCells[ID];
	}

	getCellByName(name) {
		let i = 0;
		while (i < this.customCells.length) {
			if (this.customCells[i].cname == name) {
				return this.customCells[i];
            }
			i++;
		}
		console.log("findfailed!");
		return;
    }

	createCell(behaviour, initRandomFunc, initDefaultFunc, color, name) {
		let customCell = new CellHolder(behaviour, initRandomFunc, initDefaultFunc, color, name);
		customCell.color = color;
		this.customCells.push(customCell);
		

	}
	getRandomCustomCell() {
		return this.customCells[Math.floor(Math.random() * this.customCells.length)+1];
	}
	arePresent() {
		return this.customCells[0];
	}
	
}

module.exports = CustomCellManager;
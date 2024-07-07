class CellHolder {
	constructor(behaviour, initRandomFunc, initDefaultFunc, color, name) {
		this.behaviour = behaviour;
		this.initRandomFunc = initRandomFunc;
		this.initDefaultFunc = initDefaultFunc;
		this.color = color;
		this.name = name;
	}
}

module.exports = CellHolder;
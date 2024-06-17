const CellStates = require("../CellStates");
const BodyCell = require("./BodyCell");

class CustomCell extends BodyCell {
    constructor(org, loc_col, loc_row, behaviour, initRandomFunc, initDefaultFunc) {
        super(CellStates.custom, org, loc_col, loc_row);
        this.behaviour = behaviour;
        this.initDefaultFunc = initDefaultFunc;
        this.initRandomFunc = initRandomFunc;
    }
    
    initDefault() {
        if (this.initDefaultFunc) {
            this.initDefaultFunc();
        }
    }

    initRandom() {
        if (this.initRandomFunc) {
            this.initRandomFunc();
        }
    }

    performFunction(env) {
        if (this.behaviour) {
            this.behaviour(this.org, this.loc_col, this.loc_row, env);
        }
    }
    
}

module.exports = CustomCell;
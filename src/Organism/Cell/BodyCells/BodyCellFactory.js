const MouthCell = require("./MouthCell");
const ProducerCell = require("./ProducerCell");
const MoverCell = require("./MoverCell");
const KillerCell = require("./KillerCell");
const ArmorCell = require("./ArmorCell");
const EyeCell = require("./EyeCell");
const CellStates = require("../CellStates");
const Custom = require("./CustomCell");

const BodyCellFactory = {
    init: function() {
        var type_map = {};
        type_map[CellStates.mouth.name] = MouthCell;
        type_map[CellStates.producer.name] = ProducerCell;
        type_map[CellStates.mover.name] = MoverCell;
        type_map[CellStates.killer.name] = KillerCell;
        type_map[CellStates.armor.name] = ArmorCell;
        type_map[CellStates.eye.name] = EyeCell;
        type_map[CellStates.custom.name] = Custom;
        this.type_map = type_map;
    },

    createInherited: function(org, to_copy) {
        var cell = new this.type_map[to_copy.state.name](org, to_copy.loc_col, to_copy.loc_row);
        cell.initInherit(to_copy);
        return cell;
    },

    createRandom: function (org, state, loc_col, loc_row, behaviour, initRandomFunc, initDefaultFunc) {
        behaviour = behaviour || null;
        initRandomFunc = initRandomFunc || null;
        initDefaultFunc = initDefaultFunc || null;
        function nothing() {

        }
        var cell;
        
        if (state.name != 'custom') {
            cell = new this.type_map[state.name](org, loc_col, loc_row);
        }
        else {

            cell = new this.type_map[state.name](org, loc_col, loc_row, nothing, nothing, nothing);
        }
        if (state.name == 'custom') {
            if (behaviour) {
                cell.behaviour = behaviour;
            }
            if (initDefaultFunc) {
                cell.initDefaultFunc = initDefaultFunc;
            }
            if (initRandomFunc) {
                cell.initRandomFunc = initRandomFunc;
            }
        }
        
        cell.initRandom();
        return cell;
    },

    createDefault: function(org, state, loc_col, loc_row) {
        var cell = new this.type_map[state.name](org, loc_col, loc_row);
        cell.initDefault();
        return cell;
    },
}
BodyCellFactory.init();

module.exports = BodyCellFactory;
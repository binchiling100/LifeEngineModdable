const MouthCell = require("./MouthCell");
const ProducerCell = require("./ProducerCell");
const MoverCell = require("./MoverCell");
const KillerCell = require("./KillerCell");
const ArmorCell = require("./ArmorCell");
const EyeCell = require("./EyeCell");
const CellStates = require("../CellStates");
const Custom = require("./CustomCell");
const Environment = require("../../../Environments/WorldEnvironment");
const CustomCellManager = require("../../../ModLoader/Organism/CustomCellManager");
const CellHolder = require("../../../ModLoader/Organism/CellHolder");

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

    createRandom: function (org, state, loc_col, loc_row) {
        
        env = org.env;
        let cellManager = org.env.cellManager;
        
        var cell;

        if (state.name != Custom) {
            cell = new this.type_map[state.name](org, loc_col, loc_row);
        }
        else {
            let cellHolder = cellManager.getRandomCustomCell();
            if (cellManager.arePresent()) {
                cell = new Custom(org, loc_col, loc_row, cellHolder.behaviour, cellHolder.initRandomFunc, cellHolder.initDefaultFunc, cellHolder.name);
            }
            else {
                while (state.name == Custom) {
                    state.name = CellStates.getRandomName();

                }
                cell = new this.type_map[state.name](org, loc_col, loc_row);
            }

        }
        if (state.name == Custom) {
            cellManager: CellHolder = org.owner.env.custom.cellManager.getRandomCustomCell();
            cell.behaviour = cellManager.behaviour;
            cell.initDefaultFunc = cellManager.initDefaultFunc;
            cell.initRandomFunc = cellManager.initRandomFunc;
            cell.cname = cellManager.name;
        }
        

        
        cell.initRandom();
        return cell;
    },

    createDefault: function (org, state, loc_col, loc_row, customCellID) {
        customCellID = customCellID || null;
        var cell = new this.type_map[state.name](org, loc_col, loc_row);
        cell.initDefault();
        if (state == Custom) {

        }
        return cell;
    },
}
BodyCellFactory.init();

module.exports = BodyCellFactory;
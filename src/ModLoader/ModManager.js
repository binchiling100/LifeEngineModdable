const Environment = require("../Environments/Environment");
const WorldEnvironment = require("../Environments/WorldEnvironment");

class ModManager {
    constructor(env) {
        this.env = env;
    }

    initialize() {
        alert("Calling basefunctions wont do anything!");
    }

    update() {
        alert("Calling basefunctions wont do anything!");
    }
}

module.export = ModManager;
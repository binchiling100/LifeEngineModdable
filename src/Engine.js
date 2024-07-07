const WorldEnvironment = require('./Environments/WorldEnvironment');
const ControlPanel = require('./Controllers/ControlPanel');
const OrganismEditor = require('./Environments/OrganismEditor');
const ColorScheme = require('./Rendering/ColorScheme');
const CustomCellManager = require('./ModLoader/Organism/CustomCellManager');

// If the simulation speed is below this value, a new interval will be created to handle ui rendering
// at a reasonable speed. If it is above, the simulation interval will be used to update the ui.
const min_render_speed = 60;

class Engine {
    constructor() {
        function nothing(org, loc_col, loc_row, env) {
            if (org.anatomy.is_mover && !Hyperparams.moversCanProduce)
                return;
            var env = org.env;
            var prob = Hyperparams.foodProdProb;
            var real_c = getRealCol();
            var real_r = getRealRow();
            console.log("nothing");
            if (Math.random() * 100 <= prob) {
                var loc = Hyperparams.growableNeighbors[Math.floor(Math.random() * Hyperparams.growableNeighbors.length)]
                var loc_c = loc[0];
                var loc_r = loc[1];
                var cell = env.grid_map.cellAt(real_c + loc_c, real_r + loc_r);
                if (cell != null && cell.state == CellStates.empty) {
                    env.changeCell(real_c + loc_c, real_r + loc_r, CellStates.food, null);
                    return;
                }
            }
        };

        function n0thing() {

        };
        this.fps = 60;
        this.env = new WorldEnvironment(5, new CustomCellManager());
        this.organism_editor = new OrganismEditor();
        this.controlpanel = new ControlPanel(this);
        this.colorscheme = new ColorScheme(this.env, this.organism_editor);
        this.colorscheme.loadColorScheme();
        this.env.OriginOfLife();
        this.env.cellManager.createCell(nothing, n0thing, n0thing, "#ff00ff", "customcell!");
        this.sim_last_update = Date.now();
        this.sim_delta_time = 0;

        this.ui_last_update = Date.now();
        this.ui_delta_time = 0;

        this.actual_fps = 0;
        this.running = false;
    }

    start(fps=60) {
        if (fps <= 0)
            fps = 1;
        this.fps = fps;
        this.sim_loop = setInterval(()=>{
            this.updateSimDeltaTime();
            this.environmentUpdate();
        }, 1000/fps);
        this.running = true;
        
        //this.env.CustomCellManager?.createCell(nothing, nothing, nothing);
        if (this.fps >= min_render_speed) {
            if (this.ui_loop != null) {
                clearInterval(this.ui_loop);
                this.ui_loop = null;
            }
        }
        else
            this.setUiLoop();

        
    }
    
    stop() {
        clearInterval(this.sim_loop);
        this.running = false;
        this.setUiLoop();
    }

    restart(fps) {
        clearInterval(this.sim_loop);
        this.start(fps);
    }

    setUiLoop() {
        if (!this.ui_loop) {
            this.ui_loop = setInterval(()=> {
                this.updateUIDeltaTime();
                this.necessaryUpdate();
            }, 1000/min_render_speed);
        }
    }

    updateSimDeltaTime() {
        this.sim_delta_time = Date.now() - this.sim_last_update;
        this.sim_last_update = Date.now();
        if (!this.ui_loop) // if the ui loop isn't running, use the sim delta time
            this.ui_delta_time = this.sim_delta_time;
    }

    updateUIDeltaTime() {
        this.ui_delta_time = Date.now() - this.ui_last_update;
        this.ui_last_update = Date.now();
    }

    environmentUpdate() {
        this.actual_fps = (1000/this.sim_delta_time);
        this.env.update(this.sim_delta_time);
        if(this.ui_loop == null) {
            this.necessaryUpdate();
        }
      
            
    }

    necessaryUpdate() {
        this.env.render();
        this.controlpanel.update(this.ui_delta_time);
        this.organism_editor.update();
    }

}

module.exports = Engine;

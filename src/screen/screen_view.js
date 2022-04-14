const Lib = require("raylib");
const { BorderlineController } = require("../controllers/borderline_controller");
const { PlayerController } = require("../controllers/player_controller");
const { screenHeight, screenWidth, fps } = require("../helpers/constant");
const { ObjectModel } = require("../models/object_model");

class ScreenView {
  #run = undefined;
  #player = undefined;
  #object = undefined;
  #borderObject = undefined;

  constructor() {
    this.#run = true;
    Lib.InitWindow(screenWidth, screenHeight, "Scrap to Hero");
    Lib.SetTargetFPS(fps);

    this.#player = new PlayerController();

    this.#object = new ObjectModel(Lib.GRAY);
    this.#object.createObject({ height: 200, width: 50, posX: 700, posY: 200 });

    this.#borderObject = new BorderlineController();
  }

  isRunning = () => {
    return this.#run && !Lib.WindowShouldClose();
  };

  // Render starts here
  render = () => {
    // action logic starts here
    if (Lib.CheckCollisionRecs(this.#player.shape_bound, this.#object.shape_bound)) this.#object.show = false; //Collision check

    this.#player.actionListener();

    // Drawing object
    Lib.BeginDrawing();
    Lib.ClearBackground(Lib.GetColor(0x052c46ff));
    this.#borderObject.constructObject();
    this.#object.objectState();
    this.#player.getState();
    // Lib.DrawText("Scrap to hero", 345, 100, 30, Lib.WHITE);
    Lib.EndDrawing();
  };

  unload = () => {};
}

module.exports.ScreenView = ScreenView;

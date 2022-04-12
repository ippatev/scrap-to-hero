const Lib = require("raylib");
const { PlayerController } = require("../controllers/player_controller");
const { screenHeight, screenWidth, fps } = require("../helpers/constant");
const { directionEnum } = require("../helpers/enums");
const { CharacterModel } = require("../models/character_model");
// const { CharacterModel } = require("../models/character_model");

class ScreenView {
  constructor() {
    this.run = true;
    Lib.InitWindow(screenWidth, screenHeight, "Ninjutsu Clash");
    Lib.SetTargetFPS(fps);
    this.player = new PlayerController();
  }

  // Game restart functionality
  restart = () => {};

  // Screen Runtime Checker
  isRunning = () => {
    return this.run && !Lib.WindowShouldClose();
  };

  // Game loop
  update = () => {
    // Logic starts here.
    this.player.actionListener();

    // Rendering graphics starts here.
    Lib.BeginDrawing();
    Lib.ClearBackground(Lib.GRAY);

    Lib.BeginMode2D(this.player.getCamera);
    Lib.DrawCircle(200, 200, 100, Lib.YELLOW);
    this.player.getState();
    Lib.EndMode2D();
    Lib.DrawText("Welcome to Ninjutsu Clashers", 220, 100, 30, Lib.WHITE);
    Lib.EndDrawing();
  };

  // Destroy load imports
  unload = () => {
    this.player.destroy();
  };
}

module.exports.ScreenView = ScreenView;

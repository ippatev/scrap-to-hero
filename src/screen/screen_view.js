const Lib = require("raylib");
const { PlayerController } = require("../controllers/player_controller");
const { screenHeight, screenWidth, fps } = require("../helpers/constant");
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
    Lib.ClearBackground(Lib.BLUE);
    Lib.DrawText("Welcome to Ninjutsu Clashers", 220, 180, 30, Lib.WHITE);
    this.player.getState;
    Lib.EndDrawing();
  };

  // Destroy load imports
  unload = () => {};
}

module.exports.ScreenView = ScreenView;

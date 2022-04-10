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

  restart = () => {};

  isRunning = () => {
    return this.run && !Lib.WindowShouldClose();
  };

  update = () => {
    this.player.actionListner();
    Lib.BeginDrawing();
    Lib.ClearBackground(Lib.BLUE);
    Lib.DrawText("Welcome to Ninjutsu Clashers", 220, 180, 30, Lib.WHITE);
    this.player.getState;
    Lib.EndDrawing();
  };

  unload = () => {};
}

module.exports.ScreenView = ScreenView;

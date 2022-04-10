const r = require("raylib");

class BeginningScreen {
  constructor() {
    this.run = true;
    this.screenWidth = 900;
    this.screenHeight = 600;
    r.InitWindow(this.screenWidth, this.screenHeight, "Ninjutsu Clash");
    r.SetTargetFPS(60);
  }

  restart = () => {};

  isRunning = () => {
    return this.run && !r.WindowShouldClose();
  };

  update = () => {
    r.BeginDrawing();
    r.ClearBackground(r.BLUE);
    r.DrawText(
      "Hello Ninja Clashers, Welcome to Ninjutsu Clashers",
      60,
      285,
      30,
      r.WHITE
    );
    r.EndDrawing();
  };
  unload = () => {};
}

module.exports.BeginningScreen = BeginningScreen;

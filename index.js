const { BeginningScreen } = require("./src/screen/beginning_screen");

const screen = new BeginningScreen();
while (screen.isRunning()) {
  screen.update();
}
screen.unload();

const { ScreenView } = require("./src/screen/screen_view");

const screen = new ScreenView();
while (screen.isRunning()) {
  screen.update();
}
screen.unload();

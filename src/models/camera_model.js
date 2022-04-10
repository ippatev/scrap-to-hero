const Lib = require("raylib");
const {
  playerWidth,
  playerHeight,
  screenWidth,
  screenHeight,
} = require("../helpers/constant");

// TODO: In development process

class CameraModel {
  constructor() {
    this.target = Lib.Vector2(
      playerWidth + playerWidth / 2,
      playerHeight + playerWidth / 2
    );
    this.offset = Vector2(screenWidth / 2, screenHeight / 2);
    this.rotation = 0;
    this.zoom = 0;
  }
}

module.exports.CameraModel = CameraModel;

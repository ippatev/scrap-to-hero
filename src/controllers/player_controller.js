const { CharacterModel } = require("../models/character_model");
const Lib = require("raylib");
const { directionEnum } = require("../helpers/enums");
const { CameraModel } = require("../models/camera_model");
const { screenWidth, screenHeight } = require("../helpers/constant");

class PlayerController {
  #camSnaphot = undefined;
  #setState = undefined;
  #x_axis = 0;
  #y_axis = 0;
  constructor() {
    // Initialize Character Model
    this.character = new CharacterModel();

    this.character.posY = 300;
    this.character.posX = 450;
    this.character.color = Lib.WHITE;
    this.character.frameSpeed = 20;
    this.character.viewBlock = false;

    this.#camSnaphot = new CameraModel();
    this.#camSnaphot.captureObject(this.character.posX, this.character.posY);
    this.#camSnaphot.setOffset(screenWidth / 2 - 82, screenHeight / 2 - 60);
  }

  get getCamera() {
    return this.#camSnaphot.getCamera;
  }

  getState = () => {
    if (this.#setState === directionEnum.right) {
      this.character.drawRunningState(directionEnum.right);
    }
    if (this.#setState === directionEnum.left) {
      this.character.drawRunningState(directionEnum.left);
    }
    if (this.#setState === directionEnum.idle) {
      this.character.drawIdleState();
    }
  };

  actionListener = () => {
    this.character.stateAnimation();
    this.#camSnaphot.zoomListener(Lib.GetMouseWheelMove() * 0.05);

    if (Lib.IsKeyDown(Lib.KEY_RIGHT)) {
      return this.#onKeyPressedAction(directionEnum.right);
    }

    if (Lib.IsKeyDown(Lib.KEY_LEFT)) {
      return this.#onKeyPressedAction(directionEnum.left);
    }

    this.#setState = directionEnum.idle;
  };

  #onKeyPressedAction = (key) => {
    if (key === directionEnum.right) {
      this.#setState = directionEnum.right;
      this.character.posX += 2;
      this.#camSnaphot.captureObject(this.character.posX, this.character.posY);
    }
    if (key === directionEnum.left) {
      this.#setState = directionEnum.left;
      this.character.posX -= 2;
      this.#camSnaphot.captureObject(this.character.posX, this.character.posY);
    }
  };

  destroy = () => {
    this.character.free();
  };
}

module.exports.PlayerController = PlayerController;

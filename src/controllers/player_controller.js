const { CharacterModel } = require("../models/character_model");
const Lib = require("raylib");
const { directionEnum } = require("../helpers/enums");

class PlayerController extends CharacterModel {
  #state = this.idleRender();

  constructor(width, height, x, y, color) {
    super(width, height, x, y, color);
  }

  get getState() {
    return this.#state;
  }

  actionListener = () => {
    if (Lib.IsKeyDown(Lib.KEY_LEFT)) {
      return this.#onKeyPressedAction(directionEnum.left);
    }

    if (Lib.IsKeyDown(Lib.KEY_RIGHT)) {
      return this.#onKeyPressedAction(directionEnum.right);
    }

    this.#state = this.idleRender();
  };

  #onKeyPressedAction = (key) => {
    if (key === directionEnum.left) {
      this.#state = this.runningRender(directionEnum.left);
      this.posX -= 2;
    }

    if (key === directionEnum.right) {
      this.#state = this.runningRender(directionEnum.right);
      this.posX += 2;
    }
  };
}

module.exports.PlayerController = PlayerController;

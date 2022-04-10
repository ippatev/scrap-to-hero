const { CharacterModel } = require("../models/character_model");
const Lib = require("raylib");

class PlayerController extends CharacterModel {
  #state = this.idleRender();

  constructor(width, height, x, y, color) {
    super(width, height, x, y, color);
  }

  get getState() {
    return this.#state;
  }

  actionListner = () => {
    if (Lib.IsKeyDown(Lib.KEY_RIGHT)) {
      this.#onKeyPressedAction("right");
    } else if (Lib.IsKeyDown(Lib.KEY_LEFT)) {
      this.#onKeyPressedAction("left");
    } else {
      this.#state = this.idleRender();
    }
  };

  #onKeyPressedAction = (type) => {
    if (type === "left") {
      this.#state = this.runningRender();
      this.posX -= 2;
    } else if (type === "right") {
      this.#state = this.runningRender();
      this.posX += 2;
    }
  };
}

module.exports.PlayerController = PlayerController;

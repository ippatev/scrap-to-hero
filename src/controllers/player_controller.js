const { CharacterModel } = require("../models/character_model");
const Lib = require("raylib");
const { directionEnum } = require("../helpers/enums");

class PlayerController {
  #state = undefined;

  constructor() {
    this.character = new CharacterModel();
    this.character.posY = 200;
    this.character.posX = 350;
  }

  get getState() {
    return this.#state;
  }

  destroy = () => {
    this.character.destroy();
  };

  actionListener = () => {
    this.character.frameRenderLogic();

    if (Lib.IsKeyDown(Lib.KEY_RIGHT)) {
      return this.#onKeyPressedAction(directionEnum.right);
    }

    if (Lib.IsKeyDown(Lib.KEY_LEFT)) {
      return this.#onKeyPressedAction(directionEnum.left);
    }

    this.#state = this.character.idleRender();
  };

  #onKeyPressedAction = (key) => {
    if (key === directionEnum.right) {
      this.#state = this.character.runningRender(directionEnum.right);
      this.character.posX += 2;
    }
    if (key === directionEnum.left) {
      this.#state = this.character.runningRender(directionEnum.left);
      this.character.posX -= 2;
    }
  };
}

module.exports.PlayerController = PlayerController;

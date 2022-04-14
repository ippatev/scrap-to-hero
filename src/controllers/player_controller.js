const { CharacterModel } = require("../models/character_model");
const Lib = require("raylib");
const { directionEnum } = require("../helpers/enums");

class PlayerController extends CharacterModel {
  #playerState = undefined;
  constructor() {
    super(40, 40, 12, 12);
    this.#playerState = directionEnum.idle;
  }

  getState = () => {
    if (this.#playerState === directionEnum.idle) {
      this.idleState();
    }

    if (this.#playerState === directionEnum.up) {
      this.runState();
    }
  };

  actionListener = () => {
    if (Lib.IsKeyDown(Lib.KEY_D)) {
      this.#playerState = directionEnum.up;
      return (this.posX += 3);
    }
    if (Lib.IsKeyDown(Lib.KEY_A)) {
      this.#playerState = directionEnum.up;
      return (this.posX -= 3);
    }
    if (Lib.IsKeyDown(Lib.KEY_W)) {
      this.#playerState = directionEnum.up;
      return (this.posY -= 3);
    }
    if (Lib.IsKeyDown(Lib.KEY_S)) {
      this.#playerState = directionEnum.up;
      return (this.posY += 3);
    }
    this.#playerState = directionEnum.idle;
  };
}

module.exports.PlayerController = PlayerController;

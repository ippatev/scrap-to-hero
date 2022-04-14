const Lib = require("raylib");

class CharacterModel {
  #area = {
    height: 0,
    width: 0,
  };
  #rec_container = undefined;
  constructor(height = 0, width = 0, posX = 0, posY = 0) {
    this.posX = posX;
    this.posY = posY;
    this.#area.height = height;
    this.#area.width = width;
    this.#rec_container = Lib.Rectangle(this.posX, this.posY, this.#area.width, this.#area.height);
  }

  get shape_bound() {
    return this.#rec_container;
  }

  idleState = () => {
    this.#rec_container = Lib.Rectangle(this.posX, this.posY, this.#area.width, this.#area.height);
    Lib.DrawRectangleRec(this.#rec_container, Lib.RED);
  };

  runState = () => {
    this.#rec_container = Lib.Rectangle(this.posX, this.posY, this.#area.width, this.#area.height);
    Lib.DrawRectangleRec(this.#rec_container, Lib.GREEN);
  };

  init = () => {};

  free = () => {};
}

module.exports.CharacterModel = CharacterModel;

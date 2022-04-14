const { ObjectModel } = require("../models/object_model");
const Lib = require("raylib");
const { objectTypeEnum } = require("../helpers/enums");
const { screenHeight, screenWidth } = require("../helpers/constant");

class BorderlineController {
  #LEFT = undefined;
  #RIGHT = undefined;
  #UP = undefined;
  #DOWN = undefined;
  constructor() {
    this.#LEFT = new ObjectModel(Lib.GRAY, objectTypeEnum.rect);
    this.#RIGHT = new ObjectModel(Lib.GRAY, objectTypeEnum.rect);
    this.#UP = new ObjectModel(Lib.GRAY, objectTypeEnum.rect);
    this.#DOWN = new ObjectModel(Lib.GRAY, objectTypeEnum.rect);
    this.#LEFT.createObject({ height: screenHeight, width: 20, posX: -10, posY: 0 });
    this.#RIGHT.createObject({ height: screenHeight, width: 20, posX: screenWidth - 10, posY: 0 });
    this.#UP.createObject({ height: 20, width: screenWidth, posX: 0, posY: -10 });
    this.#DOWN.createObject({ height: 20, width: screenWidth, posX: 0, posY: screenHeight - 10 });
  }

  constructObject = () => {
    this.#LEFT.objectState();
    this.#RIGHT.objectState();
    this.#UP.objectState();
    this.#DOWN.objectState();
  };
}

module.exports.BorderlineController = BorderlineController;

const { objectTypeEnum } = require("../helpers/enums");
const Lib = require("raylib");

class ObjectModel {
  #object = undefined;
  #objectType = undefined;
  #objectColor = undefined;
  #collisionHidden = undefined;

  constructor(color = Lib.BLUE, type) {
    this.#objectColor = color;
    if (type === objectTypeEnum.circle) return (this.#objectType = type);
    this.#objectType = objectTypeEnum.rect;
  }

  get shape_bound() {
    return this.#object;
  }

  set collideShow(value = true) {
    return (this.#collisionHidden = value);
  }

  objectState = () => {
    if (this.#object !== undefined && this.#objectType === objectTypeEnum.rect) {
      if (this.#collisionHidden) return null;
      Lib.DrawRectangleRec(this.#object, this.#objectColor);
    }

    if (this.#object !== undefined && this.#objectType === objectTypeEnum.circle) {
      if (this.#collisionHidden) return null;
      Lib.DrawCircle(this.#object.vector.x, this.#object.vector.y, this.#object.radius, this.#objectColor);
    }
  };

  createObject = (object_detail) => {
    const { width, height, posX, posY, radius } = object_detail;

    if (this.#objectType === objectTypeEnum.rect) {
      this.#object = Lib.Rectangle(posX, posY, width, height);
      return null;
    }

    if (this.#objectType === objectTypeEnum.circle) {
      this.#object = { vector: Lib.Vector2(posX, posY), radius: radius };
      return null;
    }
  };

  init = () => {};
  free = () => {};
}

module.exports.ObjectModel = ObjectModel;

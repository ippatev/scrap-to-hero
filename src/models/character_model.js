const Lib = require("raylib");
const {
  playerHeight,
  playerWidth,
  screenHeight,
  screenWidth,
} = require("../helpers/constant");
const { directionEnum } = require("../helpers/enums");

class CharacterModel {
  /**
   * Charactert Model Constructor
   *
   * @param {float} width - Wedth of character
   * @param {float} height - height of character
   * @param {int} x - x-axis position of character
   * @param {int} y - y-axis position of character
   * @param {Raylib.Color} color - Raylib Color Property/Method
   */
  constructor(
    width = playerWidth,
    height = playerHeight,
    x = screenWidth / 2 - playerWidth / 2,
    y = screenHeight / 2 - playerHeight / 2,
    color = Lib.ORANGE
  ) {
    this.height = height;
    this.width = width;
    this.posX = x;
    this.posY = y;
    this.color = color;
  }

  /**
   * @method idleRender() - Call to render idle state of the character
   */
  idleRender = () => {
    Lib.DrawRectangle(
      this.posX,
      this.posY,
      this.width,
      this.height,
      this.color
    );
  };

  /**
   * @method runningRender() - Call to render running state of the character
   * @param { string } direction - Indication of direction; use directionEnum keys
   */
  runningRender = (direction = null) => {
    if (direction === directionEnum.left) {
      Lib.DrawRectangle(this.posX, this.posY, this.width, this.height, Lib.RED);
    }

    if (direction === directionEnum.right) {
      Lib.DrawRectangle(
        this.posX,
        this.posY,
        this.width,
        this.height,
        Lib.GREEN
      );
    }
  };

  /**
   * @method initializeChar() - Call to reinitialized character
   * @param {float} width - Wedth of character
   * @param {float} height - height of character
   * @param {int} x - x-axis position of character
   * @param {int} y - y-axis position of character
   * @param {Raylib.Color} color - Raylib Color Property/Method
   */
  initializeChar = (width, height, x, y, color) => {
    this.height = height ?? this.height;
    this.width = width ?? this.width;
    this.posX = x ?? this.posX;
    this.posY = y ?? this.posY;
    this.color = color ?? this.color;
  };
}

module.exports.CharacterModel = CharacterModel;

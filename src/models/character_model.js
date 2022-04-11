const Lib = require("raylib");
const { directionEnum } = require("../helpers/enums");
const { public_path } = require("../helpers/functions");

class CharacterModel {
  #runningInfo = {
    texture: undefined,
    frameRec: undefined,
    currentFrame: 0,
    numFrame: 0,
    frameSpeed: 0,
    counter: 0,
    position: undefined,
  };

  #idleInfo = {
    texture: undefined,
    frameRec: undefined,
    currentFrame: 0,
    numFrame: 0,
    frameSpeed: 0,
    counter: 0,
    position: undefined,
  };

  #frameLocation = undefined;
  /**
   * Charactert Model Constructor
   *
   * @param {float} width - Width of character
   * @param {float} height - height of character
   * @param {int} posX - x-axis position of character
   * @param {int} posY - y-axis position of character
   * @param {string} idle_path - path of idle image
   * @param {string} run_path - path of running image
   * @param {int} frameX - x-axis position of image
   * @param {int} frameY - y-axis position of image
   * @param {int} frameSpeed - set frames per second
   * @param {int} frameCount - number of frames present in paths
   * @param {Raylib.Color} color - Raylib Color Property/Method
   */
  constructor() {
    this.width = 160;
    this.height = 283;
    this.posX = 0;
    this.posY = 0;
    this.idle_path = null;
    this.run_path = null;
    this.frameX = 175;
    this.frameY = 120;
    this.frameSpeed = 20;
    this.frameCount = 20;
    this.color = Lib.Color(0, 0, 0, 0);

    this.#frameLocation = this.frameCount * this.frameX;

    // INIT IDLE STATE
    this.#idleInfo.numFrame = this.frameCount;
    this.#idleInfo.frameSpeed = this.frameSpeed;
    this.#idleInfo.texture = Lib.LoadTexture(
      this.idle_path ?? public_path("assets/player/idle.png")
    );
    this.#idleInfo.frameRec = Lib.Rectangle(
      this.frameX,
      this.frameY,
      this.width,
      this.height
    );
    this.#idleInfo.position = Lib.Vector2(this.posX, this.posY);

    // INIT RUNNING STATE
    this.#runningInfo.numFrame = this.frameCount;
    this.#runningInfo.frameSpeed = this.frameSpeed;
    this.#runningInfo.texture = Lib.LoadTexture(
      this.run_path ?? public_path("assets/player/walking.png")
    );
    this.#runningInfo.frameRec = Lib.Rectangle(
      this.frameX,
      this.frameY,
      this.width,
      this.height
    );
    this.#runningInfo.position = Lib.Vector2(this.posX, this.posY);
  }

  frameRenderLogic = () => {
    this.#runningInfo.counter++;

    if (this.#runningInfo.counter >= 60 / this.#runningInfo.frameSpeed) {
      this.#runningInfo.counter = 0;
      this.#runningInfo.currentFrame++;

      if (this.#runningInfo.currentFrame > this.frameCount)
        this.#runningInfo.currentFrame = 0;

      this.#runningInfo.frameRec.x =
        (this.#runningInfo.currentFrame * this.#runningInfo.texture.width +
          this.#frameLocation) /
        this.frameCount;
    }

    this.#idleInfo.counter++;

    if (this.#idleInfo.counter >= 60 / this.#idleInfo.frameSpeed) {
      this.#idleInfo.counter = 0;
      this.#idleInfo.currentFrame++;

      if (this.#idleInfo.currentFrame > this.frameCount)
        this.#idleInfo.currentFrame = 0;

      this.#idleInfo.frameRec.x = [
        (this.#idleInfo.currentFrame * this.#idleInfo.texture.width +
          this.#frameLocation) /
          this.frameCount,
      ];
    }
  };

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
    Lib.DrawTextureRec(
      this.#idleInfo.texture,
      this.#idleInfo.frameRec,
      Lib.Vector2(this.posX, this.posY),
      Lib.WHITE
    );
  };

  /**
   * @method runningRender() - Call to render running state of the character
   * @param { string } direction - Indication of direction; use directionEnum keys
   */
  runningRender = (direction = null) => {
    if (direction === directionEnum.left) {
      Lib.DrawRectangle(
        this.posX,
        this.posY,
        this.width,
        this.height,
        this.color
      );
      Lib.DrawTextureRec(
        this.#runningInfo.texture,
        this.#runningInfo.frameRec,
        Lib.Vector2(this.posX, this.posY),
        Lib.WHITE
      );
    }

    if (direction === directionEnum.right) {
      Lib.DrawRectangle(
        this.posX,
        this.posY,
        this.width,
        this.height,
        this.color
      );
      Lib.DrawTextureRec(
        this.#runningInfo.texture,
        this.#runningInfo.frameRec,
        Lib.Vector2(this.posX, this.posY),
        Lib.WHITE
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

  destroy = () => {
    Lib.UnloadTexture(this.#runningInfo.texture);
    Lib.UnloadTexture(this.#idleInfo.texture);
  };
}

module.exports.CharacterModel = CharacterModel;

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
  #isRight = true;

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
   * @param {boolean} viewBlock - View Frame/Block character guide
   */
  constructor(
    width = 160,
    height = 283,
    posX = 0,
    posY = 0,
    idle_path = null,
    run_path = null,
    frameX = 175,
    frameY = 120,
    frameSpeed = 60,
    frameCount = 20,
    color = Lib.Color(0, 0, 0, 0),
    viewBlock = false
  ) {
    this.width = width;
    this.height = height;
    this.posX = posX;
    this.posY = posY;
    this.idle_path = idle_path;
    this.run_path = run_path;
    this.frameX = frameX;
    this.frameY = frameY;
    this.frameCount = frameCount;
    this.viewBlock = viewBlock;
    this.color = color;

    // Updated location of character upon changing frame
    this.#frameLocation = this.frameCount * this.frameX;

    // INIT IDLE STATE
    this.#idleInfo.numFrame = this.frameCount;
    this.#idleInfo.frameSpeed = frameSpeed;
    this.#idleInfo.texture = Lib.LoadTexture(this.idle_path ?? public_path("assets/player/idle.png"));
    this.#idleInfo.frameRec = Lib.Rectangle(this.frameX, this.frameY, this.width, this.height);
    this.#idleInfo.position = Lib.Vector2(this.posX, this.posY);

    // INIT RUNNING STATE
    this.#runningInfo.numFrame = this.frameCount;
    this.#runningInfo.frameSpeed = frameSpeed;
    this.#runningInfo.texture = Lib.LoadTexture(this.run_path ?? public_path("assets/player/walking.png"));
    this.#runningInfo.frameRec = Lib.Rectangle(this.frameX, this.frameY, this.width, this.height);
    this.#runningInfo.position = Lib.Vector2(this.posX, this.posY);
  }

  set frameSpeed(item) {
    this.#idleInfo.frameSpeed = item;
    this.#runningInfo.frameSpeed = item;
  }

  stateAnimation = () => {
    this.#runningInfo.counter++;

    if (this.#runningInfo.counter >= 60 / this.#runningInfo.frameSpeed) {
      this.#runningInfo.counter = 0;
      this.#runningInfo.currentFrame++;

      if (this.#runningInfo.currentFrame > this.frameCount) this.#runningInfo.currentFrame = 0;

      this.#runningInfo.frameRec.x =
        (this.#runningInfo.currentFrame * this.#runningInfo.texture.width + this.#frameLocation) / this.frameCount;
    }

    this.#idleInfo.counter++;

    if (this.#idleInfo.counter >= 60 / this.#idleInfo.frameSpeed) {
      this.#idleInfo.counter = 0;
      this.#idleInfo.currentFrame++;

      if (this.#idleInfo.currentFrame > this.frameCount) this.#idleInfo.currentFrame = 0;

      this.#idleInfo.frameRec.x =
        (this.#idleInfo.currentFrame * this.#idleInfo.texture.width + this.#frameLocation) / this.frameCount;
    }
  };

  /**
   * @method idleRender() - Call to render idle state of the character
   */
  drawIdleState = () => {
    this.#characterBlockGuide();
    Lib.DrawTextureRec(this.#idleInfo.texture, this.#idleInfo.frameRec, Lib.Vector2(this.posX, this.posY), Lib.WHITE);
  };

  /**
   * @method runningRender() - Call to render running state of the character
   * @param { string } direction - Indication of direction; use directionEnum keys
   */
  drawRunningState = (direction = null) => {
    if (direction === directionEnum.left) {
      this.#directionSetter(direction);
      this.#characterBlockGuide();
      Lib.DrawTextureRec(
        this.#runningInfo.texture,
        this.#runningInfo.frameRec,
        Lib.Vector2(this.posX, this.posY),
        Lib.WHITE
      );
    }

    if (direction === directionEnum.right) {
      this.#directionSetter(direction);
      this.#characterBlockGuide();
      Lib.DrawTextureRec(
        this.#runningInfo.texture,
        this.#runningInfo.frameRec,
        Lib.Vector2(this.posX, this.posY),
        Lib.WHITE
      );
    }
  };

  /**
   * @method #directionSetter() - To set character face to specific direction
   * @param {string} direction - Indication of direction; use directionEnum keys
   */
  #directionSetter = (direction) => {
    const lower = this.width < 0;
    const higher = this.width > 0;
    if (direction === directionEnum.right) {
      if (lower) {
        this.width = this.width * -1;
        this.#isRight = true;
        const newRect = Lib.Rectangle(this.frameX, this.frameY, this.width, this.height);
        this.#runningInfo.frameRec = newRect;
        this.#idleInfo.frameRec = newRect;
      }
    }

    if (direction === directionEnum.left) {
      if (higher) {
        this.width = this.width * -1;
        this.#isRight = false;
        const newRect = Lib.Rectangle(this.frameX, this.frameY, this.width, this.height);
        this.#runningInfo.frameRec = newRect;
        this.#idleInfo.frameRec = newRect;
      }
    }
  };

  /**
   * @method #characterBlockGuide() - To set character frame guide
   */
  #characterBlockGuide = () => {
    if (this.#isRight === false) {
      Lib.DrawRectangle(
        this.posX,
        this.posY,
        this.width * -1,
        this.height,
        this.viewBlock ? Lib.WHITE : Lib.Color(0, 0, 0, 0)
      );
    }

    if (this.#isRight === true) {
      Lib.DrawRectangle(
        this.posX,
        this.posY,
        this.width,
        this.height,
        this.viewBlock ? Lib.WHITE : Lib.Color(0, 0, 0, 0)
      );
    }
  };

  free = () => {
    Lib.UnloadTexture(this.#runningInfo.texture);
    Lib.UnloadTexture(this.#idleInfo.texture);
    this.#runningInfo = undefined;
    this.#idleInfo = undefined;
  };
}

module.exports.CharacterModel = CharacterModel;

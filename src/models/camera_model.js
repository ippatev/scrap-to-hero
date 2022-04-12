const Lib = require("raylib");
const { playerWidth, playerHeight, screenWidth, screenHeight } = require("../helpers/constant");

// TODO: In development process

class CameraModel {
  #camera = Lib.Camera2D();
  /**
   * Camera Model - adds camera to a target
   * @param {object} target - An object that accepts value of ints {tarX, tarY}
   * @param {object} offset - An object that accepts value of ints {offX, offY}
   * @param {float} rotation - Initial rotation
   * @param {float} zoom - Initial zoom accept int
   */
  constructor(target = { tarX: 0, tarY: 0 }, offset = { offX: 0, offY: 0 }, rotation = 0, zoom = 0.5) {
    const { tarX, tarY } = target;
    const { offX, offY } = offset;

    this.#camera = Lib.Camera2D(Lib.Vector2(tarX, tarY), Lib.Vector2(offX, offY), rotation, zoom);
  }

  get getCamera() {
    return this.#camera;
  }

  /**
   * @method captureObject() - Call to assign camera target
   * @param {int} posX
   * @param {int} posY
   */
  captureObject = (posX, posY) => {
    this.#camera.target = Lib.Vector2(posX, posY);
  };

  /**
   * @method setOffset() - Call to assign camera offset
   * @param {int} posX
   * @param {int} posY
   */
  setOffset = (posX, posY) => {
    this.#camera.offset = Lib.Vector2(posX, posY);
  };

  /**
   * @method zoomListener() - Call to set zoom preference
   * @param {float} value - value added to the current zoom state
   */
  zoomListener = (value) => {
    this.#camera.zoom += value;
    if (this.#camera.zoom > 1.5) this.#camera.zoom = 1.5;
    if (this.#camera.zoom < 0.7) this.#camera.zoom = 0.7;
  };

  /**
   * @method rotationListener() - Call to set camera angle preference
   * @param {float} value - value added to the current rotation state
   */
  rotationListener = (value) => {
    this.#camera.rotation += value;
  };
}

module.exports.CameraModel = CameraModel;

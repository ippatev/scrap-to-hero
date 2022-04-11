const fs = require("fs");

const [, , ...args] = process.argv;

const executeCommand = () => {
  // check if missing command
  if (args[0] == null)
    return console.log("\x1b[41m%s\x1b[0m", " Missing Command ");

  // check if null controller name
  if (args[1] == null)
    return console.log("\x1b[41m%s\x1b[0m", " Missing Controller Name ");

  if (args[0] === "character") return makeCharacter(args[1]);

  // return invalid command
  return console.log("\x1b[41m%s\x1b[0m", " Invalid command: " + args[0] + " ");
};

/**
 * ====================================
 *  CONTROLLER MAKER SECTION
 * ====================================
 */

const makeCharacter = (title) => {
  const TITLE = title.charAt(0).toUpperCase() + title.slice(1) + "Controller";

  const FILENAME =
    "./src/controllers/" + title.toLowerCase() + "_controller.js";

  const TEXT = `const { CharacterModel } = require("../models/character_model");\nconst Lib = require("raylib");\n\nclass ${TITLE} {\n\t#state = undefined;\n\n\tconstructor() {\n\t\tthis.character = new CharacterModel();\n\t}\n\n\tget getState() {\n\t\treturn this.#state;\n\t}\n}\n\nmodule.exports.${TITLE} = ${TITLE};`;

  if (fs.existsSync(FILENAME))
    return console.log("\x1b[41m%s\x1b[0m", `${TITLE} already exsist`);
  fs.writeFile(FILENAME, TEXT, (err) => {
    if (err)
      return console.log("\x1b[41m%s\x1b[0m", `Failed to create controller`);
    console.log(TITLE + " was created");
  });
};

/**
 * ====================================
 *  COMMAND EXECUTION
 * ====================================
 */
executeCommand();

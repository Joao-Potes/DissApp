// ./Controllers/compilerController.js
const fs = require("fs");
const { exec } = require("child_process");
const crypto = require("crypto");
const path = require("path");
require("dotenv").config();

exports.compile = async (req, res) => {
  try {
    const language = req.body.language.toLowerCase();
    const code = req.body.code;

    const random = crypto.randomBytes(4).toString("hex");
    const filePath = `temp/${random}.${language}`;

    // Write the code to a file
    fs.writeFile(filePath, code, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("An error occurred while writing the file.");
        return;
      }

      let command;
      switch (language) {
        case "python":
          // Execute Python code
          command = `${process.env.COMPILER_DIR} ${filePath}`;
          break;
        case "node":
          // Write the code to a JavaScript file
          fs.writeFile(`${filePath}.js`, code, (err) => {
            if (err) {
              console.error(err);
              res.status(500).send("An error occurred while writing the file.");
              return;
            }
          });
          // Execute JavaScript code
          command = `node ${filePath}.js`;
          break;
        
        default:
          return res.status(400).send("Invalid language specified");
      }

      // Execute the command
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Exec error: ${error}`);
          return res.status(500).send(error);
        }
        res.send(stdout ? stdout : stderr);

        // Delete the temporary files
        const directory = "temp";
        fs.readdir(directory, (err, files) => {
          if (err) throw err;

          for (const file of files) {
            fs.unlink(path.join(directory, file), (err) => {
              if (err) throw err;
            });
          }
        });
      });
    });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).send(error);
  }
};

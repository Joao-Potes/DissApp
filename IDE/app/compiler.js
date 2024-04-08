const express = require("express");
const app = express();
const fs = require("fs");
const { exec } = require("child_process");
const crypto = require("crypto");
const path = require("path");

app.use(express.json());

app.use(express.static(path.join(__dirname, "../ui")));
app.use("/app", express.static(path.join(__dirname)));
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "..\\ui\\ide.html"))
);

app.post("/compilecode", (req, res) => {
  const language = req.body.language.toLowerCase();
  const code = req.body.code;

  const random = crypto.randomBytes(4).toString("hex");
  const filePath = `temp/${random}.${language}`;

  fs.writeFile(filePath, code, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("An error occurred while writing the file.");
      return;
    }

    let command;
    switch (language) {
      case "python":
        command = `C:\\Users\\J\\AppData\\Local\\Microsoft\\WindowsApps\\python.exe ${filePath}`;
        break;
      case "node":
        fs.writeFile(`${filePath}.js`, code, (err) => {
          if (err) {
            console.error(err);
            res.status(500).send("An error occurred while writing the file.");
            return;
          }
        });
        command = `node ${filePath}.js`;
        break;
      /* case "c":
        const outputExeC = `${random}.exe`;
        exec(`C:\\MinGW\\bin\\gcc.exe ${filePath} -o ${outputExeC}`, (error) => {
          if (error) {
            console.error(`GCC compile error: ${error}`);
          }
        });
        command = `${__dirname}/${outputExeC}`;
        break;
      case "cpp":
        const outputExeCpp = `${random}.exe`;
        exec(`g++ ${filePath} -o ${outputExeCpp}`, (error) => {
          if (error) {
            console.error(`G++ compile error: ${error}`);
          }
        }); 
        command = `${__dirname}/${outputExeCpp}`;
        break;*/
      default:
        return res.status(400).send("Invalid language specified");
    }

    exec(command, (error, stdout, stderr) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file: ${err}`);
        } else {
          console.log(`Deleted file: ${filePath}`);
        }
      });
      if (error) {
        console.error(`Exec error: ${error}`);
        return res.status(500).send(error);
      }
      res.send(stdout ? stdout : stderr);
    });
  });
});

const port = 3000; // you can choose any port number
app.listen(port, () =>
  console.log(`Server running on port http://localhost:${port}`)
);

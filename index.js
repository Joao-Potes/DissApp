const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const compiler = require("compilex");

const app = express();
const port = 8080;

app.use(bodyParser());
const options = { stats: true };
compiler.init(options);

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.post("/compilecode", function (req, res) {
  const code = req.body.code;
  const input = req.body.input;
  const lang = req.body.lang;
  const inputRadio = req.body.inputRadio;
  if (lang === "C") {
    if (inputRadio === "true") {
      const envData = {
        OS: "windows",
        cmd: "g++",
        options: { timeout: 10000 },
      };
      compiler.compileCPPWithInput(envData, code, input, function (data) {
        if (data.error) {
          res.send(data.error);
        } else {
          res.send(data.output);
        }
      });
    } else {
      const envData = {
        OS: "windows",
        cmd: "g++",
        options: { timeout: 10000 },
      };
      compiler.compileCPP(envData, code, function (data) {
        res.send(data);
      });
    }
  }
  if (lang === "Java") {
    if (inputRadio === "true") {
      const envData = { OS: "windows" };
      compiler.compileJavaWithInput(envData, code, input, function (data) {
        if (data.error) {
          res.send(data.error);
        } else {
          res.send(data.output);
        }
      });
    } else {
      const envData = { OS: "windows" };
      compiler.compileJavaWithInput(envData, code, function (data) {
        res.send(data);
      });
    }
  }

  if (lang === "Python") {
    if (inputRadio === "true") {
      const envData = { OS: "windows" };
      compiler.compilePythonWithInput(envData, code, input, function (data) {
        if (data.error) {
          res.send(data.error);
        } else {
          res.send(data.output);
        }
      });
    } else {
      const envData = { OS: "windows" };
      compiler.compilePython(envData, code, function (data) {
        res.send(data);
      });
    }
  }
});

app.get("/fullStat", function (req, res) {
  compiler.fullStat(function (data) {
    res.send(data);
  });
});

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
); // eslint-disable-line no-console

compiler.flush(function () {
  console.log("All temporary files flushed !");
});

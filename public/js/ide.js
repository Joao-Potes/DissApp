let editor;

window.onload = function () {
  editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/c_cpp");
};

function changeLanguage() {
  let language = $("#languages").val();

  if (language == "c" || language == "cpp")
    editor.session.setMode("ace/mode/c_cpp");
  else if (language == "java") editor.session.setMode("ace/mode/java");
  else if (language == "python") editor.session.setMode("ace/mode/python");
  else if (language == "node") editor.session.setMode("ace/mode/javascript");
}

function executeCode() {
  fetch("/compilecode", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      language: $("#languages").val(),
      code: editor.getSession().getValue(),
    }),
  })
    .then((response) => response.text())
    .then((data) => {
      $(".output").text(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

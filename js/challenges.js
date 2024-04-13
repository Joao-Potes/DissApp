let codeBox1, codeBox2;

window.onload = function () {
  codeBox1 = document.getElementById("code-box-1");
  document
    .getElementById("reveal-button-1")
    .addEventListener("click", function () {
      toggleCodeVisibility("code-box-1");
    });

  codeBox2 = document.getElementById("code-box-2");
  document
    .getElementById("reveal-button-2")
    .addEventListener("click", function () {
      toggleCodeVisibility("code-box-2");
    });

  codeBox3 = document.getElementById("code-box-3");

  document
    .getElementById("reveal-button-3")
    .addEventListener("click", function () {
      toggleCodeVisibility("code-box-3");
    });
};

function toggleCodeVisibility(id) {
  let codeBox = document.getElementById(id);
  if (codeBox.style.display === "none") {
    codeBox.style.display = "block";
  } else {
    codeBox.style.display = "none";
  }
}

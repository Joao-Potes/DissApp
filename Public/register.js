document.getElementById("register").addEventListener("click", async (e) => {
  e.preventDefault();

  const user = {
    name: document.getElementById("username").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

/*   const privacy = document.getElementById("privacy").checked;
 */
  if (!user.name) return alert("Please enter your name");
  if (!user.email) return alert("Please enter your email");
  if (!user.password) return alert("Please enter a password");

/*   if (!privacy) return alert("Please accept the privacy policy");
 */
  try {
    const response = await fetch("/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    await responseHandler(response);
  } catch (e) {
    alert(`Error: ${e}`);
  }
});

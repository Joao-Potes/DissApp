document.addEventListener('DOMContentLoaded', function () {
    Logincheck();
});

async function Logincheck() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`/user/getUser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.status !== 200) {
      return alert(data.message);
    }
    if (data.admin === true) {
      const getUsersElement = document.getElementById("get_users");
      const getPoisElement = document.getElementById("get_pois");

      getUsersElement.hidden = false;
      getPoisElement.hidden = false;

      userId = data._id;
    }
  } catch (error) {
    console.error(error);
    alert("Failed to fetch User details");
  }
}

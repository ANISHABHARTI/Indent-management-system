document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("loggedInUser");
  const user = JSON.parse(localStorage.getItem(username));

  if (!user) {
    alert("User not logged in!");
    window.location.href = "login.html";
    return;
  }

  document.getElementById("userDetails").innerHTML = `
    <p><strong>Name:</strong> ${user.name}</p>
    <p><strong>Department:</strong> ${user.department}</p>
    <p><strong>Designation:</strong> ${user.designation}</p>
  `;
});

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const user = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        department: document.getElementById("department").value,
        designation: document.getElementById("designation").value,
        employeeId: document.getElementById("employeeId").value,
        sex: document.getElementById("sex").value,
      };

      let users = JSON.parse(localStorage.getItem("users") || "[]");

      const userExists = users.some(u => u.username === user.username);
      if (userExists) {
        alert("Username already exists. Please choose another.");
        return;
      }

      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));

      alert("Registered successfully!");
      window.location.href = "login.html";
    });
  }
});

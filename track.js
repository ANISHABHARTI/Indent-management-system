document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const loggedInUser = localStorage.getItem("loggedInUser");
  const trackTableBody = document.querySelector("#trackTable tbody");

  async function loadIndents() {
    try {
      const response = await axios.get("http://localhost:8080/api/indents", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const indents = response.data;

      const userIndents = indents.filter(indent => indent.user === loggedInUser);

      trackTableBody.innerHTML = "";

      userIndents.forEach(indent => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${indent.item}</td>
          <td>${indent.quantity}</td>
          <td>${indent.price}</td>
          <td>${indent.total}</td>
          <td>${indent.status.FLA}</td>
          <td>${indent.status.SLA}</td>
          <td>${indent.status.Store}</td>
          <td>${indent.status.Finance}</td>
          <td>${indent.status.Purchase}</td>
        `;
        trackTableBody.appendChild(row);
      });
    } catch (error) {
      console.error("Failed to load indents:", error.message);
    }
  }

  loadIndents();
});

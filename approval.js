document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");
  const approvalTableBody = document.querySelector("#approvalTable tbody");

  async function loadIndents() {
    try {
      const response = await axios.get("http://localhost:8080/api/indents", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const indents = response.data;
      const pendingIndents = indents.filter(indent => indent.status[role] === "Pending");

      approvalTableBody.innerHTML = "";

      pendingIndents.forEach(indent => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${indent.item}</td>
          <td>${indent.quantity}</td>
          <td>${indent.price}</td>
          <td>${indent.total}</td>
          <td>
            <button onclick="updateStatus('${indent.id}', 'Approved')">Approve</button>
            <button onclick="updateStatus('${indent.id}', 'Rejected')">Reject</button>
          </td>
        `;
        approvalTableBody.appendChild(row);
      });
    } catch (error) {
      console.error("Failed to load indents:", error.message);
    }
  }

  window.updateStatus = async (id, decision) => {
    try {
      const comment = prompt("Add a comment (optional):") || "";

      const updatePayload = {
        id,
        role,
        decision,
        comment
      };

      const response = await axios.put("http://localhost:8080/api/indents/update-status", updatePayload, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        alert(`Indent ${decision}`);
        loadIndents();
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  loadIndents();
});

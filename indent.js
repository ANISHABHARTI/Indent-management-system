document.addEventListener("DOMContentLoaded", () => {
  const indentForm = document.getElementById("indentForm");
  const totalField = document.getElementById("total");
  const quantityField = document.getElementById("quantity");
  const priceField = document.getElementById("price");

  // Real-time total price calculation
  function updateTotal() {
    const quantity = parseFloat(quantityField.value) || 0;
    const price = parseFloat(priceField.value) || 0;
    const total = quantity * price;
    totalField.value = total.toFixed(2);
  }

  quantityField.addEventListener("input", updateTotal);
  priceField.addEventListener("input", updateTotal);

  indentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const item_name = document.getElementById("item").value;
    const description = document.getElementById("description").value;
    const quantity = parseFloat(quantityField.value);
    const per_piece_cost = parseFloat(priceField.value);
    const total = parseFloat(totalField.value);
    const fla_id = parseInt(document.getElementById("fla_id").value);
    const requested_by_id = parseInt(document.getElementById("requested_by_id").value);
    const sla_id = parseInt(document.getElementById("sla_id").value);
    const token = localStorage.getItem("token");

    if (!item_name || isNaN(quantity) || isNaN(per_piece_cost) || !description || isNaN(fla_id) || isNaN(requested_by_id) || isNaN(sla_id)) {
      alert("Please fill out all fields correctly.");
      return;
    }

    const indentData = {
      id: Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString(),
      description,
      item_name,
      per_piece_cost,
      quantity,
      status: "Pending",
      fla_id,
      requested_by_id,
      sla_id
    };

    try {
      const response = await axios.post("http://localhost:8080/api/indents", indentData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (response.status === 201 || response.status === 200) {
        alert("Indent submitted successfully!");
        window.location.href = "track.html";
      } else {
        alert("Error submitting indent.");
      }
    } catch (error) {
      console.error("Submission failed:", error.message);
      alert("Server error. Try again.");
    }
  });
});

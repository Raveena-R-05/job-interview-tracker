document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("candidateForm");
  const tableBody = document.getElementById("candidateTableBody");
  const emptyState = document.getElementById("emptyState");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const pageInfo = document.getElementById("pageInfo");
  const pagination = document.getElementById("pagination");

  let currentPage = 1;
  let totalPages = 1;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const candidate = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      position: document.getElementById("position").value,
      status: document.getElementById("status").value
    };

    try {
      await fetch("/api/candidates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(candidate)
      });

      alert("✅ Candidate Added Successfully!");
      form.reset();
      currentPage = 1;
      loadCandidates(currentPage);
    } catch (error) {
      alert("❌ Error adding candidate. Please try again.");
      console.error(error);
    }
  });

  async function loadCandidates(page) {
    try {
      const res = await fetch(`/api/candidates?page=${page}`);
      const data = await res.json();

      tableBody.innerHTML = "";

      if (data.totalCandidates === 0) {
        emptyState.style.display = "block";
        pagination.style.display = "none";
        return;
      }

      emptyState.style.display = "none";
      pagination.style.display = "flex";

      currentPage = data.currentPage;
      totalPages = data.totalPages;

      data.candidates.forEach(c => {
        const row = document.createElement("tr");
        
        const statusClass = `status-${c.status.toLowerCase()}`;
        
        row.innerHTML = `
          <td>${c.name}</td>
          <td>${c.email}</td>
          <td>${c.phone}</td>
          <td>${c.position}</td>
          <td><span class="status-badge ${statusClass}">${c.status}</span></td>
          <td>
            <select class="status-dropdown" data-id="${c.id}" data-current="${c.status}">
              <option value="Scheduled" ${c.status === 'Scheduled' ? 'selected' : ''}>Scheduled</option>
              <option value="Completed" ${c.status === 'Completed' ? 'selected' : ''}>Completed</option>
              <option value="Cancelled" ${c.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
            </select>
          </td>
          <td>
            <button class="delete-btn" data-id="${c.id}" data-name="${c.name}">🗑️ Delete</button>
          </td>
        `;
        
        tableBody.appendChild(row);
      });

      attachStatusChangeListeners();
      attachDeleteListeners();
      updatePaginationControls();
    } catch (error) {
      console.error("Error loading candidates:", error);
    }
  }

  function attachStatusChangeListeners() {
    const dropdowns = document.querySelectorAll(".status-dropdown");
    
    dropdowns.forEach(dropdown => {
      dropdown.addEventListener("change", async function () {
        const candidateId = this.getAttribute("data-id");
        const newStatus = this.value;
        const oldStatus = this.getAttribute("data-current");
        
        try {
          const response = await fetch(`/api/candidates/${candidateId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ status: newStatus })
          });

          if (response.ok) {
            this.setAttribute("data-current", newStatus);
            
            const row = this.closest("tr");
            const statusBadge = row.querySelector(".status-badge");
            statusBadge.textContent = newStatus;
            statusBadge.className = `status-badge status-${newStatus.toLowerCase()}`;
            
            alert(`✅ Status updated to ${newStatus}`);
          } else {
            alert("❌ Failed to update status");
            this.value = oldStatus;
          }
        } catch (error) {
          console.error("Error updating status:", error);
          alert("❌ Error updating status");
          this.value = oldStatus;
        }
      });
    });
  }

  function attachDeleteListeners() {
    const deleteButtons = document.querySelectorAll(".delete-btn");
    
    deleteButtons.forEach(button => {
      button.addEventListener("click", async function () {
        const candidateId = this.getAttribute("data-id");
        const candidateName = this.getAttribute("data-name");
        
        const confirmed = confirm(`Are you sure you want to delete ${candidateName}?`);
        
        if (!confirmed) return;
        
        try {
          const response = await fetch(`/api/candidates/${candidateId}`, {
            method: "DELETE"
          });

          if (response.ok) {
            alert(`✅ ${candidateName} deleted successfully`);
            loadCandidates(currentPage);
          } else {
            alert("❌ Failed to delete candidate");
          }
        } catch (error) {
          console.error("Error deleting candidate:", error);
          alert("❌ Error deleting candidate");
        }
      });
    });
  }

  function updatePaginationControls() {
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  }

  prevBtn.addEventListener("click", function () {
    if (currentPage > 1) {
      loadCandidates(currentPage - 1);
    }
  });

  nextBtn.addEventListener("click", function () {
    if (currentPage < totalPages) {
      loadCandidates(currentPage + 1);
    }
  });

  loadCandidates(currentPage);
});

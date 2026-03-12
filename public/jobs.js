document.addEventListener("DOMContentLoaded", function () {
  const jobSearchForm = document.getElementById("jobSearchForm");
  const searchTitle = document.getElementById("searchTitle");
  const searchLocation = document.getElementById("searchLocation");
  const searchExperience = document.getElementById("searchExperience");
  const clearFiltersBtn = document.getElementById("clearFiltersBtn");
  const jobTableBody = document.getElementById("jobTableBody");
  const emptyState = document.getElementById("emptyState");
  const jobCount = document.getElementById("jobCount");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const pageInfo = document.getElementById("pageInfo");
  const pagination = document.getElementById("pagination");

  let currentPage = 1;
  let totalPages = 1;
  let allJobs = [];

  // Load jobs on page load
  loadJobs(currentPage);

  // Search form submission
  jobSearchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    currentPage = 1;
    loadJobs(currentPage);
  });

  // Clear filters button
  clearFiltersBtn.addEventListener("click", function () {
    searchTitle.value = "";
    searchLocation.value = "";
    searchExperience.value = "";
    currentPage = 1;
    loadJobs(currentPage);
  });

  // Previous button
  prevBtn.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      loadJobs(currentPage);
    }
  });

  // Next button
  nextBtn.addEventListener("click", function () {
    if (currentPage < totalPages) {
      currentPage++;
      loadJobs(currentPage);
    }
  });

  async function loadJobs(page) {
    try {
      const res = await fetch(`/api/jobs?page=${page}`);
      const data = await res.json();

      allJobs = data.jobs;
      currentPage = data.currentPage;
      totalPages = data.totalPages;

      // Apply filters
      const titleFilter = searchTitle.value.trim().toLowerCase();
      const locationFilter = searchLocation.value;
      const experienceFilter = searchExperience.value;

      let filteredJobs = allJobs;

      if (titleFilter) {
        filteredJobs = filteredJobs.filter(job => job.title.toLowerCase().includes(titleFilter));
      }

      if (locationFilter) {
        filteredJobs = filteredJobs.filter(job => job.location === locationFilter);
      }

      if (experienceFilter) {
        filteredJobs = filteredJobs.filter(job => job.experience === experienceFilter);
      }

      jobTableBody.innerHTML = "";

      if (filteredJobs.length === 0) {
        emptyState.style.display = "block";
        jobCount.textContent = "No jobs found matching your criteria";
        jobCount.style.color = "#999";
        pagination.style.display = "none";
        return;
      }

      emptyState.style.display = "none";
      pagination.style.display = "flex";
      
      if (titleFilter || locationFilter || experienceFilter) {
        jobCount.textContent = `Found ${filteredJobs.length} job${filteredJobs.length > 1 ? 's' : ''} (Page ${currentPage} of ${totalPages})`;
      } else {
        jobCount.textContent = `Showing ${filteredJobs.length} of ${data.totalJobs} jobs (Page ${currentPage} of ${totalPages})`;
      }
      jobCount.style.color = "#667eea";

      filteredJobs.forEach(job => {
        const row = document.createElement("tr");
        
        // Add special styling for fresher jobs
        const experienceClass = job.experience.includes('Freshers') || job.experience.includes('0 years') ? 'fresher-badge' : 'experience-badge';
        
        row.innerHTML = `
          <td><strong>${job.title}</strong></td>
          <td>🇮🇳 ${job.location}</td>
          <td><span class="${experienceClass}">${job.experience}</span></td>
        `;
        
        jobTableBody.appendChild(row);
      });

      updatePaginationControls();
    } catch (error) {
      console.error("Error loading jobs:", error);
      jobCount.textContent = "Error loading jobs";
      jobCount.style.color = "#ff6b6b";
    }
  }

  function updatePaginationControls() {
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  }
});

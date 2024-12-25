<template>
  <div>
    <!-- Search Section -->
    <section class="main_search_container">
      <div class="search-container" :class="{'sticky-search': isSticky}">
        <input
          v-model="searchTerm"
          type="text"
          id="search-input"
          :placeholder="'Searching ... ' + jobCount + ' jobs found in system'"
          @input="showSuggestions"
        />
        <div class="search-icon" @click="handleSearch">&#128269;</div>
        <div v-if="suggestionsVisible" id="suggestions" class="suggestions">
          <div
            v-for="(suggestion, index) in filteredSuggestions"
            :key="index"
            class="suggestion-item"
            @click="selectSuggestion(suggestion)"
          >
            <span v-html="highlightText(suggestion, searchTerm)"></span>
          </div>
          <div v-if="filteredSuggestions.length === 0" class="no-match-message">
            Not matching!
          </div>
        </div>
      </div>
    </section>

    <!-- Modal -->
    <div v-if="isModalOpen" id="search-modal" class="modal" @click.self="closeModal">
      <div class="modal-content">
        <span id="close-modal" class="close" @click="closeModal">&times;</span>
        <p>
          You have to create an account first, &nbsp;
          <a href="/register" style="color:blue;">Sign up</a>
        </p>
      </div>
    </div>

    <!-- Job Listings -->
    <section>
      <div class="price" style="margin-top: -1%;">
        <div class="container">
          <div class="section-header text-center" style="font-family: sans-serif; font-style: italic;">
           
            <div class="section-header text-center justify-center">
              <p>
                Jobs <i class="text-secondary">{{ jobCount }}</i> and categories
                <i class="text-secondary">{{ Object.keys(categorizedJobs).length }}</i>
              </p>
            </div>

          </div>
        </div>
      </div>
      
      <div class="testimonial">
        <div class="container">
          <div class="owl-carousel testimonials-carousel">
            <!-- Loop through filteredCategories to create the carousel items -->
            <div v-for="([category, jobs], index) in filteredCategories" :key="index">
              <div class="testimonial-item-job">
                <div class="testimonial-text">
                  <h5>{{ category }} (<i class="text-secondary">{{ jobs.length }}</i> jobs)</h5>
                  <ul>
                    <!-- Loop through the jobs in each category and display the first 5 jobs -->
                    <li v-for="(job, jobIndex) in jobs.slice(0, 5)" :key="jobIndex" :title="job">
                      {{ job.length > 34 ? job.slice(0, 34) + '...' : job }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchTerm: "",
      isModalOpen: false,
      suggestionsVisible: false,
      suggestions: [],
      filteredSuggestions: [],
      jobCount: 0,
      categorizedJobs: {},
      isSticky: false, // Track scroll position for sticky effect
    };
  },
  methods: {
    fetchJobs() {
      axios
        .get("http://192.168.0.82:8000/api/job_data")
        .then((response) => {
          console.log("API Response:", response.data);
          this.categorizedJobs = response.data.categorized_jobs;
          this.jobCount = response.data.job_listings.length;
          this.suggestions = response.data.job_listings;
        })
        .catch((error) => {
          console.error("Error fetching job data:", error);
        });
    },
    showSuggestions() {
      const value = this.searchTerm.trim().toLowerCase();
      if (value) {
        this.filteredSuggestions = this.suggestions.filter((suggestion) =>
          suggestion.toLowerCase().includes(value)
        );
        this.suggestionsVisible = true;
      } else {
        this.suggestionsVisible = false;
      }
    },
    highlightText(suggestion, searchTerm) {
      const regex = new RegExp(`(${searchTerm})`, "gi");
      return suggestion.replace(regex, `<span style="color:blue;">$1</span>`);
    },
    selectSuggestion(suggestion) {
      this.searchTerm = suggestion;
      this.suggestionsVisible = false;
    },
    handleSearch() {
      if (this.searchTerm) {
        this.isModalOpen = true;
      }
    },
    closeModal() {
      this.isModalOpen = false;
    },
    // Method to handle scroll and add sticky class
    handleScroll() {
      this.isSticky = window.scrollY > 100; // Adjust based on your requirement
    },
  },
  mounted() {
    this.fetchJobs();
    window.addEventListener('scroll', this.handleScroll); // Listen for scroll events
    
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll); // Clean up listener when component is destroyed
  },
  computed: {
    filteredCategories() {
      if (!this.categorizedJobs) return [];
      // Destructure both category and jobs, then return the entries where jobs exist
      return Object.entries(this.categorizedJobs).filter(([, jobs]) => jobs.length > 0);
    },
  },
};
</script>

<style>
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
}

/* Search Section */
.main_search_container {
  margin: 20px 0;
  padding: 10px;
  background-color: #fff;
}

.search-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  max-width: 800px;
  margin: 0 auto;
}

#search-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 25px;
  border: 1px solid #ccc;
  margin-bottom: 5px;  /* Space between input and suggestions */
}

.search-icon {
  position: absolute;
  right: 20px;
  font-size: 30px;
  color: #007bff;
  cursor: pointer; /* Change cursor to pointer */
}

.suggestions {
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  max-height: 300px;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 5px;
  z-index: 10;
}

.suggestion-item {
  padding: 10px;
  cursor: pointer;
}

.suggestion-item:hover {
  background-color: #f0f0f0;
}

.no-match-message {
  padding: 10px;
  color: red;
  font-style: italic;
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}

#close-modal:hover {
  color: red;
}

.testimonial {
  position: relative;
  width: 100%;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.testimonial-item-job {
  background-color: white;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
  position: relative;
  width: 95%;
  margin-left: 5px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.testimonial-text {
  padding: 10px 10px 10px 10px;
  width: 220px;
}

.testimonial-text li{
  list-style-type: square;
}

.testimonial .owl-carousel {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 0;
}

.testimonial .owl-item {
  display: flex;
  justify-content: center;
}

.testimonial .owl-item.center .testimonial-item-job {
  transform: scale(1);
}

.testimonial .owl-item .testimonial-item-job i {
  width: 150px;
  height: 150px;
  border-radius: 80px;
  transform: scale(0.8);
  transition: transform 2s;
}

.testimonial .owl-item.center .testimonial-item-job i {
  transform: scale(1);
}

.testimonial .owl-item .testimonial-item-job ul {
  list-style-type:circle;
  padding: 0;
}

.testimonial .owl-item .testimonial-item-job li {
  padding: 5px 0;
  list-style-type: circle;
}

.testimonial .owl-item .testimonial-item-job li a {
  text-decoration: none;
  color: #007bff;
}


/*******************************/
/******* Section Header ********/
/*******************************/
.section-header {
    position: relative;
    width: 100%;
    max-width: 700px;
    margin: 0 auto 45px auto;
}

.section-header p {
    display: inline-block;
    margin-bottom: 10px;
    padding-bottom: 5px;
    position: relative;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: #E81C2E;
}

.section-header p::after {
    position: absolute;
    content: "";
    width: 50%;
    height: 2px;
    left: 25%;
    bottom: 0;
    background: #E81C2E;
}

.section-header.text-left p::after {
    left: 0;
}

.section-header.text-right p::after {
    left: 50%;
}

.section-header h2 {
    margin: 0;
    font-size: 45px;
    font-weight: 700;
    text-transform: capitalize;
}

@media (max-width: 991.98px) {
    .section-header h2 {
        font-size: 45px;
    }
}

@media (max-width: 767.98px) {
    .section-header h2 {
        font-size: 40px;
    }
}

@media (max-width: 575.98px) {
    .section-header h2 {
        font-size: 35px;
    }
}

</style>

<template>
  <div class="home">
    <!-- Hero Section -->
    <!-- <section class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white"> -->
    <section class="text-white px-6 py-2 rounded-lg shadow bg-gradient-to-r from-purple-500 to-sky-200 hover:bg-gradient-to-l hover:from-purple-500 hover:to-sky-200 font-bold">
      <div class="container mx-auto px-4 py-20 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          Discover a World of Opportunities
        </h1>
        <p class="text-lg md:text-xl mb-6">
          Job sphere Rwanda consolidates job listings from various platforms, providing you with a comprehensive view of available positions tailored to your skills.
        </p>
        <!-- <div class="flex justify-center space-x-4">
          <a
            href="/jobs"
            class="text-white px-6 py-2 rounded-lg shadow bg-gradient-to-r from-blue-500 to-sky-200 hover:bg-gradient-to-l hover:from-blue-500 hover:to-sky-200 font-bold"
          >
            <i class="fa fa-search"></i>&nbsp;Search Jobs
          </a>
        </div> -->
      </div>
    </section>

    <!-- ✅ AdSense after Hero -->
    <div class="adsense-container">
      <ins
        class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-XXXXXXXXXXXXXXX"
        data-ad-slot="1234567890"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>

    <!-- 🔎 Search Section -->
    <section class="main_search_container my-10">
      <div class="search-container" :class="{'sticky-search': isSticky}">
        <input
          v-model="searchTerm"
          type="text"
          id="search-input"
          :placeholder="'Searching ... ' + job_position_count + ' jobs found in system'"
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

    <!-- Job Categories & Jobs Section -->
    <section class="py-10 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-center text-2xl font-bold mb-6">
          Jobs <span class="text-blue-600">{{ job_position_count }}</span> and Categories
          <span class="text-indigo-600">{{ job_category_count }}</span>
        </h2>

        <!-- Grid of Cards -->
        <div
          v-if="filteredCategories.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="([category, jobs], index) in filteredCategories"
            :key="index"
            class="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition"
          >
            <h3 class="font-semibold text-lg text-gray-800 mb-3">
              {{ category }} (<span class="text-blue-500">{{ jobs.length }}</span> jobs)
            </h3>
            <ul class="text-sm text-gray-600 space-y-1">
              <li
                v-for="(job, jobIndex) in jobs.slice(0, 5)"
                :key="jobIndex"
                class="relative group cursor-pointer"
              >
                {{ job.length > 20 ? job.slice(0, 20) + '...' : job }}
                <div
                  class="absolute hidden group-hover:block left-1/2 transform -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-black text-white text-xs rounded-lg"
                >
                  {{ job }}
                </div>
              </li>
            </ul>
            <div
              v-if="jobs.length > 5"
              class="text-blue-500 text-xs mt-2 cursor-pointer"
            >
              + more
            </div>
          </div>
        </div>

        <!-- Loading Spinner -->
        <div v-else class="text-center py-10 text-xl text-gray-500">
          <i class="fas fa-spinner fa-spin"></i> Loading jobs...
        </div>
      </div>
    </section>

    <!-- ✅ AdSense after Job Categories -->
    <div class="adsense-container">
      <!-- <ins
        class="adsbygoogle"
        style="display:block"
        data-ad-client="pub-8868912095987519"
        data-ad-slot="9876543210"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins> -->
      <ins
        class="adsbygoogle"
        style="display:block"
        data-ad-client="pub-8868912095987519"
        data-ad-slot="6888165290"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>

    </div>
  </div>
</template>

<script>
/* global adsbygoogle */
import axios from "axios";
import { flaskApiUrl } from "../../api";

export default {
  name: "HomeView",
  data() {
    return {
      aboutImageUrl: require("@/assets/Homepage_images/carousel5.jpg"),
      job_position_count: 0,
      job_category_count: 0,
      visitCount: 0,
      name: "",
      email: "",
      description: "",
      error: {},
      success: null,
      loading: false,

      // search & jobs
      searchTerm: "",
      isModalOpen: false,
      suggestionsVisible: false,
      suggestions: [],
      filteredSuggestions: [],
      categorizedJobs: {},
      isSticky: false,
    };
  },
  methods: {
    async fetchJobs() {
      try {
        const response = await axios.get(`${flaskApiUrl}/job_data`);
        this.categorizedJobs = response.data.categorized_jobs;
        this.job_position_count = response.data.job_listings.length;
        this.job_category_count = Object.keys(this.categorizedJobs).length;
        this.suggestions = response.data.job_listings;
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    },
    showSuggestions() {
      const value = this.searchTerm.trim().toLowerCase();
      if (value) {
        this.filteredSuggestions = this.suggestions.filter((s) =>
          s.toLowerCase().includes(value)
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
      if (this.filteredSuggestions.length > 0) {
        this.isModalOpen = true;
      } else {
        alert("No matching jobs found!");
      }
    },
    closeModal() {
      this.isModalOpen = false;
    },
    handleScroll() {
      this.isSticky = window.scrollY > 100;
    },
  },
  computed: {
    filteredCategories() {
      if (!this.categorizedJobs) return [];
      return Object.entries(this.categorizedJobs).filter(
        ([, jobs]) => jobs.length > 0
      );
    },
  },
  mounted() {
    this.fetchJobs();
    window.addEventListener("scroll", this.handleScroll);

    // ✅ Load AdSense after component renders
    // @ts-ignore
    if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
      try {
        // @ts-ignore
        adsbygoogle.push({});
      } catch (e) {
        console.warn("AdSense push error:", e);
      }
    }
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.adsense-container {
  margin: 20px 0;
  text-align: center;
}

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

a{
    text-decoration: none;
}
</style>

  
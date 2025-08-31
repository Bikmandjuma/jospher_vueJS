<template>
  <div class="home">
    <!-- Hero Section -->
    <section
      class="text-white px-6 py-2 rounded-lg shadow bg-gradient-to-r from-purple-500 to-sky-200 hover:bg-gradient-to-l hover:from-purple-500 hover:to-sky-200 font-bold"
    >
      <div class="container mx-auto px-4 py-20 text-center">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Discover a World of Opportunities
        </h1>
        <p class="text-base sm:text-lg md:text-xl mb-6">
          Job sphere Rwanda consolidates job listings from various platforms,
          providing you with a comprehensive view of available positions tailored
          to your skills.
        </p>
      </div>
    </section>

    <!-- Search Section -->
    <section class="main_search_container my-6 px-3" v-if="filteredCategories.length > 0">
      <div class="relative max-w-xl mx-auto" :class="{'sticky-search': isSticky}">
        <input
          v-model="searchTerm"
          type="text"
          id="search-input"
          class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm sm:text-base"
          placeholder="Searching . . . ex: Software developer"
          @input="showSuggestions"
        />
        <!-- Suggestions dropdown -->
        <div
          v-if="suggestionsVisible"
          id="suggestions"
          class="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10"
        >
          <div
            v-for="(suggestion, index) in filteredSuggestions"
            :key="index"
            class="px-3 py-2 hover:bg-purple-100 cursor-pointer text-sm sm:text-base"
            @click="selectSuggestion(suggestion)"
          >
            <span v-html="highlightText(suggestion.title, searchTerm)"></span>
          </div>
          <div
            v-if="filteredSuggestions.length === 0"
            class="px-3 py-2 text-gray-500 text-sm"
          >
            Not matching!
          </div>
        </div>
      </div>
    </section>

    <!-- Job Categories & Jobs Section -->
    <section class="py-10 bg-gray-50">
      <div class="container mx-auto px-4">
        <!-- <h2
          class="text-center text-xl sm:text-2xl font-bold mb-6"
          v-if="filteredCategories.length > 0"
        >
          Jobs <span class="text-blue-600">{{ job_position_count }}</span> and
          Categories <span class="text-indigo-600">{{ job_category_count }}</span>
        </h2> -->

        <!-- Show spinner when both counts are 0 -->
        <span 
          v-if="job_position_count === 0 && job_category_count === 0" 
          class="loading-icon text-center block mb-6"
        >
          <!-- <i class="fas fa-spinner fa-spin text-2xl text-gray-500"></i> -->
          <h2
            class="text-center text-xl sm:text-2xl font-bold mb-6"
          >
            Jobs <i class="fas fa-spinner fa-spin text-2xl text-gray-500"></i> and
            Categories <i class="fas fa-spinner fa-spin text-2xl text-gray-500"></i>
          </h2>
        </span>

        <!-- Show heading when counts are available -->
        <h2
          v-else
          class="text-center text-xl sm:text-2xl font-bold mb-6"
        >
          Jobs <span class="text-blue-600">{{ job_position_count }}</span> and
          Categories <span class="text-indigo-600">{{ job_category_count }}</span>
        </h2>


        <!-- <span class="loading-icon"><i class="fas fa-spinner fa-spin"></i></span> -->

        <!-- Cards with Pagination -->
        <div
          v-if="filteredCategories.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="([category, jobs], index) in paginatedCategories"
            :key="index"
            class="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition"
          >
            <h3 class="font-semibold text-base sm:text-lg text-gray-800 mb-3">
              {{ category }} (<span class="text-blue-500">{{ jobs?.length || 0 }}</span>)
            </h3>
            <ul class="text-sm text-gray-600 space-y-1">
              <li
                v-for="(job, jobIndex) in (jobs || []).slice(0, 3)"
                :key="jobIndex"
                class="relative group"
              >
                <a
                  :href="getJobUrl(job)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-black hover:text-purple-400"
                >
                  {{ jobIndex+1 }} : {{ job.title.length > 35 ? job.title.slice(0, 35) + "..." : job.title }}
                </a>
              </li>
            </ul>

            <div
              v-if="(jobs?.length || 0) > 3"
              class="text-blue-500 text-xs mt-2 cursor-pointer"
              @click="openModal(category, jobs)"
            >
              + more
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div
          v-if="totalPages > 1"
          class="flex justify-center items-center space-x-2 mt-8"
        >
          <!-- Prev Button -->
          <button
            class="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            ‹ Prev
          </button>

          <!-- Page Numbers -->
          <button
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            class="px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-sm sm:text-base"
            :class="page === currentPage ? 'bg-purple-500 text-white font-bold shadow-md' : 'bg-gray-200 hover:bg-gray-300'"
          >
            {{ page }}
          </button>

          <!-- Next Button -->
          <button
            class="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            Next ›
          </button>
        </div>

        <div v-else class="text-center py-10 text-lg sm:text-xl text-gray-500">
          <i class="fas fa-spinner fa-spin"></i> Loading jobs...
        </div>
      </div>
    </section>

    <!-- Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white p-6 rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <h3 class="mt-2 font-bold text-base sm:text-lg"><u>{{ selectedCategory }}</u></h3>
        <ul class="text-sm text-gray-700 mt-3 space-y-1">
          <li
            v-for="(job, index) in (selectedJobs || [])"
            :key="index"
            class="p-1 border-b border-gray-200"
          >
            <a
              :href="getJobUrl(job)"
              target="_blank"
              rel="noopener noreferrer"
              class="text-black hover:text-purple-400"
            >
              {{ index + 1 }} : {{ job.title }}
            </a>
          </li>
        </ul>
        <div class="text-center mt-4">
          <button
            class="px-4 py-2 bg-red-500 text-white rounded"
            @click="closeModal"
          >
            <i class="fa fa-times"></i>&nbsp; Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { flaskApiUrl,laravelApiUrl } from "../../api";

export default {
  name: "HomeView",
  data() {
    return {
      job_position_count: 0,
      job_category_count: 0,
      isModalOpen: false,
      selectedCategory: "",
      selectedJobs: [],
      searchTerm: "",
      suggestionsVisible: false,
      suggestions: [],
      filteredSuggestions: [],
      categorizedJobs: {},
      isSticky: false,

      currentPage: 1,
      itemsPerPage: 18,
    };
  },
  methods: {
    async incrementVisitCount() {
      try {
        await axios.post(`${laravelApiUrl}/incrementVisitCount`); 
      } catch (error) {
        console.error("Error incrementing visit count:", error);
      }
    },
    async fetchJobs() {
      try {
        const response = await axios.get(`${flaskApiUrl}/fetch_job_position`);
        this.categorizedJobs = response.data.categorized_jobs || {};

        // ✅ remove duplicate job titles (case-insensitive)
        this.suggestions = [
          ...new Map(
            Object.values(this.categorizedJobs)
              .flat()
              .filter(job => job.title && job.origin)
              .map(job => [job.title.toLowerCase(), job])
          ).values(),
        ];
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    },

    async fetchjob_Pos_Cat_Count() {
      try {
        const response = await axios.get(`${flaskApiUrl}/count_position_category`);
        this.job_position_count = response.data.total_job_positions;
        this.job_category_count = response.data.total_job_categories;
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    },

    openModal(category, jobs) {
      this.selectedCategory = category;
      this.selectedJobs = jobs;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.selectedCategory = "";
      this.selectedJobs = [];
    },

    showSuggestions() {
      const value = this.searchTerm.trim().toLowerCase();
      if (value) {
        this.filteredSuggestions = this.suggestions
          .filter(s => s.title.toLowerCase().includes(value))
          .slice(0, 10);
        this.suggestionsVisible = true;
      } else {
        this.suggestionsVisible = false;
      }
    },

    selectSuggestion(suggestion) {
      this.searchTerm = suggestion.title;
      this.suggestionsVisible = false;
      window.open(this.getJobUrl(suggestion), "_blank");
    },

    highlightText(text, term) {
      const regex = new RegExp(`(${term})`, "gi");
      return text.replace(regex, `<span class="text-blue-600">$1</span>`);
    },

    handleScroll() {
      this.isSticky = window.scrollY > 100;
    },

    getJobUrl(job) {
      if (job.origin === "https://www.rwandajob.com/job-vacancies-search-rwanda") {
        const sanitizedTitle = encodeURIComponent(job.title.substring(0, 100))
          .replace(/%20/g, "-")
          .replace(/%2F/g, "/");
        return `${job.origin}/${sanitizedTitle}`;
      } else if (job.origin === "https://www.jobinrwanda.com/") {
        const sanitizedTitle = encodeURIComponent(job.title.substring(0, 100)).replace(/%20/g, "+");
        return `https://www.jobinrwanda.com/jobs/search-result?filter_titles_field=${sanitizedTitle}`;
      } else if (job.origin === "https://jobportal.kora.rw/service/service-job") {
        const sanitizedTitle = encodeURIComponent(job.title.substring(0, 100)).replace(/%20/g, "+");
        return `https://jobportal.kora.rw/service/service-job?title=${sanitizedTitle}`;
      }
      return job.origin;
    },
  },
  computed: {
    filteredCategories() {
      if (!this.categorizedJobs) return [];
      return Object.entries(this.categorizedJobs).filter(
        ([, jobs]) => (jobs?.length || 0) > 0
      );
    },
    totalPages() {
      return Math.ceil(this.filteredCategories.length / this.itemsPerPage);
    },
    paginatedCategories() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredCategories.slice(start, start + this.itemsPerPage);
    },
  },
  mounted() {
    this.fetchJobs();
    this.fetchjob_Pos_Cat_Count();
    this.incrementVisitCount();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
a:link{
  color: black;
}
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

  
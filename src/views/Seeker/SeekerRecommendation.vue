<template>
  <div>
    <section class="section profile">
      <div class="flex flex-wrap xl:flex-nowrap m-2">
        <!-- Left Column -->
        <div class="w-full xl:w-1/4 mb-4">
          <div class="card border rounded-lg shadow-md">
            <div class="card-body p-1">
              <div style="max-height: 400px; overflow: auto;">
                <h4 class="text-center items-center justify-center">
                  Job Categories&nbsp;
                  <span class="badge bg-primary" style="border-radius: 50%;">{{ categories.length }}</span>
                </h4>

                <ul id="category_id">
                  <li
                    v-for="(category, index) in categories"
                    :key="index"
                    @click="fetchJobs(category)"
                    class="category p-1"
                  >
                    <i class="fa fa-arrow-right"></i>&nbsp;&nbsp;{{ category }}
                    <span
                      class="float-right text-sm text-gray-900"
                      style="width: auto; white-space: nowrap;"
                    >
                      ({{ getCategoryCount(category) }})
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="w-full xl:w-3/4 mb-4">
          <div class="card border rounded-lg shadow-md" style="max-height: 400px; overflow: auto;">
            <div class="card-body p-1">
              <div class="space-y-4">
                <h4
                  v-if="selectedCategory"
                  class="sticky top-0 z-50 bg-white p-2 text-center justify-center items-center"
                >
                  Jobs for <span class="text-primary">{{ selectedCategory }}</span> {{ jobPositions.length }}
                </h4>
                <ul v-if="jobPositions.length > 0" class="pb-3">
                  <li v-for="(job, index) in jobPositions" :key="index" class="mt-2">
                    <a
                      :href="getJobUrl(job)"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-blue-600 hover:text-black"
                    >
                      <i class="fa fa-briefcase"></i>&nbsp;{{ job.title }}
                    </a>
                  </li>
                </ul>

                <p v-else class="text-center justify-center items-center">No jobs found for this category.</p>
              </div>
              <!-- Recommended Jobs -->
              <div v-if="recommendedJobs.length > 0" class="mt-4">
                <h5 class="text-center">Related Job Recommendations</h5>
                <ul>
                  <li v-for="(job, index) in recommendedJobs" :key="index" class="mt-2">
                    <a
                      :href="getJobUrl(job)"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-blue-600 hover:text-black"
                    >
                      <i class="fa fa-briefcase"></i>&nbsp;{{ job.title }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { flaskApiUrl,laravelApiUrl } from '../../api'; // Flask API URL

export default {
  data() {
    return {
      categories: [],  // Categories to be fetched from the Laravel API
      flaskData: {},  // Job data categorized by category
      selectedCategory: null,  // Selected job category
      jobPositions: [],  // Job positions for the selected category
      recommendedJobs: [],  // Recommended job positions based on similarity
    };
  },

  methods: {
    async fetchData() {
      try {
        // Fetch categories from Laravel API (adjust this if categories are handled in Flask)
        const laravelResponse = await fetch(`${laravelApiUrl}/user/fetch_user_job_categories`);
        const laravelData = await laravelResponse.json();
        this.categories = laravelData.category_names.map((skills) => skills.skills);

        // Fetch job positions and recommendations from Flask API
        this.fetchJobs();  // Call fetchJobs when component is mounted to load data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

    async fetchJobs(category) {
      this.selectedCategory = category;

      try {
        // Call the Flask API to get recommended job positions
        const response = await fetch(`${flaskApiUrl}/api/fetch_recom_job_position?category=${category}`);
        const data = await response.json();
        this.jobPositions = data.recommended_jobs || [];
        
        // You can add more logic to handle the job positions here as needed
      } catch (error) {
        console.error('Error fetching job positions:', error);
      }
    },

    getCategoryCount(category) {
      return this.flaskData[category]?.length || 0;
    },

    getJobUrl(job) {
      // Adjust based on how URLs are structured
      return job.origin;
    },
  },

  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.category {
  cursor: pointer;
  color: blue;
  font-family: Arial, Helvetica, sans-serif;
}
.category:hover {
  color: darkblue;
}
.category span {
  float: right;
  font-size: 0.9rem;
  color: gray;
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}
</style>

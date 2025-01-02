<template>
  <div>
    <h1>Job Categories</h1>
    <ul>
      <li 
        v-for="(category, index) in categories" 
        :key="index" 
        @click="fetchJobs(category)"
        class="category"
      >
        {{ category }}
      </li>
    </ul>

    <h2 v-if="selectedCategory">Jobs for {{ selectedCategory }}</h2>
    <ul v-if="jobPositions.length > 0">
      <li v-for="(job, index) in jobPositions" :key="index">
        {{ job }}
      </li>
    </ul>
    <p v-else>No jobs found for this category.</p>
  </div>
</template>
<script>
import { flaskApiUrl, laravelApiUrl } from '../../api';

export default {
  data() {
    return {
      categories: [], // Categories from Laravel API
      flaskData: {},  // Jobs from Flask API
      selectedCategory: null, // Currently selected category
      jobPositions: [] // Jobs matching the selected category
    };
  },
  methods: {
      
      async fetchData() {
        try {
          // Fetch data from Laravel API
          const token=localStorage.getItem("auth_token");
          const laravelResponse = await fetch(`${laravelApiUrl}/user/fetch_user_job_categories`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          const laravelData = await laravelResponse.json();
          this.categories = laravelData.categories;

          // Fetch data from Flask API
          const flaskResponse = await fetch(`${flaskApiUrl}/fetch_job_position`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const flaskData = await flaskResponse.json();
          this.flaskData = flaskData.categorized_jobs;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      
    },

    fetchJobs(category) {
      this.selectedCategory = category;
      // Find jobs for the selected category in Flask API
      this.jobPositions = this.flaskData[category] || [];
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style scoped>
.category {
  cursor: pointer;
  color: blue;
  text-decoration: underline;
}
.category:hover {
  color: darkblue;
}
</style>

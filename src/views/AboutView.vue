<template>
  <div>
    <h1>Job Listings</h1>
    <ul>
      <li v-for="job in jobListings" :key="job">{{ job }}</li>
    </ul>
    <div v-if="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="jobCount !== null">Total jobs: {{ jobCount }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      jobListings: [],  // Will store the job listings
      jobCount: null,   // Will store the job count
      loading: false,   // For loading state
      error: null       // For error state
    };
  },
  created() {
    // Fetch job listings when the component is created
    this.fetchJobListings();
  },
  methods: {
    async fetchJobListings() {
      this.loading = true;
      this.error = null;

      try {
        // Replace with the correct URL to your API endpoint
        const response = await axios.get('http://192.168.0.82:8000/api/expired');
        
        // Extract job listings and job count from the response
        this.jobListings = response.data.job_listings;
        this.jobCount = response.data.job_count;
      } catch (err) {
        // Handle any error that occurs during the API call
        this.error = 'Failed to load job listings. Please try again later.';
      } finally {
        // Set loading to false once the API call is finished
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
/* Optional styling */
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 5px 0;
  font-size: 18px;
}

.error {
  color: red;
  font-weight: bold;
}
</style>

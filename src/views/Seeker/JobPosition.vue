<template>
    <div>
      <h1>Job Listings</h1>
  
      <!-- Display loading state -->
      <div v-if="loading">Loading job listings...</div>
  
      <!-- Display error message -->
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  
      <!-- Display job listings and categorized jobs -->
      <div v-if="jobListings.length > 0">
        <h2>All Job Listings</h2>
        <ul>
          <li v-for="(job, index) in jobListings" :key="index">{{ job }}</li>
        </ul>
  
        <h2>Categorized Jobs</h2>
        <div v-for="(jobs, category) in categorizedJobs" :key="category">
          <h3>{{ category }}</h3>
          <ul>
            <li v-for="(job, index) in jobs" :key="index">{{ job }}</li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import { laravelApiUrl } from '../../api';

  laravelApiUrl
  export default {
    data() {
      return {
        jobListings: [],
        categorizedJobs: {},
        loading: false,
        errorMessage: '',
      };
    },
    created() {
      this.fetchJobListings();
    },
    methods: {
      async fetchJobListings() {
        this.loading = true;
        this.errorMessage = '';
        
        try {
          
            const token = localStorage.getItem('auth_token');
          
          if (!token) {
            this.errorMessage = 'Authorization token is missing';
            this.loading = false;
            return;
          }
      
          const categoriesResponse = await this.fetchLaravelCategories(token);
          
          if (categoriesResponse && categoriesResponse.length > 0) {
            this.fetchJobPositionsFromFlask(token);
          } else {
            this.errorMessage = 'Failed to fetch job categories from Laravel';
            this.loading = false;
          }
        } catch (error) {
          this.errorMessage = error.message || 'Something went wrong while fetching job listings.';
          this.loading = false;
        }
      },
  
      async fetchLaravelCategories(token) {
        try {
          const response = await fetch(`${laravelApiUrl}/user/fetch_user_job_categories`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
  
          if (!response.ok) {
            throw new Error('Failed to fetch categories from Laravel API');
          }
  
          const data = await response.json();
          return data.categories;
        } catch (error) {
          this.errorMessage = error.message || 'Failed to fetch categories from Laravel API';
          return [];
        }
      },
  
      async fetchJobPositionsFromFlask(token) {
        try {
          const response = await fetch('http://your-flask-api.com/api/job_positions', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
  
          if (!response.ok) {
            throw new Error('Failed to fetch job listings from Flask API');
          }
  
          const data = await response.json();
  
          // Update data properties with the response
          this.jobListings = data.job_listings;
          this.categorizedJobs = data.categorized_jobs;
        } catch (error) {
          this.errorMessage = error.message || 'Something went wrong while fetching job listings from Flask.';
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Basic styling */
  h1, h2, h3 {
    color: #333;
  }
  
  ul {
    list-style-type: none;
    padding-left: 0;
  }
  
  li {
    padding: 5px 0;
  }
  
  .error {
    color: red;
    font-weight: bold;
  }
  </style>
  
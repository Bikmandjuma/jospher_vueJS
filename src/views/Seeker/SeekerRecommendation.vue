<template>
    <div>
      <section class="section profile">
        <div class="flex flex-wrap xl:flex-nowrap m-2">
          <!-- Left Column -->
          <div class="w-full xl:w-3/4 mb-4">
            <div class="card border rounded-lg shadow-md">
              <div class="card-body p-1">
                <div>
                  <h3>Job Recommendations</h3>
                  <button @click="fetchRecommendations" class="btn btn-primary">Get Recommended Jobs</button>
  
                  <ul v-if="recommendedJobs.length > 0" class="mt-4">
                    <li v-for="(job, index) in recommendedJobs" :key="index">
                      {{ job }}
                    </li>
                  </ul>
                  <p v-else>No recommendations available yet.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import { flaskApiUrl, laravelApiUrl } from '../../api';
  
  export default {
    data() {
      return {
        recommendedJobs: [],
      };
    },
  
    methods: {
      async fetchRecommendations() {
        try {
          const token = localStorage.getItem("auth_token");
  
          // Fetch seeker skills from Laravel
          const laravelResponse = await fetch(`${laravelApiUrl}/user/fetch_user_job_categories`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          const laravelData = await laravelResponse.json();
          const seekerSkills = laravelData.skills;
  
          // Fetch recommendations from Flask
          const flaskResponse = await fetch(`${flaskApiUrl}/recommend_jobs`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ skills: seekerSkills }),
          });
          const flaskData = await flaskResponse.json();
          this.recommendedJobs = flaskData.recommendations.flat(); // Flatten the array
  
        } catch (error) {
          console.error('Error fetching recommendations:', error);
        }
      },
    },
  
    mounted() {
      // Optionally call fetchRecommendations on mount or based on user interaction
      this.fetchRecommendations();
    },
  };
  </script>
  
  <style scoped>
    /* Add any necessary styles */
    .category {
      cursor: pointer;
      color: blue;
    }
    .category:hover {
      color: darkblue;
    }
  
    .category span {
      float: right;
      font-size: 0.9rem;
      color: gray;
    }
  </style>
  
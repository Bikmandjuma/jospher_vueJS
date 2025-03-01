<template>
  <div>
    <section class="section profile">
      <div class="flex flex-wrap xl:flex-nowrap m-2">
        <!-- Left Column -->
        <div class="w-full xl:w-1/4 mb-4">
          <div class="card border rounded-lg shadow-md">
            <div class="card-body p-1">
              <div style="max-height: 400px; overflow: auto;">
                <h4 class="sticky top-0 z-5 bg-white text-center items-center justify-center">
                  Job Categories&nbsp;
                  <span class="badge bg-primary" style="border-radius: 50%;">{{ categories.length }}</span>
                  &nbsp;&nbsp;<router-link to="/seeker/job_category"><i class="fa fa-plus text-primary"></i></router-link>
                </h4>

                <ul id="category_id">
                    <ul v-if="categories.length > 0">
                      <div v-if="loading">
                         <span class="loading-icon"><i class="fas fa-spinner fa-spin"></i>&nbsp; job categories</span>
                      </div>
                      <div v-else>
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
                          <br/>
                        </li>
                      </div>
                    </ul>
                    <ul v-else class="loading-icon">
                      <li class="text-primary">No data found yet!</li>
                    </ul>
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
                  class="sticky top-0 bg-white p-2 text-center justify-center items-center"
                >
                  Jobs for <span class="text-primary">{{ selectedCategory }}</span> {{ jobPositions.length }}
                </h4>
                
                <!-- Paid Status Block -->
                <div v-if="paidStatus">

                  <ul v-if="jobPositions.length > 0" class="pb-3 p-2">
                    <li v-for="(job, index) in jobPositions" :key="index" class="mt-2">
                      <a
                        :href="getJobUrl(job)"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-blue-600 hover:text-black"
                      >
                        <i class="fa fa-briefcase"></i>&nbsp;{{ job.title }}
                      </a>
                      <p>------------------------------------</p>
                    </li>
                    <li v-if="jobPositions.length > 5" class="text-center justify-center items-center">
                      ------End------
                    </li>

                  </ul>
                  <p v-else class="text-center justify-center items-center">No jobs found for this category.</p>
                </div>

                <div v-else-if="overdueStatus">
                  <p>{{ overdueStatus }}</p>
                </div>

                <div v-else-if="noPaymentStatus">
                  <p class="text-center justify-center items-center"><i class="blink-icon cursor-pointer" onclick="window.location.href='/seeker/payment_plan'">🔔</i>&nbsp;{{ noPaymentStatus }}</p>
                  <p style="margin-top:10px;" class="text-center justify-center items-center mb-2">
                    <a
                      href="/seeker/payment_plan"
                      class="px-4 py-2 text-sm text-white rounded-md bg-gradient-to-r from-blue-500 to-sky-200 hover:bg-gradient-to-l hover:from-teal-600 hover:to-teal-100 focus:outline-none focus:ring focus:ring-primary"
                    >
                      <i  class="fa fa-dollar text-white hover:text-teal-400 blink-icon"></i>&nbsp;Pay now
                    </a>
                  </p>
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
import { flaskApiUrl, laravelApiUrl } from '../../api';  // Import the API URLs
import axios from 'axios';

export default {
  data() {
    return {
      categories: [],          // List of categories for jobs
      flaskData: {},           // Data fetched from Flask API
      selectedCategory: null,  // The selected category for jobs
      jobPositions: [],        // List of jobs in the selected category
      paidStatus: '',        // Payment status - paid
      overdueStatus: '',     // Payment status - overdue
      noPaymentStatus: '',   // Payment status - no payment
      loading:true,
    };
  },

  methods: {
      async fetchUserPayStatus() {
      const token = localStorage.getItem('auth_token'); // Get token from localStorage

      try {
        const response = await axios.get(`${laravelApiUrl}/user/checkUserAccess`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        console.log("API Response:", response.data);  // Log the full response for debugging
        
        // Handle the response based on the status
        if (response.data.status === 'paid') {
          this.paidStatus = response.data.message;
          console.log('Paid Status:', this.paidStatus);

        } else if (response.data.status === 'overdue') {
          this.overdueStatus = response.data.message;
          console.log('Overdue Status:', this.overdueStatus);

        } else if (response.data.status === 'noPayment') {
          this.noPaymentStatus = response.data.message;
          console.log('No Payment Status:', this.noPaymentStatus);
          
        } else {
          console.log("Unhandled status:", response.data.status);  // Log unexpected status values
        }
      } catch (error) {
        if (error.response) {
          this.noPaymentStatus = "No payment found. Please make a payment.";
          console.error('Error response:', error.response.data); // Log the error response
          
        } else if (error.request) {
          console.error('Error request:', error.request); // Log request error
        } else {
          console.error('Error message:', error.message); // Log other errors
        }
      }
      },


    // Method to fetch job categories from Laravel API
    async fetchData() {
      try {
        const token = localStorage.getItem('auth_token');
        
        // Fetch categories from Laravel API
        const laravelResponse = await fetch(`${laravelApiUrl}/user/fetch_user_job_categories`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const laravelData = await laravelResponse.json();
        this.categories = laravelData.category_names.map((skills) => skills.skills);

        // Fetch job positions from Flask API
        const flaskResponse = await fetch(`${flaskApiUrl}/fetch_job_position`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const flaskData = await flaskResponse.json();
        this.flaskData = flaskData.categorized_jobs;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

    // Fetch job positions for a selected category
    fetchJobs(category) {
      this.selectedCategory = category;
      this.jobPositions = this.flaskData[category] || [];
      localStorage.setItem('count_job_position', this.jobPositions.length);
    },

    // Get count of jobs for a specific category
    getCategoryCount(category) {
      return this.flaskData[category]?.length || 0;
    },

    // Generate job URL based on the origin of the job
    getJobUrl(job) {
      if (job.origin === "https://www.rwandajob.com/job-vacancies-search-rwanda") {
        const sanitizedTitle = encodeURIComponent(job.title.substring(0, 100)).replace(/%20/g, '-').replace(/%2F/g, '/');
        return `${job.origin}/${sanitizedTitle}`;
      } else if (job.origin === "https://www.jobinrwanda.com/") {
        const sanitizedTitle = encodeURIComponent(job.title.substring(0, 100)).replace(/%20/g, '+');
        return `https://www.jobinrwanda.com/jobs/search-result?filter_titles_field=${sanitizedTitle}`;
      } else if (job.origin === "https://jobportal.kora.rw/service/service-job") {
        const sanitizedTitle = encodeURIComponent(job.title.substring(0, 100)).replace(/%20/g, '+');
        return `https://jobportal.kora.rw/service/service-job?title=${sanitizedTitle}`;
      }

      return job.origin;
    }
  },

  mounted() {
      const token = localStorage.getItem('auth_token');
      const tokenExpiry = JSON.parse(atob(token.split('.')[1])).exp * 1000;

      if (Date.now() > tokenExpiry) {
        console.log('Token has expired.');
        this.$router.push({ name: 'Login' });

      } else {
        this.fetchData();
        this.fetchUserPayStatus();
      }

      setTimeout(() => {
        this.loading = false;
      }, 10000);
  },
};
</script>


<style scoped>
.loading-icon {
  display: flex;               /* Make the container a flexbox */
  justify-content: center;     /* Horizontally center the content */
  align-items: center;         /* Vertically center the content */
  height: 100px;               /* You can adjust the height depending on the size of the container */
}

.blink-icon {
  animation: blinkAnimation 3s infinite; /* Animation runs every 3 seconds infinitely */
}

@keyframes blinkAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

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

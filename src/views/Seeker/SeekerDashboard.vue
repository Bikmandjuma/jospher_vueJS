<template>
  <div>
    <!-- Content -->
    <div class="mt-2">
      <!-- State cards -->
      <div class="grid grid-cols-1 gap-8 p-4 lg:grid-cols-2 xl:grid-cols-4">
        <!-- Value card -->
        <div class="flex items-center justify-between p-4 bg-white rounded-md dark:bg-darker">
          <div>
            <h6 class="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light">
              All jobs categories
            </h6>
            <span class="text-xl font-semibold">{{ categoryJobCount }}</span>
          </div>
          <div>
            <span class="fa fa-list-alt w-11 h-11 text-gray-300 dark:text-primary-dark"></span>
          </div>
        </div>

        <!-- Users card -->
        <div class="flex items-center justify-between p-4 bg-white rounded-md dark:bg-darker">
          <div>
            <h6 class="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light">
              All jobs positions
            </h6>
            <span class="text-xl font-semibold">{{ positionJobCount }}</span>
          </div>
          <div>
            <span class="fa fa-briefcase w-11 h-11 text-gray-300 dark:text-primary-dark"></span>
          </div>
        </div>

        <!-- Orders card -->
        <div class="flex items-center justify-between p-4 bg-white rounded-md dark:bg-darker">
          <div>
            <h6 class="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light">
              My job categories
            </h6>
            <span class="text-xl font-semibold">{{ myJob_categoryCount }}</span>
          </div>
          <div>
            <span class="fa fa-list-alt w-11 h-11 text-gray-300 dark:text-primary-dark"></span>
          </div>
        </div>

        <!-- Tickets card -->
        <div class="flex items-center justify-between p-4 bg-white rounded-md dark:bg-darker">
          <div>
            <h6 class="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light">
              My jobs positions
            </h6>
            <!-- <span class="text-xl font-semibold" v-if="totalJobPositions.length > 0">{{ totalJobPositions }}</span> -->
            <span class="text-xl font-semibold">{{ totalJobPositions }}</span>
          </div>
          <div>
            <span class="fa fa-briefcase w-11 h-11 text-gray-300 dark:text-primary-dark"></span>
          </div>
        </div>
      </div>

     <!-- Charts -->
      <div class="flex justify-center gap-8 mt-4 flex-wrap md:flex-nowrap">
        <!-- Pie Chart -->
        <div>
          <h3 class="text-center justify-center items-center bg-gradient-to-b from-black to-sky-300 bg-clip-text text-transparent">
            Pie Chart
          </h3>
          <canvas id="jobChart" class="w-full sm:w-2/4 mt-3" width="300" height="300"></canvas>
        </div>

        <!-- Bar Chart -->
        <div>
          <h3 class="text-center justify-center items-center bg-gradient-to-b from-black to-sky-400 bg-clip-text text-transparent">
            Bar Chart
          </h3>
          <canvas id="jobBarChart" class="w-full sm:w-2/4" width="400" height="300"></canvas>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { laravelApiUrl } from '../../api';
import Chart from 'chart.js/auto';

export default {
  name: 'SeekerDashboard',
  data() {
    return {
      categoryJobCount: '...',
      positionJobCount: '...',
      myJob_categoryCount: '...',
      totalJobPositions: '...',
    };
  },
  mounted() {
    const token = localStorage.getItem('auth_token');
    this.categoryJobCount = localStorage.getItem('job_Category_count');
    this.positionJobCount = localStorage.getItem('job_Position_count');
    this.totalJobPositions = localStorage.getItem('total_job_positions');
    
    if (token) {
      this.fetchMyJobsCategoryCount(token);
    }
    this.createPieChart();
    this.createBarChart();
  },
  methods: {
    fetchMyJobsCategoryCount(token) {
      axios
        .get(`${laravelApiUrl}/user/UserCount_job_category`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("api response : ", response.data);
          this.myJob_categoryCount = response.data.count_categories;
          this.createPieChart();  // Recreate chart after fetching data
          this.createBarChart();  // Recreate bar chart after fetching data
        })
        .catch((error) => {
          console.log("error fetching data : ", error);
        });
    },

    createPieChart() {
      // @ts-ignore
      const ctx = document.getElementById('jobChart').getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Categories', 'Positions', 'My Categories', 'My Positions'],
          datasets: [
            {
              label: 'Job Counts',
              data: [
                parseInt(this.categoryJobCount) || 0,
                parseInt(this.positionJobCount) || 0,
                parseInt(this.myJob_categoryCount) || 0,
                parseInt(this.totalJobPositions) || 0,
              ],
              backgroundColor: ['#FF5733', '#8ba0e8', '#3357FF', '#FFD700'],
              borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
        },
      });
    },

    createBarChart() {
      // @ts-ignore
      const ctx = document.getElementById('jobBarChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Categories', 'Positions', 'My Categories', 'My Positions'],
          datasets: [
            {
              label: 'Job Counts',
              data: [
                parseInt(this.categoryJobCount) || 0,
                parseInt(this.positionJobCount) || 0,
                parseInt(this.myJob_categoryCount) || 0,
                parseInt(this.totalJobPositions) || 0,
              ],
              backgroundColor: '#8ba0e8',
              borderColor: '#388E3C',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              position: 'top',
            },
          },
        },
      });
    },
  },
  beforeMount() {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      this.$router.push({ name: 'Login' });
    }
  },
};
</script>

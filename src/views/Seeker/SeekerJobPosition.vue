<template>
  <div>
    <section class="section profile">
      <div class="flex flex-wrap xl:flex-nowrap m-2">
        <!-- Left Column -->
        <div class="w-full xl:w-1/4 mb-4">
          <div class="card border rounded-lg shadow-md">
            <div class="card-body p-1">
              <div style="max-height: 400px; overflow: auto;">
                <h4>Job Categories</h4>
                
                <ul id="category_id">
                  <li 
                    v-for="(category) in categories" 
                    :key="category.id"
                    @click="fetchJobs(category)"
                    class="category p-1"
                  >
                    <i class="fa fa-arrow-right"></i>&nbsp;&nbsp;{{ category.name }}
                    <span class="float-right text-sm text-gray-500">({{ getCategoryCount(category) }})</span>
                    <button 
                      @click.stop="removeCategory(category.id)" 
                      class="text-white bg-red-600 py-1 px-2 text-xs rounded-4 hover:bg-red-200 hover:text-red-600 focus:outline-none focus:ring focus:ring-red-500"
                      style="width: 80px;"
                    >
                      <i class="fa fa-trash"></i> Remove
                    </button>
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
                <h4 v-if="selectedCategory">Jobs for <span class="text-primary">{{ selectedCategory }}</span></h4>
                <ul v-if="jobPositions.length > 0" class="pb-3">
                  <li v-for="(job, index) in jobPositions" :key="index">
                    {{ job }}
                  </li>
                </ul>
                <p v-else>No jobs found for this category.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>  
  </div>
</template>

<script>
import { laravelApiUrl, flaskApiUrl } from '../../api';

export default {
  data() {
    return {
      categories: [],        // Holds categories fetched from Laravel
      flaskData: {},         // Holds job positions fetched from Flask
      selectedCategory: null,
      jobPositions: [],
    };
  },

  methods: {
    // Fetch categories and job positions from Laravel and Flask API
    async fetchData() {
      try {
        const token = localStorage.getItem('auth_token');
        
        // Fetch categories from Laravel API
        const laravelResponse = await fetch(`${laravelApiUrl}/user/fetch_user_job_categories`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const laravelData = await laravelResponse.json();
        this.categories = laravelData.skills;

        // Fetch categorized jobs from Flask API
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

    // Fetch jobs related to the selected category
    fetchJobs(category) {
      this.selectedCategory = category.name;
      this.jobPositions = this.flaskData[category.name] || [];
    },

    // Get count of jobs for a particular category
    getCategoryCount(category) {
      return this.flaskData[category.name]?.length || 0;
    },

    // Remove category from the database and local list
    async removeCategory(categoryId) {
      try {
        const token = localStorage.getItem('auth_token');
        const response = await fetch(`${laravelApiUrl}/user/remove_job_category/${categoryId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });

        if (response.ok) {
          // Successfully removed from database, now remove from local list
          this.categories = this.categories.filter(category => category.id !== categoryId);
          this.$toast.success('Category removed successfully');
        } else {
          console.error('Failed to remove category');
          this.$toast.error('Failed to remove category.');
        }
      } catch (error) {
        console.error('Error removing category:', error);
        this.$toast.error('Error removing category. Please try again.');
      }
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
</style>

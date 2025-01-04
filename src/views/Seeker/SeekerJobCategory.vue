<template>
  <div>

    <section class="section profile">
      <div class="flex flex-wrap xl:flex-nowrap m-2">
        <!-- Left Column -->
        <div class="w-full xl:w-1/4 mb-4">
          <div class="card border rounded-lg shadow-md mt-4">
            <div class="card-body p-1">
              <div  style="max-height: 400px;overflow: auto;">
                <h4 class="text-center">Job Categories</h4>
    
                <router-link
                  v-if="noCategoriesMessage"
                  to="/seeker/job_category"
                  class="px-4 py-2 text-sm text-primary rounded-md focus:outline-none focus:ring focus:ring-primary"
                  >
                  {{ noCategoriesMessage }}
                </router-link>

                <ul v-if="jobDataCategories.length > 0">
                  <li v-for="(category, index) in jobDataCategories" :key="index" class="flex items-center justify-between">
                    <span>{{ category }}</span>
                    <button
                          @click="removeCategory(index)"
                          class="text-white px-2 bg-red-600 py-1 text-sm rounded-4 hover:bg-red-200 focus:outline-none focus:ring focus:ring-red-500"
                          style="width: auto;white-space: nowrap;"                    >
                          <i class="fa fa-trash"></i> Remove
                    </button>
                  </li>
                </ul>

                <ul v-else class="text-center">
                  <li class="text-primary">No data found yet !</li>
                </ul>
                
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="w-full xl:w-3/4 mb-4">
      
            <!-- Container for the Message -->
            <div class="flex flex-col md:flex-row xl:flex-col items-center justify-center bg-gray-100">
              <div class="bg-white border-2 shadow-lg p-6 mx-4 mt-4 rounded-md text-gray-700 text-sm w-full max-w-lg">
                <p class="text-center font-semibold text-lg">
                  Add a job category based on your preferred skills to gain access to specific job positions.
                </p>
              </div>

              <!-- Search Form -->
              <div class="mt-4 md:w-1/2">
                <div
                      v-if="successMessage"
                      class="p-2 mb-4 text-sm text-center items-center justify-center text-blue-700 bg-blue-100 rounded-lg"
                      role="alert"
                    >
                      <i class="fa fa-exclamation-circle"></i> {{ successMessage }}
                </div>

                <div class="bg-white border-2 shadow p-2 relative rounded-xl flex">
                  <span class="w-auto flex justify-end items-center text-gray-500 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </span>
                  <input 
                    name="episodequery" 
                    id="title" 
                    class="border-white outline-none border-0 w-full rounded-xl p-2" 
                    type="text" 
                    placeholder="Add job category by searching..." 
                    v-model="searchQuery" 
                    @input="fetchResults"
                  />
                </div>

                <!-- Dropdown Results -->
                <ul v-if="filteredResults.length && searchQuery" class="bg-white border mt-2 rounded shadow-md" style="max-height: 200px; overflow: auto;">
                  <li 
                    v-for="(result, index) in filteredResults" 
                    :key="index" 
                    class="p-2 cursor-pointer hover:bg-gray-200" 
                    @click="selectItem(result)"
                  >
                    {{ result }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- Selected Items Section -->
            <div class="mt-4 flex flex-wrap">
              <div 
                v-for="(item, index) in selectedItems" 
                :key="index" 
                class="bg-primary text-white rounded-full px-4 py-2 m-2 flex items-center"
              >
                <span>{{ item }}</span>
                <button 
                  @click="removeItem(index)" 
                  class="ml-2 bg-white text-gray-700 rounded-full px-2 hover:bg-gray-300"
                >
                  x
                </button>
              </div>
            </div>

            <!-- Hidden Input and Submit Button -->
            <input type="hidden" :value="selectedItems.join(',')" ref="hiddenInput" />
            <div class="mt-4 flex justify-center">
              <button 
                @click="submitItems" 
                class="text-white bg-primary items-center justify-center hover:bg-primary-dark rounded-xl text-xl px-4 py-2"
              >
                Submit
              </button>
            </div>
    
          </div>
      </div>

    </section>  
  </div>
</template>

<script>
import axios from 'axios';
import { flaskApiUrl,laravelApiUrl } from '../../api';

flaskApiUrl
export default {
  data() {
    return {
      noCategoriesMessage: 'loading...',
      jobDataCategories: [],
      successMessage:'',
      searchQuery: '',
      results: [],
      filteredResults: [],
      selectedItems: []
    };
  },
  mounted(){
    const token = localStorage.getItem('auth_token');
    if (!token) {
      this.$router.push({ name: 'Login' });
    } else {
      this.fetchUserCategory(token);
    }
  },
  methods: {
    fetchUserCategory(token) {
      axios
        .get(`${laravelApiUrl}/user/fetch_user_job_categories`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          console.log("API job categories", response.data);
          if (response.data && response.data.skills && response.data.skills.length > 0) {
            this.jobDataCategories = response.data.skills;
            this.noCategoriesMessage = '';
          } else {
            this.jobDataCategories = [];
            this.noCategoriesMessage = '';
          }
        })
        .catch((error) => {
          console.error("Error fetching job categories:", error);
          this.noCategoriesMessage = 'Error fetching job categories. Please try again.';
        });
    },
    async fetchResults() {

      if (!this.results.length) {
        try {
        
          const response = await fetch(`${flaskApiUrl}/fetch_job_categories`);
          const data = await response.json();
          this.results = data.fetch_all_categories || [];
        
        } catch (error) {
        
          console.error('Error fetching job categories:', error);
        
        }
      }

      this.filteredResults = this.results.filter(category =>
        category.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    
    },
    
    selectItem(item) {
    
      if (!this.selectedItems.includes(item)) {
        this.selectedItems.push(item);
      }
    
      this.searchQuery = '';
      this.filteredResults = [];
    
    },
    
    removeItem(index) {
    
      this.selectedItems.splice(index, 1);
    
    },
    
    submitItems() {
        if (this.selectedItems.length === 0) {
          alert('Please select at least one category.');
          return;
        }

        const token = localStorage.getItem('auth_token');

        if (!token) {
          console.error('No authentication token found.');
          alert('Authentication required.');
          return;
        }

        console.log('Submitting selected categories:', this.selectedItems);

        fetch(`${laravelApiUrl}/user/submit_job_category`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ selectedItems: this.selectedItems }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response from server:', data);
            
            this.successMessage = "Categories submitted successfully.";

            setTimeout(() => {
              location.reload();
              this.successMessage = "";
              
            }, 3000);
            
        })
          .catch(error => {
            console.error('Error submitting categories:', error);
            alert('Failed to submit categories.');
        });

    }

  }
};
</script>

<style scoped>
.bg-primary {
  background-color: #4CAF50;
}

.bg-primary:hover {
  background-color: #45a049;
}

input:focus {
  border-color: #4CAF50;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 8px;
}

li:hover {
  background-color: #f0f0f0;
}

.selected-item {
  display: inline-block;
  margin: 5px;
  padding: 5px 10px;
  background-color: #e0e0e0;
  border-radius: 15px;
}

.selected-item button {
  margin-left: 10px;
  background: none;
  border: none;
  cursor: pointer;
}
</style>

<template>
    <div>

            <!-- Content -->
            <div class="mt-2">
              <!-- State cards -->
              <div class="grid grid-cols-1 gap-8 p-4 lg:grid-cols-2 xl:grid-cols-4">
                <!-- Value card -->
                <div class="flex items-center justify-between p-4 bg-white rounded-md dark:bg-darker">
                  <div>
                    <h6
                      class="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light"
                    >
                      All jobs categories
                    </h6>
                    <span class="text-xl font-semibold">{{ categoryJobCount }}</span>
                    <!-- <span class="inline-block px-2 py-px ml-2 text-xs text-green-500 bg-green-100 rounded-md">
                      +4.4%
                    </span> -->
                  </div>
                  <div>
                    <span class="fa fa-list-alt w-11 h-11 text-gray-300 dark:text-primary-dark"></span>
                  </div>
                </div>

                <!-- Users card -->
                <div class="flex items-center justify-between p-4 bg-white rounded-md dark:bg-darker">
                  <div>
                    <h6
                      class="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light"
                    >
                      All jobs positions
                    </h6>
                    <span class="text-xl font-semibold">{{ positionJobCount }}</span>
                    <!-- <span class="inline-block px-2 py-px ml-2 text-xs text-green-500 bg-green-100 rounded-md">
                      +2.6%
                    </span> -->
                  </div>
                  <div>
                    <span class="fa fa-briefcase w-11 h-11 text-gray-300 dark:text-primary-dark"></span>
                  </div>
                </div>

                <!-- Orders card -->
                <div class="flex items-center justify-between p-4 bg-white rounded-md dark:bg-darker">
                  <div>
                    <h6
                      class="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light"
                    >
                      My job categories
                    </h6>
                    <span class="text-xl font-semibold">0</span>
                    <!-- <span class="inline-block px-2 py-px ml-2 text-xs text-green-500 bg-green-100 rounded-md">
                      +3.1%
                    </span> -->
                  </div>
                  <div>
                    <span class="fa fa-list-alt w-11 h-11 text-gray-300 dark:text-primary-dark"></span>
                  </div>
                </div>

                <!-- Tickets card -->
                <div class="flex items-center justify-between p-4 bg-white rounded-md dark:bg-darker">
                  <div>
                    <h6
                      class="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light"
                    >
                      My jobs positions
                    </h6>
                    <span class="text-xl font-semibold">0</span>
                  </div>
                  <div>
                    <span class="fa fa-briefcase w-11 h-11 text-gray-300 dark:text-primary-dark"></span>
                  </div>
                </div>
              </div>
            </div>

            
    </div>
  </template>
  
  <script>
import axios from 'axios';

  export default {
    name: 'SeekerDashboard',
    data(){
      return{
        categoryJobCount:'loading...',
        positionJobCount:'loading...',
      }
    },
    methods:{
      fetchjobscount(){
        axios
        .get("http://192.168.0.82:8000/api/count_position_category")
        .then((response)=>{
          console.log("api response : ",response.data);
          this.categoryJobCount = response.data.total_job_categories;
          this.positionJobCount = response.data.total_job_positions;
        })
        .catch((error)=>{
          console.log("error fetching data : ",error);
        })
      }
    },
    mounted(){
      this.fetchjobscount();
    },
    beforeMount() {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        this.$router.push({ name: 'Login' });
      }
    }
  };
  </script>
  